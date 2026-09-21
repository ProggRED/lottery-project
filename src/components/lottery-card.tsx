import { Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatRs } from "@/lib/format";
import { type Lottery } from "@/lib/store";

export function LotteryCard({
  lottery,
  onBuy,
}: {
  lottery: Lottery;
  onBuy: (lottery: Lottery) => void;
}) {
  const canBuy = lottery.status === "open" && lottery.remainingTickets > 0;

  return (
    <Card className="flex flex-col p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-border-hover)]">
      <div className="flex items-center justify-between">
        <Badge>{lottery.badge}</Badge>
        <Ticket className="size-4 text-muted-foreground" />
      </div>
      <h3 className="font-display mt-5 text-2xl font-semibold tracking-tight">
        {lottery.name}
      </h3>
      <p className="mt-2 min-h-10 text-sm leading-relaxed text-muted-foreground">
        {lottery.description}
      </p>
      <div className="mt-6">
        <span className="block text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
          Prize
        </span>
        <p className="font-display text-[1.7rem] font-semibold tracking-tight">
          {formatRs(lottery.prize)}
        </p>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
        <span>{lottery.remainingTickets.toLocaleString()} left</span>
        <span>{formatRs(lottery.ticketPrice)}</span>
      </div>
      <Button className="mt-4 w-full" disabled={!canBuy} onClick={() => onBuy(lottery)}>
        {canBuy ? "Buy ticket" : statusLabel(lottery)}
      </Button>
    </Card>
  );
}

function statusLabel(lottery: Lottery) {
  if (lottery.remainingTickets <= 0) return "Sold out";
  if (lottery.status === "drawn") return "Drawn";
  if (lottery.status === "paused") return "Paused";
  return "Closed";
}
