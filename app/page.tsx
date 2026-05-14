"use client";

import { AMCPlans } from "@/components/home/amc-plans";
import { CALL, INSTAGRAM, WHATSAPP } from "@/components/home/constants";
import { Contact } from "@/components/home/contact";
import { CtaBanner } from "@/components/home/cta-banner";
import {
  AMC_PLANS,
  BOOKING_STEPS,
  CONTACT_CARDS,
  FOOTER_SERVICE_LINKS,
  HERO_FEATURE_CARDS,
  NAV_SECTIONS,
  PRODUCTS,
  SERVICES,
  STATS,
  TESTIMONIALS,
  TRUST_ITEMS,
  WHY_CHOOSE_POINTS,
} from "@/components/home/data";
import { FloatingButtons } from "@/components/home/floating-buttons";
import { Footer } from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { Navbar } from "@/components/home/navbar";
import { Products } from "@/components/home/products";
import { Services } from "@/components/home/services";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChooseUs } from "@/components/home/why-choose-us";

export default function HomePage() {
  const copyrightYear = new Date().getFullYear();

  return (
    <div className="font-sans antialiased bg-white text-slate-800 overflow-x-hidden">
      <Navbar sections={NAV_SECTIONS} callHref={CALL} whatsappHref={WHATSAPP} />
      <Hero
        callHref={CALL}
        whatsappHref={WHATSAPP}
        stats={STATS}
        featureCards={HERO_FEATURE_CARDS}
        trustItems={TRUST_ITEMS}
      />
      <Services items={SERVICES} />
      <Products items={PRODUCTS} enquiryWhatsappHref={WHATSAPP} />
      <AMCPlans plans={AMC_PLANS} callHref={CALL} />
      <WhyChooseUs
        points={WHY_CHOOSE_POINTS}
        bookingSteps={BOOKING_STEPS}
        callHref={CALL}
        whatsappHref={WHATSAPP}
      />
      <Testimonials items={TESTIMONIALS} />
      <CtaBanner
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="Ready for Pure Water & Clean Energy?"
        subheadline="Get a free home visit and expert consultation today. No commitment required."
        callLabel="Call: +91 85266 64424"
      />
      <Contact cards={CONTACT_CARDS} />
      <Footer
        callHref={CALL}
        whatsappHref={WHATSAPP}
        instagramHref={INSTAGRAM}
        serviceLinks={FOOTER_SERVICE_LINKS}
        copyrightYear={copyrightYear}
      />
      <FloatingButtons callHref={CALL} whatsappHref={WHATSAPP} />
    </div>
  );
}
