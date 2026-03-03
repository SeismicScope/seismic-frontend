import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import type { TFunction } from "@/types/main";

import { generalArchitectureSection } from "./general-acrhitecture-section";
import { keyFeaturesSection } from "./key-features-section";
import { overviewSection } from "./overview-sections";

function TabsView({ t }: { t: TFunction }) {
  const sections = [
    ...overviewSection,
    ...generalArchitectureSection,
    ...keyFeaturesSection,
  ];

  return (
    <Tabs defaultValue={sections[0]?.value}>
      <TabsList className="my-4">
        {sections.map((section) => (
          <TabsTrigger
            key={section.value}
            value={section.value}
            className="cursor-pointer text-base"
          >
            {t(section.titleKey)}
          </TabsTrigger>
        ))}
      </TabsList>

      {sections.map((section) => (
        <TabsContent key={section.value} value={section.value}>
          {section.content(t)}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default TabsView;
