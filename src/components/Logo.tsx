export function Logo({ size = 40, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="relative flex items-center justify-center rounded-2xl bg-gradient-primary shadow-glow"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-[60%] w-[60%] text-primary-foreground">
          <path
            d="M4 4v16M20 4v16M4 12h16M9 8l3-3 3 3M9 16l3 3 3-3"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-background" />
      </div>
      {withText && (
        <div className="leading-none">
          <div className="text-lg font-extrabold tracking-tight text-foreground">HireSphere</div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Skill · Prove · Hire
          </div>
        </div>
      )}
    </div>
  );
}
