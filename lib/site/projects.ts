import type { ProjectItem } from "./types";

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-ind-ro-1",
    slug: "textile-dyeing-industrial-ro-plant-karur",
    projectName: "50,000 LPH High Recovery Industrial RO Plant",
    location: "Reddipalayam, Karur, Tamil Nadu",
    capacity: "50,000 Liters Per Hour (50 KLD)",
    industry: "Textile Processing & Dyeing",
    category: "industrial",
    problem:
      "High TDS (over 3500 ppm) and heavy hardness in groundwater severely impacted textile dyeing quality, resulting in uneven fabric color uptake and high chemical consumption.",
    solution:
      "Engineered a heavy-duty 50,000 LPH multi-stage Industrial RO plant integrated with automated sand filtration, activated carbon polishing, and anti-scalant dosing. Delivered consistent pure water under 50 ppm TDS.",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        caption: "High pressure SS 316 pumps and FRP pressure vessels installed in Karur textile unit",
      },
      {
        url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
        caption: "Automated PLC control panel monitoring flow rate and TDS parameters",
      },
    ],
    testimonial: {
      quote:
        "Yuvanthika Aquacare & Solar Care Systems transformed our dyehouse operations. The water quality is flawless, and our chemical consumption dropped by 30%. Their local Karur service team responds instantly.",
      clientName: "K. Subramaniam",
      designation: "Managing Director",
      company: "Sri Lakshmi Textile Processors, Karur",
    },
    keyHighlights: [
      "TDS reduced from 3,500 PPM to under 50 PPM",
      "Automatic CIP (Clean-In-Place) membrane washing system",
      "95% uptime with 24/7 technical AMC monitoring",
    ],
    completionYear: "2023",
  },
  {
    id: "proj-etp-1",
    slug: "zero-liquid-discharge-etp-plant-erode",
    projectName: "Zero Liquid Discharge (ZLD) Effluent Treatment Plant",
    location: "Perundurai Industrial Estate, Erode, Tamil Nadu",
    capacity: "100 KLD Effluent Capacity",
    industry: "Chemical & Dyeing Industry",
    category: "industrial",
    problem:
      "Strict TNPCB zero liquid discharge compliance mandates required full recovery of high-COD, high-BOD toxic dyeing effluent without any discharge into surrounding water bodies.",
    solution:
      "Designed and commissioned a multi-stage ETP featuring primary physicochemical treatment, biological aeration, ultrafiltration, RO concentration, and evaporator crystallizers for solid salt recovery.",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
        caption: "Aeration tank and secondary clarifier setup for biological waste reduction",
      },
      {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        caption: "Multi-effect evaporator and RO permeate recovery unit",
      },
    ],
    testimonial: {
      quote:
        "We achieved 100% TNPCB regulatory compliance effortlessly. The team's expertise in ETP maintenance and ZLD chemistry across Tamil Nadu is unmatched.",
      clientName: "R. Prakash",
      designation: "General Manager - Operations",
      company: "Apex Fabrics & Chemicals Ltd, Erode",
    },
    keyHighlights: [
      "Achieved 98% water recovery for reuse in dyeing",
      "Fully compliant with TNPCB environmental guidelines",
      "Includes comprehensive quarterly chemical audit",
    ],
    completionYear: "2024",
  },
  {
    id: "proj-stp-1",
    slug: "commercial-apartment-stp-plant-trichy",
    projectName: "MBBR Technology Sewage Treatment Plant",
    location: "Thillai Nagar, Tiruchirappalli, Tamil Nadu",
    capacity: "75 KLD (250 Apartment Units)",
    industry: "Residential & Commercial Real Estate",
    category: "commercial",
    problem:
      "A large residential apartment complex faced heavy municipal water bills and sewage disposal bottlenecks, needing clear treated water for landscaping and toilet flushing.",
    solution:
      "Installed a compact Moving Bed Biofilm Reactor (MBBR) Sewage Treatment Plant with dual-media filtration and ozonated disinfection, transforming raw sewage into crystal clear non-potable water.",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
        caption: "Subsurface MBBR reactor tanks and blower piping network",
      },
      {
        url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80",
        caption: "Treated water storage and automatic garden irrigation pumping station",
      },
    ],
    testimonial: {
      quote:
        "Our resident association reduced fresh water purchasing costs by over ₹45,000 monthly. Yuvanthika Aquacare handles complete operation & maintenance seamlessly.",
      clientName: "Dr. S. Ramanathan",
      designation: "President",
      company: "Royal Heights Apartment Owners Association, Trichy",
    },
    keyHighlights: [
      "Zero odor emissions with subterranean tank design",
      "Saves over 65,000 liters of fresh groundwater daily",
      "Includes monthly water test certification for residents",
    ],
    completionYear: "2023",
  },
  {
    id: "proj-dm-1",
    slug: "demineralization-dm-plant-salem",
    projectName: "Dual-Bed Deionizer DM Plant for Power Plant",
    location: "Mettur Industrial Area, Salem, Tamil Nadu",
    capacity: "10,000 LPH High-Purity DM Water",
    industry: "Thermal Power & Boiler Feedwater",
    category: "industrial",
    problem:
      "Boiler tube scaling and silica carryover caused costly shut-downs in high-pressure steam boilers due to dissolved ionic impurities in raw supply water.",
    solution:
      "Built a custom Cation-Anion Degasser DM Water Plant with high-capacity nuclear grade resins, ensuring conductivity < 1.0 µS/cm and silica under 0.02 PPM.",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        caption: "Cation and Anion exchanger columns with automatic regeneration skid",
      },
    ],
    testimonial: {
      quote:
        "The DM water quality produced by Yuvanthika Aquacare & Solar Care Systems has protected our boilers from scale for over 3 years without a single unscheduled shutdown.",
      clientName: "M. Elango",
      designation: "Chief Engineer",
      company: "Salem Cogeneration Utilities, Salem",
    },
    keyHighlights: [
      "Conductivity consistently maintained below 1.0 µS/cm",
      "Automatic acid & alkali regeneration system",
      "Heavy duty rubber-lined steel vessels for corrosion resistance",
    ],
    completionYear: "2022",
  },
  {
    id: "proj-solar-1",
    slug: "commercial-solar-water-heater-namakkal",
    projectName: "3,000 LPD Commercial Solar Water Heating System",
    location: "Tiruchengode Road, Namakkal, Tamil Nadu",
    capacity: "3,000 Liters Per Day (3000 LPD)",
    industry: "Hospitality & Poultry Processing",
    category: "commercial",
    problem:
      "Exorbitant electricity and diesel boiler bills for daily hot water requirements in kitchen, sanitation, and guest rooms.",
    solution:
      "Engineered a 3,000 LPD Evacuated Tube Collector (ETC) solar water heating array with heavy-duty glass-lined insulated storage tanks and automatic electrical booster backup.",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
        caption: "Roof-mounted ETC collector manifolds angled for maximum solar absorption in Namakkal",
      },
    ],
    testimonial: {
      quote:
        "Our monthly energy expenditure dropped drastically. The system paid for itself within 22 months. Exceptional engineering by Yuvanthika Aquacare!",
      clientName: "V. Chandrasekaran",
      designation: "Managing Partner",
      company: "Green Park Hotel & Resorts, Namakkal",
    },
    keyHighlights: [
      "Provides 80°C hot water naturally without electric power",
      "Saves over ₹6,50,000 annually in fuel costs",
      "High-grade SS 304 food grade inner tank",
    ],
    completionYear: "2023",
  },
  {
    id: "proj-softener-1",
    slug: "residential-community-water-softener-karur",
    projectName: "Automatic Centralized Hard Water Softener Plant",
    location: "Vengamedu, Karur, Tamil Nadu",
    capacity: "15,000 LPH Central Water Softening System",
    industry: "Residential Gated Community",
    category: "residential",
    problem:
      "Borewell water hardness exceeding 950 PPM caused severe plumbing scale, damaged water heaters, skin dryness, and ruined bathroom fixtures for 40 villas.",
    solution:
      "Installed a centralized Automatic Metered Multi-Port Water Softener system loaded with high-exchange cation resin and automatic brine regeneration system.",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
        caption: "Central water softener vessel and automatic brine tank installed in villa community headworks",
      },
    ],
    testimonial: {
      quote:
        "Scaling in our taps and solar heaters is completely gone. Hardness dropped to under 50 PPM instantly. Every villa owner is thrilled with Yuvanthika Aquacare's service.",
      clientName: "N. Murugesan",
      designation: "Secretary",
      company: "Vengamedu Villa Community Association, Karur",
    },
    keyHighlights: [
      "Reduced water hardness from 950 PPM down to 30 PPM",
      "Extends life of geysers, washing machines & solar heaters by years",
      "Fully automated volumetric regeneration cycles",
    ],
    completionYear: "2024",
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}
