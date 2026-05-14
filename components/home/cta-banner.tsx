import { MessageCircle, Phone } from "lucide-react";

export type CtaBannerProps = {
  callHref: string;
  whatsappHref: string;
  headline: string;
  subheadline: string;
  callLabel: string;
};

export function CtaBanner({ callHref, whatsappHref, headline, subheadline, callLabel }: CtaBannerProps) {
  return (
    <section className="py-16 bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-700 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, white 0%, transparent 40%), radial-gradient(circle at 80% 50%, white 0%, transparent 30%)",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-black mb-4">{headline}</h2>
        <p className="text-blue-100/80 text-lg mb-8">{subheadline}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={callHref}
            className="flex items-center gap-3 px-8 py-4 bg-white text-blue-700 rounded-2xl font-bold hover:scale-105 transition-transform shadow-2xl"
          >
            <Phone className="w-5 h-5" /> {callLabel}
          </a>
          <a
            href={whatsappHref}
            className="flex items-center gap-3 px-8 py-4 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-400 transition-colors shadow-2xl"
          >
            <MessageCircle className="w-5 h-5" /> WhatsApp Now
          </a>
        </div>
      </div>
    </section>
  );
}
