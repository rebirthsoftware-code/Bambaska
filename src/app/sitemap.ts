import type { MetadataRoute } from "next";

const base = "https://xn--bambakawaffle-mtc.com.tr";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/menu",
    "/hakkimizda",
    "/konseptimiz",
    "/franchise",
    "/iletisim",
  ].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: p === "/menu" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.8,
  }));
}
