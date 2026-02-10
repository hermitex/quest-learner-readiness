"use client";

import { Card } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { Button } from "@/src/components/ui/button";
import { useReadinessStore } from "@/src/store/readiness.store";
import type { SkillKey } from "@/src/types/readiness";

const COPY: Partial<Record<SkillKey, string>> = {
  academics:
    "You're building strong academic foundations that support future learning.",
  career:
    "Developing communication and collaboration here can unlock new paths.",
  life: "Your adaptability and self-awareness are growing steadily.",
  entrepreneurship:
    "Exploring initiative and problem-solving will strengthen this area.",
};

type GuidanceCopy = {
  insight: string;
  helps: string;
  next: string;
};

function getGuidanceCopy(score: number, fallback: string): GuidanceCopy {
  if (score >= 90) {
    return {
      insight: `${fallback} You’re performing at a very strong level here.`,
      helps: "Maintain consistency and share your strategy with others.",
      next: "Choose a stretch goal to keep momentum high.",
    };
  }

  if (score >= 75) {
    return {
      insight: `${fallback} You’re in a strong range — keep reinforcing the habits that work.`,
      helps: "Consistency, reflection, and feedback are keeping this steady.",
      next: "Pick one small improvement to push this area higher.",
    };
  }

  if (score >= 50) {
    return {
      insight: `${fallback} You’re building steady momentum.`,
      helps: "Short, regular practice helps this grow reliably.",
      next: "Choose one focused action to improve this week.",
    };
  }

  return {
    insight: `${fallback} This area needs attention to build a stronger base.`,
    helps: "Small, frequent steps and quick feedback make the biggest impact.",
    next: "Start with one clear action you can repeat weekly.",
  };
}

type Props = {
  skillId: string;
  onClose: () => void;
  onEdit: (id: string) => void;
};

export function SkillDrawerContent({ skillId, onClose, onEdit }: Props) {
  const skill = useReadinessStore((s) =>
    s.skills.find((sk) => sk.id === skillId)
  );

  if (!skill) return null;

  const insight =
    COPY[skillId as SkillKey] ??
    "Keep building in this area — every step forward counts.";
  const guidance = getGuidanceCopy(skill.score, insight);

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="space-y-3">
          <p className="text-sm text-text-secondary">{guidance.insight}</p>
          <Card variant="muted" className="p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>Current score</span>
              <span className="text-sm font-semibold text-text-primary">
                {Math.round(skill.score)}%
              </span>
            </div>
            <Progress value={skill.score} />
          </Card>
        </div>

        <Card variant="muted" className="p-4 space-y-2">
          <p className="text-sm font-medium">What helps here</p>
          <p className="text-sm text-text-secondary">{guidance.helps}</p>
        </Card>

        <Card className="p-4 space-y-2">
          <p className="text-sm font-medium">What you can try next</p>
          <p className="text-sm text-text-secondary">{guidance.next}</p>
        </Card>
      </div>

      {/* Sticky footer */}
      <div className="shrink-0 border-t border-border px-6 py-4 bg-surface flex justify-end gap-3">
        <Button
          type="button"
          variant="tertiary"
          onClick={onClose}
          className="px-6 py-2.5"
        >
          Close
        </Button>
        <Button
          type="button"
          onClick={() => onEdit(skillId)}
          className="px-6 py-2.5"
        >
          Edit Skill
        </Button>
      </div>
    </div>
  );
}
