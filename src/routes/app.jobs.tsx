import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BriefcaseBusiness, MapPin, ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import { ScreenHeader } from "@/components/MobileShell";
import { getFullProfile } from "@/lib/api/profile";
import { useState } from "react";

export const Route = createFileRoute("/app/jobs")({
  component: Jobs,
});

/* ── types ── */
type Job = {
  id: string;
  company: string;
  logo: string;
  logoColor: string;
  role: string;
  location: string;
  type: "Full-time" | "Part-time" | "Freelance" | "Internship";
  skills: string[];
  match?: number; // percentage, only shown if user has skills
  postedAt: string;
};

const TYPE_COLORS: Record<Job["type"], string> = {
  "Full-time":  "bg-blue-100 text-blue-600",
  "Part-time":  "bg-purple-100 text-purple-600",
  "Freelance":  "bg-amber-100 text-amber-600",
  "Internship": "bg-success/15 text-success",
};

const FILTERS: Job["type"][] = ["Full-time", "Part-time", "Freelance", "Internship"];

function Jobs() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<Job["type"] | "All">("All");

  const { data: profile } = useQuery({
    queryKey: ["full-profile"],
    queryFn: getFullProfile,
  });

  const userSkills = profile?.skills ?? [];

  // Derive match % from overlapping skills
  function matchPct(jobSkills: string[]) {
    if (!userSkills.length) return undefined;
    const normalised = userSkills.map((s) => s.toLowerCase());
    const hits = jobSkills.filter((s) => normalised.includes(s.toLowerCase())).length;
    return Math.round((hits / jobSkills.length) * 100);
  }

  // No hardcoded jobs — empty until recruiters post
  const jobs: Job[] = [];

  const filtered = jobs
    .filter((j) => activeFilter === "All" || j.type === activeFilter)
    .filter((j) =>
      !search.trim() ||
      j.role.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
    )
    .map((j) => ({ ...j, match: matchPct(j.skills) }))
    .sort((a, b) => (b.match ?? 0) - (a.match ?? 0));

  return (
    <div className="pb-24">
      <ScreenHeader title="Jobs" />

      {/* search + filter */}
      <div className="px-4 pt-4 space-y-3">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roles, companies, skills…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          )}
        </div>

        {/* filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveFilter("All")}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeFilter === "All"
                ? "bg-gradient-primary text-white shadow-glow"
                : "border border-border bg-card text-muted-foreground"
            }`}
          >
            All
          </button>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeFilter === f
                  ? "bg-gradient-primary text-white shadow-glow"
                  : "border border-border bg-card text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
          <button className="ml-auto shrink-0 flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
          </button>
        </div>
      </div>

      {/* job list */}
      <div className="mt-4 px-4 space-y-3">
        {filtered.length > 0 ? (
          filtered.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <EmptyJobs hasSearch={!!search.trim()} />
        )}
      </div>
    </div>
  );
}

/* ── Job card ── */
function JobCard({ job }: { job: Job & { match?: number } }) {
  return (
    <Link
      to="/app/tasks"
      className="block rounded-3xl border border-border bg-card p-4 shadow-card transition-all hover:border-primary/50 hover:shadow-elevated"
    >
      <div className="flex items-start gap-3">
        {/* logo */}
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-base font-extrabold text-white shadow-sm"
          style={{ background: job.logoColor }}
        >
          {job.logo}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground truncate">
                {job.company}
              </p>
              <p className="mt-0.5 text-sm font-bold text-foreground leading-snug">{job.role}</p>
            </div>
            {job.match !== undefined && (
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                job.match >= 80 ? "bg-success/15 text-success" :
                job.match >= 50 ? "bg-warning/15 text-warning-foreground" :
                "bg-muted text-muted-foreground"
              }`}>
                {job.match}% match
              </span>
            )}
          </div>

          <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {job.location}
            </span>
            <span className={`rounded-full px-2 py-0.5 font-semibold ${TYPE_COLORS[job.type]}`}>
              {job.type}
            </span>
          </div>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {job.skills.map((s) => (
              <span key={s} className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
        <span className="text-[10px] text-muted-foreground">{job.postedAt}</span>
        <span className="flex items-center gap-1 text-xs font-bold text-primary">
          Apply <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

/* ── Empty state ── */
function EmptyJobs({ hasSearch }: { hasSearch: boolean }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card px-6 py-14 text-center">
      {/* placeholder cards behind icon — depth effect */}
      <div className="relative flex items-center justify-center">
        <div className="absolute -left-4 top-2 h-14 w-36 rounded-2xl border border-dashed border-border bg-muted/30 rotate-[-6deg]" />
        <div className="absolute -right-4 top-2 h-14 w-36 rounded-2xl border border-dashed border-border bg-muted/30 rotate-[6deg]" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-soft ring-2 ring-primary/20 shadow-sm">
          <BriefcaseBusiness className="h-8 w-8 text-primary" />
        </div>
      </div>

      <div>
        <p className="text-base font-bold text-foreground">
          {hasSearch ? "No jobs match your search" : "No jobs posted yet"}
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          {hasSearch
            ? "Try a different keyword or remove filters."
            : "Job listings will appear here once recruiters join and post opportunities. Check back soon!"}
        </p>
      </div>

      {!hasSearch && (
        <div className="w-full space-y-2">
          {/* ghost card outlines so the space looks intentional */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border border-dashed border-border/60 bg-muted/20 px-4 py-4">
              <div className="h-12 w-12 shrink-0 rounded-2xl border border-dashed border-border bg-muted/30" />
              <div className="flex-1 space-y-2">
                <div className="h-2.5 w-24 rounded-full bg-muted/50" />
                <div className="h-3 w-40 rounded-full bg-muted/40" />
                <div className="flex gap-1.5">
                  <div className="h-4 w-14 rounded-full bg-muted/40" />
                  <div className="h-4 w-16 rounded-full bg-muted/30" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        to="/app/edit-profile"
        className="mt-2 flex items-center gap-2 rounded-2xl bg-gradient-primary px-5 py-3 text-xs font-bold text-white shadow-glow"
      >
        Complete your profile to get matched
      </Link>
    </div>
  );
}
