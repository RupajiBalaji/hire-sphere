import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ScreenHeader } from "@/components/MobileShell";
import { getRecruiterProfile, saveRecruiterProfile, type FullProfile } from "@/lib/api/profile";
import {
  User, Briefcase, Building2, Link as LinkIcon, Plus, Trash2, Check, ChevronDown,
  Globe, Github, Linkedin, Twitter, Sparkles, Save,
} from "lucide-react";

function Section({ icon, title, children, defaultOpen = true }: { icon: React.ReactNode; title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2.5 text-sm font-bold text-foreground"><span className="text-primary">{icon}</span>{title}</div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="border-t border-border/60 px-5 pb-5 pt-4">{children}</div>}
    </div>
  );
}

function Field({ label, value, onChange, placeholder = "", type = "text", rows }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      {rows ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
          className="w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/15" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/15" />
      )}
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-primary" : "bg-border"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </label>
  );
}

export function RecruiterEditProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({ queryKey: ["recruiter-profile"], queryFn: getRecruiterProfile });

  const mutation = useMutation({
    mutationFn: saveRecruiterProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiter-profile"] });
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      navigate("/recruiter/profile");
    },
  });

  const [form, setForm] = useState<FullProfile | null>(null);
  const [saved, setSaved] = useState(false);

  if (profile && !form) setForm(profile);

  if (isLoading || !form) {
    return <div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  }

  const set = <K extends keyof FullProfile>(key: K, val: FullProfile[K]) =>
    setForm((f) => f ? { ...f, [key]: val } : f);

  async function handleSave() {
    if (!form) return;
    await mutation.mutateAsync(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const initial = (form.name || "R").charAt(0).toUpperCase();

  return (
    <div className="pb-24">
      <ScreenHeader
        title="Edit Profile"
        back={
          <button type="button" onClick={() => navigate("/recruiter/profile")} className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-foreground">
            <ChevronDown className="h-4 w-4 rotate-90" />
          </button>
        }
        right={
          <button type="button" onClick={handleSave} className="flex items-center gap-1.5 rounded-xl bg-gradient-primary px-4 py-2 text-xs font-bold text-white shadow-glow">
            {saved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
            {saved ? "Saved!" : "Save"}
          </button>
        }
      />
      <div className="space-y-4 px-4 pt-4">
        <Section icon={<User className="h-4 w-4" />} title="Recruiter Identity">
          <div className="mb-4 flex items-center gap-4">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-hero text-3xl font-extrabold text-white ring-2 ring-primary/30">
                {form.avatar ? <img src={form.avatar} alt={form.name} className="h-full w-full rounded-3xl object-cover" /> : initial}
              </div>
              <label htmlFor="recruiter-avatar-upload"
                className="absolute -bottom-2 -right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg ring-2 ring-background transition-transform hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
                </svg>
                <input id="recruiter-avatar-upload" type="file" accept="image/*" className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => set("avatar", ev.target?.result as string);
                    reader.readAsDataURL(file);
                  }} />
              </label>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Profile photo</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Tap the camera icon to upload.</p>
              {form.avatar && <button type="button" onClick={() => set("avatar", "")} className="mt-1.5 text-[11px] font-semibold text-destructive hover:underline">Remove photo</button>}
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary"><Sparkles className="h-3 w-3" /> Recruiter</div>
            </div>
          </div>
          <div className="space-y-3">
            <Field label="Full name" value={form.name} onChange={(v) => set("name", v)} placeholder="Your full name" />
            <Field label="Headline" value={form.headline} onChange={(v) => set("headline", v)} placeholder="e.g. Senior Technical Recruiter" />
            <Field label="Location" value={form.location} onChange={(v) => set("location", v)} placeholder="City, Country" />
            <Toggle label="Open to hiring" checked={form.openToWork} onChange={(v) => set("openToWork", v)} />
          </div>
        </Section>
        <Section icon={<Building2 className="h-4 w-4" />} title="Company Details">
          <div className="space-y-3">
            <Field label="Company Name" value={form.company || ""} onChange={(v) => set("company", v)} placeholder="e.g. Google, TCS, Infosys" />
            <Field label="Your Job Title" value={form.title || ""} onChange={(v) => set("title", v)} placeholder="e.g. HR Manager, Technical Recruiter" />
            <Field label="Company Website" value={form.website} onChange={(v) => set("website", v)} placeholder="https://company.com" />
          </div>
        </Section>
        <Section icon={<Sparkles className="h-4 w-4" />} title="About You">
          <Field label="Bio" value={form.bio} onChange={(v) => set("bio", v)}
            placeholder="Tell candidates about your role, what kind of talent you're looking for, and why people should work at your company." rows={5} />
          <p className="mt-1.5 text-[10px] text-muted-foreground">{form.bio.length} / 600 characters</p>
        </Section>
        <Section icon={<Briefcase className="h-4 w-4" />} title="Hiring For (Skills)">
          <SkillsEditor skills={form.skills} onChange={(v) => set("skills", v)} />
        </Section>
        <Section icon={<LinkIcon className="h-4 w-4" />} title="Links">
          <div className="space-y-3">
            <div className="flex items-center gap-3"><Globe className="h-4 w-4 shrink-0 text-muted-foreground" /><Field label="Website" value={form.website} onChange={(v) => set("website", v)} placeholder="https://yoursite.com" /></div>
            <div className="flex items-center gap-3"><Github className="h-4 w-4 shrink-0 text-muted-foreground" /><Field label="GitHub" value={form.github} onChange={(v) => set("github", v)} placeholder="github.com/username" /></div>
            <div className="flex items-center gap-3"><Linkedin className="h-4 w-4 shrink-0 text-muted-foreground" /><Field label="LinkedIn" value={form.linkedin} onChange={(v) => set("linkedin", v)} placeholder="linkedin.com/in/username" /></div>
            <div className="flex items-center gap-3"><Twitter className="h-4 w-4 shrink-0 text-muted-foreground" /><Field label="X / Twitter" value={form.twitter} onChange={(v) => set("twitter", v)} placeholder="x.com/username" /></div>
          </div>
        </Section>
      </div>
      <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[440px] -translate-x-1/2 border-t border-border/60 bg-background/90 px-5 py-4 backdrop-blur-xl">
        <button type="button" onClick={handleSave} disabled={mutation.isPending}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-4 text-sm font-bold text-white shadow-glow active:scale-[0.98] disabled:opacity-60">
          {mutation.isPending ? "Saving…" : saved ? "✓ Profile saved!" : "Save profile"}
        </button>
      </div>
    </div>
  );
}

function SkillsEditor({ skills, onChange }: { skills: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState("");
  function add() {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) onChange([...skills, trimmed]);
    setInput("");
  }
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {skills.map((s) => (
          <span key={s} className="flex items-center gap-1 rounded-full bg-gradient-soft px-3 py-1.5 text-xs font-bold text-primary">
            {s}<button type="button" onClick={() => onChange(skills.filter((x) => x !== s))} className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20"><Trash2 className="h-2.5 w-2.5" /></button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder="Add a skill you're hiring for"
          className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
        <button type="button" onClick={add} className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white"><Plus className="h-4 w-4" /></button>
      </div>
    </div>
  );
}
