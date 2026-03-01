import dynamic from "next/dynamic";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import Logo from "@/assets/logo.svg";
import { LoginDialog } from "@/features/auth/components/login-dialog";
import CommandPaletteTrigger from "@/features/command-palette/components/command-palette-trigger";

import { Button } from "../button";
import LanguageSwitcher from "../language-switcher";
import { NavigationMenu, NavigationMenuList } from "../navigation-menu";
import ThemeSwitcher from "../theme-switcher";
import renderMenuItem from "./render-menu-item";
import type { NavProps } from "./types";

const CommandPalette = dynamic(
  () => import("@/features/command-palette/components/command-palette"),
  {
    ssr: false,
  },
);

async function DesktopNav({ logo, user, menuWithAdmin, logout }: NavProps) {
  const t = await getTranslations();

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
              {menuWithAdmin.map((item) => renderMenuItem(item, t))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <ThemeSwitcher />
      <div className="flex gap-2">
        <CommandPaletteTrigger />
        <CommandPalette />
        <LanguageSwitcher />
        {!user ? (
          <LoginDialog />
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
