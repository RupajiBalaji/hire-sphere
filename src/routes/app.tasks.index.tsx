import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ScreenHeader } from "@/components/MobileShell";
import { TaskCard } from "@/components/TaskCard";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/lib/api/tasks";

export const Route = createFileRoute("/app/tasks/")({
  component: TaskFeed,
  validateSearch: (search: Record<string, any>) => ({
    q: search.q ?? "",
  }),
});

const filters = ["All", "Design", "Engineering", "Data", "Writing", "Beginner"];

function TaskFeed() {
  const search = Route.useSearch();
  const [active, setActive] = useState("All");
  const [searchQuery, setSearchQuery] = useState(search.q || "");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (search.q) {
      setSearchQuery(search.q);
    }
  }, [search.q]);

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  // Comprehensive search across all fields
  const filteredTasks = tasks.filter((task) => {
    const searchLower = searchQuery.toLowerCase();
    
    const matchesSearch =
      !searchQuery ||
      task.title.toLowerCase().includes(searchLower) ||
      task.company.toLowerCase().includes(searchLower) ||
      task.recruiter.toLowerCase().includes(searchLower) ||
      task.skills.some((s) => s.toLowerCase().includes(searchLower));

    const matchesFilter =
      active === "All" ||
      active === task.difficulty ||
      (active === "Design" && task.skills.some(s => ["Figma", "UI Design", "Prototyping"].includes(s))) ||
      (active === "Engineering" && task.skills.some(s => ["React", "TypeScript", "Node.js"].includes(s))) ||
      (active === "Data" && task.skills.some(s => ["Python", "Pandas", "Data Analysis"].includes(s))) ||
      (active === "Writing" && task.skills.some(s => ["Copywriting", "UX Writing"].includes(s)));

    return matchesSearch && matchesFilter;
  });

  // Get unique suggestions for autocomplete
  const getSuggestions = () => {
    if (!searchQuery || searchQuery.length < 1) return [];
    
    const searchLower = searchQuery.toLowerCase();
    const suggestions = new Set<string>();
    
    tasks.forEach((task) => {
      if (task.company.toLowerCase().includes(searchLower)) {
        suggestions.add(`Company: ${task.company}`);
      }
      if (task.recruiter.toLowerCase().includes(searchLower)) {
        suggestions.add(`Recruiter: ${task.recruiter}`);
      }
      task.skills.forEach((skill) => {
        if (skill.toLowerCase().includes(searchLower)) {
          suggestions.add(`Skill: ${skill}`);
        }
      });
      if (task.title.toLowerCase().includes(searchLower)) {
        suggestions.add(`Task: ${task.title}`);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  };

  const suggestions = getSuggestions();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center px-5 pt-10">
        <p className="text-sm text-muted-foreground">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center px-5 pt-10">
        <p className="text-sm text-destructive">Could not load tasks</p>
      </div>
    );
  }

  return (
    <div>
      <ScreenHeader
        title="Task feed"
        subtitle={`${filteredTasks.length} ${filteredTasks.length === 1 ? "opportunity" : "opportunities"}`}
      />
      <div className="px-5 pt-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search tasks, skills, recruiters, companies"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setShowSuggestions(false);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-border bg-card shadow-elevated z-10">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(suggestion.split(": ")[1] || suggestion);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-muted/50 transition-colors first:rounded-t-xl last:rounded-b-xl text-sm text-muted-foreground hover:text-foreground"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow transition-all hover:shadow-elevated">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-2">
          {filters.map((f) => (
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

        <div className="mt-4 space-y-3 pb-8">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((t) => <TaskCard key={t.id} task={t} />)
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border py-12">
              <Search className="h-8 w-8 text-muted-foreground/50" />
              <div className="text-center">
                <p className="text-sm font-bold text-foreground">No tasks found</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {searchQuery ? "Try adjusting your search query or filters" : "Try searching for tasks, skills, recruiters, or companies"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
