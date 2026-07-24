import {
  GUIDE_EDITION_ID,
  GUIDE_PDF_FILENAME,
} from "@/lib/data/guides/summer-2026";
import {
  WAR_MAP_EDITION_ID,
  WAR_MAP_PDF_FILENAME,
} from "@/lib/data/guides/war-map-2026";

export type DigitalProductId = "player_guide" | "war_map";

export type DigitalEditionId =
  | typeof GUIDE_EDITION_ID
  | typeof WAR_MAP_EDITION_ID;

export type DigitalProductConfig = {
  product: DigitalProductId;
  editionId: DigitalEditionId;
  filename: string;
  successPath: string;
  cancelPath: string;
  displayName: string;
};

export const DIGITAL_PRODUCTS: Record<DigitalProductId, DigitalProductConfig> =
  {
    player_guide: {
      product: "player_guide",
      editionId: GUIDE_EDITION_ID,
      filename: GUIDE_PDF_FILENAME,
      successPath: "/guides/summer-2026/success",
      cancelPath: "/guides/summer-2026",
      displayName: "Summer 2026 Player Guide",
    },
    war_map: {
      product: "war_map",
      editionId: WAR_MAP_EDITION_ID,
      filename: WAR_MAP_PDF_FILENAME,
      successPath: "/guides/war-map-2026/success",
      cancelPath: "/guides/war-map-2026",
      displayName: "2026 WAR MAP",
    },
  };

export function getDigitalProduct(
  product: string | null | undefined,
): DigitalProductConfig | null {
  if (product === "player_guide" || product === "war_map") {
    return DIGITAL_PRODUCTS[product];
  }
  return null;
}

export function getDigitalProductByEdition(
  editionId: string | null | undefined,
): DigitalProductConfig | null {
  return (
    Object.values(DIGITAL_PRODUCTS).find((p) => p.editionId === editionId) ??
    null
  );
}
