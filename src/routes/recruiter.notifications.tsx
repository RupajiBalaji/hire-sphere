import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Bell, CheckCircle2, FileText, Star, Users } from "lucide-react";
import { ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/recruiter/notifications")({
  component: RecruiterNotifications,
});

const NOTIFICATION_TYPES = [
  {
    icon: <Users className="h-4 w-4" />,
    cls: "bg-gradient-primary text-primary-foreground",
    label: "New candidate submission",
    desc: "When a candidate submits work for one of your posted tasks",
  },
  {
    icon: <Star className="h-4 w-4" />,
    cls: "bg-secondary/15 text-secondary",
    label: "Shortlist activity",
    desc: "When a saved candidate or shortlist needs your attention",
  },
  {
    icon: <FileText className="h-4 w-4" />,
    cls: "bg-success/15 text-success",
    label: "Task updates",
    desc: "When a posted task gets new engagement or reaches a deadline",
  },
  {
    icon: <CheckCircle2 className="h-4 w-4" />,
    cls: "bg-warning/20 text-warning-foreground",
    label: "Hiring milestones",
    desc: "When a candidate moves forward in your hiring workflow",
  },
];

function RecruiterNotifications() {
  const navigate = useNavigate();
  const notifications: never[] = [];

  return (
    <div className="pb-24">
      <ScreenHeader
        title="Notifications"
        subtitle="Signals from your hiring pipeline"
        back={
          <button
            type="button"
            onClick={() => navigate({ to: "/recruiter" })}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        }
      />

      <div className="space-y-5 px-4 pt-4">
        {notifications.length > 0 ? (
          <div className="space-y-2.5" />
        ) : (
          <>
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-soft">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">No recruiter alerts yet</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Your updates will appear here as candidates engage with your tasks.
                  </p>
                </div>
              </div>

              <div className="space-y-3 border-t border-border/60 pt-4">
                {NOTIFICATION_TYPES.map(({ icon, cls, label, desc }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${cls}`}>
                      {icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground">{label}</p>
                      <p className="text-[11px] text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/recruiter/create"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-3 text-xs font-bold text-white shadow-glow"
              >
                Post a task to start receiving updates
              </Link>
            </div>

            <p className="px-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Recent
            </p>

            <div className="space-y-2.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-3xl border border-dashed border-border bg-card p-4"
                  style={{ opacity: 1 - (i - 1) * 0.25 }}
                >
                  <div className="h-10 w-10 shrink-0 rounded-2xl border border-dashed border-border bg-muted/40" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-40 rounded-full bg-muted/60" />
                    <div className="h-2 w-full rounded-full bg-muted/40" />
                    <div className="h-2 w-3/4 rounded-full bg-muted/30" />
                    <div className="h-2 w-12 rounded-full bg-muted/40" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
