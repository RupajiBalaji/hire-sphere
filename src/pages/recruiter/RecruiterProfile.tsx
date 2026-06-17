import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ScreenHeader } from "@/components/MobileShell";
import {
  MapPin, Briefcase, Globe, Github, Linkedin, Twitter,
  Pencil, ExternalLink, CheckCircle2, Sparkles, ChevronDown,
} from "lucide-react";
import { getCurrentUser } from "@/lib/api/auth";
import { getRecruiterProfile, calcProfileStrength } from "@/lib/api/profile";
import { getTasks, getSubmissions } from "@/lib/api/tasks";

export function RecruiterProfile() {
  const navigate = useNavigate();

  const { data: user } = useQuery({ queryKey: ["current-user"], queryFn: getCurrentUser });
  const { data: profile, isLoading } = useQuery({ queryKey: ["recruiter-profile"], queryFn: getRecruiterProfile });
  const { data: tasks = [] } = useQuery({ queryKey: ["tasks"], queryFn: getTasks });
  const { data: submissions = [] } = useQuery({ queryKey: ["submissions"], queryFn: getSubmissions });

  if (isLoading || !profile) {
    return <div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  }

  const name = user?.name || profile.name || "Recruiter";
  const initial = name.charAt(0).toUpperCase();
  const strength = calcProfileStrength(profile);
  const recruiterTasks = tasks.filter((t) => t.recruiter === name || t.company === profile.company);
  const tasksPostedCount = recruiterTasks.length;
  const candidateSubmissions = submissions.filter((sub) =>
    recruiterTasks.some((t) => t.title === sub.taskTitle && t.company === sub.company)
  );
  const candidatesReviewedCount = candidateSubmissions.length;

  return (
    <div className="pb-24">
      <ScreenHeader
        title="Profile"
        back={
          <button type="button" onClick={() => navigate("/recruiter")} className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground">
            <ChevronDown className="h-4 w-4 -rotate-90" />
          </button>
        }
      />
      <div className="px-4 pt-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-5 text-white shadow-elevated">
          <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-start gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-white/20 text-3xl font-extrabold ring-2 ring-white/40 backdrop-blur">
              {profile.avatar ? <img src={profile.avatar} alt={name} className="h-full w-full object-cover" /> : initial}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-extrabold leading-tight">{name}</h2>
                {profile.openToWork && <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold ring-1 ring-white/20">Open to hiring</span>}
              </div>
              {(profile.title || profile.company) && <p className="mt-0.5 text-sm font-semibold leading-snug text-white">{profile.title || "Recruiter"}{profile.company ? ` at ${profile.company}` : ""}</p>}
              {profile.headline && <p className="mt-1 text-xs font-medium leading-snug text-white/85">{profile.headline}</p>}
              {profile.location && <div className="mt-1 flex items-center gap-1"><MapPin className="h-3 w-3 text-white/60" /><span className="text-[11px] text-white/70">{profile.location}</span></div>}
              <button type="button" onClick={() => navigate("/recruiter/edit-profile")}
                className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-[11px] font-bold ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/30">
                <Pencil className="h-3 w-3" /> Edit profile
              </button>
            </div>
          </div>
          <div className="relative mt-5">
            <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold">
              <span className="text-white/80">Profile strength</span><span>{strength} / 100</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-gradient-to-r from-success to-white transition-all duration-500" style={{ width: `${strength}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 px-4 pt-4">
        {[{ l: "Tasks Posted", v: String(tasksPostedCount) }, { l: "Candidates Reviewed", v: String(candidatesReviewedCount) }, { l: "Hires Made", v: "0" }].map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-card p-3 text-center shadow-sm">
            <p className="text-lg font-extrabold text-foreground">{s.v}</p>
            <p className="text-[10px] font-bold uppercase leading-tight tracking-wider text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>

      <Block title="Active Posted Tasks">
        {recruiterTasks.length > 0 ? (
          <div className="space-y-3">
            {recruiterTasks.map((t) => (
              <div key={t.id} onClick={() => navigate(`/app/tasks/${t.id}`)}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm cursor-pointer hover:border-primary/40 transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base font-bold text-white" style={{ background: t.accent ?? "var(--gradient-primary)" }}>{t.logo}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-tight truncate">{t.title}</p>
                  <p className="text-[11px] text-muted-foreground">{t.difficulty} · {t.time} · {t.deadline}</p>
                </div>
                <ChevronDown className="h-4 w-4 -rotate-90 text-muted-foreground" />
              </div>
            ))}
          </div>
        ) : <EmptyState text="You haven't posted any tasks yet." />}
      </Block>

      <Block title="About" onEdit={() => navigate("/recruiter/edit-profile")}>
        {profile.bio ? <p className="text-sm leading-relaxed text-muted-foreground">{profile.bio}</p> : <EmptyState text="Add a bio to introduce yourself to candidates." />}
      </Block>

      <Block title="Skills & Expertise" onEdit={() => navigate("/recruiter/edit-profile")}>
        {profile.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((s) => (<span key={s} className="rounded-full bg-gradient-soft px-3 py-1.5 text-xs font-bold text-primary">{s}</span>))}
          </div>
        ) : <EmptyState text="Add skills and areas of expertise." />}
      </Block>

      <Block title="Work Experience" onEdit={() => navigate("/recruiter/edit-profile")}>
        {profile.experience.length > 0 ? (
          <div className="space-y-3">
            {profile.experience.map((exp) => (
              <div key={exp.id} className="flex gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-soft"><Briefcase className="h-4 w-4 text-primary" /></div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-tight">{exp.title}</p>
                  <p className="text-xs text-muted-foreground">{exp.company} · {exp.type}</p>
                  <p className="text-[11px] text-muted-foreground/70">{exp.startMonth} {exp.startYear} – {exp.current ? "Present" : `${exp.endMonth} ${exp.endYear}`}</p>
                  {exp.description && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{exp.description}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : <EmptyState text="Add your work experience." />}
      </Block>

      <Block title="Links" onEdit={() => navigate("/recruiter/edit-profile")}>
        {[
          { icon: <Github className="h-4 w-4" />, label: "GitHub", value: profile.github },
          { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn", value: profile.linkedin },
          { icon: <Globe className="h-4 w-4" />, label: "Website", value: profile.website },
          { icon: <Twitter className="h-4 w-4" />, label: "X / Twitter", value: profile.twitter },
        ].filter((x) => x.value).length > 0 ? (
          <div className="space-y-2">
            {[
              { icon: <Github className="h-4 w-4" />, label: "GitHub", value: profile.github },
              { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn", value: profile.linkedin },
              { icon: <Globe className="h-4 w-4" />, label: "Website", value: profile.website },
              { icon: <Twitter className="h-4 w-4" />, label: "X / Twitter", value: profile.twitter },
            ].filter((x) => x.value).map((x) => (
              <a key={x.label} href={x.value.startsWith("http") ? x.value : `https://${x.value}`} target="_blank" rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/40">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">{x.icon}</span>
                <span className="flex-1 truncate text-xs">{x.value}</span>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </a>
            ))}
          </div>
        ) : <EmptyState text="Add your GitHub, LinkedIn, or website links." />}
      </Block>

      <Block title="Achievements">
        <div className="grid grid-cols-6 gap-2">
          {["🚀", "🎯", "🔥", "💡", "🌟", "🏆"].map((b) => (
            <div key={b} className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-soft text-xl shadow-sm">{b}</div>
          ))}
        </div>
      </Block>

      {strength < 50 && (
        <div className="mx-4 mt-4 rounded-3xl bg-gradient-soft p-5 ring-1 ring-primary/20">
          <div className="mb-2 flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /><span className="text-sm font-bold text-primary">Complete your profile</span></div>
          <p className="mb-3 text-xs text-muted-foreground">A complete profile attracts better candidates.</p>
          <button type="button" onClick={() => navigate("/recruiter/edit-profile")}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-3 text-xs font-bold text-white shadow-glow">
            <Pencil className="h-3.5 w-3.5" /> Finish your profile
          </button>
        </div>
      )}
      <div className="h-6" />
    </div>
  );
}

function Block({ title, children, onEdit }: { title: string; children: React.ReactNode; onEdit?: () => void }) {
  return (
    <section className="mt-5 px-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</h3>
        {onEdit && <button type="button" onClick={onEdit} className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/8"><Pencil className="h-3 w-3" /> Edit</button>}
      </div>
      {children}
    </section>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-dashed border-border px-4 py-3">
      <CheckCircle2 className="h-4 w-4 text-muted-foreground/40" />
      <p className="text-xs text-muted-foreground/60">{text}</p>
    </div>
  );
}
