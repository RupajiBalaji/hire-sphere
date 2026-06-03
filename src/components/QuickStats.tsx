import { Link } from "@tanstack/react-router";
import { Trophy, Flame, Target, Award } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

export function QuickStats() {
  const stats: StatItem[] = [
    {
      icon: <Trophy className="h-5 w-5" />,
      label: "Completed",
      value: 8,
      color: "text-yellow-500",
    },
    {
      icon: <Award className="h-5 w-5" />,
      label: "Verified Skills",
      value: 2,
      color: "text-blue-500",
    },
    {
      icon: <Flame className="h-5 w-5" />,
      label: "Current Streak",
      value: "5 days",
      color: "text-orange-500",
    },
    {
      icon: <Target className="h-5 w-5" />,
      label: "Points Earned",
      value: "1,250",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map((stat, idx) => (
        <Link
          key={idx}
          to="/app/my-work"
          className="block rounded-2xl border border-border bg-card p-4 shadow-card transition-all hover:border-primary hover:shadow-elevated"
        >
          <div className={`mb-2 ${stat.color}`}>{stat.icon}</div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {stat.label}
          </p>
          <p className="mt-1 text-xl font-bold text-foreground">{stat.value}</p>
        </Link>
      ))}
    </div>
  );
}
