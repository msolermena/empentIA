"use client";

import { NavbarV2 } from "@/components/landing-v2/NavbarV2";
import { HeroV2 } from "@/components/landing-v2/HeroV2";
import { PainPointsV2 } from "@/components/landing-v2/PainPointsV2";
import { ExamplesV2 } from "@/components/landing-v2/ExamplesV2";
import { HowItWorksV2 } from "@/components/landing-v2/HowItWorksV2";
import { PlatformV2 } from "@/components/landing-v2/PlatformV2";
import { WhyEmpentiaV2 } from "@/components/landing-v2/WhyEmpentiaV2";
import { ClaimsV2 } from "@/components/landing-v2/ClaimsV2";
import { FinalCTAV2 } from "@/components/landing-v2/FinalCTAV2";

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Gradient background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[400px] -right-[400px] h-[800px] w-[800px] rounded-full bg-emerald-500/[0.07] blur-3xl" />
        <div className="absolute -bottom-[400px] -left-[400px] h-[800px] w-[800px] rounded-full bg-emerald-500/[0.05] blur-3xl" />
      </div>

      <NavbarV2 />
      <HeroV2 />
      <PainPointsV2 />
      <ExamplesV2 />
      <HowItWorksV2 />
      <PlatformV2 />
      <WhyEmpentiaV2 />
      <ClaimsV2 />
      <FinalCTAV2 />

      {/* Footer simple */}
      <footer className="border-t border-slate-800 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-sm text-slate-500">© 2026 empentIA</p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <span className="text-slate-500 cursor-pointer hover:text-slate-300 transition-colors">
                Política de privacitat
              </span>
              <span className="text-slate-500 cursor-pointer hover:text-slate-300 transition-colors">
                Avís legal
              </span>
              <span className="text-slate-500 cursor-pointer hover:text-slate-300 transition-colors">
                Cookies
              </span>
              <span className="text-slate-500 cursor-pointer hover:text-slate-300 transition-colors">
                Contacte
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
