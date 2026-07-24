import type { GuidePlayer } from "@/lib/data/guides/types";
import { buildPlayerArtSvg } from "@/lib/guides/player-art";
import { buildRadarSvg } from "@/lib/guides/radar-geometry";

export function GuidePlayerPreview({ player }: { player: GuidePlayer }) {
  const art = buildPlayerArtSvg(player, 280);
  const radar = buildRadarSvg({ skills: player.skills, size: 280 });

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-navy-light/70">
      <div className="border-b border-white/5 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          Sample page · {player.tour} #{player.rank}
        </p>
        <h3 className="mt-1 text-2xl font-bold text-white">{player.name}</h3>
        <p className="text-sm text-gold-light">{player.playstyle}</p>
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-2">
        <div
          className="overflow-hidden rounded-xl"
          dangerouslySetInnerHTML={{ __html: art }}
        />
        <div
          className="overflow-hidden rounded-xl"
          dangerouslySetInnerHTML={{ __html: radar }}
        />
      </div>

      <div className="grid gap-3 px-5 pb-5 sm:grid-cols-3">
        <PreviewStat label="Born" value={String(player.birthYear)} />
        <PreviewStat label="Height" value={`${player.heightCm} cm`} />
        <PreviewStat label="Years on tour" value={String(player.yearsOnTour)} />
        <PreviewStat label="Location" value={player.location} />
        <PreviewStat label="Current rank" value={`No. ${player.rank}`} />
        <PreviewStat label="Last year" value={`No. ${player.rankLastYear}`} />
      </div>

      <div className="space-y-3 border-t border-white/5 px-5 py-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gold">
            Best strengths
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {player.strengths}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gold">
            Worst weaknesses
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {player.weaknesses}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gold">
            Fun fact
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {player.funFact}
          </p>
        </div>
      </div>
    </article>
  );
}

function PreviewStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-navy/60 px-3 py-2.5">
      <p className="text-[10px] uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
