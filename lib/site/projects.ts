import type { ProjectItem, ServiceCategoryType } from "./types";
import { FORMER_COMPANY_NAME, PHONE_DISPLAY, SITE_URL } from "./constants";
import { prisma } from "@/lib/db";

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-ind-ro-1",
    slug: "industrial-ro-plant-karur",
    projectTitle: "50,000 LPH High Recovery Industrial RO Plant in Karur",
    projectName: "50,000 LPH High Recovery Industrial RO Plant",
    projectType: "Industrial RO Plant",
    location: "Reddipalayam, Karur",
    district: "Karur",
    customerCategory: "industrial",
    category: "industrial",
    industryType: "Textile Processing & Dyeing",
    industry: "Textile Processing & Dyeing",
    capacity: "50,000 Liters Per Hour (50 KLD)",
    installationDate: "2023-11",
    completionYear: "2023",
    problemFaced:
      "Groundwater TDS exceeding 3,500 PPM and heavy calcium hardness in Karur severely affected textile dyeing consistency, resulting in fabric color patchiness, high chemical dye consumption, and rapid steam boiler scaling.",
    problem:
      "Groundwater TDS exceeding 3,500 PPM and heavy calcium hardness in Karur severely affected textile dyeing consistency, resulting in fabric color patchiness, high chemical dye consumption, and rapid steam boiler scaling.",
    solutionProvided:
      "Yuvanthika Aquacare & Solar Care Systems designed and commissioned a heavy-duty 50,000 LPH multi-stage Industrial RO plant with automated dual-media sand filtration, activated carbon polishing, anti-scalant dosing, and SS 316 high-pressure pumps. Delivered ultra-pure water under 50 PPM TDS.",
    solution:
      "Yuvanthika Aquacare & Solar Care Systems designed and commissioned a heavy-duty 50,000 LPH multi-stage Industrial RO plant with automated dual-media sand filtration, activated carbon polishing, anti-scalant dosing, and SS 316 high-pressure pumps. Delivered ultra-pure water under 50 PPM TDS.",
    productsUsed: [
      "50 KLD Multi-Stage Industrial RO Skid",
      "Hydranautics High-Rejection Membranes",
      "Grundfos SS 316 High Pressure Pump",
      "Automated PLC Control Panel & CIP System",
      "Dual Media Sand & Carbon Pressure Vessels",
    ],
    projectDescription:
      "This 50,000 LPH Industrial Reverse Osmosis (RO) plant in Karur was engineered for a leading textile dyeing factory. Operating 24/7, the system purifies raw borewell water with extreme TDS and delivers crystal clear process water essential for high-grade textile processing.",
    benefitsAchieved: [
      "Reduced feed TDS from 3,500 PPM down to under 50 PPM continuously",
      "Saves over 30% on textile dyeing chemical costs",
      "Eliminated fabric color variations and batch rejects completely",
      "Integrated CIP (Clean-In-Place) extends membrane lifespan to 3+ years",
      "Includes 24/7 technical AMC support from Karur central desk",
    ],
    keyHighlights: [
      "TDS reduced from 3,500 PPM to under 50 PPM",
      "Automatic CIP membrane washing system",
      "95% uptime with 24/7 technical AMC monitoring",
    ],
    testimonial: {
      quote:
        "Yuvanthika Aquacare & Solar Care Systems transformed our dyehouse operations. The water quality is flawless, and our chemical consumption dropped by 30%. Their local Karur service team responds instantly.",
      clientName: "K. Subramaniam",
      designation: "Managing Director",
      company: "Sri Lakshmi Textile Processors, Karur",
    },
    projectImages: [
      {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        caption: "High pressure SS 316 pumps and FRP pressure vessels installed in Karur textile unit",
      },
      {
        url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
        caption: "Automated PLC control panel monitoring flow rate and TDS parameters",
      },
    ],
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
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    featured: true,
  },
  {
    id: "proj-softener-namakkal",
    slug: "water-softener-namakkal",
    projectTitle: "Industrial Hard Water Softener System in Namakkal",
    projectName: "Automated Hard Water Softener Plant",
    projectType: "Water Softener",
    location: "Tiruchengode Road, Namakkal",
    district: "Namakkal",
    customerCategory: "commercial",
    category: "commercial",
    industryType: "Poultry Processing & Feed Mills",
    industry: "Poultry Processing & Feed Mills",
    capacity: "25,000 Liters Per Hour (25 LPH)",
    installationDate: "2024-02",
    completionYear: "2024",
    problemFaced:
      "Severe groundwater hardness over 1,200 PPM caused heavy limescale build-up in boilers, piping networks, and cooling towers, doubling maintenance costs and causing frequent production downtime.",
    problem:
      "Severe groundwater hardness over 1,200 PPM caused heavy limescale build-up in boilers, piping networks, and cooling towers, doubling maintenance costs and causing frequent production downtime.",
    solutionProvided:
      "Engineered an automated Dual-Bed Cation Exchange Water Softener loaded with food-grade high-capacity resin and volumetric brine regeneration. Reduced water hardness from 1,200 PPM to under 30 PPM.",
    solution:
      "Engineered an automated Dual-Bed Cation Exchange Water Softener loaded with food-grade high-capacity resin and volumetric brine regeneration. Reduced water hardness from 1,200 PPM to under 30 PPM.",
    productsUsed: [
      "Automated Volumetric Multi-Port Softener Vessel",
      "High-Capacity Cation Exchange Resin",
      "Brine Salt Chemical Dosing Tank",
      "Micron Pre-Sediment Filter",
    ],
    projectDescription:
      "This 25,000 LPH Commercial Water Softener plant in Namakkal protects critical industrial boilers and facility plumbing from hard borewell water scaling, significantly enhancing energy efficiency.",
    benefitsAchieved: [
      "Water hardness reduced from 1,200 PPM down to 30 PPM",
      "Zero limescale accumulation in boiler heat exchangers",
      "Saves over ₹3,50,000 annually in descaling maintenance",
      "Fully automated salt regeneration system",
    ],
    keyHighlights: [
      "Hardness reduced from 1200 PPM to under 30 PPM",
      "Protects steam boilers & piping networks",
      "Automated volumetric regeneration",
    ],
    testimonial: {
      quote:
        "Our boiler maintenance issues vanished completely after Yuvanthika Aquacare installed this softener. Exceptional quality and prompt service in Namakkal!",
      clientName: "P. Mohanraj",
      designation: "Plant Head",
      company: "Namakkal Poultry Feeds Ltd",
    },
    projectImages: [
      {
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
        caption: "Automatic softener vessel and brine regeneration skid in Namakkal plant",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
        caption: "Automatic softener vessel and brine regeneration skid in Namakkal plant",
      },
    ],
    featured: true,
  },
  {
    id: "proj-solar-erode",
    slug: "solar-water-heater-erode",
    projectTitle: "5,000 LPD Commercial Solar Water Heater System in Erode",
    projectName: "5,000 LPD Commercial Solar Water Heating Array",
    projectType: "Solar Water Heater",
    location: "Perundurai Road, Erode",
    district: "Erode",
    customerCategory: "commercial",
    category: "commercial",
    industryType: "Hospitality & Multi-Specialty Hospital",
    industry: "Hospitality & Multi-Specialty Hospital",
    capacity: "5,000 Liters Per Day (5000 LPD)",
    installationDate: "2024-01",
    completionYear: "2024",
    problemFaced:
      "High electrical heating bills (over ₹1,20,000 monthly) to provide round-the-clock 60°C hot water for 120 hospital beds and patient sterilization facilities.",
    problem:
      "High electrical heating bills (over ₹1,20,000 monthly) to provide round-the-clock 60°C hot water for 120 hospital beds and patient sterilization facilities.",
    solutionProvided:
      "Designed a 5,000 LPD Evacuated Tube Collector (ETC) Solar Water Heating System integrated with heavy-duty food grade SS 304 insulated storage tanks and automated heat pump booster backup.",
    solution:
      "Designed a 5,000 LPD Evacuated Tube Collector (ETC) Solar Water Heating System integrated with heavy-duty food grade SS 304 insulated storage tanks and automated heat pump booster backup.",
    productsUsed: [
      "5000 LPD ETC Solar Collector Bank (Three-Target Borosilicate Glass)",
      "Food Grade SS 304 Stainless Steel Inner Storage Tank",
      "PUF High-Density Thermal Insulation",
      "Automatic Electrical Temperature Booster",
    ],
    projectDescription:
      "Turnkey solar water heating engineering for a premier multi-specialty hospital in Erode, delivering eco-friendly 80°C hot water around the clock and cutting power bills by 75%.",
    benefitsAchieved: [
      "Provides 24/7 hot water up to 80°C naturally using solar energy",
      "Cuts monthly electric power bills by over ₹85,000",
      "Full capital ROI achieved within 20 months",
      "Heavy PUF insulation retains heat overnight even during winter",
    ],
    keyHighlights: [
      "Provides 80°C hot water 24/7",
      "Saves over ₹10,000,00 annually in electricity",
      "Includes automatic thermal backup",
    ],
    testimonial: {
      quote:
        "Yuvanthika Aquacare's solar engineering exceeded our expectations. Our hospital energy bills dropped instantly, and their technical support in Erode is outstanding.",
      clientName: "Dr. K. Arulmani",
      designation: "Medical Director",
      company: "Erode Specialty Hospital",
    },
    projectImages: [
      {
        url: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
        caption: "Roof-mounted 5000 LPD ETC solar array installed on hospital roof in Erode",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
        caption: "Roof-mounted 5000 LPD ETC solar array installed on hospital roof in Erode",
      },
    ],
    featured: true,
  },
  {
    id: "proj-etp-erode",
    slug: "zero-liquid-discharge-etp-plant-erode",
    projectTitle: "Zero Liquid Discharge (ZLD) Effluent Treatment Plant in Erode",
    projectName: "Zero Liquid Discharge (ZLD) ETP Plant",
    projectType: "ETP Plant",
    location: "Perundurai SIPCOT, Erode",
    district: "Erode",
    customerCategory: "industrial",
    category: "industrial",
    industryType: "Chemical & Dyeing Processing",
    industry: "Chemical & Dyeing Processing",
    capacity: "100 KLD (100,000 Liters Per Day)",
    installationDate: "2024-03",
    completionYear: "2024",
    problemFaced:
      "Strict TNPCB (Tamil Nadu Pollution Control Board) regulations required zero liquid discharge compliance for toxic textile dyeing effluent carrying high COD, BOD, and total dissolved solids.",
    problem:
      "Strict TNPCB (Tamil Nadu Pollution Control Board) regulations required zero liquid discharge compliance for toxic textile dyeing effluent carrying high COD, BOD, and total dissolved solids.",
    solutionProvided:
      "Turnkey installation of a 100 KLD ETP with primary chemical coagulation, secondary biological MBBR aeration, ultrafiltration (UF), high-pressure RO recovery, and MEE (Multi-Effect Evaporator) crystallizer.",
    solution:
      "Turnkey installation of a 100 KLD ETP with primary chemical coagulation, secondary biological MBBR aeration, ultrafiltration (UF), high-pressure RO recovery, and MEE (Multi-Effect Evaporator) crystallizer.",
    productsUsed: [
      "FRP Primary Clarifier & Chemical Dosing Skid",
      "MBBR Biological Aeration Diffusers",
      "Ultrafiltration (UF) Membrane Skid",
      "High Pressure RO Effluent Recovery Plant",
      "Multi-Effect Evaporator (MEE) Crystallizer",
    ],
    projectDescription:
      "A landmark Zero Liquid Discharge (ZLD) ETP installation in Erode SIPCOT, ensuring 98% treated water recovery for textile re-use and complete TNPCB compliance.",
    benefitsAchieved: [
      "Recovers 98% of industrial effluent water for reuse in dyeing",
      "100% compliance with TNPCB environmental discharge norms",
      "Recovers dry salt crystals for industrial disposal",
      "Reduces fresh groundwater intake by 100,000 liters per day",
    ],
    keyHighlights: [
      "98% water recovery rate",
      "100% TNPCB ZLD compliance",
      "Includes 24/7 technical O&M deployment",
    ],
    testimonial: {
      quote:
        "We achieved 100% TNPCB regulatory compliance effortlessly. The team's expertise in ETP maintenance and ZLD chemistry across Tamil Nadu is unmatched.",
      clientName: "R. Prakash",
      designation: "General Manager - Operations",
      company: "Apex Fabrics & Chemicals Ltd, Erode",
    },
    projectImages: [
      {
        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
        caption: "Aeration tank and secondary clarifier setup for biological waste reduction",
      },
      {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        caption: "Multi-effect evaporator and RO permeate recovery unit",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
        caption: "Aeration tank and secondary clarifier setup for biological waste reduction",
      },
    ],
    featured: true,
  },
  {
    id: "proj-stp-trichy",
    slug: "commercial-apartment-stp-plant-trichy",
    projectTitle: "MBBR Technology Sewage Treatment Plant in Tiruchirappalli",
    projectName: "MBBR Technology Sewage Treatment Plant",
    projectType: "STP Plant",
    location: "Thillai Nagar, Tiruchirappalli",
    district: "Tiruchirappalli",
    customerCategory: "commercial",
    category: "commercial",
    industryType: "Residential Apartments & Real Estate",
    industry: "Residential Apartments & Real Estate",
    capacity: "75 KLD (250 Apartment Units)",
    installationDate: "2023-08",
    completionYear: "2023",
    problemFaced:
      "A 250-unit residential apartment complex faced skyrocketing tanker water purchasing costs and municipal sewage disposal restrictions, requiring on-site wastewater recycling.",
    problem:
      "A 250-unit residential apartment complex faced skyrocketing tanker water purchasing costs and municipal sewage disposal restrictions, requiring on-site wastewater recycling.",
    solutionProvided:
      "Engineered an underground 75 KLD Moving Bed Biofilm Reactor (MBBR) Sewage Treatment Plant featuring dual-media filtration, activated carbon polishing, and chlorination, producing odor-free water for gardening and flushing.",
    solution:
      "Engineered an underground 75 KLD Moving Bed Biofilm Reactor (MBBR) Sewage Treatment Plant featuring dual-media filtration, activated carbon polishing, and chlorination, producing odor-free water for gardening and flushing.",
    productsUsed: [
      "MBBR Bio-Media Carriers & Submerged Aeration Blowers",
      "Tube Settler Clarifier Unit",
      "Pressure Sand & Carbon Filters",
      "Automatic Ozonator & Chlorine Dosing Pump",
    ],
    projectDescription:
      "Compact, odor-free Sewage Treatment Plant (STP) installed in Trichy, converting domestic sewage into clear recycled water for toilet flushing and landscape green belts.",
    benefitsAchieved: [
      "Recycles 75,000 liters of domestic sewage daily",
      "Saves over ₹45,000 monthly in municipal tanker water purchasing",
      "Zero odor emissions with subterranean MBBR tank design",
      "Meets TNPCB non-potable discharge standards",
    ],
    keyHighlights: [
      "Zero odor subterranean installation",
      "Recycles 75 KLD for landscape & flushing",
      "Includes monthly water quality audits",
    ],
    testimonial: {
      quote:
        "Our resident association reduced fresh water purchasing costs by over ₹45,000 monthly. Yuvanthika Aquacare handles complete operation & maintenance seamlessly.",
      clientName: "Dr. S. Ramanathan",
      designation: "President",
      company: "Royal Heights Apartment Owners Association, Trichy",
    },
    projectImages: [
      {
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
        caption: "Subsurface MBBR reactor tanks and blower piping network",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
        caption: "Subsurface MBBR reactor tanks and blower piping network",
      },
    ],
    featured: false,
  },
  {
    id: "proj-dm-salem",
    slug: "demineralization-dm-plant-salem",
    projectTitle: "Dual-Bed Deionizer Demineralization (DM) Plant in Salem",
    projectName: "Dual-Bed Deionizer DM Plant",
    projectType: "DM Plant",
    location: "Mettur Industrial Area, Salem",
    district: "Salem",
    customerCategory: "industrial",
    category: "industrial",
    industryType: "Thermal Power & Boiler Feedwater",
    industry: "Thermal Power & Boiler Feedwater",
    capacity: "10,000 LPH High-Purity DM Water",
    installationDate: "2022-09",
    completionYear: "2022",
    problemFaced:
      "High conductivity and silica impurities in supply water caused severe boiler scale deposits, tube ruptures, and unscheduled power plant shutdowns.",
    problem:
      "High conductivity and silica impurities in supply water caused severe boiler scale deposits, tube ruptures, and unscheduled power plant shutdowns.",
    solutionProvided:
      "Built a custom Cation-Anion Degasser DM Water Plant with high-capacity nuclear grade resins, maintaining electrical conductivity below 1.0 µS/cm and silica under 0.02 PPM.",
    solution:
      "Built a custom Cation-Anion Degasser DM Water Plant with high-capacity nuclear grade resins, maintaining electrical conductivity below 1.0 µS/cm and silica under 0.02 PPM.",
    productsUsed: [
      "Strong Acid Cation (SAC) Exchanger Column",
      "Strong Base Anion (SBA) Exchanger Column",
      "Atmospheric Degasser Tower with Blower",
      "Rubber-Lined Hydrochloric Acid & Sodium Hydroxide Regeneration Skid",
    ],
    projectDescription:
      "High-purity Demineralization (DM) Plant commissioned in Salem Mettur belt, delivering ultra-pure boiler feed water for power plant turbines.",
    benefitsAchieved: [
      "Produces ultra-pure water with conductivity < 1.0 µS/cm",
      "Silica content reduced below 0.02 PPM",
      "Protected high-pressure steam boilers from scaling for 3+ years",
      "Automatic chemical regeneration system with safety neutralizer pit",
    ],
    keyHighlights: [
      "Conductivity below 1.0 µS/cm",
      "Zero boiler shutdown in 3+ years",
      "Nuclear-grade ion exchange resins",
    ],
    testimonial: {
      quote:
        "The DM water quality produced by Yuvanthika Aquacare & Solar Care Systems has protected our boilers from scale for over 3 years without a single unscheduled shutdown.",
      clientName: "M. Elango",
      designation: "Chief Engineer",
      company: "Salem Cogeneration Utilities, Salem",
    },
    projectImages: [
      {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        caption: "Cation and Anion exchanger columns with automatic regeneration skid",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        caption: "Cation and Anion exchanger columns with automatic regeneration skid",
      },
    ],
    featured: false,
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}

