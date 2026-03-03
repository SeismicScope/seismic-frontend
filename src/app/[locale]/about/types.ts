import type { TFunction } from "@/types/main";

export type Section = {
  value: string;
  titleKey: string;
  titleKeyAccordion?: string;
  content: (t: TFunction) => React.ReactNode;
};
