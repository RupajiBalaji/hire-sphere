import { Link } from "@tanstack/react-router";
import { Trophy, Flame, Award, Target } from "lucide-react";
import { getLevel } from "@/lib/api/userStats";

interface Props {
  tasksCompleted: number;
  verifiedSkills: number;
  streakDays: number;
  pointsEarned: number;
}

export function QuickStats({ tasksCompleted, verifiedSkills, streakDays, pointsEarned }: Props) {
  const { level, progress, toNext } = getLevel(pointsEarned);
  const levelPct = pointsEarned > 0 ? Math.round((progress / 500) * 100) : 0;

  return (
    <div className="space-y-3">
      {/* Top row */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={<Trophy className="h-5 w-5" />}
          iconBg="bg-amber-100 text-amber-500"
          label="Completed"
          value={String(tasksCompleted)}
          sub="tasks"
        />
        <StatCard
          icon={<Award className="h-5 w-5" />}
          iconBg="bg-blue-100 text-blue-500"
          label="Verified Skills"
          value={String(verifiedSkills)}
          sub="badges earned"
        />
      </div>

      {/* Streak */}
      <Link
        to="/app/my-work"
        className="flex items-center gap-4 rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-4 shadow-sm transition-all hover:shadow-elevated"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100">
          <Flame className="h-6 w-6 text-orange-500" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400">Current Streak</p>
          {streakDays > 0 ? (
            <p className="text-2xl font-extrabold text-orange-600 leading-tight">
              {streakDays} <span className="text-base font-semibold">days</span>
            </p>
          ) : (
            <p className="text-sm font-semibold text-orange-400">Complete a task to start your streak</p>
          )}
        </div>
        {/* 7-day bar */}
        <div className="flex gap-1">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`h-6 w-1.5 rounded-full ${i < streakDays ? "bg-orange-400" : "bg-orange-100"}`}
            />
          ))}
        </div>
      </Link>

      {/* Points */}
      <Link
        to="/app/my-work"
        className="flex items-center gap-4 rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50 px-5 py-4 shadow-sm transition-all hover:shadow-elevated"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100">
          <Target className="h-6 w-6 text-purple-500" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400">Points Earned</p>
          <p className="text-2xl font-extrabold text-purple-700 leading-tight">
            {pointsEarned > 0 ? pointsEarned.toLocaleString() : "0"}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] font-semibold text-purple-400">Lvl {level}</span>
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-purple-100">
            <div
              className="h-full rounded-full bg-purple-400 transition-all duration-500"
              style={{ width: `${levelPct}%` }}
            />
          </div>
          {pointsEarned > 0 ? (
            <span className="text-[9px] text-purple-300">{toNext} to Lvl {level + 1}</span>
          ) : (
            <span className="text-[9px] text-purple-300">Earn points by completing tasks</span>
          )}
        </div>
      </Link>
    </div>
  );
}

function StatCard({
  icon, iconBg, label, value, sub,
}: { icon: React.ReactNode; iconBg: string; label: string; value: string; sub: string }) {
  return (
    <Link
      to="/app/my-work"
      className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-card transition-all hover:shadow-elevated hover:border-primary/40"
    >
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-2xl font-extrabold text-foreground leading-tight">{value}</p>
        <p className="text-[10px] text-muted-foreground">{sub}</p>
      </div>
    </Link>
  );
}
