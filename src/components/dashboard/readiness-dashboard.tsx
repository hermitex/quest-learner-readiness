"use client";

import { useReadinessStore } from "@/src/store/readiness.store";
import { interpretReadiness } from "@/src/domain/readiness/interpret-readiness";
import { deriveInsight } from "@/src/domain/readiness/derive-insights";
import { Insight } from "./insight";
import { OverallSummary } from "./overall-summary";
import { SkillBreakdown } from "./skill-breakdown";

export function ReadinessDashboard() {
  const skills = useReadinessStore((s) => s.skills);

  const overallScore =
    skills.length > 0
      ? Math.round(
          skills.reduce((sum, s) => sum + s.score, 0) / skills.length
        )
      : 0;

  const meaning = interpretReadiness(overallScore);
  const insight = deriveInsight(skills);
  const strengthsCount = skills.filter((s) => s.score >= 75).length;
  const growthCount = skills.filter((s) => s.score < 60).length;

  return (
    <div className="space-y-4">
      {/* Top section: 2-col on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <OverallSummary
          score={overallScore}
          meaning={meaning}
          strengthsCount={strengthsCount}
          growthCount={growthCount}
        />
        <Insight message={insight} skills={skills} />
      </div>

      <SkillBreakdown skills={skills} />
    </div>
  );
}
