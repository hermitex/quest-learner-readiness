"use client";

import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import * as React from "react";
import Link from "next/link";
type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
    return (
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center">
            <Card className="relative w-full overflow-hidden p-8 md:p-10">
                <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
                        Quick pause
                    </p>

                    <h1 className="text-2xl font-semibold md:text-3xl">
                        This section didn’t load.
                    </h1>

                    <p className="text-sm text-text-secondary">
                        Your progress is safe. Give it another
                        try, or head back to the readiness view.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        <Button
                            onClick={reset}
                            className="rounded-full px-5 py-2.5 normal-case tracking-normal"
                        >
                            Try again
                        </Button>
                        <Link href="/">
                            <Button
                                variant="tertiary"
                                className="rounded-full px-5 py-2.5 normal-case tracking-normal"
                            >
                                Back to readiness
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
}