export async function getDynamicProjects(): Promise<ProjectItem[]> {
  if (prisma) {
    try {
      const dbProjects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (dbProjects.length > 0) {
        return dbProjects.map((p) => ({
          id: p.id,
          slug: p.slug,
          projectTitle: p.projectTitle,
          projectName: p.projectTitle,
          projectType: p.projectType,
          location: p.location,
          district: p.district,
          customerCategory: p.customerCategory as ServiceCategoryType,
          category: p.customerCategory as ServiceCategoryType,
          industryType: p.industryType,
          industry: p.industryType,
          capacity: p.capacity,
          installationDate: p.installationDate,
          completionYear: p.installationDate.slice(0, 4),
          problemFaced: p.problemFaced,
          problem: p.problemFaced,
          solutionProvided: p.solutionProvided,
          solution: p.solutionProvided,
          productsUsed: p.productsUsed,
          projectDescription: p.projectDescription,
          benefitsAchieved: p.benefitsAchieved,
          testimonial: p.testimonialQuote
            ? {
                quote: p.testimonialQuote,
                clientName: p.clientName || "Valued Client",
                designation: p.designation || "Managing Director",
                company: p.company || "Local Enterprise",
                rating: 5,
              }
            : undefined,
          projectImages: Array.isArray(p.projectImages)
            ? (p.projectImages as unknown as Array<{ url: string; caption: string }>)
            : [{ url: "/products/7-wave-krystal.webp", caption: "Installation View" }],
          gallery: Array.isArray(p.projectImages)
            ? (p.projectImages as unknown as Array<{ url: string; caption: string }>)
            : [],
          featured: p.featured,
        }));
      }
    } catch (e) {
      console.warn("DB project query fallback:", e);
    }
  }
  return PROJECTS_DATA;
}

