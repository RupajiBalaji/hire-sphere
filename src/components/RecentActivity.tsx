import { Link } from "@tanstack/react-router";
import { CheckCircle, Trophy, Zap, ArrowRight } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "completed" | "earned" | "streak";
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
  color: string;
}

export function RecentActivity() {
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "completed",
      title: "Task Completed",
      description: "Finished 'Design a landing page for an AI note-taking app'",
      timestamp: "2 hours ago",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-success",
    },
    {
      id: "2",
      type: "earned",
      title: "Skill Verified",
      description: "Earned 'React' verified skill badge",
      timestamp: "1 day ago",
      icon: <Trophy className="h-5 w-5" />,
      color: "text-yellow-500",
    },
    {
      id: "3",
      type: "streak",
      title: "5-Day Streak!",
      description: "You've been active for 5 consecutive days",
      timestamp: "3 days ago",
      icon: <Zap className="h-5 w-5" />,
      color: "text-orange-500",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Your recent achievements and milestones
          </p>
        </div>
        <Link
          to="/app/my-work"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {activities.map((activity) => (
          <Link
            key={activity.id}
            to="/app/my-work"
            className="block rounded-2xl border border-border bg-card p-4 shadow-card transition-all hover:border-primary hover:shadow-elevated"
          >
            <div className="flex items-start gap-3">
              <div className={`mt-1 ${activity.color}`}>{activity.icon}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-foreground">
                      {activity.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {activity.timestamp}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
