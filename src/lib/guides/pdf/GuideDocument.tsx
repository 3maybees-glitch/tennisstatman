import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { GuideEdition, GuidePlayer } from "@/lib/data/guides/types";
import { PlayerArt } from "./PlayerArt";
import { SkillRadarPdf } from "./SkillRadar";
import { colors, styles } from "./styles";

function PageFooter({
  edition,
  pageHint,
}: {
  edition: GuideEdition;
  pageHint: string;
}) {
  return (
    <View style={styles.footer} fixed>
      <Text>{edition.title} · {edition.editionLabel}</Text>
      <Text>{pageHint}</Text>
    </View>
  );
}

function CoverPage({ edition }: { edition: GuideEdition }) {
  return (
    <Page size="A4" style={styles.coverPage}>
      <View>
        <Text style={styles.eyebrow}>TennisStatMan</Text>
        <Text style={styles.h1}>{edition.title}</Text>
        <Text style={{ fontSize: 18, color: colors.goldLight, marginBottom: 12 }}>
          {edition.subtitle}
        </Text>
        <Text style={{ fontSize: 14, color: colors.gold, marginBottom: 18 }}>
          {edition.editionLabel}
        </Text>
        <Text style={styles.body}>{edition.snapshotNote}</Text>
      </View>
      <View style={{ marginTop: 40 }}>
        <View
          style={{
            backgroundColor: colors.navyLight,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: "rgba(212,175,55,0.35)",
          }}
        >
          <Text style={styles.sectionLabel}>Inside this guide</Text>
          <Text style={styles.body}>
            100 player pages · stylized action art · bio cards · Summer 2026
            skill radars · Stat Man strengths & weaknesses · top finishes · fun
            facts
          </Text>
        </View>
        <Text style={{ ...styles.muted, marginTop: 24 }}>
          Not affiliated with ATP, WTA, or Grand Slam tournaments. Scouting
          grades are TennisStatMan originals.
        </Text>
      </View>
    </Page>
  );
}

function HowToReadPage({ edition }: { edition: GuideEdition }) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.eyebrow}>How to read this guide</Text>
      <Text style={styles.h2}>Skill radar & bio keys</Text>
      <Text style={{ ...styles.body, marginBottom: 12 }}>
        Every page freezes a Summer 2026 scouting snapshot. Rankings are the
        post-Wimbledon singles list. Last year rank is the comparable
        summer mark from 2025.
      </Text>
      <View style={styles.panel}>
        <Text style={styles.sectionLabel}>Core five axes</Text>
        <Text style={styles.finishItem}>Serve — free points and hold security</Text>
        <Text style={styles.finishItem}>Forehand — primary finishing weapon</Text>
        <Text style={styles.finishItem}>Backhand — redirect quality under pressure</Text>
        <Text style={styles.finishItem}>Net Play — finishing and transition instincts</Text>
        <Text style={styles.finishItem}>Movement — recovery, defense, and court coverage</Text>
      </View>
      <View style={{ ...styles.panel, marginTop: 12 }}>
        <Text style={styles.sectionLabel}>Stat Man voice</Text>
        <Text style={styles.body}>
          Strengths and weaknesses are written from the skill breakdown first —
          what the radar peaks say, and which soft spots rivals should attack.
          Fun facts are the palate cleanser.
        </Text>
      </View>
      <PageFooter edition={edition} pageHint="Legend" />
    </Page>
  );
}

function BioCell({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.bioCell}>
      <Text style={styles.bioLabel}>{label}</Text>
      <Text style={styles.bioValue}>{value}</Text>
    </View>
  );
}

