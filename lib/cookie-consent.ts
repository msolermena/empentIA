/**
 * Mecanisme oficial de gestió del consentiment de cookies (empentIA).
 *
 * Compleix amb els criteris de l'AEPD i el RGPD/LOPDGDD:
 *  - El consentiment és granular per categoria.
 *  - Les cookies no tècniques NO s'activen fins que l'usuari dona consentiment explícit.
 *  - Rebutjar és tan senzill com acceptar.
 *  - El consentiment es pot revocar o modificar en qualsevol moment.
 *  - Es registra la versió de la política acceptada i la data; si la versió canvia,
 *    es torna a demanar consentiment.
 *  - El consentiment caduca als 12 mesos (s'ha de tornar a sol·licitar).
 */

export const COOKIE_CONSENT_VERSION = 1;
export const COOKIE_CONSENT_STORAGE_KEY = "empentia:cookie-consent";
export const COOKIE_CONSENT_COOKIE_NAME = "empentia_cc";
export const COOKIE_CONSENT_MAX_AGE_DAYS = 365;

export type CookieCategory = "necessary" | "analytics" | "marketing";

export type CookieCategories = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export type CookieConsent = {
  version: number;
  timestamp: string;
  categories: CookieCategories;
};

export const CONSENT_CHANGE_EVENT = "empentia:cookies:change";
export const CONSENT_OPEN_EVENT = "empentia:cookies:open";

const DEFAULT_DENIED: CookieCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const ALL_GRANTED: CookieCategories = {
  necessary: true,
  analytics: true,
  marketing: true,
};

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function readCookie(name: string): string | null {
  if (!isBrowser()) return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function writeCookie(name: string, value: string, days: number): void {
  if (!isBrowser()) return;
  const maxAge = days * 24 * 60 * 60;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
}

function deleteCookie(name: string): void {
  if (!isBrowser()) return;
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
}

function parseConsent(raw: string | null): CookieConsent | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    if (
      !parsed ||
      typeof parsed.version !== "number" ||
      typeof parsed.timestamp !== "string" ||
      !parsed.categories ||
      typeof parsed.categories.analytics !== "boolean" ||
      typeof parsed.categories.marketing !== "boolean"
    ) {
      return null;
    }
    return {
      version: parsed.version,
      timestamp: parsed.timestamp,
      categories: {
        necessary: true,
        analytics: parsed.categories.analytics,
        marketing: parsed.categories.marketing,
      },
    };
  } catch {
    return null;
  }
}

function isExpired(consent: CookieConsent): boolean {
  const ts = Date.parse(consent.timestamp);
  if (Number.isNaN(ts)) return true;
  const ageDays = (Date.now() - ts) / (1000 * 60 * 60 * 24);
  return ageDays > COOKIE_CONSENT_MAX_AGE_DAYS;
}

/**
 * Retorna el consentiment emmagatzemat si és vàlid i vigent; altrament null.
 * Un consentiment és vàlid si coincideix amb la versió actual i no ha caducat.
 */
export function readConsent(): CookieConsent | null {
  if (!isBrowser()) return null;
  const raw =
    window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) ??
    readCookie(COOKIE_CONSENT_COOKIE_NAME);
  const consent = parseConsent(raw);
  if (!consent) return null;
  if (consent.version !== COOKIE_CONSENT_VERSION) return null;
  if (isExpired(consent)) return null;
  return consent;
}

/**
 * Retorna true si l'usuari ja ha decidit (acceptat o rebutjat) amb la versió vigent.
 */
export function hasDecided(): boolean {
  return readConsent() !== null;
}

/**
 * Retorna true si la categoria té consentiment vigent.
 * Les cookies tècniques sempre retornen true.
 */
export function hasConsent(category: CookieCategory): boolean {
  if (category === "necessary") return true;
  const consent = readConsent();
  return consent?.categories[category] === true;
}

/**
 * Desa el consentiment, dispara l'esdeveniment de canvi i, si escau, neteja
 * cookies de categories revocades.
 */
export function writeConsent(categories: Partial<CookieCategories>): CookieConsent {
  const resolved: CookieCategories = {
    necessary: true,
    analytics: categories.analytics === true,
    marketing: categories.marketing === true,
  };
  const consent: CookieConsent = {
    version: COOKIE_CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    categories: resolved,
  };
  if (isBrowser()) {
    const serialized = JSON.stringify(consent);
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, serialized);
    writeCookie(COOKIE_CONSENT_COOKIE_NAME, serialized, COOKIE_CONSENT_MAX_AGE_DAYS);
    window.dispatchEvent(
      new CustomEvent<CookieConsent>(CONSENT_CHANGE_EVENT, { detail: consent }),
    );
  }
  return consent;
}

export function acceptAll(): CookieConsent {
  return writeConsent(ALL_GRANTED);
}

export function rejectAll(): CookieConsent {
  return writeConsent(DEFAULT_DENIED);
}

/**
 * Elimina el consentiment emmagatzemat. Això forçarà que el banner es torni
 * a mostrar en la següent càrrega.
 */
export function resetConsent(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
  deleteCookie(COOKIE_CONSENT_COOKIE_NAME);
  window.dispatchEvent(
    new CustomEvent<CookieConsent | null>(CONSENT_CHANGE_EVENT, { detail: null }),
  );
}

/**
 * Obre el modal de preferències. Pot cridar-se des de qualsevol component
 * (p. ex. un enllaç "Configura cookies" al peu o a la política de cookies).
 */
export function openPreferences(): void {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}

/**
 * Subscripció a canvis de consentiment. Retorna una funció per cancel·lar.
 * Útil per activar/desactivar scripts de tercers reactivament.
 */
export function onConsentChange(
  callback: (consent: CookieConsent | null) => void,
): () => void {
  if (!isBrowser()) return () => {};
  const handler = (event: Event) => {
    const detail = (event as CustomEvent<CookieConsent | null>).detail;
    callback(detail ?? readConsent());
  };
  window.addEventListener(CONSENT_CHANGE_EVENT, handler);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, handler);
}

export const COOKIE_CATEGORIES: Array<{
  id: CookieCategory;
  label: string;
  required: boolean;
  description: string;
}> = [
  {
    id: "necessary",
    label: "Tècniques (necessàries)",
    required: true,
    description:
      "Imprescindibles per al funcionament del lloc i del portal de client. Inclouen sessió d'autenticació i preferències bàsiques. No es poden desactivar.",
  },
  {
    id: "analytics",
    label: "Analítiques",
    required: false,
    description:
      "Permeten mesurar l'ús del lloc de forma agregada i anònima per millorar el contingut i el rendiment. Només s'activen amb el teu consentiment.",
  },
  {
    id: "marketing",
    label: "Màrqueting i preferències",
    required: false,
    description:
      "Fan servir informació de navegació per personalitzar continguts o mesurar campanyes. Actualment no n'hi ha de desplegades; quedaran desactivades fins que expressis consentiment.",
  },
];
