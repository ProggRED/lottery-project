import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { m as cn, n as SiteShell, p as Button, s as useLuckora } from "./router-Corp9YwV.mjs";
import { n as LotteryCard, t as BuyDialog } from "./lottery-card-jZO6S9UN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lotteries-CD5D4l3K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "open",
		label: "Open"
	},
	{
		id: "paused",
		label: "Paused"
	},
	{
		id: "closed",
		label: "Closed"
	},
	{
		id: "drawn",
		label: "Drawn"
	}
];
function LotteriesPage() {
	const lotteries = useLuckora((s) => s.lotteries);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [buying, setBuying] = (0, import_react.useState)(null);
	const visible = (0, import_react.useMemo)(() => {
		if (filter === "all") return lotteries;
		return lotteries.filter((lottery) => lottery.status === filter);
	}, [filter, lotteries]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "py-12 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-bold tracking-[0.2em] text-primary uppercase",
				children: "All draws"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-semibold tracking-tight",
					children: "Available lotteries"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: FILTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: filter === item.id ? "default" : "secondary",
						onClick: () => setFilter(item.id),
						children: item.label
					}, item.id))
				})]
			}),
			visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 text-center text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl text-foreground",
					children: "No draws in this view"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm",
					children: "Create one from the admin panel."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("mt-8 grid gap-4 md:grid-cols-3"),
				children: visible.map((lottery) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotteryCard, {
					lottery,
					onBuy: setBuying
				}, lottery.id))
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyDialog, {
		lottery: buying,
		open: Boolean(buying),
		onOpenChange: (open) => {
			if (!open) setBuying(null);
		}
	})] });
}
//#endregion
export { LotteriesPage as component };
