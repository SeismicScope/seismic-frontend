import { Lightbulb } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { cn } from "@/shared/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";

import { Separator } from "./separator";

interface Blogpost1Props {
  className?: string;
}

async function Blogpost({ className }: Blogpost1Props) {
  const t = await getTranslations("about");

  return (
    <section className={cn("p-3 lg:p-16", className)}>
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
          <h4 className="text-xl font-extrabold">
            {t("projectFocusOn.title")}
          </h4>
          <ul className="my-3 ml-4 list-disc">
            <li className="my-2">
              <span className="font-semibold">
                {t("projectFocusOn.1_title")}
              </span>
              {t("projectFocusOn.1_body")}
            </li>
            <li className="my-2">
              <span className="font-semibold">
                {t("projectFocusOn.2_title")}
              </span>
              {t("projectFocusOn.2_body")}
            </li>
            <li className="my-2">
              <span className="font-semibold">
                {t("projectFocusOn.3_title")}
              </span>
              {t("projectFocusOn.3_body")}
            </li>
            <li className="my-2">
              <span className="font-semibold">
                {t("projectFocusOn.4_title")}
              </span>
              {t("projectFocusOn.4_body")}
            </li>
            <li className="my-2">
              <span className="font-semibold">
                {t("projectFocusOn.5_title")}
              </span>
              {t("projectFocusOn.5_body")}
            </li>
            <li className="my-2">
              <span className="font-semibold">
                {t("projectFocusOn.6_title")}
              </span>
              {t("projectFocusOn.6_body")}
            </li>
            <li className="my-2">
              <span className="font-semibold">
                {t("projectFocusOn.7_title")}
              </span>{" "}
              {t("projectFocusOn.7_body")}
            </li>
          </ul>

          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>{t("notACrudTitle")}</AlertTitle>
            <AlertDescription>{t("notACrudText")}</AlertDescription>
          </Alert>
        </div>
      </div>

      <div className="mt-6">
        <div className="prose dark:prose-invert mx-auto max-w-3xl">
          <h4 className="text-xl font-extrabold">
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
        </div>
      </div>

      <div className="mt-10">
        <div className="prose dark:prose-invert mx-auto max-w-3xl">
          <Separator className="my-6" />
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

export default Blogpost;
