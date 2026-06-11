import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search, Settings } from "lucide-react";
import { useState } from "react";
import { ProgressCard } from "@/components/ProgressCard";
import { QuickStats } from "@/components/QuickStats";
import { FeaturedTasks } from "@/components/FeaturedTasks";
import { SuggestedSkills } from "@/components/SuggestedSkills";
import { RecentActivity } from "@/components/RecentActivity";
import { RecruiterOpportunities } from "@/components/RecruiterOpportunities";
import { DailyChallenge } from "@/components/DailyChallenge";
import { getCurrentUser } from "@/lib/api/auth";
import { getFullProfile } from "@/lib/api/profile";
import { getUserStats } from "@/lib/api/userStats";
import { getTasks } from "@/lib/api/tasks";

export const Route = createFileRoute("/app/")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const { data: user } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });

  const { data: profile } = useQuery({
    queryKey: ["full-profile"],
    queryFn: getFullProfile,
  });

  const { data: stats } = useQuery({
    queryKey: ["user-stats"],
    queryFn: getUserStats,
  });

  const displayName = user?.name?.split(" ")[0] ?? user?.email?.split("@")[0] ?? "there";
  const initial = (user?.name || user?.email || "U").charAt(0).toUpperCase();
  const userSkills = profile?.skills ?? [];

  // real stats — zero until earned
  const tasksCompleted = stats?.tasksCompleted ?? 0;
  const verifiedSkills = stats?.verifiedSkills ?? 0;
  const streakDays = stats?.streakDays ?? 0;
  const pointsEarned = stats?.pointsEarned ?? 0;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate({
        to: "/app/tasks",
        search: { q: searchInput },
      });
    } else {
      navigate({ to: "/app/tasks" });
    }
  };

  if (isLoading) {
    return (
      <div className="px-5 pt-10 text-sm text-muted-foreground">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-5 pt-10 text-sm text-destructive">
        Could not load dashboard tasks.
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-4">
      {/* Header Section */}
      <header className="bg-gradient-hero px-5 pb-16 pt-10 text-primary-foreground">
        <div className="flex items-center gap-3">
          {/* Left: profile avatar */}
          <Link
            to="/app/profile"
            className="relative flex-shrink-0"
            aria-label="View profile"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/25 text-lg font-extrabold text-white ring-2 ring-white/40 backdrop-blur transition-transform hover:scale-105 overflow-hidden">
              {profile?.avatar ? (
                <img src={profile.avatar} alt={user?.name ?? "Profile"} className="h-full w-full object-cover" />
              ) : (
                initial
              )}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-primary bg-success" />
          </Link>

          {/* Greeting — full width */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
            <h1 className="mt-0.5 text-[22px] font-extrabold tracking-tight leading-tight">
              Hey {displayName} 👋
            </h1>
            <p className="mt-0.5 text-xs text-white/75">
              2 tasks away from <span className="font-bold text-white">Verified Skill</span>
            </p>
          </div>

          <Link
            to="/app/settings"
            aria-label="Candidate settings"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 transition-colors hover:bg-white/25"
          >
            <Settings className="h-4 w-4 text-white" />
          </Link>
        </div>

        <form onSubmit={handleSearch} className="mt-5 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-foreground shadow-elevated">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search tasks, skills, recruiters…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
          />
          <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">⌘K</kbd>
        </form>
      </header>

      {/* Cards overlap the header */}
      <div className="-mt-8 space-y-4 px-4 pb-6">
        {/* Progress Card */}
        <ProgressCard tasksCompleted={tasksCompleted} />

        {/* Quick Stats */}
        <QuickStats
          tasksCompleted={tasksCompleted}
          verifiedSkills={verifiedSkills}
          streakDays={streakDays}
          pointsEarned={pointsEarned}
        />

        {/* Daily Challenge */}
        <DailyChallenge />

        {/* Featured/Recommended Tasks */}
        <FeaturedTasks tasks={tasks} userSkills={userSkills} />

        {/* Suggested Skills */}
        <SuggestedSkills tasks={tasks} userSkills={userSkills} />

        {/* Recent Activity Feed */}
        <RecentActivity
          tasksCompleted={tasksCompleted}
          streakDays={streakDays}
          verifiedSkills={verifiedSkills}
        />

        {/* Recruiter Opportunities */}
        <RecruiterOpportunities />
      </div>
    </div>
  );
}
