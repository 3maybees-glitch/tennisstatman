import type { Surface } from "@/lib/data/tournaments";

/** Famous landmark photo per tournament — Unsplash, keyed by tournament id. */
const LANDMARK_BY_TOURNAMENT: Record<string, string> = {
  "brisbane-international":
    "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=600&h=340&q=80",
  "auckland-open":
    "https://images.unsplash.com/photo-1507692049794-de58290a4334?auto=format&fit=crop&w=600&h=340&q=80",
  "canberra-challenger":
    "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=600&h=340&q=80",
  "australian-open":
    "https://images.unsplash.com/photo-1514391318159-4b8ffb9f27e8?auto=format&fit=crop&w=600&h=340&q=80",
  "itf-monastir-w15":
    "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&h=340&q=80",
  "rotterdam-open":
    "https://images.unsplash.com/photo-1534351590666-13e498e93798?auto=format&fit=crop&w=600&h=340&q=80",
  "doha-open-wta":
    "https://images.unsplash.com/photo-1582407947302-f6059da5387c?auto=format&fit=crop&w=600&h=340&q=80",
  "rio-open":
    "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&h=340&q=80",
  "dubai-championships":
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&h=340&q=80",
  "cherbourg-challenger":
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&h=340&q=80",
  "indian-wells":
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&h=340&q=80",
  "miami-open":
    "https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=600&h=340&q=80",
  "itf-antalya-m25":
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&h=340&q=80",
  "monte-carlo":
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&h=340&q=80",
  "stuttgart-open":
    "https://images.unsplash.com/photo-1599946347371-68eb71b16c44?auto=format&fit=crop&w=600&h=340&q=80",
  "barcelona-open":
    "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=600&h=340&q=80",
  "madrid-open":
    "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=600&h=340&q=80",
  "oeiras-challenger":
    "https://images.unsplash.com/photo-1555881403-6737b88fefc6?auto=format&fit=crop&w=600&h=340&q=80",
  "rome-masters":
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&h=340&q=80",
  "french-open":
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&h=340&q=80",
  "itf-changwon-w35":
    "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=600&h=340&q=80",
  "stuttgart-grass":
    "https://images.unsplash.com/photo-1599946347371-68eb71b16c44?auto=format&fit=crop&w=600&h=340&q=80",
  "queens-club":
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&h=340&q=80",
  "halle-open":
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&h=340&q=80",
  wimbledon:
    "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=600&h=340&q=80",
  "ilkley-challenger":
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&h=340&q=80",
  "hamburg-open":
    "https://images.unsplash.com/photo-1560969184-10fe6639e044?auto=format&fit=crop&w=600&h=340&q=80",
  "prague-open":
    "https://images.unsplash.com/photo-1541849542889-b65b193cd3c5?auto=format&fit=crop&w=600&h=340&q=80",
  "itf-porto-w75":
    "https://images.unsplash.com/photo-1555881403-6737b88fefc6?auto=format&fit=crop&w=600&h=340&q=80",
  "canadian-open":
    "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=600&h=340&q=80",
  "cincinnati-open":
    "https://images.unsplash.com/photo-1570077188670-e3a8e69ad5cb?auto=format&fit=crop&w=600&h=340&q=80",
  "us-open":
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&h=340&q=80",
  "cary-challenger":
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&h=340&q=80",
  "beijing-open":
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&h=340&q=80",
  "tokyo-open":
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&h=340&q=80",
  "shanghai-masters":
    "https://images.unsplash.com/photo-1535350356005-fd52b3b524fb?auto=format&fit=crop&w=600&h=340&q=80",
  "wuhan-open":
    "https://images.unsplash.com/photo-1599571234909-29ed5d13f2f0?auto=format&fit=crop&w=600&h=340&q=80",
  "itf-hua-hin-w50":
    "https://images.unsplash.com/photo-1552465011-b4e21bf6e79d?auto=format&fit=crop&w=600&h=340&q=80",
  "paris-masters":
    "https://images.unsplash.com/photo-1508057192744-750c6d7235e1?auto=format&fit=crop&w=600&h=340&q=80",
  "wta-finals":
    "https://images.unsplash.com/photo-1591604128229-632f4f4f1b47?auto=format&fit=crop&w=600&h=340&q=80",
  "atp-finals":
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=600&h=340&q=80",
};

/** City-level fallback when a tournament id isn't mapped. */
const LANDMARK_BY_CITY: Record<string, string> = {
  Brisbane:
    "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=600&h=340&q=80",
  Auckland:
    "https://images.unsplash.com/photo-1507692049794-de58290a4334?auto=format&fit=crop&w=600&h=340&q=80",
  Melbourne:
    "https://images.unsplash.com/photo-1514391318159-4b8ffb9f27e8?auto=format&fit=crop&w=600&h=340&q=80",
  Paris:
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&h=340&q=80",
  London:
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&h=340&q=80",
  "New York":
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&h=340&q=80",
  Rome:
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&h=340&q=80",
  Barcelona:
    "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=600&h=340&q=80",
  Madrid:
    "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=600&h=340&q=80",
  Tokyo:
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&h=340&q=80",
  Shanghai:
    "https://images.unsplash.com/photo-1535350356005-fd52b3b524fb?auto=format&fit=crop&w=600&h=340&q=80",
  Beijing:
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&h=340&q=80",
  Dubai:
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&h=340&q=80",
  Miami:
    "https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=600&h=340&q=80",
  Turin:
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=600&h=340&q=80",
};

export function getTournamentLandmarkUrl(
  tournamentId: string,
  city: string,
): string | undefined {
  return (
    LANDMARK_BY_TOURNAMENT[tournamentId] ??
    LANDMARK_BY_CITY[city.split(" / ")[0] ?? city]
  );
}

export function getLandmarkAlt(city: string, country: string): string {
  return `Landmark in ${city}, ${country}`;
}

/** Surface-tinted placeholder when no landmark image is available. */
export function surfacePlaceholderGradient(surface: Surface): string {
  const colors: Record<Surface, [string, string]> = {
    hard: ["#1e3a5f", "#0d1b2a"],
    clay: ["#7c2d12", "#431407"],
    grass: ["#14532d", "#052e16"],
    indoor: ["#4c1d95", "#1e1b4b"],
  };
  const [a, b] = colors[surface];
  return `linear-gradient(135deg, ${a}, ${b})`;
}
