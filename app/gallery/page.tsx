import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { CALL, PHONE_DISPLAY, WHATSAPP } from "@/lib/site/constants";
import { getDynamicGalleryItems } from "@/lib/site/gallery";
import { pageMetadata } from "@/lib/site/page-metadata";

export const revalidate = 0;

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description:
    "Installations and product showcases from Aqua Care & Solar Care Systems — RO, solar, and water solutions across Karur.",
  path: "/gallery",
  keywords: ["RO installation Karur", "solar water heater photos", "water purifier gallery"],
});

export default async function GalleryPage() {
  const galleryItems = await getDynamicGalleryItems();
  return (
    <article>
      <PageHero
        title="Installation gallery"
        subtitle="A snapshot of systems we commission and support — from compact kitchen RO units to high-capacity storage solutions."
        tamilLine="நிறுவல் புகைப்படங்கள் — தரமான வேலைப்பாடு."
      />
      <section className="py-16 lg:py-20 bg-slate-50" aria-label="Photo gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, i) => (
              <figure
                key={item.src}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-cyan-200"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={i < 3}
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm font-medium text-slate-700">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="Plan your installation"
        subheadline="Share photos of your kitchen utility area or roof — we advise feasibility and timelines."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
    </article>
  );
}
