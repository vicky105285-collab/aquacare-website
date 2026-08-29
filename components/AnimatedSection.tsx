"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

type Tag = "div" | "section" | "ul" | "ol" | "li" | "figure" | "article";

export type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay before this element starts revealing, in ms. */
  delay?: number;
  /** Direction the element travels in from. */
  direction?: "up" | "down" | "left" | "right";
  /** Add a short blur-in on top of the slide (use sparingly, for hero-level moments). */
  blur?: boolean;
  /** Stagger direct children instead of moving the wrapper as one block. */
  stagger?: boolean;
  /** Rendered element. Defaults to a div. */
  as?: Tag;
  /** How much of the element must be visible before it reveals (0–1). */
  amount?: number;
};

const OFFSET = 22;
const EASE = [0.22, 1, 0.36, 1] as const;

const offsetFor = (direction: NonNullable<AnimatedSectionProps["direction"]>) => {
  switch (direction) {
    case "down":
      return { y: -OFFSET };
    case "left":
      return { x: -OFFSET };
    case "right":
      return { x: OFFSET };
    default:
      return { y: OFFSET };
  }
};

/**
 * Scroll-reveal wrapper. Same API the codebase already uses — now driven by
 * `motion` for spring-eased slides, optional blur-in and child stagger.
 *
 * Respects `prefers-reduced-motion`: reduced users get the content immediately
 * with no transform.
 */
export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  blur = false,
  stagger = false,
  as = "div",
  amount = 0.2,
}: AnimatedSectionProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const delaySec = delay / 1000;

  if (stagger) {
    const container: Variants = {
      hidden: {},
      show: { transition: { staggerChildren: 0.08, delayChildren: delaySec } },
    };
    const child: Variants = {
      hidden: {
        opacity: 0,
        ...offsetFor(direction),
        filter: blur ? "blur(6px)" : "blur(0px)",
      },
      show: {
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.55, ease: EASE },
      },
    };
    const items = Array.isArray(children) ? children : [children];
    return (
      <MotionTag
        className={className}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount }}
      >
        {items.map((c, i) => (
          <motion.div key={i} variants={child}>
            {c}
          </motion.div>
        ))}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{
        opacity: 0,
        ...offsetFor(direction),
        filter: blur ? "blur(8px)" : "blur(0px)",
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, ease: EASE, delay: delaySec }}
    >
      {children}
    </MotionTag>
  );
}
