import type { ServiceDetail, ServiceSlug } from "./types";

export const SERVICE_SLUGS: ServiceSlug[] = [
  // Residential
  "ro-water-purifier",
  "ro-installation",
  "ro-service",
  "ro-amc",
  "water-softener",
  "solar-water-heater",
  "solar-system-maintenance",
  "ups-battery-replacement",
  "washing-machine-service",
  "refrigerator-service",
  // Commercial
  "commercial-ro-plant",
  "commercial-water-treatment-plant",
  // Industrial
  "industrial-ro-plant",
  "dm-plant",
  "etp-plant",
  "stp-plant",
  "industrial-water-treatment-plant",
  "operation-and-maintenance-services",
  // Legacy / aliases
  "amc",
  "solar-panel",
  "fridge-repair",
  "washing-machine-repair",
];

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "ro-water-purifier": {
    slug: "ro-water-purifier",
    category: "residential",
    metaTitle: "RO Water Purifier Sales & Installation Karur | Yuvanthika Aquacare",
    metaDescription:
      "Hospital-grade multi-stage RO water purifiers with copper, alkaline & UV filtration for homes in Karur, Namakkal, Erode & Tamil Nadu. 10+ years trust.",
    keywords: [
      "RO Water Purifier Karur",
      "Domestic RO Purifier Tamil Nadu",
      "Alkaline RO Purifier",
      "Yuvanthika Aquacare RO",
      "Best RO Water Purifier Karur",
    ],
    heroTitle: "Residential RO Water Purifiers",
    heroSubtitle:
      "Hospital-grade multi-stage purification designed specifically for hard groundwater and municipal Cauvery water across Karur and Tamil Nadu.",
    tamilLine: "வீட்டு RO நீர் சுத்திகரிப்பு — தூய்மையான மற்றும் ஆரோக்கியமான குடிநீர்.",
    benefits: [
      {
        title: "Multi-Stage Advanced Filtration",
        body: "Pre-sediment, activated carbon, RO membrane, UV disinfection, and post-carbon mineral cartridge ensure 100% pure and safe drinking water.",
      },
      {
        title: "Custom Sized for Local Water TDS",
        body: "Whether your water supply is 300 PPM Cauvery river water or 2500+ PPM borewell water in Karur, we select the exact membrane technology for optimal purification.",
      },
      {
        title: "Genuine Consumables & Copper / Alkaline Options",
        body: "Authentic membranes and active copper/alkaline remineralization filters restore natural pH (7.2 - 8.0) and essential minerals.",
      },
      {
        title: "Tidy Installation & Post-Sales Support",
        body: "Clean mounting, voltage stabilization check, leak testing, and TDS level demonstration at handover by verified technicians.",
      },
    ],
    features: [
      { title: "High-Capacity Booster Pump", desc: "Delivers strong water flow even in low input pressure areas." },
      { title: "Smart Auto-Cut Valve", desc: "Saves water and electricity by shutting off automatically when tank fills." },
      { title: "Food-Grade ABS Tank", desc: "Germ-free, unbreakable 8L - 12L purified water storage tank." },
    ],
    specifications: [
      { key: "Purification Capacity", value: "15 to 25 Liters Per Hour" },
      { key: "TDS Reduction", value: "Up to 95% TDS reduction" },
      { key: "Storage Tank Capacity", value: "8L / 10L / 12L Food Grade ABS" },
      { key: "Input Voltage", value: "160V - 260V AC with SMPS Protection" },
      { key: "Warranty", value: "1 Year Comprehensive Warranty" },
    ],
    process: [
      { step: "01", title: "Free Water Quality Audit", desc: "TDS, hardness, and turbidity testing at your home." },
      { step: "02", title: "Model Sizing & Selection", desc: "Recommending wall-mount or tabletop RO purifier tailored to usage." },
      { step: "03", title: "Neat Installation & Handover", desc: "Professional plumbing, electrical safety check, and live TDS demonstration." },
      { step: "04", title: "Proactive Service Reminders", desc: "Timely quarterly checkups and AMC notifications." },
    ],
    faqs: [
      {
        q: "How often should RO water purifier filters be changed?",
        a: "Outer pre-filters should be replaced every 3 to 4 months in high-sediment areas like Karur. Internal sediment and carbon filters are serviced every 6 to 8 months, while the RO membrane lasts 12 to 18 months.",
      },
      {
        q: "What TDS level is safe for drinking water?",
        a: "According to WHO and BIS standards, drinking water TDS between 50 PPM and 150 PPM with essential minerals is considered ideal for human health.",
      },
      {
        q: "Do you service other RO brands in Karur?",
        a: "Yes! Yuvanthika Aquacare services all leading RO brands with genuine spare parts across Karur, Namakkal, Erode, and Tiruchirappalli.",
      },
    ],
    localSeoContent: [
      { district: "Karur", details: "Doorstep installation across Gandhigramam, Vengamedu, Thanthonimalai, Reddipalayam, and Velayuthampalayam." },
      { district: "Namakkal & Erode", details: "Same-day service available in Paramathi Velur, Tiruchengode, Perundurai, and Erode town." },
    ],
  },
  "ro-installation": {
    slug: "ro-installation",
    category: "residential",
    metaTitle: "Professional RO Installation & Uninstallation Services Karur",
    metaDescription:
      "Expert doorstep RO water purifier installation, uninstallation, wall mounting, and re-installation across Karur, Namakkal, Erode, and Tamil Nadu.",
    keywords: ["RO Installation Karur", "RO Wall Mounting", "RO Fitting Service", "Water Purifier Installation"],
    heroTitle: "Doorstep RO Installation & Mounting",
    heroSubtitle: "Safe, leak-proof, high-precision RO water purifier installation by certified technicians.",
    tamilLine: "தொழில்முறை RO நீர் சுத்திகரிப்பு நிறுவல் சேவை.",
    benefits: [
      { title: "Precision Plumbing", body: "Heavy-duty brass wall valves and food-grade tubing prevent micro-leaks." },
      { title: "Electrical Safety", body: "Insulation testing and SMPS voltage stabilizing to protect pump motors." },
      { title: "TDS Calibration", body: "Live TDS meter measurement before and after installation to ensure pure output." },
    ],
    process: [
      { step: "01", title: "Site Inspection", desc: "Checking water inlet pressure, drain outlet, and power socket." },
      { step: "02", title: "Wall Mounting & Plumbing", desc: "Securing wall brackets and connecting inlet divert valve." },
      { step: "03", title: "Flush & Calibration", desc: "Flushing carbon dust and setting output TDS level." },
    ],
    faqs: [
      { q: "How long does RO installation take?", a: "Standard RO installation takes 30 to 45 minutes." },
      { q: "Do you assist with shifting RO during house moves?", a: "Yes, we handle complete uninstallation, safe packing, and re-installation at your new home." },
    ],
  },
  "ro-service": {
    slug: "ro-service",
    category: "residential",
    metaTitle: "Same-Day RO Service & Repair in Karur | Yuvanthika Aquacare",
    metaDescription:
      "Fast same-day doorstep RO water purifier repair, filter change, motor pump fix, leak repair in Karur, Namakkal, Erode. Call +91 84288 88854.",
    keywords: ["RO Service Karur", "RO Repair Near Me", "Water Purifier Service Karur", "RO Filter Change"],
    heroTitle: "Fast Same-Day RO Service & Repair",
    heroSubtitle: "Rapid technician visits, transparent diagnosis, and authentic spare parts for all RO models.",
    tamilLine: "விரைவான RO சேவை மற்றும் பழுதுபார்த்தல்.",
    benefits: [
      { title: "Same-Day Response", body: "Morning calls get same-day technician visits in Karur and surrounding areas." },
      { title: "Genuine Replacement Spares", body: "High-flow pumps, Solenoid Valves, membranes, and food-grade filter cartridges." },
      { title: "Transparent Pricing", body: "Clear upfront quote before work starts—no hidden charges." },
    ],
    process: [
      { step: "01", title: "Book Visit", desc: "Call +91 84288 88854 or send a WhatsApp message." },
      { step: "02", title: "Diagnostic Check", desc: "Technician inspects pump pressure, membrane rejection, and filter health." },
      { step: "03", title: "On-Site Repair & Demo", desc: "Immediate component replacement and TDS verification." },
    ],
    faqs: [
      { q: "Why is water flowing slowly from my RO tap?", a: "Slow water flow indicates a clogged pre-filter, depleted RO membrane, or weak booster pump pressure." },
      { q: "What causes continuous drain water leakage?", a: "A damaged Solenoid Valve (SV) or Auto Shut-off Valve (ASV) is usually responsible for unending drain water flow." },
    ],
  },
  "ro-amc": {
    slug: "ro-amc",
    category: "residential",
    metaTitle: "RO Annual Maintenance Contract (AMC) Karur | Yuvanthika",
    metaDescription:
      "Hassle-free RO AMC plans in Karur with unlimited breakdown calls, free filter changes, and proactive quarterly visits.",
    keywords: ["RO AMC Karur", "Annual Maintenance Contract RO", "RO Maintenance Plan", "RO Service Contract"],
    heroTitle: "Worry-Free RO AMC Maintenance Plans",
    heroSubtitle: "Protect your drinking water 365 days a year with unlimited breakdown visits and free filter replacements.",
    tamilLine: "வருடாந்திர RO பராமரிப்பு திட்டம் (AMC).",
    benefits: [
      { title: "Free Filter Replacements", body: "Includes sediment, pre-carbon, post-carbon filters, and RO membrane depending on plan." },
      { title: "Unlimited Breakdown Visits", body: "Zero visiting charges throughout the 12-month AMC period." },
      { title: "Scheduled Quarterly Servicing", body: "Proactive sanitization and tank cleaning every 90 days." },
    ],
    process: [
      { step: "01", title: "Select AMC Plan", desc: "Choose Basic, Comprehensive, or Premium Mineral AMC package." },
      { step: "02", title: "Initial Machine Audit", desc: "Technician overhauls unit and certifies RO condition." },
      { step: "03", title: "365-Day Protection", desc: "Enjoy uninterrupted pure water with priority scheduling." },
    ],
    faqs: [
      { q: "What does the Comprehensive RO AMC cover?", a: "It covers all routine filter changes, RO membrane replacement, electrical spare repairs (pump, SMPS, SV), and unlimited service visits." },
    ],
  },
  "water-softener": {
    slug: "water-softener",
    category: "residential",
    metaTitle: "Best Water Softener Systems in Karur & Tamil Nadu | Yuvanthika",
    metaDescription:
      "Eliminate hard water scale, protect solar heaters, geysers, hair & skin with custom ion-exchange water softeners in Karur & Tamil Nadu.",
    keywords: ["Water Softener Karur", "Hard Water Softener Tamil Nadu", "Ion Exchange Softener", "Whole House Softener Karur"],
    heroTitle: "Whole House Hard Water Softeners",
    heroSubtitle: "Say goodbye to stubborn limescale, ruined geysers, dry skin, and clogged plumbing across Karur district.",
    tamilLine: "கடின நீர் மென்மையாக்கும் கருவி — அளப்பரிய நன்மைகள்.",
    benefits: [
      { title: "100% Limescale Protection", body: "Protects solar water heaters, wall tiles, chrome taps, and piping from white mineral scale." },
      { title: "Healthy Hair & Soft Skin", body: "Soft water preserves skin moisture balance and prevents hair breakage." },
      { title: "50% Savings on Detergents", body: "Soaps lather effortlessly, drastically reducing laundry and dishwashing detergent costs." },
    ],
    specifications: [
      { key: "Flow Rate Capacity", value: "1,000 to 15,000 Liters Per Hour" },
      { key: "Vessel Material", value: "FRP (Fiberglass Reinforced Plastic) / SS 304" },
      { key: "Resin Grade", value: "Food Grade High Exchange Cation Resin" },
      { key: "Regeneration Type", value: "Automatic Volumetric / Manual Multi-port Valve" },
    ],
    process: [
      { step: "01", title: "Water Hardness Test", desc: "On-site PPM hardness measurement of borewell water." },
      { step: "02", title: "System Sizing", desc: "Selecting vessel size based on daily family water consumption." },
      { step: "03", title: "Main Line Installation", desc: "Connecting softener to overhead tank inlet with bypass valve." },
    ],
    faqs: [
      { q: "How do I know if my home needs a water softener?", a: "If white scaling forms on taps, solar tubes, tile walls, or if soap fails to lather, your borewell water is hard and needs a softener." },
      { q: "How often does salt regeneration need to be performed?", a: "Regeneration frequency depends on water hardness and consumption—typically once every 7 to 14 days." },
    ],
  },
  "solar-water-heater": {
    slug: "solar-water-heater",
    category: "residential",
    metaTitle: "Solar Water Heater Sales, Installation & Service Karur",
    metaDescription:
      "24/7 hot water with high-efficiency ETC solar water heaters in Karur, Namakkal, Erode. Reduce electric power bills by 70%.",
    keywords: ["Solar Water Heater Karur", "ETC Solar Heater Tamil Nadu", "Solar Geyser Installation", "Yuvanthika Solar Care"],
    heroTitle: "Solar Water Heaters (ETC & FPC)",
    heroSubtitle: "Enjoy 24/7 steaming hot water naturally—slash electricity bills and rely on Tamil Nadu solar power.",
    tamilLine: "சூரிய ஒளி நீர் சூடாக்கி — 24 மணி நேர சுடுநீர்.",
    benefits: [
      { title: "Zero Electric Power Dependency", body: "Heats water up to 80°C using solar radiation even on overcast days." },
      { title: "Heavy Duty Glass-Lined Tank", body: "Resists hard water corrosion and mineral scaling for decades." },
      { title: "Payback in 18 to 24 Months", body: "Saves thousands of rupees annually on electric power bills." },
    ],
    specifications: [
      { key: "Capacity Options", value: "100 LPD, 150 LPD, 200 LPD, 300 LPD, 500 LPD to Commercial" },
      { key: "Collector Type", value: "Three-Target Vacuum Glass ETC Tubes" },
      { key: "Inner Tank Material", value: "SUS 304 2B Stainless Steel / Glass-Lined" },
      { key: "Insulation", value: "50mm High Density Polyurethane Foam (PUF)" },
    ],
    process: [
      { step: "01", title: "Roof Survey & Shadow Check", desc: "Surveying rooftop direction for maximum solar absorption." },
      { step: "02", title: "Frame & Tank Assembly", desc: "Rigid galvanized frame mounting and insulated tank positioning." },
      { step: "03", title: "Tube Insertion & Plumbing", desc: "Inserting glass collector tubes and connecting hot water outlet." },
    ],
    faqs: [
      { q: "Does a solar water heater work during monsoon cloudy days?", a: "Yes! High-efficiency ETC vacuum tubes absorb diffuse solar radiation. Electric backup heaters ensure hot water during heavy rainy periods." },
    ],
  },
  "solar-system-maintenance": {
    slug: "solar-system-maintenance",
    category: "residential",
    metaTitle: "Solar Water Heater Repair & Descaling Service Karur",
    metaDescription:
      "Expert solar water heater repair, glass tube replacement, tank descaling, and plumbing leak fix across Karur & Tamil Nadu.",
    keywords: ["Solar Heater Service Karur", "Solar Tube Replacement", "Solar Tank Descaling", "Solar Heater Repair"],
    heroTitle: "Solar Heater Service & Tank Descaling",
    heroSubtitle: "Restore lost hot water temperature, flush out hard scale sludge, and replace broken collector tubes.",
    tamilLine: "சூரிய சக்தி சூடாக்கி பழுது மற்றும் பராமரிப்பு.",
    benefits: [
      { title: "Hard Water Descaling", body: "Flushing mineral scale from inside glass vacuum tubes and storage tank." },
      { title: "Broken Tube Replacement", body: "Immediate replacement of cracked or damaged ETC glass tubes." },
      { title: "Sacrificial Anode Fitting", body: "Installing new magnesium sacrificial anodes to stop tank corrosion." },
    ],
    process: [
      { step: "01", title: "Thermal Check", desc: "Measuring inlet/outlet water temp and inspect tube seal gaskets." },
      { step: "02", title: "Drain & Descale", desc: "Safely draining system and flushing calcium deposits." },
      { step: "03", title: "Pressure Test", desc: "Checking piping connections for zero leaks." },
    ],
    faqs: [
      { q: "Why is my solar heater water not hot enough?", a: "Scale buildup inside glass tubes or shadow blockage often lowers water temperature. Descaling restores original efficiency." },
    ],
  },
  "ups-battery-replacement": {
    slug: "ups-battery-replacement",
    category: "residential",
    metaTitle: "UPS & Inverter Battery Sales & Service Karur | Yuvanthika",
    metaDescription:
      "Home inverter UPS sales, battery replacement, tubular battery maintenance & acid topping in Karur, Namakkal, Erode.",
    keywords: ["UPS Battery Karur", "Inverter Battery Service", "Tubular Battery Replacement", "UPS Repair Karur"],
    heroTitle: "Home UPS & Inverter Battery Services",
    heroSubtitle: "Uninterrupted power backup for your home and office with certified tubular batteries and inverter service.",
    tamilLine: "இன்வெர்ட்டர் மற்றும் பேட்டரி சேவை.",
    benefits: [
      { title: "Long-Life Tubular Batteries", body: "High-capacity deep-discharge batteries suited for Tamil Nadu summer load shedding." },
      { title: "Battery Health Testing", body: "Digital gravity testing, voltage drop test under load, and terminal cleaning." },
      { title: "Old Battery Buyback", body: "Attractive exchange discount on your old weak inverter battery." },
    ],
    process: [
      { step: "01", title: "Load Assessment", desc: "Calculating wattage requirement for fans, lights, and appliances." },
      { step: "02", title: "Battery Delivery & Fitting", desc: "Neat installation with terminal anti-corrosion petroleum gel coating." },
    ],
    faqs: [
      { q: "How long does a tubular inverter battery last?", a: "A quality tubular battery lasts between 3 to 5 years with regular distilled water topping." },
    ],
  },
  "washing-machine-service": {
    slug: "washing-machine-service",
    category: "residential",
    metaTitle: "Washing Machine Service & Repair Karur | Front & Top Load",
    metaDescription:
      "Doorstep washing machine repair for top load, front load, semi-automatic units in Karur. Drum clean, motor, board repair.",
    keywords: ["Washing Machine Service Karur", "Washing Machine Repair Near Me", "Front Load Service", "Top Load Repair"],
    heroTitle: "Washing Machine Service & Repair",
    heroSubtitle: "Fast doorstep troubleshooting for all washing machine brands across Karur and surrounding regions.",
    tamilLine: "வாஷிங் மெஷின் பழுதுபார்க்கும் சேவை.",
    benefits: [
      { title: "All Brands Covered", body: "Expert technicians for LG, Samsung, Whirlpool, IFB, Bosch, Godrej." },
      { title: "Drum & Pump Overhaul", body: "Vibration dampening, drain pump clear, inlet valve repair, drum descaling." },
    ],
    process: [
      { step: "01", title: "Diagnostic Inspection", desc: "Identifying error codes, spin noise, water drainage, or PCB issues." },
      { step: "02", title: "Spare Replacement", desc: "Fitting authentic spare parts with service warranty." },
    ],
    faqs: [
      { q: "Why is my washing machine making loud noise during spin cycle?", a: "Worn tub bearings, loose drum counterweights, or unbalanced leveling feet cause excessive spin noise." },
    ],
  },
  "refrigerator-service": {
    slug: "refrigerator-service",
    category: "residential",
    metaTitle: "Refrigerator Service & Gas Charging Karur | Yuvanthika",
    metaDescription:
      "Expert fridge repair, cooling issues, compressor replacement, gas refill in Karur, Namakkal, Erode. Doorstep visits.",
    keywords: ["Refrigerator Service Karur", "Fridge Repair Near Me", "Fridge Gas Charging Karur", "Compressor Repair"],
    heroTitle: "Refrigerator Service & Gas Refill",
    heroSubtitle: "Keep your food fresh with doorstep cooling diagnosis, eco-refrigerant gas charging, and thermostat fixes.",
    tamilLine: "ஃபிரிட்ஜ் பழுது மற்றும் கேஸ் சார்ஜிங் சேவை.",
    benefits: [
      { title: "Cooling Problem Diagnosis", body: "Thermostat calibration, defrost heater fix, relay replacement." },
      { title: "Eco-Friendly Gas Charging", body: "R134a / R600a leak detection, vacuum evacuation, and precision gas refilling." },
    ],
    process: [
      { step: "01", title: "Leakage & Pressure Test", desc: "Nitrogen pressure testing to locate micro refrigerant leaks." },
      { step: "02", title: "Gas Refill & Testing", desc: "Vacuum evacuation and precise gas charging for optimal frost cooling." },
    ],
    faqs: [
      { q: "Why is the freezer cooling but lower fridge compartment warm?", a: "A clogged defrost drain, faulty defrost timer, or defective evaporator fan motor prevents cold air circulation." },
    ],
  },

  // Commercial Services
  "commercial-ro-plant": {
    slug: "commercial-ro-plant",
    category: "commercial",
    metaTitle: "Commercial RO Plant Installation Karur & Tamil Nadu (250-2000 LPH)",
    metaDescription:
      "Heavy-duty Commercial RO Water Plants for hotels, schools, hospitals, hostels & offices in Karur & Tamil Nadu. Turnkey solutions.",
    keywords: ["Commercial RO Plant Karur", "Commercial RO Tamil Nadu", "500 LPH RO Plant", "1000 LPH Commercial RO"],
    heroTitle: "Commercial RO Water Treatment Plants",
    heroSubtitle: "High-capacity 250 LPH to 5000 LPH RO systems engineered for schools, hospitals, restaurants, and office complexes.",
    tamilLine: "வணிக நிறுவனங்களுக்கான RO குடிநீர் சுத்திகரிப்பு ஆலை.",
    benefits: [
      { title: "Continuous Pure Drinking Water", body: "Supplies hundreds of staff, students, or guests with pure water under 50 PPM TDS." },
      { title: "Heavy Stainless Steel Skid", body: "Corrosion-proof SS 304 structure with stainless steel high-pressure pumps." },
      { title: "Low Maintenance Operational Costs", body: "Automated sand filter backwash and anti-scalant dosing preserve membrane life." },
    ],
    specifications: [
      { key: "Plant Capacities", value: "250 LPH, 500 LPH, 1000 LPH, 2000 LPH to 5000 LPH" },
      { key: "Structure", value: "SS 304 Skid Framework" },
      { key: "Membrane Brand", value: "Dow Filmtec / Hydranautics / Toray High Rejection" },
      { key: "Control Panel", value: "Digital Microprocessor / PLC with Flow Meters & TDS Monitors" },
    ],
    process: [
      { step: "01", title: "Water Lab Test & Sizing", desc: "Analyzing feed water TDS, hardness, and daily liter consumption." },
      { step: "02", title: "Custom Plant Fabrication", desc: "Assembling SS skid, pressure vessels, and dosing pumps." },
      { step: "03", title: "On-Site Erection & Handover", desc: "Piping installation, raw water pump connection, and staff training." },
    ],
    faqs: [
      { q: "What size commercial RO plant is needed for a school with 1000 students?", a: "A 500 LPH or 1000 LPH Commercial RO Plant with a 1000L SS storage tank provides ample safe drinking water." },
    ],
  },
  "commercial-water-treatment-plant": {
    slug: "commercial-water-treatment-plant",
    category: "commercial",
    metaTitle: "Commercial Water Treatment Plants Karur & Tamil Nadu",
    metaDescription:
      "Filtration, iron removal, softening & UV disinfection plants for hotels, apartments, commercial hubs in Karur & Tamil Nadu.",
    keywords: ["Commercial Water Treatment Karur", "Commercial Water Filter Tamil Nadu", "Iron Removal Filter"],
    heroTitle: "Commercial Water Treatment Plants",
    heroSubtitle: "Comprehensive raw water filtration, iron oxidation, and water softening systems for commercial properties.",
    tamilLine: "வணிக வளாக நீர் சுத்திகரிப்பு அமைப்புகள்.",
    benefits: [
      { title: "Iron & Manganese Removal", body: "Eliminates yellow water stains, metallic taste, and pipe corrosion." },
      { title: "Centralized Softening", body: "Protects commercial laundry, boiler feed, and bathroom plumbing." },
    ],
    process: [
      { step: "01", title: "Water Chemistry Analysis", desc: "Testing iron, turbidity, silica, and hard salt concentration." },
      { step: "02", title: "Multi-Barrier System Setup", desc: "Combining aeration, sand filtration, activated carbon, and softeners." },
    ],
    faqs: [
      { q: "How do you remove heavy iron from borewell water?", a: "We install Manganese Dioxide / Birm media pressure vessels combined with air aeration for 99% iron removal." },
    ],
  },

  // Industrial Services
  "industrial-ro-plant": {
    slug: "industrial-ro-plant",
    category: "industrial",
    metaTitle: "Industrial RO Plant Manufacturers Karur & Tamil Nadu (5 KLD - 500 KLD)",
    metaDescription:
      "Turnkey Industrial RO Plants for textile dyeing, pharma, chemical, paper & food industries across Karur & Tamil Nadu. High recovery.",
    keywords: ["Industrial RO Plant Karur", "Industrial RO Plant Tamil Nadu", "High Recovery RO Plant", "Textile Dyeing RO"],
    heroTitle: "Industrial RO Plants (5 KLD to 500 KLD)",
    heroSubtitle: "Heavy-duty process water purification plants engineered to handle extreme groundwater TDS up to 5000 PPM.",
    tamilLine: "தொழில்துறை RO சுத்திகரிப்பு ஆலை — துல்லியமான வடிவமைப்பு.",
    benefits: [
      { title: "Superior Water Recovery (Up to 80%)", body: "Multi-stage RO arrays maximize pure permeate output while reducing concentrate discharge." },
      { title: "PLC & CIP Automated Control", body: "Programmable logic control panel with automated Clean-In-Place membrane flushing." },
      { title: "Custom Engineering for Dyeing & Processing", body: "Delivers zero-hardness, ultra-low TDS water for consistent industrial batch quality." },
    ],
    specifications: [
      { key: "Capacity Range", value: "5,000 LPH to 100,000 LPH (5 KLD to 500 KLD)" },
      { key: "Operating Pressure", value: "15 to 25 Bar High Pressure SS 316 Skid" },
      { key: "Automation", value: "Fully Automatic PLC with HMI Touch Interface / Manual Backup" },
      { key: "Pretreatment", value: "Automatic Sand Filter, Activated Carbon & Dosing Skids" },
    ],
    process: [
      { step: "01", title: "Feed Water Analysis & Sizing", desc: "Full lab analysis of TDS, silica, COD, BOD, and SDI index." },
      { step: "02", title: "3D Engineering & Fabrication", desc: "Fabricating SS 316 skids, piping manifolds, and dosing skids." },
      { step: "03", title: "Commissioning & AMC Support", desc: "Site installation, membrane loading, flow balancing, and 24/7 AMC." },
    ],
    faqs: [
      { q: "Why is high recovery crucial for industrial RO plants in Tamil Nadu?", a: "High recovery reduces raw water purchasing costs and minimizes volume sent to evaporation plants or ZLD units." },
    ],
  },
  "dm-plant": {
    slug: "dm-plant",
    category: "industrial",
    metaTitle: "Demineralization (DM) Plant Manufacturers Karur & Tamil Nadu",
    metaDescription:
      "High-purity Demineralization (DM) water plants for boilers, power plants & electronics in Karur & Tamil Nadu. Conductivity <1 µS/cm.",
    keywords: ["DM Plant Karur", "Demineralization Plant Tamil Nadu", "Mixed Bed Deionizer", "Deionizer Plant"],
    heroTitle: "Demineralization (DM) Water Plants",
    heroSubtitle: "Produce ultra-pure water with near-zero electrical conductivity (<1.0 µS/cm) for boiler feedwater and chemical processing.",
    tamilLine: "டிமினரலைசேஷன் (DM) ஆலை — மிகத் தூய்மையான நீர்.",
    benefits: [
      { title: "Near Zero Conductivity Water", body: "Removes all dissolved ionic minerals ($Ca, Mg, Na, Cl, SO_4, SiO_2$) efficiently." },
      { title: "Boiler Scale & Corrosion Prevention", body: "Protects high-pressure steam boilers from tube blowout and scale deposits." },
      { title: "Dual-Bed & Mixed-Bed Options", body: "Strong Acid Cation (SAC) + Strong Base Anion (SBA) with Mixed Bed polishing." },
    ],
    specifications: [
      { key: "Water Conductivity", value: "< 1.0 µS/cm (Option for < 0.1 µS/cm with Mixed Bed)" },
      { key: "Vessel Material", value: "FRP / Rubber Lined Mild Steel (RLMS)" },
      { key: "Regeneration System", value: "Acid (HCl) & Alkali (NaOH) Chemical Dosing System" },
    ],
    process: [
      { step: "01", title: "Ionic Balance Sizing", desc: "Calculating cation/anion resin volume based on water ionic load." },
      { step: "02", title: "Plant Assembly", desc: "Installing SAC, Degasser Tower, SBA, and regeneration piping." },
    ],
    faqs: [
      { q: "What is the difference between an RO plant and a DM plant?", a: "An RO plant uses physical membrane filtration to reduce TDS by 90-95%, while a DM plant uses chemical ion exchange resins to eliminate 99.9% of ions." },
    ],
  },
  "etp-plant": {
    slug: "etp-plant",
    category: "industrial",
    metaTitle: "Effluent Treatment Plant (ETP) Karur & Tamil Nadu | ZLD Solutions",
    metaDescription:
      "TNPCB compliant Effluent Treatment Plants (ETP) & Zero Liquid Discharge (ZLD) for textile dyeing, chemical & paper mills in Tamil Nadu.",
    keywords: ["ETP Plant Karur", "Effluent Treatment Plant Tamil Nadu", "ZLD Plant Erode", "Textile ETP Plant"],
    heroTitle: "Effluent Treatment Plants (ETP) & ZLD",
    heroSubtitle: "Engineered industrial wastewater treatment plants guaranteeing strict TNPCB regulatory compliance and maximum water reuse.",
    tamilLine: "கழிவுநீர் சுத்திகரிப்பு ஆலை (ETP) மற்றும் ZLD.",
    benefits: [
      { title: "100% TNPCB Regulatory Compliance", body: "Dramatically lowers BOD, COD, TSS, oil & grease, and color parameters." },
      { title: "Zero Liquid Discharge (ZLD) Technology", body: "Recovers clean water for dyehouse reuse and crystallizes solid salts." },
      { title: "Bioreactors & Chemical Coagulation", body: "Combines physicochemical treatment, MBBR biological aeration, and UF/RO." },
    ],
    process: [
      { step: "01", title: "Effluent Testing", desc: "Measuring raw effluent BOD, COD, TDS, pH, and heavy metal load." },
      { step: "02", title: "ETP Design & Civil Layout", desc: "Designing equalization, primary clarifier, aeration tank, and filter press." },
      { step: "03", title: "Erection & Operation", desc: "Turnkey plant construction, bacterial culture seeding, and AMC maintenance." },
    ],
    faqs: [
      { q: "Why is Zero Liquid Discharge (ZLD) required for textile mills in Tamil Nadu?", a: "TNPCB rules prohibit discharge of untreated or treated chemical dyeing effluent into natural rivers to protect groundwater and agriculture." },
    ],
  },
  "stp-plant": {
    slug: "stp-plant",
    category: "industrial",
    metaTitle: "Sewage Treatment Plant (STP) Karur & Tamil Nadu (MBBR / SBR / MBR)",
    metaDescription:
      "Compact Sewage Treatment Plants (STP) for apartments, hospitals, hotels & commercial complexes in Karur & Tamil Nadu.",
    keywords: ["STP Plant Karur", "Sewage Treatment Plant Tamil Nadu", "MBBR STP Plant", "Apartment STP Service"],
    heroTitle: "Sewage Treatment Plants (STP)",
    heroSubtitle: "Turn domestic sewage into clear, odor-free non-potable water for garden irrigation and toilet flushing.",
    tamilLine: "சானிட்டரி கழிவுநீர் சுத்திகரிப்பு ஆலை (STP).",
    benefits: [
      { title: "Odorless & Compact Footprint", body: "Advanced MBBR and MBR bio-media technologies fit neatly underground or in basements." },
      { title: "Drastic Water Bill Reduction", body: "Saves thousands of daily liters by recycling water for landscaping and flushing." },
    ],
    process: [
      { step: "01", title: "Capacity Sizing", desc: "Calculating daily sewage volume based on occupant count." },
      { step: "02", title: "Installation & Seeding", desc: "Installing blowers, bio-media, clarifiers, and seeding active bio-cultures." },
    ],
    faqs: [
      { q: "What is the best technology for apartment STPs?", a: "MBBR (Moving Bed Biofilm Reactor) is widely preferred for apartments due to low maintenance, high stability, and compact space requirements." },
    ],
  },
  "industrial-water-treatment-plant": {
    slug: "industrial-water-treatment-plant",
    category: "industrial",
    metaTitle: "Industrial Water Treatment Plants Karur & Tamil Nadu | Yuvanthika",
    metaDescription:
      "Comprehensive raw water treatment, filtration, clarification & softening plants for manufacturing factories across Tamil Nadu.",
    keywords: ["Industrial Water Treatment Karur", "Factory Water Treatment Tamil Nadu", "Industrial Water Filter"],
    heroTitle: "Industrial Water Treatment Plants",
    heroSubtitle: "Complete raw water intake clarification, filtration, iron removal, and heavy softening skids for factories.",
    tamilLine: "தொழில்துறை முழுமையான நீர் சுத்திகரிப்பு அமைப்புகள்.",
    benefits: [
      { title: "Customized Water Lifecycle Engineering", body: "Tailored filtration systems addressing seasonal borewell and river water fluctuations." },
    ],
    process: [
      { step: "01", title: "Facility Water Audit", desc: "Comprehensive assessment of factory intake and utility requirements." },
      { step: "02", title: "System Execution", desc: "Turnkey supply, piping, installation, and operator training." },
    ],
    faqs: [
      { q: "Can you upgrade existing industrial water treatment plants?", a: "Yes! We revamp, descale, re-bed, and automate existing legacy water treatment plants." },
    ],
  },
  "operation-and-maintenance-services": {
    slug: "operation-and-maintenance-services",
    category: "industrial",
    metaTitle: "Industrial RO, ETP & STP Operation & Maintenance (O&M) Tamil Nadu",
    metaDescription:
      "24/7 skilled operator deployment, chemical supply & maintenance contracts for industrial RO, ETP, STP & DM plants across Tamil Nadu.",
    keywords: ["RO Plant O&M Karur", "ETP STP Maintenance Tamil Nadu", "Industrial Plant AMC", "Yuvanthika Plant Operation"],
    heroTitle: "Operation & Maintenance (O&M) Services",
    heroSubtitle: "Outsource your plant operations to experienced water engineers for 99%+ uptime, compliance, and chemical optimization.",
    tamilLine: "இயக்கம் மற்றும் பராமரிப்பு சேவைகள் (O&M).",
    benefits: [
      { title: "24/7 Skilled Operator Deployment", body: "Trained chemical technicians monitor plant parameters round-the-clock." },
      { title: "Guaranteed Water Quality & TNPCB Compliance", body: "Regular laboratory sampling, logbook audits, and preventive maintenance." },
      { title: "Chemical Supply & Spare Inventory", body: "Includes anti-scalants, coagulants, polymers, acids, and replacement cartridges." },
    ],
    process: [
      { step: "01", title: "Plant Audit & SLA Agreement", desc: "Auditing existing plant condition and establishing output water SLAs." },
      { step: "02", title: "Staff Deployment", desc: "Stationing qualified plant operators and field maintenance engineers." },
    ],
    faqs: [
      { q: "Why outsource RO/ETP/STP plant operations to Yuvanthika Aquacare?", a: "Outsourcing eliminates staffing headaches, reduces chemical waste, prevents costly breakdown downtime, and ensures 100% regulatory compliance." },
    ],
  },
};

// Aliases for legacy routes
SERVICE_DETAILS["amc"] = SERVICE_DETAILS["ro-amc"];
SERVICE_DETAILS["solar-panel"] = SERVICE_DETAILS["solar-water-heater"];
SERVICE_DETAILS["fridge-repair"] = SERVICE_DETAILS["refrigerator-service"];
SERVICE_DETAILS["washing-machine-repair"] = SERVICE_DETAILS["washing-machine-service"];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS[slug];
}
