"use client";

import { useEffect, useState } from "react";

const RADIUS = 90;
const ARC_LENGTH = Math.PI * RADIUS;
const ARC_PATH = "M 20 110 A 90 90 0 0 1 200 110";

export function ScoreGauge({
  score,
  color,
  label,
}: {
  score: number;
  color: string;
  label: string;
}) {
  const target = Math.max(0, Math.min(100, score));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Let the gauge sweep in on mount rather than snapping to its final value.
    const frame = requestAnimationFrame(() => setProgress(target));
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <div className="relative w-full max-w-[280px]">
      <svg
        viewBox="0 0 220 128"
        className="w-full"
        role="img"
        aria-label={`Overall exit readiness score: ${Math.round(target)} out of 100, ${label}`}
      >
        <path
          d={ARC_PATH}
          fill="none"
          stroke="#e3e6e2"
          strokeWidth={16}
          strokeLinecap="round"
        />
        <path
          d={ARC_PATH}
          fill="none"
          stroke={color}
          strokeWidth={16}
          strokeLinecap="round"
          strokeDasharray={ARC_LENGTH}
          strokeDashoffset={ARC_LENGTH - (progress / 100) * ARC_LENGTH}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.2,.7,.3,1)" }}
        />
        <text
          x="110"
          y="96"
          textAnchor="middle"
          className="fill-forest"
          style={{ fontSize: "44px", fontWeight: 700 }}
        >
          {Math.round(target)}
        </text>
        <text
          x="110"
          y="118"
          textAnchor="middle"
          className="fill-charcoal/50"
          style={{ fontSize: "13px", letterSpacing: "0.12em" }}
        >
          OUT OF 100
        </text>
      </svg>

      <div className="mt-2 flex items-center justify-between px-1 text-xs text-charcoal/40">
        <span>0</span>
        <span>100</span>
      </div>

      <p
        className="mt-3 text-center text-xl font-bold tracking-wide"
        style={{ color }}
      >
        {label}
      </p>
    </div>
  );
}
