import { Card } from "../ui/card";

type Props = {
  message: string;
};

export function Insight({ message }: Props) {
  return (
    <Card
      variant="muted"
      className="p-4 border-l-2 border-accent/70 bg-surface-muted/50"
    >
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
          Insight
        </p>
        <p className="text-sm text-text-secondary">{message}</p>
      </div>
    </Card>
  );
}
