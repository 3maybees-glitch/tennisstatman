import { readFile, stat } from "node:fs/promises";
import { NextResponse } from "next/server";
import { customerHasGuidePurchase } from "@/lib/account/customer-access";
import { getCourtsideCustomerId } from "@/lib/courtside-session";
import {
  getGuideDownloadFilename,
  getGuidePdfPath,
} from "@/lib/guides/download-token";

export const runtime = "nodejs";

export async function GET() {
  const customerId = await getCourtsideCustomerId();
  if (!customerId) {
    return NextResponse.json(
      { error: "Sign in on this device to download the guide." },
      { status: 401 },
    );
  }

  try {
    const purchased = await customerHasGuidePurchase(customerId);
    if (!purchased) {
      return NextResponse.json(
        { error: "No Player Guide purchase found for this account." },
        { status: 403 },
      );
    }

    const pdfPath = getGuidePdfPath();
    await stat(pdfPath);
    const file = await readFile(pdfPath);
    const body = new Uint8Array(file);

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${getGuideDownloadFilename()}"`,
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