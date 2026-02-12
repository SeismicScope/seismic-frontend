// Note: this navbar1 is a copy of navbar1 from shadcnblocks
"use client";
import { cn } from "@/shared/lib/utils";

import { LOGO_DATA, MENU } from "./constants";
import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";
import type { Navbar1Props } from "./types";
import { useNavbar } from "./use-navbar";

function Navbar1({ logo = LOGO_DATA, menu = MENU, className }: Navbar1Props) {
  const { login, logout, user } = useNavbar();
  const isAdmin = user?.role === "admin";

  const menuWithAdmin = isAdmin
    ? [...menu, { title: "Admin", url: "/admin" }]
    : menu;

  return (
    <section
      className={cn(
        "fixed top-0 z-50 w-full bg-white py-4 shadow-sm",
        className,
      )}
    >
      <div className="px-4 lg:px-10">
        <DesktopNav
          logo={logo}
          menuWithAdmin={menuWithAdmin}
          user={user}
          login={login}
          logout={logout}
        />
        <MobileNav
          logo={logo}
          menuWithAdmin={menuWithAdmin}
          user={user}
          login={login}
          logout={logout}
        />
      </div>
    </section>
  );
}

export { Navbar1 };
