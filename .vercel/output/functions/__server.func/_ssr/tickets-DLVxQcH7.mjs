import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Ticket } from "../_libs/lucide-react.mjs";
import { c as formatDate, n as SiteShell, p as Button, s as useLuckora, u as formatRs } from "./router-Corp9YwV.mjs";
import { t as Badge } from "./badge-B-6CobiX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tickets-DLVxQcH7.js
var import_jsx_runtime = require_jsx_runtime();
function TicketsPage() {
	const ordered = [...useLuckora((s) => s.tickets)].reverse();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "py-12 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-bold tracking-[0.2em] text-primary uppercase",
				children: "Your account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-4xl font-semibold tracking-tight",
				children: "My tickets"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 rounded-2xl bg-card p-6 shadow-[var(--shadow-border)]",
				children: ordered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-12 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "mx-auto size-10 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-4 text-xl font-semibold",
							children: "No tickets yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Buy a ticket and it will appear here."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/lotteries",
								children: "Browse lotteries"
							})
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: ordered.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "flex flex-col gap-3 rounded-xl bg-muted p-5 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: ticket.lotteryName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono mt-1 text-2xl font-semibold text-primary",
								children: ticket.number
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [
									formatDate(ticket.purchasedAt),
									" · ",
									formatRs(ticket.price)
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: statusVariant(ticket.status),
							children: ticket.status
						})]
					}, ticket.id))
				})
			})
		]
	}) });
}
function statusVariant(status) {
	if (status === "won") return "success";
	if (status === "lost") return "danger";
	return "default";
}
//#endregion
export { TicketsPage as component };
