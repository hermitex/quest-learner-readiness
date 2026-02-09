import { create } from "zustand";
import type { Skill, SkillKey, DrawerMode } from "@/src/types/readiness";
import { MOCK_READINESS } from "@/src/services/mocks/readiness.mock";
import { useToastStore } from "@/src/store/toast.store";
import { getPersistedState, setPersistedState } from "@/src/utils/indexed-db";

export type { SkillKey };

type PendingItem = {
  type: "create" | "edit" | "delete";
  payload: unknown;
  queuedAt: number;
};

type ReadinessState = {
  skills: Skill[];
  pendingQueue: PendingItem[];
  isSyncing: boolean;

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

  /* sync */
  syncPending: () => Promise<void>;
  hydrate: () => Promise<void>;
};

function simulateNetworkDelay(ms = 700) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isOnline() {
  if (typeof navigator === "undefined") return true;
  return navigator.onLine;
}

function isPendingItem(value: unknown): value is PendingItem {
  if (!value || typeof value !== "object") return false;
  const item = value as PendingItem;
  return (
    (item.type === "create" || item.type === "edit" || item.type === "delete") &&
    typeof item.queuedAt === "number"
  );
}

function sanitizeQueue(value: unknown): PendingItem[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isPendingItem);
}

function enqueue(
  queue: PendingItem[],
  type: PendingItem["type"],
  payload: unknown
): PendingItem[] {
  return [...queue, { type, payload, queuedAt: Date.now() }];
}

export const useReadinessStore = create<ReadinessState>((set) => ({
  skills: MOCK_READINESS.skills,
  pendingQueue: [],
  isSyncing: false,

  drawerMode: null,
  activeSkillId: null,
  pendingAction: null,

  viewSkill: (id) => set({ drawerMode: "view", activeSkillId: id }),
  openCreate: () => set({ drawerMode: "create", activeSkillId: null }),
  openEdit: (id) => set({ drawerMode: "edit", activeSkillId: id }),
  openDelete: (id) => set({ drawerMode: "delete", activeSkillId: id }),
  closeDrawer: () => set({ drawerMode: null, activeSkillId: null }),

  addSkill: async (skill) => {
    const online = isOnline();
    set({ pendingAction: "create" });
    if (online) await simulateNetworkDelay();
    set((state) => {
      const next = {
        skills: [...state.skills, skill],
        drawerMode: null,
        activeSkillId: null,
        pendingAction: null,
        pendingQueue: online
          ? state.pendingQueue
          : enqueue(state.pendingQueue, "create", skill),
      };
      setPersistedState({ skills: next.skills, pendingQueue: next.pendingQueue });
      return next;
    });
    useToastStore.getState().pushToast({
      title: online ? "Skill area added" : "Saved offline",
      message: online
        ? `${skill.label} is now part of your readiness profile.`
        : "We will sync when you reconnect.",
      variant: online ? "success" : "info",
    });
  },

  updateSkill: async (id, label, score) => {
    const online = isOnline();
    set({ pendingAction: "edit" });
    if (online) await simulateNetworkDelay();
    set((state) => {
      const nextSkills = state.skills.map((s) =>
        s.id === id ? { ...s, label, score } : s
      );
      const next = {
        skills: nextSkills,
        drawerMode: null,
        activeSkillId: null,
        pendingAction: null,
        pendingQueue: online
          ? state.pendingQueue
          : enqueue(state.pendingQueue, "edit", { id, label, score }),
      };
      setPersistedState({ skills: next.skills, pendingQueue: next.pendingQueue });
      return next;
    });
    useToastStore.getState().pushToast({
      title: online ? "Changes saved" : "Saved offline",
      message: online ? `${label} has been updated.` : "We will sync when you reconnect.",
      variant: online ? "success" : "info",
    });
  },

  removeSkill: async (id) => {
    const online = isOnline();
    set({ pendingAction: "delete" });
    if (online) await simulateNetworkDelay();
    set((state) => {
      const nextSkills = state.skills.filter((s) => s.id !== id);
      const next = {
        skills: nextSkills,
        drawerMode: null,
        activeSkillId: null,
        pendingAction: null,
        pendingQueue: online
          ? state.pendingQueue
          : enqueue(state.pendingQueue, "delete", { id }),
      };
      setPersistedState({ skills: next.skills, pendingQueue: next.pendingQueue });
      return next;
    });
    useToastStore.getState().pushToast({
      title: online ? "Skill area removed" : "Saved offline",
      message: online
        ? "Your readiness summary has been updated."
        : "We will sync when you reconnect.",
      variant: online ? "info" : "info",
    });
  },

  syncPending: async () => {
    if (!isOnline()) return;
    const { pendingQueue } = useReadinessStore.getState();
    if (pendingQueue.length === 0) return;
    set({ isSyncing: true });
    await simulateNetworkDelay(800);
    set((state) => {
      const next = { ...state, pendingQueue: [] };
      setPersistedState({ skills: next.skills, pendingQueue: next.pendingQueue });
      return next;
    });
    set({ isSyncing: false });
    useToastStore.getState().pushToast({
      title: "Synced",
      message: "Offline changes are now saved.",
      variant: "success",
    });
  },

  hydrate: async () => {
    const persisted = await getPersistedState();
    if (!persisted) return;
    set({
      skills: (persisted.skills as Skill[]) ?? MOCK_READINESS.skills,
      pendingQueue: sanitizeQueue(persisted.pendingQueue),
    });
  },
}));
