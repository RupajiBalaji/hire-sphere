import { Link } from "react-router-dom";
import { ScreenHeader } from "@/components/MobileShell";
import { Bell, Briefcase, Eye, CheckCircle2, Award } from "lucide-react";

// Notification types that will exist once the platform is live
const NOTIFICATION_TYPES = [
  {
    icon: <Briefcase className="h-4 w-4" />,
    cls: "bg-gradient-primary text-primary-foreground",
    label: "New task match",
    desc: "When a recruiter posts a task that matches your skills",
  },
  {
    icon: <Eye className="h-4 w-4" />,
    cls: "bg-secondary/15 text-secondary",
    label: "Profile view",
    desc: "When a recruiter views or saves your profile",
  },
  {
    icon: <CheckCircle2 className="h-4 w-4" />,
    cls: "bg-success/15 text-success",
    label: "Submission update",
    desc: "When your submitted task is reviewed or shortlisted",
  },
  {
    icon: <Award className="h-4 w-4" />,
    cls: "bg-warning/20 text-warning-foreground",
    label: "Badge earned",
    desc: "When you unlock a new skill badge or achievement",
  },
];

export function AppNotifications() {
  // No real notifications yet — will populate as platform activity happens
  const notifications: never[] = [];

  return (
    <div className="pb-24">
      <ScreenHeader
        title="Inbox"
        subtitle="What's happening with your work"
      />

      <div className="px-4 pt-4 space-y-5">

        {notifications.length > 0 ? (
          /* Real notifications will render here */
          <div className="space-y-2.5">
            {/* mapped notification cards go here */}
          </div>
        ) : (
          <>
            {/* Empty state explanation */}
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-soft">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Your inbox is empty</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Notifications will appear here as you and recruiters get active.
                  </p>
                </div>
              </div>

              {/* What kinds of notifications to expect */}
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
                to="/app/tasks"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-3 text-xs font-bold text-white shadow-glow"
              >
                Browse tasks to get started
              </Link>
            </div>

            {/* Ghost notification outlines */}
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
                  {/* icon circle */}
                  <div className="h-10 w-10 shrink-0 rounded-2xl border border-dashed border-border bg-muted/40" />
                  <div className="flex-1 space-y-2">
                    {/* title line */}
                    <div className="h-3 w-40 rounded-full bg-muted/60" />
                    {/* body lines */}
                    <div className="h-2 w-full rounded-full bg-muted/40" />
                    <div className="h-2 w-3/4 rounded-full bg-muted/30" />
                    {/* timestamp */}
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