export async function getDynamicProjectBySlug(slug: string): Promise<ProjectItem | undefined> {
  if (prisma) {
    try {
      const p = await prisma.project.findUnique({ where: { slug } });
      if (p) {
        return {
          id: p.id,
          slug: p.slug,
          projectTitle: p.projectTitle,
          projectName: p.projectTitle,
          projectType: p.projectType,
          location: p.location,
          district: p.district,
          customerCategory: p.customerCategory as ServiceCategoryType,
          category: p.customerCategory as ServiceCategoryType,
          industryType: p.industryType,
          industry: p.industryType,
          capacity: p.capacity,
          installationDate: p.installationDate,
          completionYear: p.installationDate.slice(0, 4),
          problemFaced: p.problemFaced,
          problem: p.problemFaced,
          solutionProvided: p.solutionProvided,
          solution: p.solutionProvided,
          productsUsed: p.productsUsed,
          projectDescription: p.projectDescription,
          benefitsAchieved: p.benefitsAchieved,
          testimonial: p.testimonialQuote
            ? {
                quote: p.testimonialQuote,
                clientName: p.clientName || "Valued Client",
                designation: p.designation || "Managing Director",
                company: p.company || "Local Enterprise",
                rating: 5,
              }
            : undefined,
          projectImages: Array.isArray(p.projectImages)
            ? (p.projectImages as unknown as Array<{ url: string; caption: string }>)
            : [{ url: "/products/7-wave-krystal.webp", caption: "Installation View" }],
          gallery: Array.isArray(p.projectImages)
            ? (p.projectImages as unknown as Array<{ url: string; caption: string }>)
            : [],
          featured: p.featured,
        };
      }
    } catch (e) {
      console.warn("DB project slug query fallback:", e);
    }
  }
  return getProjectBySlug(slug);
}

