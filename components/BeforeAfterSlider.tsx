"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";

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
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
      className={`relative w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 select-none cursor-ew-resize aspect-[4/3] sm:aspect-[16/9] ${className}`}
    >
      {/* After Image (Background / Base Layer) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={afterImg}
          alt={afterTitle}
          fill
          className="object-cover"
        />
        <span className="absolute bottom-3 right-3 bg-emerald-500/90 text-white font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider backdrop-blur-md">
          {afterTitle}
        </span>
      </div>

      {/* Before Image (Clipped Overlay Layer) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative w-full h-full min-w-[300px] sm:min-w-[600px]">
          <Image
            src={beforeImg}
            alt={beforeTitle}
            fill
            className="object-cover"
          />
        </div>
        <span className="absolute bottom-3 left-3 bg-red-500/90 text-white font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider backdrop-blur-md">
          {beforeTitle}
        </span>
      </div>

      {/* Slider Splitter Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 font-bold text-xs flex items-center justify-center shadow-2xl border-2 border-cyan-500">
          ↔
        </div>
      </div>
    </div>
  );
}
