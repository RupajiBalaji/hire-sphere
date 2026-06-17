import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, PlusCircle, UserCircle, Users } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

const items = [
  { to: "/recruiter", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/recruiter/create", label: "Post task", icon: PlusCircle },
  { to: "/recruiter/review", label: "Candidates", icon: Users },
  { to: "/recruiter/profile", label: "Profile", icon: UserCircle },
];

export function RecruiterLayout() {
  const location = useLocation();
  return (
    <MobileShell>
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      <nav className="sticky bottom-0 border-t border-border bg-background/95 backdrop-blur-xl">
        <ul className="mx-auto flex max-w-[440px] items-center justify-around px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2">
          {items.map(({ to, label, icon: Icon, exact }) => {
            const active = exact
              ? location.pathname === to
              : location.pathname === to || location.pathname.startsWith(to + "/");
            return (
              <li key={to} className="flex-1">
                <Link to={to} className="flex flex-col items-center gap-1 py-1 text-[10px] font-medium">
                  <span className={`flex h-9 w-14 items-center justify-center rounded-xl transition-all ${active ? "bg-gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground"}`}>
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
