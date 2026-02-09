import * as React from "react";
import { Skeleton } from ".";
export type TextSkeletonProps = {
    lines?: number;
};

export function TextSkeleton({ lines = 3 }: TextSkeletonProps) {
    return (
        <div className="space-y-2">
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    height="h-4"
                    width={i === lines - 1 ? "w-2/3" : "w-full"}
                />
            ))}
        </div>
    );
}
