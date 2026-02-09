import * as React from "react";
import clsx from "clsx";

export type ButtonVariant =
    | "primary"
    | "secondary"
    | "tertiary";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
};

const baseStyles = `
  inline-flex items-center justify-center
  rounded-full
  text-sm font-semibold
  transition-[color,background-color,border-color,transform,box-shadow]
  duration-200 ease-out
  focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-accent
  disabled:cursor-not-allowed
  px-5 py-2.5
  active:scale-[0.98]
`;

const variantStyles: Record<ButtonVariant, string> = {
    primary: `
    bg-primary text-white
    hover:bg-primary-soft
    disabled:bg-surface-muted
    disabled:text-text-muted
  `,

    secondary: `
    border border-white
    text-white
    hover:bg-white/10
    disabled:border-border
    disabled:text-text-muted
  `,

    tertiary: `
    text-text-secondary
    hover:text-text-primary
    hover:bg-surface-muted
    disabled:text-text-muted
  `,
};

export function Button({
    variant = "primary",
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={clsx(
                baseStyles,
                variantStyles[variant],
                className
            )}
            {...props}
        />
    );
}
