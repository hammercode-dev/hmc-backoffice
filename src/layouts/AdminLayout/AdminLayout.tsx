import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuthModule } from "@/modules/auth/auth.slice";
import { SettingsProvider } from "./context";
import { Button, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

export default function AdminLayout() {
  const auth = useAuthModule();
  const [unpaid] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!auth.isInitialized) {
      auth.initialize();
    }
  }, [auth.isInitialized]);

  if (auth.isInitializing) {
    return <p>Please wait...</p>;
  }

  if (auth.isInitialized && !auth.user) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <SettingsProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar
          user={auth.user}
          unpaid={unpaid}
          onLogout={auth.logout}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Layout>
          <Header
            style={{ padding: 8, background: "transparent" }}
            className="lg:hidden"
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 56,
                height: 56,
              }}
            />
          </Header>
          <Content>
            <div className="outlet-wrapper w-full lg:pl-52">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </SettingsProvider>
  );
}
