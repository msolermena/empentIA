import { MessageSquareOff, Clock3, UserX } from "lucide-react";

interface ProblemaSectionProps {
  lang: "ca" | "es";
}

const content = {
  ca: {
    eyebrow: "El problema",
    title: "Els teus clients fan preguntes.",
    titleEnd: "Tu no pots respondre-les totes.",
    problems: [
      {
        icon: Clock3,
        stat: "68%",
        title: "abandonen sense comprar",
        desc: "dels visitants marxen si no troben resposta ràpida a un dubte. Cada pregunta no resposta és una venda perduda.",
      },
      {
        icon: MessageSquareOff,
        stat: "€0",
        title: "facturats fora d'horari",
        desc: "El teu negoci tanca. Les preguntes dels clients no. Cada nit i cap de setmana és una oportunitat perduda.",
      },
      {
        icon: UserX,
        stat: "2.000€",
        title: "cost mínim d'un agent humà",
        desc: "Un comercial a jornada completa costa entre 1.800 i 2.500€/mes. I no pot atendre 10 clients alhora.",
      },
    ],
  },
  es: {
    eyebrow: "El problema",
    title: "Tus clientes hacen preguntas.",
    titleEnd: "Tú no puedes responderlas todas.",
    problems: [
      {
        icon: Clock3,
        stat: "68%",
        title: "abandonan sin comprar",
        desc: "de los visitantes se van si no encuentran respuesta rápida a una duda. Cada pregunta sin respuesta es una venta perdida.",
      },
      {
        icon: MessageSquareOff,
        stat: "€0",
        title: "facturados fuera de horario",
        desc: "Tu negocio cierra. Las preguntas de tus clientes no. Cada noche y fin de semana es una oportunidad perdida.",
      },
      {
        icon: UserX,
        stat: "2.000€",
        title: "coste mínimo de un agente humano",
        desc: "Un comercial a jornada completa cuesta entre 1.800 y 2.500€/mes. Y no puede atender 10 clientes a la vez.",
      },
    ],
  },
};

export function ProblemaSection({ lang }: ProblemaSectionProps) {
  const t = content[lang];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-500">
          {t.eyebrow}
        </p>
        <h2 className="mb-16 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
          {t.title}{" "}
          <span className="text-slate-500">{t.titleEnd}</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {t.problems.map((p) => (
            <div
              key={p.stat}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8"
            >
              <p.icon className="mb-4 h-8 w-8 text-red-400/70" />
              <p className="mb-1 text-4xl font-bold text-red-400">{p.stat}</p>
              <p className="mb-3 font-semibold text-white">{p.title}</p>
              <p className="text-sm leading-relaxed text-slate-500">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
