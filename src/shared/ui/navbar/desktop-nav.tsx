import Image from "next/image";

import Logo from "@/assets/logo.svg";

import { Button } from "../button";
import { NavigationMenu, NavigationMenuList } from "../navigation-menu";
import ThemeSwitcher from "../theme-switcher";
import renderMenuItem from "./render-menu-item";
import type { NavProps } from "./types";

function DesktopNav({ logo, user, menuWithAdmin, login, logout }: NavProps) {
  return (
    <nav className="hidden items-center justify-between lg:flex">
      <div className="flex items-center gap-6">
        <a href={logo.url} className="flex items-center gap-2">
          <Image src={Logo} className="max-h-8 dark:invert" alt={logo.alt} />
          <span className="text-lg font-semibold tracking-tighter">
            {logo.title}
          </span>
        </a>
        <div className="flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              {menuWithAdmin.map((item) => renderMenuItem(item))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <ThemeSwitcher />
      <div className="flex gap-2">
        {!user ? (
          <Button
            variant="default"
            size="sm"
            onClick={() => login()}
            aria-label="Login"
          >
            Login
          </Button>
        ) : (
          <Button size="sm" onClick={() => logout()} aria-label="Logout">
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
}

export default DesktopNav;
