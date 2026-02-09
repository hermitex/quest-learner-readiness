import * as React from "react";
import { Skeleton } from ".";

export function CardSkeleton() {
    return (
        <div className="rounded-lg border border-border bg-surface p-4 space-y-3">
            <Skeleton height="h-4" width="w-1/2" />
            <Skeleton height="h-3" />
            <Skeleton height="h-3" width="w-5/6" />
        </div>
    );
}
