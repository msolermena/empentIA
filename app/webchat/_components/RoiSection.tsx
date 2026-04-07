interface RoiSectionProps {
  lang: "ca" | "es";
}

const content = {
  ca: {
    eyebrow: "Per què empentIA",
    title: "El cost de no tenir-lo",
    titleEnd: "és més alt que tenir-lo.",
    comparison: [
      {
        label: "Agent humà a jornada completa",
        cost: "1.800–2.500€/mes",
        notes: ["Horari limitat", "1 client alhora", "Vacances i baixes", "Formació contínua"],
        highlight: false,
        isBad: true,
      },
      {
        label: "empentIA Webchat",
        cost: "Des de 49€/mes",
        notes: ["24/7 sense descans", "Converses simultànies il·limitades", "Sempre actualitzat", "Llest en 48h"],
        highlight: true,
        isBad: false,
      },
    ],
    vsTitle: "vs chatbots tradicionals",
    vsRows: [
      { feature: "Respon preguntes del catàleg", traditional: false, empentia: true },
      { feature: "Genera pressupostos", traditional: false, empentia: true },
      { feature: "Afegeix al carret", traditional: false, empentia: true },
      { feature: "Aprèn del teu negoci", traditional: false, empentia: true },
      { feature: "Multiidioma automàtic", traditional: false, empentia: true },
      { feature: "Escalada a humà intel·ligent", traditional: false, empentia: true },
      { feature: "FAQs estàtiques", traditional: true, empentia: true },
    ],
    vsTraditional: "Chatbot FAQ",
    vsEmpentia: "empentIA",
  },
  es: {
    eyebrow: "Por qué empentIA",
    title: "El coste de no tenerlo",
    titleEnd: "es más alto que tenerlo.",
    comparison: [
      {
        label: "Agente humano a jornada completa",
        cost: "1.800–2.500€/mes",
        notes: ["Horario limitado", "1 cliente a la vez", "Vacaciones y bajas", "Formación continua"],
        highlight: false,
        isBad: true,
      },
      {
        label: "empentIA Webchat",
        cost: "Desde 49€/mes",
        notes: ["24/7 sin descanso", "Conversaciones simultáneas ilimitadas", "Siempre actualizado", "Listo en 48h"],
        highlight: true,
        isBad: false,
      },
    ],
    vsTitle: "vs chatbots tradicionales",
    vsRows: [
      { feature: "Responde preguntas del catálogo", traditional: false, empentia: true },
      { feature: "Genera presupuestos", traditional: false, empentia: true },
      { feature: "Añade al carrito", traditional: false, empentia: true },
      { feature: "Aprende de tu negocio", traditional: false, empentia: true },
      { feature: "Multiidioma automático", traditional: false, empentia: true },
      { feature: "Escalada a humano inteligente", traditional: false, empentia: true },
      { feature: "FAQs estáticas", traditional: true, empentia: true },
    ],
    vsTraditional: "Chatbot FAQ",
    vsEmpentia: "empentIA",
  },
};

export function RoiSection({ lang }: RoiSectionProps) {
  const t = content[lang];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-500">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t.title}{" "}
            <span className="text-slate-400">{t.titleEnd}</span>
          </h2>
        </div>

        {/* Comparativa cost */}
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          {t.comparison.map((item) => (
            <div
              key={item.label}
              className={`rounded-2xl border p-8 ${
                item.highlight
                  ? "border-emerald-500/40 bg-emerald-950/20"
                  : "border-slate-800 bg-slate-900/50"
              }`}
            >
              <p className="mb-2 text-sm text-slate-500">{item.label}</p>
              <p
                className={`mb-6 text-3xl font-bold ${
                  item.highlight ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {item.cost}
              </p>
              <ul className="space-y-2">
                {item.notes.map((note) => (
                  <li key={note} className="flex items-center gap-2 text-sm text-slate-400">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        item.highlight ? "bg-emerald-500" : "bg-red-500/50"
                      }`}
                    />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* vs chatbots */}
        <div>
          <h3 className="mb-6 text-center text-lg font-semibold text-slate-400">
            {t.vsTitle}
          </h3>
          <div className="overflow-hidden rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80">
                  <th className="py-3 pl-6 text-left font-medium text-slate-500" />
                  <th className="py-3 text-center font-semibold text-slate-500">
                    {t.vsTraditional}
                  </th>
                  <th className="py-3 text-center font-semibold text-emerald-400">
                    {t.vsEmpentia}
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.vsRows.map((row) => (
                  <tr key={row.feature} className="border-t border-slate-800/50">
                    <td className="py-3 pl-6 text-slate-400">{row.feature}</td>
                    <td className="py-3 text-center">
                      {row.traditional ? (
                        <span className="text-slate-400">✓</span>
                      ) : (
                        <span className="text-slate-700">✗</span>
                      )}
                    </td>
                    <td className="py-3 text-center text-emerald-400">✓</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
