import { ExternalLink } from "lucide-react";

import { Separator } from "@/shared/ui/separator";
import type { TFunction } from "@/types/main";

import type { Section } from "./types";

const LINKS = [
  {
    key: "links.storybook",
    href: "https://seismicscope.github.io/seismic-frontend/storybook/?path=/docs/introduction--docs",
  },
  {
    key: "links.swagger",
    href: "https://seismic-scope-be.rest/api/v1/docs",
  },
  {
    key: "links.backendRepo",
    href: "https://github.com/SeismicScope/seismic-backend",
  },
  {
    key: "links.healthCheck",
    href: "https://seismic-scope-be.rest/api/v1/health",
  },
  {
    key: "links.metrics",
    href: "https://seismic-scope-be.rest/api/v1/metrics",
  },
];

export const technicalDecisionsSection: Section[] = [
  {
    value: "technical-decisions",
    titleKey: "titles.technicalDecisions",
    titleKeyAccordion: "technicalDecisions.title",
    content: (t: TFunction) => (
      <>
        <h4 className="hidden text-xl font-extrabold md:block">
          {t("technicalDecisions.title")}
        </h4>

        <p className="mt-4 font-bold">
          {t("technicalDecisions.codeQualityTitle")}
        </p>
        <ul className="my-2 ml-4 list-disc">
          <li className="my-2">{t("technicalDecisions.codeQuality.1")}</li>
          <li className="my-2">{t("technicalDecisions.codeQuality.2")}</li>
          <li className="my-2">{t("technicalDecisions.codeQuality.3")}</li>
          <li className="my-2">{t("technicalDecisions.codeQuality.4")}</li>
          <li className="my-2">{t("technicalDecisions.codeQuality.5")}</li>
          <li className="my-2">{t("technicalDecisions.codeQuality.6")}</li>
          <li className="my-2">{t("technicalDecisions.codeQuality.7")}</li>
        </ul>

        <Separator className="my-4" />
        <p className="font-bold">{t("technicalDecisions.adrTitle")}</p>
        <p className="text-muted-foreground my-2 text-sm">
          {t("technicalDecisions.adrDescription")}
        </p>
        <ol className="my-2 ml-4 list-decimal">
          <li className="my-2">{t("technicalDecisions.adrs.1")}</li>
          <li className="my-2">{t("technicalDecisions.adrs.2")}</li>
          <li className="my-2">{t("technicalDecisions.adrs.3")}</li>
          <li className="my-2">{t("technicalDecisions.adrs.4")}</li>
          <li className="my-2">{t("technicalDecisions.adrs.5")}</li>
          <li className="my-2">{t("technicalDecisions.adrs.6")}</li>
          <li className="my-2">{t("technicalDecisions.adrs.7")}</li>
        </ol>

        <Separator className="my-4" />
        <p className="font-bold">{t("technicalDecisions.testingTitle")}</p>
        <ul className="my-2 ml-4 list-disc">
          <li className="my-2">{t("technicalDecisions.testing.1")}</li>
          <li className="my-2">{t("technicalDecisions.testing.2")}</li>
          <li className="my-2">{t("technicalDecisions.testing.3")}</li>
          <li className="my-2">{t("technicalDecisions.testing.4")}</li>
          <li className="my-2">{t("technicalDecisions.testing.5")}</li>
          <li className="my-2">{t("technicalDecisions.testing.6")}</li>
        </ul>

        <Separator className="my-4" />
        <p className="font-bold">{t("technicalDecisions.linksTitle")}</p>
        <ul className="my-2 ml-4 list-none space-y-2">
          {LINKS.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary inline-flex items-center gap-1.5 transition-all hover:opacity-60"
              >
                <ExternalLink className="size-3.5" />
                {t(`technicalDecisions.${link.key}`)}
              </a>
            </li>
          ))}
        </ul>
      </>
    ),
  },
];
