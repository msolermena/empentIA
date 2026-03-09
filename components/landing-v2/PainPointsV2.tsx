"use client";

import { CheckCircle2 } from "lucide-react";

const items = [
  "Tens feines que fas cada setmana que saps perfectament que podrien fer-se soles",
  "El teu equip perd temps picant dades, enviant recordatoris o buscant documents",
  "Has provat ChatGPT però no saps com connectar-ho al teu negoci real",
  "Saps que la IA avança però no tens temps d'aprendre a implementar-la",
  "Vols que el teu negoci funcioni millor sense haver d'entendre de tecnologia",
];

export function PainPointsV2() {
  return (
    <section className="relative py-14 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">
            Si et passa alguna d&apos;aquestes coses, empentIA és per a tu.
          </h2>
        </div>

        <div className="space-y-4">
          {items.map((text) => (
            <div
              key={text}
              className="flex items-start gap-4 rounded-xl border border-slate-800/60 bg-slate-900/20 p-4 transition-all hover:border-emerald-500/20 hover:bg-slate-900/40"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <p className="text-base leading-relaxed text-slate-200">{text}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-lg text-slate-400">
          Si t&apos;hi veus reflectit,{" "}
          <span className="font-semibold text-emerald-400">empentIA és per a tu.</span>
        </p>
      </div>
    </section>
  );
}
