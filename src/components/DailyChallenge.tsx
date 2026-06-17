import { Link } from "react-router-dom";
import { Zap, ArrowRight, Clock, Gift } from "lucide-react";

export function DailyChallenge() {
  const challenge = {
    title: "JavaScript Fundamentals",
    description: "Complete a quick JS challenge to boost your streak",
    reward: "50 pts + 5× streak multiplier",
    difficulty: "Beginner",
    timeLimit: "15 min",
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-5 shadow-glow">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-6 left-4 h-24 w-24 rounded-full bg-white/8 blur-xl" />

      {/* header row */}
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/25">
          <Zap className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Daily Challenge</p>
          <h3 className="mt-0.5 text-base font-extrabold text-white leading-snug">{challenge.title}</h3>
          <p className="mt-0.5 text-xs text-white/70">{challenge.description}</p>
        </div>
      </div>

      {/* pill tags */}
      <div className="relative mt-4 flex flex-wrap gap-2">
        <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white ring-1 ring-white/20">
          {challenge.difficulty}
        </span>
        <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white ring-1 ring-white/20">
          <Clock className="h-3 w-3" /> {challenge.timeLimit}
        </span>
        <span className="flex items-center gap-1 rounded-full bg-success/30 px-3 py-1 text-[11px] font-bold text-white ring-1 ring-success/30">
          <Gift className="h-3 w-3" /> {challenge.reward}
        </span>
      </div>

      {/* CTA */}
      <Link
        to="/app/tasks"
        className="relative mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3.5 text-sm font-extrabold text-primary shadow-md transition-all hover:bg-white/90 active:scale-[0.98]"
      >
        Accept Challenge <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
