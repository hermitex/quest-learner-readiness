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
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(800);
  const listRef = useRef<HTMLDivElement | null>(null);

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
      {/* Row 1: Title + count + Add button */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2.5">
          <h3 className="text-sm font-semibold">Skill Areas</h3>
          <span className="text-xs text-text-muted tabular-nums">
            {filteredSkills.length} of {skills.length}
          </span>
        </div>

        <Button onClick={openCreate} className="h-9 px-4 text-xs shadow-sm">
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Add skill
        </Button>
      </div>

      {/* Row 2: Filters + Search */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs">
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

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
          <Input
            placeholder="Search skill area"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 w-full max-w-65 pl-8"
          />
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
