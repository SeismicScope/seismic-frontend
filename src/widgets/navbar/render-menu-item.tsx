import { useTranslations } from "next-intl";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/shared/ui/navigation-menu";

import SubMenuLink from "./sub-menu-link";
import type { MenuItem } from "./types";

function renderMenuItem(item: MenuItem, t: ReturnType<typeof useTranslations>) {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.titleKey}>
        <NavigationMenuTrigger>{t(item.titleKey)}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink
              asChild
              key={t(subItem.titleKey)}
              className="w-80"
            >
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.titleKey}>
      <NavigationMenuLink
        href={item.url}
        className="group bg-background hover:bg-muted hover:text-accent-foreground inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        {t(item.titleKey)}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
export default renderMenuItem;
