import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { MobileShell } from "@/components/MobileShell";
import { ArrowRight, Sparkles, CheckCircle, Users, Zap, Target, Award, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HireSphere — Skill. Prove. Hire." },
      { name: "description", content: "Task-based hiring for freshers and students. Prove skills with real recruiter challenges." },
    ],
    links: [
      {
        rel: "icon",
        type: "image/jpeg",
        href: "/hiresphere-logo.jpeg",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();

  return (
    <MobileShell>
      <div className="relative flex flex-1 flex-col overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-primary-foreground">
        {/* Decorative orbs with enhanced blur */}
        <div className="pointer-events-none absolute -left-20 top-5 h-48 w-48 rounded-full bg-white/10 blur-3xl opacity-60" />
        <div className="pointer-events-none absolute -right-16 top-1/3 h-56 w-56 rounded-full bg-purple-400/20 blur-3xl opacity-60" />

        {/* Top Navigation Bar - Enhanced */}
        <div className="relative z-30 flex items-center justify-between px-6 pt-3 pb-2 border-b border-white/10 backdrop-blur-md">
          <Logo className="h-8 w-8" />
          <span className="flex items-center gap-1 rounded-full bg-white/25 px-3 py-1 text-[10px] font-bold backdrop-blur-lg border border-white/40 shadow-lg hover:bg-white/35 transition-all">
            <Sparkles className="h-3 w-3" /> 
            <span>Premium</span>
          </span>
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex flex-1 flex-col px-5 py-4 justify-between">
          
          {/* Hero Section */}
          <div className="space-y-5">
            
            {/* Hero Illustration: Enhanced with better shadows */}
            <div className="flex justify-center">
              <div className="relative h-48 w-full max-w-sm">
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/20 to-white/5 blur-3xl" />
                
                {/* Main Task Card - Enhanced */}
                <div className="absolute left-1/2 top-0 w-44 -translate-x-1/2 -rotate-6 rounded-2xl bg-white/98 p-3 text-foreground shadow-2xl backdrop-blur-xl border border-white/60 transform transition-all hover:shadow-3xl hover:-rotate-3 hover:scale-105">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-md">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-[8px] font-bold uppercase tracking-wider text-gray-700">Task · Dev</div>
                  </div>
                  <p className="mt-2 text-xs font-bold text-gray-900">Build React Dashboard</p>
                  <div className="mt-2 flex gap-1">
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[7px] font-semibold text-blue-700 hover:bg-blue-200 transition-colors">React</span>
                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[7px] font-semibold text-purple-700 hover:bg-purple-200 transition-colors">TS</span>
                  </div>
                </div>

                {/* Completion Card - Enhanced */}
                <div className="absolute right-1 top-20 w-40 rotate-6 rounded-2xl bg-white/96 p-3 text-foreground shadow-xl backdrop-blur-xl border border-white/60 transform transition-all hover:shadow-2xl hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> +340 XP
                    </div>
                    <div className="text-[7px] text-gray-600 font-semibold">Done</div>
                  </div>
                  <p className="mt-2 text-[11px] font-bold text-gray-900">Task Complete ✓</p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 shadow-sm">
                    <div className="h-full w-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-full" />
                  </div>
                </div>

                {/* Stats Badge - Enhanced */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-gray-900 shadow-xl backdrop-blur-lg border border-white/60">
                  <div className="flex -space-x-2">
                    {["#3B82F6", "#8B5CF6", "#10B981"].map((c) => (
                      <div key={c} className="h-5 w-5 rounded-full ring-2 ring-white shadow-md hover:scale-110 transition-transform" style={{ background: c }} />
                    ))}
                  </div>
                  <div className="text-[9px] font-bold">2.5K+ Hired</div>
                </div>
              </div>
            </div>

            {/* Hero Text - Enhanced */}
            <div className="text-center space-y-3">
              <h1 className="text-white drop-shadow-xl font-display" style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: '1.15', textShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                Land Your Dream Role
                <br />
                <span className="inline-block bg-gradient-to-r from-yellow-200 via-orange-200 to-yellow-100 bg-clip-text text-transparent font-display" style={{ fontWeight: 900, fontSize: '1.5rem' }}>
                  With Real Project Proof
                </span>
              </h1>
              <p className="text-sm text-white/95 leading-snug font-display" style={{ fontWeight: 500, letterSpacing: '-0.01em', textShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                Skip the resume. Prove your skills. Get hired.
              </p>
            </div>

            {/* Features Quick Stats - Enhanced */}
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-white/20 backdrop-blur-lg border border-white/30 p-2 text-center hover:bg-white/30 hover:border-white/50 transition-all hover:shadow-lg hover:scale-105">
                <div className="text-lg font-black text-white font-display" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>2.5K</div>
                <div className="text-[9px] text-white/90 mt-0.5 font-medium">Active</div>
              </div>
              <div className="rounded-lg bg-white/20 backdrop-blur-lg border border-white/30 p-2 text-center hover:bg-white/30 hover:border-white/50 transition-all hover:shadow-lg hover:scale-105">
                <div className="text-lg font-black text-white font-display" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>95%</div>
                <div className="text-[9px] text-white/90 mt-0.5 font-medium">Success</div>
              </div>
              <div className="rounded-lg bg-white/20 backdrop-blur-lg border border-white/30 p-2 text-center hover:bg-white/30 hover:border-white/50 transition-all hover:shadow-lg hover:scale-105">
                <div className="text-lg font-black text-white font-display" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>500+</div>
                <div className="text-[9px] text-white/90 mt-0.5 font-medium">Companies</div>
              </div>
            </div>

            {/* Why HireSphere Section - Enhanced */}
            <div className="space-y-2.5">
              <div className="flex items-start gap-2 rounded-lg bg-white/15 backdrop-blur-lg border border-white/30 p-2.5 hover:bg-white/25 hover:border-white/50 transition-all hover:shadow-lg">
                <div className="flex-shrink-0 mt-0.5">
                  <Zap className="h-4 w-4 text-yellow-300 drop-shadow-md" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white drop-shadow-sm">Real Skills</p>
                  <p className="text-[8px] text-white/85">Prove abilities with live projects</p>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-lg bg-white/15 backdrop-blur-lg border border-white/30 p-2.5 hover:bg-white/25 hover:border-white/50 transition-all hover:shadow-lg">
                <div className="flex-shrink-0 mt-0.5">
                  <Target className="h-4 w-4 text-green-300 drop-shadow-md" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white drop-shadow-sm">Direct Hire</p>
                  <p className="text-[8px] text-white/85">Connect with top recruiters</p>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-lg bg-white/15 backdrop-blur-lg border border-white/30 p-2.5 hover:bg-white/25 hover:border-white/50 transition-all hover:shadow-lg">
                <div className="flex-shrink-0 mt-0.5">
                  <Award className="h-4 w-4 text-blue-300 drop-shadow-md" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white drop-shadow-sm">Build Portfolio</p>
                  <p className="text-[8px] text-white/85">Showcase work to employers</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section - Enhanced */}
          <div className="space-y-3 pb-3 relative z-30">
            <Link
              to="/onboarding"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white font-bold text-blue-600 shadow-xl px-6 py-3 text-sm transition-all hover:shadow-2xl hover:scale-105 active:scale-95 font-display border border-white/80"
              style={{ letterSpacing: '-0.01em' }}
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            
            <button
              onClick={() => navigate({ to: "/login" })}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/25 backdrop-blur-lg border border-white/50 px-6 py-2.5 text-xs font-semibold text-white transition-all hover:bg-white/35 hover:border-white/70 hover:shadow-lg active:scale-95 font-display cursor-pointer"
              style={{ letterSpacing: '-0.01em' }}
            >
              <Users className="h-3.5 w-3.5" />
              Sign In
            </button>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
