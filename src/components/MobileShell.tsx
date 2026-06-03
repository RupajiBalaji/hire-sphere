import type { ReactNode } from "react";

export function MobileShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className="min-h-screen bg-surface">
      <div className={`mobile-frame flex min-h-screen flex-col ${className}`}>{children}</div>
    </div>
  );
}

export function ScreenHeader({
  title,
  subtitle,
  right,
  back,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  back?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border/60 bg-background/90 px-5 py-4 backdrop-blur-xl">
      <div className="flex min-w-0 items-center gap-3">
        {back}
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-foreground">{title}</h1>
          {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {right}
    </header>
  );
}
