import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Lock,
  Plus,
  Trophy,
  Ticket,
  Coins,
  LayoutDashboard,
  Pencil,
  Trash2,
  Dices,
} from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, formatDateTime, formatRs, toDatetimeLocal, fromDatetimeLocal } from "@/lib/format";
import {
  BADGES,
  DEFAULT_PIN,
  type Lottery,
  type LotteryDraft,
  type LotteryStatus,
  lotterySoldCount,
  useLuckora,
} from "@/lib/store";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  const unlocked = useLuckora((s) => s.adminUnlocked);

  return (
    <SiteShell>
      <section className="py-10 md:py-14">
        <p className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase">
          Control room
        </p>
        <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">Admin</h1>
        {unlocked ? <AdminDesk /> : <AdminGate />}
      </section>
    </SiteShell>
  );
}

function AdminGate() {
  const unlockAdmin = useLuckora((s) => s.unlockAdmin);
  const [pin, setPin] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (unlockAdmin(pin)) {
      toast.success("Admin unlocked");
      return;
    }
    toast.error("Wrong PIN");
  }

  return (
    <Card className="mx-auto mt-10 max-w-md p-7">
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-muted">
        <Lock className="size-5" />
      </div>
      <h2 className="font-display text-2xl font-semibold">Enter admin PIN</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Demo access for this college project. Default PIN is{" "}
        <span className="font-mono text-foreground">{DEFAULT_PIN}</span>.
      </p>
      <form className="mt-6 grid gap-3" onSubmit={submit}>
        <Label htmlFor="pin">PIN</Label>
        <Input
          id="pin"
          type="password"
          inputMode="numeric"
          autoComplete="off"
          value={pin}
          onChange={(event) => setPin(event.target.value)}
          placeholder="Enter PIN"
        />
        <Button type="submit" className="mt-2">
          Unlock
        </Button>
      </form>
    </Card>
  );
}

