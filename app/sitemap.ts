import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const routes = ["/", "/product", "/about", "/contact", "/legal"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.baseUrl}${route === "/" ? "" : route}`,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
