import { READINESS_THRESHOLDS } from "./constants";
import type { ReadinessMeaning } from "@/src/types/readiness";

export function interpretReadiness(score: number): ReadinessMeaning {
  if (score >= READINESS_THRESHOLDS.high) {
    return {
      status: "On track",
      message: "You're building steadily across your skill areas.",
    };
  }

  if (score >= READINESS_THRESHOLDS.moderate) {
    return {
      status: "Making progress",
      message:
        "You're making steady progress toward post-school readiness.",
    };
  }

  return {
    status: "Getting started",
    message: "You're beginning to build your readiness foundations.",
  };
}
