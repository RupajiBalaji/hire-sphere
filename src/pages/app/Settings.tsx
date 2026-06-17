import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  CreditCard,
  HelpCircle,
  LogOut,
  Moon,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";
import { ScreenHeader } from "@/components/MobileShell";
import { logoutUser } from "@/lib/api/auth";

export function AppSettings() {
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUser();
    navigate("/login");
  }

  return (
    <div>
      <ScreenHeader
        title="Settings"
        back={
          <button
            type="button"
            onClick={() => navigate("/app/profile")}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        }
      />
      <div className="px-5 pb-8 pt-4">
        <Group title="Account">
          <Row
            icon={<User className="h-4 w-4" />}
            label="Profile details"
            desc="Name, photo, bio"
            onClick={() => navigate("/app/edit-profile")}
          />
          <Row
            icon={<CreditCard className="h-4 w-4" />}
            label="Subscription"
            desc="HireSphere Pro"
            badge="PRO"
            onClick={() => alert("Subscription management is coming soon.")}
          />
        </Group>

        <Group title="Privacy & security">
          <Row
            icon={<Shield className="h-4 w-4" />}
            label="Privacy"
            desc="Who can see your work"
            onClick={() => alert("Privacy controls are coming soon.")}
          />
          <Row icon={<Moon className="h-4 w-4" />} label="Appearance" desc="Light, dark, system" toggle />
        </Group>

        <Group title="Notifications">
          <Row icon={<Bell className="h-4 w-4" />} label="Push notifications" toggle defaultOn />
          <Row icon={<Bell className="h-4 w-4" />} label="Email digests" desc="Weekly" toggle />
        </Group>

        <Group title="Support">
          <Row
            icon={<HelpCircle className="h-4 w-4" />}
            label="Help center"
            onClick={() => alert("Help center is coming soon.")}
          />
        </Group>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-4 text-sm font-bold text-destructive"
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
        <p className="mt-4 text-center text-[11px] text-muted-foreground">HireSphere v1.0</p>
      </div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 first:mt-0">
      <h3 className="px-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</h3>
      <div className="mt-2 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        {children}
      </div>
    </section>
  );
}

function Row({
  icon,
  label,
  desc,
  badge,
  toggle,
  defaultOn,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  desc?: string;
  badge?: string;
  toggle?: boolean;
  defaultOn?: boolean;
  onClick?: () => void;
}) {
  const [checked, setChecked] = useState(Boolean(defaultOn));

  if (toggle) {
    return (
      <button
        type="button"
        onClick={() => setChecked((value) => !value)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/40"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground">{icon}</span>
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground">{label}</p>
          {desc && <p className="text-[11px] text-muted-foreground">{desc}</p>}
        </div>
        <span className={`relative h-6 w-10 rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted-foreground/30"}`}>
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? "left-[18px]" : "left-0.5"}`} />
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/40"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground">{icon}</span>
      <div className="flex-1">
        <p className="text-sm font-bold text-foreground">{label}</p>
        {desc && <p className="text-[11px] text-muted-foreground">{desc}</p>}
      </div>
      {badge && <span className="rounded-full bg-gradient-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">{badge}</span>}
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
