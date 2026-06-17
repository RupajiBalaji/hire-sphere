import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Bell, Building2, ChevronRight, HelpCircle, LogOut, Moon, Shield, User,
} from "lucide-react";
import { useState } from "react";
import { ScreenHeader } from "@/components/MobileShell";
import { logoutUser } from "@/lib/api/auth";

export function RecruiterSettings() {
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUser();
    navigate("/recruiter-login");
  }

  return (
    <div className="pb-24">
      <ScreenHeader
        title="Settings"
        subtitle="Manage your recruiter workspace"
        back={
          <button type="button" onClick={() => navigate("/recruiter")} className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </button>
        }
      />
      <div className="px-5 pb-8 pt-4">
        <Group title="Recruiter Account">
          <Row icon={<User className="h-4 w-4" />} label="Profile details" desc="Name, title, photo" onClick={() => navigate("/recruiter/edit-profile")} />
          <Row icon={<Building2 className="h-4 w-4" />} label="Company details" desc="Company, website, hiring focus" onClick={() => navigate("/recruiter/edit-profile")} />
        </Group>
        <Group title="Privacy & security">
          <Row icon={<Shield className="h-4 w-4" />} label="Candidate visibility" desc="Control what candidates can see" onClick={() => alert("Candidate visibility controls are coming soon.")} />
          <Row icon={<Moon className="h-4 w-4" />} label="Appearance" desc="Light, dark, system" toggle />
        </Group>
        <Group title="Notifications">
          <Row icon={<Bell className="h-4 w-4" />} label="Submission alerts" toggle defaultOn />
          <Row icon={<Bell className="h-4 w-4" />} label="Weekly hiring digest" desc="Every Monday" toggle />
        </Group>
        <Group title="Support">
          <Row icon={<HelpCircle className="h-4 w-4" />} label="Help center" onClick={() => alert("Help center is coming soon.")} />
        </Group>
        <button type="button" onClick={handleLogout} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-4 text-sm font-bold text-destructive">
          <LogOut className="h-4 w-4" /> Log out
        </button>
        <p className="mt-4 text-center text-[11px] text-muted-foreground">HireSphere recruiter workspace</p>
      </div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 first:mt-0">
      <h3 className="px-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</h3>
      <div className="mt-2 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card shadow-sm">{children}</div>
    </section>
  );
}

function Row({ icon, label, desc, toggle, defaultOn, onClick }: {
  icon: React.ReactNode; label: string; desc?: string;
  toggle?: boolean; defaultOn?: boolean; onClick?: () => void;
}) {
  const [checked, setChecked] = useState(Boolean(defaultOn));
  if (toggle) {
    return (
      <button type="button" onClick={() => setChecked((v) => !v)} className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/40">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground">{icon}</span>
        <div className="flex-1"><p className="text-sm font-bold text-foreground">{label}</p>{desc && <p className="text-[11px] text-muted-foreground">{desc}</p>}</div>
        <span className={`relative h-6 w-10 rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted-foreground/30"}`}>
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? "left-[18px]" : "left-0.5"}`} />
        </span>
      </button>
    );
  }
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/40">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground">{icon}</span>
      <div className="flex-1"><p className="text-sm font-bold text-foreground">{label}</p>{desc && <p className="text-[11px] text-muted-foreground">{desc}</p>}</div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
