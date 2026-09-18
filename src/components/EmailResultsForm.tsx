"use client";

import { useState } from "react";
import { summarizeResult, type AssessmentResult } from "@/lib/scoring";

type Status = "idle" | "sending" | "sent" | "error";

export function EmailResultsForm({ result }: { result: AssessmentResult }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const summary = summarizeResult(result);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/send-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          score: Math.round(result.overall),
          band: result.band.label,
          summary,
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (response.ok) {
        setStatus("sent");
        setMessage(data.message ?? "Sent. Check your inbox.");
      } else {
        setStatus("error");
        setMessage(
          data.message ??
            "We could not send the email just now. You can copy your summary instead.",
        );
      }
    } catch {
      setStatus("error");
      setMessage(
        "We could not send the email just now. You can copy your summary instead.",
      );
    }
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary);
      setMessage("Summary copied to your clipboard.");
    } catch {
      setMessage("Copying is not available in this browser.");
    }
  }

  return (
    <div className="no-print rounded-2xl border border-line bg-bone p-6 sm:p-8">
      <h3 className="text-lg font-bold text-forest">
        Email yourself a copy
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
        Optional. No registration, no paywall — we will not add you to anything.
      </p>

      {status === "sent" ? (
        <p className="mt-5 rounded-lg bg-teal-soft px-4 py-3 text-sm font-medium text-forest">
          {message}
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            className="min-w-0 flex-1 rounded-full border border-line bg-white px-5 py-3 text-sm outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/25"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-forest-light disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send my results"}
          </button>
        </form>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <button
          type="button"
          onClick={copySummary}
          className="text-sm font-semibold text-teal transition hover:text-teal-dark"
        >
          Copy summary
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="text-sm font-semibold text-teal transition hover:text-teal-dark"
        >
          Print or save as PDF
        </button>
      </div>

      {status !== "sent" && message ? (
        <p className="mt-3 text-sm text-charcoal/70">{message}</p>
      ) : null}
    </div>
  );
}
