"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

import { HeroSection } from "@/app/webchat/_components/HeroSection";
import { SocialProofBar } from "@/app/webchat/_components/SocialProofBar";
import { ProblemaSection } from "@/app/webchat/_components/ProblemaSection";
import { DemoSection } from "@/app/webchat/_components/DemoSection";
import { FuncionalitatsSection } from "@/app/webchat/_components/FuncionalitatsSection";
import { PricingSection } from "@/app/webchat/_components/PricingSection";
import { CasosUsSection } from "@/app/webchat/_components/CasosUsSection";
import { RoiSection } from "@/app/webchat/_components/RoiSection";
import { ComSActivaSection } from "@/app/webchat/_components/ComSActivaSection";
import { FaqSection } from "@/app/webchat/_components/FaqSection";
import { CtaFinalSection } from "@/app/webchat/_components/CtaFinalSection";
import { ContractacioModal } from "@/app/webchat/_components/ContractacioModal";

const LANG = "es" as const;

export default function WebchatLandingES() {
  const [modalOpen, setModalOpen] = useState(false);
  const [plaModal, setPlaModal] = useState<"Starter" | "Pro" | "Business">("Pro");

  const openModal = (pla: "Starter" | "Pro" | "Business" = "Pro") => {
    setPlaModal(pla);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* ── Header ── */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo size="sm" />

          <nav className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
            <button
              type="button"
              onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-white"
            >
              Demo
            </button>
            <button
              type="button"
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-white"
            >
              Precios
            </button>
            <button
              type="button"
              onClick={() => document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-white"
            >
              Contacto
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {/* Selector idioma */}
            <div className="flex items-center rounded-lg border border-slate-700 text-xs">
              <Link
                href="/webchat"
                className="rounded-l-lg px-2.5 py-1.5 text-slate-500 hover:text-white"
              >
                CA
              </Link>
              <span className="rounded-r-lg bg-slate-800 px-2.5 py-1.5 font-semibold text-white">
                ES
              </span>
            </div>

            <button
              type="button"
              onClick={() => openModal()}
              className="hidden rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 md:block"
            >
              Actívalo ahora
            </button>
          </div>
        </div>
      </header>

      {/* ── Seccions ── */}
      <main>
        <HeroSection lang={LANG} />
        <SocialProofBar lang={LANG} />
        <ProblemaSection lang={LANG} />
        <DemoSection lang={LANG} />
        <FuncionalitatsSection lang={LANG} />
        <PricingSection lang={LANG} onContractar={openModal} />
        <CasosUsSection lang={LANG} />
        <RoiSection lang={LANG} />
        <ComSActivaSection lang={LANG} />
        <FaqSection lang={LANG} />
        <CtaFinalSection lang={LANG} onContractar={() => openModal()} />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800 px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center text-sm text-slate-600 md:flex-row md:justify-between md:text-left">
          <Logo size="sm" className="opacity-40" />
          <p>© {new Date().getFullYear()} empentIA. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/legal" className="hover:text-slate-400">
              Aviso legal
            </Link>
            <Link href="/privacy" className="hover:text-slate-400">
              Privacidad
            </Link>
            <Link href="/cookies" className="hover:text-slate-400">
              Cookies
            </Link>
          </div>
        </div>
      </footer>

      {/* ── Modal contractació ── */}
      <ContractacioModal
        lang={LANG}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        plaInicial={plaModal}
      />
    </div>
  );
}
