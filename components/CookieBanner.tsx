"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  COOKIE_CATEGORIES,
  CONSENT_OPEN_EVENT,
  acceptAll,
  hasDecided,
  readConsent,
  rejectAll,
  writeConsent,
  type CookieCategories,
} from "@/lib/cookie-consent";

type Mode = "hidden" | "banner" | "preferences";

const INITIAL_DENIED: CookieCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function CookieBanner() {
  const [mode, setMode] = useState<Mode>("hidden");
  const [selection, setSelection] = useState<CookieCategories>(INITIAL_DENIED);

  const syncSelectionFromStorage = useCallback(() => {
    const stored = readConsent();
    setSelection(stored ? stored.categories : INITIAL_DENIED);
  }, []);

  useEffect(() => {
    syncSelectionFromStorage();
    if (!hasDecided()) {
      setMode("banner");
    }
    const handleOpen = () => {
      syncSelectionFromStorage();
      setMode("preferences");
    };
    window.addEventListener(CONSENT_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, handleOpen);
  }, [syncSelectionFromStorage]);

  const close = useCallback(() => setMode("hidden"), []);

  const handleAcceptAll = useCallback(() => {
    acceptAll();
    close();
  }, [close]);

  const handleRejectAll = useCallback(() => {
    rejectAll();
    close();
  }, [close]);

  const handleSave = useCallback(() => {
    writeConsent(selection);
    close();
  }, [selection, close]);

  const toggleCategory = useCallback(
    (id: keyof CookieCategories) => {
      if (id === "necessary") return;
      setSelection((prev) => ({ ...prev, [id]: !prev[id] }));
    },
    [],
  );

  const lastUpdated = useMemo(() => "11 de febrer de 2026", []);

  if (mode === "hidden") return null;

  return (
    <>
      {mode === "banner" && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Avís de cookies"
          className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-emerald-500/20 bg-slate-900/95 p-5 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 sm:flex">
                <Cookie className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="flex-1 text-sm text-slate-300">
                <h2 className="mb-2 text-base font-semibold text-slate-100">
                  Respectem la teva privacitat
                </h2>
                <p>
                  Utilitzem cookies tècniques necessàries per al funcionament del lloc
                  i, si hi dones consentiment, cookies opcionals per a analítica i
                  preferències. Pots acceptar-les, rebutjar-les o configurar-les en
                  qualsevol moment.{" "}
                  <Link
                    href="/cookies"
                    className="font-medium text-emerald-400 underline-offset-2 hover:underline"
                  >
                    Més informació
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMode("preferences")}
                className="h-10 px-4 text-slate-300 hover:text-emerald-400"
              >
                Configurar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
                className="h-10 px-4"
              >
                Rebutjar totes
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="h-10 px-4"
              >
                Acceptar totes
              </Button>
            </div>
          </div>
        </div>
      )}

      {mode === "preferences" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Preferències de cookies"
          className="fixed inset-0 z-[110] flex items-end justify-center bg-slate-950/70 p-4 backdrop-blur-sm sm:items-center"
          onClick={(e) => {
            if (e.target === e.currentTarget && hasDecided()) close();
          }}
        >
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-emerald-500/20 bg-slate-900/95 shadow-2xl shadow-emerald-500/10">
            <div className="flex items-start justify-between gap-4 border-b border-emerald-500/10 p-6">
              <div>
                <h2 className="text-xl font-bold text-slate-100">
                  Preferències de cookies
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Darrera actualització de la política: {lastUpdated}
                </p>
              </div>
              {hasDecided() && (
                <button
                  type="button"
                  onClick={close}
                  aria-label="Tancar"
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="max-h-[60vh] space-y-3 overflow-y-auto p-6">
              <p className="text-sm text-slate-300">
                Activa o desactiva les categories de cookies. Els canvis es desaran
                quan premis <span className="font-semibold text-slate-200">Desar preferències</span>.
                Pots consultar el detall a la{" "}
                <Link href="/cookies" className="text-emerald-400 underline-offset-2 hover:underline">
                  Política de Cookies
                </Link>
                .
              </p>

              {COOKIE_CATEGORIES.map((cat) => {
                const enabled = selection[cat.id];
                return (
                  <div
                    key={cat.id}
                    className="rounded-xl border border-emerald-500/10 bg-slate-950/40 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-slate-100">
                          {cat.label}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-slate-400">
                          {cat.description}
                        </p>
                      </div>
                      <ToggleSwitch
                        label={`Activar categoria ${cat.label}`}
                        checked={enabled}
                        disabled={cat.required}
                        onChange={() => toggleCategory(cat.id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-emerald-500/10 p-6 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
                className="h-10 px-4"
              >
                Rebutjar totes
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAcceptAll}
                className="h-10 px-4"
              >
                Acceptar totes
              </Button>
              <Button size="sm" onClick={handleSave} className="h-10 px-4">
                Desar preferències
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

type ToggleProps = {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
};

function ToggleSwitch({ label, checked, disabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={onChange}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
        checked ? "bg-emerald-500" : "bg-slate-700",
        disabled && "cursor-not-allowed opacity-70",
      )}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </button>
  );
}
