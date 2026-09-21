import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BuyDialog } from "@/components/buy-dialog";
import { Countdown } from "@/components/countdown";
import { LotteryCard } from "@/components/lottery-card";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { formatRs } from "@/lib/format";
import { getFeaturedLottery, type Lottery, useLuckora } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const lotteries = useLuckora((s) => s.lotteries);
  const featured = getFeaturedLottery(lotteries);
  const preview = lotteries.filter((item) => item.status !== "drawn").slice(0, 3);
  const [buying, setBuying] = useState<Lottery | null>(null);

  return (
    <SiteShell>
      <section className="grid items-center gap-9 py-12 md:grid-cols-[1.25fr_0.75fr] md:py-16">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase">
            College project · demo
          </p>
          <h1 className="font-display mt-5 text-5xl leading-[0.92] font-extrabold tracking-tight md:text-7xl">
            Your luck.
            <br />
            <span className="text-primary">Your moment.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            Explore simulated lottery draws, buy tickets, and run the full purchase
            flow. An admin panel controls prices, inventory, and winners. No real
            money is involved.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/lotteries">Explore lotteries</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/tickets">My tickets</Link>
            </Button>
          </div>
        </div>

        {featured ? (
          <div className="featured-wash rounded-3xl p-7 shadow-[var(--shadow-border)]">
            <p className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase">
              Featured draw
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight">
              {featured.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{featured.description}</p>
            <div className="mt-6">
              <span className="block text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                Grand prize
              </span>
              <p className="font-display text-4xl font-extrabold tracking-tight">
                {formatRs(featured.prize)}
              </p>
            </div>
            <div className="mt-5">
              <Countdown iso={featured.drawAt} />
            </div>
            <Button
              className="mt-6 w-full"
              size="lg"
              disabled={featured.status !== "open" || featured.remainingTickets <= 0}
              onClick={() => setBuying(featured)}
            >
              Buy ticket · {formatRs(featured.ticketPrice)}
            </Button>
          </div>
        ) : null}
      </section>

      <section className="pb-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase">
              Available now
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Pick your draw
            </h2>
          </div>
          <Link
            to="/lotteries"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {preview.map((lottery) => (
            <LotteryCard key={lottery.id} lottery={lottery} onBuy={setBuying} />
          ))}
        </div>
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
