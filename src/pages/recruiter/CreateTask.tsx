import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Sparkles } from "lucide-react";
import { ScreenHeader } from "@/components/MobileShell";
import { getCurrentUser } from "@/lib/api/auth";
import { getRecruiterProfile } from "@/lib/api/profile";
import { saveTask } from "@/lib/api/tasks";

const GRADIENTS = [
  { name: "Blue-Indigo", value: "linear-gradient(135deg, oklch(0.546 0.215 262), oklch(0.585 0.213 277))" },
  { name: "Green-Teal", value: "linear-gradient(135deg, oklch(0.68 0.18 145), oklch(0.55 0.18 240))" },
  { name: "Purple-Pink", value: "linear-gradient(135deg, oklch(0.52 0.22 300), oklch(0.63 0.2 335))" },
  { name: "Warm Amber", value: "linear-gradient(135deg, oklch(0.76 0.17 76), oklch(0.6 0.22 27))" },
  { name: "Dark Slate", value: "linear-gradient(135deg, oklch(0.25 0.02 264), oklch(0.15 0.02 264))" },
];

const EMOJIS = ["💻", "🎨", "📊", "🚀", "💡", "🛠️", "🧬", "✍️"];

export function CreateTask() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({ queryKey: ["current-user"], queryFn: getCurrentUser });
  const { data: profile } = useQuery({ queryKey: ["recruiter-profile"], queryFn: getRecruiterProfile });

  const [title, setTitle] = useState("");
  const [logo, setLogo] = useState("🚀");
  const [difficulty, setDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced">("Intermediate");
  const [time, setTime] = useState("2-3 hours");
  const [deadline, setDeadline] = useState("5 days left");
  const [accent, setAccent] = useState(GRADIENTS[0].value);
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [guidelines, setGuidelines] = useState<string[]>([
    "Figma file or hosted prototype link",
    "100-word rationale for layout decisions",
  ]);
  const [guidelineInput, setGuidelineInput] = useState("");

  const createTaskMutation = useMutation({
    mutationFn: saveTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate("/recruiter");
    },
  });

  function addSkill() {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) setSkills([...skills, trimmed]);
    setSkillInput("");
  }

  function addGuideline() {
    const trimmed = guidelineInput.trim();
    if (trimmed && !guidelines.includes(trimmed)) setGuidelines([...guidelines, trimmed]);
    setGuidelineInput("");
  }

  function handlePost() {
    if (!title.trim() || !description.trim()) {
      alert("Please fill in the task title and description.");
      return;
    }
    const recruiterName = user?.name || profile?.name || "Recruiter";
    const companyName = profile?.company || "Independent Recruiter";
    createTaskMutation.mutate({
      title: title.trim(), recruiter: recruiterName, company: companyName, logo,
      difficulty, time, deadline, accent, description: description.trim(),
      skills: skills.length > 0 ? skills : ["General Development"], guidelines,
    });
  }

  return (
    <div className="pb-24">
      <ScreenHeader
        title="Post a task"
        back={
          <button type="button" onClick={() => navigate("/recruiter")} className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </button>
        }
      />
      <div className="space-y-5 px-5 pt-5">
        <div className="rounded-3xl border border-border bg-card p-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Card Preview</p>
          <div className="rounded-2xl p-4 text-white shadow-elevated transition-all" style={{ background: accent }}>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg font-bold backdrop-blur">{logo}</div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/85">{profile?.company || "Your Company"}</p>
                <p className="text-[10px] text-white/70">{user?.name || "Your Name"}</p>
              </div>
            </div>
            <h3 className="mt-3 text-sm font-extrabold leading-snug">{title || "Super Awesome Task Title"}</h3>
            <div className="mt-2.5 flex gap-1.5 text-[9px] font-bold">
              <span className="rounded-full bg-white/20 px-2 py-0.5 backdrop-blur">{difficulty}</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 backdrop-blur">{time}</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 backdrop-blur">{deadline}</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Task Title</span>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Design a high-conversion checkout page"
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Description</span>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Detail the instructions, context, goals and scope of the task for candidates..." rows={4}
              className="w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Logo Icon</span>
              <div className="flex flex-wrap gap-1.5">
                {EMOJIS.map((e) => (<button key={e} type="button" onClick={() => setLogo(e)} className={`flex h-9 w-9 items-center justify-center rounded-xl text-base transition-all ${logo === e ? "bg-primary text-white scale-110 shadow-sm" : "bg-muted text-foreground hover:bg-muted/80"}`}>{e}</button>))}
              </div>
            </div>
            <div>
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Card Theme</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {GRADIENTS.map((g) => (<button key={g.name} type="button" title={g.name} onClick={() => setAccent(g.value)} className={`h-7 w-7 rounded-full transition-all ring-offset-2 ${accent === g.value ? "ring-2 ring-primary scale-110" : "hover:scale-105"}`} style={{ background: g.value }} />))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Difficulty</span>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as "Beginner" | "Intermediate" | "Advanced")} className="w-full rounded-xl border border-border bg-background px-2.5 py-2.5 text-xs text-foreground outline-none focus:border-primary">
                <option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Time Estimate</span>
              <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g. 2-3 hours" className="w-full rounded-xl border border-border bg-background px-2.5 py-2.5 text-xs text-foreground outline-none focus:border-primary" />
            </div>
            <div>
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Deadline</span>
              <input type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="e.g. 5 days left" className="w-full rounded-xl border border-border bg-background px-2.5 py-2.5 text-xs text-foreground outline-none focus:border-primary" />
            </div>
          </div>
          <div>
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Required Skills</span>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {skills.map((s) => (<span key={s} className="flex items-center gap-1 rounded-full bg-gradient-soft px-2.5 py-1 text-xs font-bold text-primary">{s}<button type="button" onClick={() => setSkills(skills.filter((x) => x !== s))} className="ml-0.5 text-primary hover:text-destructive"><Trash2 className="h-2.5 w-2.5" /></button></span>))}
            </div>
            <div className="flex gap-2">
              <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())} placeholder="Add a required skill" className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary" />
              <button type="button" onClick={addSkill} className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white"><Plus className="h-3.5 w-3.5" /></button>
            </div>
          </div>
          <div>
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Submission Guidelines</span>
            <ul className="space-y-2 mb-2">
              {guidelines.map((g, idx) => (<li key={idx} className="flex items-center justify-between rounded-xl bg-muted/40 p-2.5 text-xs text-foreground"><span className="truncate flex-1">{g}</span><button type="button" onClick={() => setGuidelines(guidelines.filter((_, i) => i !== idx))} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button></li>))}
            </ul>
            <div className="flex gap-2">
              <input value={guidelineInput} onChange={(e) => setGuidelineInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addGuideline())} placeholder="Add guideline (e.g. Figma file, Hosted URL)" className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary" />
              <button type="button" onClick={addGuideline} className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white"><Plus className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-[60px] left-1/2 z-50 w-full max-w-[440px] -translate-x-1/2 border-t border-border/60 bg-background/90 px-5 py-4 backdrop-blur-xl">
        <button type="button" onClick={handlePost} disabled={createTaskMutation.isPending}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-4 text-sm font-bold text-white shadow-glow active:scale-[0.98] disabled:opacity-60">
          {createTaskMutation.isPending ? "Posting Task..." : (<><Sparkles className="h-4 w-4 animate-float" />Post Task</>)}
        </button>
      </div>
    </div>
  );
}
