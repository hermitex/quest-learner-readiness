"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button/button";
import { Card } from "@/src/components/ui/card";
import { useReadinessStore } from "@/src/store/readiness.store";

type Props = {
  skillId: string;
};

export function EditSkillForm({ skillId }: Props) {
  const { skills, updateSkill, pendingAction } = useReadinessStore();
  const skill = skills.find((s) => s.id === skillId);

  const [label, setLabel] = useState(skill?.label ?? "");
  const [score, setScore] = useState(skill?.score ?? 50);

  if (!skill) return null;

  const normalizedLabel = label.trim().toLowerCase();
  const nameTaken = skills.some(
    (s) =>
      s.id !== skillId &&
      s.label.trim().toLowerCase() === normalizedLabel
  );
  const labelError =
    label.trim().length === 0
      ? "Skill name is required."
      : nameTaken
        ? "That skill name already exists."
        : null;
  const scoreError =
    Number.isNaN(score) || score < 0 || score > 100
      ? "Score must be between 0 and 100."
      : null;

  const canSubmit = !labelError && !scoreError;
  const isSubmitting = pendingAction === "edit";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    await updateSkill(
      skillId,
      label.trim(),
      Math.min(100, Math.max(0, score))
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      {/* Scrollable fields */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-text-primary">
            Update this skill area
          </p>
          <p className="text-xs text-text-secondary">
            Adjust the score to reflect recent progress.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="edit-label"
            className="text-sm font-medium text-text-primary"
          >
            Skill name
          </label>
          <Input
            id="edit-label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            autoFocus
            disabled={isSubmitting}
            error={!!labelError}
            aria-invalid={!!labelError}
            className={labelError ? "border-danger bg-danger/5 focus:ring-danger" : undefined}
          />
          {labelError && (
            <p className="text-xs font-medium text-danger">{labelError}</p>
          )}
        </div>

        <Card variant="muted" className="p-4 space-y-3">
          <div className="space-y-1">
            <label
              htmlFor="edit-score"
              className="text-sm font-medium text-text-primary"
            >
              Score (0–100)
            </label>
            <p className="text-xs text-text-secondary">
              Use the slider for quick changes or type an exact score.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={100}
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              disabled={isSubmitting}
              className="flex-1 accent-primary"
              aria-label="Skill score"
            />
            <input
              id="edit-score"
              type="number"
              min={0}
              max={100}
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              disabled={isSubmitting}
              className={`w-20 rounded-full border px-3 py-1 text-sm text-center tabular-nums ${
                scoreError ? "border-danger" : "border-border"
              }`}
              aria-label="Skill score value"
            />
          </div>
          {scoreError && (
            <p className="text-xs text-danger">{scoreError}</p>
          )}
        </Card>
      </div>

      {/* Sticky footer */}
      <div className="shrink-0 border-t border-border px-5 py-4 bg-surface flex justify-end">
        <Button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="px-6 py-2.5"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
