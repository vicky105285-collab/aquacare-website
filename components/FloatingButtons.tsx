import { MessageCircle, Phone } from "lucide-react";

export type FloatingButtonsProps = {
  callHref: string;
  whatsappHref: string;
};

export function FloatingButtons({ callHref, whatsappHref }: FloatingButtonsProps) {
  return (
    <>
      {/* WhatsApp — Primary Floating Action (Top of stack) */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[calc(8.5rem+env(safe-area-inset-bottom))] sm:bottom-[160px] right-4 sm:right-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 hover:scale-110 active:scale-95 transition-all duration-200 group motion-reduce:transition-none"
        style={{ animation: "slideInRight 0.4s ease both" }}
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30 motion-reduce:animate-none" />
        <MessageCircle className="w-7 h-7 text-white relative z-10" aria-hidden />
        <span className="pointer-events-none absolute right-16 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg max-sm:hidden">
          Chat on WhatsApp
        </span>
      </a>

      {/* Call button — Bottom of desktop stack */}
      <a
        href={callHref}
        className="hidden sm:flex fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full items-center justify-center shadow-2xl shadow-blue-500/40 hover:scale-110 active:scale-95 transition-all duration-200 group motion-reduce:transition-none"
        style={{ animation: "slideInRight 0.4s 0.1s ease both" }}
        aria-label="Call now"
      >
        <Phone className="w-6 h-6 text-white" aria-hidden />
        <span className="pointer-events-none absolute right-16 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Call Now
        </span>
      </a>

      {/* Keyframe definition */}
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}