export function getFeaturedProjects(): ProjectItem[] {
  return PROJECTS_DATA.filter((p) => p.featured);
}

export function getProjectsByCategory(category: ServiceCategoryType): ProjectItem[] {
  return PROJECTS_DATA.filter((p) => p.customerCategory === category || p.category === category);
}

/** Generates social post templates (GBP, FB, IG, SEO summary) from project data */
export function generateSocialPostPack(project: ProjectItem) {
  const title = project.projectTitle || project.projectName || "Water Treatment Project";
  const dist = project.district;
  const type = project.projectType;
  const cap = project.capacity;
  const siteUrl = `${SITE_URL}/projects/${project.slug}`;

  return {
    gbpPostTitle: `🎉 New Project Completed: ${type} Installation in ${dist}!`,
    gbpDescription: `Yuvanthika Aquacare & Solar Care Systems successfully installed a ${cap} ${type} in ${project.location}, ${dist}.\n\n🔹 Problem Solved: ${project.problemFaced}\n🔹 Solution: ${project.solutionProvided}\n🔹 Results: ${project.benefitsAchieved[0] || "100% Purity Guaranteed"}\n\nLooking for reliable water treatment or solar care in ${dist} or across Tamil Nadu? Call us today at ${PHONE_DISPLAY} or visit ${siteUrl}!`,
    facebookPost: `⚡ PROJECT SPOTLIGHT: ${title} ⚡\n\nWe are proud to share another successful engineering milestone by Yuvanthika Aquacare & Solar Care Systems!\n\n📍 Location: ${project.location}, ${dist}\n🏢 Industry: ${project.industryType}\n💧 Capacity: ${cap}\n\nKey Highlights:\n${project.benefitsAchieved.map((b) => `✅ ${b}`).join("\n")}\n\nRead the complete case study: ${siteUrl}\n\nNeed RO, Water Softeners, Solar Heaters, ETP, or STP in Tamil Nadu?\n📞 Call / WhatsApp: ${PHONE_DISPLAY}\n🌐 Website: ${SITE_URL}`,
    instagramCaption: `💧 ${type} Installation Completed in ${dist}, Tamil Nadu! 🚀\n\nAnother benchmark project executed by Yuvanthika Aquacare & Solar Care Systems.\n\n📍 Location: ${project.location}\n⚙️ Capacity: ${cap}\n🏭 Industry: ${project.industryType}\n\nClient Feedback: "${project.testimonial?.quote || "Excellent service and water quality!"}" — ${project.testimonial?.clientName || "Satisfied Client"}\n\nTap the link in bio to read full case study 🔗\n\n#YuvanthikaAquacare #${dist.replace(/\s+/g, '')}Water #${type.replace(/\s+/g, '')} #WaterSoftenerKarur #TamilNaduRO #IndustrialRO #SolarWaterHeater #ETPPlant #STPPlant #Karur`,
    seoSummary: `${title}: ${cap} ${type} designed and commissioned in ${project.location}, ${dist} by Yuvanthika Aquacare & Solar Care Systems (${FORMER_COMPANY_NAME}). Solved groundwater hardness and high TDS issues with guaranteed performance and 24/7 AMC service across Tamil Nadu.`,
  };
}

