import * as React from "react";
import clsx from "clsx";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
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
  placeholder:text-text-muted
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
  bg-danger/5
  text-text-primary
`;

export function Input({
    className,
    error = false,
    ...props
}: InputProps) {
    return (
        <input
            className={clsx(
                baseStyles,
                "border-border",
                error && errorStyles,
                className
            )}
            {...props}
        />
    );
}
