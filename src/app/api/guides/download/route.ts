import { readFile, stat } from "node:fs/promises";
import { NextResponse } from "next/server";
import { getDigitalProductByEdition } from "@/lib/guides/digital-products";
import {
  getGuideDownloadFilename,
  getGuidePdfPath,
  verifyGuideDownloadToken,
} from "@/lib/guides/download-token";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing download token." }, { status: 400 });
  }

  const payload = verifyGuideDownloadToken(token);
  if (!payload) {
    return NextResponse.json(
      { error: "Download link is invalid or expired." },
      { status: 401 },
    );
  }

  const product = getDigitalProductByEdition(payload.editionId);
  if (!product) {
    return NextResponse.json({ error: "Unknown product." }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(payload.sessionId);

    if (
      session.status !== "complete" ||
      session.payment_status !== "paid" ||
      session.metadata?.product !== product.product
    ) {
      return NextResponse.json(
        { error: "Purchase could not be verified." },
        { status: 403 },
      );
    }

    const pdfPath = getGuidePdfPath(payload.editionId);
    await stat(pdfPath);
    const file = await readFile(pdfPath);
    const body = new Uint8Array(file);

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${getGuideDownloadFilename(payload.editionId)}"`,
        "Content-Length": String(body.byteLength),
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to download guide.";
    const status = message.includes("ENOENT") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
