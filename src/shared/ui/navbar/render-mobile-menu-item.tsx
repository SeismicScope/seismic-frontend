import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";
import SubMenuLink from "./sub-menu-link";
import type { MenuItem } from "./types";

function renderMobileMenuItem(item: MenuItem) {
  if (item.items) {
    return (
      <AccordionItem
        key={item.titleKey}
        value={item.titleKey}
        className="border-b-0"
      >
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.titleKey}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.titleKey} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.titleKey} href={item.url} className="text-md font-semibold">
      {item.titleKey}
    </a>
  );
}

export default renderMobileMenuItem;
