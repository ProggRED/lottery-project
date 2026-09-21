import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Shield, d as Moon, h as House, i as TriangleAlert, o as Ticket, r as Trophy, s as Sun } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Corp9YwV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			outline: "bg-transparent text-foreground shadow-[var(--shadow-border)] hover:bg-secondary",
			ghost: "text-foreground hover:bg-secondary",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-md px-3 text-xs",
			lg: "h-12 rounded-xl px-6",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function formatRs(value) {
	return `Rs. ${value.toLocaleString("en-US")}`;
}
function formatDate(iso) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return "—";
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function formatDateTime(iso) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return "—";
	return date.toLocaleString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function toDatetimeLocal(iso) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return "";
	const pad = (n) => String(n).padStart(2, "0");
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
function fromDatetimeLocal(value) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return (/* @__PURE__ */ new Date()).toISOString();
	return date.toISOString();
}
function generateTicketNumber() {
	return `LK-${String(Math.floor(1e5 + Math.random() * 9e5))}`;
}
function newId() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
var BADGES = [
	"FEATURED",
	"POPULAR",
	"QUICK DRAW",
	"NEW",
	"LIMITED"
];
var SEED_LOTTERIES = [
	{
		id: "mega",
		name: "Mega Weekly",
		description: "Flagship weekly simulated draw with the largest prize pool.",
		badge: "FEATURED",
		ticketPrice: 100,
		prize: 5e5,
		totalTickets: 1e4,
		remainingTickets: 7842,
		drawAt: "2026-10-02T20:00:00.000Z",
		featured: true,
		status: "open",
		createdAt: "2026-09-01T10:00:00.000Z"
	},
	{
		id: "gold",
		name: "Gold Rush",
		description: "A fast-moving mid-week simulated lottery.",
		badge: "POPULAR",
		ticketPrice: 50,
		prize: 1e5,
		totalTickets: 8e3,
		remainingTickets: 4200,
		drawAt: "2026-09-28T18:00:00.000Z",
		featured: false,
		status: "open",
		createdAt: "2026-09-05T10:00:00.000Z"
	},
	{
		id: "weekend",
		name: "Weekend Pick",
		description: "A smaller simulated weekend draw with a low ticket price.",
		badge: "QUICK DRAW",
		ticketPrice: 25,
		prize: 5e4,
		totalTickets: 12e3,
		remainingTickets: 9100,
		drawAt: "2026-09-27T16:00:00.000Z",
		featured: false,
		status: "open",
		createdAt: "2026-09-08T10:00:00.000Z"
	}
];
var SEED_RESULTS = [
	{
		id: "r-mega-prev",
		lotteryId: "mega-week-38",
		lotteryName: "Mega Weekly",
		winningNumber: "LK-482913",
		ticketId: null,
		drawnAt: "2026-09-19T20:00:00.000Z",
		method: "random"
	},
	{
		id: "r-gold-prev",
		lotteryId: "gold-week-37",
		lotteryName: "Gold Rush",
		winningNumber: "LK-731204",
		ticketId: null,
		drawnAt: "2026-09-15T18:00:00.000Z",
		method: "random"
	},
	{
		id: "r-weekend-prev",
		lotteryId: "weekend-week-37",
		lotteryName: "Weekend Pick",
		winningNumber: "LK-194582",
		ticketId: null,
		drawnAt: "2026-09-12T16:00:00.000Z",
		method: "random"
	}
];
var DEFAULT_PIN = "2026";
function clampInventory(total, remaining) {
	const safeTotal = Math.max(1, Math.floor(total));
	return {
		totalTickets: safeTotal,
		remainingTickets: Math.max(0, Math.min(safeTotal, Math.floor(remaining)))
	};
}
var useLuckora = create()(persist((set, get) => ({
	lotteries: SEED_LOTTERIES,
	tickets: [],
	results: SEED_RESULTS,
	adminPin: DEFAULT_PIN,
	adminUnlocked: false,
	theme: "dark",
	hasHydrated: false,
	setHydrated: () => set({ hasHydrated: true }),
	setTheme: (theme) => set({ theme }),
	toggleTheme: () => set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
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
		const lottery = {
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
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		set((state) => ({ lotteries: draft.featured ? [lottery, ...state.lotteries.map((item) => ({
			...item,
			featured: false
		}))] : [lottery, ...state.lotteries] }));
		return lottery;
	},
	updateLottery: (id, patch) => {
		set((state) => ({ lotteries: state.lotteries.map((lottery) => {
			if (lottery.id !== id) {
				if (patch.featured === true) return {
					...lottery,
					featured: false
				};
				return lottery;
			}
			const next = {
				...lottery,
				...patch
			};
			if (patch.name !== void 0) next.name = patch.name.trim() || lottery.name;
			if (patch.description !== void 0) next.description = patch.description.trim();
			if (patch.ticketPrice !== void 0) next.ticketPrice = Math.max(1, Math.floor(patch.ticketPrice));
			if (patch.prize !== void 0) next.prize = Math.max(1, Math.floor(patch.prize));
			const inventory = clampInventory(patch.totalTickets ?? next.totalTickets, patch.remainingTickets ?? next.remainingTickets);
			next.totalTickets = inventory.totalTickets;
			next.remainingTickets = inventory.remainingTickets;
			return next;
		}) }));
	},
	deleteLottery: (id) => {
		if (get().tickets.some((ticket) => ticket.lotteryId === id)) return {
			ok: false,
			error: "This draw has sold tickets. Close or draw it instead of deleting."
		};
		set((state) => ({ lotteries: state.lotteries.filter((lottery) => lottery.id !== id) }));
		return { ok: true };
	},
	buyTickets: (lotteryId, quantity) => {
		const lottery = get().lotteries.find((item) => item.id === lotteryId);
		if (!lottery) return {
			ok: false,
			error: "Lottery not found."
		};
		if (lottery.status !== "open") return {
			ok: false,
			error: "Sales are closed for this draw."
		};
		const count = Math.max(1, Math.min(10, Math.floor(quantity)));
		if (count > lottery.remainingTickets) return {
			ok: false,
			error: "Not enough tickets remaining."
		};
		const purchased = Array.from({ length: count }, () => ({
			id: newId(),
			lotteryId: lottery.id,
			lotteryName: lottery.name,
			number: generateTicketNumber(),
			price: lottery.ticketPrice,
			purchasedAt: (/* @__PURE__ */ new Date()).toISOString(),
			status: "upcoming"
		}));
		set((state) => ({
			tickets: [...state.tickets, ...purchased],
			lotteries: state.lotteries.map((item) => item.id === lotteryId ? {
				...item,
				remainingTickets: item.remainingTickets - count
			} : item)
		}));
		return {
			ok: true,
			tickets: purchased
		};
	},
	declareWinner: (lotteryId, ticketId) => {
		const lottery = get().lotteries.find((item) => item.id === lotteryId);
		if (!lottery) return {
			ok: false,
			error: "Lottery not found."
		};
		if (lottery.status === "drawn") return {
			ok: false,
			error: "A winner is already declared for this draw."
		};
		const pool = get().tickets.filter((ticket) => ticket.lotteryId === lotteryId);
		let winner;
		if (ticketId) {
			winner = pool.find((ticket) => ticket.id === ticketId);
			if (!winner) return {
				ok: false,
				error: "That ticket is not in this draw."
			};
		} else if (pool.length > 0) winner = pool[Math.floor(Math.random() * pool.length)];
		const winningNumber = winner?.number ?? generateTicketNumber();
		const result = {
			id: newId(),
			lotteryId,
			lotteryName: lottery.name,
			winningNumber,
			ticketId: winner?.id ?? null,
			drawnAt: (/* @__PURE__ */ new Date()).toISOString(),
			method: ticketId ? "manual" : "random"
		};
		set((state) => ({
			results: [result, ...state.results],
			lotteries: state.lotteries.map((item) => item.id === lotteryId ? {
				...item,
				status: "drawn",
				featured: false
			} : item),
			tickets: state.tickets.map((ticket) => {
				if (ticket.lotteryId !== lotteryId) return ticket;
				if (winner && ticket.id === winner.id) return {
					...ticket,
					status: "won"
				};
				return {
					...ticket,
					status: "lost"
				};
			})
		}));
		return {
			ok: true,
			result
		};
	},
	reopenLottery: (id) => {
		if (!get().lotteries.find((item) => item.id === id)) return {
			ok: false,
			error: "Lottery not found."
		};
		set((state) => ({
			lotteries: state.lotteries.map((item) => item.id === id ? {
				...item,
				status: "open"
			} : item),
			tickets: state.tickets.map((ticket) => ticket.lotteryId === id ? {
				...ticket,
				status: "upcoming"
			} : ticket),
			results: state.results.filter((result) => result.lotteryId !== id)
		}));
		return { ok: true };
	},
	openNextRound: (id) => {
		const lottery = get().lotteries.find((item) => item.id === id);
		if (!lottery) return {
			ok: false,
			error: "Lottery not found."
		};
		if (lottery.status !== "drawn") return {
			ok: false,
			error: "Declare a winner before opening the next round."
		};
		const nextDraw = new Date(lottery.drawAt);
		if (Number.isNaN(nextDraw.getTime()) || nextDraw.getTime() < Date.now()) nextDraw.setTime(Date.now());
		nextDraw.setDate(nextDraw.getDate() + 7);
		set((state) => ({ lotteries: state.lotteries.map((item) => item.id === id ? {
			...item,
			status: "open",
			remainingTickets: item.totalTickets,
			drawAt: nextDraw.toISOString()
		} : item) }));
		return { ok: true };
	},
	resetDemo: () => set({
		lotteries: SEED_LOTTERIES,
		tickets: [],
		results: SEED_RESULTS,
		adminPin: DEFAULT_PIN,
		adminUnlocked: true
	})
}), {
	name: "luckora-store",
	partialize: (state) => ({
		lotteries: state.lotteries,
		tickets: state.tickets,
		results: state.results,
		adminPin: state.adminPin,
		adminUnlocked: state.adminUnlocked,
		theme: state.theme
	}),
	onRehydrateStorage: () => (state) => {
		state?.setHydrated();
	}
}));
function getFeaturedLottery(lotteries) {
	return lotteries.find((lottery) => lottery.featured && lottery.status === "open") ?? lotteries.find((lottery) => lottery.status === "open") ?? lotteries[0] ?? null;
}
function lotterySoldCount(lottery) {
	return Math.max(0, lottery.totalTickets - lottery.remainingTickets);
}
var NAV = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/lotteries",
		label: "Lotteries"
	},
	{
		to: "/results",
		label: "Results"
	},
	{
		to: "/tickets",
		label: "My tickets"
	}
];
function ThemeSync() {
	const theme = useLuckora((s) => s.theme);
	const setHydrated = useLuckora((s) => s.setHydrated);
	const hasHydrated = useLuckora((s) => s.hasHydrated);
	(0, import_react.useEffect)(() => {
		const persist = useLuckora.persist;
		if (persist.hasHydrated()) setHydrated();
		return persist.onFinishHydration(() => setHydrated());
	}, [setHydrated]);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("light", theme === "light");
		document.documentElement.classList.toggle("dark", theme !== "light");
	}, [theme, hasHydrated]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		theme: theme === "light" ? "light" : "dark",
		position: "top-center",
		richColors: false
	});
}
function SiteShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const theme = useLuckora((s) => s.theme);
	const toggleTheme = useLuckora((s) => s.toggleTheme);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-[72px] w-[min(1150px,92%)] items-center justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "font-display text-[21px] font-extrabold tracking-[0.18em]",
							children: ["LUCK", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "ORA"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-7 md:flex",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: cn("text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground", isActive(pathname, item.to) && "text-foreground"),
								children: item.label
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								size: "icon",
								asChild: true,
								"aria-label": "Admin",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								size: "icon",
								onClick: toggleTheme,
								"aria-label": "Toggle theme",
								children: theme === "light" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" })
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-[min(1150px,92%)] flex-1 pb-24 md:pb-0",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "hidden border-t border-border md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-[min(1150px,92%)] items-center justify-between py-7 text-[11px] tracking-wide text-muted-foreground uppercase",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Luckora" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "College project · simulation only" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin",
							className: "hover:text-foreground",
							children: "Admin"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-2 py-2 backdrop-blur-xl md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-4",
					children: NAV.map((item) => {
						const Icon = iconFor(item.to);
						const active = isActive(pathname, item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-11 flex-col items-center justify-center gap-1 text-[10px] font-medium text-muted-foreground", active && "text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
						}, item.to);
					})
				})
			})
		]
	});
}
function isActive(pathname, to) {
	if (to === "/") return pathname === "/";
	return pathname === to || pathname.startsWith(`${to}/`);
}
function iconFor(to) {
	if (to === "/lotteries") return Ticket;
	if (to === "/results") return Trophy;
	if (to === "/tickets") return Ticket;
	return House;
}
var styles_default = "/assets/styles-HGsAKSAF.css";
var APP_NAME = "LUCKORA";
var Route$5 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "LUCKORA — simulated lottery draws for a college project. No real money."
			},
			{
				name: "theme-color",
				content: "#080b0f"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&family=Manrope:wght@400;500;600;700;800&family=Syne:wght@600;700;800&display=swap"
			}
		]
	}),
	component: RootComponent,
	notFoundComponent: NotFound
});
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSync, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-3 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-bold tracking-[0.2em] text-primary uppercase",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: "Page not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-sm text-muted-foreground",
				children: "That route does not exist in LUCKORA."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				className: "text-sm font-semibold text-primary",
				children: "Back home"
			})
		]
	});
}
var $$splitComponentImporter$4 = () => import("./routes-__DKa5SQ.mjs");
var Route$4 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin-CfTHWzNw.mjs");
var Route$3 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./lotteries-CD5D4l3K.mjs");
var Route$2 = createFileRoute("/lotteries")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./results-FaTzuEgT.mjs");
var Route$1 = createFileRoute("/results")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./tickets-DLVxQcH7.mjs");
var Route = createFileRoute("/tickets")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$4.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$5
	}),
	AdminRoute: Route$3.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$5
	}),
	LotteriesRoute: Route$2.update({
		id: "/lotteries",
		path: "/lotteries",
		getParentRoute: () => Route$5
	}),
	ResultsRoute: Route$1.update({
		id: "/results",
		path: "/results",
		getParentRoute: () => Route$5
	}),
	TicketsRoute: Route.update({
		id: "/tickets",
		path: "/tickets",
		getParentRoute: () => Route$5
	})
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { getFeaturedLottery as a, formatDate as c, fromDatetimeLocal as d, toDatetimeLocal as f, DEFAULT_PIN as i, formatDateTime as l, cn as m, SiteShell as n, lotterySoldCount as o, Button as p, BADGES as r, useLuckora as s, router_exports as t, formatRs as u };
