import { CardSkeleton } from "@/src/components/feedback/loading/card-skeleton";
export default function Loading() {
    return (
        <div className="space-y-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
    );
}
