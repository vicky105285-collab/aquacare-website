import {
  Droplets,
  Sun,
  Wrench,
  Shield,
  Clock,
  Award,
  Zap,
  ThumbsUp,
  CheckCircle,
  Waves,
  Refrigerator,
  WashingMachine,
} from "lucide-react";
import { CALL, MAPS_DIRECTIONS_URL, WHATSAPP } from "./constants";
import type {
  AmcPlanItem,
  BookingStep,
  ContactChannelCard,
  FooterServiceLink,
  HeroFeatureCard,
  ProductItem,
  ServiceItem,
  StatItem,
  TestimonialItem,
  TrustItem,
  WhyChoosePoint,
} from "./types";

export const STATS: StatItem[] = [
  { val: "12+", label: "Years Experience" },
  { val: "8,500+", label: "Happy Customers" },
  { val: "15,000+", label: "Services Done" },
  { val: "98%", label: "Satisfaction Rate" },
];

export const HERO_FEATURE_CARDS: HeroFeatureCard[] = [
  { icon: Droplets, title: "RO Purifiers", sub: "From ₹8,999", color: "from-cyan-500 to-blue-600" },
  { icon: Sun, title: "Solar Systems", sub: "Save 80% Bills", color: "from-amber-500 to-orange-500" },
  { icon: Shield, title: "AMC Plans", sub: "From ₹999/yr", color: "from-teal-500 to-cyan-600" },
  { icon: Wrench, title: "Same-Day Service", sub: "All Brands", color: "from-blue-600 to-indigo-600" },
];

export const TRUST_ITEMS: TrustItem[] = [
  { icon: Award, text: "ISO Certified" },
  { icon: ThumbsUp, text: "MNRE Empanelled" },
  { icon: Shield, text: "Genuine Spare Parts" },
  { icon: Clock, text: "Same-Day Service" },
  { icon: CheckCircle, text: "2-Year Warranty" },
];

export const SERVICES: ServiceItem[] = [
  {
    slug: "ro-water-purifier",
    icon: Droplets,
    title: "RO Water Purifiers",
    tamil: "RO நீர் சுத்திகரிப்பு",
    desc: "Premium multi-stage filtration systems for pure, safe drinking water for your family.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    slug: "ro-service",
    icon: Wrench,
    title: "RO Service & Repair",
    tamil: "சேவை & பழுது",
    desc: "Expert technicians for same-day service, filter replacement, and complete overhaul.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    slug: "amc",
    icon: Shield,
    title: "AMC Plans",
    tamil: "வருடாந்திர பராமரிப்பு",
    desc: "Comprehensive annual maintenance contracts with priority support and free filters.",
    color: "from-teal-500 to-cyan-600",
  },
  {
    slug: "solar-water-heater",
    icon: Sun,
    title: "Solar Water Heater",
    tamil: "சோலார் வாட்டர் ஹீட்டர்",
    desc: "High-efficiency solar thermal systems. Cut electricity bills by up to 80%.",
    color: "from-amber-500 to-orange-500",
  },
  {
    slug: "solar-panel",
    icon: Zap,
    title: "Solar Panel Installation",
    tamil: "சோலார் பேனல்",
    desc: "Grid-tie and off-grid photovoltaic systems with MNRE-certified installations.",
    color: "from-yellow-500 to-amber-600",
  },
  {
    slug: "water-softener",
    icon: Waves,
    title: "Water Softener",
    tamil: "வாட்டர் சாஃப்டனர்",
    desc: "Ion-exchange softening systems that protect appliances and skin from hard water.",
    color: "from-sky-500 to-blue-500",
  },
  {
    slug: "fridge-repair",
    icon: Refrigerator,
    title: "Fridge Repair",
    tamil: "குளிர்சாதனப் பெட்டி பழுது",
    desc: "All brands. Gas refilling, compressor, thermostat, and door seal repairs.",
    color: "from-blue-600 to-violet-600",
  },
  {
    slug: "washing-machine-repair",
    icon: WashingMachine,
    title: "Washing Machine Repair",
    tamil: "வாஷிங் மெஷின் பழுது",
    desc: "Top-load & front-load specialists. Motor, drum, PCB and pump repairs.",
    color: "from-indigo-500 to-blue-600",
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    name: "Aqua Shark",
    brand: "WATERNET",
    tag: "Best Seller",
    price: "₹8,500",
    mrp: null,
    liters: "12L/Hr",
    stages: "5 Stage",
    tank: "8L Tank",
    img: "/products/aqua_shark.jpeg",
    features: ["Alkaline RO purifier", "Auto on/off function", "Antibacterial tank", "Wall/table top mount"],
  },
  {
    name: "Blue Rock",
    brand: "WATERNET",
    tag: "TDS Control",
    price: "₹9,500",
    mrp: null,
    liters: "18L/Hr",
    stages: "6 Stage",
    tank: "8L Tank",
    img: "/products/blue_rock.jpeg",
    features: ["Fully automatic service", "TDS controller", "Water scale indicator", "Computer controlled operation"],
  },
  {
    name: "Aqua Angel",
    brand: "WATERNET",
    tag: "Alkaline",
    price: "₹12,500",
    mrp: null,
    liters: "18L/Hr",
    stages: "7 Stage",
    tank: "10L Tank",
    img: "/products/AQUA_ANGEL.jpeg",
    features: ["Detachable washable tank", "LED indicator panel", "Anti-bacterial coating", "Voltage spike protection"],
  },
  {
    name: "Aqua Zebra",
    brand: "WATERNET",
    tag: "Alkaline RO",
    price: "₹15,500",
    mrp: null,
    liters: "12L/Hr",
    stages: "9 Stage",
    tank: "10L Tank",
    img: "/products/AQUA_ZEBRA.jpeg",
    features: ["Anti-oxidant alkaline water", "LED indicator", "Detachable washable tank", "TDS mineral technology"],
  },
  {
    name: "Crown Star",
    brand: "BLUE MOUNT",
    tag: "Most Advanced",
    price: "₹17,500",
    mrp: null,
    liters: "18L/Hr",
    stages: "12 Stage",
    tank: "12L Tank",
    img: "/products/CROWN_STAR.jpeg",
    features: ["12-stage purification", "Anti-oxidant alkaline tech", "Fully automatic service", "Computer controlled operation"],
  },
  {
    name: "Waternet Tulips",
    brand: "WATERNET",
    tag: "Steel Body",
    price: "₹22,500",
    mrp: null,
    liters: "18L/Hr",
    stages: "12 Stage",
    tank: "9L Tank",
    img: "/products/WATERNET_TULIPS.jpeg",
    features: ["304 grade stainless steel", "Anti-oxidant alkaline water", "Detachable washable tank", "Fully automatic service"],
  },
  {
    name: "Whale RO + UF",
    brand: "WHALE",
    tag: "Family Size",
    price: "Call for Price",
    mrp: null,
    liters: "25L Tank",
    stages: "RO + UF",
    tank: "25L Tank",
    img: "/products/waternet_whale_25L.jpeg",
    features: ["Extra large 25L storage", "Dual RO + UF purification", "Ideal for large families", "Modern designer look"],
  },
];