function PlayerPage({
  player,
  edition,
}: {
  player: GuidePlayer;
  edition: GuideEdition;
}) {
  const tourColor = player.tour === "ATP" ? colors.atp : colors.wta;
  const heightFt = `${Math.floor(player.heightCm / 30.48)}'${Math.round(
    (player.heightCm / 2.54) % 12,
  )}"`;

  return (
    <Page size="A4" style={styles.page} wrap={false}>
      <View style={styles.playerHeader}>
        <View style={{ flexGrow: 1, paddingRight: 12 }}>
          <Text style={{ fontSize: 9, color: tourColor, marginBottom: 4 }}>
            {player.tour} · #{player.rank}
          </Text>
          <Text style={styles.h2}>{player.name}</Text>
          <Text style={{ fontSize: 11, color: colors.goldLight }}>
            {player.playstyle}
          </Text>
        </View>
        <Text style={styles.rankBadge}>#{player.rank}</Text>
      </View>

      <View style={styles.twoCol}>
        <View style={styles.col}>
          <PlayerArt player={player} size={220} />
        </View>
        <View style={styles.col}>
          <Text style={styles.sectionLabel}>Skill radar · Summer 2026</Text>
          <SkillRadarPdf skills={player.skills} size={220} />
        </View>
      </View>

      <View style={styles.bioGrid}>
        <BioCell label="Year born" value={String(player.birthYear)} />
        <BioCell label="Location" value={player.location} />
        <BioCell label="Height" value={`${player.heightCm} cm (${heightFt})`} />
        <BioCell label="Years on tour" value={String(player.yearsOnTour)} />
        <BioCell label="Nationality" value={player.nationality} />
        <BioCell
          label="Hand"
          value={player.hand === "L" ? "Left" : "Right"}
        />
        <BioCell label="Current rank" value={`No. ${player.rank}`} />
        <BioCell label="Last year rank" value={`No. ${player.rankLastYear}`} />
        <BioCell label="Turned pro" value={String(player.turnedPro)} />
      </View>

      <View style={styles.twoCol}>
        <View style={styles.col}>
          <Text style={styles.sectionLabel}>Top 5 tournament finishes</Text>
          <View style={styles.panel}>
            {player.topFinishes.map((finish) => (
              <Text key={finish} style={styles.finishItem}>
                • {finish}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.col}>
          <Text style={styles.sectionLabel}>Fun fact</Text>
          <View style={styles.panel}>
            <Text style={styles.body}>{player.funFact}</Text>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={styles.sectionLabel}>Best strengths</Text>
        <Text style={styles.analysis}>{player.strengths}</Text>
      </View>
      <View style={{ marginTop: 8 }}>
        <Text style={styles.sectionLabel}>Worst weaknesses</Text>
        <Text style={styles.analysis}>{player.weaknesses}</Text>
      </View>

      <PageFooter
        edition={edition}
        pageHint={`${player.tour} #${player.rank}`}
      />
    </Page>
  );
}

function SectionDivider({
  edition,
  title,
  subtitle,
}: {
  edition: GuideEdition;
  title: string;
  subtitle: string;
}) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={{ marginTop: 180 }}>
        <Text style={styles.eyebrow}>{edition.editionLabel}</Text>
        <Text style={styles.h1}>{title}</Text>
        <Text style={{ ...styles.body, marginTop: 8 }}>{subtitle}</Text>
      </View>
      <PageFooter edition={edition} pageHint={title} />
    </Page>
  );
}

function ClosingPage({ edition }: { edition: GuideEdition }) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.eyebrow}>Keep scouting</Text>
      <Text style={styles.h2}>Thanks for reading</Text>
      <Text style={styles.body}>
        Live PULSE scores, legend comparisons, and the full Courtside toolkit
        live at tennisstatman.com. This Summer 2026 Edition freezes one moment
        on tour — the site keeps moving with every fortnight.
      </Text>
      <View style={{ ...styles.panel, marginTop: 16 }}>
        <Text style={styles.sectionLabel}>Next editions</Text>
        <Text style={styles.body}>
          Hard-court swing and year-end finals updates will land as separate
          paid editions. Follow @TennisStatMan for release notes.
        </Text>
      </View>
      <PageFooter edition={edition} pageHint="Closing" />
    </Page>
  );
}

export function GuideDocument({ edition }: { edition: GuideEdition }) {
  const atp = edition.players.filter((p) => p.tour === "ATP");
  const wta = edition.players.filter((p) => p.tour === "WTA");

  return (
    <Document
      title={`${edition.title} — ${edition.editionLabel}`}
      author="TennisStatMan"
      subject={edition.snapshotNote}
      creator="TennisStatMan"
    >
      <CoverPage edition={edition} />
      <HowToReadPage edition={edition} />
      <SectionDivider
        edition={edition}
        title="ATP Top 50"
        subtitle="Gentlemen's singles scouting pages, ranked 1–50 for Summer 2026."
      />
      {atp.map((player) => (
        <PlayerPage key={player.id} player={player} edition={edition} />
      ))}
      <SectionDivider
        edition={edition}
        title="WTA Top 50"
        subtitle="Ladies' singles scouting pages, ranked 1–50 for Summer 2026."
      />
      {wta.map((player) => (
        <PlayerPage key={player.id} player={player} edition={edition} />
      ))}
      <ClosingPage edition={edition} />
    </Document>
  );
}
