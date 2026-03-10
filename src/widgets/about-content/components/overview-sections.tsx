import { Lightbulb } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import type { TFunction } from "@/types/main";

export const overviewSection = [
  {
    value: "overview",
    titleKey: "titles.projectOverview",
    titleKeyAccordion: "projectFocusOn.title",
    content: (t: TFunction) => (
      <>
        <h4 className="hidden text-xl font-extrabold md:block">
          {t("projectFocusOn.title")}
        </h4>
        <ul className="my-3 ml-4 list-disc">
          <li className="my-2">
            <span className="font-semibold">{t("projectFocusOn.1_title")}</span>{" "}
            {t("projectFocusOn.1_body")}
          </li>
          <li className="my-2">
            <span className="font-semibold">{t("projectFocusOn.2_title")}</span>{" "}
            {t("projectFocusOn.2_body")}
          </li>
          <li className="my-2">
            <span className="font-semibold">{t("projectFocusOn.3_title")}</span>{" "}
            {t("projectFocusOn.3_body")}
          </li>
          <li className="my-2">
            <span className="font-semibold">{t("projectFocusOn.4_title")}</span>{" "}
            {t("projectFocusOn.4_body")}
          </li>
          <li className="my-2">
            <span className="font-semibold">{t("projectFocusOn.5_title")}</span>{" "}
            {t("projectFocusOn.5_body")}
          </li>
          <li className="my-2">
            <span className="font-semibold">{t("projectFocusOn.6_title")}</span>{" "}
            {t("projectFocusOn.6_body")}
          </li>
          <li className="my-2">
            <span className="font-semibold">{t("projectFocusOn.7_title")}</span>{" "}
            {t("projectFocusOn.7_body")}
          </li>
        </ul>

        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>{t("notACrudTitle")}</AlertTitle>
          <AlertDescription>{t("notACrudText")}</AlertDescription>
        </Alert>
      </>
    ),
  },
];
