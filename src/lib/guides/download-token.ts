import { createHmac, timingSafeEqual } from "node:crypto";
import {
  GUIDE_EDITION_ID,
  GUIDE_PDF_FILENAME,
} from "@/lib/data/guides/summer-2026";

const DEFAULT_TTL_SECONDS = 60 * 60 * 24; // 24 hours

function getSecret(): string {
  const secret =
    process.env.GUIDE_DOWNLOAD_SECRET?.trim() ||
    process.env.STRIPE_SECRET_KEY?.trim();
  if (!secret) {
    throw new Error(
      "GUIDE_DOWNLOAD_SECRET or STRIPE_SECRET_KEY is required for guide downloads.",
    );
  }
  return secret;
}

export type GuideDownloadPayload = {
  sessionId: string;
  editionId: string;
  exp: number;
};

function encode(payload: GuideDownloadPayload): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function decode(tokenBody: string): GuideDownloadPayload | null {
  try {
    const json = Buffer.from(tokenBody, "base64url").toString("utf8");
    const parsed = JSON.parse(json) as GuideDownloadPayload;
    if (
      typeof parsed.sessionId !== "string" ||
      typeof parsed.editionId !== "string" ||
      typeof parsed.exp !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function sign(body: string): string {
  return createHmac("sha256", getSecret()).update(body).digest("base64url");
}

export function createGuideDownloadToken(
  sessionId: string,
  ttlSeconds = DEFAULT_TTL_SECONDS,
): string {
  const payload: GuideDownloadPayload = {
    sessionId,
    editionId: GUIDE_EDITION_ID,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };
  const body = encode(payload);
  return `${body}.${sign(body)}`;
}

export function verifyGuideDownloadToken(
  token: string,
): GuideDownloadPayload | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = sign(body);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return null;
  }

  const payload = decode(body);
  if (!payload) return null;
  if (payload.editionId !== GUIDE_EDITION_ID) return null;
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

export function getGuidePdfPath(): string {
  return `${process.cwd()}/content/guides/${GUIDE_PDF_FILENAME}`;
}

export function getGuideDownloadFilename(): string {
  return GUIDE_PDF_FILENAME;
}
