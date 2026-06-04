import type { MetadataRoute } from "next";
import { buildSitemap } from "@/config/sitemap.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap();
}
