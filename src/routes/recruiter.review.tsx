 import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ScreenHeader } from "@/components/MobileShell";
import { Star, Bookmark, MessageCircle, ExternalLink } from "lucide-react";
import {
  getShortlistedCandidates,
  shortlistCandidate,
  type Candidate,
} from "@/lib/api/recruiter";

export const Route = createFileRoute("/recruiter/review")({
  component: Review,
});

const candidates: Candidate[] = [
  {
    name: "Aanya Verma",
    school: "BITS Pilani · Final year",
    rating: 4.8,
    task: "Landing page concept",
    preview: "linear-gradient(135deg,#2563EB,#6366F1)",
    tags: ["Figma", "UI"],
    note: "Clean hierarchy, sharp typography, ships fast.",
  },
  {
    name: "Rohan Iyer",
    school: "IIT Madras · 3rd year",
    rating: 4.6,
    task: "React dashboard MVP",
    preview: "linear-gradient(135deg,#22C55E,#2563EB)",
    tags: ["React", "TS"],
    note: "Polished interactions, thoughtful state design.",
  },
  {
    name: "Meera Khan",
    school: "Manipal · 2nd year",
    rating: 4.9,
    task: "Brand identity sprint",
    preview: "linear-gradient(135deg,#F59E0B,#EF4444)",
    tags: ["Branding"],
    note: "Bold mark, considered color system, strong instinct.",
  },
];

function Review() {
  const queryClient = useQueryClient();

  const { data: shortlistedCandidates = [] } = useQuery({
    queryKey: ["shortlisted-candidates"],
    queryFn: getShortlistedCandidates,
  });

  const shortlistMutation = useMutation({
    mutationFn: shortlistCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shortlisted-candidates"] });
    },
  });

  return (
    <div>
      <ScreenHeader
        title="Candidate review"
        subtitle={`${candidates.length} new submissions`}
      />

      <div className="space-y-4 px-5 pb-10 pt-4">
        {candidates.map((candidate) => {
          const isShortlisted = shortlistedCandidates.some(
            (item) => item.name === candidate.name,
          );

          return (
            <div
              key={candidate.name}
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-card"
            >
              <div
                className="h-28 w-full"
                style={{ background: candidate.preview }}
              >
                <div className="flex h-full items-end justify-between p-4 text-primary-foreground">
                  <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold backdrop-blur">
                    Submission preview
                  </span>

                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 backdrop-blur"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-primary text-base font-extrabold text-primary-foreground">
                      {candidate.name[0]}
                    </div>

                    <div>
                      <p className="text-sm font-bold">{candidate.name}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {candidate.school}
                      </p>
                    </div>
                  </div>

                  <span className="flex items-center gap-1 rounded-full bg-warning/15 px-2.5 py-1 text-[11px] font-bold text-warning-foreground">
                    <Star className="h-3 w-3 fill-current" />
                    {candidate.rating}
                  </span>
                </div>

                <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  For: {candidate.task}
                </p>

                <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                  {candidate.note}
                </p>

                <div className="mt-3 flex gap-1.5">
                  {candidate.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {isShortlisted && (
                  <p className="mt-4 rounded-xl bg-success/10 px-3 py-2 text-xs font-bold text-success">
                    Candidate added to your shortlist.
                  </p>
                )}

                {shortlistMutation.isError && (
                  <p className="mt-4 rounded-xl bg-destructive/10 px-3 py-2 text-xs font-bold text-destructive">
                    Could not shortlist candidate. Please try again.
                  </p>
                )}

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card text-muted-foreground"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card text-muted-foreground"
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => shortlistMutation.mutate(candidate)}
                    disabled={isShortlisted || shortlistMutation.isPending}
                    className="flex flex-1 items-center justify-center rounded-2xl bg-gradient-primary text-sm font-bold text-primary-foreground shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {shortlistMutation.isPending
                      ? "Shortlisting..."
                      : isShortlisted
                        ? "Shortlisted"
                        : "Shortlist"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}