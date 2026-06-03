import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, PlusCircle, Users } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/recruiter")({
  component: RecruiterLayout,
});

const items = [
  { to: "/recruiter", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/recruiter/create", label: "Post task", icon: PlusCircle },
  { to: "/recruiter/review", label: "Candidates", icon: Users },
] satisfies ReadonlyArray<{ to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }>;

function RecruiterLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <MobileShell>
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      <nav className="sticky bottom-0 border-t border-border bg-background/95 backdrop-blur-xl">
        <ul className="mx-auto flex max-w-[440px] items-center justify-around px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2">
          {items.map(({ to, label, icon: Icon, exact }) => {
            const active = exact ? path === to : path === to || path.startsWith(to + "/");
            return (
              <li key={to} className="flex-1">
                <Link to={to as "/recruiter"} className="flex flex-col items-center gap-1 py-1 text-[10px] font-medium">
                  <span
                    className={`flex h-9 w-14 items-center justify-center rounded-xl transition-all ${
                      active
                        ? "bg-gradient-primary text-primary-foreground shadow-glow"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className={active ? "text-foreground" : "text-muted-foreground"}>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </MobileShell>
  );
}
