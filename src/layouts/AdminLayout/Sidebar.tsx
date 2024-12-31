import { Link, LinkProps } from "react-router-dom";
import { User } from "@/modules/auth";
import { Badge } from "antd";
import logo from "@/assets/logo/hmc-logo-dark.svg";
import { PropsWithChildren } from "react";

type SidebarProps = {
  user: User | null;
  unpaid: number;
  onLogout: () => void;
};

function MenuLink({ children, to, ...rest }: PropsWithChildren<LinkProps>) {
  return (
    <Link
      className="bg-black px-4 rounded   hover:bg-slate-700 py-2 block w-full"
      to={to}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default function Sidebar({ user, unpaid, onLogout }: SidebarProps) {
  const productTitle = 'HMC Backoffice'

  return (
    <div
      className="bg-black text-white flex-shrink-0"
      style={{ height: "100%" }}
    >
      <div className="px-8 py-8">
        <img alt="hammercode logo" src={logo} style={{ width: 48, height: 48 }} />
        <h1 className="font-bold text-lg mb-4">{productTitle}</h1>
        <p className="mb-8">Hi, {user?.name}</p>
      </div>

      <ul className="px-4">
        <li className="">
          <MenuLink to="/admin/events">Acara</MenuLink>
        </li>
        <li className="">
          <MenuLink to="#">Event</MenuLink>
        </li>
        <li>
          <MenuLink to="#">CRM</MenuLink>
        </li>
        <li>
          <MenuLink to="#">User</MenuLink>
        </li>
        <li className="">
          <MenuLink to="/admin/billing">
            Pembayaran <Badge count={unpaid} />
          </MenuLink>
        </li>

      </ul>

      <br />

      <ul className="px-4">
        <li>
          <MenuLink to="#" onClick={onLogout}>
            Logout
          </MenuLink>
        </li>
      </ul>
    </div>
  );
}
