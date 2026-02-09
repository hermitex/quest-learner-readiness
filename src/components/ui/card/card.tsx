import * as React from "react";
import clsx from "clsx";

export type CardVariant =
    | "default"
    | "muted"
    | "emphasis";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: CardVariant;
};

const baseStyles = `
  rounded-lg
  border
  bg-surface
  text-text-primary
`;

const variantStyles: Record<CardVariant, string> = {
    default: `
    border-border
  `,

    muted: `
    border-border
    bg-surface-muted
  `,

    emphasis: `
    border-primary/40
    bg-primary
    text-white
  `,
};

export function Card({
    variant = "default",
    className,
    ...props
}: CardProps) {
    return (
        <div
            className={clsx(
                baseStyles,
                variantStyles[variant],
                className
            )}
            {...props}
        />
    );
}
