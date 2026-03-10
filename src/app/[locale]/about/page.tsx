import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AboutContent } from "@/widgets/about-content";

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

function AboutPage() {
  return <AboutContent />;
}

export default AboutPage;
