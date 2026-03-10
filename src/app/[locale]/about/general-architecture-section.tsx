import { Separator } from "@/shared/ui/separator";
import type { TFunction } from "@/types/main";

export const generalArchitectureSection = [
  {
    value: "general-acrhitecture",
    titleKey: "titles.generalArchitecture",
    titleKeyAccordion: "generalArchitecture.title",
    content: (t: TFunction) => (
      <>
        <h4 className="hidden text-xl font-extrabold md:block">
          {t("generalArchitecture.title")}
        </h4>
        <p>{t("generalArchitecture.description")}</p>
        <p className="mt-4 font-bold">{t("generalArchitecture.techStack")}</p>
        <ul className="my-2 ml-4 list-disc">
          <li className="my-2">
            <span className="font-semibold">
              {t("generalArchitecture.1_title")}
            </span>{" "}
            {t("generalArchitecture.1_body")}
          </li>
          <li className="my-2">
            <span className="font-semibold">
              {t("generalArchitecture.2_title")}
            </span>{" "}
            {t("generalArchitecture.2_body")}
          </li>
          <li className="my-2">
            <span className="font-semibold">
              {t("generalArchitecture.3_title")}
            </span>{" "}
            {t("generalArchitecture.3_body")}
          </li>
          <li className="my-2">
            <span className="font-semibold">
              {t("generalArchitecture.4_title")}
            </span>{" "}
            {t("generalArchitecture.4_body")}
          </li>
          <li className="my-2">
            <span className="font-semibold">
              {t("generalArchitecture.5_title")}
            </span>{" "}
            {t("generalArchitecture.5_body")}
          </li>
          <li className="my-2">
            <span className="font-semibold">
              {t("generalArchitecture.6_title")}
            </span>{" "}
            {t("generalArchitecture.6_body")}
          </li>
          <li className="my-2">
            <span className="font-semibold">
              {t("generalArchitecture.7_title")}
            </span>{" "}
            {t("generalArchitecture.7_body")}
          </li>
        </ul>
        <Separator className="my-4" />
        <p className="font-bold">{t("interactionWorkflow.title")}</p>
        <ol className="my-2 ml-4 list-decimal">
          <li className="my-2">
            <span className="font-semibold">
              {t("interactionWorkflow.1_title")}
            </span>{" "}
            {t("interactionWorkflow.1_body")}
          </li>
          <li className="my-2">
            <span className="font-semibold">
              {t("interactionWorkflow.2_title")}
            </span>{" "}
            {t("interactionWorkflow.2_body")}
          </li>
          <li className="my-2">
            <span className="font-semibold">
              {t("interactionWorkflow.3_title")}
            </span>{" "}
            {t("interactionWorkflow.3_body")}
          </li>
          <li className="my-2">
            <span className="font-semibold">
              {t("interactionWorkflow.4_title")}
            </span>{" "}
            {t("interactionWorkflow.4_body")}
          </li>
        </ol>
        <Separator className="my-4" />
        <p className="font-bold">{t("infra.title")}</p>
        <ul className="my-2 ml-4 list-disc">
          <li className="my-2">
            <span className="font-semibold">{t("infra.1_title")}</span>{" "}
            {t("infra.1_body")}
          </li>
          <li className="my-2">
            <span className="font-semibold">{t("infra.2_title")}</span>{" "}
            {t("infra.2_body")}
          </li>
          <li className="my-2">
            <span className="font-semibold">{t("infra.3_title")}</span>{" "}
            {t("infra.3_body")}
          </li>
          <li className="my-2">
            <span className="font-semibold">{t("infra.4_title")}</span>{" "}
            {t("infra.4_body")}
          </li>
        </ul>
      </>
    ),
  },
];
