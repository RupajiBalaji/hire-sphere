const STATS_KEY = "hiresphere_user_stats";

export type UserStats = {
  tasksCompleted: number;   // tasks the user has actually submitted/completed
  verifiedSkills: number;   // skills verified through completed task sets
  streakDays: number;       // consecutive days active
  pointsEarned: number;     // total points
  lastActiveDate: string;   // ISO date string — used to compute streak
};

const DEFAULT_STATS: UserStats = {
  tasksCompleted: 0,
  verifiedSkills: 0,
  streakDays: 0,
  pointsEarned: 0,
  lastActiveDate: "",
};

export async function getUserStats(): Promise<UserStats> {
  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (!stored) return { ...DEFAULT_STATS };
    return { ...DEFAULT_STATS, ...(JSON.parse(stored) as Partial<UserStats>) };
  } catch {
    return { ...DEFAULT_STATS };
  }
}

export async function saveUserStats(stats: Partial<UserStats>): Promise<UserStats> {
  const current = await getUserStats();
  const updated = { ...current, ...stats };
  localStorage.setItem(STATS_KEY, JSON.stringify(updated));
  return updated;
}

/** Call when a task is submitted — increments completed count, points, updates streak */
export async function recordTaskCompletion(pointsForTask = 100): Promise<UserStats> {
  const stats = await getUserStats();
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  let newStreak = stats.streakDays;
  if (stats.lastActiveDate) {
    const last = new Date(stats.lastActiveDate);
    const diff = Math.floor((Date.now() - last.getTime()) / 86_400_000);
    if (diff === 0) {
      // already active today — don't increment streak again
    } else if (diff === 1) {
      newStreak += 1; // consecutive day
    } else {
      newStreak = 1; // streak broken, restart
    }
  } else {
    newStreak = 1; // first ever task
  }

  // every 5 tasks earns a verified skill
  const newCompleted = stats.tasksCompleted + 1;
  const newVerified = Math.floor(newCompleted / 5);

  return saveUserStats({
    tasksCompleted: newCompleted,
    verifiedSkills: newVerified,
    streakDays: newStreak,
    pointsEarned: stats.pointsEarned + pointsForTask,
    lastActiveDate: today,
  });
}

/** Compute the level from total points (every 500 pts = 1 level) */
export function getLevel(points: number): { level: number; progress: number; toNext: number } {
  const level = Math.floor(points / 500) + 1;
  const progress = points % 500;
  const toNext = 500 - progress;
  return { level, progress, toNext };
}
