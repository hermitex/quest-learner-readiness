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

  return (
    <div className="space-y-5">
      {/* Top section: 2-col on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <OverallSummary score={overallScore} meaning={meaning} />
        <Insight message={insight} skills={skills} />
      </div>

      <SkillBreakdown skills={skills} />
    </div>
  );
}
