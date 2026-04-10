"use client";

import { useEffect } from "react";
import { MessageCircle } from "lucide-react";

interface DemoSectionProps {
  lang: "ca" | "es";
}

const content = {
  ca: {
    eyebrow: "Demo en viu",
    title: "Prova'l ara.",
    titleEnd: "Pregunta el que vulguis.",
    desc: "Estàs parlant amb un agent d'empentIA real. Pregunta-li sobre el servei, les funcionalitats, els preus o com es configuraria per al teu negoci.",
    suggestions: [
      "Com funciona el webchat?",
      "Quant costa el pla Pro?",
      "Funciona amb WooCommerce?",
      "Quan estaria operatiu?",
    ],
    suggestionsLabel: "Suggeriments per començar:",
  },
  es: {
    eyebrow: "Demo en vivo",
    title: "Pruébalo ahora.",
    titleEnd: "Pregunta lo que quieras.",
    desc: "Estás hablando con un agente de empentIA real. Pregúntale sobre el servicio, las funcionalidades, los precios o cómo se configuraría para tu negocio.",
    suggestions: [
      "¿Cómo funciona el webchat?",
      "¿Cuánto cuesta el plan Pro?",
      "¿Funciona con WooCommerce?",
      "¿Cuándo estaría operativo?",
    ],
    suggestionsLabel: "Sugerencias para empezar:",
  },
};

// instance_key de la instància webchat_empentia_landing_webchat
const INSTANCE_KEY = "48ad1eb9-e9ae-4933-89da-2165165d2e41";

export function DemoSection({ lang }: DemoSectionProps) {
  const t = content[lang];

  useEffect(() => {
    // Carrega el widget JS des del portal
    if (document.getElementById("empentia-widget-script")) return;

    const script = document.createElement("script");
    script.id = "empentia-widget-script";
    script.src = "https://app.empentia.com/widget.js";
    script.setAttribute("data-instance-key", INSTANCE_KEY);
    script.setAttribute("data-mode", "inline");
    script.setAttribute("data-container", "empentia-demo-container");
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // No eliminem l'script en unmount per evitar re-càrregues
    };
  }, []);

  return (
    <section id="demo" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-500">
            {t.eyebrow}
          </p>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            {t.title}{" "}
            <span className="text-slate-400">{t.titleEnd}</span>
          </h2>
          <p className="mx-auto max-w-xl text-slate-400">{t.desc}</p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/80 p-2 shadow-2xl shadow-emerald-900/20">
          {/* Barra mockup navegador */}
          <div className="mb-2 flex items-center gap-2 rounded-xl bg-slate-800/60 px-4 py-2">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
            </div>
            <div className="mx-auto flex items-center gap-2 rounded-md bg-slate-700/50 px-3 py-0.5 text-xs text-slate-500">
              <span>🔒</span>
              <span>labotiga.com</span>
            </div>
          </div>

          {/* Contenidor del widget */}
          <div
            id="empentia-demo-container"
            className="relative min-h-[520px] w-full overflow-hidden rounded-xl bg-slate-950"
          >
            {/* Placeholder mentre carrega */}
            <div className="flex h-full min-h-[520px] flex-col items-center justify-center gap-4 text-slate-600">
              <MessageCircle className="h-10 w-10 animate-pulse text-emerald-600/50" />
              <p className="text-sm">Carregant agent...</p>
            </div>
          </div>
        </div>

        {/* Suggeriments */}
        <div className="mt-6 text-center">
          <p className="mb-3 text-xs text-slate-600">{t.suggestionsLabel}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {t.suggestions.map((s) => (
              <span
                key={s}
                className="rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-xs text-slate-400"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
