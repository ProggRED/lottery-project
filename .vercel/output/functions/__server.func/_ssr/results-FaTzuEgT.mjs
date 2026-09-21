import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as formatDate, n as SiteShell, s as useLuckora } from "./router-Corp9YwV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/results-FaTzuEgT.js
var import_jsx_runtime = require_jsx_runtime();
function ResultsPage() {
	const results = useLuckora((s) => s.results);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "py-12 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-bold tracking-[0.2em] text-primary uppercase",
				children: "Previous draws"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-4xl font-semibold tracking-tight",
				children: "Results"
			}),
			results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 text-center text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl text-foreground",
					children: "No results yet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm",
					children: "Winners declared in admin appear here."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-2.5",
				children: results.map((result) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex items-center justify-between rounded-2xl bg-card px-5 py-4 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: result.lotteryName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: formatDate(result.drawnAt)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-base font-semibold text-primary sm:text-lg",
						children: result.winningNumber
					})]
				}, result.id))
			})
		]
	}) });
}
//#endregion
export { ResultsPage as component };
