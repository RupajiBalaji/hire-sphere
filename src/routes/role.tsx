import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { Logo } from "@/components/Logo";
import { Briefcase, GraduationCap, Check, ArrowRight, Sparkles, Users, Target } from "lucide-react";

export const Route = createFileRoute("/role")({
  component: RoleSelect,
});

function RoleSelect() {
  const [role, setRole] = useState<"candidate" | "recruiter" | null>("candidate");
  const navigate = useNavigate();

  return (
    <MobileShell>
      <div className="relative flex flex-1 flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-white">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-gradient-to-br from-purple-400/10 to-blue-400/5 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-5 pb-6 pt-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <Logo className="h-7 w-7" />
            <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-2.5 py-1 text-[9px] font-bold text-blue-700 border border-blue-200/50">
              <Sparkles className="h-3 w-3" />
              Select Path
            </span>
          </div>

          {/* Main Content */}
          <div className="mt-4">
            <h1 className="text-2xl font-black leading-tight tracking-tight text-gray-900" style={{ letterSpacing: '-0.03em' }}>
              How will you use
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">HireSphere?</span>
            </h1>
            <p className="mt-2 text-xs text-gray-600 font-medium">
              Choose your path. You can change later.
            </p>
          </div>

          {/* Role Cards */}
          <div className="mt-5 space-y-2.5 flex-1">
            <RoleCard
              active={role === "candidate"}
              onClick={() => setRole("candidate")}
              icon={<GraduationCap className="h-5 w-5" />}
              title="I'm a Candidate"
              subtitle="For Freshers & Students"
              desc="Show skills through real tasks. Build portfolio."
              tag="Most popular"
              features={["Real projects", "Portfolio", "Hiring"]}
              gradient="linear-gradient(135deg, #3B82F6, #2563EB)"
            />
            <RoleCard
              active={role === "recruiter"}
              onClick={() => setRole("recruiter")}
              icon={<Briefcase className="h-5 w-5" />}
              title="I'm a Recruiter"
              subtitle="For Companies"
              desc="Post challenges. Find proven talent fast."
              features={["Post tasks", "Find talent", "Faster hiring"]}
              gradient="linear-gradient(135deg, #1E293B, #0F172A)"
            />
          </div>

          {/* CTA Section */}
          <div className="space-y-2 mt-4">
            <button
              onClick={() =>
                navigate({ to: role === "recruiter" ? "/recruiter" : "/signup" })
              }
              disabled={!role}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:scale-100 border border-blue-500/50"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
            <Link 
              to="/login" 
              className="block text-center text-xs font-semibold text-gray-600 hover:text-blue-600 transition-colors py-1.5"
            >
              Already have an account? <span className="text-blue-600 font-bold">Log in</span>
            </Link>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

function RoleCard({
  active,
  onClick,
  icon,
  title,
  subtitle,
  desc,
  tag,
  features,
  gradient,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  desc: string;
  tag?: string;
  features: string[];
  gradient: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full overflow-hidden rounded-2xl border-2 p-3.5 text-left transition-all transform ${
        active
          ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg scale-100"
          : "border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-blue-300"
      }`}
    >
      {/* Active indicator background */}
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
      )}

      <div className="relative flex items-start gap-3">
        {/* Icon Container */}
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-md"
          style={{ background: gradient }}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <div>
              <h3 className="text-base font-bold text-gray-900" style={{ letterSpacing: '-0.01em' }}>
                {title}
              </h3>
              <p className="text-[9px] font-bold text-blue-600 uppercase tracking-wider">
                {subtitle}
              </p>
            </div>
            {tag && (
              <span className="rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-2 py-0.5 text-[8px] font-bold text-green-700 border border-green-200 whitespace-nowrap">
                ✨ {tag}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-xs leading-tight text-gray-600 font-medium">{desc}</p>
          
          {/* Features */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {features.map((feature) => (
              <span 
                key={feature} 
                className="text-[7px] font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-100"
              >
                ✓ {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Checkbox */}
        <span
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
            active 
              ? "border-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md" 
              : "border-gray-300 bg-white hover:border-blue-400"
          }`}
        >
          {active && <Check className="h-3 w-3" strokeWidth={3} />}
        </span>
      </div>
    </button>
  );
}
