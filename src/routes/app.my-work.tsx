import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ScreenHeader } from "@/components/MobileShell";
import { getSubmissions, type Submission } from "@/lib/api/tasks";
import { getUserStats, getLevel } from "@/lib/api/userStats";
import {
  Clock, CheckCircle2, Hourglass, ListChecks, Flame,
  Award, Target, ArrowRight, Briefcase, Trophy, Zap,
} from "lucide-react";

export const Route = createFileRoute("/app/my-work")({
  component: MyWork,
});

type Tab = "Active" | "Submitted" | "Completed";

function MyWork() {
  const [tab, setTab] = useState<Tab>("Active");

  const { data: submissions = [] } = useQuery({
    queryKey: ["submissions"],
    queryFn: getSubmissions,
  });

  const { data: stats } = useQuery({
    queryKey: ["user-stats"],
    queryFn: getUserStats,
  });

  const { level, progress, toNext } = getLevel(stats?.pointsEarned ?? 0);
  const levelPct = Math.round((progress / 500) * 100);

  // Split submissions by tab
  // "Under review" → Submitted tab
  // future statuses could go to Active/Completed
  const submitted = submissions.filter((s) => s.status === "Under review");
  const completed: Submission[] = []; // will populate when backend marks complete
  const active: Submission[] = [];     // tasks started but not yet submitted

  const tabData: Record<Tab, Submission[]> = {
    Active: active,
    Submitted: submitted,
    Completed: completed,
  };

  const counts: Record<Tab, number> = {
    Active: active.length,
    Submitted: submitted.length,
    Completed: completed.length,
  };

  return (
    <div className="pb-24">
      <ScreenHeader title="My Work" subtitle="Track every task you've touched" />

      {/* ── Stats summary banner ── */}
      <div className="mx-4 mt-4 overflow-hidden rounded-3xl bg-gradient-hero p-5 text-white shadow-elevated">
        <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

        <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Your progress</p>

        <div className="mt-3 grid grid-cols-3 gap-3">
          <StatPill icon={<Trophy className="h-4 w-4" />} label="Completed" value={stats?.tasksCompleted ?? 0} />
          <StatPill icon={<Flame className="h-4 w-4 text-orange-300" />} label="Streak" value={`${stats?.streakDays ?? 0}d`} />
          <StatPill icon={<Award className="h-4 w-4 text-yellow-300" />} label="Badges" value={stats?.verifiedSkills ?? 0} />
        </div>

        {/* Level progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] font-semibold text-white/70 mb-1.5">
            <span className="flex items-center gap-1"><Target className="h-3 w-3" /> Level {level}</span>
            <span>{stats?.pointsEarned ?? 0} pts · {toNext} to Lvl {level + 1}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-all duration-700"
              style={{ width: `${levelPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="mx-4 mt-4 rounded-2xl bg-muted p-1">
        <div className="grid grid-cols-3 gap-1">
          {(["Active", "Submitted", "Completed"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative rounded-xl py-2.5 text-xs font-bold transition-all ${
                tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {t}
              {counts[t] > 0 && (
                <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-extrabold text-white">
                  {counts[t]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="mt-4 space-y-3 px-4 pb-6">
        {tabData[tab].length > 0 ? (
          tabData[tab].map((s) => <WorkCard key={s.taskId} submission={s} />)
        ) : (
          <EmptyTab tab={tab} />
        )}
      </div>
    </div>
  );
}

/* ── Stat pill inside banner ── */
function StatPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl bg-white/15 py-3 ring-1 ring-white/20">
      <span className="text-white/80">{icon}</span>
      <span className="text-lg font-extrabold text-white leading-none">{value}</span>
      <span className="text-[9px] font-semibold uppercase tracking-wider text-white/60">{label}</span>
    </div>
  );
}

/* ── Submission card ── */
function WorkCard({ submission }: { submission: Submission }) {
  const initial = submission.company.charAt(0).toUpperCase();

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-primary text-base font-extrabold text-white">
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {submission.company}
          </p>
          <p className="mt-0.5 text-sm font-bold leading-snug text-foreground">
            {submission.taskTitle}
          </p>
        </div>
        <StatusBadge status={submission.status} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {new Date(submission.submittedAt).toLocaleDateString("en-US", {
            month: "short", day: "numeric",
          })}
        </span>
        <span className="font-semibold text-primary">View details →</span>
      </div>
    </div>
  );
}

