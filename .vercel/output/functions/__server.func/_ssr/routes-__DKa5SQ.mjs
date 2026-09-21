import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as getFeaturedLottery, m as cn, n as SiteShell, p as Button, s as useLuckora, u as formatRs } from "./router-Corp9YwV.mjs";
import { n as LotteryCard, t as BuyDialog } from "./lottery-card-jZO6S9UN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-__DKa5SQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function split(ms) {
	const total = Math.max(0, ms);
	return {
		days: Math.floor(total / 864e5),
		hours: Math.floor(total % 864e5 / 36e5),
		minutes: Math.floor(total % 36e5 / 6e4),
		seconds: Math.floor(total % 6e4 / 1e3)
	};
}
function Countdown({ iso, compact = false }) {
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const tick = () => setNow(Date.now());
		tick();
		const id = window.setInterval(tick, 1e3);
		return () => window.clearInterval(id);
	}, []);
	const target = new Date(iso).getTime();
	const parts = split(now === null || Number.isNaN(target) ? 0 : target - now);
	const ready = now !== null;
	const cells = [
		{
			label: "Days",
			value: parts.days
		},
		{
			label: "Hours",
			value: parts.hours
		},
		{
			label: "Min",
			value: parts.minutes
		},
		{
			label: "Sec",
			value: parts.seconds
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid grid-cols-4 gap-1.5", compact ? "max-w-xs" : ""),
		children: cells.map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg bg-muted px-1 py-2.5 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				className: "block font-display text-lg font-semibold tabular-nums sm:text-xl",
				children: ready ? String(cell.value).padStart(2, "0") : "––"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[9px] font-medium tracking-widest text-muted-foreground uppercase",
				children: cell.label
			})]
		}, cell.label))
	});
}
function Home() {
	const lotteries = useLuckora((s) => s.lotteries);
	const featured = getFeaturedLottery(lotteries);
	const preview = lotteries.filter((item) => item.status !== "drawn").slice(0, 3);
	const [buying, setBuying] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid items-center gap-9 py-12 md:grid-cols-[1.25fr_0.75fr] md:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-bold tracking-[0.2em] text-primary uppercase",
					children: "College project · demo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display mt-5 text-5xl leading-[0.92] font-extrabold tracking-tight md:text-7xl",
					children: [
						"Your luck.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "Your moment."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-lg text-base leading-relaxed text-muted-foreground",
					children: "Explore simulated lottery draws, buy tickets, and run the full purchase flow. An admin panel controls prices, inventory, and winners. No real money is involved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/lotteries",
							children: "Explore lotteries"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/tickets",
							children: "My tickets"
						})
					})]
				})
			] }), featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "featured-wash rounded-3xl p-7 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-bold tracking-[0.2em] text-primary uppercase",
						children: "Featured draw"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-3 text-3xl font-semibold tracking-tight",
						children: featured.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: featured.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[10px] font-medium tracking-widest text-muted-foreground uppercase",
							children: "Grand prize"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-4xl font-extrabold tracking-tight",
							children: formatRs(featured.prize)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Countdown, { iso: featured.drawAt })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-6 w-full",
						size: "lg",
						disabled: featured.status !== "open" || featured.remainingTickets <= 0,
						onClick: () => setBuying(featured),
						children: ["Buy ticket · ", formatRs(featured.ticketPrice)]
					})
				]
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "pb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-bold tracking-[0.2em] text-primary uppercase",
					children: "Available now"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-2 text-3xl font-semibold tracking-tight md:text-4xl",
					children: "Pick your draw"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/lotteries",
					className: "inline-flex items-center gap-1 text-sm font-semibold text-primary",
					children: ["View all", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-3",
				children: preview.map((lottery) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotteryCard, {
					lottery,
					onBuy: setBuying
				}, lottery.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyDialog, {
			lottery: buying,
			open: Boolean(buying),
			onOpenChange: (open) => {
				if (!open) setBuying(null);
			}
		})
	] });
}
//#endregion
export { Home as component };
