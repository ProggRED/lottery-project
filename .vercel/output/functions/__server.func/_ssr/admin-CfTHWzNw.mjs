import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Coins, a as Trash2, g as Dices, l as Plus, m as LayoutDashboard, o as Ticket, p as Lock, r as Trophy, u as Pencil } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as formatDate, d as fromDatetimeLocal, f as toDatetimeLocal, i as DEFAULT_PIN, l as formatDateTime, m as cn, n as SiteShell, o as lotterySoldCount, p as Button, r as BADGES, s as useLuckora, u as formatRs } from "./router-Corp9YwV.mjs";
import { t as Badge } from "./badge-B-6CobiX.mjs";
import { a as DialogFooter, i as DialogDescription, n as Dialog, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Card } from "./dialog-DVhP2G-l.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CfTHWzNw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		"data-slot": "input",
		className: cn("flex h-11 w-full rounded-lg border border-border bg-muted px-3 text-sm text-foreground shadow-none outline-none transition-[box-shadow,border-color] duration-150 placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		"data-slot": "label",
		className: cn("text-xs font-medium tracking-wide text-muted-foreground", className),
		...props
	});
}
function NativeSelect({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn("flex h-11 w-full rounded-lg border border-border bg-muted px-3 text-sm text-foreground outline-none transition-[box-shadow,border-color] duration-150 focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block size-5 rounded-full bg-foreground shadow-sm transition-transform duration-150 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 data-[state=checked]:bg-primary-foreground") })
	});
}
var Tabs = Root2;
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("inline-flex h-11 w-full items-center gap-1 overflow-x-auto rounded-xl bg-muted p-1 text-muted-foreground", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		className: cn("inline-flex h-9 shrink-0 items-center justify-center rounded-lg px-3 text-sm font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-[var(--shadow-border)]", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		className: cn("mt-6 focus-visible:outline-none", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"data-slot": "textarea",
		className: cn("flex min-h-24 w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground outline-none transition-[box-shadow,border-color] duration-150 placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
function AdminPage() {
	const unlocked = useLuckora((s) => s.adminUnlocked);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "py-10 md:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-bold tracking-[0.2em] text-primary uppercase",
				children: "Control room"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-4xl font-semibold tracking-tight",
				children: "Admin"
			}),
			unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDesk, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminGate, {})
		]
	}) });
}
function AdminGate() {
	const unlockAdmin = useLuckora((s) => s.unlockAdmin);
	const [pin, setPin] = (0, import_react.useState)("");
	function submit(event) {
		event.preventDefault();
		if (unlockAdmin(pin)) {
			toast.success("Admin unlocked");
			return;
		}
		toast.error("Wrong PIN");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "mx-auto mt-10 max-w-md p-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex size-12 items-center justify-center rounded-2xl bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-semibold",
				children: "Enter admin PIN"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted-foreground",
				children: [
					"Demo access for this college project. Default PIN is",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-foreground",
						children: DEFAULT_PIN
					}),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 grid gap-3",
				onSubmit: submit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "pin",
						children: "PIN"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "pin",
						type: "password",
						inputMode: "numeric",
						autoComplete: "off",
						value: pin,
						onChange: (event) => setPin(event.target.value),
						placeholder: "Enter PIN"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "mt-2",
						children: "Unlock"
					})
				]
			})
		]
	});
}
function AdminDesk() {
	const lotteries = useLuckora((s) => s.lotteries);
	const tickets = useLuckora((s) => s.tickets);
	const results = useLuckora((s) => s.results);
	const lockAdmin = useLuckora((s) => s.lockAdmin);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [drawId, setDrawId] = (0, import_react.useState)(lotteries.find((item) => item.status !== "drawn")?.id ?? lotteries[0]?.id ?? null);
	const revenue = tickets.reduce((sum, ticket) => sum + ticket.price, 0);
	const winners = tickets.filter((ticket) => ticket.status === "won").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Manage draws, listing prices, tickets, and winners."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				size: "sm",
				onClick: lockAdmin,
				children: "Lock admin"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "overview",
			className: "mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "overview",
						children: "Overview"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "lotteries",
						children: "Lotteries"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "tickets",
						children: "Tickets"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "draws",
						children: "Draws"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "settings",
						children: "Settings"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "overview",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								icon: LayoutDashboard,
								label: "Active draws",
								value: String(lotteries.filter((l) => l.status === "open").length)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								icon: Ticket,
								label: "Tickets sold",
								value: String(tickets.length)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								icon: Coins,
								label: "Simulated revenue",
								value: formatRs(revenue)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								icon: Trophy,
								label: "Winners declared",
								value: String(winners)
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-4 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-semibold",
								children: "Lotteries"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 grid gap-3",
								children: lotteries.slice(0, 5).map((lottery) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: lottery.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											formatRs(lottery.ticketPrice),
											" · ",
											lottery.remainingTickets.toLocaleString(),
											" left"
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: lottery.status })]
								}, lottery.id))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-semibold",
								children: "Latest results"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 grid gap-3",
								children: results.slice(0, 5).map((result) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: result.lotteryName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: formatDate(result.drawnAt)
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-sm text-primary",
										children: result.winningNumber
									})]
								}, result.id))
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "lotteries",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setEditing("new"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Create lottery"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4",
						children: lotteries.map((lottery) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotteryAdminCard, {
							lottery,
							onEdit: () => setEditing(lottery),
							onDraw: () => setDrawId(lottery.id)
						}, lottery.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "tickets",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketsTable, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "draws",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawsPanel, {
						drawId,
						setDrawId
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "settings",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPanel, {})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotteryEditor, {
			lottery: editing === "new" ? null : editing,
			open: editing !== null,
			onOpenChange: (open) => {
				if (!open) setEditing(null);
			}
		})
	] });
}
function Stat({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium tracking-wide uppercase",
				children: label
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display mt-3 text-2xl font-semibold tabular-nums",
			children: value
		})]
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: status === "open" ? "success" : status === "drawn" ? "muted" : status === "paused" ? "outline" : "danger",
		children: status
	});
}
function LotteryAdminCard({ lottery, onEdit, onDraw }) {
	const updateLottery = useLuckora((s) => s.updateLottery);
	const deleteLottery = useLuckora((s) => s.deleteLottery);
	const sold = lotterySoldCount(lottery);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-semibold",
								children: lottery.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: lottery.status }),
							lottery.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Featured" }) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: lottery.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: [
							"Draw ",
							formatDateTime(lottery.drawAt),
							" · ",
							sold.toLocaleString(),
							" sold / ",
							lottery.totalTickets.toLocaleString()
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: onEdit,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), "Edit"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "secondary",
						disabled: lottery.status === "drawn",
						onClick: onDraw,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, { className: "size-3.5" }), "Draw"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => {
							const result = deleteLottery(lottery.id);
							if (!result.ok) toast.error(result.error);
							else toast.success("Lottery removed");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Delete"]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceField, {
					label: "Listing price",
					value: lottery.ticketPrice,
					onCommit: (value) => {
						updateLottery(lottery.id, { ticketPrice: value });
						toast.success("Listing price updated");
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceField, {
					label: "Prize",
					value: lottery.prize,
					onCommit: (value) => {
						updateLottery(lottery.id, { prize: value });
						toast.success("Prize updated");
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceField, {
					label: "Tickets left",
					value: lottery.remainingTickets,
					onCommit: (value) => {
						updateLottery(lottery.id, { remainingTickets: value });
						toast.success("Inventory updated");
					}
				})
			]
		})]
	});
}
function PriceField({ label, value, onCommit }) {
	const [draft, setDraft] = (0, import_react.useState)(String(value));
	(0, import_react.useEffect)(() => {
		setDraft(String(value));
	}, [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-medium tracking-wide text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "number",
				min: 0,
				className: "tabular-nums",
				value: draft,
				onChange: (event) => setDraft(event.target.value),
				"aria-label": label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "secondary",
				onClick: () => {
					const next = Number(draft);
					if (!Number.isFinite(next) || next < 0) {
						toast.error("Enter a valid number");
						setDraft(String(value));
						return;
					}
					onCommit(Math.floor(next));
					setDraft(String(Math.floor(next)));
				},
				children: "Save"
			})]
		})]
	});
}
function LotteryEditor({ lottery, open, onOpenChange }) {
	const createLottery = useLuckora((s) => s.createLottery);
	const updateLottery = useLuckora((s) => s.updateLottery);
	const isNew = lottery === null;
	const [draft, setDraft] = (0, import_react.useState)(emptyDraft());
	(0, import_react.useEffect)(() => {
		if (open) setDraft(lottery ? toDraft(lottery) : emptyDraft());
	}, [open, lottery]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "w-[min(36rem,calc(100%-1.5rem))]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: isNew ? "Create lottery" : "Edit lottery" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Listing price is what buyers see on the public site." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft.name,
								onChange: (event) => setDraft({
									...draft,
									name: event.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Description",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: draft.description,
								onChange: (event) => setDraft({
									...draft,
									description: event.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Badge",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
									value: draft.badge,
									onChange: (event) => setDraft({
										...draft,
										badge: event.target.value
									}),
									children: BADGES.map((badge) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: badge,
										children: badge
									}, badge))
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Status",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
									value: draft.status,
									onChange: (event) => setDraft({
										...draft,
										status: event.target.value
									}),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "open",
											children: "Open"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "paused",
											children: "Paused"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "closed",
											children: "Closed"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "drawn",
											children: "Drawn"
										})
									]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Listing price (Rs.)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 1,
									value: draft.ticketPrice,
									onChange: (event) => setDraft({
										...draft,
										ticketPrice: Number(event.target.value)
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Prize (Rs.)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 1,
									value: draft.prize,
									onChange: (event) => setDraft({
										...draft,
										prize: Number(event.target.value)
									})
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Total tickets",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 1,
									value: draft.totalTickets,
									onChange: (event) => setDraft({
										...draft,
										totalTickets: Number(event.target.value)
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Remaining tickets",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 0,
									value: draft.remainingTickets,
									onChange: (event) => setDraft({
										...draft,
										remainingTickets: Number(event.target.value)
									})
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Draw date",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "datetime-local",
								value: toDatetimeLocal(draft.drawAt),
								onChange: (event) => setDraft({
									...draft,
									drawAt: fromDatetimeLocal(event.target.value)
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between rounded-xl bg-muted px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "Feature on home"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: draft.featured,
								onCheckedChange: (featured) => setDraft({
									...draft,
									featured
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => onOpenChange(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
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
					},
					children: isNew ? "Create" : "Save changes"
				})] })
			]
		})
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-medium tracking-wide text-muted-foreground",
			children: label
		}), children]
	});
}
function emptyDraft() {
	const draw = /* @__PURE__ */ new Date();
	draw.setDate(draw.getDate() + 7);
	return {
		name: "",
		description: "",
		badge: "NEW",
		ticketPrice: 50,
		prize: 25e3,
		totalTickets: 5e3,
		remainingTickets: 5e3,
		drawAt: draw.toISOString(),
		featured: false,
		status: "open"
	};
}
function toDraft(lottery) {
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
		status: lottery.status
	};
}
function TicketsTable() {
	const tickets = useLuckora((s) => s.tickets);
	const lotteries = useLuckora((s) => s.lotteries);
	const [query, setQuery] = (0, import_react.useState)("");
	const [lotteryId, setLotteryId] = (0, import_react.useState)("all");
	const rows = (0, import_react.useMemo)(() => {
		return [...tickets].reverse().filter((ticket) => lotteryId === "all" ? true : ticket.lotteryId === lotteryId).filter((ticket) => {
			const q = query.trim().toLowerCase();
			if (!q) return true;
			return ticket.number.toLowerCase().includes(q) || ticket.lotteryName.toLowerCase().includes(q);
		});
	}, [
		tickets,
		query,
		lotteryId
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 grid gap-3 sm:grid-cols-[1fr_12rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			placeholder: "Search ticket number",
			value: query,
			onChange: (event) => setQuery(event.target.value)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
			value: lotteryId,
			onChange: (event) => setLotteryId(event.target.value),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "all",
				children: "All lotteries"
			}), lotteries.map((lottery) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: lottery.id,
				children: lottery.name
			}, lottery.id))]
		})]
	}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-12 text-center text-sm text-muted-foreground",
		children: "No tickets match."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-2",
		children: rows.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "flex flex-col gap-2 rounded-xl bg-card px-4 py-3 shadow-[var(--shadow-border)] sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-lg text-primary",
				children: ticket.number
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					ticket.lotteryName,
					" · ",
					formatDate(ticket.purchasedAt),
					" · ",
					formatRs(ticket.price)
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: ticket.status === "won" ? "success" : ticket.status === "lost" ? "danger" : "default",
				children: ticket.status
			})]
		}, ticket.id))
	})] });
}
function DrawsPanel({ drawId, setDrawId }) {
	const lotteries = useLuckora((s) => s.lotteries);
	const tickets = useLuckora((s) => s.tickets);
	const results = useLuckora((s) => s.results);
	const declareWinner = useLuckora((s) => s.declareWinner);
	const reopenLottery = useLuckora((s) => s.reopenLottery);
	const openNextRound = useLuckora((s) => s.openNextRound);
	const lottery = lotteries.find((item) => item.id === drawId) ?? null;
	const pool = tickets.filter((ticket) => ticket.lotteryId === drawId);
	const currentResult = results.find((result) => result.lotteryId === drawId);
	function draw(ticketId) {
		if (!lottery) return;
		const result = declareWinner(lottery.id, ticketId);
		if (!result.ok) {
			toast.error(result.error);
			return;
		}
		toast.success(`Winner: ${result.result?.winningNumber}`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[16rem_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-2 pt-1 text-xs font-medium tracking-wide text-muted-foreground uppercase",
				children: "Select draw"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 grid gap-1",
				children: lotteries.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setDrawId(item.id),
					className: `flex min-h-11 items-center justify-between rounded-lg px-3 text-left text-sm ${item.id === drawId ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: item.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: item.status })]
				}, item.id))
			})]
		}), lottery ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl font-semibold",
						children: lottery.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							pool.length,
							" ticket",
							pool.length === 1 ? "" : "s",
							" in this round · prize ",
							formatRs(lottery.prize)
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: lottery.status === "drawn",
							onClick: () => draw(),
							children: "Draw random winner"
						}), lottery.status === "drawn" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => {
								const result = reopenLottery(lottery.id);
								if (!result.ok) toast.error(result.error);
								else toast.success("Draw reopened");
							},
							children: "Reopen"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => {
								const result = openNextRound(lottery.id);
								if (!result.ok) toast.error(result.error);
								else toast.success("Next round opened");
							},
							children: "Next round"
						})] }) : null]
					})]
				}),
				currentResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 rounded-xl bg-muted p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-widest text-muted-foreground uppercase",
							children: "Winning number"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono mt-1 text-2xl text-primary",
							children: currentResult.winningNumber
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								currentResult.method === "manual" ? "Picked manually" : "Random draw",
								" · ",
								formatDateTime(currentResult.drawnAt)
							]
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-2",
					children: pool.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-8 text-center text-sm text-muted-foreground",
						children: "No tickets sold yet. You can still run a random draw to publish a winning number."
					}) : pool.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 rounded-xl bg-muted px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-primary",
							children: ticket.number
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: formatDate(ticket.purchasedAt)
						})] }), ticket.status === "won" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Winner" }) : ticket.status === "lost" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "danger",
							children: "Lost"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => draw(ticket.id),
							children: "Declare winner"
						})]
					}, ticket.id))
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Create a lottery first."
		})]
	});
}
function SettingsPanel() {
	const adminPin = useLuckora((s) => s.adminPin);
	const setAdminPin = useLuckora((s) => s.setAdminPin);
	const resetDemo = useLuckora((s) => s.resetDemo);
	const [pin, setPin] = (0, import_react.useState)(adminPin);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid max-w-lg gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-semibold",
					children: "Admin PIN"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Minimum 4 characters. Stored only on this device."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: pin,
						onChange: (event) => setPin(event.target.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => {
							if (pin.trim().length < 4) {
								toast.error("PIN must be at least 4 characters");
								return;
							}
							setAdminPin(pin);
							toast.success("PIN updated");
						},
						children: "Save"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-semibold",
					children: "Reset demo data"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Restores the three starter lotteries and clears purchased tickets."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					variant: "destructive",
					onClick: () => {
						resetDemo();
						toast.success("Demo data restored");
					},
					children: "Reset everything"
				})
			]
		})]
	});
}
//#endregion
export { AdminPage as component };
