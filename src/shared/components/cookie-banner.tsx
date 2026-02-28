"use client";
import { useState } from "react";

import { COOKIE_CONSENT_KEY } from "../constants";
import { Button } from "../ui/button";

export default function CookieBanner() {
  const [visible, setVisible] = useState<boolean>(() => {
    const seen = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!seen) {
      localStorage.setItem(COOKIE_CONSENT_KEY, "seen");

      return true;
    }

    return false;
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
          We use cookies to improve your experience, analyze site usage, and
          support our services. By continuing to use this site, you agree to our
          use of cookies.
        </p>
        <Button size="sm" onClick={handleAcknowledge}>
          Got it
        </Button>
      </div>
    </div>
  );
}
