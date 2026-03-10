"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { COOKIE_CONSENT_KEY } from "../constants";
import { Button } from "../ui/button";

export default function CookieBanner() {
  const t = useTranslations();
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;

    const value = localStorage.getItem(COOKIE_CONSENT_KEY);

    return value !== "acknowledged";
  });

  if (!visible) return null;

  function handleAcknowledge(): void {
    localStorage.setItem(COOKIE_CONSENT_KEY, "acknowledged");
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 mx-3 flex justify-center">
      <div className="bg-background/90 flex items-center gap-4 rounded-lg border px-5 py-3 shadow-lg backdrop-blur-sm">
        <p className="text-muted-foreground text-sm">
          {t("general.cookieBannerText")}
        </p>
        <Button size="sm" onClick={handleAcknowledge}>
          {t("general.gotIt")}
        </Button>
      </div>
    </div>
  );
}
