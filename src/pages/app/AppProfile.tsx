import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ScreenHeader } from "@/components/MobileShell";
import {
  Settings, Pencil, Github, Linkedin, Globe, Twitter,
  Briefcase, GraduationCap, FolderOpen, Award, MapPin,
  ExternalLink, Sparkles, CheckCircle2,
} from "lucide-react";
import { getFullProfile, calcProfileStrength } from "@/lib/api/profile";
import { getUserStats } from "@/lib/api/userStats";
import { getSubmissions } from "@/lib/api/tasks";

export function AppProfile() {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["full-profile"],
    queryFn: getFullProfile,
  });

  const { data: stats } = useQuery({
    queryKey: ["user-stats"],
    queryFn: getUserStats,
  });

  const { data: submissions = [] } = useQuery({
    queryKey: ["submissions"],
    queryFn: getSubmissions,
  });

  if (isLoading || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const initial = (profile.name || "U").charAt(0).toUpperCase();
  const strength = calcProfileStrength(profile);

  return (
    <div className="pb-8">
      <ScreenHeader
        title="Profile"
        right={
          <Link to="/app/settings"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground">
            <Settings className="h-4 w-4" />
          </Link>
        }
      />

      {/* ── Hero card ── */}
      <div className="px-4 pt-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-5 text-white shadow-elevated">
          <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-white/8 blur-xl" />

          <div className="relative flex items-start gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/20 text-3xl font-extrabold ring-2 ring-white/40 backdrop-blur overflow-hidden">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
              ) : (
                initial
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-extrabold leading-tight">{profile.name || "Your Name"}</h2>
                <span className="rounded-full bg-success/30 px-2 py-0.5 text-[10px] font-bold ring-1 ring-white/20">PRO</span>
                {profile.openToWork && (
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold ring-1 ring-white/20">
                    Open to work
                  </span>
                )}
              </div>
              {profile.headline ? (
                <p className="mt-0.5 text-xs font-medium text-white/85 leading-snug">{profile.headline}</p>
              ) : (
                <p className="mt-0.5 text-xs text-white/50 italic">Add a headline</p>
              )}
              {profile.location && (
                <div className="mt-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-white/60" />
                  <span className="text-[11px] text-white/70">{profile.location}</span>
                </div>
              )}
              <button
                onClick={() => navigate("/app/edit-profile")}
                className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-[11px] font-bold backdrop-blur ring-1 ring-white/20 hover:bg-white/30 transition-colors"
              >
                <Pencil className="h-3 w-3" /> Edit profile
              </button>
            </div>
          </div>

          {/* Profile strength */}
          <div className="relative mt-5">
            <div className="flex items-center justify-between text-[11px] font-semibold mb-1.5">
              <span className="text-white/80">Profile strength</span>
              <span>{strength} / 100</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-gradient-to-r from-success to-white transition-all duration-500"
                style={{ width: `${strength}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-3 px-4 pt-4">
        {[
          { l: "Tasks", v: String(stats?.tasksCompleted ?? 0) },
          { l: "Submissions", v: String(submissions.length) },
          { l: "Points", v: stats?.pointsEarned ? `${stats.pointsEarned}` : "0" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-card p-3 text-center shadow-sm">
            <p className="text-lg font-extrabold text-foreground">{s.v}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>

      {/* ── About ── */}
      <Block title="About" onEdit={() => navigate("/app/edit-profile")}>
        {profile.bio ? (
          <p className="text-sm leading-relaxed text-muted-foreground">{profile.bio}</p>
        ) : (
          <EmptyState text="Add a bio to let recruiters know who you are." />
        )}
      </Block>

      {/* ── Skills ── */}
      <Block title="Skills" onEdit={() => navigate("/app/edit-profile")}>
        {profile.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((s) => (
              <span key={s} className="rounded-full bg-gradient-soft px-3 py-1.5 text-xs font-bold text-primary">
                {s}
              </span>
            ))}
          </div>
        ) : (
          <EmptyState text="Add your top skills." />
        )}
      </Block>

      {/* ── Work Experience ── */}
      <Block title="Work Experience" onEdit={() => navigate("/app/edit-profile")}>
        {profile.experience.length > 0 ? (
          <div className="space-y-3">
            {profile.experience.map((exp) => (
              <div key={exp.id} className="flex gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-soft">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold leading-tight">{exp.title}</p>
                  <p className="text-xs text-muted-foreground">{exp.company} · {exp.type}</p>
                  <p className="text-[11px] text-muted-foreground/70">
                    {exp.startMonth} {exp.startYear} – {exp.current ? "Present" : `${exp.endMonth} ${exp.endYear}`}
                  </p>
                  {exp.description && <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{exp.description}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState text="Add your work experience." />
        )}
      </Block>

      {/* ── Education ── */}
      <Block title="Education" onEdit={() => navigate("/app/edit-profile")}>
        {profile.education.length > 0 ? (
          <div className="space-y-3">
            {profile.education.map((edu) => (
              <div key={edu.id} className="flex gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-soft">
                  <GraduationCap className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold leading-tight">{edu.school}</p>
                  <p className="text-xs text-muted-foreground">{edu.degree}{edu.field ? ` · ${edu.field}` : ""}</p>
                  <p className="text-[11px] text-muted-foreground/70">{edu.startYear} – {edu.endYear}{edu.grade ? ` · ${edu.grade}` : ""}</p>
                  {edu.activities && <p className="mt-1 text-xs text-muted-foreground">{edu.activities}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState text="Add your educational background." />
        )}
      </Block>

      {/* ── Projects ── */}
      <Block title="Projects" onEdit={() => navigate("/app/edit-profile")}>
        {profile.projects.length > 0 ? (
          <div className="space-y-3">
            {profile.projects.map((proj) => (
              <div key={proj.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-soft">
                      <FolderOpen className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-bold">{proj.title}</p>
                  </div>
                  {proj.url && (
                    <a href={proj.url} target="_blank" rel="noreferrer"
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:text-primary">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
                {proj.description && <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{proj.description}</p>}
                {proj.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {proj.tags.map((t) => (
                      <span key={t} className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-foreground">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState text="Showcase your projects." />
        )}
      </Block>

      {/* ── Certifications ── */}
      <Block title="Certifications" onEdit={() => navigate("/app/edit-profile")}>
        {profile.certifications.length > 0 ? (
          <div className="space-y-3">
            {profile.certifications.map((cert) => (
              <div key={cert.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-soft">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold leading-tight truncate">{cert.name}</p>
                  <p className="text-[11px] text-muted-foreground">{cert.issuer} · {cert.issueMonth} {cert.issueYear}</p>
                </div>
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} target="_blank" rel="noreferrer"
                    className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:text-primary">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState text="Add certifications to stand out." />
        )}
      </Block>

      {/* ── Achievements ── */}
      <Block title="Achievements">
        <div className="grid grid-cols-6 gap-2">
          {["🚀", "🎯", "🔥", "💡", "🌟", "🏆"].map((b) => (
            <div key={b} className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-soft text-xl shadow-sm">
              {b}
            </div>
          ))}
        </div>
      </Block>

      {/* ── Links ── */}
      <Block title="Links" onEdit={() => navigate("/app/edit-profile")}>
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
              <a key={x.label} href={x.value.startsWith("http") ? x.value : `https://${x.value}`}
                target="_blank" rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-sm font-semibold text-foreground shadow-sm hover:border-primary/40 transition-colors">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  {x.icon}
                </span>
                <span className="flex-1 truncate text-xs">{x.value}</span>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </a>
            ))}
          </div>
        ) : (
          <EmptyState text="Add your links." />
        )}
      </Block>

      {/* ── CTA if profile is weak ── */}
      {strength < 50 && (
        <div className="mx-4 mt-4 rounded-3xl bg-gradient-soft p-5 ring-1 ring-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-primary">Complete your profile</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">A complete profile gets 3× more recruiter views.</p>
          <button onClick={() => navigate("/app/edit-profile")}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-3 text-xs font-bold text-white shadow-glow">
            <Pencil className="h-3.5 w-3.5" /> Finish your profile
          </button>
        </div>
      )}

      <div className="h-6" />
    </div>
  );
}

/* ── helper components ── */
function Block({
  title, children, onEdit,
}: { title: string; children: React.ReactNode; onEdit?: () => void }) {
  return (
    <section className="mt-5 px-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</h3>
        {onEdit && (
          <button type="button" onClick={onEdit}
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-primary hover:bg-primary/8 transition-colors">
            <Pencil className="h-3 w-3" /> Edit
          </button>
        )}
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
