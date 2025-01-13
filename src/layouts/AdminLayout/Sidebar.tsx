import { Badge } from "antd";
import { PropsWithChildren, useEffect } from "react";
import { Link, LinkProps } from "react-router-dom";
import { User } from "@/modules/auth";
import logo from "@/assets/logo/hmc-logo-dark.svg";

type SidebarProps = {
  user: User | null;
  unpaid: number;
  onLogout: () => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

function MenuLink({ children, to, ...rest }: PropsWithChildren<LinkProps>) {
  return (
    <Link
      className="block w-full px-4 py-2 bg-black rounded hover:bg-slate-700"
      to={to}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default function Sidebar({
  user,
  unpaid,
  onLogout,
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const productTitle = "HMC Backoffice";

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setCollapsed]);

  return (
    <aside>
      <div
        className={`fixed w-52 min-h-screen bg-black border-r text-white p-4 ease-in-out duration-300 z-20 top-0 left-0 ${
          collapsed ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="p-4 text-white">
          <img alt="hammercode logo" src={logo} className="mb-2 size-10" />
          <h1 className={`font-bold text-lg mb-4 ${collapsed && "hidden"}`}>
            {productTitle}
          </h1>
          <p className={`mb-8 ${collapsed && "hidden"}`}>Hi, {user?.name}</p>
        </div>

        <ul>
          <li>
            <MenuLink to="/admin/events">Acara</MenuLink>
          </li>
          <li>
            <MenuLink to="#">CRM</MenuLink>
          </li>
          <li>
            <MenuLink to="#">User</MenuLink>
          </li>
          <li>
            <MenuLink to="/admin/payments">
              Pembayaran <Badge count={unpaid} />
            </MenuLink>
          </li>
        </ul>

        <br />

        <ul>
          <li>
            <MenuLink to="#" onClick={onLogout}>
              Logout
            </MenuLink>
          </li>
        </ul>
      </div>
      {!collapsed && (
        <div
          className="fixed inset-0 z-10 transition-opacity bg-black bg-opacity-40 md:hidden"
          onClick={() => {
            setCollapsed(true);
          }}
        />
      )}
    </aside>
  );
}
