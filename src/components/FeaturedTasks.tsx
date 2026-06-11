import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { TaskCard, type Task } from "@/components/TaskCard";

interface FeaturedTasksProps {
  tasks: Task[];
  userSkills?: string[];
}

export function FeaturedTasks({ tasks, userSkills = [] }: FeaturedTasksProps) {
  const hasSkills = userSkills.length > 0;

  let featured: Task[];
  if (hasSkills) {
    const normalised = userSkills.map((s) => s.toLowerCase());
    const matched = tasks.filter((t) =>
      t.skills.some((s) => normalised.includes(s.toLowerCase()))
    );
    const filler = tasks.filter((t) => !matched.includes(t));
    featured = [...matched, ...filler].slice(0, 2);
  } else {
    const beginners = tasks.filter((t) => t.difficulty === "Beginner");
    const rest = tasks.filter((t) => t.difficulty !== "Beginner");
    featured = [...beginners, ...rest].slice(0, 2);
  }

  const subtitle = hasSkills
    ? "Matched to your skills and preferences"
    : "Tasks will appear here once recruiters post them";

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Recommended For You</h2>
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <Link
          to="/app/tasks"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 grid gap-4 grid-cols-2">
        {featured.length > 0 ? (
          featured.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          /* Two ghost placeholder cards */
          <>
            <TaskPlaceholder />
            <TaskPlaceholder />
          </>
        )}
      </div>

      {/* Nudge to add skills for better recommendations */}
      {!hasSkills && (
        <Link
          to="/app/edit-profile"
          className="mt-3 flex items-center justify-between rounded-2xl border border-primary/20 bg-gradient-soft px-4 py-3"
        >
          <p className="text-xs text-muted-foreground">
            <span className="font-bold text-primary">Add your skills</span> to get personalised picks
          </p>
          <ArrowRight className="h-4 w-4 text-primary shrink-0" />
        </Link>
      )}
    </div>
  );
}

function TaskPlaceholder() {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-card p-5 flex flex-col gap-3">
      {/* company row */}
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl border border-dashed border-border bg-muted/40" />
        <div className="flex-1 space-y-1.5">
          <div className="h-2.5 w-20 rounded-full bg-muted/60" />
          <div className="h-2 w-14 rounded-full bg-muted/40" />
        </div>
      </div>
      {/* title lines */}
      <div className="space-y-1.5">
        <div className="h-3 w-full rounded-full bg-muted/50" />
        <div className="h-3 w-4/5 rounded-full bg-muted/40" />
        <div className="h-3 w-3/5 rounded-full bg-muted/30" />
      </div>
      {/* skill tags */}
      <div className="flex gap-1.5">
        <div className="h-5 w-14 rounded-full bg-muted/40" />
        <div className="h-5 w-16 rounded-full bg-muted/40" />
      </div>
      {/* footer */}
      <div className="mt-1 flex items-center justify-between border-t border-border/50 pt-3">
        <div className="h-2.5 w-12 rounded-full bg-muted/40" />
        <div className="h-2.5 w-10 rounded-full bg-muted/40" />
        <div className="h-2.5 w-10 rounded-full bg-primary/20" />
      </div>
    </div>
  );
}
