import Link from "next/link";

type Lang = "es" | "ca" | "en";

interface LegalLangSwitchProps {
  es: string;
  ca: string;
  en: string;
  active: Lang;
}

const LABELS: Record<Lang, string> = { es: "ES", ca: "CA", en: "EN" };

/**
 * Selector de idioma para las páginas legales (mismo dominio).
 * Requisito de la App Review de Meta: los textos legales deben estar
 * disponibles en varias lenguas con un selector accesible.
 */
export function LegalLangSwitch({ es, ca, en, active }: LegalLangSwitchProps) {
  const hrefs: Record<Lang, string> = { es, ca, en };
  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      {(Object.keys(LABELS) as Lang[]).map((lang, i) => (
        <span key={lang} className="flex items-center gap-1">
          {i > 0 && <span className="text-slate-600">·</span>}
          {lang === active ? (
            <span className="text-emerald-400" aria-current="true">
              {LABELS[lang]}
            </span>
          ) : (
            <Link
              href={hrefs[lang]}
              hrefLang={lang}
              lang={lang}
              className="text-slate-400 hover:text-slate-200"
            >
              {LABELS[lang]}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
