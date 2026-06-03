 import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { Logo } from "@/components/Logo";
import { Mail, Lock, User } from "lucide-react";
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

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      await signupUser(name, email, role);
      setError("");
      navigate({ to: role === "recruiter" ? "/recruiter" : "/app" });
    } catch {
      setError("Could not create your account. Please try again.");
    }
  }

  return (
    <MobileShell>
      <div className="flex flex-1 flex-col px-6 pb-10 pt-8">
        <Logo />

        <div className="mt-8">
          <h2 className="text-[28px] font-extrabold leading-tight tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Two minutes. Then your first task is on us.
          </p>
        </div>

        <form className="mt-7 space-y-4" onSubmit={handleSignup}>
          <Field
            icon={<User className="h-4 w-4" />}
            label="Full name"
            placeholder="Aanya Verma"
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
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>
            <span className="mb-2 block text-xs font-semibold text-foreground">
              I am a…
            </span>

            <div className="grid grid-cols-2 gap-3">
              {(["candidate", "recruiter"] as const).map((selectedRole) => (
                <button
                  key={selectedRole}
                  type="button"
                  onClick={() => setRole(selectedRole)}
                  className={`rounded-2xl border-2 px-4 py-3 text-sm font-bold capitalize transition-all ${
                    role === selectedRole
                      ? "border-primary bg-gradient-soft text-primary"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {selectedRole}
                </button>
              ))}
            </div>
          </div>

          <p className="pt-2 text-[11px] leading-relaxed text-muted-foreground">
            By continuing, you agree to HireSphere&apos;s{" "}
            <span className="font-semibold text-foreground">Terms</span> and{" "}
            <span className="font-semibold text-foreground">Privacy Policy</span>.
          </p>

          {error && (
            <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center rounded-2xl bg-gradient-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-glow active:scale-[0.98]"
          >
            Create account
          </button>
        </form>

        <p className="mt-auto pt-8 text-center text-sm text-muted-foreground">
          Already have one?{" "}
          <Link to="/login" className="font-bold text-primary">
            Log in
          </Link>
        </p>
      </div>
    </MobileShell>
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

      <span className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <span className="text-muted-foreground">{icon}</span>
        <input
          {...rest}
          className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
        />
      </span>
    </label>
  );
}