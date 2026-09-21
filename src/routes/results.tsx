import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { formatDate } from "@/lib/format";
import { useLuckora } from "@/lib/store";

export const Route = createFileRoute("/results")({ component: ResultsPage });

function ResultsPage() {
  const results = useLuckora((s) => s.results);

  return (
    <SiteShell>
      <section className="py-12 md:py-16">
        <p className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase">
          Previous draws
        </p>
        <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">Results</h1>

        {results.length === 0 ? (
          <div className="mt-16 text-center text-muted-foreground">
            <p className="font-display text-xl text-foreground">No results yet</p>
            <p className="mt-2 text-sm">Winners declared in admin appear here.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-2.5">
            {results.map((result) => (
              <article
                key={result.id}
                className="flex items-center justify-between rounded-2xl bg-card px-5 py-4 shadow-[var(--shadow-border)]"
              >
                <div>
                  <p className="font-semibold">{result.lotteryName}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(result.drawnAt)}</p>
                </div>
                <p className="font-mono text-base font-semibold text-primary sm:text-lg">
                  {result.winningNumber}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
