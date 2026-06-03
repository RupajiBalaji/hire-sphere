import { Link } from "@tanstack/react-router";
import { ArrowRight, Zap } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  difficulty: string;
  demand: string;
  tasks: number;
  icon?: string;
}

export function SuggestedSkills() {
  const skills: Skill[] = [
    {
      id: "react",
      name: "React",
      difficulty: "Intermediate",
      demand: "High Demand",
      tasks: 5,
      icon: "⚛️",
    },
    {
      id: "typescript",
      name: "TypeScript",
      difficulty: "Intermediate",
      demand: "High Demand",
      tasks: 4,
      icon: "📘",
    },
    {
      id: "figma",
      name: "Figma Design",
      difficulty: "Beginner",
      demand: "Growing",
      tasks: 3,
      icon: "🎨",
    },
    {
      id: "python",
      name: "Python",
      difficulty: "Beginner",
      demand: "Very High",
      tasks: 6,
      icon: "🐍",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Skills To Explore
          </h2>
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

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {skills.map((skill) => (
          <Link
            key={skill.id}
            to="/app/tasks"
            className="group rounded-2xl border border-border bg-card p-4 shadow-card transition-all hover:border-primary hover:shadow-elevated"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{skill.icon}</div>
                <div>
                  <p className="font-bold text-foreground">{skill.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {skill.difficulty}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-secondary/10 px-2 py-1 text-[11px] font-semibold text-secondary">
                {skill.demand}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between pt-3 border-t border-border/70">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Zap className="h-3.5 w-3.5" /> {skill.tasks} tasks
              </span>
              <span className="text-xs font-semibold text-primary">
                Explore →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
