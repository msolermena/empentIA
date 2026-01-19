"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Loader2, Globe, Brain, CheckCircle2 } from "lucide-react";
import { getAuditStatus, AuditStatusResponse } from "@/lib/api";

const STEPS = [
  { id: 1, label: "Analitzant web", icon: Globe },
  { id: 2, label: "Detectant sector", icon: Brain },
  { id: 3, label: "Generant preguntes", icon: CheckCircle2 },
];

export default function AuditLoadingPage() {
  const params = useParams();
  const router = useRouter();
  const auditId = params.id as string;

  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<AuditStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let progressIntervalId: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const auditStatus = await getAuditStatus(auditId);
        setStatus(auditStatus);

        // Actualitzar step basat en el progres del backend
        if (auditStatus.progress) {
          const newProgress = auditStatus.progress;
          setProgress(newProgress);
          
          if (newProgress < 33) setCurrentStep(1);
          else if (newProgress < 66) setCurrentStep(2);
          else setCurrentStep(3);
        }

        // Si les preguntes estan llestes, redirigir
        if (auditStatus.status === "questions_ready") {
          clearInterval(intervalId);
          clearInterval(progressIntervalId);
          // TODO: Redirigir a pàgina de qüestionari
          router.push(`/audit/${auditId}/questions`);
        }

        // Si hi ha error
        if (auditStatus.status === "error") {
          clearInterval(intervalId);
          clearInterval(progressIntervalId);
          setError(auditStatus.error || "Error processant l'auditoria");
        }

      } catch (err) {
        console.error("Error checking status:", err);
        setError(err instanceof Error ? err.message : "Error desconegut");
        clearInterval(intervalId);
        clearInterval(progressIntervalId);
      }
    };

    // Polling cada 2 segons
    intervalId = setInterval(checkStatus, 2000);
    
    // Check inicial immediat
    checkStatus();

    // Progress bar smooth animation (mentre no tenim progres real del backend)
    if (!status?.progress) {
      progressIntervalId = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev; // No passar del 90% sense confirmació backend
          return prev + 1;
        });
      }, 300);
    }

    return () => {
      clearInterval(intervalId);
      clearInterval(progressIntervalId);
    };
  }, [auditId, router, status?.progress]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-8">
        <Card className="glass-card max-w-md border-2 border-red-500/20 p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/15">
              <Loader2 className="h-8 w-8 text-red-500" />
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-red-400">Error</h2>
          <p className="mb-6 text-muted-foreground">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="text-primary-400 hover:underline"
          >
            Tornar a l&apos;inici
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-primary-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center justify-between px-8">
          <Logo size="md" variant="image" />
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex min-h-screen items-center justify-center px-8 pt-20">
        <div className="w-full max-w-2xl">
          {/* Animated Background Glow */}
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow">
            <div className="h-full w-full rounded-full bg-primary-500/10 blur-3xl" />
          </div>

          <Card className="glass-card relative z-10 border-2 border-primary-500/20 p-12">
            {/* Spinner Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary-500/20" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary-500/15">
                  <Loader2 className="h-12 w-12 animate-spin text-primary-400" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="mb-3 text-center text-3xl font-bold">
              Analitzant la Teva Empresa
            </h1>

            {/* Company Name */}
            {status?.company_info?.name && (
              <p className="mb-8 text-center text-lg text-muted-foreground">
                {status.company_info.name}
              </p>
            )}

            {/* Progress Bar */}
            <div className="mb-8">
              <Progress value={progress} className="h-3" />
              <p className="mt-2 text-center text-sm text-muted-foreground">
                {Math.round(progress)}% completat
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              {STEPS.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-4 rounded-xl p-4 transition-all ${
                      isActive
                        ? "bg-primary-500/10 border-l-4 border-primary-500"
                        : isCompleted
                        ? "bg-emerald-500/5 border-l-4 border-emerald-500"
                        : "bg-slate-800/30 border-l-4 border-transparent"
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        isActive
                          ? "bg-primary-500/20"
                          : isCompleted
                          ? "bg-emerald-500/20"
                          : "bg-slate-700/30"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          isActive
                            ? "text-primary-400"
                            : isCompleted
                            ? "text-emerald-400"
                            : "text-slate-500"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-lg font-medium ${
                        isActive
                          ? "text-slate-50"
                          : isCompleted
                          ? "text-slate-200"
                          : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </span>
                    {isActive && (
                      <Loader2 className="ml-auto h-5 w-5 animate-spin text-primary-400" />
                    )}
                    {isCompleted && (
                      <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-400" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Info Text */}
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Això pot trigar entre 30 i 60 segons. Si us plau, no tanquis aquesta pàgina.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
