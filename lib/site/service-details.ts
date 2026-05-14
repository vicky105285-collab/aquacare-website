import type { ServiceDetail, ServiceSlug } from "./types";

export const SERVICE_DETAILS: Record<ServiceSlug, ServiceDetail> = {
  "ro-water-purifier": {
    slug: "ro-water-purifier",
    metaTitle: "RO Water Purifier Sales & Installation in Karur | Aqua Care",
    metaDescription:
      "Multi-stage RO water purifiers with genuine filters, professional installation, and after-sales support across Karur and nearby towns.",
    keywords: [
      "RO purifier Karur",
      "water purifier Tamil Nadu",
      "alkaline RO",
      "Aqua Care",
      "WATERNET RO",
    ],
    heroTitle: "RO Water Purifiers",
    heroSubtitle:
      "Hospital-grade filtration for your kitchen — expert sizing, wall or table-top installation, and warranty-backed commissioning.",
    tamilLine: "RO நீர் சுத்திகரிப்பு — தரமான பொருள்கள், தொழில்முறை நிறுவல்.",
    benefits: [
      {
        title: "Certified multi-stage filtration",
        body: "Sediment, carbon, RO membrane, and post-filtration stages tuned for local TDS so your family gets consistent, safe drinking water.",
      },
      {
        title: "Right-sizing for your home",
        body: "We assess daily usage, feed water quality, and space constraints before recommending a model — no overselling, no under-capacity systems.",
      },
      {
        title: "Genuine consumables",
        body: "Authentic cartridges and membranes protect performance and warranty. We maintain stock for faster replacements.",
      },
      {
        title: "Installation you can trust",
        body: "Neat plumbing, leak checks, electrical safety, and TDS demonstration at handover — documented checklist on every install.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Site assessment",
        desc: "Water test, location survey, and transparent quotation with model options.",
      },
      {
        step: "02",
        title: "Professional install",
        desc: "Trained technicians mount the unit, route tubing safely, and stabilise voltage where required.",
      },
      {
        step: "03",
        title: "Demo & AMC options",
        desc: "Usage tips, filter timelines, and optional annual maintenance for worry-free ownership.",
      },
    ],
    faqs: [
      {
        q: "How often should RO filters be replaced?",
        a: "Pre-filters typically need replacement every 3–6 months depending on input water load; the RO membrane often lasts 12–18 months with proper pre-treatment. We remind AMC customers proactively.",
      },
      {
        q: "Do you support brands you did not sell?",
        a: "Yes — we service multiple brands with genuine-compatible spares where OEM parts are available.",
      },
      {
        q: "Is alkaline RO worth it for Tamil Nadu water?",
        a: "Where TDS is moderate to high, remineralisation can improve taste and perceived quality after RO. We recommend based on your latest TDS reading, not generic upsells.",
      },
    ],
  },
  "ro-service": {
    slug: "ro-service",
    metaTitle: "RO Service & Repair in Karur | Same-Day Visits | Aqua Care",
    metaDescription:
      "RO cleaning, filter changes, pump and SMPS faults, leakage repair, and full overhauls by verified technicians across Karur district.",
    keywords: ["RO service Karur", "RO repair", "filter change", "water purifier service"],
    heroTitle: "RO Service & Repair",
    heroSubtitle:
      "From preventive care to complex electrical faults — transparent pricing, field-tested parts, and rapid scheduling.",
    tamilLine: "RO சேவை மற்றும் பழுது — அனுபவமிக்க தொழில்நுட்ப வல்லுநர்கள்.",
    benefits: [
      {
        title: "Same-day slots when available",
        body: "Morning bookings often get same-day visits in Karur town and key surrounding areas — we confirm ETA on WhatsApp.",
      },
      {
        title: "Diagnosis before billing",
        body: "You receive a clear fault summary and price band before major work proceeds — no surprise add-ons.",
      },
      {
        title: "Electrical & hydraulic expertise",
        body: "Pump noise, low flow, TDS creep, auto-cut issues, and leakages are handled with proper tools and test protocols.",
      },
      {
        title: "Sanitised service visits",
        body: "Technicians follow hygiene basics during internal sanitisation and filter handling — especially important for drinking-water systems.",
      },
    ],
    process: [
      { step: "01", title: "Book visit", desc: "Call, WhatsApp, or web enquiry — we capture symptoms and address." },
      { step: "02", title: "Inspect & quote", desc: "On-site checks with flow, TDS, and electrical measurements as needed." },
      { step: "03", title: "Repair & verify", desc: "Fix, replace parts with consent, then post-service performance demo." },
    ],
    faqs: [
      {
        q: "My RO wastes a lot of water — can you optimise it?",
        a: "Reject ratio depends on membrane health, pressure, and pre-filtration. We tune what is safely possible and explain trade-offs rather than masking underlying issues.",
      },
      {
        q: "Do you provide warranty on repairs?",
        a: "Installed parts carry supplier-backed warranty where applicable; labour warranty is communicated on the invoice for eligible repairs.",
      },
    ],
  },
  amc: {
    slug: "amc",
    metaTitle: "RO AMC Plans Karur | Silver, Gold & Platinum | Aqua Care",
    metaDescription:
      "Annual maintenance contracts with scheduled visits, filter checks, priority support, and parts discounts for RO and solar customers.",
    keywords: ["RO AMC Karur", "annual maintenance water purifier", "AMC plans"],
    heroTitle: "Annual Maintenance (AMC)",
    heroSubtitle:
      "Predictable cost, scheduled care, and priority response — designed for busy households and small businesses.",
    tamilLine: "வருடாந்திர பராமரிப்பு திட்டங்கள் — முன்னுரிமை சேவை.",
    benefits: [
      {
        title: "Scheduled preventive visits",
        body: "Catch pressure drops, noisy pumps, and early membrane wear before they become expensive failures.",
      },
      {
        title: "Priority queueing",
        body: "AMC customers get expedited scheduling during peak seasons and festival weeks.",
      },
      {
        title: "Parts savings",
        body: "Tiered discounts on genuine spares — communicated clearly in your plan sheet.",
      },
      {
        title: "Service history",
        body: "Repeat visits build a simple history so technicians know your unit’s quirks and past replacements.",
      },
    ],
    process: [
      { step: "01", title: "Choose tier", desc: "Pick Silver, Gold, or Platinum based on usage and risk tolerance." },
      { step: "02", title: "Activation", desc: "Digital acknowledgement + first visit scheduled within the promised window." },
      { step: "03", title: "Ongoing care", desc: "Reminders before due visits; upgrades possible mid-cycle where policy allows." },
    ],
    faqs: [
      {
        q: "Are filters included in every AMC?",
        a: "Inclusion varies by tier — Platinum includes comprehensive filter coverage; lower tiers may include checks and partial discounts. We document exactly what is covered.",
      },
      {
        q: "Can AMC be transferred if I move house within Karur?",
        a: "Local relocations inside our service zone can usually be transferred administratively — speak to our desk before the move.",
      },
    ],
  },
  "solar-water-heater": {
    slug: "solar-water-heater",
    metaTitle: "Solar Water Heater Installation Karur | ETC & FPC Systems",
    metaDescription:
      "High-efficiency solar water heaters with structural assessment, safe mounting, and commissioning for homes and small commercial sites.",
    keywords: ["solar water heater Karur", "ETC solar heater", "solar geyser Tamil Nadu"],
    heroTitle: "Solar Water Heaters",
    heroSubtitle:
      "Cut electricity bills with MNRE-aligned installations — roof surveys, stand design, and thermal performance checks.",
    tamilLine: "சோலார் வாட்டர் ஹீட்டர் — மின் கட்டணத்தை குறைக்கும் முதலீடு.",
    benefits: [
      {
        title: "Structural-first approach",
        body: "We evaluate roof type, wind load exposure, and access paths before recommending tank capacity and collector layout.",
      },
      {
        title: "Efficient plumbing integration",
        body: "Hot/cold routing, air-venting, and safety valves installed to code-conscious best practices.",
      },
      {
        title: "Seasonal performance guidance",
        body: "We explain expected temperature curves across monsoon vs summer so expectations stay realistic.",
      },
      {
        title: "After-sales support",
        body: "Scaling issues, sensor faults, and backup element checks are handled by technicians familiar with thermal systems.",
      },
    ],
    process: [
      { step: "01", title: "Roof survey", desc: "Shadow analysis basics, structural fitment plan, and quotation." },
      { step: "02", title: "Install", desc: "Mounting, tank placement, pipe insulation, and electrical backup wiring if selected." },
      { step: "03", title: "Commission", desc: "Leak test, first heat-up observation, and homeowner handover checklist." },
    ],
    faqs: [
      {
        q: "Do solar heaters work on cloudy days?",
        a: "Diffuse sunlight still heats water but slower; backup electric element (if present) can top up. We size systems based on your household pattern.",
      },
      {
        q: "How much maintenance is required?",
        a: "Periodic collector cleaning and tank anode checks extend life. AMC-style annual visits are available on request.",
      },
    ],
  },
  "solar-panel": {
    slug: "solar-panel",
    metaTitle: "Solar Panel Installation Karur | Rooftop PV | Aqua Care Solar",
    metaDescription:
      "Grid-tie and battery-ready rooftop solar assessments, structural checks, and quality-conscious PV installation for Tamil Nadu homes.",
    keywords: ["solar panel installation Karur", "rooftop solar Tamil Nadu", "3kW solar"],
    heroTitle: "Solar Panel Systems",
    heroSubtitle:
      "From load profiling to inverter placement — engineered layouts with safety, access, and future expansion in mind.",
    tamilLine: "சோலார் பேனல் நிறுவல் — சுத்தமான ஆற்றல், நீண்ட கால மதிப்பு.",
    benefits: [
      {
        title: "Honest yield expectations",
        body: "We model shading, orientation, and losses so your payback discussion is grounded, not hype-driven.",
      },
      {
        title: "Quality mounting discipline",
        body: "Rail layouts and fastener choices prioritise wind safety and long-term corrosion resistance.",
      },
      {
        title: "Inverter & protection hygiene",
        body: "DC isolators, earthing continuity, and labelling done for safer future maintenance.",
      },
      {
        title: "Documentation support",
        body: "Assistance with DISCOM paperwork where applicable — timelines depend on utility processing.",
      },
    ],
    process: [
      { step: "01", title: "Energy study", desc: "Bill analysis, roof suitability, and preliminary capacity suggestion." },
      { step: "02", title: "Detailed design", desc: "Final BOM, single-line approach, and installation date coordination." },
      { step: "03", title: "Energise & train", desc: "App monitoring basics (if supported), safety dos/don’ts, and warranty pointers." },
    ],
    faqs: [
      {
        q: "Is net metering available in my area?",
        a: "Regulations evolve by DISCOM. We advise based on current published rules and help you with the application pack we routinely handle.",
      },
      {
        q: "Can I expand capacity later?",
        a: "Often yes, but inverter and roof margin must be planned up-front. Mention expansion intent during the first survey.",
      },
    ],
  },
  "water-softener": {
    slug: "water-softener",
    metaTitle: "Water Softener Installation Karur | Hard Water Solutions",
    metaDescription:
      "Ion-exchange softeners to protect geysers, washing machines, and skin from hard water — sizing, regeneration coaching, and service.",
    keywords: ["water softener Karur", "hard water treatment", "ion exchange softener"],
    heroTitle: "Water Softeners",
    heroSubtitle:
      "Reduce scale damage and improve bathing quality with correctly sized softeners for borewell and municipal supplies.",
    tamilLine: "வாட்டர் சாஃப்டனர் — கடின நீரை மென்மையாக்கும் தீர்வு.",
    benefits: [
      {
        title: "Appliance protection",
        body: "Scale control extends life for geysers, instant heaters, and washing machines — especially on high-hardness bore sources.",
      },
      {
        title: "Regeneration coaching",
        body: "We train owners on salt top-up cycles and warning signs so performance does not silently degrade.",
      },
      {
        title: "Bypass for drinking line",
        body: "Where appropriate, kitchen drinking lines remain un-softened for taste/mineral preference — discussed during design.",
      },
      {
        title: "Resin & valve service",
        body: "Stuck valves and exhausted resin beds are serviceable in-field when economically sensible.",
      },
    ],
    process: [
      { step: "01", title: "Hardness test", desc: "Quick field assessment + usage-based sizing recommendation." },
      { step: "02", title: "Plumbing integration", desc: "Bypass manifolds, drain routing, and pressure checks." },
      { step: "03", title: "Handover training", desc: "Regeneration cadence, salt quality tips, and service hotline." },
    ],
    faqs: [
      {
        q: "Does softened water taste salty?",
        a: "Properly configured systems should not taste overtly salty; if you notice taste shifts, call us — it can indicate settings or resin issues.",
      },
      {
        q: "How much space is needed?",
        a: "Brine tank + main vessel footprint varies by capacity; compact options exist for apartments with service access.",
      },
    ],
  },
  "fridge-repair": {
    slug: "fridge-repair",
    metaTitle: "Refrigerator Repair Karur | All Brands | Gas & Compressor",
    metaDescription:
      "Fridge not cooling, gas refill with leak check, compressor and thermostat faults — transparent diagnostics across Karur.",
    keywords: ["fridge repair Karur", "refrigerator gas refill", "compressor repair"],
    heroTitle: "Refrigerator Repair",
    heroSubtitle:
      "Cooling performance restored with proper leak checks — we avoid reckless gas top-ups without diagnosis.",
    tamilLine: "குளிர்சாதனப் பெட்டி பழுது — அனைத்து முன்னணி பிராண்டுகள்.",
    benefits: [
      {
        title: "Leak-aware gas handling",
        body: "Where low gas is suspected, we prioritise locating micro-leaks instead of short-lived pressure tricks.",
      },
      {
        title: "Compressor & electrical faults",
        body: "Starting relay, overload, sensor, and control board issues systematically isolated before part swap.",
      },
      {
        title: "Door seal & drainage",
        body: "Condensation, ice balling, and bad gaskets — fixed with correct OEM or quality-compatible seals.",
      },
      {
        title: "Post-repair temperature check",
        body: "Cabinet pull-down observed before we sign off — you see the improvement, not guesswork.",
      },
    ],
    process: [
      { step: "01", title: "Symptom intake", desc: "Noise, frost pattern, and runtime history captured up-front." },
      { step: "02", title: "Diagnose", desc: "Pressure/temp checks and electrical tests as applicable." },
      { step: "03", title: "Fix & validate", desc: "Repair with agreed parts; then monitored stabilisation window." },
    ],
    faqs: [
      {
        q: "Is gas refill priced separately?",
        a: "Yes — refill cost depends on refrigerant type, quantity, and whether leak welding or filter-drier replacement is needed.",
      },
      {
        q: "Do you service inverter fridges?",
        a: "Yes — our technicians carry common PCB and sensor stock for mainstream models.",
      },
    ],
  },
  "washing-machine-repair": {
    slug: "washing-machine-repair",
    metaTitle: "Washing Machine Repair Karur | Top & Front Load | Aqua Care",
    metaDescription:
      "Drain errors, drum noise, PCB faults, and motor issues on top-load and front-load washers — disciplined repair workflow.",
    keywords: ["washing machine repair Karur", "front load service", "drain pump repair"],
    heroTitle: "Washing Machine Repair",
    heroSubtitle:
      "Drainage, spin imbalance, and electronic faults handled with proper test routines — same-day where parts allow.",
    tamilLine: "வாஷிங் மெஷின் பழுது — வீட்டு சேவை வசதி.",
    benefits: [
      {
        title: "Error-code literacy",
        body: "Modern machines throw codes — we map them to root causes instead of random component swaps.",
      },
      {
        title: "Mechanical + electronic coverage",
        body: "Motors, couplings, shocks, pressure sensors, and boards within mainstream brand experience.",
      },
      {
        title: "Water leak containment",
        body: "Inlet valve, door boot, and drain hose issues fixed with correct clamps and routing.",
      },
      {
        title: "Test cycle sign-off",
        body: "Fill, wash, spin, and drain phases verified before we leave your utility area dry.",
      },
    ],
    process: [
      { step: "01", title: "Model & fault capture", desc: "Serial, error photo, and symptom timeline on WhatsApp speeds prep." },
      { step: "02", title: "On-site diagnosis", desc: "Hands-on checks; quote for parts needing order." },
      { step: "03", title: "Repair pass", desc: "Install parts, rerun cycles, and share maintenance tips." },
    ],
    faqs: [
      {
        q: "Front-load drum bearing noise — is it repairable?",
        a: "Sometimes via tub assembly replacement; economics depend on model age and part availability — we advise honestly.",
      },
      {
        q: "Do you carry spare parts on the van?",
        a: "We stock fast-moving items; uncommon SKUs may need a second visit after sourcing.",
      },
    ],
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_DETAILS) as ServiceSlug[];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS[slug as ServiceSlug];
}
