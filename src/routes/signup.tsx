import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { Mail, Lock, User, Briefcase, GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import { signupUser } from "@/lib/api/auth";

export const Route = createFileRoute("/signup")({
  component: SignUp,
});

function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"candidate" | "recruiter">("candidate");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Recruiter role goes to the dedicated recruiter signup page
    if (role === "recruiter") {
      navigate({ to: "/recruiter-signup" });
      return;
    }

    if (!name.trim()) { setError("Please enter your full name."); return; }
    if (!email.trim() || !email.includes("@")) { setError("Please enter a valid email address."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }

    try {
      await signupUser(name, email, "candidate");
      setError("");
      navigate({ to: "/app" });
    } catch {
      setError("Could not create your account. Please try again.");
    }
  }

  return (
    <MobileShell>
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-hero px-6 pb-10 pt-12">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -left-6 bottom-0 h-28 w-28 rounded-full bg-white/8" />

        {/* Logo mark */}
        <div className="relative mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm ring-1 ring-white/30">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
              <path
                d="M4 4v16M20 4v16M4 12h16M9 8l3-3 3 3M9 16l3 3 3-3"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="leading-none">
            <div className="text-base font-extrabold tracking-tight text-white">HireSphere</div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">
              Skill · Prove · Hire
            </div>
          </div>
        </div>

        <h1 className="text-[26px] font-extrabold leading-tight tracking-tight text-white">
          Create your account
        </h1>
        <p className="mt-1.5 text-sm font-medium text-white/70">
          Two minutes. Then your first task is on us.
        </p>

        {/* Trust badges */}
        <div className="mt-5 flex items-center gap-4">
          {["Free to join", "No credit card", "Instant access"].map((badge) => (
            <div key={badge} className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-white/80" />
              <span className="text-[10px] font-semibold text-white/80">{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <div className="flex flex-1 flex-col px-5 pb-8 pt-6">
        <div className="rounded-3xl bg-card shadow-card ring-1 ring-border/50 px-5 py-6">
          <form className="space-y-4" onSubmit={handleSignup}>
            <Field
              icon={<User className="h-4 w-4" />}
              label="Full name"
              placeholder="Aanya Verma"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Field
              icon={<Mail className="h-4 w-4" />}
              label="Email address"
              type="email"
              placeholder="you@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Field
              icon={<Lock className="h-4 w-4" />}
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Role selector */}
            <div>
              <span className="mb-2.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                I am a…
              </span>
              <div className="grid grid-cols-2 gap-3">
                <RoleButton
                  selected={role === "candidate"}
                  onClick={() => setRole("candidate")}
                  icon={<GraduationCap className="h-4 w-4" />}
                  label="Candidate"
                  hint="Find tasks & grow"
                />
                <RoleButton
                  selected={role === "recruiter"}
                  onClick={() => setRole("recruiter")}
                  icon={<Briefcase className="h-4 w-4" />}
                  label="Recruiter"
                  hint="Post & discover"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-xl bg-destructive/8 px-3.5 py-2.5 ring-1 ring-destructive/20">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                <p className="text-xs font-semibold text-destructive">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="group mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-glow transition-all active:scale-[0.98] hover:shadow-elevated"
            >
              {role === "recruiter" ? "Continue as Recruiter" : "Create account"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>

        {/* Legal */}
        <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
          By continuing, you agree to HireSphere&apos;s{" "}
          <span className="font-semibold text-foreground underline-offset-2 hover:underline cursor-pointer">Terms</span>{" "}
          and{" "}
          <span className="font-semibold text-foreground underline-offset-2 hover:underline cursor-pointer">Privacy Policy</span>.
        </p>

        <p className="mt-auto pt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-primary hover:underline underline-offset-2">
            Log in
          </Link>
        </p>
      </div>
    </MobileShell>
  );
}

function RoleButton({
  selected,
  onClick,
  icon,
  label,
  hint,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-center gap-1.5 rounded-2xl border-2 px-3 py-3.5 text-left transition-all ${
        selected
          ? "border-primary bg-gradient-soft shadow-sm"
          : "border-border bg-background hover:border-primary/40 hover:bg-accent/30"
      }`}
    >
      <span className={`${selected ? "text-primary" : "text-muted-foreground"}`}>{icon}</span>
      <span className={`text-sm font-bold ${selected ? "text-primary" : "text-foreground"}`}>
        {label}
      </span>
      <span className="text-[10px] font-medium text-muted-foreground">{hint}</span>
      {selected && (
        <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
          <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </button>
  );
}

function Field({
  icon,
  label,
  ...rest
}: {
  icon: React.ReactNode;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-foreground">
        {label}
      </span>
      <span className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-sm transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
        <span className="shrink-0 text-muted-foreground">{icon}</span>
        <input
          {...rest}
          className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground/60"
        />
      </span>
    </label>
  );
}