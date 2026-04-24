"use client";

import { Button } from "@/components/ui/button";
import { openPreferences, resetConsent } from "@/lib/cookie-consent";

export function CookiePreferencesButton() {
  return (
    <Button onClick={openPreferences} size="sm" className="h-10 px-4">
      Gestionar preferències
    </Button>
  );
}

export function CookieResetButton() {
  return (
    <Button
      onClick={() => {
        resetConsent();
        openPreferences();
      }}
      variant="outline"
      size="sm"
      className="h-10 px-4"
    >
      Revocar consentiment
    </Button>
  );
}
