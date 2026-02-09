import * as React from "react";
import clsx from "clsx";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
    height?: string;
    width?: string;
};

export function Skeleton({
    height = "h-4",
    width = "w-full",
    className,
    ...props
}: SkeletonProps) {
    return (
        <div
            className={clsx(
                "rounded bg-surface-muted animate-pulse",
                height,
                width,
                className
            )}
            {...props}
        />
    );
}
