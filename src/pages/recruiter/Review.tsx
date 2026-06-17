import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ScreenHeader } from "@/components/MobileShell";
import { Users } from "lucide-react";
import { getSubmissions } from "@/lib/api/tasks";

export function Review() {
  const navigate = useNavigate();

  const { data: submissions = [] } = useQuery({
    queryKey: ["submissions"],
    queryFn: getSubmissions,
  });

  return (
    <div>
      <ScreenHeader
        title="Candidate review"
        subtitle={submissions.length > 0 ? `${submissions.length} new submission${submissions.length > 1 ? "s" : ""}` : "No submissions"}
      />

      <div className="space-y-4 px-5 pb-10 pt-4">
        {submissions.length === 0 ? (
          <div className="space-y-4 pt-4">
            <div className="rounded-3xl border border-dashed border-border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-foreground">No candidate submissions yet</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed max-w-[280px] mx-auto">
                Once students start submitting solutions to your posted tasks, their profiles and work will appear here.
              </p>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mt-4 mb-2">Outline Tasks (Expected Applications)</p>
            {[1, 2].map((i) => (
              <div key={i} className="rounded-3xl border border-dashed border-border bg-card/50 p-5" style={{ opacity: 1 - (i - 1) * 0.3 }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-muted/40 animate-pulse" />
                    <div>
                      <div className="h-3 w-28 rounded-full bg-muted/50 animate-pulse mb-1.5" />
                      <div className="h-2 w-20 rounded-full bg-muted/30 animate-pulse" />
                    </div>
                  </div>
                  <div className="h-5 w-12 rounded-full bg-muted/30 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => {
              const candidateName = "Student Applicant";
              const candidateSchool = "Self-Taught Developer";
              return (
                <div key={submission.taskId} className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
                  <div className="h-24 w-full bg-gradient-primary">
                    <div className="flex h-full items-end justify-between p-4 text-primary-foreground">
                      <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold backdrop-blur">Submitted solution</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-primary text-base font-extrabold text-primary-foreground">{candidateName[0]}</div>
                        <div>
                          <p className="text-sm font-bold">{candidateName}</p>
                          <p className="text-[11px] text-muted-foreground">{candidateSchool}</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-success/15 px-2.5 py-1 text-[10px] font-bold text-success">{submission.status}</span>
                    </div>
                    <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">For: {submission.taskTitle}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Company: {submission.company} · Submitted {new Date(submission.submittedAt).toLocaleDateString()}</p>
                    <div className="mt-4 flex gap-2">
                      <button type="button" onClick={() => navigate(`/app/tasks/${submission.taskId}`)}
                        className="flex flex-1 items-center justify-center rounded-2xl bg-gradient-primary py-2.5 text-xs font-bold text-primary-foreground shadow-glow">
                        View task details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
