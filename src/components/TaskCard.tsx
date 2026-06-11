import { Link } from "@tanstack/react-router";
import { Clock, Zap, ArrowUpRight } from "lucide-react";

export type Task = {
  id: string;
  title: string;
  recruiter: string;
  company: string;
  logo: string;
  skills: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  deadline: string;
  time: string;
  accent?: string;
  description?: string;
  guidelines?: string[];
};

const difficultyStyle: Record<Task["difficulty"], string> = {
  Beginner: "bg-success/10 text-success",
  Intermediate: "bg-warning/15 text-warning-foreground",
  Advanced: "bg-secondary/15 text-secondary",
};

export function TaskCard({ task }: { task: Task }) {
  return (
    <Link
      to="/app/tasks/$id"
      params={{ id: task.id }}
      className="group block rounded-3xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl text-base font-bold text-primary-foreground"
            style={{ background: task.accent ?? "var(--gradient-primary)" }}
          >
            {task.logo}
          </div>
          <div className="leading-tight">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {task.company}
            </p>
            <p className="text-xs text-muted-foreground">{task.recruiter}</p>
          </div>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${difficultyStyle[task.difficulty]}`}>
          {task.difficulty}
        </span>
      </div>

      <h3 className="mt-4 text-base font-bold leading-snug text-foreground text-balance">
        {task.title}
      </h3>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {task.skills.map((s) => (
          <span
            key={s}
            className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" /> {task.time}
        </span>
        <span className="flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-secondary" /> {task.deadline}
        </span>
        <span className="flex items-center gap-1 font-semibold text-primary">
          Apply <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
