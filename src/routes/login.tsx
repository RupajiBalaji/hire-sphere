import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { loginUser, getCurrentUser } from "@/lib/api/auth";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
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

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
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
      // Read the stored user to get their role for correct routing
      const user = await getCurrentUser();
      navigate({ to: user?.role === "recruiter" ? "/recruiter" : "/app" });
    } catch {
      setError("Could not log in. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MobileShell>
      {/* Hero Header — matches signup style */}
      <div className="relative overflow-hidden bg-gradient-hero px-6 pb-10 pt-12">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -left-6 bottom-0 h-28 w-28 rounded-full bg-white/8" />

        {/* Logo */}
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
          Welcome back.
        </h1>
        <p className="mt-1.5 text-sm font-medium text-white/70">
          Pick up where you left off — your next task awaits.
        </p>

        {/* Highlight pill */}
        <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 ring-1 ring-white/20">
          <Sparkles className="h-3 w-3 text-white/90" />
          <span className="text-[11px] font-semibold text-white/90">Tasks are waiting for you</span>
        </div>
      </div>

      {/* Form Card */}
      <div className="flex flex-1 flex-col px-5 pb-8 pt-6">
        <div className="rounded-3xl bg-card px-5 py-6 shadow-card ring-1 ring-border/50">
          <form className="space-y-4" onSubmit={handleLogin}>
            <Field
              icon={<Mail className="h-4 w-4" />}
              label="Email address"
              type="email"
              placeholder="you@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <PasswordField
              value={password}
              show={showPassword}
              onToggle={() => setShowPassword((p) => !p)}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-border accent-primary"
                />
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

            <button
              type="submit"
              disabled={loading}
              className="group mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-glow transition-all active:scale-[0.98] hover:shadow-elevated disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in…" : "Log in"}
              {!loading && (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              )}
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            or continue with
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-3 gap-3">
          <SocialBtn label="Google" icon={<GoogleIcon />} />
          <SocialBtn label="Apple" icon={<AppleIcon />} />
          <SocialBtn label="GitHub" icon={<GitHubIcon />} />
        </div>

        <p className="mt-auto pt-6 text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/signup" className="font-bold text-primary hover:underline underline-offset-2">
            Create an account
          </Link>
        </p>
      </div>
    </MobileShell>
  );
}

/* ── Field ── */
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
      <span className="mb-1.5 block text-xs font-semibold text-foreground">{label}</span>
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

/* ── Password field with show/hide toggle ── */
function PasswordField({
  value,
  show,
  onToggle,
  onChange,
}: {
  value: string;
  show: boolean;
  onToggle: () => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-foreground">Password</span>
      <span className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-sm transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
        <span className="shrink-0 text-muted-foreground">
          <Lock className="h-4 w-4" />
        </span>
        <input
          type={show ? "text" : "password"}
          placeholder="••••••••"
          value={value}
          onChange={onChange}
          autoComplete="current-password"
          className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground/60"
        />
        <button
          type="button"
          onClick={onToggle}
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </span>
    </label>
  );
}

/* ── Social button ── */
function SocialBtn({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex h-14 flex-col items-center justify-center gap-1.5 rounded-2xl border border-border bg-card text-xs font-semibold text-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-accent/30"
    >
      {icon}
      {label}
    </button>
  );
}

/* ── Brand SVG icons ── */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.39.07 2.36.74 3.18.8 1.21-.24 2.37-.93 3.67-.84 1.55.12 2.72.72 3.47 1.84-3.18 1.91-2.43 5.79.48 6.98-.57 1.5-1.31 2.99-2.8 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
        fill="currentColor"
        className="text-foreground"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        fill="currentColor"
        className="text-foreground"
      />
    </svg>
  );
}
