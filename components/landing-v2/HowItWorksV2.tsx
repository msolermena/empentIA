"use client";

import {
  Search,
  FileText,
  Rocket,
  LayoutDashboard,
} from "lucide-react";

const steps = [
  {
    num: "1",
    icon: Search,
    title: "Auditoria",
    desc: "Analitzem el teu negoci i detectem oportunitats d'automatització",
  },
  {
    num: "2",
    icon: FileText,
    title: "Proposta",
    desc: "Et presentem solucions a mida amb preu clar",
  },
  {
    num: "3",
    icon: Rocket,
    title: "Implementació",
    desc: "Ho construïm i configurem nosaltres",
  },
  {
    num: "4",
    icon: LayoutDashboard,
    title: "Funciona!",
    desc: "Supervisa resultats des de la teva plataforma",
    highlight: true,
  },
];

export function HowItWorksV2() {
  return (
    <section className="relative py-16 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">
            Com funciona
          </h2>
        </div>

        <div className="relative">
          {/* Línia connectora (només desktop) */}
          <div className="absolute left-0 right-0 top-[60px] mx-auto hidden h-0.5 w-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0 md:block" />

          <div className="grid gap-8 md:grid-cols-4 md:gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="relative flex gap-4 md:flex-col md:items-center md:text-center"
              >
                <div
                  className={`relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl ${
                    step.highlight
                      ? "bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/30"
                      : "border-2 border-slate-700 bg-slate-900"
                  }`}
                >
                  <step.icon
                    className={`h-7 w-7 ${
                      step.highlight ? "text-white" : "text-emerald-400"
                    }`}
                  />
                </div>

                <div className="flex-1 pt-1 md:pt-6">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-500">
                    Pas {step.num}
                  </div>
                  <h3
                    className={`mb-2 text-lg font-bold ${
                      step.highlight ? "text-emerald-400" : "text-slate-100"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
