"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Zap, Clock, TrendingDown } from "lucide-react";

interface HeroSectionProps {
  lang: "ca" | "es";
}

const content = {
  ca: {
    badge: "Agent IA per a botigues online",
    title: "El teu millor comercial",
    titleHighlight: "treballa 24/7",
    subtitle:
      "Un agent d'intel·ligència artificial que coneix el teu catàleg, assessora clients, genera pressupostos i tanca vendes. Sense descans, sense errors, sense formació.",
    cta1: "Prova la demo ara",
    cta2: "Veure plans i preus",
    stats: [
      { icon: Clock, value: "24/7", label: "Disponible sempre" },
      { icon: Zap, value: "<1s", label: "Temps de resposta" },
      { icon: TrendingDown, value: "<0,10€", label: "Per conversa" },
    ],
  },
  es: {
    badge: "Agente IA para tiendas online",
    title: "Tu mejor comercial",
    titleHighlight: "trabaja 24/7",
    subtitle:
      "Un agente de inteligencia artificial que conoce tu catálogo, asesora clientes, genera presupuestos y cierra ventas. Sin descanso, sin errores, sin formación.",
    cta1: "Prueba la demo ahora",
    cta2: "Ver planes y precios",
    stats: [
      { icon: Clock, value: "24/7", label: "Disponible siempre" },
      { icon: Zap, value: "<1s", label: "Tiempo de respuesta" },
      { icon: TrendingDown, value: "<0,10€", label: "Por conversación" },
    ],
  },
};

export function HeroSection({ lang }: HeroSectionProps) {
  const t = content[lang];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          {t.badge}
        </div>

        {/* Titular */}
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
          {t.title}{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            {t.titleHighlight}
          </span>
        </h1>

        {/* Subtítol */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
          {t.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            onClick={() => scrollTo("demo")}
            className="min-w-[200px] bg-emerald-600 text-white hover:bg-emerald-500"
          >
            {t.cta1}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollTo("pricing")}
            className="min-w-[200px] border-slate-600 text-slate-300 hover:border-emerald-500 hover:text-emerald-400"
          >
            {t.cta2}
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-800 pt-12">
          {t.stats.map((stat) => (
            <div key={stat.value} className="flex flex-col items-center gap-2">
              <stat.icon className="h-5 w-5 text-emerald-500" />
              <span className="text-2xl font-bold text-white sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-sm text-slate-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-600">
        <ArrowDown className="h-5 w-5" />
      </div>
    </section>
  );
}
