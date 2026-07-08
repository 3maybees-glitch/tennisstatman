"use client";

import Image from "next/image";
import { useState } from "react";
import type { Surface } from "@/lib/data/tournaments";
import {
  getLandmarkAlt,
  getTournamentLandmarkUrl,
  surfacePlaceholderGradient,
} from "@/lib/images/tournament-landmarks";
import { MapPin } from "lucide-react";

type Props = {
  tournamentId: string;
  city: string;
  country: string;
  surface: Surface;
  className?: string;
  aspectClass?: string;
  priority?: boolean;
};

export function TournamentImage({
  tournamentId,
  city,
  country,
  surface,
  className = "",
  aspectClass = "aspect-[16/9]",
  priority = false,
}: Props) {
  const [failed, setFailed] = useState(false);
  const url = getTournamentLandmarkUrl(tournamentId, city);

  if (!url || failed) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden ${aspectClass} ${className}`}
        style={{ background: surfacePlaceholderGradient(surface) }}
        aria-label={getLandmarkAlt(city, country)}
      >
        <MapPin size={28} className="text-white/40" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectClass} ${className}`}>
      <Image
        src={url}
        alt={getLandmarkAlt(city, country)}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover"
        priority={priority}
        onError={() => setFailed(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
    </div>
  );
}
