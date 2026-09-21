import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateTicketNumber, newId } from "@/lib/format";

export type LotteryStatus = "open" | "paused" | "closed" | "drawn";
export type TicketStatus = "upcoming" | "won" | "lost";
export type DrawMethod = "random" | "manual";

export const BADGES = [
  "FEATURED",
  "POPULAR",
  "QUICK DRAW",
  "NEW",
  "LIMITED",
] as const;

export type LotteryBadge = (typeof BADGES)[number];

export type Lottery = {
  id: string;
  name: string;
  description: string;
  badge: LotteryBadge;
  ticketPrice: number;
  prize: number;
  totalTickets: number;
  remainingTickets: number;
  drawAt: string;
  featured: boolean;
  status: LotteryStatus;
  createdAt: string;
};

export type Ticket = {
  id: string;
  lotteryId: string;
  lotteryName: string;
  number: string;
  price: number;
  purchasedAt: string;
  status: TicketStatus;
};

export type DrawResult = {
  id: string;
  lotteryId: string;
  lotteryName: string;
  winningNumber: string;
  ticketId: string | null;
  drawnAt: string;
  method: DrawMethod;
};

export type LotteryDraft = {
  name: string;
  description: string;
  badge: LotteryBadge;
  ticketPrice: number;
  prize: number;
  totalTickets: number;
  remainingTickets: number;
  drawAt: string;
  featured: boolean;
  status: LotteryStatus;
};

const SEED_LOTTERIES: Lottery[] = [
  {
    id: "mega",
    name: "Mega Weekly",
    description: "Flagship weekly simulated draw with the largest prize pool.",
    badge: "FEATURED",
    ticketPrice: 100,
    prize: 500000,
    totalTickets: 10000,
    remainingTickets: 7842,
    drawAt: "2026-10-02T20:00:00.000Z",
    featured: true,
    status: "open",
    createdAt: "2026-09-01T10:00:00.000Z",
  },
  {
    id: "gold",
    name: "Gold Rush",
    description: "A fast-moving mid-week simulated lottery.",
    badge: "POPULAR",
    ticketPrice: 50,
    prize: 100000,
    totalTickets: 8000,
    remainingTickets: 4200,
    drawAt: "2026-09-28T18:00:00.000Z",
    featured: false,
    status: "open",
    createdAt: "2026-09-05T10:00:00.000Z",
  },
  {
    id: "weekend",
    name: "Weekend Pick",
    description: "A smaller simulated weekend draw with a low ticket price.",
    badge: "QUICK DRAW",
    ticketPrice: 25,
    prize: 50000,
    totalTickets: 12000,
    remainingTickets: 9100,
    drawAt: "2026-09-27T16:00:00.000Z",
    featured: false,
    status: "open",
    createdAt: "2026-09-08T10:00:00.000Z",
  },
];

const SEED_RESULTS: DrawResult[] = [
  {
    id: "r-mega-prev",
    lotteryId: "mega-week-38",
    lotteryName: "Mega Weekly",
    winningNumber: "LK-482913",
    ticketId: null,
    drawnAt: "2026-09-19T20:00:00.000Z",
    method: "random",
  },
  {
    id: "r-gold-prev",
    lotteryId: "gold-week-37",
    lotteryName: "Gold Rush",
    winningNumber: "LK-731204",
    ticketId: null,
    drawnAt: "2026-09-15T18:00:00.000Z",
    method: "random",
  },
  {
    id: "r-weekend-prev",
    lotteryId: "weekend-week-37",
    lotteryName: "Weekend Pick",
    winningNumber: "LK-194582",
    ticketId: null,
    drawnAt: "2026-09-12T16:00:00.000Z",
    method: "random",
  },
];

export const DEFAULT_PIN = "2026";

