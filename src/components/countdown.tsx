import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function split(ms: number) {
  const total = Math.max(0, ms);
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total % 86_400_000) / 3_600_000),
    minutes: Math.floor((total % 3_600_000) / 60_000),
    seconds: Math.floor((total % 60_000) / 1000),
  };
}

export function Countdown({ iso, compact = false }: { iso: string; compact?: boolean }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const target = new Date(iso).getTime();
  const parts = split(now === null || Number.isNaN(target) ? 0 : target - now);
  const ready = now !== null;
  const cells = [
    { label: "Days", value: parts.days },
    { label: "Hours", value: parts.hours },
    { label: "Min", value: parts.minutes },
    { label: "Sec", value: parts.seconds },
  ];

  return (
    <div className={cn("grid grid-cols-4 gap-1.5", compact ? "max-w-xs" : "")}>
      {cells.map((cell) => (
        <div key={cell.label} className="rounded-lg bg-muted px-1 py-2.5 text-center">
          <strong className="block font-display text-lg font-semibold tabular-nums sm:text-xl">
            {ready ? String(cell.value).padStart(2, "0") : "––"}
          </strong>
          <span className="text-[9px] font-medium tracking-widest text-muted-foreground uppercase">
            {cell.label}
          </span>
        </div>
      ))}
    </div>
  );
}
