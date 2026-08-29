"use client";

import { AMCPlans } from "@/components/AMCPlans";
import { CALL, PHONE_DISPLAY, WHATSAPP } from "@/lib/site/constants";
import { CTASection } from "@/components/CTASection";
import { Contact } from "@/components/Contact";
import { BrandsWeService } from "@/components/BrandsWeService";
import { ServiceArea } from "@/components/ServiceArea";
import { TrustBadgesSection } from "@/components/TrustBadgesSection";
import { FreeWaterTestingSection } from "@/components/FreeWaterTestingSection";
import { BeforeAfterGallerySection } from "@/components/BeforeAfterGallerySection";
import { IndustriesWeServeSection } from "@/components/IndustriesWeServeSection";
import { WaterJourneySection } from "@/components/WaterJourneySection";
import { GoogleReviewCTA } from "@/components/GoogleReviewCTA";
import {
  AMC_PLANS,
  BOOKING_STEPS,
  CONTACT_CARDS,
  HERO_FEATURE_CARDS,
  PRODUCTS,
  SERVICES,
  STATS,
  TESTIMONIALS,
  TRUST_ITEMS,
  WHY_CHOOSE_POINTS,
} from "@/lib/site/data";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FeaturedProjectsSection } from "@/components/FeaturedProjectsSection";

export function HomePageClient() {
  return (
    <>
      <Hero
        callHref={CALL}
        whatsappHref={WHATSAPP}
        stats={STATS}
        featureCards={HERO_FEATURE_CARDS}
        trustItems={TRUST_ITEMS}
      />
      <BrandsWeService />
      <TrustBadgesSection />
      <Services items={SERVICES} />
      <WaterJourneySection />
      <Products items={PRODUCTS} enquiryWhatsappHref={WHATSAPP} />
      <FreeWaterTestingSection />
      <BeforeAfterGallerySection />
      <IndustriesWeServeSection />
      <AMCPlans plans={AMC_PLANS} callHref={CALL} />
      <WhyChooseUs
        points={WHY_CHOOSE_POINTS}
        bookingSteps={BOOKING_STEPS}
        callHref={CALL}
        whatsappHref={WHATSAPP}
      />
      <FeaturedProjectsSection />
      <GoogleReviewCTA />
      <Testimonials items={TESTIMONIALS} />
      <CTASection
        callHref={CALL}
        whatsappHref={WHATSAPP}
        headline="Ready for Pure Water & Clean Energy?"
        subheadline="Get a free home visit and expert consultation today. No commitment required."
        callLabel={`Call ${PHONE_DISPLAY}`}
      />
      <ServiceArea />
      <Contact cards={CONTACT_CARDS} />
    </>
  );
}
