import * as React from "react";
import clsx from "clsx";

export type ProgressProps = {
    value: number;            // 0–100
    max?: number;             // defaults to 100
    showValue?: boolean;      // optional percentage display
    size?: "sm" | "md";
    className?: string;
};

export function Progress({
    value,
    max = 100,
    showValue = false,
    size = "md",
    className,
}: ProgressProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

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
                    className="
            h-full
            rounded
            bg-primary
            transition-[width]
          "
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
