"use client";

import { Lightbulb, ArrowRight } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useReadinessStore } from "@/src/store/readiness.store";
import type { Skill } from "@/src/types/readiness";

type Props = {
  message: string;
  skills: Skill[];
};

export function Insight({ message, skills }: Props) {
  const viewSkill = useReadinessStore((s) => s.viewSkill);

  // Find the weakest skill to make it a clickable CTA
  const sorted = [...skills].sort((a, b) => a.score - b.score);
  const focusSkill =
    sorted.length > 1 &&
    sorted[sorted.length - 1].score - sorted[0].score > 10
      ? sorted[0]
      : null;

  return (
    <Card
      variant="muted"
      className="animate-fade-in-up p-4 border-l-2 border-accent/70 bg-surface-muted/50"
      style={{ animationDelay: "100ms" }}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5 w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center">
          <Lightbulb
            className="w-4 h-4"
            style={{ color: "var(--color-warning)" }}
          />
        </div>

        <div className="flex-1 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            Insight
          </p>
          <p className="text-sm text-text-secondary leading-relaxed">
            {message}
          </p>

          {focusSkill && (
            <Button
              type="button"
              variant="tertiary"
              className="h-8 px-2 text-xs"
              onClick={() => viewSkill(focusSkill.id)}
            >
              Explore {focusSkill.label}
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
