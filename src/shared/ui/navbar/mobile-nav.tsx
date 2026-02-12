import { Menu } from "lucide-react";
import Image from "next/image";

import Logo from "@/assets/logo.svg";

import { Accordion } from "../accordion";
import { Button } from "../button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet";
import renderMobileMenuItem from "./render-mobile-menu-item";
import type { NavProps } from "./types";

function MobileNav({ logo, user, menuWithAdmin, login, logout }: NavProps) {
  return (
    <div className="block lg:hidden">
      <div className="flex items-center justify-between">
        <a href={logo.url} className="flex items-center gap-2">
          <Image src={Logo} className="max-h-8 dark:invert" alt={logo.alt} />
        </a>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                <a href={logo.url} className="flex items-center gap-2">
                  <Image
                    src={Logo}
                    className="max-h-8 dark:invert"
                    alt={logo.alt}
                  />
                </a>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 p-4">
              <Accordion
                type="single"
                collapsible
                className="flex w-full flex-col gap-4"
              >
                {menuWithAdmin.map((item) => renderMobileMenuItem(item))}
              </Accordion>

              <div className="flex flex-col gap-3">
                {!user ? (
                  <Button variant="outline" onClick={() => login()}>
                    Login
                  </Button>
                ) : (
                  <Button onClick={() => logout()}>Logout</Button>
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
