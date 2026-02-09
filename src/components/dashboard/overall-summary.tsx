"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import { getScoreColor } from "../ui/progress";
import type { ReadinessMeaning } from "@/src/types/readiness";

type Props = {
  score: number;
  meaning: ReadinessMeaning;
};

function useCountUp(target: number, duration = 1000) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return value;
}

function DonutChart({ score }: { score: number }) {
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0"
    >
      {/* Background track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth={strokeWidth}
        opacity={0.4}
      />
      {/* Filled arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        className="animate-donut"
        style={{
          "--donut-circumference": circumference,
          "--donut-offset": offset,
          transformOrigin: "center",
          transform: "rotate(-90deg)",
        } as React.CSSProperties}
      />
    </svg>
  );
}

export function OverallSummary({ score, meaning }: Props) {
  const displayScore = useCountUp(score, 1200);
  const color = getScoreColor(score);

  return (
    <Card className="animate-scale-in p-5 md:p-6 bg-surface-muted/60">
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
        {/* Donut with score overlay */}
        <div className="relative flex items-center justify-center">
          <DonutChart score={score} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-2xl font-bold tabular-nums"
              style={{ color }}
            >
              {displayScore}%
            </span>
            <span className="text-[10px] font-medium text-text-muted uppercase tracking-wide">
              Overall
            </span>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center md:text-left space-y-1.5 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            Readiness
          </p>
          <h2 className="text-lg font-semibold text-text-primary">
            {meaning.status}
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {meaning.message}
          </p>
        </div>
      </div>
    </Card>
  );
}
