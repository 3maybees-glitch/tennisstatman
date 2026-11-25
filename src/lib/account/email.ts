export function isAccountEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() && process.env.ACCOUNT_EMAIL_FROM?.trim(),
  );
}

export async function sendMagicLinkEmail(
  to: string,
  signInUrl: string,
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.ACCOUNT_EMAIL_FROM?.trim();

  if (!apiKey || !from) {
    return { sent: false, reason: "not_configured" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to.trim()],
      subject: "Sign in to TennisStatMan Courtside",
      text: [
        "Use this link to restore Courtside access on this device (expires in 15 minutes):",
        "",
        signInUrl,
        "",
        "If you did not request this, you can ignore this email.",
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    return { sent: false, reason: "send_failed" };
  }

  return { sent: true };
}