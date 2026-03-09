"use client";

import {
  BarChart3,
  Activity,
  Bot,
  Database,
  RefreshCw,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Impacte mesurable",
    desc: "Visualitza quantes hores estalvies i quin valor generen les teves automatitzacions",
  },
  {
    icon: Activity,
    title: "Automatitzacions actives",
    desc: "Monitoritza què s'ha executat: correus enviats, recordatoris, factures processades... Rep alertes quan cal la teva atenció",
  },
  {
    icon: Bot,
    title: "Agents IA que coneixen el teu negoci",
    desc: "Assistents que coneixen el teu negoci: responen consultes, classifiquen documents, analitzen dades i actuen per tu 24/7 (no ChatGPT genèric)",
  },
  {
    icon: Database,
    title: "Una sola font de veritat",
    desc: "Centralitza la informació del teu negoci en un sol lloc. T'ajudem a estructurar-la perquè automatitzacions i agents la puguin usar",
  },
  {
    icon: RefreshCw,
    title: "Sempre al dia",
    desc: "Integrem les últimes novetats en IA. La tecnologia avança, el teu negoci també",
  },
];

export function PlatformV2() {
  return (
    <section className="relative py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">
            Tot en un sol lloc. Totes les teves eines, una sola memòria.
          </h2>
          <p className="mx-auto max-w-2xl text-slate-400">
            empentIA connecta el que ja tens i ho centralitza.
            Les teves dades, els teus clients, les teves automatitzacions
            — visibles i accionables des d&apos;un sol portal.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Funcionalitats */}
          <div className="space-y-6">
            {features.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <item.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-100">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Screenshot */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
                <span className="ml-2 text-xs text-slate-500">
                  app.empentia.cat
                </span>
              </div>
              <img
                src="/images/screenshots/dashboard.png"
                alt="Plataforma empentIA - Dashboard"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
