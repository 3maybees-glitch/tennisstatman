import { createHmac, timingSafeEqual } from "node:crypto";

const DEFAULT_TTL_SECONDS = 60 * 15;

function getSecret(): string {
  const secret =
    process.env.ACCOUNT_MAGIC_LINK_SECRET?.trim() ||
    process.env.GUIDE_DOWNLOAD_SECRET?.trim() ||
    process.env.STRIPE_SECRET_KEY?.trim();
  if (!secret) {
    throw new Error(
      "ACCOUNT_MAGIC_LINK_SECRET, GUIDE_DOWNLOAD_SECRET, or STRIPE_SECRET_KEY is required for magic links.",
    );
  }
  return secret;
}

export type MagicLinkPayload = {
  customerId: string;
  email: string;
  exp: number;
};

function encode(payload: MagicLinkPayload): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function decode(tokenBody: string): MagicLinkPayload | null {
  try {
    const json = Buffer.from(tokenBody, "base64url").toString("utf8");
    const parsed = JSON.parse(json) as MagicLinkPayload;
    if (
      typeof parsed.customerId !== "string" ||
      typeof parsed.email !== "string" ||
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

export function createMagicLinkToken(
  customerId: string,
  email: string,
  ttlSeconds = DEFAULT_TTL_SECONDS,
): string {
  const payload: MagicLinkPayload = {
    customerId,
    email: email.trim().toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };
  const body = encode(payload);
  return `${body}.${sign(body)}`;
}

export function verifyMagicLinkToken(token: string): MagicLinkPayload | null {
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
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}