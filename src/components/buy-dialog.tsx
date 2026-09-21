import { useState } from "react";
import { Minus, Plus, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatRs } from "@/lib/format";
import { type Lottery, useLuckora } from "@/lib/store";

export function BuyDialog({
  lottery,
  open,
  onOpenChange,
}: {
  lottery: Lottery | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const buyTickets = useLuckora((s) => s.buyTickets);
  const [quantity, setQuantity] = useState(1);
  const [busy, setBusy] = useState(false);

  const max = lottery ? Math.min(10, lottery.remainingTickets) : 1;
  const price = lottery?.ticketPrice ?? 0;
  const total = price * quantity;

  function reset() {
    setQuantity(1);
    setBusy(false);
  }

  function changeQty(delta: number) {
    setQuantity((value) => Math.max(1, Math.min(max, value + delta)));
  }

  async function pay() {
    if (!lottery) return;
    setBusy(true);
    await new Promise((resolve) => window.setTimeout(resolve, 800));
    const result = buyTickets(lottery.id, quantity);
    if (!result.ok) {
      setBusy(false);
      toast.error(result.error);
      return;
    }
    toast.success(
      `${result.tickets?.length ?? quantity} ticket${quantity === 1 ? "" : "s"} issued`,
    );
    onOpenChange(false);
    reset();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Wallet className="size-5" />
          </div>
          <p className="text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
            Simulated payment
          </p>
          <DialogTitle>Buy your ticket</DialogTitle>
          <DialogDescription>
            Demo checkout for this college project. No real payment is processed.
          </DialogDescription>
        </DialogHeader>

        {lottery ? (
          <>
            <div className="rounded-xl bg-muted p-4 text-sm">
              <Row label="Lottery" value={lottery.name} />
              <Row label="Price" value={formatRs(price)} />
              <Row label="Quantity" value={String(quantity)} />
              <Row label="Total" value={formatRs(total)} emphasize />
            </div>

            <p className="mt-4 mb-2 text-xs font-medium tracking-wide text-muted-foreground">
              Number of tickets
            </p>
            <div className="flex overflow-hidden rounded-lg shadow-[var(--shadow-border)]">
              <button
                type="button"
                className="flex size-12 items-center justify-center bg-muted text-foreground"
                onClick={() => changeQty(-1)}
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </button>
              <input
                className="h-12 min-w-0 flex-1 border-x border-border bg-muted text-center text-sm tabular-nums outline-none"
                type="number"
                min={1}
                max={max}
                value={quantity}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  if (Number.isNaN(next)) return;
                  setQuantity(Math.max(1, Math.min(max, next)));
                }}
              />
              <button
                type="button"
                className="flex size-12 items-center justify-center bg-muted text-foreground"
                onClick={() => changeQty(1)}
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <Button
              className="mt-5 w-full"
              size="lg"
              disabled={busy || max < 1}
              onClick={() => void pay()}
            >
              {busy ? "Processing…" : `Simulate payment · ${formatRs(total)}`}
            </Button>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function Row({
  label,
  value,
  emphasize,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-muted-foreground">{label}</span>
      <strong className={emphasize ? "text-primary" : ""}>{value}</strong>
    </div>
  );
}
