 import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Clock,
  Zap,
  Bookmark,
  Share2,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { ScreenHeader } from "@/components/MobileShell";
import {
  getTaskById,
  hasSubmittedTask,
  submitTaskSolution,
} from "@/lib/api/tasks";

export const Route = createFileRoute("/app/tasks/$id")({
  component: TaskDetail,
});

function TaskDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id),
  });

  const { data: submitted = false } = useQuery({
    queryKey: ["task-submitted", id],
    queryFn: () => hasSubmittedTask(id),
  });

  const submitMutation = useMutation({
    mutationFn: submitTaskSolution,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task-submitted", id] });
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });

  function handleSubmitSolution() {
    if (!task) {
      return;
    }

    submitMutation.mutate(task);
  }

  if (isLoading) {
    return (
      <div>
        <ScreenHeader
          title="Task details"
          back={
            <button
              type="button"
              onClick={() => navigate({ to: "/app/tasks" })}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          }
        />

        <div className="px-5 pt-6 text-sm text-muted-foreground">
          Loading task...
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div>
        <ScreenHeader
          title="Task details"
          back={
            <button
              type="button"
              onClick={() => navigate({ to: "/app/tasks" })}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          }
        />

        <div className="px-5 pt-6">
          <p className="text-sm font-semibold text-foreground">
            Task not found.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            This task may have been removed or is no longer available.
          </p>
        </div>
      </div>
    );
  }

  const isSubmitted = submitted || submitMutation.isSuccess;

  return (
    <div>
      <ScreenHeader
        title="Task details"
        back={
          <button
            type="button"
            onClick={() => navigate({ to: "/app/tasks" })}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        }
        right={
          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground"
            >
              <Bookmark className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        }
      />

      <div className="px-5 pb-32 pt-5">
        <div
          className="overflow-hidden rounded-3xl p-5 text-primary-foreground shadow-elevated"
          style={{ background: task.accent ?? "var(--gradient-primary)" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-xl font-extrabold backdrop-blur">
              {task.logo}
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
                {task.company}
              </p>
              <p className="text-xs text-white/90">{task.recruiter}</p>
            </div>
          </div>

          <h2 className="mt-4 text-xl font-extrabold leading-tight tracking-tight text-balance">
            {task.title}
          </h2>

          <div className="mt-4 flex gap-2 text-[11px] font-bold">
            <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">
              {task.difficulty}
            </span>

            <span className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 backdrop-blur">
              <Clock className="h-3 w-3" /> {task.time}
            </span>

            <span className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 backdrop-blur">
              <Zap className="h-3 w-3" /> {task.deadline}
            </span>
          </div>
        </div>

        <Section title="About this task">
          <p className="text-sm leading-relaxed text-muted-foreground">
            We're rebuilding the landing experience for our new flagship product.
            Your task is to craft a high-conversion landing page concept — hero,
            value props, social proof, and CTA. Bring your taste, defend your
            decisions, and make it feel premium.
          </p>
        </Section>

        <Section title="Required skills">
          <div className="flex flex-wrap gap-2">
            {task.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Submission guidelines">
          <ul className="space-y-2.5">
            {[
              "Figma file or hosted prototype link",
              "100-word rationale for layout decisions",
              "Mobile + desktop frames at minimum",
            ].map((guideline) => (
              <li
                key={guideline}
                className="flex items-start gap-2.5 text-sm text-foreground"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                {guideline}
              </li>
            ))}
          </ul>
        </Section>

        {isSubmitted && (
          <div className="mt-6 rounded-2xl border border-success/30 bg-success/10 p-4">
            <p className="text-sm font-bold text-success">
              Your solution has been submitted.
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              This task is now saved in your submissions list with the status
              Under review.
            </p>
          </div>
        )}

        {submitMutation.isError && (
          <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/10 p-4">
            <p className="text-sm font-bold text-destructive">
              Could not submit your solution. Please try again.
            </p>
          </div>
        )}

        <Section title="Recruiter">
          <Link
            to="/app/profile"
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm"
          >
            <div className="h-11 w-11 rounded-2xl bg-gradient-primary" />

            <div className="flex-1">
              <p className="text-sm font-bold">{task.recruiter}</p>
              <p className="text-xs text-muted-foreground">
                {task.company} · Verified recruiter ✓
              </p>
            </div>

            <FileText className="h-4 w-4 text-muted-foreground" />
          </Link>
        </Section>
      </div>

      <div className="fixed bottom-[76px] left-1/2 z-20 w-full max-w-[440px] -translate-x-1/2 px-5">
        <button
          type="button"
          onClick={handleSubmitSolution}
          disabled={isSubmitted || submitMutation.isPending}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-glow active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitMutation.isPending
            ? "Submitting..."
            : isSubmitted
              ? "Submitted for review"
              : "Submit your solution"}
        </button>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </h3>
      <div className="mt-2">{children}</div>
    </section>
  );
}