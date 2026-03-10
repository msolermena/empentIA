"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroV2() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Main headline */}
        <h1 className="fade-in-up mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-50 md:text-6xl lg:text-7xl">
          Guanya temps.
          <br />
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Decideix millor.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="fade-in-up-delay-1 mx-auto mb-10 max-w-2xl text-lg text-slate-400 md:text-xl">
          Automatitzacions i agents IA a mida per impulsar l&apos;eficiència
          i el creixement del teu negoci.{" "}
          <span className="text-slate-300">Sense complicacions tècniques.</span>
        </p>

        {/* Claim abans del CTA */}
        <p className="fade-in-up-delay-2 mb-4 text-slate-300">
          Descobreix com pots recuperar hores cada setmana →
        </p>

        {/* CTA Principal */}
        <div className="fade-in-up-delay-2 mb-6">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-2xl border-2 border-slate-700 bg-slate-900/80 p-3 backdrop-blur-sm sm:flex-row sm:p-2">
            <Input
              type="text"
              placeholder="La teva web (ex: empresa.cat)"
              className="flex-1 border-2 border-slate-600 bg-slate-800/80 rounded-xl px-4 h-14 text-base placeholder:text-slate-400 focus:border-emerald-500 focus:ring-0"
              readOnly
            />
            <Button size="lg" className="gap-2 whitespace-nowrap w-full sm:w-auto">
              Comença l&apos;auditoria
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="fade-in-up-delay-2 mb-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Auditoria gratuïta
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            3 minuts
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Sense compromís
          </span>
        </div>

        {/* CTA Secundari */}
        <div className="fade-in-up-delay-3">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors">
            Ja saps què vols automatitzar? Explica&apos;ns-ho
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </section>
  );
}