type LuckoraState = {
  lotteries: Lottery[];
  tickets: Ticket[];
  results: DrawResult[];
  adminPin: string;
  adminUnlocked: boolean;
  theme: "dark" | "light";
  hasHydrated: boolean;
  setHydrated: () => void;
  setTheme: (theme: "dark" | "light") => void;
  toggleTheme: () => void;
  unlockAdmin: (pin: string) => boolean;
  lockAdmin: () => void;
  setAdminPin: (pin: string) => void;
  createLottery: (draft: LotteryDraft) => Lottery;
  updateLottery: (id: string, patch: Partial<LotteryDraft>) => void;
  deleteLottery: (id: string) => { ok: boolean; error?: string };
  buyTickets: (
    lotteryId: string,
    quantity: number,
  ) => { ok: boolean; error?: string; tickets?: Ticket[] };
  declareWinner: (
    lotteryId: string,
    ticketId?: string,
  ) => { ok: boolean; error?: string; result?: DrawResult };
  reopenLottery: (id: string) => { ok: boolean; error?: string };
  openNextRound: (id: string) => { ok: boolean; error?: string };
  resetDemo: () => void;
};

function clampInventory(total: number, remaining: number) {
  const safeTotal = Math.max(1, Math.floor(total));
  const safeRemaining = Math.max(0, Math.min(safeTotal, Math.floor(remaining)));
  return { totalTickets: safeTotal, remainingTickets: safeRemaining };
}

