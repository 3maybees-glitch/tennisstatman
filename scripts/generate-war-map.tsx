import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import { createElement, type ReactElement } from "react";
import {
  WAR_MAP_2026,
  WAR_MAP_PDF_FILENAME,
} from "../src/lib/data/guides/war-map-2026";
import { WarMapDocument } from "../src/lib/guides/pdf/WarMapDocument";

async function main() {
  const outDir = path.join(process.cwd(), "content", "guides");
  const outPath = path.join(outDir, WAR_MAP_PDF_FILENAME);

  console.log(`Generating ${WAR_MAP_2026.title} PDF...`);

  const element = createElement(WarMapDocument, {
    edition: WAR_MAP_2026,
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
