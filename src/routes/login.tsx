 import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { Logo } from "@/components/Logo";
import { Mail, Lock, Eye } from "lucide-react";
import { loginUser } from "@/lib/api/auth";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      await loginUser(email, rememberMe, name || email.split("@")[0]);
      setError("");
      navigate({ to: "/app" });
    } catch {
      setError("Could not log in. Please try again.");
    }
  }

  return (
    <MobileShell>
      <div className="flex flex-1 flex-col px-6 pb-10 pt-8">
        <Logo />

        <div className="mt-10">
          <h2 className="text-[28px] font-extrabold leading-tight tracking-tight">
            Welcome back.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Pick up where you left off — your next task awaits.
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleLogin}>
          <Field
            icon={<User className="h-4 w-4" />}
            label="Full Name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Field
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            type="email"
            placeholder="you@school.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Field
            icon={<Lock className="h-4 w-4" />}
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            trailing={<Eye className="h-4 w-4 text-muted-foreground" />}
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-border accent-primary"
              />
              Remember me
            </label>

            <button type="button" className="font-semibold text-primary">
              Forgot password?
            </button>
          </div>

          {error && (
            <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center rounded-2xl bg-gradient-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-glow transition-transform active:scale-[0.98]"
          >
            Log in
          </button>
        </form>

        <div className="my-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or continue with
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <SocialBtn label="Google" mark="G" color="#EA4335" />
          <SocialBtn label="Apple" mark="" color="#0F172A" />
          <SocialBtn label="GitHub" mark="GH" color="#0F172A" />
        </div>

        <p className="mt-auto pt-8 text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/signup" className="font-bold text-primary">
            Create an account
          </Link>
        </p>
      </div>
    </MobileShell>
  );
}

function Field({
  icon,
  label,
  trailing,
  ...rest
}: {
  icon: React.ReactNode;
  label: string;
  trailing?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-foreground">
        {label}
      </span>

      <span className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <span className="text-muted-foreground">{icon}</span>
        <input
          {...rest}
          className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
        />
        {trailing}
      </span>
    </label>
  );
}

function SocialBtn({
  label,
  mark,
  color,
}: {
  label: string;
  mark: string;
  color: string;
}) {
  return (
    <button
      type="button"
      className="flex h-14 flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-card text-xs font-semibold text-foreground shadow-sm hover:border-primary/40"
    >
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-extrabold text-white"
        style={{ background: color }}
      >
        {mark || ""}
      </span>
      {label}
    </button>
  );
}