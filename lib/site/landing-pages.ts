export type LandingPageData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  category: string;
  city: string;
  district: string;
  keywords: string[];
  contentSections: {
    heading: string;
    body: string[];
  }[];
  specifications?: { key: string; value: string }[];
  projectReferences: {
    title: string;
    location: string;
    capacity: string;
    result: string;
  }[];
  faqs: { question: string; answer: string }[];
};

export const LANDING_PAGES: LandingPageData[] = [
  {
    slug: "ro-plant-textile-industries-karur",
    title: "Industrial RO Plants for Textile Industries in Karur",
    metaTitle: "Industrial RO Plant for Textile Industries in Karur | High Recovery",
    metaDescription: "High-recovery industrial RO plants for textile dyeing, yarn washing, and fabric printing mills in Karur. Designed for high TDS borewell water with 98%+ salt rejection.",
    heroHeadline: "Industrial RO Plants for Textile & Dyeing Mills in Karur",
    heroSubheadline: "High-throughput 10,000 LPH to 100,000 LPH Reverse Osmosis systems engineered specifically for Karur textile clusters.",
    category: "Industrial RO",
    city: "Karur",
    district: "Karur District, Tamil Nadu",
    keywords: [
      "RO plant textile industries Karur",
      "Textile dyeing RO plant Karur",
      "Industrial RO plant Karur",
      "High TDS RO plant Karur",
      "Textile water treatment Karur",
    ],
    contentSections: [
      {
        heading: "Why Textile Industries in Karur Require Advanced Industrial RO Plants",
        body: [
          "Karur is world-renowned for home textile exports, yarn spinning, and fabric dyeing mills. However, groundwater across Karur's industrial belts—such as Reddipalayam, Thanthoni, Andankoil, and Velayuthampalayam—exhibits extreme TDS levels ranging from 1,200 PPM to over 3,500 PPM with heavy hardness and sulfate contamination.",
          "Using untreated borewell water in textile wet processing causes severe fabric shading defects, uneven dye bath absorption, chemical waste, and boiler scaling. Installing an Industrial Reverse Osmosis (RO) Plant from Yuvanthika Aquacare ensures consistent zero-hardness, low-TDS water required for export-grade textile finishing.",
        ],
      },
      {
        heading: "Key Engineering Components of Yuvanthika Industrial RO Systems",
        body: [
          "1. Multi-Media Dual Pressure Sand Filter (DMF): Removes suspended silt, mud, and organic turbidity down to 20 microns.",
          "2. Activated Carbon Filter (ACF): Adsorbs free chlorine, organic dyes, and volatile compounds to protect membrane pores.",
          "3. Dosing Systems (Anti-Scalant & SMBS): Prevents silica and sulfate scaling while neutralizing oxidant chlorine.",
          "4. High-Pressure SS 316 Vertical Multistage Pump: Generates 18 to 25 bar osmotic pressure for maximum permeate recovery.",
          "5. High-Rejection TFC Brackish Water RO Membranes: Delivers 98.5% salt rejection and 70-75% recovery efficiency.",
          "6. Clean-In-Place (CIP) Skid & PLC Automation: Allows automated chemical flushing without system teardown.",
        ],
      },
      {
        heading: "Operational & Economic Benefits for Textile Manufacturers",
        body: [
          "Eliminates Dye Bath Defects: Prevents shade variation and fabric rejection in international textile exports.",
          "Reduces Chemical Consumption: Pure soft water requires 40% less wetting agent, dye auxiliary, and washing detergent.",
          "Extends Boiler & Heat Exchanger Life: Eliminates internal scale buildup, reducing fuel consumption by up to 18%.",
          "Compliance with Environmental Guidelines: Integrates seamlessly with ETP (Effluent Treatment Plant) and ZLD (Zero Liquid Discharge) systems.",
        ],
      },
    ],
    specifications: [
      { key: "Flow Rate Capacity", value: "5,000 LPH to 100,000 LPH (Custom Sized)" },
      { key: "Feed Water TDS Range", value: "Up to 4,000 PPM" },
      { key: "Permeate Water TDS", value: "< 50 PPM (Ideal for Dyeing)" },
      { key: "Salt Rejection Rate", value: "98.5% Rejection" },
      { key: "Recovery Percentage", value: "65% - 75% Permeate Recovery" },
      { key: "Pretreatment Media", value: "Quartz Sand + High Iodine Activated Carbon" },
    ],
    projectReferences: [
      {
        title: "50,000 LPH Industrial RO System",
        location: "Reddipalayam Textile Park, Karur",
        capacity: "50,000 LPH",
        result: "Reduced feed TDS from 2,800 PPM to 35 PPM for export yarn dyeing mill.",
      },
      {
        title: "20,000 LPH Textile Processing RO",
        location: "Thanthoni, Karur",
        capacity: "20,000 LPH",
        result: "Achieved 72% permeate recovery and eliminated fabric shading rejections.",
      },
    ],
    faqs: [
      {
        question: "What is the recommended TDS level for textile dyeing in Karur?",
        answer: "For high-quality cotton and synthetic fabric dyeing, permeate water TDS should be below 50 PPM with zero calcium and magnesium hardness to prevent dye precipitation.",
      },
      {
        question: "How frequently do industrial RO membranes require CIP cleaning?",
        answer: "In typical Karur borewell water conditions, CIP chemical cleaning is recommended every 3 to 4 months or whenever permeate flow drops by 15%.",
      },
      {
        question: "Does Yuvanthika Aquacare provide AMC for industrial RO plants in Karur?",
        answer: "Yes, we provide comprehensive Annual Maintenance Contracts (AMC) including quarterly membrane chemical washing, filter media replacement, and 2-hour emergency technician visits.",
      },
    ],
  },
  {
    slug: "water-softener-textile-dyeing-units",
    title: "Commercial Water Softeners for Textile & Dyeing Units",
    metaTitle: "Water Softener for Textile & Dyeing Units in Karur & Tamil Nadu",
    metaDescription: "Automated ion-exchange water softeners for textile dyeing units, yarn washing mills, and commercial laundries. Eliminates 100% limescale and prevents dye shade variation.",
    heroHeadline: "Automated Water Softeners for Textile & Dyeing Units",
    heroSubheadline: "Protect dyeing machinery, prevent fabric color bleeding, and eliminate 100% water hardness in Karur, Tiruppur, and Erode mills.",
    category: "Water Softening",
    city: "Karur & Tiruppur",
    district: "Tamil Nadu Textile Belt",
    keywords: [
      "Water softener textile dyeing Karur",
      "Industrial water softener Tiruppur",
      "Textile water softening plant",
      "Limescale removal dyeing unit",
      "Yarn washing water softener",
    ],
    contentSections: [
      {
        heading: "The Critical Impact of Water Hardness in Textile Dyeing",
        body: [
          "In textile dyeing and printing, water hardness ions (Calcium Ca²⁺ and Magnesium Mg²⁺) react with reactive dyes and chemical auxiliaries to form insoluble mineral precipitates. This results in streaky fabric coloration, poor color fastness, harsh fabric feel, and frequent batch rejections.",
          "Yuvanthika automated water softeners use food-grade Na+ cation exchange resin to replace calcium and magnesium with soft sodium ions, guaranteeing zero-hardness water for your process.",
        ],
      },
    ],
    projectReferences: [
      {
        title: "30,000 LPH Centralized Dyeing Softener",
        location: "Velayuthampalayam, Karur",
        capacity: "30,000 LPH",
        result: "Eliminated hardness from 850 PPM down to 10 PPM; saved 35% on dye chemicals.",
      },
    ],
    faqs: [
      {
        question: "How does a water softener differ from an RO plant in textile dyeing?",
        answer: "A water softener selectively removes calcium and magnesium hardness ions without removing total dissolved salts (TDS). An RO plant removes both hardness and 98%+ of total dissolved salts.",
      },
    ],
  },
  {
    slug: "ro-plant-hospitals-karur",
    title: "Hospital & Medical Grade RO Water Plants in Karur",
    metaTitle: "Hospital RO Water Plant in Karur | Dialysis & Sterilization Grade",
    metaDescription: "Medical-grade double pass RO water plants for hospitals, dialysis centers, and clinical laboratories in Karur and Tamil Nadu. Compliant with medical sterilization standards.",
    heroHeadline: "Medical & Dialysis Grade RO Water Plants in Karur",
    heroSubheadline: "Double pass Reverse Osmosis systems with UV sterilization and endotoxin ultrafiltration for hospitals and laboratories.",
    category: "Hospital RO",
    city: "Karur",
    district: "Karur District",
    keywords: [
      "Hospital RO plant Karur",
      "Dialysis water treatment Karur",
      "Medical grade RO plant Tamil Nadu",
      "Autoclave water purifier Karur",
    ],
    contentSections: [
      {
        heading: "Strict Purified Water Standards for Healthcare Facilities",
        body: [
          "Hospitals, hemodialysis centers, surgical operation theaters, and pathology labs require ultra-pure water free from dissolved heavy metals, pyrogens, bacteria, and endotoxins. Yuvanthika Aquacare engineers custom double-pass RO systems with UV disinfection for healthcare clients in Karur.",
        ],
      },
    ],
    projectReferences: [
      {
        title: "2,000 LPH Double Pass Hospital RO",
        location: "Kovai Road, Karur",
        capacity: "2,000 LPH",
        result: "Supplies ultra-pure water for 12 dialysis stations and 4 surgical autoclaves.",
      },
    ],
    faqs: [
      {
        question: "Is UV disinfection included in hospital RO systems?",
        answer: "Yes, all Yuvanthika hospital RO systems feature dual UV sterilizers and 0.2-micron endotoxin filters for complete biological safety.",
      },
    ],
  },
  {
    slug: "commercial-ro-plant-namakkal",
    title: "Commercial RO Plants for Institutions & Poultry in Namakkal",
    metaTitle: "Commercial RO Plant in Namakkal | Poultry & Educational Hubs",
    metaDescription: "High-capacity commercial RO plants for poultry farms, colleges, hotels, and commercial buildings in Namakkal. Reliable TDS control and same-day doorstep service.",
    heroHeadline: "Commercial RO Water Plants in Namakkal",
    heroSubheadline: "Engineered for poultry feed water, educational institutions, and commercial buildings in Namakkal district.",
    category: "Commercial RO",
    city: "Namakkal",
    district: "Namakkal District",
    keywords: [
      "Commercial RO plant Namakkal",
      "Poultry farm water treatment Namakkal",
      "College RO water plant Namakkal",
    ],
    contentSections: [
      {
        heading: "Water Treatment Solutions for Namakkal Poultry & Colleges",
        body: [
          "Namakkal is renowned as India's poultry capital and a major educational hub. High TDS borewell water in Namakkal impacts poultry egg shell quality and flock health. Yuvanthika commercial RO plants deliver optimal mineral-balanced water for poultry and campus drinking systems.",
        ],
      },
    ],
    projectReferences: [
      {
        title: "10,000 LPH Commercial RO Plant",
        location: "Paramathi Road, Namakkal",
        capacity: "10,000 LPH",
        result: "Provided purified water for 50,000 layer poultry birds, improving shell thickness.",
      },
    ],
    faqs: [
      {
        question: "Why is low TDS water essential for poultry farming in Namakkal?",
        answer: "High TDS water causes bird kidney strain and wet droppings. Purified water below 300 PPM improves feed conversion ratios (FCR) and egg production rates.",
      },
    ],
  },
  {
    slug: "water-treatment-plant-erode",
    title: "Industrial Water Treatment & ETP / STP Plants in Erode",
    metaTitle: "Water Treatment & ETP / STP Plant Contractor in Erode",
    metaDescription: "Turnkey water treatment plants, Effluent Treatment Plants (ETP), and Sewage Treatment Plants (STP) in Erode. Full regulatory compliance and maintenance contracts.",
    heroHeadline: "Industrial Water Treatment, ETP & STP Plants in Erode",
    heroSubheadline: "Turnkey design, erection, and commissioning of water softeners, DM plants, and effluent treatment systems in Erode.",
    category: "Water Treatment",
    city: "Erode",
    district: "Erode District",
    keywords: [
      "Water treatment plant Erode",
      "ETP plant contractor Erode",
      "STP plant maintenance Erode",
      "DM plant Erode",
    ],
    contentSections: [
      {
        heading: "Comprehensive Industrial Water & Wastewater Engineering in Erode",
        body: [
          "Erode's thriving industrial ecosystem—spanning textile printing, paper mills, tanneries, and food processing—requires specialized raw water treatment and effluent recycling. Yuvanthika Aquacare provides end-to-end WTP, ETP, and STP plant engineering.",
        ],
      },
    ],
    projectReferences: [
      {
        title: "100 KLD Effluent Treatment Plant",
        location: "Perundurai SIPCOT, Erode",
        capacity: "100 KLD",
        result: "Achieved 90% water recovery for reuse in industrial washing processes.",
      },
    ],
    faqs: [
      {
        question: "Do you offer operation and maintenance (O&M) for ETP plants in Erode?",
        answer: "Yes, we provide full-time operating technicians and chemical supply contracts for industrial ETP and STP plants across Erode district.",
      },
    ],
  },
  {
    slug: "ro-service-trichy",
    title: "Doorstep RO Purifier Service & Repair in Trichy",
    metaTitle: "Doorstep RO Service & Repair in Trichy | Genuine Filter Replacement",
    metaDescription: "Certified doorstep RO purifier service, membrane replacement, and annual maintenance (AMC) in Trichy. Same-day technician visits and genuine spare parts.",
    heroHeadline: "Fast Doorstep RO Service & Repair in Trichy",
    heroSubheadline: "Expert RO service technicians available across Srirangam, Thillai Nagar, KK Nagar, and greater Trichy.",
    category: "RO Service",
    city: "Trichy",
    district: "Tiruchirappalli District",
    keywords: [
      "RO service Trichy",
      "RO repair near me Trichy",
      "RO membrane replacement Trichy",
      "RO AMC Trichy",
    ],
    contentSections: [
      {
        heading: "Reliable RO Service & Filter Replacement across Trichy",
        body: [
          "Is your domestic or commercial RO system leaking, making pump noise, or delivering bad-tasting water? Yuvanthika Aquacare offers certified doorstep RO service with genuine spare parts across all areas of Trichy.",
        ],
      },
    ],
    projectReferences: [
      {
        title: "Commercial RO Maintenance Contract",
        location: "Thillai Nagar, Trichy",
        capacity: "2,000 LPH",
        result: "Quarterly servicing for multi-story commercial complex with 100% uptime.",
      },
    ],
    faqs: [
      {
        question: "How fast can an RO service technician arrive in Trichy?",
        answer: "We offer same-day service visits for bookings logged before 2:00 PM across Trichy city limits.",
      },
    ],
  },
  {
    slug: "borewell-water-treatment-solutions",
    title: "Borewell Water Treatment Solutions for High TDS & Iron",
    metaTitle: "Borewell Water Treatment Solutions | High TDS, Iron & Hardness",
    metaDescription: "Comprehensive borewell water treatment systems for high TDS, iron removal, muddy water, and hardness in Tamil Nadu homes, farms, and factories.",
    heroHeadline: "Borewell Water Treatment Solutions for High TDS & Iron",
    heroSubheadline: "Eliminate yellow water, iron smell, high TDS, and severe hardness from your borewell water in Karur and Tamil Nadu.",
    category: "Borewell Treatment",
    city: "Tamil Nadu",
    district: "All Districts",
    keywords: [
      "Borewell water treatment Tamil Nadu",
      "Iron removal filter Karur",
      "High TDS borewell water solution",
      "Muddy borewell water filter",
    ],
    contentSections: [
      {
        heading: "Solving Complex Borewell Water Issues in Inland Tamil Nadu",
        body: [
          "Borewell water in inland Tamil Nadu often contains a combination of high TDS, dissolved iron (Fe²⁺), manganese, suspended clay, and extreme hardness. Yuvanthika Aquacare designs multi-stage treatment trains tailored to your exact water laboratory report.",
        ],
      },
    ],
    projectReferences: [
      {
        title: "Borewell Iron & Softener System",
        location: "Manmangalam, Karur",
        capacity: "2,000 LPH",
        result: "Removed 4.5 PPM iron and reduced hardness from 900 PPM to 15 PPM.",
      },
    ],
    faqs: [
      {
        question: "How do you remove yellow stain and iron smell from borewell water?",
        answer: "We install Manganese Greensand or Birm catalytic oxidation filters that oxidize dissolved ferrous iron into insoluble ferric rust, which is then backwashed out automatically.",
      },
    ],
  },
  {
    slug: "hard-water-solutions-tamil-nadu",
    title: "Hard Water Solutions & Water Softener Systems in Tamil Nadu",
    metaTitle: "Hard Water Solutions & Water Softener Systems in Tamil Nadu",
    metaDescription: "Complete hard water solutions for villas, apartments, hotels, and solar water heaters across Tamil Nadu. Automatic salt regeneration water softeners.",
    heroHeadline: "Hard Water Solutions & Softener Systems in Tamil Nadu",
    heroSubheadline: "Protect your home, skin, hair, and appliances from destructive hard water limescale in Karur, Namakkal, and Salem.",
    category: "Water Softening",
    city: "Tamil Nadu",
    district: "Statewide Coverage",
    keywords: [
      "Hard water solutions Tamil Nadu",
      "Water softener system Karur",
      "Borewell hard water treatment",
      "Limescale remover geyser solar",
    ],
    contentSections: [
      {
        heading: "Defeating Hard Water Limescale in Residential & Commercial Buildings",
        body: [
          "Hard water is responsible for 80% of plumbing repairs, solar water heater tube failures, and severe hair fall in Tamil Nadu. Installing a centralized food-grade resin water softener guarantees lifelong protection.",
        ],
      },
    ],
    projectReferences: [
      {
        title: "Apartment Water Softening Plant",
        location: "Fairlands, Salem",
        capacity: "15,000 LPH",
        result: "Serves 48 luxury apartment units with soft water for kitchen & bathrooms.",
      },
    ],
    faqs: [
      {
        question: "How often does a water softener require salt replenishment?",
        answer: "Depending on water usage and hardness level, common salt (NaCl) brine replenishment is typically required once every 30 to 45 days.",
      },
    ],
  },
];
