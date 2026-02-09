import * as React from "react";
import clsx from "clsx";

export type SelectProps =
    React.SelectHTMLAttributes<HTMLSelectElement> & {
        error?: boolean;
    };

const baseStyles = `
  w-full
  rounded-md
  border
  bg-surface
  px-3 py-2
  text-sm
  text-text-primary
  transition
  focus:outline-none
  focus:ring-2 focus:ring-primary
  disabled:cursor-not-allowed
  disabled:bg-surface-muted
  disabled:text-text-muted
`;

const errorStyles = `
  border-danger
  focus:ring-danger
`;

export function Select({
    className,
    error = false,
    children,
    ...props
}: SelectProps) {
    return (
        <select
            className={clsx(
                baseStyles,
                "border-border",
                error && errorStyles,
                className
            )}
            {...props}
        >
            {children}
        </select>
    );
}
