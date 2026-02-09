"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useReadinessStore } from "@/src/store/readiness.store";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import type { Skill } from "@/src/types/readiness";

type Props = {
  skill: Skill;
};

export function SkillRow({ skill }: Props) {
  const viewSkill = useReadinessStore((s) => s.viewSkill);
  const openEdit = useReadinessStore((s) => s.openEdit);
  const openDelete = useReadinessStore((s) => s.openDelete);

  return (
    <Card className="h-full p-3 md:p-3.5 space-y-1.5 transition-[box-shadow,border-color] duration-200 ease-out border-border/70 hover:border-primary/30 hover:shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => viewSkill(skill.id)}
          className="flex-1 text-left text-sm font-semibold truncate"
          aria-label={`View details for ${skill.label}`}
        >
          {skill.label}
        </button>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-semibold text-text-secondary tabular-nums w-10 text-right">
            {skill.score}%
          </span>

          <button
            type="button"
            onClick={() => openEdit(skill.id)}
            className="p-1.5 rounded text-text-muted hover:text-primary hover:bg-surface-muted transition-colors"
            aria-label={`Edit ${skill.label}`}
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => openDelete(skill.id)}
            className="p-1.5 rounded text-text-muted hover:text-danger hover:bg-surface-muted transition-colors"
            aria-label={`Remove ${skill.label}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => viewSkill(skill.id)}
        className="w-full pt-1"
        tabIndex={-1}
        aria-hidden
      >
        <Progress value={skill.score} size="sm" />
      </button>
    </Card>
  );
}
