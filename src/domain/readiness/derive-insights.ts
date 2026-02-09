import type { Skill } from "@/src/types/readiness";

export function deriveInsight(skills: Skill[]): string {
  if (skills.length === 0) return "";

  const sorted = [...skills].sort((a, b) => a.score - b.score);
  const weakest = sorted[0];
  const strongest = sorted[sorted.length - 1];

  if (strongest.score - weakest.score <= 10) {
    return "You're progressing evenly across all areas. Keep building consistently.";
  }

  return `Strongest area: ${strongest.label}. Focus next on ${weakest.label} to lift your overall readiness.`;
}
