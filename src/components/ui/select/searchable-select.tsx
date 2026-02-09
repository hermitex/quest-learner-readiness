import * as React from "react";
import clsx from "clsx";
import { Input } from "../input";

type Option = {
    label: string;
    value: string;
};

export type SearchableSelectProps = {
    options: Option[];
    value?: string;
    placeholder?: string;
    onChange: (value: string) => void;
};

export function SearchableSelect({
    options,
    value,
    placeholder = "Search…",
    onChange,
}: SearchableSelectProps) {
    const [query, setQuery] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const filtered = options.filter(o =>
        o.label.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="relative">
            <Input
                value={query}
                placeholder={placeholder}
                onFocus={() => setOpen(true)}
                onChange={(e) => setQuery(e.target.value)}
            />

            {open && (
                <div
                    className="
            absolute z-10 mt-1 w-full
            rounded-md border border-border
            bg-surface
            shadow-sm
            max-h-60 overflow-auto
          "
                >
                    {filtered.length === 0 && (
                        <div className="px-3 py-2 text-sm text-text-muted">
                            No results
                        </div>
                    )}

                    {filtered.map(option => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                onChange(option.value);
                                setQuery(option.label);
                                setOpen(false);
                            }}
                            className={clsx(
                                "w-full text-left px-3 py-2 text-sm",
                                "hover:bg-surface-muted"
                            )}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
