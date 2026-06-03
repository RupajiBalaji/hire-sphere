import { Link } from "@tanstack/react-router";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";

export function ProgressCard() {
  const tasksCompleted = 8;
  const tasksNeeded = 10;
  const progress = (tasksCompleted / tasksNeeded) * 100;

  return (
    <Link
      to="/app/my-work"
      className="block rounded-3xl border border-border bg-card p-5 shadow-card transition-all hover:border-primary hover:shadow-elevated"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Verified Skill Progress
          </p>
          <p className="mt-2 text-2xl font-bold text-foreground">
            {tasksCompleted}/{tasksNeeded} Tasks
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            2 tasks away from your next skill badge
          </p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground">
          <Sparkles className="h-6 w-6" />
        </div>
      </div>

      <Progress value={progress} className="mt-4" />

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>{progress.toFixed(0)}% Complete</span>
        <span className="text-xs font-medium text-success">
          {tasksNeeded - tasksCompleted} remaining
        </span>
      </div>
    </Link>
  );
}
