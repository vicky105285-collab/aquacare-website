import type { ServiceFaq } from "@/lib/site/types";
import { COMPANY_NAME, ADDRESS_LOCALITY, ADDRESS_REGION } from "@/lib/site/constants";

const LOCATION_HINT = `${ADDRESS_LOCALITY}, ${ADDRESS_REGION}`;

/**
 * Site-wide FAQ content for /faq.
 *
 * Answers are written from general water-treatment engineering practice and the
 * Bureau of Indian Standards drinking-water specification (IS 10500:2012). They
 * deliberately avoid brand-specific performance figures, prices, guarantees and
 * any claim that cannot be verified. Service-coverage wording is kept to "Karur
 * and surrounding areas" where exact town-level coverage is not certain.
 *
 * Structured as plain data so it can later be moved into the CMS without
 * changing the page.
 *
 * Tamil-ready: `titleTa` on a category and `q_ta` / `a_ta` on a question are
 * optional. They are intentionally left unset for now — a reviewed Tamil
 * translation (owner- or native-checked, like the blog `content_ta`) can be
 * added later and a `/ta/faq` route built from the same data without a refactor.
 */
export type SiteFaq = ServiceFaq & {
  q_ta?: string;
  a_ta?: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  titleTa?: string;
  intro?: string;
  faqs: SiteFaq[];
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "ro-water-purifiers",
    title: "RO Water Purifiers (Home)",
    faqs: [
      {
        q: "Do I need an RO water purifier for borewell water in Karur?",
        a: "It depends on your water test. Reverse osmosis is useful when the total dissolved solids (TDS) are high or the water contains dissolved salts, nitrates or heavy metals that other methods cannot remove. Much of the borewell water around Karur and the wider Kongu region carries higher hardness and TDS than the IS 10500:2012 acceptable limit of 500 mg/L, so an RO or an RO-plus-mineraliser system is commonly required. If your supply is low-TDS municipal water that is only microbiologically unsafe, a UV or UF purifier may be enough. A water test is the correct way to decide.",
      },
      {
        q: "What TDS level is considered suitable for drinking water?",
        a: "Under IS 10500:2012 the acceptable limit for TDS in drinking water is 500 mg/L, and up to 2000 mg/L may be tolerated only when no better source is available. Many users find water in the roughly 150–300 mg/L range pleasant to drink. Very low TDS water can taste flat, which is why RO systems for high-TDS input often include a mineral or alkaline cartridge to reintroduce a small amount of dissolved minerals.",
      },
      {
        q: "What is the difference between RO, UV and UF purification?",
        a: "RO (reverse osmosis) pushes water through a semi-permeable membrane and removes dissolved salts, reducing TDS and hardness. UV (ultraviolet) inactivates bacteria and viruses but does not change TDS or remove dissolved chemicals. UF (ultrafiltration) removes suspended particles, cysts and bacteria through a physical membrane but also does not reduce TDS. Systems are often combined (for example RO + UV) so that both dissolved and microbiological contamination are addressed.",
      },
      {
        q: "Which RO capacity is suitable for a home?",
        a: "For a typical family, a domestic RO purifier with an 8–12 litre storage tank is usually adequate for drinking and cooking. Larger households, tuition centres, shops or clinics may need a higher-output under-sink or wall-mounted unit, or a small commercial RO. The right size depends on the number of users, daily consumption and the input water quality, so we recommend a short site assessment before choosing a model.",
      },
      {
        q: "Why does purified RO water sometimes taste different?",
        a: "RO removes most dissolved minerals, so the water can taste 'lighter' or slightly flat compared with borewell or municipal water. A mineral/alkaline cartridge adds back a controlled amount of minerals to improve taste. A sudden change in taste can also indicate a spent carbon filter or a membrane nearing the end of its life, which a service check can confirm.",
      },
      {
        q: "How much water does an RO purifier reject, and can it be reused?",
        a: "Domestic RO systems discharge some water as reject (also called brine) while producing purified water; the ratio varies with input TDS, water pressure and membrane condition. The reject water is not sewage — it is simply more concentrated in dissolved salts — so many households collect it for mopping, gardening of salt-tolerant plants, toilet flushing or cleaning. Higher-recovery designs are available for commercial and industrial systems.",
      },
    ],
  },
  {
    id: "ro-service-repair",
    title: "RO Service, Repair & Spares",
    faqs: [
      {
        q: "How often should a domestic RO purifier be serviced?",
        a: "As a general guideline, sediment and carbon pre-filters are checked or replaced every few months, and the RO membrane is inspected roughly once a year, but the exact interval depends on your input water quality and daily usage. Harder or dirtier input water shortens filter life. A periodic service also covers the UV lamp (if fitted), tank hygiene, tap flow and leak checks.",
      },
      {
        q: "When should an RO membrane be replaced?",
        a: "A membrane is usually replaced when purified-water output drops noticeably, when the TDS of the purified water rises towards the input level, or when servicing shows fouling or scaling that flushing cannot recover. Typical service life is often around 2–3 years for domestic use but varies with input TDS, pre-filtration and how well the system has been maintained.",
      },
      {
        q: "Why has my RO stopped producing water or become very slow?",
        a: "Common causes are a clogged pre-filter, low input water pressure, a failed booster pump, an exhausted membrane, a faulty solenoid valve, or a full storage tank with an air-pressure problem. A technician can isolate the cause quickly by checking pressures and flows at each stage.",
      },
      {
        q: "Do you use genuine spare parts?",
        a: "Yes. Our policy is to fit genuine or equivalent-grade membranes, filters, pumps and cartridges appropriate to your system, and to tell you what has been replaced. Using the correct pre-filtration for your water quality is the single biggest factor in how long the membrane lasts.",
      },
      {
        q: "Do you service RO systems that were bought elsewhere?",
        a: "Yes. We service and repair most common domestic and commercial RO makes, supply compatible spares, and can take over annual maintenance for a system originally installed by someone else, subject to a first inspection.",
      },
    ],
  },
  {
    id: "commercial-ro",
    title: "Commercial RO Plants",
    faqs: [
      {
        q: "Does a hotel, hostel, restaurant or office need a commercial RO plant?",
        a: "If the establishment serves drinking water to guests, staff or students and the incoming water exceeds the IS 10500:2012 acceptable limits for TDS or hardness, a commercial RO plant is usually the practical solution. Capacity is sized to peak demand (for example litres per hour needed at meal times) plus storage. We assess the water, the daily demand pattern and the available space before recommending a configuration.",
      },
      {
        q: "How is the right commercial RO capacity chosen?",
        a: "We estimate daily and peak-hour demand, review the raw-water analysis (TDS, hardness, iron, turbidity), and then size the pre-treatment, membrane array, pumps and storage accordingly. Under-sizing leads to the plant running continuously and wearing out early; over-sizing wastes capital and energy. A short survey gives the numbers needed for an honest recommendation.",
      },
      {
        q: "What pre-treatment does a commercial RO plant need?",
        a: "Typically a raw-water tank, a sand or multigrade filter for turbidity, an activated-carbon filter for chlorine and organics, anti-scalant dosing, and sometimes a softener ahead of the membranes when hardness is very high. Correct pre-treatment protects the membranes and is the main determinant of running cost.",
      },
      {
        q: "Do you provide AMC and operator support for commercial plants?",
        a: "Yes. We offer scheduled preventive maintenance, membrane cleaning (CIP) where applicable, consumable replacement and breakdown response for commercial installations in Karur and surrounding districts. Coverage details are confirmed in writing before an AMC starts.",
      },
    ],
  },
  {
    id: "industrial-water-treatment",
    title: "Industrial RO & Water Treatment (ETP / STP / DM)",
    faqs: [
      {
        q: "How do I select an industrial RO or water-treatment plant?",
        a: "Industrial selection starts with a full raw-water and, where relevant, effluent analysis, plus the process requirement (for example boiler feed, dyeing, rinsing, or discharge norms to be met). From that we design pre-treatment, the membrane or ion-exchange stages, dosing, instrumentation and the recovery target. Because every industry's water chemistry and end-use differ, we do not quote a plant without a site study.",
      },
      {
        q: "What is the difference between ETP, STP and DM plants?",
        a: "An ETP (effluent treatment plant) treats industrial process wastewater so it meets pollution-control discharge or reuse norms. An STP (sewage treatment plant) treats domestic sewage from a building or campus. A DM (demineralisation) plant produces very low-conductivity water, usually by ion exchange or RO plus polishing, for boilers and process use. They solve different problems and are often present together on a large site.",
      },
      {
        q: "Can industrial RO reject water be recovered?",
        a: "Often, yes. Depending on the reject chemistry, options include a second-pass RO on the reject, evaporation, or blending for non-critical uses. Zero-liquid-discharge (ZLD) approaches are used where regulations require it. The feasible recovery percentage is established during the design study, not assumed.",
      },
      {
        q: "Do you handle operation and maintenance (O&M) of existing plants?",
        a: "Yes. We take on O&M contracts for existing RO, ETP, STP and DM plants — routine operation, chemical management, membrane cleaning, consumables and reporting — for facilities in Karur and nearby industrial areas.",
      },
    ],
  },
  {
    id: "water-softeners",
    title: "Water Softeners",
    faqs: [
      {
        q: "What is the difference between an RO system and a water softener?",
        a: "A water softener uses ion-exchange resin to swap hardness-causing calcium and magnesium for sodium, which stops scale forming in pipes, geysers, washing machines and taps. It does not reduce overall TDS and does not make water safe to drink on its own. An RO system reduces TDS and removes dissolved contaminants and is used for drinking water. Many homes with hard borewell water use a softener for the whole house and a separate RO for the kitchen tap.",
      },
      {
        q: "Can a water softener remove TDS or make water drinkable?",
        a: "No. A softener exchanges hardness ions for sodium; the total dissolved solids stay about the same and the sodium content actually rises slightly. Softened water is suitable for bathing, washing and appliance protection, but drinking water should still come from an RO or an otherwise verified-safe source.",
      },
      {
        q: "How does an automatic water softener regenerate?",
        a: "When the resin is saturated with hardness ions, the control valve runs a regeneration cycle: it backwashes the resin bed, draws a brine (salt) solution from the salt tank through the resin to recharge it, then rinses and refills. Automatic valves trigger this on a timer or, better, on measured water volume so salt is not wasted.",
      },
      {
        q: "How much salt does a softener use and how often does it regenerate?",
        a: "Salt consumption and regeneration frequency depend on the water hardness, the resin quantity and your daily water use. A correctly sized softener for a home might regenerate every few days. We size the unit and set the valve so that regeneration is neither too frequent (wasting salt and water) nor too infrequent (letting hard water through).",
      },
      {
        q: "Can a water softener protect my geyser and solar water heater?",
        a: "Yes — that is one of its main benefits. Removing hardness prevents scale building up on heating elements and inside solar collector tubes and storage tanks, which keeps heating efficient and extends equipment life. It also reduces scale in taps, showers and washing machines.",
      },
    ],
  },
  {
    id: "hard-water-borewell",
    title: "Hard Water & Borewell Water",
    faqs: [
      {
        q: "Why is borewell water hard in Karur and nearby areas?",
        a: "Groundwater picks up dissolved calcium and magnesium as it moves through the underlying rock and soil. In parts of Karur, Namakkal, Erode and neighbouring districts the geology and long-term groundwater extraction result in higher hardness and TDS. Levels vary from street to street, so a local water test is the only reliable way to know your own water quality.",
      },
      {
        q: "What hardness level counts as 'hard' water?",
        a: "IS 10500:2012 sets the acceptable limit for total hardness (as CaCO3) at 200 mg/L and a permissible limit of 600 mg/L when no alternative source is available. Water above roughly 200 mg/L tends to cause visible scale on taps and vessels, white deposits, poor lather with soap, and scaling in geysers and heaters.",
      },
      {
        q: "How can I reduce hardness in borewell water?",
        a: "For whole-house hardness, an ion-exchange water softener is the standard solution. For drinking water specifically, an RO system reduces both hardness and TDS. Anti-scalant dosing and, at larger scale, lime softening or nanofiltration are used in commercial and industrial contexts. The correct method depends on the hardness level, the water volume and the intended use.",
      },
      {
        q: "Is high-TDS borewell water safe to drink?",
        a: "High TDS by itself is mainly a taste and scaling issue, but water above the IS 10500:2012 limits often also carries elevated hardness, nitrates, fluoride or other parameters that can be a health concern over time. Rather than assume, get the water tested for the key parameters and treat based on the result.",
      },
      {
        q: "What does hard water do to my appliances and plumbing?",
        a: "Scale narrows pipe bores, coats heating elements in geysers and washing machines (increasing power use and shortening their life), blocks shower heads and aerators, and leaves spots on utensils and glass. Treating hardness at the point of entry protects the whole plumbing system.",
      },
    ],
  },
  {
    id: "solar-water-heater",
    title: "Solar Water Heaters & Solar Care",
    faqs: [
      {
        q: "How often should a solar water heater be serviced?",
        a: "A periodic service — typically once a year, and more often in hard-water areas — keeps a solar water heater working well. Service covers descaling or flushing the tank and tubes, checking the collector, valves and mounting, inspecting insulation and pipework, and testing any electrical backup heater.",
      },
      {
        q: "Does hard water damage a solar water heater?",
        a: "Yes. Hard water forms scale inside evacuated tubes or flat-plate collectors and in the storage tank, which reduces heat transfer and hot-water output and can eventually block tubes. Feeding the heater with softened water, or descaling on a regular schedule, protects the system.",
      },
      {
        q: "What size of solar water heater does a home or business need?",
        a: "Sizing is based on the number of users and the hot-water demand per day (for example a certain number of litres per person for bathing). Homes commonly use 100–300 litre-per-day systems; hotels, hostels and industrial canteens need larger multi-tank installations. We assess demand and roof space before recommending a capacity.",
      },
      {
        q: "Do you install and service solar water heaters in Karur and nearby areas?",
        a: "Yes. We supply, install and service domestic and commercial solar water heating systems across Karur and the surrounding districts, and we can take over maintenance of an existing system after an inspection.",
      },
    ],
  },
  {
    id: "amc-maintenance",
    title: "AMC & Maintenance",
    faqs: [
      {
        q: "What does an AMC (Annual Maintenance Contract) cover?",
        a: "An AMC typically includes a set number of scheduled preventive visits per year, inspection of every stage of the system, cleaning, and priority response to breakdown calls. Contracts differ in whether consumables such as filters and membranes, and major parts such as pumps, are included or charged separately. The exact inclusions for each plan tier are explained and confirmed in writing before you sign up.",
      },
      {
        q: "Is an AMC worth it for a home RO purifier?",
        a: "An AMC is worthwhile if you want maintenance handled on schedule without having to remember it, and predictable costs. It is especially useful where input water is hard or dirty and filters need frequent attention. For a lightly used system on good-quality input water, pay-per-visit service can also be fine.",
      },
      {
        q: "Can I take an AMC for a system I did not buy from you?",
        a: "Yes, subject to an initial inspection so we can confirm the system's condition and note any parts that need replacing before the contract begins.",
      },
      {
        q: "How quickly do you respond to a breakdown?",
        a: "AMC customers receive priority scheduling. Actual response time depends on location and technician availability, and we give a realistic timeframe when you call rather than a blanket promise.",
      },
    ],
  },
  {
    id: "installation-site-survey",
    title: "Installation & Site Survey",
    faqs: [
      {
        q: "Do you carry out a site survey before installation?",
        a: "Yes. For anything beyond a plug-in domestic purifier we prefer to visit, check the water source and quality, measure pressure, look at available space, drainage and power, and discuss your requirement. This avoids buying the wrong capacity or type.",
      },
      {
        q: "What should I prepare before an RO or softener installation?",
        a: "A nearby water inlet, a drain point for reject or backwash water, a power socket for systems with a pump or valve, and enough clear space for the unit and for future servicing. Our team confirms the exact requirements during the survey.",
      },
      {
        q: "How long does a typical installation take?",
        a: "A domestic RO or softener installation is usually completed in a single visit. Commercial and industrial plants take longer and are planned in stages — civil work and plumbing, equipment placement, electrical connections, commissioning and handover.",
      },
      {
        q: "Which areas do you cover for installation and service?",
        a: "We are based in Karur and serve Karur city and the surrounding areas and districts. For locations further out, please contact us with your address and requirement and we will confirm whether we can cover it.",
      },
    ],
  },
  {
    id: "water-testing",
    title: "Water Testing",
    faqs: [
      {
        q: "What water test should be done before choosing a treatment system?",
        a: "At a minimum, TDS and total hardness, plus pH. Depending on the source and area it is also worth checking iron, chloride, fluoride, nitrate and turbidity, and for drinking water a microbiological check. These parameters determine whether you need softening, RO, iron removal, disinfection, or a combination.",
      },
      {
        q: "Can you test my water on site before recommending equipment?",
        a: "Yes. We can carry out an on-site check of the main parameters during the site survey and, where a fuller analysis is needed, advise on sending a sample to a laboratory. Recommendations are based on the measured results, not guesswork.",
      },
      {
        q: "How do I collect a water sample correctly?",
        a: "Use a clean, rinsed bottle, let the tap or pump run for a minute first, fill to the top with no air gap, cap it tightly, label it with the source and date, and keep it cool and out of sunlight until it is tested. For a microbiological test a sterile container and quick delivery are important.",
      },
    ],
  },
  {
    id: "product-selection",
    title: "Choosing the Right System",
    faqs: [
      {
        q: "How do I decide between a domestic RO machine, a commercial RO purifier and an industrial RO plant?",
        a: "It comes down to daily water volume, number of users and end-use. A domestic RO machine suits a household kitchen tap. A commercial RO purifier suits shops, clinics, small offices, tuition centres and small eateries. An industrial RO plant is engineered for factories, large institutions and process water. We match the class of system to your measured demand and water quality.",
      },
      {
        q: "Should I choose RO, a softener, or both?",
        a: "If your only concern is safe drinking water, an RO (sized to your input TDS) is usually enough. If you also have whole-house scaling from hard water, add a softener at the point of entry. If the water is otherwise good and only microbiologically unsafe, a UV or UF purifier may suffice. A water test settles the question.",
      },
      {
        q: "Do you sell only your own brand?",
        a: "We supply and service a range of makes for domestic RO machines, commercial RO purifiers, softeners and solar heaters, along with genuine spares. The recommendation is based on what fits your water and requirement, not on a single brand.",
      },
    ],
  },
  {
    id: "karur-local",
    title: "Karur & Tamil Nadu — Local Questions",
    faqs: [
      {
        q: "Where are you located and which areas do you serve?",
        a: `We are ${COMPANY_NAME} based in ${LOCATION_HINT}. We serve Karur city and the surrounding areas — including localities such as Thanthonimalai, Andankoil, Velayuthampalayam and nearby parts of Karur district — and we take on commercial and industrial work across Tamil Nadu. If you are unsure whether your location is covered, contact us with your address.`,
      },
      {
        q: "Do you provide RO service and AMC within Karur town?",
        a: "Yes. Domestic and commercial RO service, repair, spares and AMC are available within Karur town and the surrounding areas. Call or send a WhatsApp message with your location and the problem and we will schedule a visit.",
      },
      {
        q: "Is borewell water in the Karur area generally hard?",
        a: "Borewell water in and around Karur is frequently on the harder, higher-TDS side, but it varies significantly by locality and by borewell. The only reliable way to plan treatment is to test your specific supply — we can do a basic check during a site visit.",
      },
      {
        q: "Can you handle water treatment for Karur's textile and dyeing units?",
        a: "Yes. We design, supply and maintain process water and effluent treatment — including RO, softening, DM and ETP systems — for textile processing, dyeing and other industries in the Karur belt. Every industrial proposal follows a site water study.",
      },
      {
        q: "Do you offer support in Tamil?",
        a: "Yes. Our team assists customers in Tamil and English, on call, on WhatsApp and during site visits.",
      },
    ],
  },
];

/** Flat list of every Q&A, for building a single FAQPage JSON-LD. */
export const ALL_FAQS: ServiceFaq[] = FAQ_CATEGORIES.flatMap((c) => c.faqs);
