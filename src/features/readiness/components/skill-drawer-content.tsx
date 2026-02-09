import { Card } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
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
};

export function SkillDrawerContent({ skillId }: Props) {
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
          <Progress value={skill.score} showValue />
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
    </div>
  );
}
