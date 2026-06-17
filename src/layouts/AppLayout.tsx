import { Outlet } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { MobileShell } from "@/components/MobileShell";

export function AppLayout() {
  return (
    <MobileShell>
      <div className="flex flex-1 flex-col pb-2">
        <Outlet />
      </div>
      <BottomNav />
    </MobileShell>
  );
}
