import { createFileRoute, Link } from "@tanstack/react-router";
import { Ticket } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatRs } from "@/lib/format";
import { useLuckora } from "@/lib/store";

export const Route = createFileRoute("/tickets")({ component: TicketsPage });

function TicketsPage() {
  const tickets = useLuckora((s) => s.tickets);
  const ordered = [...tickets].reverse();

  return (
    <SiteShell>
      <section className="py-12 md:py-16">
        <p className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase">
          Your account
        </p>
        <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">My tickets</h1>

        <div className="mt-8 rounded-2xl bg-card p-6 shadow-[var(--shadow-border)]">
          {ordered.length === 0 ? (
            <div className="py-12 text-center">
              <Ticket className="mx-auto size-10 text-muted-foreground" />
              <h2 className="font-display mt-4 text-xl font-semibold">No tickets yet</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Buy a ticket and it will appear here.
              </p>
              <Button asChild className="mt-5">
                <Link to="/lotteries">Browse lotteries</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-3">
              {ordered.map((ticket) => (
                <article
                  key={ticket.id}
                  className="flex flex-col gap-3 rounded-xl bg-muted p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-xs text-muted-foreground">{ticket.lotteryName}</p>
                    <p className="font-mono mt-1 text-2xl font-semibold text-primary">
                      {ticket.number}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDate(ticket.purchasedAt)} · {formatRs(ticket.price)}
                    </p>
                  </div>
                  <Badge variant={statusVariant(ticket.status)}>{ticket.status}</Badge>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

function statusVariant(status: string) {
  if (status === "won") return "success" as const;
  if (status === "lost") return "danger" as const;
  return "default" as const;
}
