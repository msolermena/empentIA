"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FinalCTAV2() {
  return (
    <section className="relative py-16 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-slate-900/50 p-8 text-center md:p-16">
          {/* Decorative glow */}
          <div className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl" />

          <div className="relative">
            <h3 className="mb-4 text-2xl font-bold text-slate-50 md:text-3xl">
              Descobreix en 3 minuts quant temps perd el teu negoci.
            </h3>
            <p className="mb-8 text-slate-400">
              L&apos;auditoria és gratuïta, sense compromís,
              i et mostra oportunitats concretes per al teu sector.
            </p>

            {/* CTA */}
            <div className="mb-6">
              <div className="mx-auto flex max-w-xl flex-col items-center gap-3 rounded-2xl border-2 border-slate-700 bg-slate-900/80 p-3 sm:flex-row sm:p-2">
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
            <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Gratuït
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
            <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 cursor-pointer hover:text-emerald-400 transition-colors">
              Ja saps què vols automatitzar? Explica&apos;ns-ho
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
