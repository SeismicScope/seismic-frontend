import { Lightbulb } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Separator } from "@/shared/ui/separator";

import AccordionView from "./accordion-view";
import { generalArchitectureSection } from "./general-acrhitecture-section";
import { keyFeaturesSection } from "./key-features-section";
import { overviewSection } from "./overview-sections";
import TabsView from "./tab-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
  };
}

async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <section className={"p-3 lg:p-16"}>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
        <h1 className="max-w-3xl text-3xl font-semibold text-pretty md:text-6xl lg:text-5xl">
          Seismic Intelligence Platform
        </h1>
        <h3 className="text-muted-foreground max-w-3xl text-lg md:text-xl">
          {t("description")}
        </h3>
      </div>
      <div className="mt-4">
        <div className="prose dark:prose-invert mx-auto max-w-3xl">
          <div className="hidden md:block">
            <TabsView t={t} />
          </div>
          <div className="md:hidden">
            <AccordionView sections={overviewSection} t={t} />
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="prose dark:prose-invert mx-auto max-w-3xl">
          <AccordionView sections={generalArchitectureSection} t={t} />
        </div>
      </div>

      <div className="md:hidden">
        <div className="prose dark:prose-invert mx-auto max-w-3xl">
          <AccordionView sections={keyFeaturesSection} t={t} />
        </div>
      </div>

      <div className="lg:mt-6">
        <div className="prose dark:prose-invert mx-auto max-w-3xl">
          <Separator className="mt-0 mb-4 lg:my-6" />
          <h4 className="text-xl font-extrabold">{t("aboutAuthor.title")}</h4>
          <p>
            {t("aboutAuthor.description_1")}
            <span className="font-semibold"> Vasyl Oliinyk </span>
            {t("aboutAuthor.description_2")}
          </p>
          <ul className="my-4 ml-4 list-disc">
            <li>
              <span className="font-semibold">
                {t("aboutAuthor.linkedIn")}:
              </span>{" "}
              <a
                href="https://www.linkedin.com/in/oleinik-vasiliiy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary transition-all hover:opacity-60"
              >
                Vasyl Oliinyk
              </a>
            </li>
            <li>
              <span className="font-semibold">
                {t("aboutAuthor.projectStorybook")}:
              </span>{" "}
              <a
                href="https://seismicscope.github.io/seismic-frontend/storybook/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary transition-all hover:opacity-60"
              >
                {t("aboutAuthor.projectStorybookLink")}
              </a>
            </li>
            <li>
              <span className="font-semibold">{t("aboutAuthor.beRepo")}:</span>{" "}
              <a
                href="https://github.com/SeismicScope/seismic-backend"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary transition-all hover:opacity-60"
              >
                {t("aboutAuthor.beRepoLink")}
              </a>
            </li>
          </ul>
          <Alert className="mt-4">
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>{t("engineeringFocusTitle")}</AlertTitle>
            <AlertDescription>{t("engineeringFocusText")}</AlertDescription>
          </Alert>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
