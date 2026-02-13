"use client";

import { useState } from "react";

import { COOKIE_CONSENT_KEY } from "../constants";
import { Button } from "../ui/button";

function CookieBanner() {
  const [consent, setConsent] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;

    return localStorage.getItem(COOKIE_CONSENT_KEY);
  });

  if (consent) return null;

  function handleAccept(): void {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setConsent("accepted");
  }

  function handleDecline(): void {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setConsent("declined");
  }

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center">
      <div className="bg-background/90 flex items-center gap-4 rounded-lg border px-5 py-3 shadow-lg backdrop-blur-sm">
        <p className="text-muted-foreground text-sm">
          We use cookies to analyze site usage.
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={handleDecline}>
            Decline
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
