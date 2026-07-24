import type { ReactNode } from "react";
import type { WarMapEdition } from "@/lib/data/guides/war-map-2026";

export function WarMapPreview({ edition }: { edition: WarMapEdition }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gold/30 bg-navy-light shadow-[0_0_0_1px_rgba(212,175,55,0.08)]">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-gold/40 bg-navy px-4 py-3 sm:px-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
            {edition.brand}
          </p>
          <h3 className="text-2xl font-bold tracking-wide text-white sm:text-3xl">
            {edition.title}
          </h3>
          <p className="text-xs text-gold-light">
            {edition.subtitle} · {edition.editionLabel}
          </p>
        </div>
        <span className="rounded-md bg-gold px-3 py-1.5 text-xs font-bold text-navy">
          DIGITAL · {edition.priceLabel}
        </span>
      </div>

      <p className="border-l-2 border-gold bg-navy/60 px-4 py-3 text-sm leading-relaxed text-muted sm:px-5">
        {edition.headlineTake}
      </p>

      <div className="grid gap-0 lg:grid-cols-3">
        <section className="space-y-4 border-b border-white/5 p-4 lg:border-b-0 lg:border-r sm:p-5">
          <PreviewBlock title="ATP Depth Chart" accent="text-sky-400">
            {edition.atpDepth.slice(0, 8).map((r) => (
              <PreviewLine key={`atp-${r.pos}`}>
                <span className="font-semibold text-gold">
                  {String(r.pos).padStart(2, "0")}
                </span>{" "}
                <span className="font-semibold text-white">{r.name}</span> ·{" "}
                {r.role}
              </PreviewLine>
            ))}
            <p className="text-[11px] text-muted">+4 more on the full sheet</p>
          </PreviewBlock>
          <PreviewBlock title="WTA Depth Chart" accent="text-pink-400">
            {edition.wtaDepth.slice(0, 8).map((r) => (
              <PreviewLine key={`wta-${r.pos}`}>
                <span className="font-semibold text-gold">
                  {String(r.pos).padStart(2, "0")}
                </span>{" "}
                <span className="font-semibold text-white">{r.name}</span> ·{" "}
                {r.role}
              </PreviewLine>
            ))}
            <p className="text-[11px] text-muted">+4 more on the full sheet</p>
          </PreviewBlock>
        </section>

        <section className="space-y-4 border-b border-white/5 p-4 lg:border-b-0 lg:border-r sm:p-5">
          <PreviewBlock title="Battle Schedule">
            {edition.schedule.slice(0, 6).map((g) => (
              <PreviewLine key={g.event}>
                <span className="font-semibold text-gold">{g.when}</span>{" "}
                {g.event} — {g.stake}
              </PreviewLine>
            ))}
          </PreviewBlock>
          <PreviewBlock title="Slam Scores">
            {edition.slamPredictions.map((p) => (
              <PreviewLine key={p.slam}>
                <span className="font-semibold text-gold">{p.slam}</span> M:{" "}
                {p.mens} ({p.mensScore}) · W: {p.womens} ({p.womensScore})
              </PreviewLine>
            ))}
          </PreviewBlock>
          <PreviewBlock title="Bowl Placements">
            {edition.bowlPlacements.slice(0, 2).map((b) => (
              <PreviewLine key={b.bowl}>
                <span className="font-semibold text-white">{b.bowl}</span> —{" "}
                {b.note}
              </PreviewLine>
            ))}
          </PreviewBlock>
        </section>

        <section className="space-y-4 p-4 sm:p-5">
          <PreviewBlock title="Unit Grades">
            {edition.unitGrades.slice(0, 6).map((u) => (
              <PreviewLine key={u.unit}>
                <span className="inline-block w-6 font-bold text-gold">
                  {u.grade}
                </span>{" "}
                {u.unit}
              </PreviewLine>
            ))}
          </PreviewBlock>
          <PreviewBlock title="Freshman Hopefuls">
            {edition.freshmanHopefuls.slice(0, 4).map((f) => (
              <PreviewLine key={f.name}>
                <span className="font-semibold text-white">{f.name}</span> (
                {f.tour}) — {f.upside}
              </PreviewLine>
            ))}
          </PreviewBlock>
          <PreviewBlock title="NFL-Style Draft Board">
            {edition.draftBoard.slice(0, 4).map((d) => (
              <PreviewLine key={`${d.round}-${d.name}`}>
                <span className="font-bold text-gold">{d.round}</span>{" "}
                {d.name} — {d.ceiling}
              </PreviewLine>
            ))}
          </PreviewBlock>
        </section>
      </div>
    </div>
  );
}

function PreviewBlock({
  title,
  accent,
  children,
}: {
  title: string;
  accent?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h4
        className={`mb-2 text-[11px] font-bold uppercase tracking-[0.14em] ${accent ?? "text-gold-light"}`}
      >
        {title}
      </h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function PreviewLine({ children }: { children: ReactNode }) {
  return <p className="text-xs leading-snug text-muted">{children}</p>;
}
