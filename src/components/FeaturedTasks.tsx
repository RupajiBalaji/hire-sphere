import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { TaskCard, type Task } from "@/components/TaskCard";

interface FeaturedTasksProps {
  tasks: Task[];
}

export function FeaturedTasks({ tasks }: FeaturedTasksProps) {
  const featuredTasks = tasks.slice(0, 2);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Recommended For You
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Based on your skills and preferences
          </p>
        </div>
        <Link
          to="/app/tasks"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {featuredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
