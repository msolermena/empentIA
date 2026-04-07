import { ArrowRight } from "lucide-react";

interface CasosUsSectionProps {
  lang: "ca" | "es";
}

const content = {
  ca: {
    eyebrow: "Casos d'ús reals",
    title: "Com l'estan fent servir",
    titleEnd: "negocis com el teu.",
    cases: [
      {
        sector: "Botiga de ciclisme online",
        detail: "630+ productes en catàleg",
        situation:
          "Els clients feien preguntes sobre compatibilitat de components, talles i accessoris. L'equip no donava l'abast i moltes consultes quedaven sense resposta hores.",
        solution:
          "L'agent coneix tot el catàleg i respon preguntes tècniques en temps real: compatibilitats, talles per alçada, diferències entre models. Genera pressupostos i afegeix al carret.",
        result: "Reducció de consultes sense resposta i vendes assistides que abans es perdien per falta d'atenció immediata.",
        color: "emerald",
      },
      {
        sector: "Tenda de sistemes de seguretat",
        detail: "Productes configurables amb múltiples opcions",
        situation:
          "Els seus productes (alarmes, càmeres, kits de seguretat) tenen múltiples opcions de configuració. El procés de venda requeria orientació personalitzada que no es podia escalar.",
        solution:
          "L'agent guia el client a través de les opcions de configuració, explica diferències entre models i genera pressupostos personalitzats amb les opcions seleccionades.",
        result: "Clients que abans marxaven per la complexitat ara completen la configuració i demanen pressupost de manera autònoma.",
        color: "teal",
      },
      {
        sector: "Distribuïdora B2B",
        detail: "Clients professionals amb necessitats de volum",
        situation:
          "Gestió de comandes repetitives de clients professionals amb tarifes especials, mínims de comanda i condicions negociades. L'equip comercial no podia atendre totes les consultes ràpidament.",
        solution:
          "L'agent identifica el tipus de client, consulta disponibilitat i tarifes, i escala a l'equip comercial quan cal negociació específica. Filtra leads no qualificats.",
        result: "L'equip comercial enfoca el seu temps en oportunitats reals mentre l'agent resol el 80% de consultes rutinàries.",
        color: "sky",
      },
    ],
  },
  es: {
    eyebrow: "Casos de uso reales",
    title: "Cómo lo están usando",
    titleEnd: "negocios como el tuyo.",
    cases: [
      {
        sector: "Tienda de ciclismo online",
        detail: "630+ productos en catálogo",
        situation:
          "Los clientes hacían preguntas sobre compatibilidad de componentes, tallas y accesorios. El equipo no daba abasto y muchas consultas quedaban sin respuesta durante horas.",
        solution:
          "El agente conoce todo el catálogo y responde preguntas técnicas en tiempo real: compatibilidades, tallas por altura, diferencias entre modelos. Genera presupuestos y añade al carrito.",
        result: "Reducción de consultas sin respuesta y ventas asistidas que antes se perdían por falta de atención inmediata.",
        color: "emerald",
      },
      {
        sector: "Tienda de sistemas de seguridad",
        detail: "Productos configurables con múltiples opciones",
        situation:
          "Sus productos (alarmas, cámaras, kits de seguridad) tienen múltiples opciones de configuración. El proceso de venta requería orientación personalizada que no podía escalarse.",
        solution:
          "El agente guía al cliente a través de las opciones de configuración, explica diferencias entre modelos y genera presupuestos personalizados con las opciones seleccionadas.",
        result: "Clientes que antes se iban por la complejidad ahora completan la configuración y solicitan presupuesto de forma autónoma.",
        color: "teal",
      },
      {
        sector: "Distribuidora B2B",
        detail: "Clientes profesionales con necesidades de volumen",
        situation:
          "Gestión de pedidos repetitivos de clientes profesionales con tarifas especiales, mínimos de pedido y condiciones negociadas. El equipo comercial no podía atender todas las consultas rápidamente.",
        solution:
          "El agente identifica el tipo de cliente, consulta disponibilidad y tarifas, y escala al equipo comercial cuando hace falta negociación específica. Filtra leads no cualificados.",
        result: "El equipo comercial enfoca su tiempo en oportunidades reales mientras el agente resuelve el 80% de consultas rutinarias.",
        color: "sky",
      },
    ],
  },
};

const colorMap = {
  emerald: "border-emerald-500/20 bg-emerald-950/10",
  teal: "border-teal-500/20 bg-teal-950/10",
  sky: "border-sky-500/20 bg-sky-950/10",
};

const dotColorMap = {
  emerald: "bg-emerald-500",
  teal: "bg-teal-500",
  sky: "bg-sky-500",
};

export function CasosUsSection({ lang }: CasosUsSectionProps) {
  const t = content[lang];
  const isCA = lang === "ca";

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

        <div className="space-y-6">
          {t.cases.map((c) => (
            <div
              key={c.sector}
              className={`rounded-2xl border p-8 ${colorMap[c.color as keyof typeof colorMap]}`}
            >
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${dotColorMap[c.color as keyof typeof dotColorMap]}`} />
                    <h3 className="font-semibold text-white">{c.sector}</h3>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{c.detail}</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
                    {isCA ? "Situació" : "Situación"}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-400">{c.situation}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
                    {isCA ? "Solució" : "Solución"}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-400">{c.solution}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
                    {isCA ? "Resultat" : "Resultado"}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-400">{c.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
