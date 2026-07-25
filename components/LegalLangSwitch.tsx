import Link from "next/link";

type Lang = "es" | "ca" | "en";

interface LegalLangSwitchProps {
  es: string;
  ca: string;
  /** Opcional: las páginas en inglés son huérfanas (para la App Review de Meta) y no se enlazan. */
  en?: string;
  active: Lang;
}

const LABELS: Record<Lang, string> = { es: "ES", ca: "CA", en: "EN" };

/**
 * Selector de idioma para las páginas legales indexadas (ES/CA, mismo dominio).
 * Las versiones EN son huérfanas por indicación de Meta, así que no aparecen aquí
 * salvo que se pase la prop `en` explícitamente.
 */
export function LegalLangSwitch({ es, ca, en, active }: LegalLangSwitchProps) {
  const hrefs: Partial<Record<Lang, string>> = { es, ca, en };
  const langs = (Object.keys(LABELS) as Lang[]).filter((l) => hrefs[l]);
  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      {langs.map((lang, i) => (
        <span key={lang} className="flex items-center gap-1">
          {i > 0 && <span className="text-slate-600">·</span>}
          {lang === active ? (
            <span className="text-emerald-400" aria-current="true">
              {LABELS[lang]}
            </span>
          ) : (
            <Link
              href={hrefs[lang] as string}
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
