import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { f as Minus, l as Plus, n as Wallet, o as Ticket } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { p as Button, s as useLuckora, u as formatRs } from "./router-Corp9YwV.mjs";
import { t as Badge } from "./badge-B-6CobiX.mjs";
import { i as DialogDescription, n as Dialog, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Card } from "./dialog-DVhP2G-l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lottery-card-jZO6S9UN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BuyDialog({ lottery, open, onOpenChange }) {
	const buyTickets = useLuckora((s) => s.buyTickets);
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const max = lottery ? Math.min(10, lottery.remainingTickets) : 1;
	const price = lottery?.ticketPrice ?? 0;
	const total = price * quantity;
	function reset() {
		setQuantity(1);
		setBusy(false);
	}
	function changeQty(delta) {
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
		toast.success(`${result.tickets?.length ?? quantity} ticket${quantity === 1 ? "" : "s"} issued`);
		onOpenChange(false);
		reset();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => {
			if (!next) reset();
			onOpenChange(next);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-bold tracking-[0.18em] text-primary uppercase",
				children: "Simulated payment"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Buy your ticket" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Demo checkout for this college project. No real payment is processed." })
		] }), lottery ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-muted p-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Lottery",
						value: lottery.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Price",
						value: formatRs(price)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Quantity",
						value: String(quantity)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Total",
						value: formatRs(total),
						emphasize: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 mb-2 text-xs font-medium tracking-wide text-muted-foreground",
				children: "Number of tickets"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex overflow-hidden rounded-lg shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-12 items-center justify-center bg-muted text-foreground",
						onClick: () => changeQty(-1),
						"aria-label": "Decrease quantity",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "h-12 min-w-0 flex-1 border-x border-border bg-muted text-center text-sm tabular-nums outline-none",
						type: "number",
						min: 1,
						max,
						value: quantity,
						onChange: (event) => {
							const next = Number(event.target.value);
							if (Number.isNaN(next)) return;
							setQuantity(Math.max(1, Math.min(max, next)));
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex size-12 items-center justify-center bg-muted text-foreground",
						onClick: () => changeQty(1),
						"aria-label": "Increase quantity",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-5 w-full",
				size: "lg",
				disabled: busy || max < 1,
				onClick: () => void pay(),
				children: busy ? "Processing…" : `Simulate payment · ${formatRs(total)}`
			})
		] }) : null] })
	});
}
function Row({ label, value, emphasize }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between py-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
			className: emphasize ? "text-primary" : "",
			children: value
		})]
	});
}
function LotteryCard({ lottery, onBuy }) {
	const canBuy = lottery.status === "open" && lottery.remainingTickets > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "flex flex-col p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-border-hover)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: lottery.badge }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-4 text-muted-foreground" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display mt-5 text-2xl font-semibold tracking-tight",
				children: lottery.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 min-h-10 text-sm leading-relaxed text-muted-foreground",
				children: lottery.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-[10px] font-medium tracking-widest text-muted-foreground uppercase",
					children: "Prize"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-[1.7rem] font-semibold tracking-tight",
					children: formatRs(lottery.prize)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [lottery.remainingTickets.toLocaleString(), " left"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatRs(lottery.ticketPrice) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4 w-full",
				disabled: !canBuy,
				onClick: () => onBuy(lottery),
				children: canBuy ? "Buy ticket" : statusLabel(lottery)
			})
		]
	});
}
function statusLabel(lottery) {
	if (lottery.remainingTickets <= 0) return "Sold out";
	if (lottery.status === "drawn") return "Drawn";
	if (lottery.status === "paused") return "Paused";
	return "Closed";
}
//#endregion
export { LotteryCard as n, BuyDialog as t };
