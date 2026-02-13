"use client";

import { useState } from "react";

import { COOKIE_CONSENT_KEY } from "../constants";
import { getConsent } from "../lib/utils";
import { Button } from "../ui/button";

function CookieBanner() {
  const [consent, setConsent] = useState(getConsent);

  if (consent) return null;

  function handleAccept(): void {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setConsent("accepted");
    window.location.reload();
  }

  function handleDecline(): void {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setConsent("declined");
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
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