export const useLuckora = create<LuckoraState>()(
  persist(
    (set, get) => ({
      lotteries: SEED_LOTTERIES,
      tickets: [],
      results: SEED_RESULTS,
      adminPin: DEFAULT_PIN,
      adminUnlocked: false,
      theme: "dark",
      hasHydrated: false,
      setHydrated: () => set({ hasHydrated: true }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
      unlockAdmin: (pin) => {
        if (pin.trim() !== get().adminPin) return false;
        set({ adminUnlocked: true });
        return true;
      },
      lockAdmin: () => set({ adminUnlocked: false }),
      setAdminPin: (pin) => {
        const next = pin.trim();
        if (next.length < 4) return;
        set({ adminPin: next });
      },
      createLottery: (draft) => {
        const inventory = clampInventory(draft.totalTickets, draft.remainingTickets);
        const lottery: Lottery = {
          id: newId(),
          name: draft.name.trim() || "Untitled draw",
          description: draft.description.trim(),
          badge: draft.badge,
          ticketPrice: Math.max(1, Math.floor(draft.ticketPrice)),
          prize: Math.max(1, Math.floor(draft.prize)),
          ...inventory,
          drawAt: draft.drawAt,
          featured: draft.featured,
          status: draft.status,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          lotteries: draft.featured
            ? [
                lottery,
                ...state.lotteries.map((item) => ({ ...item, featured: false })),
              ]
            : [lottery, ...state.lotteries],
        }));
        return lottery;
      },
      updateLottery: (id, patch) => {
        set((state) => ({
          lotteries: state.lotteries.map((lottery) => {
            if (lottery.id !== id) {
              if (patch.featured === true) return { ...lottery, featured: false };
              return lottery;
            }
            const next = { ...lottery, ...patch };
            if (patch.name !== undefined) next.name = patch.name.trim() || lottery.name;
            if (patch.description !== undefined) next.description = patch.description.trim();
            if (patch.ticketPrice !== undefined) {
              next.ticketPrice = Math.max(1, Math.floor(patch.ticketPrice));
            }
            if (patch.prize !== undefined) {
              next.prize = Math.max(1, Math.floor(patch.prize));
            }
            const inventory = clampInventory(
              patch.totalTickets ?? next.totalTickets,
              patch.remainingTickets ?? next.remainingTickets,
            );
            next.totalTickets = inventory.totalTickets;
            next.remainingTickets = inventory.remainingTickets;
            return next;
          }),
        }));
      },
      deleteLottery: (id) => {
        const sold = get().tickets.some((ticket) => ticket.lotteryId === id);
        if (sold) {
          return {
            ok: false,
            error: "This draw has sold tickets. Close or draw it instead of deleting.",
          };
        }
        set((state) => ({
          lotteries: state.lotteries.filter((lottery) => lottery.id !== id),
        }));
        return { ok: true };
      },
      buyTickets: (lotteryId, quantity) => {
        const lottery = get().lotteries.find((item) => item.id === lotteryId);
        if (!lottery) return { ok: false, error: "Lottery not found." };
        if (lottery.status !== "open") {
          return { ok: false, error: "Sales are closed for this draw." };
        }
        const count = Math.max(1, Math.min(10, Math.floor(quantity)));
        if (count > lottery.remainingTickets) {
          return { ok: false, error: "Not enough tickets remaining." };
        }
        const purchased: Ticket[] = Array.from({ length: count }, () => ({
          id: newId(),
          lotteryId: lottery.id,
          lotteryName: lottery.name,
          number: generateTicketNumber(),
          price: lottery.ticketPrice,
          purchasedAt: new Date().toISOString(),
          status: "upcoming" as const,
        }));
        set((state) => ({
          tickets: [...state.tickets, ...purchased],
          lotteries: state.lotteries.map((item) =>
            item.id === lotteryId
              ? { ...item, remainingTickets: item.remainingTickets - count }
              : item,
          ),
        }));
        return { ok: true, tickets: purchased };
      },
      declareWinner: (lotteryId, ticketId) => {
        const lottery = get().lotteries.find((item) => item.id === lotteryId);
        if (!lottery) return { ok: false, error: "Lottery not found." };
        if (lottery.status === "drawn") {
          return { ok: false, error: "A winner is already declared for this draw." };
        }
        const pool = get().tickets.filter((ticket) => ticket.lotteryId === lotteryId);
        let winner: Ticket | undefined;
        if (ticketId) {
          winner = pool.find((ticket) => ticket.id === ticketId);
          if (!winner) return { ok: false, error: "That ticket is not in this draw." };
        } else if (pool.length > 0) {
          winner = pool[Math.floor(Math.random() * pool.length)];
        }
        const winningNumber = winner?.number ?? generateTicketNumber();
        const result: DrawResult = {
          id: newId(),
          lotteryId,
          lotteryName: lottery.name,
          winningNumber,
          ticketId: winner?.id ?? null,
          drawnAt: new Date().toISOString(),
          method: ticketId ? "manual" : "random",
        };
        set((state) => ({
          results: [result, ...state.results],
          lotteries: state.lotteries.map((item) =>
            item.id === lotteryId ? { ...item, status: "drawn" as const, featured: false } : item,
          ),
          tickets: state.tickets.map((ticket) => {
            if (ticket.lotteryId !== lotteryId) return ticket;
            if (winner && ticket.id === winner.id) return { ...ticket, status: "won" };
            return { ...ticket, status: "lost" };
          }),
        }));
        return { ok: true, result };
      },
      reopenLottery: (id) => {
        const lottery = get().lotteries.find((item) => item.id === id);
        if (!lottery) return { ok: false, error: "Lottery not found." };
        set((state) => ({
          lotteries: state.lotteries.map((item) =>
            item.id === id ? { ...item, status: "open" as const } : item,
          ),
          tickets: state.tickets.map((ticket) =>
            ticket.lotteryId === id ? { ...ticket, status: "upcoming" as const } : ticket,
          ),
          results: state.results.filter((result) => result.lotteryId !== id),
        }));
        return { ok: true };
      },
      openNextRound: (id) => {
        const lottery = get().lotteries.find((item) => item.id === id);
        if (!lottery) return { ok: false, error: "Lottery not found." };
        if (lottery.status !== "drawn") {
          return { ok: false, error: "Declare a winner before opening the next round." };
        }
        const nextDraw = new Date(lottery.drawAt);
        if (Number.isNaN(nextDraw.getTime()) || nextDraw.getTime() < Date.now()) {
          nextDraw.setTime(Date.now());
        }
        nextDraw.setDate(nextDraw.getDate() + 7);
        set((state) => ({
          lotteries: state.lotteries.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: "open" as const,
                  remainingTickets: item.totalTickets,
                  drawAt: nextDraw.toISOString(),
                }
              : item,
          ),
        }));
        return { ok: true };
      },
      resetDemo: () =>
        set({
          lotteries: SEED_LOTTERIES,
          tickets: [],
          results: SEED_RESULTS,
          adminPin: DEFAULT_PIN,
          adminUnlocked: true,
        }),
    }),
    {
      name: "luckora-store",
      partialize: (state) => ({
        lotteries: state.lotteries,
        tickets: state.tickets,
        results: state.results,
        adminPin: state.adminPin,
        adminUnlocked: state.adminUnlocked,
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

export function getFeaturedLottery(lotteries: Lottery[]) {
  return (
    lotteries.find((lottery) => lottery.featured && lottery.status === "open") ??
    lotteries.find((lottery) => lottery.status === "open") ??
    lotteries[0] ??
    null
  );
}

export function lotterySoldCount(lottery: Lottery) {
  return Math.max(0, lottery.totalTickets - lottery.remainingTickets);
}
