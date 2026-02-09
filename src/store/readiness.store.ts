import { create } from "zustand";
import type { Skill, SkillKey, DrawerMode } from "@/src/types/readiness";
import { MOCK_READINESS } from "@/src/services/mocks/readiness.mock";
import { useToastStore } from "@/src/store/toast.store";

export type { SkillKey };

type ReadinessState = {
  skills: Skill[];

  drawerMode: DrawerMode | null;
  activeSkillId: string | null;
  pendingAction: "create" | "edit" | "delete" | null;

  /* drawer actions */
  viewSkill: (id: string) => void;
  openCreate: () => void;
  openEdit: (id: string) => void;
  openDelete: (id: string) => void;
  closeDrawer: () => void;

  /* data actions */
  addSkill: (skill: Skill) => Promise<void>;
  updateSkill: (id: string, label: string, score: number) => Promise<void>;
  removeSkill: (id: string) => Promise<void>;
};

function simulateNetworkDelay(ms = 700) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useReadinessStore = create<ReadinessState>((set) => ({
  skills: MOCK_READINESS.skills,

  drawerMode: null,
  activeSkillId: null,
  pendingAction: null,

  viewSkill: (id) => set({ drawerMode: "view", activeSkillId: id }),
  openCreate: () => set({ drawerMode: "create", activeSkillId: null }),
  openEdit: (id) => set({ drawerMode: "edit", activeSkillId: id }),
  openDelete: (id) => set({ drawerMode: "delete", activeSkillId: id }),
  closeDrawer: () => set({ drawerMode: null, activeSkillId: null }),

  addSkill: async (skill) => {
    set({ pendingAction: "create" });
    await simulateNetworkDelay();
    set((state) => ({
      skills: [...state.skills, skill],
      drawerMode: null,
      activeSkillId: null,
      pendingAction: null,
    }));
    useToastStore.getState().pushToast({
      title: "Skill area added",
      message: `${skill.label} is now part of your readiness profile.`,
      variant: "success",
    });
  },

  updateSkill: async (id, label, score) => {
    set({ pendingAction: "edit" });
    await simulateNetworkDelay();
    set((state) => ({
      skills: state.skills.map((s) =>
        s.id === id ? { ...s, label, score } : s
      ),
      drawerMode: null,
      activeSkillId: null,
      pendingAction: null,
    }));
    useToastStore.getState().pushToast({
      title: "Changes saved",
      message: `${label} has been updated.`,
      variant: "success",
    });
  },

  removeSkill: async (id) => {
    set({ pendingAction: "delete" });
    await simulateNetworkDelay();
    set((state) => ({
      skills: state.skills.filter((s) => s.id !== id),
      drawerMode: null,
      activeSkillId: null,
      pendingAction: null,
    }));
    useToastStore.getState().pushToast({
      title: "Skill area removed",
      message: "Your readiness summary has been updated.",
      variant: "info",
    });
  },
}));