function AdminDesk() {
  const lotteries = useLuckora((s) => s.lotteries);
  const tickets = useLuckora((s) => s.tickets);
  const results = useLuckora((s) => s.results);
  const lockAdmin = useLuckora((s) => s.lockAdmin);
  const [editing, setEditing] = useState<Lottery | "new" | null>(null);
  const [drawId, setDrawId] = useState<string | null>(
    lotteries.find((item) => item.status !== "drawn")?.id ?? lotteries[0]?.id ?? null,
  );

  const revenue = tickets.reduce((sum, ticket) => sum + ticket.price, 0);
  const winners = tickets.filter((ticket) => ticket.status === "won").length;

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Manage draws, listing prices, tickets, and winners.
        </p>
        <Button variant="secondary" size="sm" onClick={lockAdmin}>
          Lock admin
        </Button>
      </div>

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="lotteries">Lotteries</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="draws">Draws</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat icon={LayoutDashboard} label="Active draws" value={String(lotteries.filter((l) => l.status === "open").length)} />
            <Stat icon={Ticket} label="Tickets sold" value={String(tickets.length)} />
            <Stat icon={Coins} label="Simulated revenue" value={formatRs(revenue)} />
            <Stat icon={Trophy} label="Winners declared" value={String(winners)} />
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Card className="p-5">
              <h3 className="font-display text-lg font-semibold">Lotteries</h3>
              <div className="mt-4 grid gap-3">
                {lotteries.slice(0, 5).map((lottery) => (
                  <div key={lottery.id} className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{lottery.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatRs(lottery.ticketPrice)} · {lottery.remainingTickets.toLocaleString()} left
                      </p>
                    </div>
                    <StatusBadge status={lottery.status} />
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-5">
              <h3 className="font-display text-lg font-semibold">Latest results</h3>
              <div className="mt-4 grid gap-3">
                {results.slice(0, 5).map((result) => (
                  <div key={result.id} className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{result.lotteryName}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(result.drawnAt)}</p>
                    </div>
                    <p className="font-mono text-sm text-primary">{result.winningNumber}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lotteries">
          <div className="mb-4 flex justify-end">
            <Button onClick={() => setEditing("new")}>
              <Plus className="size-4" />
              Create lottery
            </Button>
          </div>
          <div className="grid gap-4">
            {lotteries.map((lottery) => (
              <LotteryAdminCard
                key={lottery.id}
                lottery={lottery}
                onEdit={() => setEditing(lottery)}
                onDraw={() => setDrawId(lottery.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tickets">
          <TicketsTable />
        </TabsContent>

        <TabsContent value="draws">
          <DrawsPanel drawId={drawId} setDrawId={setDrawId} />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsPanel />
        </TabsContent>
      </Tabs>

      <LotteryEditor
        lottery={editing === "new" ? null : editing}
        open={editing !== null}
        onOpenChange={(open) => {
          if (!open) setEditing(null);
        }}
      />
    </>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Ticket;
  label: string;
  value: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" />
        <span className="text-xs font-medium tracking-wide uppercase">{label}</span>
      </div>
      <p className="font-display mt-3 text-2xl font-semibold tabular-nums">{value}</p>
    </Card>
  );
}

function StatusBadge({ status }: { status: LotteryStatus }) {
  const variant =
    status === "open" ? "success" : status === "drawn" ? "muted" : status === "paused" ? "outline" : "danger";
  return <Badge variant={variant}>{status}</Badge>;
}

function LotteryAdminCard({
  lottery,
  onEdit,
  onDraw,
}: {
  lottery: Lottery;
  onEdit: () => void;
  onDraw: () => void;
}) {
  const updateLottery = useLuckora((s) => s.updateLottery);
  const deleteLottery = useLuckora((s) => s.deleteLottery);
  const sold = lotterySoldCount(lottery);

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-xl font-semibold">{lottery.name}</h3>
            <StatusBadge status={lottery.status} />
            {lottery.featured ? <Badge>Featured</Badge> : null}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{lottery.description}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Draw {formatDateTime(lottery.drawAt)} · {sold.toLocaleString()} sold / {lottery.totalTickets.toLocaleString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={onEdit}>
            <Pencil className="size-3.5" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="secondary"
            disabled={lottery.status === "drawn"}
            onClick={onDraw}
          >
            <Dices className="size-3.5" />
            Draw
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const result = deleteLottery(lottery.id);
              if (!result.ok) toast.error(result.error);
              else toast.success("Lottery removed");
            }}
          >
            <Trash2 className="size-3.5" />
            Delete
          </Button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <PriceField
          label="Listing price"
          value={lottery.ticketPrice}
          onCommit={(value) => {
            updateLottery(lottery.id, { ticketPrice: value });
            toast.success("Listing price updated");
          }}
        />
        <PriceField
          label="Prize"
          value={lottery.prize}
          onCommit={(value) => {
            updateLottery(lottery.id, { prize: value });
            toast.success("Prize updated");
          }}
        />
        <PriceField
          label="Tickets left"
          value={lottery.remainingTickets}
          onCommit={(value) => {
            updateLottery(lottery.id, { remainingTickets: value });
            toast.success("Inventory updated");
          }}
        />
      </div>
    </Card>
  );
}

function PriceField({
  label,
  value,
  onCommit,
}: {
  label: string;
  value: number;
  onCommit: (value: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  return (
    <div className="grid gap-1.5">
      <span className="text-xs font-medium tracking-wide text-muted-foreground">{label}</span>
      <div className="flex gap-2">
        <Input
          type="number"
          min={0}
          className="tabular-nums"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          aria-label={label}
        />
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            const next = Number(draft);
            if (!Number.isFinite(next) || next < 0) {
              toast.error("Enter a valid number");
              setDraft(String(value));
              return;
            }
            onCommit(Math.floor(next));
            setDraft(String(Math.floor(next)));
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

function LotteryEditor({
  lottery,
  open,
  onOpenChange,
}: {
  lottery: Lottery | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const createLottery = useLuckora((s) => s.createLottery);
  const updateLottery = useLuckora((s) => s.updateLottery);
  const isNew = lottery === null;

  const [draft, setDraft] = useState<LotteryDraft>(emptyDraft());

  useEffect(() => {
    if (open) setDraft(lottery ? toDraft(lottery) : emptyDraft());
  }, [open, lottery]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(36rem,calc(100%-1.5rem))]">
        <DialogHeader>
          <DialogTitle>{isNew ? "Create lottery" : "Edit lottery"}</DialogTitle>
          <DialogDescription>
            Listing price is what buyers see on the public site.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <Field label="Name">
            <Input
              value={draft.name}
              onChange={(event) => setDraft({ ...draft, name: event.target.value })}
            />
          </Field>
          <Field label="Description">
            <Textarea
              value={draft.description}
              onChange={(event) => setDraft({ ...draft, description: event.target.value })}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Badge">
              <NativeSelect
                value={draft.badge}
                onChange={(event) =>
                  setDraft({ ...draft, badge: event.target.value as LotteryDraft["badge"] })
                }
              >
                {BADGES.map((badge) => (
                  <option key={badge} value={badge}>
                    {badge}
                  </option>
                ))}
              </NativeSelect>
            </Field>
            <Field label="Status">
              <NativeSelect
                value={draft.status}
                onChange={(event) =>
                  setDraft({ ...draft, status: event.target.value as LotteryStatus })
                }
              >
                <option value="open">Open</option>
                <option value="paused">Paused</option>
                <option value="closed">Closed</option>
                <option value="drawn">Drawn</option>
              </NativeSelect>
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Listing price (Rs.)">
              <Input
                type="number"
                min={1}
                value={draft.ticketPrice}
                onChange={(event) =>
                  setDraft({ ...draft, ticketPrice: Number(event.target.value) })
                }
              />
            </Field>
            <Field label="Prize (Rs.)">
              <Input
                type="number"
                min={1}
                value={draft.prize}
                onChange={(event) => setDraft({ ...draft, prize: Number(event.target.value) })}
              />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Total tickets">
              <Input
                type="number"
                min={1}
                value={draft.totalTickets}
                onChange={(event) =>
                  setDraft({ ...draft, totalTickets: Number(event.target.value) })
                }
              />
            </Field>
            <Field label="Remaining tickets">
              <Input
                type="number"
                min={0}
                value={draft.remainingTickets}
                onChange={(event) =>
                  setDraft({ ...draft, remainingTickets: Number(event.target.value) })
                }
              />
            </Field>
          </div>
          <Field label="Draw date">
            <Input
              type="datetime-local"
              value={toDatetimeLocal(draft.drawAt)}
              onChange={(event) =>
                setDraft({ ...draft, drawAt: fromDatetimeLocal(event.target.value) })
              }
            />
          </Field>
          <label className="flex items-center justify-between rounded-xl bg-muted px-4 py-3">
            <span className="text-sm">Feature on home</span>
            <Switch
              checked={draft.featured}
              onCheckedChange={(featured) => setDraft({ ...draft, featured })}
            />
          </label>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (!draft.name.trim()) {
                toast.error("Name is required");
                return;
              }
              if (isNew) {
                createLottery(draft);
                toast.success("Lottery created");
              } else if (lottery) {
                updateLottery(lottery.id, draft);
                toast.success("Lottery updated");
              }
              onOpenChange(false);
            }}
          >
            {isNew ? "Create" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-medium tracking-wide text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function emptyDraft(): LotteryDraft {
  const draw = new Date();
  draw.setDate(draw.getDate() + 7);
  return {
    name: "",
    description: "",
    badge: "NEW",
    ticketPrice: 50,
    prize: 25000,
    totalTickets: 5000,
    remainingTickets: 5000,
    drawAt: draw.toISOString(),
    featured: false,
    status: "open",
  };
}

function toDraft(lottery: Lottery): LotteryDraft {
  return {
    name: lottery.name,
    description: lottery.description,
    badge: lottery.badge,
    ticketPrice: lottery.ticketPrice,
    prize: lottery.prize,
    totalTickets: lottery.totalTickets,
    remainingTickets: lottery.remainingTickets,
    drawAt: lottery.drawAt,
    featured: lottery.featured,
    status: lottery.status,
  };
}

function TicketsTable() {
  const tickets = useLuckora((s) => s.tickets);
  const lotteries = useLuckora((s) => s.lotteries);
  const [query, setQuery] = useState("");
  const [lotteryId, setLotteryId] = useState("all");

  const rows = useMemo(() => {
    return [...tickets]
      .reverse()
      .filter((ticket) => (lotteryId === "all" ? true : ticket.lotteryId === lotteryId))
      .filter((ticket) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
          ticket.number.toLowerCase().includes(q) ||
          ticket.lotteryName.toLowerCase().includes(q)
        );
      });
  }, [tickets, query, lotteryId]);

  return (
    <div>
      <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_12rem]">
        <Input
          placeholder="Search ticket number"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <NativeSelect value={lotteryId} onChange={(event) => setLotteryId(event.target.value)}>
          <option value="all">All lotteries</option>
          {lotteries.map((lottery) => (
            <option key={lottery.id} value={lottery.id}>
              {lottery.name}
            </option>
          ))}
        </NativeSelect>
      </div>
      {rows.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">No tickets match.</p>
      ) : (
        <div className="grid gap-2">
          {rows.map((ticket) => (
            <article
              key={ticket.id}
              className="flex flex-col gap-2 rounded-xl bg-card px-4 py-3 shadow-[var(--shadow-border)] sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-mono text-lg text-primary">{ticket.number}</p>
                <p className="text-xs text-muted-foreground">
                  {ticket.lotteryName} · {formatDate(ticket.purchasedAt)} · {formatRs(ticket.price)}
                </p>
              </div>
              <Badge
                variant={
                  ticket.status === "won" ? "success" : ticket.status === "lost" ? "danger" : "default"
                }
              >
                {ticket.status}
              </Badge>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function DrawsPanel({
  drawId,
  setDrawId,
}: {
  drawId: string | null;
  setDrawId: (id: string | null) => void;
}) {
  const lotteries = useLuckora((s) => s.lotteries);
  const tickets = useLuckora((s) => s.tickets);
  const results = useLuckora((s) => s.results);
  const declareWinner = useLuckora((s) => s.declareWinner);
  const reopenLottery = useLuckora((s) => s.reopenLottery);
  const openNextRound = useLuckora((s) => s.openNextRound);
  const lottery = lotteries.find((item) => item.id === drawId) ?? null;
  const pool = tickets.filter((ticket) => ticket.lotteryId === drawId);
  const currentResult = results.find((result) => result.lotteryId === drawId);

  function draw(ticketId?: string) {
    if (!lottery) return;
    const result = declareWinner(lottery.id, ticketId);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success(`Winner: ${result.result?.winningNumber}`);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[16rem_1fr]">
      <Card className="p-3">
        <p className="px-2 pt-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Select draw
        </p>
        <div className="mt-2 grid gap-1">
          {lotteries.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setDrawId(item.id)}
              className={`flex min-h-11 items-center justify-between rounded-lg px-3 text-left text-sm ${
                item.id === drawId ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="truncate">{item.name}</span>
              <StatusBadge status={item.status} />
            </button>
          ))}
        </div>
      </Card>

      {lottery ? (
        <Card className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-2xl font-semibold">{lottery.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {pool.length} ticket{pool.length === 1 ? "" : "s"} in this round · prize {formatRs(lottery.prize)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button disabled={lottery.status === "drawn"} onClick={() => draw()}>
                Draw random winner
              </Button>
              {lottery.status === "drawn" ? (
                <>
                  <Button variant="secondary" onClick={() => {
                    const result = reopenLottery(lottery.id);
                    if (!result.ok) toast.error(result.error);
                    else toast.success("Draw reopened");
                  }}>
                    Reopen
                  </Button>
                  <Button variant="secondary" onClick={() => {
                    const result = openNextRound(lottery.id);
                    if (!result.ok) toast.error(result.error);
                    else toast.success("Next round opened");
                  }}>
                    Next round
                  </Button>
                </>
              ) : null}
            </div>
          </div>

          {currentResult ? (
            <div className="mt-5 rounded-xl bg-muted p-4">
              <p className="text-xs tracking-widest text-muted-foreground uppercase">Winning number</p>
              <p className="font-mono mt-1 text-2xl text-primary">{currentResult.winningNumber}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {currentResult.method === "manual" ? "Picked manually" : "Random draw"} · {formatDateTime(currentResult.drawnAt)}
              </p>
            </div>
          ) : null}

          <div className="mt-5 grid gap-2">
            {pool.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No tickets sold yet. You can still run a random draw to publish a winning number.
              </p>
            ) : (
              pool.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between gap-3 rounded-xl bg-muted px-4 py-3"
                >
                  <div>
                    <p className="font-mono text-primary">{ticket.number}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(ticket.purchasedAt)}</p>
                  </div>
                  {ticket.status === "won" ? (
                    <Badge>Winner</Badge>
                  ) : ticket.status === "lost" ? (
                    <Badge variant="danger">Lost</Badge>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => draw(ticket.id)}
                    >
                      Declare winner
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        </Card>
      ) : (
        <p className="text-sm text-muted-foreground">Create a lottery first.</p>
      )}
    </div>
  );
}

function SettingsPanel() {
  const adminPin = useLuckora((s) => s.adminPin);
  const setAdminPin = useLuckora((s) => s.setAdminPin);
  const resetDemo = useLuckora((s) => s.resetDemo);
  const [pin, setPin] = useState(adminPin);

  return (
    <div className="grid max-w-lg gap-4">
      <Card className="p-5">
        <h3 className="font-display text-lg font-semibold">Admin PIN</h3>
        <p className="mt-1 text-sm text-muted-foreground">Minimum 4 characters. Stored only on this device.</p>
        <div className="mt-4 flex gap-2">
          <Input value={pin} onChange={(event) => setPin(event.target.value)} />
          <Button
            variant="secondary"
            onClick={() => {
              if (pin.trim().length < 4) {
                toast.error("PIN must be at least 4 characters");
                return;
              }
              setAdminPin(pin);
              toast.success("PIN updated");
            }}
          >
            Save
          </Button>
        </div>
      </Card>
      <Card className="p-5">
        <h3 className="font-display text-lg font-semibold">Reset demo data</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Restores the three starter lotteries and clears purchased tickets.
        </p>
        <Button
          className="mt-4"
          variant="destructive"
          onClick={() => {
            resetDemo();
            toast.success("Demo data restored");
          }}
        >
          Reset everything
        </Button>
      </Card>
    </div>
  );
}
