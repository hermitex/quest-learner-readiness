import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import type { ReadinessMeaning } from "@/src/types/readiness";

type Props = {
  score: number;
  meaning: ReadinessMeaning;
};

export function OverallSummary({ score, meaning }: Props) {
  return (
    <Card className="p-5 space-y-4 bg-surface-muted/60">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            Readiness
          </p>
          <h2 className="text-base font-semibold">{meaning.status}</h2>
          <p className="text-sm text-text-secondary">{meaning.message}</p>
        </div>

        <div className="text-right">
          <div className="text-2xl font-semibold text-primary">
            {score}%
          </div>
          <p className="text-xs text-text-muted">Overall</p>
        </div>
      </div>

      <Progress value={score} size="sm" />
    </Card>
  );
}
