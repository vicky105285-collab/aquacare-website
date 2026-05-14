import { MessageCircle, Phone } from "lucide-react";

export type FloatingButtonsProps = {
  callHref: string;
  whatsappHref: string;
};

export function FloatingButtons({ callHref, whatsappHref }: FloatingButtonsProps) {
  return (
    <>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 z-40 w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 hover:scale-105 active:scale-95 transition-all duration-200 group motion-reduce:transition-none"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" aria-hidden />
        <span className="pointer-events-none absolute right-16 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg max-sm:hidden">
          Chat on WhatsApp
        </span>
      </a>
      <a
        href={callHref}
        className="fixed bottom-6 right-4 z-40 w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-200 group motion-reduce:transition-none"
        aria-label="Call now"
      >
        <Phone className="w-6 h-6 text-white" aria-hidden />
        <span className="pointer-events-none absolute right-16 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg max-sm:hidden">
          Call Now
        </span>
      </a>
    </>
  );
}
