"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button/button";
import { Card } from "@/src/components/ui/card";
import { useReadinessStore } from "@/src/store/readiness.store";

export function CreateSkillForm() {
  const { addSkill, pendingAction, skills, closeDrawer } = useReadinessStore();
  const [label, setLabel] = useState("");
  const [score, setScore] = useState(50);

  const normalizedLabel = label.trim().toLowerCase();
  const nameTaken = skills.some(
    (s) => s.label.trim().toLowerCase() === normalizedLabel
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
  const isSubmitting = pendingAction === "create";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const id = `${label.trim().toLowerCase().replace(/\s+/g, "-")}-${Date.now().toString(36)}`;
    await addSkill({
      id,
      label: label.trim(),
      score: Math.min(100, Math.max(0, score)),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      {/* Scrollable fields */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-text-primary">
            Add a new skill area
          </p>
          <p className="text-xs text-text-secondary">
            Give it a clear name and set a score that reflects recent progress.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="skill-label"
            className="text-sm font-medium text-text-primary"
          >
            Skill name
          </label>
          <Input
            id="skill-label"
            placeholder="e.g. Digital Literacy"
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
              htmlFor="skill-score"
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
              id="skill-score"
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
      <div className="shrink-0 border-t border-border px-6 py-4 bg-surface flex justify-end gap-3">
        <Button
          type="button"
          variant="tertiary"
          onClick={closeDrawer}
          className="px-6 py-2.5"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="px-6 py-2.5"
        >
          {isSubmitting ? "Saving..." : "Add Skill Area"}
        </Button>
      </div>
    </form>
  );
}
