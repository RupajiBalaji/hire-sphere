import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Building2 } from "lucide-react";
import { loginUser, getCurrentUser } from "@/lib/api/auth";

export function RecruiterLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      await loginUser(email, rememberMe);
      const user = await getCurrentUser();
      if (user?.role !== "recruiter") {
        setError("This account is not registered as a recruiter. Please use the candidate login.");
        setLoading(false);
        return;
      }
      navigate("/recruiter");
    } catch {
      setError("Could not log in. Please check your credentials and try again.");
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
          Recruiter Login
        </h1>
        <p className="mt-1.5 text-sm font-medium text-white/70">
          Welcome back — your talent pipeline is waiting.
        </p>

        <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 ring-1 ring-white/20">
          <Building2 className="h-3 w-3 text-white/90" />
          <span className="text-[11px] font-semibold text-white/90">Recruiter portal</span>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-1 flex-col px-5 pb-8 pt-6">
        <div className="rounded-3xl bg-card px-5 py-6 shadow-card ring-1 ring-border/50">
          <form className="space-y-4" onSubmit={handleLogin}>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-foreground">Work email</span>
              <span className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-sm transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input type="email" placeholder="you@company.com" value={email}
                  onChange={(e) => setEmail(e.target.value)} autoComplete="email"
                  className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground/60" />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-foreground">Password</span>
              <span className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-sm transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password}
                  onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"
                  className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground/60" />
                <button type="button" onClick={() => setShowPassword((p) => !p)}
                  className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </label>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                <input type="checkbox" checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-border accent-primary" />
                Remember me
              </label>
              <button type="button" className="text-xs font-semibold text-primary hover:underline underline-offset-2">
                Forgot password?
              </button>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-xl bg-destructive/8 px-3.5 py-2.5 ring-1 ring-destructive/20">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                <p className="text-xs font-semibold text-destructive">{error}</p>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="group mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary px-6 py-4 text-sm font-bold text-white shadow-glow transition-all active:scale-[0.98] hover:shadow-elevated disabled:opacity-60">
              {loading ? "Logging in…" : "Log in to recruiter portal"}
              {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
            </button>
          </form>
        </div>

        <p className="mt-auto pt-6 text-center text-sm text-muted-foreground">
          New to HireSphere?{" "}
          <Link to="/recruiter-signup" className="font-bold text-primary hover:underline underline-offset-2">
            Create a recruiter account
          </Link>
        </p>

        <p className="mt-2 text-center text-xs text-muted-foreground">
          Not a recruiter?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline underline-offset-2">
            Candidate login →
          </Link>
        </p>
      </div>
    </MobileShell>
  );
}
