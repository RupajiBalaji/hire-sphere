import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

interface Props {
  tasksCompleted: number;
  tasksNeeded?: number;
}

export function ProgressCard({ tasksCompleted, tasksNeeded = 10 }: Props) {
  const pct = tasksNeeded > 0 ? Math.min((tasksCompleted / tasksNeeded) * 100, 100) : 0;
  const remaining = Math.max(tasksNeeded - tasksCompleted, 0);

  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <Link
      to="/app/my-work"
      className="block rounded-3xl bg-card border border-border shadow-card p-5 transition-all hover:shadow-elevated hover:border-primary/40"
    >
      <div className="flex items-center gap-4">
        {/* Circular progress ring */}
        <div className="relative flex-shrink-0 flex items-center justify-center">
          <svg width="72" height="72" className="-rotate-90">
            <circle cx="36" cy="36" r={r} fill="none" stroke="var(--color-border)" strokeWidth="5" />
            {pct > 0 && (
              <circle
                cx="36" cy="36" r={r} fill="none"
                stroke="url(#prog-grad)" strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circ}`}
                className="transition-all duration-700"
              />
            )}
            <defs>
              <linearGradient id="prog-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="oklch(0.546 0.215 262)" />
                <stop offset="100%" stopColor="oklch(0.585 0.213 277)" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute text-base font-extrabold text-foreground">
            {pct.toFixed(0)}%
          </span>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Verified Skill Progress
          </p>
          <p className="mt-1 text-2xl font-extrabold text-foreground leading-tight">
            {tasksCompleted}
            <span className="text-base font-semibold text-muted-foreground">/{tasksNeeded}</span> Tasks
          </p>
          {remaining > 0 ? (
            <p className="mt-0.5 text-xs text-muted-foreground">
              <span className="font-bold text-success">{remaining} tasks</span> left to earn your badge
            </p>
          ) : (
            <p className="mt-0.5 text-xs font-bold text-success">Badge earned! 🎉</p>
          )}
        </div>

        {/* Icon */}
        <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Milestone dots */}
      <div className="mt-4 flex items-center gap-1.5">
        {Array.from({ length: tasksNeeded }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              i < tasksCompleted ? "bg-gradient-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] font-semibold text-muted-foreground">
        <span>0</span>
        {tasksCompleted > 0 && (
          <span className="text-success font-bold">{tasksCompleted} done</span>
        )}
        <span>{tasksNeeded}</span>
      </div>
    </Link>
  );
}
