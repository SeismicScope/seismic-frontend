import { getTranslations } from "next-intl/server";

import { Hero7 } from "@/shared/ui/hero7";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <main className="flex h-[calc(100vh-80px)] items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero7
        heading={t("title")}
        subtitle={t("subtitle")}
        description=""
        button={{
          text: t("cta"),
          url: "/dashboard",
        }}
        aria-label="Discover earthquakes!"
      />
    </main>
  );
}
