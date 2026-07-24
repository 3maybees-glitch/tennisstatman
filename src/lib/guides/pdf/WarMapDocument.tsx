import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { WarMapEdition } from "@/lib/data/guides/war-map-2026";

const c = {
  navy: "#0B1221",
  panel: "#121C30",
  gold: "#D4AF37",
  goldLight: "#F0C75E",
  court: "#2D6A4F",
  white: "#FFFFFF",
  muted: "#94A3B8",
  ink: "#E2E8F0",
  atp: "#60A5FA",
  wta: "#F472B6",
  line: "rgba(212,175,55,0.28)",
};

const s = StyleSheet.create({
  page: {
    backgroundColor: c.navy,
    color: c.ink,
    fontFamily: "Helvetica",
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottomWidth: 1.5,
    borderBottomColor: c.gold,
    paddingBottom: 6,
    marginBottom: 7,
  },
  brand: {
    fontSize: 8,
    color: c.gold,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  title: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: c.white,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 8,
    color: c.goldLight,
    marginTop: 1,
  },
  badge: {
    backgroundColor: c.gold,
    color: c.navy,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  take: {
    fontSize: 7.2,
    color: c.ink,
    lineHeight: 1.35,
    marginBottom: 7,
    padding: 5,
    backgroundColor: c.panel,
    borderLeftWidth: 2,
    borderLeftColor: c.gold,
  },
  row: {
    flexDirection: "row",
    gap: 6,
    flexGrow: 1,
  },
  col: {
    flexDirection: "column",
    gap: 5,
  },
  panel: {
    backgroundColor: c.panel,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: c.line,
    padding: 5,
  },
  h: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: c.goldLight,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  line: {
    fontSize: 6.4,
    color: c.ink,
    lineHeight: 1.28,
    marginBottom: 1.2,
  },
  muted: {
    fontSize: 5.8,
    color: c.muted,
    lineHeight: 1.25,
  },
  pos: {
    fontFamily: "Helvetica-Bold",
    color: c.gold,
    width: 10,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    color: c.white,
  },
  tagAtp: { color: c.atp, fontFamily: "Helvetica-Bold" },
  tagWta: { color: c.wta, fontFamily: "Helvetica-Bold" },
  grade: {
    fontFamily: "Helvetica-Bold",
    color: c.gold,
    width: 14,
  },
  footer: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: c.line,
    paddingTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 5.5,
    color: c.muted,
  },
});

function DepthBlock({
  title,
  color,
  rows,
}: {
  title: string;
  color: string;
  rows: WarMapEdition["atpDepth"];
}) {
  return (
    <View style={s.panel}>
      <Text style={{ ...s.h, color }}>{title}</Text>
      {rows.map((r) => (
        <Text key={`${title}-${r.pos}`} style={s.line} wrap={false}>
          <Text style={s.pos}>{String(r.pos).padStart(2, "0")}</Text>
          {"  "}
          <Text style={s.name}>{r.name}</Text>
          {" · "}
          {r.country}
          {" · "}
          <Text style={{ color: c.goldLight }}>{r.role}</Text>
          {" — "}
          <Text style={s.muted}>{r.note}</Text>
        </Text>
      ))}
    </View>
  );
}

