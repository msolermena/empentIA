"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Progress } from "@/components/ui/progress";
import { Loader2, Globe, Brain, Zap, CheckCircle2 } from "lucide-react";
import { scrapeAndStartAudit } from "@/lib/api";

const LOADING_STEPS = [
  {
    icon: Globe,
    message: "Analitzant la teva web...",
    duration: 2500,
  },
  {
    icon: Brain,
    message: "Detectant sector i tecnologies...",
    duration: 2500,
  },
  {
    icon: Zap,
    message: "Identificant oportunitats d'automatització...",
    duration: 2500,
  },
  {
    icon: CheckCircle2,
    message: "Preparant preguntes personalitzades...",
    duration: 2000,
  },
];

export default function AnalyzingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const source = searchParams.get("source"); // 🆕 Per test de validació

  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 🆕 Scroll to top al carregar
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    if (!url) {
      router.push("/");
      return;
    }

    // Animació de progrés - 30% MÉS RÀPID
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev; // No arribem a 100% fins que API respongui
        // 30% més ràpid: incrementem 0.7 cada 200ms (abans 0.5)
        return prev + 0.7;
      });
    }, 200);

    // Canviar missatges
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < LOADING_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2500);

    // Cridar API
    const startAudit = async () => {
      try {
        const response = await scrapeAndStartAudit(url);
        
        // Completar progrés
        setProgress(100);
        
        // Petit delay per veure 100%
        setTimeout(() => {
          // 🆕 Propagar source si és test de validació
          const nextUrl = source === "test"
            ? `/audit/${response.audit_id}/questions?source=test`
            : `/audit/${response.audit_id}/questions`;
          router.push(nextUrl);
        }, 500);
      } catch (err) {
        clearInterval(progressInterval);
        clearInterval(stepInterval);
        setError(err instanceof Error ? err.message : "Error analitzant l'empresa");
      }
    };

    startAudit();

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [url, router, source]);

  const CurrentIcon = LOADING_STEPS[currentStep].icon;

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-8">
        <div className="glass-card max-w-md rounded-2xl border-2 border-red-500/20 p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/15">
              <Loader2 className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <h2 className="mb-2 text-xl font-bold text-slate-200">Error d'Anàlisi</h2>
          <p className="mb-6 text-red-400">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="rounded-lg bg-slate-700 px-6 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-600"
          >
            Tornar a l'inici
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-emerald-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center px-8">
          <Logo size="md" variant="image" />
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex min-h-screen items-center justify-center px-8 pt-28">
        <div className="w-full max-w-2xl">
          {/* Animated Background Glow */}
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow">
            <div className="h-full w-full rounded-full bg-emerald-500/10 blur-3xl" />
          </div>

          {/* Loading Card */}
          <div className="glass-card relative z-10 rounded-2xl border-2 border-emerald-500/20 p-8 md:p-12">
            {/* Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                {/* Spinning ring */}
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-emerald-400 opacity-50" />
                
                {/* Center icon */}
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/15">
                  <CurrentIcon className="h-12 w-12 text-emerald-400 transition-all duration-300" />
                </div>
              </div>
            </div>

            {/* Message */}
            <h2 className="mb-3 text-center text-2xl font-bold text-slate-50 md:text-3xl">
              {LOADING_STEPS[currentStep].message}
            </h2>
            <p className="mb-8 text-center text-muted-foreground">
              Estem analitzant <strong className="text-slate-300">{url}</strong> amb intel·ligència artificial
            </p>

            {/* Progress Bar */}
            <div className="mb-2">
              <Progress value={progress} className="h-3" />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {Math.round(progress)}% completat
            </p>

            {/* Steps Indicator */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {LOADING_STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index <= currentStep
                      ? "bg-emerald-400 w-8"
                      : "bg-slate-700"
                  }`}
                />
              ))}
            </div>

            {/* Fun Fact - Font: Sage Research */}
            <div className="mt-8 rounded-xl bg-slate-800/30 p-4 text-center">
              <p className="text-sm text-slate-300">
                💡 Les pimes dediquen de mitjana un{" "}
                <strong className="text-emerald-400">17% del temps</strong> a tasques administratives automatitzables.
              </p>
              <p className="text-xs text-slate-500 mt-1">Font: Sage Research</p>
            </div>
          </div>

          {/* Fine Print */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Aquest procés normalment triga 10-15 segons. Si triga més, pot ser que la web sigui complexa.
          </p>
        </div>
      </div>
    </div>
  );
}
