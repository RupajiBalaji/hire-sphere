import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, TrendingUp, Users, ListChecks, Eye, Plus } from "lucide-react";

export const Route = createFileRoute("/recruiter/")({
  component: RecruiterDashboard,
});

function RecruiterDashboard() {
  return (
    <div>
      <header className="bg-gradient-hero px-5 pb-12 pt-10 text-primary-foreground">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Recruiter</p>
        <h1 className="mt-1 text-2xl font-extrabold">Good morning, Priya</h1>
        <p className="mt-1 text-sm text-white/85">3 new submissions need your review today.</p>

        <Link
          to="/recruiter/create"
          className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-primary shadow-elevated"
        >
          <Plus className="h-4 w-4" /> Post a new task
        </Link>
      </header>

      <section className="-mt-7 px-5">
        <div className="grid grid-cols-2 gap-3">
          <Metric icon={<ListChecks className="h-4 w-4" />} label="Tasks posted" value="14" trend="+3 this week" />
          <Metric icon={<Users className="h-4 w-4" />} label="Active candidates" value="86" trend="+12 this week" tone="secondary" />
          <Metric icon={<Eye className="h-4 w-4" />} label="Profile views" value="1.4k" trend="+22%" tone="success" />
          <Metric icon={<TrendingUp className="h-4 w-4" />} label="Engagement" value="73%" trend="Above avg" />
        </div>
      </section>

      {/* Analytics card */}
      <section className="mt-6 px-5">
        <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold">Submissions overview</h3>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </div>
            <button className="text-xs font-bold text-primary">Export</button>
          </div>
          <svg viewBox="0 0 300 120" className="mt-4 w-full">
            {[24, 38, 18, 56, 42, 70, 64].map((h, i) => (
              <g key={i}>
                <rect
                  x={i * 42 + 8}
                  y={120 - h}
                  width="22"
                  height={h}
                  rx="6"
                  fill="url(#bg)"
                />
              </g>
            ))}
            <defs>
              <linearGradient id="bg" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#2563EB" />
                <stop offset="1" stopColor="#6366F1" />
              </linearGradient>
            </defs>
          </svg>
          <div className="mt-2 flex justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Active tasks */}
      <section className="mt-6 px-5 pb-8">
        <div className="flex items-end justify-between">
          <h3 className="text-base font-bold">Your active tasks</h3>
          <Link to="/recruiter/review" className="flex items-center gap-1 text-xs font-bold text-primary">
            Candidates <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="mt-3 space-y-3">
          {[
            { t: "Landing page concept", c: 23, d: "3d left" },
            { t: "React dashboard MVP", c: 41, d: "5d left" },
            { t: "Brand identity sprint", c: 12, d: "1d left" },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-border bg-card p-4 shadow-card">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">{x.t}</p>
                <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">
                  Live
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>{x.c} submissions</span>
                <span>{x.d}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[60%] rounded-full bg-gradient-primary" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
  trend,
  tone = "primary",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  tone?: "primary" | "secondary" | "success";
}) {
  const tones = {
    primary: "bg-gradient-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    success: "bg-success text-success-foreground",
  };
  return (
    <div className="rounded-3xl border border-border bg-card p-4 shadow-card">
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`}>{icon}</div>
      <p className="mt-3 text-2xl font-extrabold tracking-tight">{value}</p>
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-[10px] font-semibold text-success">{trend}</p>
    </div>
  );
}
