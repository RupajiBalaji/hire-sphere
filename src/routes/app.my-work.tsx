import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScreenHeader } from "@/components/MobileShell";
import { tasks } from "@/lib/mock-data";
import { Clock, CheckCircle2, Hourglass } from "lucide-react";

export const Route = createFileRoute("/app/my-work")({
  component: MyWork,
});

type Tab = "Active" | "Submitted" | "Completed";

function MyWork() {
  const [tab, setTab] = useState<Tab>("Active");

  const data: Record<Tab, { task: (typeof tasks)[number]; progress: number; status: string }[]> = {
    Active: [
      { task: tasks[0], progress: 60, status: "In progress" },
      { task: tasks[2], progress: 20, status: "Just started" },
    ],
    Submitted: [{ task: tasks[1], progress: 100, status: "Under review" }],
    Completed: [
      { task: tasks[3], progress: 100, status: "Shortlisted" },
      { task: tasks[4], progress: 100, status: "Completed" },
    ],
  };

  return (
    <div>
      <ScreenHeader title="My work" subtitle="Track every task you've touched" />
      <div className="px-5 pt-4">
        <div className="rounded-2xl bg-muted p-1">
          <div className="grid grid-cols-3 gap-1">
            {(["Active", "Submitted", "Completed"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-xl py-2.5 text-xs font-bold transition-all ${
                  tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-3 pb-8">
          {data[tab].map(({ task, progress, status }) => (
            <div key={task.id} className="rounded-3xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-base font-bold text-primary-foreground"
                    style={{ background: task.accent }}
                  >
                    {task.logo}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {task.company}
                    </p>
                    <p className="text-sm font-bold leading-tight">{task.title}</p>
                  </div>
                </div>
                <StatusBadge status={status} />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground">{progress}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-primary"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {task.deadline}
                </span>
                <button className="font-bold text-primary">Open →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { c: string; icon: React.ReactNode }> = {
    "In progress": { c: "bg-warning/15 text-warning-foreground", icon: <Hourglass className="h-3 w-3" /> },
    "Just started": { c: "bg-muted text-muted-foreground", icon: <Clock className="h-3 w-3" /> },
    "Under review": { c: "bg-secondary/15 text-secondary", icon: <Hourglass className="h-3 w-3" /> },
    Shortlisted: { c: "bg-success/15 text-success", icon: <CheckCircle2 className="h-3 w-3" /> },
    Completed: { c: "bg-success/15 text-success", icon: <CheckCircle2 className="h-3 w-3" /> },
  };
  const s = map[status] ?? map["In progress"];
  return (
    <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${s.c}`}>
      {s.icon} {status}
    </span>
  );
}