export function WarMapDocument({ edition }: { edition: WarMapEdition }) {
  return (
    <Document
      title={`${edition.brand} ${edition.title}`}
      author="TennisStatMan"
      subject={edition.subtitle}
    >
      <Page size="LETTER" orientation="landscape" style={s.page}>
        <View style={s.header}>
          <View>
            <Text style={s.brand}>{edition.brand}</Text>
            <Text style={s.title}>{edition.title}</Text>
            <Text style={s.subtitle}>
              {edition.subtitle} · {edition.editionLabel}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end", gap: 3 }}>
            <Text style={s.badge}>DIGITAL · {edition.priceLabel}</Text>
            <Text style={s.muted}>Snapshot {edition.publishedAt}</Text>
          </View>
        </View>

        <Text style={s.take}>{edition.headlineTake}</Text>

        <View style={s.row}>
          {/* LEFT */}
          <View style={{ ...s.col, width: "32%" }}>
            <DepthBlock
              title="ATP Depth Chart · Positions"
              color={c.atp}
              rows={edition.atpDepth}
            />
            <DepthBlock
              title="WTA Depth Chart · Positions"
              color={c.wta}
              rows={edition.wtaDepth}
            />
          </View>

          {/* CENTER */}
          <View style={{ ...s.col, width: "36%" }}>
            <View style={s.panel}>
              <Text style={s.h}>2026 Battle Schedule</Text>
              {edition.schedule.map((g) => (
                <Text key={g.event} style={s.line} wrap={false}>
                  <Text style={{ color: c.gold, fontFamily: "Helvetica-Bold" }}>
                    {g.when}
                  </Text>
                  {"  "}
                  <Text style={s.name}>{g.event}</Text>
                  {" · "}
                  {g.surface}
                  {" — "}
                  <Text style={s.muted}>{g.stake}</Text>
                </Text>
              ))}
            </View>

            <View style={s.panel}>
              <Text style={s.h}>Slam Predictions · Projected Scores</Text>
              {edition.slamPredictions.map((p) => (
                <Text key={p.slam} style={s.line} wrap={false}>
                  <Text style={{ color: c.gold, fontFamily: "Helvetica-Bold" }}>
                    {p.slam}
                  </Text>
                  {"  M: "}
                  <Text style={s.name}>{p.mens}</Text>
                  {" ("}
                  {p.mensScore}
                  {")  ·  W: "}
                  <Text style={s.name}>{p.womens}</Text>
                  {" ("}
                  {p.womensScore}
                  {")"}
                </Text>
              ))}
            </View>

            <View style={s.panel}>
              <Text style={s.h}>Bowl Placements · Year-End Destinations</Text>
              {edition.bowlPlacements.map((b) => (
                <View key={b.bowl} style={{ marginBottom: 2.5 }}>
                  <Text style={s.line} wrap={false}>
                    <Text style={s.name}>{b.bowl}</Text>
                  </Text>
                  <Text style={s.line}>{b.projected}</Text>
                  <Text style={s.muted}>{b.note}</Text>
                </View>
              ))}
            </View>

            <View style={s.panel}>
              <Text style={s.h}>Year-End Race · Dark Horses</Text>
              {edition.yearEnd.map((y) => (
                <Text key={y.tour} style={s.line} wrap={false}>
                  <Text
                    style={y.tour === "ATP" ? s.tagAtp : s.tagWta}
                  >
                    {y.tour}
                  </Text>
                  {"  #1 "}
                  <Text style={s.name}>{y.rank1}</Text>
                  {" · #2 "}
                  {y.rank2}
                  {" · "}
                  <Text style={{ color: c.goldLight }}>DH: {y.darkHorse}</Text>
                </Text>
              ))}
              {edition.projectedRecordLines.map((line) => (
                <Text key={line} style={s.muted}>
                  {line}
                </Text>
              ))}
            </View>
          </View>

          {/* RIGHT */}
          <View style={{ ...s.col, width: "32%" }}>
            <View style={s.panel}>
              <Text style={s.h}>Unit Strengths · Grades</Text>
              {edition.unitGrades.map((u) => (
                <Text key={u.unit} style={s.line} wrap={false}>
                  <Text style={s.grade}>{u.grade}</Text>
                  {" "}
                  <Text style={s.name}>{u.unit}</Text>
                  {" — "}
                  {u.strength}
                  {" ("}
                  <Text style={s.muted}>{u.keyNames}</Text>
                  {")"}
                </Text>
              ))}
            </View>

            <View style={s.panel}>
              <Text style={s.h}>Freshman Hopefuls</Text>
              {edition.freshmanHopefuls.map((f) => (
                <Text key={f.name} style={s.line} wrap={false}>
                  <Text style={f.tour === "ATP" ? s.tagAtp : s.tagWta}>
                    {f.tour}
                  </Text>
                  {"  "}
                  <Text style={s.name}>{f.name}</Text>
                  {" ("}
                  {f.age}
                  {") — "}
                  {f.upside}
                </Text>
              ))}
            </View>

            <View style={s.panel}>
              <Text style={s.h}>NFL-Style Draft Potentials · Breakout Board</Text>
              {edition.draftBoard.map((d) => (
                <Text key={`${d.round}-${d.name}`} style={s.line} wrap={false}>
                  <Text style={{ color: c.gold, fontFamily: "Helvetica-Bold" }}>
                    {d.round}
                  </Text>
                  {"  "}
                  <Text style={d.tour === "ATP" ? s.tagAtp : s.tagWta}>
                    {d.tour}
                  </Text>
                  {" "}
                  <Text style={s.name}>{d.name}</Text>
                  {" — "}
                  {d.comps}
                  {"; ceiling: "}
                  <Text style={{ color: c.goldLight }}>{d.ceiling}</Text>
                </Text>
              ))}
            </View>
          </View>
        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>
            TennisStatMan 2026 WAR MAP · Not affiliated with ATP, WTA, or Grand
            Slams · Grades & projections are original scouting opinions
          </Text>
          <Text style={s.footerText}>Print landscape · One page</Text>
        </View>
      </Page>
    </Document>
  );
}
