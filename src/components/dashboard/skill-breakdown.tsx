"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { SkillRow } from "./skill-row";
import { useReadinessStore } from "@/src/store/readiness.store";
import type { Skill } from "@/src/types/readiness";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
  skills: Skill[];
};

export function SkillBreakdown({ skills }: Props) {
  const openCreate = useReadinessStore((s) => s.openCreate);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "strengths" | "growth">(
    "all"
  );
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(800);
  const listRef = useRef<HTMLDivElement | null>(null);
  const filteredSkills = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skills.filter((skill) => {
      const matchesQuery = q.length === 0
        ? true
        : skill.label.toLowerCase().includes(q);

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
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold">Skill Areas</h3>

        <Button
          onClick={openCreate}
          className="h-9 px-4 text-xs shadow-sm"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Add skill
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-2.5 py-1 rounded-full border transition-colors duration-200 ease-out hover:-translate-y-0.5 ${
              filter === "all"
                ? "bg-primary text-white border-primary"
                : "border-border text-text-secondary hover:text-text-primary"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setFilter("strengths")}
            className={`px-2.5 py-1 rounded-full border transition-colors duration-200 ease-out hover:-translate-y-0.5 ${
              filter === "strengths"
                ? "bg-primary text-white border-primary"
                : "border-border text-text-secondary hover:text-text-primary"
            }`}
          >
            Strengths
          </button>
          <button
            type="button"
            onClick={() => setFilter("growth")}
            className={`px-2.5 py-1 rounded-full border transition-colors duration-200 ease-out hover:-translate-y-0.5 ${
              filter === "growth"
                ? "bg-primary text-white border-primary"
                : "border-border text-text-secondary hover:text-text-primary"
            }`}
          >
            Growth
          </button>
        </div>

        <Input
          placeholder="Search skill area"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-9 w-full max-w-[260px]"
        />
      </div>

      <div className="h-px w-full bg-border/70" />

      <div ref={listRef} className="relative">
        <div style={{ height: totalHeight }} />
        <div
          className="absolute left-0 right-0"
          style={{ top: startIndex * ITEM_HEIGHT }}
        >
          <div className="space-y-3">
            {visibleSkills.map((skill) => (
              <SkillRow key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-text-muted">
        <span>
          Showing {filteredSkills.length} of {skills.length}
        </span>
        {filteredSkills.length === 0 && (
          <span>No skills match your filters.</span>
        )}
      </div>
    </div>
  );
}
