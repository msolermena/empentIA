"use client";

import { Sparkles, Wrench, CalendarX, RefreshCw } from "lucide-react";

const items = [
  {
    icon: Sparkles,
    title: "Servei complet",
    desc: "Disseny, implementació, manteniment i suport. Tu només expliques què necessites.",
  },
  {
    icon: Wrench,
    title: "Fet a mida",
    desc: "Solucions adaptades als teus processos reals, no plantilles genèriques.",
  },
  {
    icon: CalendarX,
    title: "Sense permanència",
    desc: "Subscripció mensual flexible. Sense projectes de milers d'euros.",
  },
  {
    icon: RefreshCw,
    title: "Sempre actualitzat",
    desc: "Integrem les últimes novetats en IA. La tecnologia avança, tu també.",
  },
];

export function WhyEmpentiaV2() {
  return (
    <section className="relative py-14 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">
            Per què empentIA
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className="group flex gap-4 rounded-xl border border-slate-800/60 bg-slate-900/20 p-4 transition-all hover:border-emerald-500/20 hover:bg-slate-900/40"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                <item.icon className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-slate-100">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
