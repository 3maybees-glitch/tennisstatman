import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: SITE_NAME,
    short_name: "TennisStatMan",
    description: SITE_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#070d18",
    theme_color: "#d4af37",
    categories: ["sports", "entertainment"],
    shortcuts: [
      {
        name: "Rankings",
        short_name: "Rankings",
        url: "/rankings",
        icons: [{ src: "/icons/icon-192", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "PULSE",
        short_name: "PULSE",
        url: "/stats/pulse",
        icons: [{ src: "/icons/icon-192", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Players",
        short_name: "Players",
        url: "/players",
        icons: [{ src: "/icons/icon-192", sizes: "192x192", type: "image/png" }],
      },
    ],
    icons: [
      {
        src: "/icons/icon-192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512-maskable",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
