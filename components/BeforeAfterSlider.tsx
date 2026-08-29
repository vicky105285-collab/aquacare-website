"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { SmartImage } from "@/components/SmartImage";
import { useInView, useReducedMotion } from "motion/react";

export type BeforeAfterSliderProps = {
  beforeImg: string;
  afterImg: string;
  beforeTitle?: string;
  afterTitle?: string;
  className?: string;
};

export function BeforeAfterSlider({
  beforeImg,
  afterImg,
  beforeTitle = "Before Treatment",
  afterTitle = "After Treatment",
  className = "",
}: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hintedRef = useRef(false);
  const inView = useInView(containerRef, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setFromClientX(e.clientX);
  };
  const endDrag = (e: React.PointerEvent) => {
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
  };

  // One-time "drag me" nudge the first time the control is on screen.
  useEffect(() => {
    if (!inView || hintedRef.current || reduce) return;
    hintedRef.current = true;
    const timers = [42, 58, 50].map((v, i) =>
      window.setTimeout(() => setPos(v), 350 + i * 260),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [inView, reduce]);

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={`relative w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 select-none cursor-ew-resize touch-pan-y aspect-[4/3] sm:aspect-[16/9] ${className}`}
    >
      {/* After Image (Background / Base Layer) */}
      <div className="absolute inset-0 w-full h-full">
        <SmartImage src={afterImg} alt={afterTitle} fill className="object-cover" />
        <span className="absolute bottom-3 right-3 bg-emerald-500/90 text-white font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider backdrop-blur-md">
          {afterTitle}
        </span>
      </div>

      {/* Before Image (Clipped Overlay Layer) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          width: `${pos}%`,
          transition: dragging ? "none" : "width 0.18s ease-out",
        }}
      >
        <div className="relative w-full h-full min-w-[300px] sm:min-w-[600px]">
          <SmartImage src={beforeImg} alt={beforeTitle} fill className="object-cover" />
        </div>
        <span className="absolute bottom-3 left-3 bg-red-500/90 text-white font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider backdrop-blur-md">
          {beforeTitle}
        </span>
      </div>

      {/* Slider Splitter Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        style={{
          left: `calc(${pos}% - 2px)`,
          transition: dragging ? "none" : "left 0.18s ease-out",
        }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Reveal the before and after comparison"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 font-bold text-xs flex items-center justify-center shadow-2xl border-2 border-cyan-500 cursor-ew-resize outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          ↔
        </div>
      </div>
    </div>
  );
}
