import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <MobileShell>
      <div className="flex flex-1 flex-col pb-2">
        <Outlet />
      </div>
      <BottomNav />
    </MobileShell>
  );
}
