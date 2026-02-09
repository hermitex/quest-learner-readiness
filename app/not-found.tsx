import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center">
            <Card className="relative w-full overflow-hidden p-8 md:p-10">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
                <div className="relative space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
                        Detour
                    </p>

                    <h1 className="text-2xl font-semibold md:text-3xl">
                        That path isn’t here right now.
                    </h1>

                    <p className="text-sm text-text-secondary">
                        You’re still on track. Choose a known
                        route and we’ll take you there.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                        <Link href="/">
                            <Button className="rounded-full px-5 py-2.5 normal-case tracking-normal">
                                Go to readiness
                            </Button>
                        </Link>
                        <span className="text-xs text-text-muted self-center">
                            Tip: use the drawer to switch areas.
                        </span>
                    </div>
                </div>
            </Card>
        </div>
    );
}
