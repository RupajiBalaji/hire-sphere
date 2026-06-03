import { Link, useRouterState } from "@tanstack/react-router";
import { Home, ListChecks, Briefcase, Bell, User } from "lucide-react";

const items = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/tasks", label: "Tasks", icon: ListChecks },
  { to: "/app/my-work", label: "My Work", icon: Briefcase },
  { to: "/app/notifications", label: "Inbox", icon: Bell },
  { to: "/app/profile", label: "Profile", icon: User },
] satisfies ReadonlyArray<{ to: string; label: string; icon: typeof Home; exact?: boolean }>;

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 mt-auto border-t border-border bg-background/95 backdrop-blur-xl">
      <ul className="mx-auto flex max-w-[440px] items-center justify-around px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2">
        {items.map(({ to, label, icon: Icon, exact }) => {
          const active = exact ? path === to : path === to || path.startsWith(to + "/");
          return (
            <li key={to} className="flex-1">
              <Link
                to={to as "/app"}
                className="group flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-medium transition-colors"
              >
                <span
                  className={`flex h-9 w-12 items-center justify-center rounded-xl transition-all ${
                    active
                      ? "bg-gradient-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.4 : 2} />
                </span>
                <span className={active ? "text-foreground" : "text-muted-foreground"}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
