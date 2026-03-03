import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import type { TFunction } from "@/types/main";

import type { Section } from "./types";

function AccordionView({ sections, t }: { sections: Section[]; t: TFunction }) {
  return (
    <Accordion type="single" collapsible>
      {sections.map((section) => (
        <AccordionItem key={section.value} value={section.value}>
          <AccordionTrigger className="border-b text-lg font-extrabold">
            {section.titleKeyAccordion
              ? t(section.titleKeyAccordion)
              : t(section.titleKey)}
          </AccordionTrigger>

          <AccordionContent>{section.content(t)}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default AccordionView;
