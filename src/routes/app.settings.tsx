import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, User, Shield, Bell, LogOut, ChevronRight, Moon, HelpCircle, CreditCard } from "lucide-react";
import { ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/app/settings")({
  component: Settings,
});

function Settings() {
  const navigate = useNavigate();
  return (
    <div>
      <ScreenHeader
        title="Settings"
        back={
          <button
            onClick={() => navigate({ to: "/app/profile" })}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        }
      />
      <div className="px-5 pt-4 pb-8">
        <Group title="Account">
          <Row icon={<User className="h-4 w-4" />} label="Profile details" desc="Name, photo, bio" />
          <Row icon={<CreditCard className="h-4 w-4" />} label="Subscription" desc="HireSphere Pro" badge="PRO" />
        </Group>

        <Group title="Privacy & security">
          <Row icon={<Shield className="h-4 w-4" />} label="Privacy" desc="Who can see your work" />
          <Row icon={<Moon className="h-4 w-4" />} label="Appearance" desc="Light · Dark · System" toggle />
        </Group>

        <Group title="Notifications">
          <Row icon={<Bell className="h-4 w-4" />} label="Push notifications" toggle defaultOn />
          <Row icon={<Bell className="h-4 w-4" />} label="Email digests" desc="Weekly" toggle />
        </Group>

        <Group title="Support">
          <Row icon={<HelpCircle className="h-4 w-4" />} label="Help center" />
        </Group>

        <Link
          to="/login"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-4 text-sm font-bold text-destructive"
        >
          <LogOut className="h-4 w-4" /> Log out
        </Link>
        <p className="mt-4 text-center text-[11px] text-muted-foreground">HireSphere v1.0 · Made with ♥</p>
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
}: {
  icon: React.ReactNode;
  label: string;
  desc?: string;
  badge?: string;
  toggle?: boolean;
  defaultOn?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground">{icon}</span>
      <div className="flex-1">
        <p className="text-sm font-bold text-foreground">{label}</p>
        {desc && <p className="text-[11px] text-muted-foreground">{desc}</p>}
      </div>
      {badge && <span className="rounded-full bg-gradient-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">{badge}</span>}
      {toggle ? (
        <span
          className={`relative h-6 w-10 rounded-full transition-colors ${
            defaultOn ? "bg-primary" : "bg-muted-foreground/30"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
              defaultOn ? "left-[18px]" : "left-0.5"
            }`}
          />
        </span>
      ) : (
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      )}
    </div>
  );
}
