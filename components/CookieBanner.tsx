"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
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
  type CookieCategory,
} from "@/lib/cookie-consent";

type Mode = "hidden" | "banner" | "preferences";
type Lang = "ca" | "es" | "en";

const INITIAL_DENIED: CookieCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

// El texto del banner se adapta al idioma de la página (ca / es / en) para no
// mezclar idiomas — requisito de la App Review de Meta en las páginas legales.
// La home y las landings estáticas usan otro sistema (public/cookie-consent.js).
type Strings = {
  ariaBanner: string;
  ariaPrefs: string;
  title: string;
  body: string;
  more: string;
  configure: string;
  reject: string;
  accept: string;
  prefsTitle: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  close: string;
  prefsIntroBefore: string;
  prefsIntroMiddle: string;
  prefsIntroAfter: string;
  save: string;
  policy: string;
  toggle: (label: string) => string;
  cookiesHref: string;
  categories: Record<CookieCategory, { label: string; description: string }>;
};

const I18N: Record<Lang, Strings> = {
  ca: {
    ariaBanner: "Avís de cookies",
    ariaPrefs: "Preferències de cookies",
    title: "Respectem la teva privacitat",
    body: "Utilitzem cookies tècniques necessàries per al funcionament del lloc i, si hi dones consentiment, cookies opcionals per a analítica i preferències. Pots acceptar-les, rebutjar-les o configurar-les en qualsevol moment.",
    more: "Més informació",
    configure: "Configurar",
    reject: "Rebutjar totes",
    accept: "Acceptar totes",
    prefsTitle: "Preferències de cookies",
    lastUpdatedLabel: "Darrera actualització de la política:",
    lastUpdated: "11 de febrer de 2026",
    close: "Tancar",
    prefsIntroBefore: "Activa o desactiva les categories de cookies. Els canvis es desaran quan premis ",
    prefsIntroMiddle: ". Pots consultar el detall a la ",
    prefsIntroAfter: ".",
    save: "Desar preferències",
    policy: "Política de Cookies",
    toggle: (label) => `Activar categoria ${label}`,
    cookiesHref: "/ca/cookies",
    categories: {
      necessary: {
        label: "Tècniques (necessàries)",
        description:
          "Imprescindibles per al funcionament del lloc i del portal de client. Inclouen sessió d'autenticació i preferències bàsiques. No es poden desactivar.",
      },
      analytics: {
        label: "Analítiques",
        description:
          "Permeten mesurar l'ús del lloc de forma agregada i anònima per millorar el contingut i el rendiment. Només s'activen amb el teu consentiment.",
      },
      marketing: {
        label: "Màrqueting i preferències",
        description:
          "Fan servir informació de navegació per personalitzar continguts o mesurar campanyes. Actualment no n'hi ha de desplegades; quedaran desactivades fins que expressis consentiment.",
      },
    },
  },
  es: {
    ariaBanner: "Aviso de cookies",
    ariaPrefs: "Preferencias de cookies",
    title: "Respetamos tu privacidad",
    body: "Usamos cookies técnicas necesarias para el funcionamiento del sitio y, si das tu consentimiento, cookies opcionales de analítica y preferencias. Puedes aceptarlas, rechazarlas o configurarlas en cualquier momento.",
    more: "Más información",
    configure: "Configurar",
    reject: "Rechazar todas",
    accept: "Aceptar todas",
    prefsTitle: "Preferencias de cookies",
    lastUpdatedLabel: "Última actualización de la política:",
    lastUpdated: "11 de febrero de 2026",
    close: "Cerrar",
    prefsIntroBefore: "Activa o desactiva las categorías de cookies. Los cambios se guardarán cuando pulses ",
    prefsIntroMiddle: ". Puedes consultar el detalle en la ",
    prefsIntroAfter: ".",
    save: "Guardar preferencias",
    policy: "Política de Cookies",
    toggle: (label) => `Activar categoría ${label}`,
    cookiesHref: "/cookies",
    categories: {
      necessary: {
        label: "Técnicas (necesarias)",
        description:
          "Imprescindibles para el funcionamiento del sitio y del portal de cliente. Incluyen sesión de autenticación y preferencias básicas. No se pueden desactivar.",
      },
      analytics: {
        label: "Analíticas",
        description:
          "Permiten medir el uso del sitio de forma agregada y anónima para mejorar el contenido y el rendimiento. Solo se activan con tu consentimiento.",
      },
      marketing: {
        label: "Marketing y preferencias",
        description:
          "Usan información de navegación para personalizar contenidos o medir campañas. Actualmente no hay ninguna desplegada; quedarán desactivadas hasta que expreses tu consentimiento.",
      },
    },
  },
  en: {
    ariaBanner: "Cookie notice",
    ariaPrefs: "Cookie preferences",
    title: "We respect your privacy",
    body: "We use necessary technical cookies for the site to work and, with your consent, optional cookies for analytics and preferences. You can accept, reject or configure them at any time.",
    more: "More information",
    configure: "Configure",
    reject: "Reject all",
    accept: "Accept all",
    prefsTitle: "Cookie preferences",
    lastUpdatedLabel: "Policy last updated:",
    lastUpdated: "11 February 2026",
    close: "Close",
    prefsIntroBefore: "Enable or disable cookie categories. Changes are saved when you press ",
    prefsIntroMiddle: ". See the details in the ",
    prefsIntroAfter: ".",
    save: "Save preferences",
    policy: "Cookie Policy",
    toggle: (label) => `Enable category ${label}`,
    cookiesHref: "/cookies",
    categories: {
      necessary: {
        label: "Technical (necessary)",
        description:
          "Essential for the site and the client portal to work. They include the authentication session and basic preferences. They cannot be disabled.",
      },
      analytics: {
        label: "Analytics",
        description:
          "Allow measuring site usage in an aggregated, anonymous way to improve content and performance. Only enabled with your consent.",
      },
      marketing: {
        label: "Marketing and preferences",
        description:
          "Use browsing information to personalize content or measure campaigns. None are currently deployed; they remain disabled until you give consent.",
      },
    },
  },
};

