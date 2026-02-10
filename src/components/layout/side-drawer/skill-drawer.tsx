"use client";

import { Drawer } from "@/src/components/ui/drawer/drawer";
import { useReadinessStore } from "@/src/store/readiness.store";
import { SkillDrawerContent } from "@/src/features/readiness/components/skill-drawer-content";
import { CreateSkillForm } from "@/src/features/readiness/components/create-skill-form";
import { EditSkillForm } from "@/src/features/readiness/components/edit-skill-form";
import { DeleteSkillConfirm } from "@/src/features/readiness/components/delete-skill-confirm";
import type { DrawerMode } from "@/src/types/readiness";

function useDrawerTitle(): string {
  const { drawerMode, activeSkillId, skills } = useReadinessStore();
  const skill = skills.find((s) => s.id === activeSkillId);
  const name = skill?.label ?? "Skill";

  const titles: Record<DrawerMode, string> = {
    view: name,
    create: "Add Skill Area",
    edit: `Edit ${name}`,
    delete: `Remove ${name}`,
  };

  return drawerMode ? titles[drawerMode] : "";
}

function useDrawerSubtitle(): string {
  const { drawerMode, activeSkillId, skills } = useReadinessStore();
  const skill = skills.find((s) => s.id === activeSkillId);
  const name = skill?.label ?? "this skill";

  const subtitles: Record<DrawerMode, string> = {
    view: `Progress summary and guidance for ${name}.`,
    create: "Add a new skill area and set an initial score.",
    edit: `Update ${name} details and adjust the score.`,
    delete: `This will remove ${name} from your readiness overview.`,
  };

  return drawerMode ? subtitles[drawerMode] : "";
}

export function SkillDrawer() {
  const { drawerMode, activeSkillId, closeDrawer, openEdit } =
    useReadinessStore();
  const title = useDrawerTitle();
  const subtitle = useDrawerSubtitle();

  return (
    <Drawer
      open={!!drawerMode}
      onClose={closeDrawer}
      title={title}
      subtitle={subtitle}
    >
      {drawerMode === "view" && activeSkillId && (
        <SkillDrawerContent
          skillId={activeSkillId}
          onClose={closeDrawer}
          onEdit={openEdit}
        />
      )}
      {drawerMode === "create" && <CreateSkillForm />}
      {drawerMode === "edit" && activeSkillId && (
        <EditSkillForm skillId={activeSkillId} />
      )}
      {drawerMode === "delete" && activeSkillId && (
        <DeleteSkillConfirm skillId={activeSkillId} />
      )}
    </Drawer>
  );
}