/* ── Status badge ── */
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { cls: string; icon: React.ReactNode }> = {
    "In progress":  { cls: "bg-warning/15 text-warning-foreground", icon: <Hourglass className="h-3 w-3" /> },
    "Just started": { cls: "bg-muted text-muted-foreground",          icon: <Clock className="h-3 w-3" /> },
    "Under review": { cls: "bg-secondary/15 text-secondary",          icon: <Hourglass className="h-3 w-3" /> },
    "Shortlisted":  { cls: "bg-success/15 text-success",              icon: <CheckCircle2 className="h-3 w-3" /> },
    "Completed":    { cls: "bg-success/15 text-success",              icon: <CheckCircle2 className="h-3 w-3" /> },
  };
  const s = styles[status] ?? styles["In progress"];
  return (
    <span className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${s.cls}`}>
      {s.icon} {status}
    </span>
  );
}

/* ── Empty states per tab ── */
function EmptyTab({ tab }: { tab: Tab }) {
  const config = {
    Active: {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: "No active tasks",
      description: "Tasks you start working on will appear here. You can track your progress and pick up where you left off.",
      cta: "Browse tasks",
      ctaTo: "/app/tasks" as const,
      bullets: [
        { icon: <ListChecks className="h-4 w-4 text-primary" />, text: "Pick a task from the feed that matches your skills" },
        { icon: <Zap className="h-4 w-4 text-amber-500" />,      text: "Work on it at your own pace — no fixed schedule" },
        { icon: <ArrowRight className="h-4 w-4 text-success" />, text: "Submit when ready and wait for recruiter review" },
      ],
    },
    Submitted: {
      icon: <Hourglass className="h-8 w-8 text-secondary" />,
      title: "Nothing submitted yet",
      description: "Once you submit a completed task, it will show up here while the recruiter reviews your work.",
      cta: "Find a task to start",
      ctaTo: "/app/tasks" as const,
      bullets: [
        { icon: <Hourglass className="h-4 w-4 text-secondary" />, text: "Submitted tasks are reviewed by the posting recruiter" },
        { icon: <CheckCircle2 className="h-4 w-4 text-success" />, text: "Strong submissions can lead to shortlisting or a hire" },
        { icon: <Award className="h-4 w-4 text-yellow-500" />,    text: "Every submission earns you points and profile strength" },
      ],
    },
    Completed: {
      icon: <Trophy className="h-8 w-8 text-amber-500" />,
      title: "No completed tasks yet",
      description: "Tasks marked as reviewed or accepted by a recruiter will move here. This is your proof-of-work portfolio.",
      cta: "Start your first task",
      ctaTo: "/app/tasks" as const,
      bullets: [
        { icon: <Trophy className="h-4 w-4 text-amber-500" />,     text: "Completed tasks form your public proof-of-work portfolio" },
        { icon: <Award className="h-4 w-4 text-primary" />,        text: "Every 5 completed tasks earns a verified skill badge" },
        { icon: <Flame className="h-4 w-4 text-orange-500" />,     text: "Consistent completions boost your streak and recruiter visibility" },
      ],
    },
  };

  const c = config[tab];

  return (
    <div className="space-y-4">
      {/* explanation card */}
      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-soft">
            {c.icon}
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">{c.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{c.description}</p>
          </div>
        </div>
        <div className="space-y-3 border-t border-border/60 pt-4">
          {c.bullets.map(({ icon, text }) => (
            <div key={text} className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0">{icon}</span>
              <p className="text-xs leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
        <Link
          to={c.ctaTo}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-3 text-xs font-bold text-white shadow-glow"
        >
          {c.cta} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* ghost card outlines */}
      {[1, 2].map((i) => (
        <div
          key={i}
          className="rounded-3xl border border-dashed border-border bg-card p-5"
          style={{ opacity: 1 - i * 0.3 }}
        >
          <div className="flex items-start gap-3">
            <div className="h-11 w-11 shrink-0 rounded-2xl border border-dashed border-border bg-muted/40" />
            <div className="flex-1 space-y-2">
              <div className="h-2 w-20 rounded-full bg-muted/60" />
              <div className="h-3 w-48 rounded-full bg-muted/50" />
              <div className="h-3 w-36 rounded-full bg-muted/40" />
            </div>
            <div className="h-5 w-20 rounded-full bg-muted/40" />
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
            <div className="h-2.5 w-16 rounded-full bg-muted/40" />
            <div className="h-2.5 w-20 rounded-full bg-primary/20" />
          </div>
        </div>
      ))}
    </div>
  );
}
