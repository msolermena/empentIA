interface SocialProofBarProps {
  lang: "ca" | "es";
}

const content = {
  ca: {
    label: "Ja confien en empentIA:",
    clients: [
      "Botigues de ciclisme",
      "Empreses de seguretat",
      "Distribuïdores B2B",
      "Comerços locals",
    ],
    suffix: "i més negocis online",
  },
  es: {
    label: "Ya confían en empentIA:",
    clients: [
      "Tiendas de ciclismo",
      "Empresas de seguridad",
      "Distribuidoras B2B",
      "Comercios locales",
    ],
    suffix: "y más negocios online",
  },
};

export function SocialProofBar({ lang }: SocialProofBarProps) {
  const t = content[lang];

  return (
    <section className="border-y border-slate-800 bg-slate-900/50 py-6">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
          <span className="font-medium text-slate-400">{t.label}</span>
          {t.clients.map((client, i) => (
            <span key={i} className="flex items-center gap-3">
              <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-slate-400">
                {client}
              </span>
              {i < t.clients.length - 1 && (
                <span className="h-1 w-1 rounded-full bg-slate-700" />
              )}
            </span>
          ))}
          <span className="text-slate-600">{t.suffix}</span>
        </div>
      </div>
    </section>
  );
}