function langFromPath(pathname: string | null): Lang {
  if (!pathname) return "es";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/ca" || pathname.startsWith("/ca/")) return "ca";
  return "es";
}

export function CookieBanner() {
  const pathname = usePathname();
  const t = useMemo(() => I18N[langFromPath(pathname)], [pathname]);

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

  if (mode === "hidden") return null;

  return (
    <>
      {mode === "banner" && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label={t.ariaBanner}
          className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-emerald-500/20 bg-slate-900/95 p-5 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 sm:flex">
                <Cookie className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="flex-1 text-sm text-slate-300">
                <h2 className="mb-2 text-base font-semibold text-slate-100">
                  {t.title}
                </h2>
                <p>
                  {t.body}{" "}
                  <Link
                    href={t.cookiesHref}
                    className="font-medium text-emerald-400 underline-offset-2 hover:underline"
                  >
                    {t.more}
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
                {t.configure}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
                className="h-10 px-4"
              >
                {t.reject}
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="h-10 px-4"
              >
                {t.accept}
              </Button>
            </div>
          </div>
        </div>
      )}

      {mode === "preferences" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.ariaPrefs}
          className="fixed inset-0 z-[110] flex items-end justify-center bg-slate-950/70 p-4 backdrop-blur-sm sm:items-center"
          onClick={(e) => {
            if (e.target === e.currentTarget && hasDecided()) close();
          }}
        >
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-emerald-500/20 bg-slate-900/95 shadow-2xl shadow-emerald-500/10">
            <div className="flex items-start justify-between gap-4 border-b border-emerald-500/10 p-6">
              <div>
                <h2 className="text-xl font-bold text-slate-100">
                  {t.prefsTitle}
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  {t.lastUpdatedLabel} {t.lastUpdated}
                </p>
              </div>
              {hasDecided() && (
                <button
                  type="button"
                  onClick={close}
                  aria-label={t.close}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="max-h-[60vh] space-y-3 overflow-y-auto p-6">
              <p className="text-sm text-slate-300">
                {t.prefsIntroBefore}
                <span className="font-semibold text-slate-200">{t.save}</span>
                {t.prefsIntroMiddle}
                <Link href={t.cookiesHref} className="text-emerald-400 underline-offset-2 hover:underline">
                  {t.policy}
                </Link>
                {t.prefsIntroAfter}
              </p>

              {COOKIE_CATEGORIES.map((cat) => {
                const enabled = selection[cat.id];
                const label = t.categories[cat.id].label;
                return (
                  <div
                    key={cat.id}
                    className="rounded-xl border border-emerald-500/10 bg-slate-950/40 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-slate-100">
                          {label}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-slate-400">
                          {t.categories[cat.id].description}
                        </p>
                      </div>
                      <ToggleSwitch
                        label={t.toggle(label)}
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
                {t.reject}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAcceptAll}
                className="h-10 px-4"
              >
                {t.accept}
              </Button>
              <Button size="sm" onClick={handleSave} className="h-10 px-4">
                {t.save}
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
