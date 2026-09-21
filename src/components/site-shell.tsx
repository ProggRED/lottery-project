import { useEffect, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { House, Moon, Shield, Sun, Ticket, Trophy } from "lucide-react";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLuckora } from "@/lib/store";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/lotteries", label: "Lotteries" },
  { to: "/results", label: "Results" },
  { to: "/tickets", label: "My tickets" },
] as const;

export function ThemeSync() {
  const theme = useLuckora((s) => s.theme);
  const setHydrated = useLuckora((s) => s.setHydrated);
  const hasHydrated = useLuckora((s) => s.hasHydrated);

  useEffect(() => {
    const persist = useLuckora.persist;
    if (persist.hasHydrated()) setHydrated();
    return persist.onFinishHydration(() => setHydrated());
  }, [setHydrated]);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme !== "light");
  }, [theme, hasHydrated]);

  return (
    <Toaster
      theme={theme === "light" ? "light" : "dark"}
      position="top-center"
      richColors={false}
    />
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const theme = useLuckora((s) => s.theme);
  const toggleTheme = useLuckora((s) => s.toggleTheme);

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] w-[min(1150px,92%)] items-center justify-between">
          <Link to="/" className="font-display text-[21px] font-extrabold tracking-[0.18em]">
            LUCK<span className="text-primary">ORA</span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground",
                  isActive(pathname, item.to) && "text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="icon" asChild aria-label="Admin">
              <Link to="/admin">
                <Shield className="size-4" />
              </Link>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[min(1150px,92%)] flex-1 pb-24 md:pb-0">{children}</main>

      <footer className="hidden border-t border-border md:block">
        <div className="mx-auto flex w-[min(1150px,92%)] items-center justify-between py-7 text-[11px] tracking-wide text-muted-foreground uppercase">
          <span>Luckora</span>
          <span>College project · simulation only</span>
          <Link to="/admin" className="hover:text-foreground">
            Admin
          </Link>
        </div>
      </footer>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-2 py-2 backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-4">
          {NAV.map((item) => {
            const Icon = iconFor(item.to);
            const active = isActive(pathname, item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-h-11 flex-col items-center justify-center gap-1 text-[10px] font-medium text-muted-foreground",
                  active && "text-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function isActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

function iconFor(to: string) {
  if (to === "/lotteries") return Ticket;
  if (to === "/results") return Trophy;
  if (to === "/tickets") return Ticket;
  return House;
}
