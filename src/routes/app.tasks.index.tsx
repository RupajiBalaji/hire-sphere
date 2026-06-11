import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X, ListChecks, Clock, Zap } from "lucide-react";
import { ScreenHeader } from "@/components/MobileShell";
import { TaskCard } from "@/components/TaskCard";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/lib/api/tasks";

export const Route = createFileRoute("/app/tasks/")({
  component: TaskFeed,
  validateSearch: (search: Record<string, unknown>) => ({
    q: (search.q as string) ?? "",
  }),
});

const FILTERS = ["All", "Design", "Engineering", "Data", "Writing", "Beginner"];

function TaskFeed() {
  const search = Route.useSearch();
  const [active, setActive] = useState("All");
  const [searchQuery, setSearchQuery] = useState(search.q || "");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (search.q) setSearchQuery(search.q);
  }, [search.q]);

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const filteredTasks = tasks.filter((task) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      task.title.toLowerCase().includes(q) ||
      task.company.toLowerCase().includes(q) ||
      task.recruiter.toLowerCase().includes(q) ||
      task.skills.some((s) => s.toLowerCase().includes(q));

    const matchesFilter =
      active === "All" ||
      active === task.difficulty ||
      (active === "Design" && task.skills.some((s) => ["Figma", "UI Design", "Prototyping", "Branding", "Illustrator"].includes(s))) ||
      (active === "Engineering" && task.skills.some((s) => ["React", "TypeScript", "Node.js", "Charts"].includes(s))) ||
      (active === "Data" && task.skills.some((s) => ["Python", "Pandas", "Data Analysis", "Storytelling"].includes(s))) ||
      (active === "Writing" && task.skills.some((s) => ["Copywriting", "UX Writing"].includes(s)));

    return matchesSearch && matchesFilter;
  });

  const suggestions = (() => {
    if (!searchQuery || searchQuery.length < 1) return [];
    const q = searchQuery.toLowerCase();
    const set = new Set<string>();
    tasks.forEach((t) => {
      if (t.company.toLowerCase().includes(q)) set.add(`Company: ${t.company}`);
      if (t.recruiter.toLowerCase().includes(q)) set.add(`Recruiter: ${t.recruiter}`);
      t.skills.forEach((s) => { if (s.toLowerCase().includes(q)) set.add(`Skill: ${s}`); });
      if (t.title.toLowerCase().includes(q)) set.add(`Task: ${t.title}`);
    });
    return Array.from(set).slice(0, 5);
  })();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center px-5 pt-20 gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading tasks…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center px-5 pt-10">
        <p className="text-sm text-destructive">Could not load tasks.</p>
      </div>
    );
  }

  return (
    <div>
      <ScreenHeader
        title="Task Feed"
        subtitle={
          tasks.length > 0
            ? `${filteredTasks.length} ${filteredTasks.length === 1 ? "opportunity" : "opportunities"}`
            : "Tasks posted by recruiters appear here"
        }
      />

      <div className="px-5 pt-4">
        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                placeholder="Search tasks, skills, companies…"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(""); setShowSuggestions(false); }}>
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-10 mt-2 overflow-hidden rounded-2xl border border-border bg-card shadow-elevated">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => { setSearchQuery(s.split(": ")[1] || s); setShowSuggestions(false); }}
                    className="w-full px-4 py-2.5 text-left text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors first:rounded-t-xl last:rounded-b-xl"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Filter pills */}
        <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                active === f
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task list or empty state */}
        <div className="mt-4 space-y-3 pb-8">
          {tasks.length === 0 ? (
            // No tasks posted yet — show what this section does
            <EmptyTaskFeed />
          ) : filteredTasks.length === 0 ? (
            // Tasks exist but none match the filter/search
            <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border py-12 text-center">
              <Search className="h-8 w-8 text-muted-foreground/40" />
              <div>
                <p className="text-sm font-bold text-foreground">No tasks match</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try adjusting your search or filter.
                </p>
              </div>
            </div>
          ) : (
            filteredTasks.map((t) => <TaskCard key={t.id} task={t} />)
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Empty state ── */
function EmptyTaskFeed() {
  return (
    <div className="space-y-4 pt-2">
      {/* What this section does */}
      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
            <ListChecks className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Task Feed</p>
            <p className="text-xs text-muted-foreground">How it works</p>
          </div>
        </div>
        <div className="space-y-2.5">
          {[
            { icon: <ListChecks className="h-4 w-4 text-primary" />, text: "Recruiters post real tasks from their companies" },
            { icon: <Zap className="h-4 w-4 text-amber-500" />,     text: "You pick a task, complete it, and submit your work" },
            { icon: <Clock className="h-4 w-4 text-success" />,     text: "Get reviewed, earn skill badges, and get hired" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0">{icon}</span>
              <p className="text-xs leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ghost card outlines — show the shape of what's coming */}
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground px-1">
        Waiting for recruiters to post tasks
      </p>

      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-3xl border border-dashed border-border bg-card p-5"
          style={{ opacity: 1 - i * 0.2 }}
        >
          {/* company row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl border border-dashed border-border bg-muted/40" />
              <div className="space-y-1.5">
                <div className="h-2 w-20 rounded-full bg-muted/60" />
                <div className="h-2 w-14 rounded-full bg-muted/40" />
              </div>
            </div>
            <div className="h-5 w-16 rounded-full bg-muted/40" />
          </div>
          {/* title */}
          <div className="mt-4 space-y-2">
            <div className="h-3 w-full rounded-full bg-muted/50" />
            <div className="h-3 w-4/5 rounded-full bg-muted/40" />
          </div>
          {/* skill tags */}
          <div className="mt-3 flex gap-1.5">
            <div className="h-5 w-12 rounded-full bg-muted/40" />
            <div className="h-5 w-16 rounded-full bg-muted/35" />
            <div className="h-5 w-10 rounded-full bg-muted/30" />
          </div>
          {/* footer */}
          <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
            <div className="h-2.5 w-10 rounded-full bg-muted/40" />
            <div className="h-2.5 w-12 rounded-full bg-muted/40" />
            <div className="h-2.5 w-10 rounded-full bg-primary/20" />
          </div>
        </div>
      ))}
    </div>
  );
}
