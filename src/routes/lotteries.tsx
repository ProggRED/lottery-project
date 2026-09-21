import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BuyDialog } from "@/components/buy-dialog";
import { LotteryCard } from "@/components/lottery-card";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { type Lottery, type LotteryStatus, useLuckora } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lotteries")({ component: LotteriesPage });

const FILTERS: { id: "all" | LotteryStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "open", label: "Open" },
  { id: "paused", label: "Paused" },
  { id: "closed", label: "Closed" },
  { id: "drawn", label: "Drawn" },
];

function LotteriesPage() {
  const lotteries = useLuckora((s) => s.lotteries);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [buying, setBuying] = useState<Lottery | null>(null);

  const visible = useMemo(() => {
    if (filter === "all") return lotteries;
    return lotteries.filter((lottery) => lottery.status === filter);
  }, [filter, lotteries]);

  return (
    <SiteShell>
      <section className="py-12 md:py-16">
        <p className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase">
          All draws
        </p>
        <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            Available lotteries
          </h1>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((item) => (
              <Button
                key={item.id}
                size="sm"
                variant={filter === item.id ? "default" : "secondary"}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="mt-16 text-center text-muted-foreground">
            <p className="font-display text-xl text-foreground">No draws in this view</p>
            <p className="mt-2 text-sm">Create one from the admin panel.</p>
          </div>
        ) : (
          <div className={cn("mt-8 grid gap-4 md:grid-cols-3")}>
            {visible.map((lottery) => (
              <LotteryCard key={lottery.id} lottery={lottery} onBuy={setBuying} />
            ))}
          </div>
        )}
      </section>

      <BuyDialog
        lottery={buying}
        open={Boolean(buying)}
        onOpenChange={(open) => {
          if (!open) setBuying(null);
        }}
      />
    </SiteShell>
  );
}
