import { Menu } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTranslations } from "next-intl";

import Logo from "@/assets/logo.svg";
import { LoginDialog } from "@/features/auth/components/login-dialog";
import CommandPaletteTrigger from "@/features/command-palette/components/command-palette-trigger";
import { Accordion } from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import LanguageSwitcher from "@/shared/ui/language-switcher";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import ThemeSwitcher from "@/widgets/theme/theme-switcher";

import renderMobileMenuItem from "./render-mobile-menu-item";
import type { NavProps } from "./types";

const CommandPalette = dynamic(
  () => import("@/features/command-palette/components/command-palette"),
  {
    ssr: false,
  },
);

function MobileNav({ logo, user, menuWithAdmin, logout }: NavProps) {
  const t = useTranslations();

  return (
    <div className="block lg:hidden">
      <div className="flex items-center justify-between">
        <Link href={logo.url} className="flex items-center gap-2">
          <Logo className="max-h-8 dark:invert" />
        </Link>
        <CommandPaletteTrigger />
        <CommandPalette />
        <LanguageSwitcher />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Menu">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                <Link href={logo.url} className="flex items-center gap-2">
                  <Logo className="max-h-8 dark:invert" />
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 p-4">
              <Accordion
                type="single"
                collapsible
                className="flex w-full flex-col gap-4"
              >
                {menuWithAdmin.map((item) => renderMobileMenuItem(item, t))}
              </Accordion>

              <div className="flex items-center justify-center">
                <ThemeSwitcher />
              </div>

              <div className="flex flex-col gap-3">
                {!user ? (
                  <LoginDialog />
                ) : (
                  <Button onClick={() => logout()} aria-label="Logout">
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default MobileNav;
