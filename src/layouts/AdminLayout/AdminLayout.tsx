import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuthModule } from "@/modules/auth/auth.slice";
import * as S from './AdminLayout.style'
import { SettingsProvider } from "./context";

export default function AdminLayout() {
  const auth = useAuthModule();
  const sidebarWidthInPX = 200;
  const [unpaid,] = useState(0)

  useEffect(() => {
    if (!auth.isInitialized) {
      auth.initialize();
    }
  }, [auth]);

  if (auth.isInitializing) {
    return <p>Please wait...</p>;
  }

  if (auth.isInitialized && !auth.user) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <SettingsProvider>
      <div style={{ paddingLeft: sidebarWidthInPX }}>
        <S.SidebarWrapper $width={sidebarWidthInPX}>
          <Sidebar user={auth.user} unpaid={unpaid} onLogout={auth.logout} />
        </S.SidebarWrapper>
        <div className="outlet-wrapper w-full">
          <Outlet />
        </div>
      </div>
    </SettingsProvider>
  );
}
