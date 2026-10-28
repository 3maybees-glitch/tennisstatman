import type { MetadataRoute } from "next";
import { getFullRoster } from "@/lib/data/roster";
import { absoluteUrl } from "@/lib/seo/site";

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/players", changeFrequency: "hourly", priority: 0.95 },
  { path: "/rankings", changeFrequency: "hourly", priority: 0.95 },
  { path: "/atp", changeFrequency: "hourly", priority: 0.9 },
  { path: "/wta", changeFrequency: "hourly", priority: 0.9 },
  { path: "/stats/pulse", changeFrequency: "daily", priority: 0.9 },
  { path: "/stats/momentum", changeFrequency: "weekly", priority: 0.85 },
  { path: "/stats/skills", changeFrequency: "daily", priority: 0.85 },
  { path: "/stats", changeFrequency: "weekly", priority: 0.85 },
  { path: "/legends", changeFrequency: "weekly", priority: 0.85 },
  { path: "/calendar", changeFrequency: "weekly", priority: 0.85 },
  { path: "/map", changeFrequency: "weekly", priority: 0.8 },
  { path: "/race", changeFrequency: "daily", priority: 0.8 },
  { path: "/race/picks", changeFrequency: "weekly", priority: 0.75 },
  { path: "/prints", changeFrequency: "monthly", priority: 0.75 },
  { path: "/guides/summer-2026", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.7 },
];

/** Regenerate daily so lastmod is the generation date, not a deploy frozen in source. */
export const revalidate = 86_400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const roster = await getFullRoster();
  const generatedAt = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: absoluteUrl(path),
      lastModified: generatedAt,
      changeFrequency,
      priority,
    }),
  );

  const playerEntries: MetadataRoute.Sitemap = roster.map((player) => ({
    url: absoluteUrl(`/players/${player.id}`),
    lastModified: generatedAt,
    changeFrequency: "daily",
    priority: player.rank <= 20 ? 0.85 : 0.7,
  }));

  return [...staticEntries, ...playerEntries];
}
