import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Plus, ListChecks, Users, Eye, TrendingUp,
  ArrowUpRight, Settings, Bell,
} from "lucide-react";
import { getCurrentUser } from "@/lib/api/auth";
import { getSubmissions, getTasks } from "@/lib/api/tasks";
import { getRecruiterProfile } from "@/lib/api/profile";

export const Route = createFileRoute("/recruiter/")({
  component: RecruiterDashboard,
});

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function RecruiterDashboard() {
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });

  const { data: submissions = [] } = useQuery({
    queryKey: ["submissions"],
    queryFn: getSubmissions,
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const { data: profile } = useQuery({
    queryKey: ["recruiter-profile"],
    queryFn: getRecruiterProfile,
  });

  const firstName = user?.name?.split(" ")[0] ?? user?.email?.split("@")[0] ?? "there";
  const initial = (user?.name || user?.email || "R").charAt(0).toUpperCase();

  const recruiterTasks = tasks.filter(
    (t) => t.recruiter === user?.name || (profile?.company && t.company === profile.company)
  );

  // Real stats — computed dynamically from local storage
  const tasksPosted = recruiterTasks.length;
  const activeCandidates = submissions.filter((sub) =>
    recruiterTasks.some((t) => t.title === sub.taskTitle && t.company === sub.company)
  ).length;
  const pendingReviews = submissions.filter((s) => s.status === "Under review" &&
    recruiterTasks.some((t) => t.title === s.taskTitle && t.company === s.company)
  ).length;

  return (
    <div className="pb-24">
      {/* ── Header ── */}
      <header className="relative overflow-hidden bg-gradient-hero px-5 pb-14 pt-10 text-white">
        <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-white/8 blur-xl" />

        <div className="relative flex items-center justify-between">
          {/* Profile avatar — top left */}
          <button
            onClick={() => navigate({ to: "/recruiter/profile" })}
            className="relative flex-shrink-0"
            aria-label="Your profile"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/25 text-lg font-extrabold text-white ring-2 ring-white/40 backdrop-blur overflow-hidden">
              {initial}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-primary bg-success" />
          </button>

          {/* Greeting */}
          <div className="flex-1 px-3 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Recruiter</p>
            <h1 className="mt-0.5 text-[22px] font-extrabold tracking-tight leading-tight">
              {greeting()}, {firstName}
            </h1>
            <p className="mt-0.5 text-xs text-white/75">
              {pendingReviews > 0
                ? `${pendingReviews} submission${pendingReviews > 1 ? "s" : ""} waiting for review`
                : "Spot standout talent and launch your next hiring challenge"}
            </p>
          </div>

          {/* Notification + settings */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              to="/recruiter/notifications"
              aria-label="Recruiter notifications"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 transition-colors hover:bg-white/25"
            >
              <Bell className="h-4 w-4 text-white" />
            </Link>
            <Link
              to="/recruiter/settings"
              aria-label="Recruiter settings"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 transition-colors hover:bg-white/25"
            >
              <Settings className="h-4 w-4 text-white" />
            </Link>
          </div>
        </div>

        {/* Post task CTA */}
        <Link
          to="/recruiter/create"
          className="relative mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-primary shadow-elevated transition-all hover:shadow-card active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Post a new task
        </Link>
      </header>

      {/* ── Stats grid — real data, zeros until active ── */}
      <section className="mt-5 px-4">
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            icon={<ListChecks className="h-4 w-4" />}
            label="Tasks Posted"
            value={tasksPosted}
            sub="post your first task"
            tone="primary"
            empty={tasksPosted === 0}
          />
          <MetricCard
            icon={<Users className="h-4 w-4" />}
            label="Candidates"
            value={activeCandidates}
            sub="applied across tasks"
            tone="secondary"
            empty={activeCandidates === 0}
          />
          <MetricCard
            icon={<Eye className="h-4 w-4" />}
            label="Profile Views"
            value={0}
            sub="visible after posting"
            tone="success"
            empty
          />
          <MetricCard
            icon={<TrendingUp className="h-4 w-4" />}
            label="Pending Reviews"
            value={pendingReviews}
            sub="submissions to review"
            tone="primary"
            empty={pendingReviews === 0}
          />
        </div>
      </section>

      {/* ── Submissions chart — ghost until data exists ── */}
      <section className="mt-5 px-4">
        <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-foreground">Submissions Overview</h3>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </div>
            <span className="text-[10px] font-semibold text-muted-foreground">No data yet</span>
          </div>
          {/* Ghost bar chart */}
          <div className="flex items-end justify-between gap-2 h-20">
            {["M","T","W","T","F","S","S"].map((d, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="w-full rounded-lg border border-dashed border-border bg-muted/30"
                  style={{ height: `${30 + i * 5}px` }} />
                <span className="text-[9px] font-bold uppercase text-muted-foreground/50">{d}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Chart will populate once candidates start submitting.
          </p>
        </div>
      </section>

      {/* ── Active tasks — ghost until posted ── */}
      <section className="mt-5 px-4 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-foreground">Your Active Tasks</h3>
          <Link to="/recruiter/review"
            className="flex items-center gap-1 text-xs font-bold text-primary">
            Candidates <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        {tasksPosted > 0 ? (
          <div className="space-y-3">
            {recruiterTasks.map((t) => (
              <Link
                key={t.id}
                to="/app/tasks/$id"
                params={{ id: t.id }}
                className="group block rounded-3xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-2xl text-base font-bold text-white shadow-sm"
                      style={{ background: t.accent ?? "var(--gradient-primary)" }}
                    >
                      {t.logo}
                    </div>
                    <div className="leading-tight">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                        {t.company}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.recruiter}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    t.difficulty === "Beginner" ? "bg-success/15 text-success" :
                    t.difficulty === "Advanced" ? "bg-secondary/15 text-secondary" :
                    "bg-warning/15 text-warning-foreground"
                  }`}>
                    {t.difficulty}
                  </span>
                </div>

                <h3 className="mt-3.5 text-sm font-extrabold leading-snug text-foreground text-balance animate-fade-in">
                  {t.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {t.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-gradient-soft px-2.5 py-1 text-[10px] font-bold text-primary"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {/* Explanation card */}
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-soft">
                  <ListChecks className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">No tasks posted yet</p>
                  <p className="text-xs text-muted-foreground">Post a task to start receiving submissions</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                {[
                  "Post a real task from your company",
                  "Candidates complete and submit their work",
                  "Review submissions and shortlist the best",
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[9px] font-extrabold text-primary">{i + 1}</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <Link to="/recruiter/create"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-3 text-xs font-bold text-white shadow-glow">
                <Plus className="h-3.5 w-3.5" /> Post your first task
              </Link>
            </div>

            {/* Ghost task outlines */}
            {[1, 2].map((i) => (
              <div key={i} className="rounded-2xl border border-dashed border-border bg-card p-4"
                style={{ opacity: 1 - (i - 1) * 0.3 }}>
                <div className="flex items-center justify-between">
                  <div className="h-3.5 w-40 rounded-full bg-muted/50" />
                  <div className="h-5 w-10 rounded-full bg-muted/40" />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="h-2.5 w-24 rounded-full bg-muted/40" />
                  <div className="h-2.5 w-14 rounded-full bg-muted/30" />
                </div>
                <div className="mt-2.5 h-1.5 w-full rounded-full bg-muted/30" />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ── Metric card ── */
function MetricCard({
  icon, label, value, sub, tone, empty,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  sub: string;
  tone: "primary" | "secondary" | "success";
  empty?: boolean;
}) {
  const toneMap = {
    primary:   "bg-gradient-primary text-white",
    secondary: "bg-secondary text-white",
    success:   "bg-success text-white",
  };

  return (
    <div className={`rounded-3xl border bg-card p-4 shadow-card ${empty ? "border-dashed border-border" : "border-border"}`}>
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${empty ? "bg-muted text-muted-foreground" : toneMap[tone]}`}>
        {icon}
      </div>
      <p className={`mt-3 text-2xl font-extrabold tracking-tight ${empty ? "text-muted-foreground/60" : "text-foreground"}`}>
        {value}
      </p>
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`mt-0.5 text-[10px] font-semibold ${empty ? "text-muted-foreground/50" : "text-success"}`}>
        {sub}
      </p>
    </div>
  );
}
