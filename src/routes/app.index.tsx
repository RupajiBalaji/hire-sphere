import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search, Bell } from "lucide-react";
import { useState } from "react";
import { ProgressCard } from "@/components/ProgressCard";
import { QuickStats } from "@/components/QuickStats";
import { FeaturedTasks } from "@/components/FeaturedTasks";
import { SuggestedSkills } from "@/components/SuggestedSkills";
import { RecentActivity } from "@/components/RecentActivity";
import { RecruiterOpportunities } from "@/components/RecruiterOpportunities";
import { DailyChallenge } from "@/components/DailyChallenge";
import { getCurrentUser } from "@/lib/api/auth";
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

  const displayName = user?.name?.split(" ")[0] ?? user?.email?.split("@")[0] ?? "there";

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
      <header className="bg-gradient-hero px-5 pb-10 pt-10 text-primary-foreground">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight">
              Hey {displayName} 👋
            </h1>
            <p className="mt-1 text-sm text-white/85">
              You're 2 tasks away from <span className="font-bold">Verified Skill</span>.
            </p>
          </div>

          <Link
            to="/app/notifications"
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur transition-all hover:bg-white/20"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-success ring-2 ring-primary" />
          </Link>
        </div>

        <form onSubmit={handleSearch} className="mt-6 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3.5 text-foreground shadow-elevated">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search tasks, skills, recruiters"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="rounded-lg bg-muted px-2 py-1 text-[10px] font-bold text-muted-foreground hover:bg-muted/80 transition-all"
          >
            ⌘K
          </button>
        </form>
      </header>

      {/* Main Content */}
      <div className="space-y-6 px-5 py-6">
        {/* Progress Card */}
        <ProgressCard />

        {/* Quick Stats */}
        <QuickStats />

        {/* Daily Challenge */}
        <DailyChallenge />

        {/* Featured/Recommended Tasks */}
        <FeaturedTasks tasks={tasks} />

        {/* Suggested Skills */}
        <SuggestedSkills />

        {/* Recent Activity Feed */}
        <RecentActivity />

        {/* Recruiter Opportunities */}
        <RecruiterOpportunities />
      </div>
    </div>
  );
}