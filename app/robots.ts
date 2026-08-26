import type { MetadataRoute } from "next";
import { metaData } from "./lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    host: metaData.baseUrl,
    sitemap: `${metaData.baseUrl}/sitemap.xml`,
  };
}
