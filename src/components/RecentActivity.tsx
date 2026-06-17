import { Link } from "react-router-dom";
import { CheckCircle, Trophy, Zap, ArrowRight, Clock } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "completed" | "earned" | "streak";
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
  color: string;
}

interface Props {
  tasksCompleted: number;
  streakDays: number;
  verifiedSkills: number;
}

export function RecentActivity({ tasksCompleted, streakDays, verifiedSkills }: Props) {
  const activities: ActivityItem[] = [];

  if (tasksCompleted > 0) {
    activities.push({
      id: "1",
      type: "completed",
      title: "Task Completed",
      description: `You've completed ${tasksCompleted} task${tasksCompleted > 1 ? "s" : ""} so far. Keep going!`,
      timestamp: "recently",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-success",
    });
  }

  if (verifiedSkills > 0) {
    activities.push({
      id: "2",
      type: "earned",
      title: "Skill Verified",
      description: `You've earned ${verifiedSkills} verified skill badge${verifiedSkills > 1 ? "s" : ""}`,
      timestamp: "recently",
      icon: <Trophy className="h-5 w-5" />,
      color: "text-yellow-500",
    });
  }

  if (streakDays > 0) {
    activities.push({
      id: "3",
      type: "streak",
      title: `${streakDays}-Day Streak!`,
      description: `You've been active for ${streakDays} consecutive day${streakDays > 1 ? "s" : ""}`,
      timestamp: "recently",
      icon: <Zap className="h-5 w-5" />,
      color: "text-orange-500",
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Your recent achievements and milestones
          </p>
        </div>
        {activities.length > 0 && (
          <Link
            to="/app/my-work"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {activities.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card px-6 py-8 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">No activity yet</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Complete your first task to start building your story here.
              </p>
            </div>
            <Link
              to="/app/tasks"
              className="mt-1 rounded-xl bg-gradient-primary px-4 py-2 text-xs font-bold text-white shadow-glow"
            >
              Browse Tasks →
            </Link>
          </div>
        ) : (
          activities.map((activity) => (
            <Link
              key={activity.id}
              to="/app/my-work"
              className="block rounded-2xl border border-border bg-card p-4 shadow-card transition-all hover:border-primary hover:shadow-elevated"
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 ${activity.color}`}>{activity.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{activity.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{activity.description}</p>
                </div>
                <span className="text-xs font-medium text-muted-foreground">{activity.timestamp}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
