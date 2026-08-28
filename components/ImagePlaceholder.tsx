import { ImageIcon } from "lucide-react";

/**
 * Neutral fill shown in an image slot where a real photo has not been
 * uploaded yet. Pass `className` to tune the surface for dark sections.
 */
export function ImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-300 ${className}`}
      aria-hidden="true"
    >
      <ImageIcon className="w-8 h-8" />
    </div>
  );
}
