"use client";

import { Pencil, Trash2 } from "lucide-react";
import clsx from "clsx";
import { useReadinessStore } from "@/src/store/readiness.store";
import { Card } from "../ui/card";
import { Progress, getScoreColor } from "../ui/progress";
import type { Skill } from "@/src/types/readiness";

type Props = {
  skill: Skill;
  index?: number;
};

export function SkillRow({ skill, index = 0 }: Props) {
  const viewSkill = useReadinessStore((s) => s.viewSkill);
  const openEdit = useReadinessStore((s) => s.openEdit);
  const openDelete = useReadinessStore((s) => s.openDelete);
  const delta = useReadinessStore((s) => s.skillDeltas[skill.id]);

  const scoreColor = getScoreColor(skill.score);
  const isRecent = delta ? Date.now() - delta.at < 1000 * 60 * 60 * 24 * 14 : false;
  const deltaLabel =
    delta?.type === "new"
      ? "New"
      : delta?.type === "change"
        ? `${delta.value > 0 ? "+" : ""}${delta.value}`
        : null;
  const deltaTone =
    delta?.type === "new"
      ? "accent"
      : delta?.type === "change" && delta.value > 0
        ? "success"
        : delta?.type === "change" && delta.value < 0
          ? "danger"
          : "muted";

  return (
    <Card
      className="animate-fade-in-up h-full p-3 md:p-4 space-y-2 cursor-pointer transition-[box-shadow,border-color,transform] duration-200 ease-out border-border/70 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
      style={{ animationDelay: `${200 + index * 60}ms` }}
      onClick={() => viewSkill(skill.id)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${skill.label}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          viewSkill(skill.id);
        }
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          {/* Color dot indicator */}
          <span
            className="shrink-0 w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: scoreColor }}
            aria-hidden
          />
          <span className="text-sm font-semibold truncate">
            {skill.label}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isRecent && deltaLabel && (
            <span
              className={clsx(
                "rounded-full border px-2 py-0.5 text-[10px] font-semibold tabular-nums",
                deltaTone === "accent" && "border-accent/30 bg-accent/15 text-accent",
                deltaTone === "success" && "border-success/30 bg-success/10 text-success",
                deltaTone === "danger" && "border-danger/30 bg-danger/10 text-danger",
                deltaTone === "muted" && "border-border bg-surface-muted text-text-muted"
              )}
            >
              {deltaLabel}
            </span>
          )}
          <span
            className="text-xs font-bold tabular-nums w-10 text-right"
            style={{ color: scoreColor }}
          >
            {skill.score}%
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openEdit(skill.id);
            }}
            className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-surface-muted transition-colors"
            aria-label={`Edit ${skill.label}`}
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openDelete(skill.id);
            }}
            className="p-2 rounded-lg text-text-muted hover:text-danger hover:bg-surface-muted transition-colors"
            aria-label={`Remove ${skill.label}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <Progress value={skill.score} size="sm" colorByValue />
    </Card>
  );
}
