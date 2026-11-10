import type { MetadataRoute } from "next";
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://inaspaceworks.com";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/services", "/process", "/work", "/about", "/careers", "/contact"].map(p => ({ url: SITE + p, changeFrequency: "monthly", priority: p ? 0.7 : 1 }));
}
