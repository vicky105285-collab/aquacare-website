import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site/constants";
import { SERVICE_SLUGS } from "@/lib/site/service-details";
import { BLOG_POSTS } from "@/lib/site/blog";
import { PROJECTS_DATA } from "@/lib/site/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/products",
    "/services",
    "/amc",
    "/gallery",
    "/blog",
    "/contact",
    "/projects",
    // Location-specific routes
    "/services/ro-service-karur",
    "/services/water-softener-karur",
    "/services/solar-water-heater-karur",
    "/services/industrial-ro-plant-tamil-nadu",
    "/services/commercial-ro-plant-tamil-nadu",
    "/services/etp-plant-tamil-nadu",
    "/services/stp-plant-tamil-nadu",
    "/services/dm-plant-tamil-nadu",
  ];

  const serviceRoutes = SERVICE_SLUGS.map((slug) => `/services/${slug}`);
  const blogRoutes = BLOG_POSTS.map((post) => `/blog/${post.slug}`);
  const projectRoutes = PROJECTS_DATA.map((proj) => `/projects/${proj.slug}`);

  const allPaths = Array.from(
    new Set([...staticRoutes, ...serviceRoutes, ...blogRoutes, ...projectRoutes])
  );

  const today = new Date().toISOString().split("T")[0];

  return allPaths.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: today,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.9 : 0.8,
  }));
}
