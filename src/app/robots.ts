import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://xn--bambakawaffle-mtc.com.tr/sitemap.xml",
  };
}
