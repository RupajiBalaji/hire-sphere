import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ScreenHeader } from "@/components/MobileShell";
import { Github, Linkedin, Link as LinkIcon, Settings, Pencil } from "lucide-react";
import { getCurrentUser } from "@/lib/api/auth";

export const Route = createFileRoute("/app/profile")({
  component: Profile,
});

const skills = ["React", "TypeScript", "Figma", "Tailwind", "Python", "Storytelling"];
const completed = [
  { t: "Landing page for AI notes", c: "Notion-style" },
  { t: "SaaS dashboard MVP", c: "Stripeful" },
  { t: "Brand mark for Build Club", c: "Build Club" },
];
const badges = ["🚀", "🎯", "🔥", "💡", "🌟", "🏆"];

function Profile() {
  const { data: user } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });

  const userName = user?.name ?? "User Profile";
  const userInitial = userName.charAt(0).toUpperCase();
  const userEmail = user?.email ?? "email@example.com";

  return (
    <div>
      <ScreenHeader
        title="Profile"
        right={
          <Link
            to="/app/settings"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground"
          >
            <Settings className="h-4 w-4" />
          </Link>
        }
      />

      {/* Hero */}
      <div className="relative px-5 pt-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-5 text-primary-foreground shadow-elevated">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 text-3xl font-extrabold ring-2 ring-white/40 backdrop-blur">
              {userInitial}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold">{userName}</h2>
                <span className="rounded-full bg-success/30 px-2 py-0.5 text-[10px] font-bold">PRO</span>
              </div>
              <p className="text-xs text-white/85">{userEmail}</p>
              <button className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold backdrop-blur">
                <Pencil className="h-3 w-3" /> Edit profile
              </button>
            </div>
          </div>

          {/* Profile strength */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span className="text-white/85">Profile strength</span>
              <span>84 / 100</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-success to-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 px-5 pt-5">
        {[
          { l: "Tasks", v: "12" },
          { l: "Endorsements", v: "47" },
          { l: "Views", v: "1.2k" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-card p-3 text-center shadow-sm">
            <p className="text-lg font-extrabold text-foreground">{s.v}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>

      <Block title="About">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Final year CS student. I love building polished interfaces with React and Tailwind, and
          shipping side projects that actual people use. Looking for my first frontend role.
        </p>
      </Block>

      <Block title="Skills">
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="rounded-full bg-gradient-soft px-3 py-1.5 text-xs font-bold text-primary"
            >
              {s}
            </span>
          ))}
        </div>
      </Block>

      <Block title="Completed tasks">
        <div className="space-y-2">
          {completed.map((c) => (
            <div key={c.t} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary" />
              <div className="flex-1">
                <p className="text-sm font-bold leading-tight">{c.t}</p>
                <p className="text-[11px] text-muted-foreground">{c.c}</p>
              </div>
              <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">
                ✓ Shipped
              </span>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Achievements">
        <div className="grid grid-cols-6 gap-2">
          {badges.map((b, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-soft text-xl shadow-sm"
            >
              {b}
            </div>
          ))}
        </div>
      </Block>

      <Block title="Links">
        <div className="space-y-2">
          {[
            { i: <Github className="h-4 w-4" />, l: "github.com/" + (user?.email?.split("@")[0] ?? "user") },
            { i: <Linkedin className="h-4 w-4" />, l: "linkedin.com/in/" + (user?.email?.split("@")[0] ?? "user") },
            { i: <LinkIcon className="h-4 w-4" />, l: (user?.email?.split("@")[0] ?? "user") + ".design" },
          ].map((x) => (
            <div
              key={x.l}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-sm font-semibold text-foreground shadow-sm"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">{x.i}</span>
              {x.l}
            </div>
          ))}
        </div>
      </Block>

      <div className="h-8" />
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 px-5">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}
