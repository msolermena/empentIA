interface ComSActivaSectionProps {
  lang: "ca" | "es";
}

const content = {
  ca: {
    eyebrow: "Com s'activa",
    title: "Operatiu en",
    titleHighlight: "1-2 dies laborables.",
    subtitle:
      "Nosaltres ens encarreguem de tot. Tu només ens expliques el teu negoci.",
    steps: [
      {
        num: "01",
        title: "Contracta",
        desc: "Tria el pla i omple el formulari. En menys de 24h et contactem per confirmar i obtenir la informació del teu catàleg.",
      },
      {
        num: "02",
        title: "Configurem",
        desc: "El nostre equip configura i entrena l'agent amb el teu catàleg, el teu to de comunicació i les teves instruccions específiques.",
      },
      {
        num: "03",
        title: "Ven",
        desc: "Afegim el widget a la teva web amb una línia de codi. L'agent comença a atendre clients, generar leads i tancar vendes.",
      },
    ],
  },
  es: {
    eyebrow: "Cómo se activa",
    title: "Operativo en",
    titleHighlight: "1-2 días laborables.",
    subtitle:
      "Nosotros nos encargamos de todo. Tú solo nos explicas tu negocio.",
    steps: [
      {
        num: "01",
        title: "Contrata",
        desc: "Elige el plan y rellena el formulario. En menos de 24h te contactamos para confirmar y obtener la información de tu catálogo.",
      },
      {
        num: "02",
        title: "Configuramos",
        desc: "Nuestro equipo configura y entrena el agente con tu catálogo, tu tono de comunicación y tus instrucciones específicas.",
      },
      {
        num: "03",
        title: "Vende",
        desc: "Añadimos el widget a tu web con una línea de código. El agente empieza a atender clientes, generar leads y cerrar ventas.",
      },
    ],
  },
};

export function ComSActivaSection({ lang }: ComSActivaSectionProps) {
  const t = content[lang];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-500">
            {t.eyebrow}
          </p>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            {t.title}{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </h2>
          <p className="text-slate-400">{t.subtitle}</p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Línia connectora */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent md:block" />

          {t.steps.map((step) => (
            <div key={step.num} className="relative flex flex-col items-center text-center">
              <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-950/50">
                <span className="text-xl font-bold text-emerald-400">{step.num}</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
