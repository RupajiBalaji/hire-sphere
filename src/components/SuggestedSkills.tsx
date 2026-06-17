import { Link } from "react-router-dom";
import { ArrowRight, Zap, BookOpen } from "lucide-react";
import { type Task } from "@/components/TaskCard";

interface Props {
  tasks: Task[];
  userSkills?: string[];
}

function buildSkillsFromTasks(tasks: Task[], userSkills: string[]) {
  const map = new Map<string, { count: number; difficulties: Task["difficulty"][] }>();

  for (const task of tasks) {
    for (const skill of task.skills) {
      const entry = map.get(skill) ?? { count: 0, difficulties: [] };
      entry.count += 1;
      entry.difficulties.push(task.difficulty);
      map.set(skill, entry);
    }
  }

  const normalised = userSkills.map((s) => s.toLowerCase());

  return Array.from(map.entries())
    .map(([name, { count, difficulties }]) => {
      const freq: Record<string, number> = {};
      for (const d of difficulties) freq[d] = (freq[d] ?? 0) + 1;
      const difficulty = (Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] ??
        "Beginner") as Task["difficulty"];
      const alreadyHas = normalised.includes(name.toLowerCase());
      return { name, count, difficulty, alreadyHas };
    })
    .sort((a, b) => {
      if (a.alreadyHas !== b.alreadyHas) return a.alreadyHas ? 1 : -1;
      return b.count - a.count;
    })
    .slice(0, 4);
}

const difficultyColor: Record<Task["difficulty"], string> = {
  Beginner: "bg-success/10 text-success",
  Intermediate: "bg-warning/15 text-warning-foreground",
  Advanced: "bg-secondary/15 text-secondary",
};

export function SuggestedSkills({ tasks, userSkills = [] }: Props) {
  const skills = buildSkillsFromTasks(tasks, userSkills);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Skills To Explore</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Learn in-demand skills with our curated tasks
          </p>
        </div>
        <Link
          to="/app/tasks"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80"
        >
          Browse All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 grid gap-3 grid-cols-2">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <Link
              key={skill.name}
              to="/app/tasks"
              className="group rounded-2xl border border-border bg-card p-4 shadow-card transition-all hover:border-primary hover:shadow-elevated"
            >
              <div className="flex items-start justify-between gap-1">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-soft">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-foreground">{skill.name}</p>
                    <p className="text-[10px] text-muted-foreground">{skill.difficulty}</p>
                  </div>
                </div>
                {skill.alreadyHas ? (
                  <span className="shrink-0 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                    Added
                  </span>
                ) : (
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${difficultyColor[skill.difficulty]}`}>
                    {skill.difficulty}
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  <Zap className="h-3.5 w-3.5" /> {skill.count} task{skill.count !== 1 ? "s" : ""}
                </span>
                <span className="text-xs font-semibold text-primary group-hover:underline">
                  Explore →
                </span>
              </div>
            </Link>
          ))
        ) : (
          /* Four ghost placeholder cards */
          <>
            <SkillPlaceholder />
            <SkillPlaceholder />
            <SkillPlaceholder />
            <SkillPlaceholder />
          </>
        )}
      </div>
    </div>
  );
}

function SkillPlaceholder() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-xl border border-dashed border-border bg-muted/40" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3 w-16 rounded-full bg-muted/60" />
          <div className="h-2 w-12 rounded-full bg-muted/40" />
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-border/50 pt-3">
        <div className="h-2.5 w-12 rounded-full bg-muted/40" />
        <div className="h-2.5 w-14 rounded-full bg-primary/20" />
      </div>
    </div>
  );
}
