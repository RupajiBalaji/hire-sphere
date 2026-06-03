import { Link } from "@tanstack/react-router";
import { Zap, ArrowRight } from "lucide-react";

export function DailyChallenge() {
  const challenge = {
    title: "JavaScript Fundamentals Challenge",
    description: "Complete a quick JavaScript challenge to boost your streak",
    reward: "50 points + 5x streak multiplier",
    difficulty: "Beginner",
    timeLimit: "15 minutes",
  };

  return (
    <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/5 p-5 shadow-card">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20">
          <Zap className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-foreground">{challenge.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {challenge.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-background px-2.5 py-1 text-[10px] font-semibold uppercase text-muted-foreground">
              {challenge.difficulty}
            </span>
            <span className="rounded-full bg-background px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
              ⏱️ {challenge.timeLimit}
            </span>
            <span className="rounded-full bg-success/20 px-2.5 py-1 text-[10px] font-bold text-success">
              🎁 {challenge.reward}
            </span>
          </div>

          <Link
            to="/app/tasks"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            Accept Challenge <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