export const AMC_PLANS: AmcPlanItem[] = [
  {
    name: "Silver",
    price: "₹999",
    period: "/year",
    color: "from-slate-400 to-slate-600",
    features: ["2 Preventive Services", "Filter Check", "Phone Support", "10% Parts Discount"],
  },
  {
    name: "Gold",
    price: "₹1,999",
    period: "/year",
    color: "from-amber-400 to-yellow-600",
    highlight: true,
    features: ["4 Preventive Services", "1 Free Filter Set", "Priority Support", "20% Parts Discount", "Free Emergency Visit"],
  },
  {
    name: "Platinum",
    price: "₹3,499",
    period: "/year",
    color: "from-cyan-500 to-blue-600",
    features: ["6 Preventive Services", "All Filters Included", "24/7 Support", "Free All Parts", "Free Emergency Visit", "Annual Deep Clean"],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Rajesh Kumar",
    loc: "Karur",
    stars: 5,
    text: "Excellent service! My RO purifier was installed within hours. The water quality is fantastic. Highly recommend Aqua Care to everyone.",
  },
  {
    name: "Priya Lakshmi",
    loc: "Kulithalai",
    stars: 5,
    text: "Solar water heater எடுத்தோம். மாதம் ₹800 மிச்சமாகிறது. Perfect installation and after-sales support. 5 stars!",
  },
  {
    name: "Mohammed Farooq",
    loc: "Tiruchirappalli",
    stars: 5,
    text: "Best AMC plan in the region. They come on time, professional staff, and genuine spare parts. Trust them completely.",
  },
  {
    name: "Kavitha Devi",
    loc: "Aravakurichi",
    stars: 5,
    text: "Washing machine repair was done same day. Technician explained the problem clearly. Very transparent pricing. Great experience!",
  },
];

export const WHY_CHOOSE_POINTS: WhyChoosePoint[] = [
  { icon: Clock, title: "Same-Day Service", desc: "Book before noon, get service today" },
  { icon: Award, title: "Certified Technicians", desc: "Factory-trained, background-verified" },
  { icon: Shield, title: "Genuine Parts", desc: "100% authentic spare parts only" },
  { icon: ThumbsUp, title: "Price Transparency", desc: "No hidden charges, ever" },
];

export const BOOKING_STEPS: BookingStep[] = [
  { step: "01", title: "Call or WhatsApp Us", desc: "Reach us anytime between 8 AM – 8 PM" },
  { step: "02", title: "Schedule a Visit", desc: "Pick a time slot that works for you" },
  { step: "03", title: "Expert Arrives", desc: "Certified technician at your doorstep" },
];

export const CONTACT_CARDS: ContactChannelCard[] = [
  {
    icon: "phone",
    title: "Call Us",
    lines: ["+91 85266 64424", "Mon–Sun: 8 AM – 8 PM"],
    link: CALL,
    label: "Call Now",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: "message",
    title: "WhatsApp",
    lines: ["Chat with us 24/7", "Quick response guaranteed"],
    link: WHATSAPP,
    label: "Open WhatsApp",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: "map",
    title: "Visit Us",
    lines: ["123, Sakthi Nagar, Karur", "Tamil Nadu – 639 001"],
    link: MAPS_DIRECTIONS_URL,
    label: "Get Directions",
    color: "from-orange-500 to-red-500",
  },
];

export const FOOTER_SERVICE_LINKS: FooterServiceLink[] = SERVICES.map((s) => ({
  label: s.title,
  href: `/services/${s.slug}`,
}));
