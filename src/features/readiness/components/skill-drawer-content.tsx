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

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="space-y-3">
          <p className="text-sm text-text-secondary">{insight}</p>
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
          <p className="text-sm text-text-secondary">
            Consistent practice, reflection, and feedback over time.
          </p>
        </Card>

        <Card className="p-4 space-y-2">
          <p className="text-sm font-medium">What you can try next</p>
          <p className="text-sm text-text-secondary">
            Choose one small action to focus on this week.
          </p>
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
