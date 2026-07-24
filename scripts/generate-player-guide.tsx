import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import { createElement, type ReactElement } from "react";
import {
  GUIDE_PDF_FILENAME,
  SUMMER_2026_GUIDE,
} from "../src/lib/data/guides/summer-2026";
import { GuideDocument } from "../src/lib/guides/pdf/GuideDocument";

async function main() {
  const outDir = path.join(process.cwd(), "content", "guides");
  const outPath = path.join(outDir, GUIDE_PDF_FILENAME);
  const force = process.env.FORCE_PLAYER_GUIDE === "1";

  // The live sellable guide is a hand-designed PDF. Don't overwrite it unless forced.
  try {
    await access(outPath);
    if (!force) {
      console.error(
        `Refusing to overwrite designed guide at ${outPath}.\n` +
          `Set FORCE_PLAYER_GUIDE=1 to regenerate the programmatic fallback.`,
      );
      process.exit(1);
    }
  } catch {
    // File missing — safe to generate.
  }

  console.log(
    `Generating ${SUMMER_2026_GUIDE.editionLabel} PDF (${SUMMER_2026_GUIDE.players.length} players)...`,
  );

  const element = createElement(GuideDocument, {
    edition: SUMMER_2026_GUIDE,
  }) as ReactElement<DocumentProps>;
  const buffer = await renderToBuffer(element);

  await mkdir(outDir, { recursive: true });
  await writeFile(outPath, buffer);

  console.log(`Wrote ${outPath} (${buffer.byteLength} bytes)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
