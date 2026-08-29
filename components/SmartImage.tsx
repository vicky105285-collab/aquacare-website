"use client";

import Image from "next/image";
import { useState } from "react";

export type SmartImageProps = {
  /** Real image URL. Empty / missing → a clean branded placeholder is shown instead of any stock image. */
  src?: string | null;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Wrapper class used only for the placeholder box (so it matches the image's frame). */
  placeholderClassName?: string;
};

const isRealSrc = (s?: string | null): s is string =>
  typeof s === "string" && s.trim().length > 0 && s.trim() !== "/images/placeholder";

/**
 * next/image when a genuine `src` is supplied; otherwise a calm, on-brand
 * "no image yet" placeholder — never a random stock photo. The owner replaces
 * placeholders by uploading a real image in the admin CMS.
 */
export function SmartImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  priority,
  className = "",
  placeholderClassName = "",
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const showImage = isRealSrc(src) && !failed;

  if (showImage) {
    return (
      <Image
        src={src as string}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        priority={priority}
        className={className}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt ? `${alt} — image not available` : "Image not available"}
      className={
        (fill ? "absolute inset-0 " : "") +
        "flex flex-col items-center justify-center gap-2 bg-slate-100 text-slate-400 " +
        placeholderClassName +
        " " +
        className
      }
    >
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M12 2.7S6 9.3 6 13.4a6 6 0 0 0 12 0C18 9.3 12 2.7 12 2.7Z" />
      </svg>
      <span className="text-[11px] font-medium uppercase tracking-wide">Image coming soon</span>
    </div>
  );
}
