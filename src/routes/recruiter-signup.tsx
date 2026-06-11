import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import {
  Mail, Lock, User, Building2, Phone, Globe,
  ArrowRight, CheckCircle2, Eye, EyeOff,
} from "lucide-react";
import { signupUser } from "@/lib/api/auth";

export const Route = createFileRoute("/recruiter-signup")({
  component: RecruiterSignUp,
});

function RecruiterSignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!name.trim()) { setError("Please enter your full name."); return; }
    if (!company.trim()) { setError("Please enter your company name."); return; }
    if (!email.trim() || !email.includes("@")) { setError("Please enter a valid email address."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }

    setLoading(true);
    try {
      await signupUser(name, email, "recruiter");
      navigate({ to: "/recruiter" });
    } catch {
      setError("Could not create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MobileShell>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-hero px-6 pb-10 pt-12">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -left-6 bottom-0 h-28 w-28 rounded-full bg-white/8" />

        {/* Logo */}
        <div className="relative mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm ring-1 ring-white/30">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
              <path d="M4 4v16M20 4v16M4 12h16M9 8l3-3 3 3M9 16l3 3 3-3"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="leading-none">
            <div className="text-base font-extrabold tracking-tight text-white">HireSphere</div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">For Recruiters</div>
          </div>
        </div>

        <h1 className="text-[26px] font-extrabold leading-tight tracking-tight text-white">
          Join as a Recruiter
        </h1>
        <p className="mt-1.5 text-sm font-medium text-white/70">
          Post real tasks and discover pre-vetted talent.
        </p>

        <div className="mt-5 flex items-center gap-4">
          {["Post tasks", "Review work", "Hire faster"].map((b) => (
            <div key={b} className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-white/80" />
              <span className="text-[10px] font-semibold text-white/80">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-1 flex-col px-5 pb-8 pt-6">
        <div className="rounded-3xl bg-card shadow-card ring-1 ring-border/50 px-5 py-6">
          <form className="space-y-3.5" onSubmit={handleSignup}>
            <Field icon={<User className="h-4 w-4" />} label="Your full name"
              placeholder="Priya Sharma" value={name} onChange={(e) => setName(e.target.value)} />

            <Field icon={<Building2 className="h-4 w-4" />} label="Company name"
              placeholder="Acme Inc." value={company} onChange={(e) => setCompany(e.target.value)} />

            <Field icon={<Mail className="h-4 w-4" />} label="Work email" type="email"
              placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />

            <Field icon={<Phone className="h-4 w-4" />} label="Phone (optional)"
              placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />

            <Field icon={<Globe className="h-4 w-4" />} label="Company website (optional)"
              placeholder="https://yourcompany.com" value={website} onChange={(e) => setWebsite(e.target.value)} />

            {/* Password */}
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-foreground">Password</span>
              <span className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-sm transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <span className="shrink-0 text-muted-foreground"><Lock className="h-4 w-4" /></span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground/60"
                />
                <button type="button" onClick={() => setShowPassword((p) => !p)}
                  className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </label>

            {error && (
              <div className="flex items-start gap-2 rounded-xl bg-destructive/8 px-3.5 py-2.5 ring-1 ring-destructive/20">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                <p className="text-xs font-semibold text-destructive">{error}</p>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="group mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary px-6 py-4 text-sm font-bold text-white shadow-glow transition-all active:scale-[0.98] hover:shadow-elevated disabled:opacity-60">
              {loading ? "Creating account…" : "Create recruiter account"}
              {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
          By continuing, you agree to HireSphere&apos;s{" "}
          <span className="font-semibold text-foreground cursor-pointer hover:underline underline-offset-2">Terms</span>{" "}
          and{" "}
          <span className="font-semibold text-foreground cursor-pointer hover:underline underline-offset-2">Privacy Policy</span>.
        </p>

        <p className="mt-auto pt-6 text-center text-sm text-muted-foreground">
          Already have a recruiter account?{" "}
          <Link to="/recruiter-login" className="font-bold text-primary hover:underline underline-offset-2">
            Log in
          </Link>
        </p>

        <p className="mt-2 text-center text-xs text-muted-foreground">
          Looking for work instead?{" "}
          <Link to="/signup" className="font-semibold text-primary hover:underline underline-offset-2">
            Join as a candidate
          </Link>
        </p>
      </div>
    </MobileShell>
  );
}

function Field({
  icon, label, ...rest
}: { icon: React.ReactNode; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-foreground">{label}</span>
      <span className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-sm transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
        <span className="shrink-0 text-muted-foreground">{icon}</span>
        <input {...rest}
          className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground/60" />
      </span>
    </label>
  );
}
