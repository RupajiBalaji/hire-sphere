import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { ArrowRight, Award, Rocket, Target } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

const slides = [
  {
    icon: Target,
    eyebrow: "Step 1",
    title: "Show your skills, not just your résumé.",
    body: "Build a profile that grows with every task you complete.",
    art: <SkillsArt />,
  },
  {
    icon: Rocket,
    eyebrow: "Step 2",
    title: "Complete real tasks from recruiters.",
    body: "Practical challenges from real companies — sized for your week.",
    art: <TasksArt />,
  },
  {
    icon: Award,
    eyebrow: "Step 3",
    title: "Get discovered through your work.",
    body: "Recruiters reach out when your submissions stand out.",
    art: <GrowthArt />,
  },
];

function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const Slide = slides[step];
  const last = step === slides.length - 1;

  return (
    <MobileShell>
      <div className="flex flex-1 flex-col px-6 pb-10 pt-6 bg-gradient-to-br from-blue-50 to-white">
        {/* Progress indicator - Enhanced */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === step ? "w-10 bg-gradient-to-r from-blue-600 to-purple-600 shadow-md" : "w-5 bg-gray-300"
                }`}
              />
            ))}
          </div>
          <Link to="/role" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Skip
          </Link>
        </div>

        <div className="mt-6 flex flex-1 flex-col">
          {/* Art section */}
          <div className="mx-auto flex h-72 w-full max-w-sm items-center justify-center mb-10">
            {Slide.art}
          </div>

          {/* Content section - Enhanced */}
          <div className="mt-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 text-xs font-bold text-blue-700 border border-blue-200/50 shadow-sm">
              <Slide.icon className="h-4 w-4" /> 
              <span className="tracking-wider">{Slide.eyebrow}</span>
            </div>
            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-gray-900 text-balance" style={{ letterSpacing: '-0.02em' }}>
              {Slide.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600 font-medium">{Slide.body}</p>
          </div>
        </div>

        {/* Button - Enhanced */}
        <button
          onClick={() => (last ? navigate({ to: "/role" }) : setStep((s) => s + 1))}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-base font-bold text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 border border-blue-500/50"
        >
          {last ? "Continue" : "Next"} <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </MobileShell>
  );
}

function SkillsArt() {
  const chips = ["React", "Figma", "Python", "Copywriting", "Data", "Branding"];
  return (
    <div className="relative h-full w-full rounded-[2rem] bg-gradient-soft p-6">
      <div className="absolute inset-x-6 top-6 rounded-2xl bg-white/80 p-4 shadow-card backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-primary" />
          <div>
            <p className="text-sm font-bold">Aanya · Fresher</p>
            <p className="text-xs text-muted-foreground">Skill score 84 / 100</p>
          </div>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[84%] rounded-full bg-gradient-primary" />
        </div>
      </div>
      <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
        {chips.map((c, i) => (
          <span
            key={c}
            className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-foreground shadow-card"
            style={{ transform: `rotate(${(i - 2) * 1.5}deg)` }}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function TasksArt() {
  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-br from-blue-50 via-blue-100 to-purple-100 p-6 border border-blue-200/50 shadow-xl">
      {/* Title inside blue box */}
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">Available Tasks</p>
        <h3 className="text-base font-black text-gray-900" style={{ letterSpacing: '-0.02em' }}>Real Projects</h3>
      </div>
      
      {/* 3 Cards stacked vertically in blue box - NO OVERLAP */}
      <div className="space-y-2.5">
        {[
          { t: "Design landing page", c: "#2563EB", d: "Notion-style", xp: "+240 XP" },
          { t: "Build React dashboard", c: "#6366F1", d: "Stripeful", xp: "+340 XP" },
          { t: "Write onboarding copy", c: "#22C55E", d: "Lumen Pay", xp: "+180 XP" },
        ].map((task) => (
          <div
            key={task.t}
            className="flex items-center justify-between rounded-xl bg-white/95 p-3 shadow-sm hover:shadow-md transition-all hover:bg-white border border-white/80 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <div 
                className="h-8 w-8 rounded-lg flex-shrink-0 shadow-sm" 
                style={{ background: task.c }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-bold uppercase tracking-wider text-gray-600 mb-0.5">{task.d}</p>
                <p className="text-xs font-bold text-gray-900 truncate">{task.t}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5 flex-shrink-0 ml-2">
              <span className="rounded-full bg-green-100/80 px-2 py-0.5 text-[8px] font-bold text-green-700 border border-green-200 whitespace-nowrap">Live</span>
              <span className="text-[8px] font-semibold text-blue-600 whitespace-nowrap">{task.xp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="mt-4 pt-3 border-t border-blue-200/40">
        <p className="text-[9px] font-semibold text-gray-600 text-center">More tasks added weekly →</p>
      </div>
    </div>
  );
}

function GrowthArt() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-gradient-soft p-6">
      <svg viewBox="0 0 260 180" className="absolute inset-x-6 top-8">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0" stopColor="#2563EB" />
            <stop offset="1" stopColor="#22C55E" />
          </linearGradient>
        </defs>
        <path
          d="M0 150 C 50 120, 80 130, 120 90 S 200 30, 260 20"
          fill="none"
          stroke="url(#g)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {[
          [20, 140],
          [80, 118],
          [140, 80],
          [200, 50],
          [248, 24],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#fff" stroke="#2563EB" strokeWidth="2.5" />
        ))}
      </svg>
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-white/90 p-3 shadow-card backdrop-blur">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Profile views</p>
          <p className="text-lg font-extrabold text-foreground">+ 312 %</p>
        </div>
        <div className="flex -space-x-2">
          {["#2563EB", "#6366F1", "#22C55E", "#F59E0B"].map((c) => (
            <div key={c} className="h-7 w-7 rounded-full ring-2 ring-white" style={{ background: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}
