import { MessageCircle, Phone } from "lucide-react";

export type CTASectionProps = {
  callHref: string;
  whatsappHref: string;
  headline: string;
  subheadline: string;
  callLabel: string;
};

export function CTASection({ callHref, whatsappHref, headline, subheadline, callLabel }: CTASectionProps) {
  return (
    <section className="py-16 bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-700 relative overflow-hidden" aria-labelledby="cta-heading">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, white 0%, transparent 40%), radial-gradient(circle at 80% 50%, white 0%, transparent 30%)",
        }}
        aria-hidden
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <h2 id="cta-heading" className="text-3xl sm:text-4xl font-black mb-4">
          {headline}
        </h2>
        <p className="text-blue-100/80 text-lg mb-8">{subheadline}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={callHref}
            className="flex items-center gap-3 px-8 py-4 bg-white text-blue-700 rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-2xl"
          >
            <Phone className="w-5 h-5" aria-hidden /> {callLabel}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-400 transition-colors shadow-2xl"
          >
            <MessageCircle className="w-5 h-5" aria-hidden /> WhatsApp Now
          </a>
        </div>
      </div>
    </section>
  );
}
