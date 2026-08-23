# 🚀 How to Add a New Project / Case Study

This guide explains how to add new project case studies, images, and videos to **Yuvanthika Aquacare & Solar Care Systems** (https://yuvanthikaaquasolar.in). 

The website uses a scalable, data-driven architecture. Adding a new project entry automatically generates:
1. A dedicated SEO-optimized URL at `/projects/[slug]`
2. Dynamic local SEO titles, descriptions, and keywords
3. JSON-LD `CaseStudy`, `LocalBusiness`, and `Service` schemas
4. Entry in `sitemap.xml`
5. Ready-to-use Google Business Profile, Facebook, and Instagram social post templates

---

## 📁 Step 1: Place Project Images (Optional)

If you have actual photos of the installation:
1. Place image files inside the `/public/projects/` directory (e.g. `/public/projects/my-new-ro-plant.jpg`).
2. Alternatively, you can use external hosted image URLs (e.g. Unsplash, Cloudinary, AWS S3).

---

## 📝 Step 2: Add Project Entry in `lib/site/projects.ts`

Open `d:\aquacare solar care\lib\site\projects.ts` and append a new object to the `PROJECTS_DATA` array:

```typescript
{
  id: "proj-my-new-project-1",
  slug: "industrial-ro-plant-namakkal", // URL: /projects/industrial-ro-plant-namakkal
  projectTitle: "100,000 LPH High Recovery Industrial RO Plant in Namakkal",
  projectType: "Industrial RO Plant", // e.g., "Industrial RO Plant", "Water Softener", "Solar Water Heater", "ETP Plant", "STP Plant", "DM Plant"
  location: "Mohanur Road, Namakkal",
  district: "Namakkal",
  customerCategory: "industrial", // "residential" | "commercial" | "industrial"
  industryType: "Paper & Pulp Industry",
  capacity: "100,000 Liters Per Hour (100 KLD)",
  installationDate: "2024-05",
  problemFaced:
    "High raw water turbidity and hardness over 2,000 PPM caused frequent paper manufacturing downtime and boiler tube pitting.",
  solutionProvided:
    "Installed a 100 KLD automated multi-stage Industrial RO plant with pre-clarifier filtration, anti-scalant dosing, and PLC automation.",
  productsUsed: [
    "100 KLD Multi-Stage RO Skid",
    "High-Pressure SS 316 Pump",
    "FRP Pressure Vessels",
    "Automated PLC Panel",
  ],
  projectDescription:
    "Turnkey EPC industrial water treatment plant engineered for a premier paper mill in Namakkal, delivering pure process water under 30 PPM TDS.",
  benefitsAchieved: [
    "Feed TDS reduced from 2,000 PPM to under 30 PPM",
    "Saves over ₹5,00,000 annually in paper processing chemicals",
    "100% operational uptime with 24/7 AMC monitoring",
  ],
  testimonial: {
    quote: "Yuvanthika Aquacare delivered an exceptional RO plant. Our production efficiency increased significantly.",
    clientName: "M. Saravanan",
    designation: "General Manager",
    company: "Namakkal Paper Mills Ltd",
  },
  projectImages: [
    {
      url: "/projects/my-new-ro-plant.jpg", // or full HTTP URL
      caption: "100 KLD RO Skid installed in Namakkal",
    },
  ],
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID", // Optional YouTube Embed URL
  featured: true, // Set true to feature on Homepage
}
```

---

## ⚡ Step 3: Test and Deploy

Run the build command to verify your new project page:

```bash
npm run build
```

Your new project will automatically be live at:
`https://yuvanthikaaquasolar.in/projects/industrial-ro-plant-namakkal`

No HTML or page code modifications required!
