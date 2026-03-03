import { Separator } from "@/shared/ui/separator";
import type { TFunction } from "@/types/main";

export const keyFeaturesSection = [
  {
    value: "key-features",
    titleKey: "titles.keyFeatures",
    titleKeyAccordion: "keyFeatures.title",
    content: (t: TFunction) => (
      <>
        <h4 className="hidden text-xl font-extrabold md:block">
          {t("keyFeatures.title")}
        </h4>
        <p className="mt-4 font-bold">{t("keyFeatures.performanceTitle")}</p>
        <ul className="my-2 ml-4 list-disc">
          <li className="my-2">{t("keyFeatures.performance.1")}</li>
          <li className="my-2">{t("keyFeatures.performance.2")}</li>
          <li className="my-2">{t("keyFeatures.performance.3")}</li>
          <li className="my-2">{t("keyFeatures.performance.4")}</li>
          <li className="my-2">{t("keyFeatures.performance.5")}</li>
          <li className="my-2">{t("keyFeatures.performance.6")}</li>
          <li className="my-2">{t("keyFeatures.performance.7")}</li>
        </ul>

        <Separator className="my-4" />
        <p className="font-bold">{t("keyFeatures.mapsTitle")}</p>
        <ul className="my-2 ml-4 list-disc">
          <li className="my-2">{t("keyFeatures.maps.1")}</li>
          <li className="my-2">{t("keyFeatures.maps.2")}</li>
          <li className="my-2">{t("keyFeatures.maps.3")}</li>
          <li className="my-2">{t("keyFeatures.maps.4")}</li>
          <li className="my-2">{t("keyFeatures.maps.5")}</li>
          <li className="my-2">{t("keyFeatures.maps.6")}</li>
        </ul>

        <Separator className="my-4" />
        <p className="font-bold">{t("keyFeatures.frontendTitle")}</p>
        <ul className="my-2 ml-4 list-disc">
          <li className="my-2">{t("keyFeatures.frontend.1")}</li>
          <li className="my-2">{t("keyFeatures.frontend.2")}</li>
          <li className="my-2">{t("keyFeatures.frontend.3")}</li>
          <li className="my-2">{t("keyFeatures.frontend.4")}</li>
          <li className="my-2">{t("keyFeatures.frontend.5")}</li>
          <li className="my-2">{t("keyFeatures.frontend.6")}</li>
          <li className="my-2">{t("keyFeatures.frontend.7")}</li>
          <li className="my-2">{t("keyFeatures.frontend.8")}</li>
          <li className="my-2">{t("keyFeatures.frontend.9")}</li>
        </ul>

        <Separator className="my-4" />
        <p className="font-bold">{t("keyFeatures.backendTitle")}</p>
        <ul className="my-2 ml-4 list-disc">
          <li className="my-2">{t("keyFeatures.backend.1")}</li>
          <li className="my-2">{t("keyFeatures.backend.2")}</li>
          <li className="my-2">{t("keyFeatures.backend.3")}</li>
          <li className="my-2">{t("keyFeatures.backend.4")}</li>
          <li className="my-2">{t("keyFeatures.backend.5")}</li>
          <li className="my-2">{t("keyFeatures.backend.6")}</li>
          <li className="my-2">{t("keyFeatures.backend.7")}</li>
        </ul>

        <Separator className="my-4" />
        <p className="font-bold">{t("keyFeatures.devopsTitle")}</p>
        <ul className="my-2 ml-4 list-disc">
          <li className="my-2">{t("keyFeatures.devops.1")}</li>
          <li className="my-2">{t("keyFeatures.devops.2")}</li>
          <li className="my-2">{t("keyFeatures.devops.3")}</li>
          <li className="my-2">{t("keyFeatures.devops.4")}</li>
          <li className="my-2">{t("keyFeatures.devops.5")}</li>
          <li className="my-2">{t("keyFeatures.devops.6")}</li>
          <li className="my-2">{t("keyFeatures.devops.7")}</li>
        </ul>

        <Separator className="my-4" />
        <p className="font-bold">{t("keyFeatures.uiTitle")}</p>
        <ul className="my-2 ml-4 list-disc">
          <li className="my-2">{t("keyFeatures.ui.1")}</li>
          <li className="my-2">{t("keyFeatures.ui.2")}</li>
          <li className="my-2">{t("keyFeatures.ui.3")}</li>
          <li className="my-2">{t("keyFeatures.ui.4")}</li>
          <li className="my-2">{t("keyFeatures.ui.5")}</li>
          <li className="my-2">{t("keyFeatures.ui.6")}</li>
        </ul>
      </>
    ),
  },
];
