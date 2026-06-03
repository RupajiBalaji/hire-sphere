import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

interface Opportunity {
  id: string;
  company: string;
  logo: string;
  position: string;
  match: number;
  skills: string[];
}

export function RecruiterOpportunities() {
  const opportunities: Opportunity[] = [
    {
      id: "1",
      company: "TechStartup Inc",
      logo: "T",
      position: "Senior React Developer",
      match: 95,
      skills: ["React", "TypeScript", "Node.js"],
    },
    {
      id: "2",
      company: "DesignCorp",
      logo: "D",
      position: "UI/UX Designer",
      match: 87,
      skills: ["Figma", "UI Design", "Prototyping"],
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Job Opportunities
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Matching your verified skills
          </p>
        </div>
        <Link
          to="/app/notifications"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {opportunities.map((opp) => (
          <Link
            key={opp.id}
            to="/app/notifications"
            className="block rounded-2xl border border-border bg-card p-4 shadow-card transition-all hover:border-primary hover:shadow-elevated"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-primary text-sm font-bold text-primary-foreground">
                {opp.logo}
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {opp.company}
                </p>
                <p className="mt-1 font-bold text-foreground">{opp.position}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {opp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-bold text-success">
                  {opp.match}% match
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
