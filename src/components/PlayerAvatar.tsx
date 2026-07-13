"use client";

import Image from "next/image";
import { useState } from "react";
import {
  getPlayerPortraitUrl,
  playerInitials,
} from "@/lib/images/player-portrait";

type Props = {
  playerId: string;
  name: string;
  tour: "ATP" | "WTA";
  rank?: number;
  size?: number;
  className?: string;
  priority?: boolean;
};

export function PlayerAvatar({
  playerId,
  name,
  tour,
  rank,
  size = 64,
  className = "",
  priority = false,
}: Props) {
  const [failed, setFailed] = useState(false);
  const tourColor = tour === "ATP" ? "#40916c" : "#8b5cf6";
  const initials = playerInitials(name);

  if (failed) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-full font-bold text-white ${className}`}
        style={{
          width: size,
          height: size,
          minWidth: size,
          minHeight: size,
          backgroundColor: tourColor,
          fontSize: size * 0.32,
        }}
        aria-label={`${name} portrait`}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className={`relative isolate shrink-0 overflow-hidden rounded-full ring-2 ring-white/10 ${className}`}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
    >
      <Image
        src={getPlayerPortraitUrl(playerId, size * 2, name)}
        alt={`${name} portrait`}
        width={size}
        height={size}
        sizes={`${size}px`}
        className="h-full w-full object-cover"
        priority={priority}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
