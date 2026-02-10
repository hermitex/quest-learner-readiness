"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { Plus, Search } from "lucide-react";
import { SkillRow } from "./skill-row";
import { useReadinessStore } from "@/src/store/readiness.store";
import type { Skill } from "@/src/types/readiness";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type FilterType = "all" | "strengths" | "growth";

const FILTERS: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "strengths", label: "Strengths" },
  { key: "growth", label: "Growth" },
];

type Props = {
  skills: Skill[];
};

export function SkillBreakdown({ skills }: Props) {
  const openCreate = useReadinessStore((s) => s.openCreate);
  const lastUpdatedAt = useReadinessStore((s) => s.lastUpdatedAt);
  const pendingQueue = useReadinessStore((s) => s.pendingQueue);
  const isSyncing = useReadinessStore((s) => s.isSyncing);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(800);
  const listRef = useRef<HTMLDivElement | null>(null);

  const formatRelativeTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    if (diff < 60_000) return "Just now";
    const minutes = Math.floor(diff / 60_000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const lastUpdatedLabel = lastUpdatedAt
    ? `Last updated ${formatRelativeTime(lastUpdatedAt)}`
    : "Not updated yet";
  const hasOfflineChanges = pendingQueue.length > 0;
  const syncLabel = isSyncing
    ? "Syncing changes…"
    : hasOfflineChanges
      ? "Changes saved offline"
      : null;

  const filteredSkills = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skills.filter((skill) => {
      const matchesQuery =
        q.length === 0 ? true : skill.label.toLowerCase().includes(q);

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "strengths"
            ? skill.score >= 75
            : skill.score < 60;

      return matchesQuery && matchesFilter;
    });
  }, [skills, query, filter]);

  useEffect(() => {
    const updateMetrics = () => {
      if (!listRef.current) return;
      const rect = listRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const top = rect.top + scrollY;
      setScrollTop(Math.max(0, scrollY - top));
      setViewportHeight(window.innerHeight);
    };

    const onScroll = () => requestAnimationFrame(updateMetrics);

    updateMetrics();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const ITEM_HEIGHT = 96;
  const BUFFER = 6;
  const totalHeight = filteredSkills.length * ITEM_HEIGHT;
  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER
  );
  const endIndex = Math.min(
    filteredSkills.length,
    startIndex + Math.ceil(viewportHeight / ITEM_HEIGHT) + BUFFER * 2
  );
  const visibleSkills = filteredSkills.slice(startIndex, endIndex);

  return (
    <div className="animate-fade-in-up space-y-4" style={{ animationDelay: "150ms" }}>
      {/* Header rail */}
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center">
        <div className="space-y-1">
          <div className="flex items-baseline gap-2.5">
            <h3 className="text-sm font-semibold">Skill Areas</h3>
            <span className="text-xs text-text-muted tabular-nums">
              {filteredSkills.length} of {skills.length}
            </span>
          </div>
          <p className="text-xs text-text-muted">
            Manage and update skill scores.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-text-muted">
            <span>{lastUpdatedLabel}</span>
            {syncLabel && (
              <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {syncLabel}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs md:justify-center">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-full border transition-all duration-200 ease-out ${
                filter === key
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "border-border text-text-secondary hover:text-text-primary hover:border-primary/30"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
            <Input
              placeholder="Search skill area"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9 w-full pl-8"
              aria-label="Search skill areas"
            />
          </div>

          <Button onClick={openCreate} className="h-9 px-4 text-xs shadow-sm whitespace-nowrap">
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Add skill
          </Button>
        </div>
      </div>

      <div className="h-px w-full bg-border/70" />

      {/* Skill list */}
      {filteredSkills.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-sm text-text-muted">
            No skills match your filters.
          </p>
          <p className="text-xs text-text-muted mt-1">
            Try adjusting your search or filter.
          </p>
        </div>
      ) : (
        <div ref={listRef} className="relative">
          <div style={{ height: totalHeight }} />
          <div
            className="absolute left-0 right-0"
            style={{ top: startIndex * ITEM_HEIGHT }}
          >
            <div className="space-y-3">
              {visibleSkills.map((skill, i) => (
                <SkillRow
                  key={skill.id}
                  skill={skill}
                  index={startIndex + i}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
