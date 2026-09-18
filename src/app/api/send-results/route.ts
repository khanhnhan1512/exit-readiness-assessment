import { NextResponse } from "next/server";

/**
 * Emails a copy of the assessment summary.
 *
 * Sending is optional and off by default: without RESEND_API_KEY and
 * RESULTS_FROM_EMAIL configured, the route reports that emailing is not
 * enabled and the UI falls back to "Copy summary" / "Print or save as PDF".
 *
 * To turn it on, add to your Vercel project (or .env.local):
 *   RESEND_API_KEY=re_xxx
 *   RESULTS_FROM_EMAIL="Aspen Valuations <noreply@yourdomain.com>"
 */

interface Payload {
  email?: unknown;
  score?: unknown;
  band?: unknown;
  summary?: unknown;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: Payload;

  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const { email, score, band, summary } = payload;

  if (typeof email !== "string" || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (typeof summary !== "string" || summary.length > 8000) {
    return NextResponse.json(
      { message: "Invalid results summary." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESULTS_FROM_EMAIL;

  if (!apiKey || !from) {
    return NextResponse.json(
      {
        message:
          "Emailing results is not enabled yet. Use “Copy summary” or “Print or save as PDF” to keep a copy.",
      },
      { status: 503 },
    );
  }

  const scoreLine =
    typeof score === "number" && typeof band === "string"
      ? `${score}/100 — ${band}`
      : "your results";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: `Your Exit Readiness Assessment — ${scoreLine}`,
      text: summary,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "We could not send the email just now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Sent. Check your inbox for a copy of your results.",
  });
}
