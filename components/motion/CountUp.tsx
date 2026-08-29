"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Renders `value` and, once on screen, counts up to it from zero.
 *
 * The initial (server + first client) render is the REAL value, so the true
 * number is in the SSR HTML and stays put with JS disabled or slow. The count-up
 * is a progressive enhancement that runs after mount — and it is guaranteed to
 * end on the real value even if the tab is hidden or the animation frame loop is
 * throttled (it never gets stranded at zero).
 *
 * Non-digit characters (","  "+"  "%"  "k" …) are preserved in place, so
 * "8,500+" animates the 8500 and keeps the comma and the plus.
 */
export function CountUp({
  value,
  duration = 1.4,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  const digits = value.replace(/[^\d]/g, "");
  const target = digits ? parseInt(digits, 10) : 0;
  const isStatic = reduce || !digits;

  // Real value on the server and on the first client render — no "0" in the HTML.
  const [display, setDisplay] = useState(value);
  const settled = useRef(false);

  useEffect(() => {
    if (isStatic || settled.current) return;

    let controls: ReturnType<typeof animate> | undefined;

    const finish = () => {
      if (settled.current) return;
      settled.current = true;
      controls?.stop();
      setDisplay(value); // land exactly on the real value
    };

    const run = () => {
      if (controls || settled.current) return;
      // A hidden tab won't paint the tween — don't flash "0", just show the value.
      if (typeof document !== "undefined" && document.hidden) {
        finish();
        return;
      }
      setDisplay(stripToStart(value));
      controls = animate(0, target, {
        duration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => {
          if (!settled.current) setDisplay(format(value, Math.round(v)));
        },
        onComplete: finish,
      });
    };

    // Play when it scrolls into view; otherwise a short fallback still triggers it.
    const startTimer = window.setTimeout(run, inView ? 0 : 1200);
    // Hard guarantee: the real number is shown even if the tween never ticks.
    const safety = window.setTimeout(finish, 1400 + duration * 1000 + 400);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(safety);
      controls?.stop();
    };
  }, [inView, isStatic, target, duration, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/** Rebuild the string with `n` in place of its digits, keeping grouping + affixes. */
function format(template: string, n: number): string {
  return template.replace(/[\d,]+/, n.toLocaleString("en-IN"));
}

function stripToStart(template: string): string {
  return template.replace(/[\d,]+/, "0");
}
