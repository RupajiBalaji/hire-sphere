import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/MobileShell";
import { notifications } from "@/lib/mock-data";
import { Briefcase, Eye, CheckCircle2, Award } from "lucide-react";

export const Route = createFileRoute("/app/notifications")({
  component: Notifications,
});

const iconMap = {
  task: { i: Briefcase, c: "bg-gradient-primary text-primary-foreground" },
  view: { i: Eye, c: "bg-secondary/15 text-secondary" },
  status: { i: CheckCircle2, c: "bg-success/15 text-success" },
  badge: { i: Award, c: "bg-warning/20 text-warning-foreground" },
};

function Notifications() {
  return (
    <div>
      <ScreenHeader
        title="Notifications"
        subtitle="What's happening with your work"
        right={<button className="text-xs font-bold text-primary">Mark all read</button>}
      />
      <div className="px-5 pt-4 pb-8">
        <p className="px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Today</p>
        <div className="mt-2 space-y-2.5">
          {notifications.map((n) => {
            const { i: Icon, c } = iconMap[n.type];
            return (
              <div
                key={n.id}
                className={`flex items-start gap-3 rounded-3xl border border-border bg-card p-4 shadow-sm ${
                  n.unread ? "ring-1 ring-primary/15" : ""
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${c}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold leading-tight">{n.title}</p>
                    {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{n.body}</p>
                  <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {n.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
