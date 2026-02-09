import * as React from "react";
import clsx from "clsx";

export function getScoreColor(value: number): string {
    if (value >= 75) return "var(--color-success)";
    if (value >= 50) return "var(--color-warning)";
    return "var(--color-danger)";
}

export function getScoreColorClass(value: number): string {
    if (value >= 75) return "text-success";
    if (value >= 50) return "text-warning";
    return "text-danger";
}

export type ProgressProps = {
    value: number;
    max?: number;
    showValue?: boolean;
    size?: "sm" | "md";
    colorByValue?: boolean;
    className?: string;
};

export function Progress({
    value,
    max = 100,
    showValue = false,
    size = "md",
    colorByValue = false,
    className,
}: ProgressProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const barColor = colorByValue ? getScoreColor(value) : undefined;

    return (
        <div className={clsx("space-y-1", className)}>
            {showValue && (
                <div className="text-xs text-text-secondary">
                    {Math.round(percentage)}%
                </div>
            )}

            <div
                className="
          w-full
          rounded
          bg-surface-muted/60
          overflow-hidden
        "
                style={{ height: size === "sm" ? "6px" : "10px" }}
                role="progressbar"
                aria-valuenow={Math.round(percentage)}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div
                    className={clsx(
                        "h-full rounded transition-[width] duration-500 ease-out",
                        !colorByValue && "bg-primary"
                    )}
                    style={{
                        width: `${percentage}%`,
                        ...(colorByValue ? { backgroundColor: barColor } : {}),
                    }}
                />
            </div>
        </div>
    );
}
