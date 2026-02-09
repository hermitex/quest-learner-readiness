"use client";

import { Button } from "@/src/components/ui/button/button";
import { Card } from "@/src/components/ui/card";
import { useReadinessStore } from "@/src/store/readiness.store";

type Props = {
  skillId: string;
};

export function DeleteSkillConfirm({ skillId }: Props) {
  const { skills, removeSkill, closeDrawer, pendingAction } =
    useReadinessStore();
  const skill = skills.find((s) => s.id === skillId);
  const isSubmitting = pendingAction === "delete";

  if (!skill) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <Card variant="muted" className="p-4 space-y-2">
          <p className="text-sm text-text-primary">
            Are you sure you want to remove{" "}
            <strong>{skill.label}</strong>?
          </p>
          <p className="text-sm text-text-secondary">
            This action cannot be undone. The skill area and its score will
            be removed from your readiness overview.
          </p>
        </Card>
      </div>

      {/* Sticky footer */}
      <div className="shrink-0 border-t border-border px-6 py-4 bg-surface flex justify-end gap-3">
        <Button
          variant="tertiary"
          onClick={closeDrawer}
          className="px-6 py-2.5"
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          onClick={() => removeSkill(skillId)}
          className="px-6 py-2.5 bg-danger hover:bg-danger/90 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Removing..." : "Remove"}
        </Button>
      </div>
    </div>
  );
}
