"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Mail, Lock, FileText, TrendingUp, Zap, Loader2, ClipboardList, ArrowRight } from "lucide-react";
import { generateAudit } from "@/lib/api";

export default function EmailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const auditId = params.id as string;
  const source = searchParams.get("source"); // 🆕 Per test de validació
  const isTestMode = source === "test";

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // 🆕 En mode test, generar auditoria automàticament sense email
  useEffect(() => {
    if (isTestMode && !isGenerating) {
      setIsGenerating(true);
      generateAudit(auditId, "test@empentia.cat")
        .then((data) => {
          if (data.success) {
            // No redirigim automàticament, deixem que l'usuari cliqui
          }
        })
        .catch((err) => {
          console.error("Error generant auditoria:", err);
        });
    }
  }, [isTestMode, auditId, isGenerating]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validació
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Si us plau, introdueix un email vàlid");
      return;
    }

    if (!consent) {
      setError("Has d'acceptar la política de privacitat per continuar");
      return;
    }

    setIsSubmitting(true);

    try {
      // Generar auditoria amb email
      const data = await generateAudit(auditId, email);

      if (data.success) {
        // Redirigir a pàgina de completat
        router.push(`/audit/${auditId}/complete`);
      } else {
        throw new Error(data.error || "Error generant auditoria");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconegut");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-emerald-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center justify-between px-8">
          <Logo size="md" variant="image" />
          {isTestMode && (
            <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1.5 text-sm text-amber-400">
              <ClipboardList className="h-4 w-4" />
              Mode test
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex min-h-screen items-center justify-center px-8 pt-28">
        <div className="w-full max-w-2xl">
          {/* Animated Background Glow */}
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow">
            <div className="h-full w-full rounded-full bg-emerald-500/10 blur-3xl" />
          </div>

          {/* 🆕 MODE TEST: UI simplificada */}
          {isTestMode ? (
            <Card className="glass-card relative z-10 border-2 border-emerald-500/20">
              <CardHeader className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-extrabold">
                  🎉 Auditoria Completada!
                </CardTitle>
                <p className="mt-3 text-lg text-muted-foreground">
                  Per aquest test no cal email - ja et coneixem! 😉
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Info box */}
                <div className="rounded-xl bg-slate-800/30 p-6 text-center">
                  <p className="text-slate-300">
                    Ara veuràs l'informe de resultats i després accediràs a l'enquesta de valoració.
                  </p>
                </div>

                {/* Botó continuar */}
                <Button
                  size="lg"
                  className="w-full gap-2 text-base"
                  onClick={() => router.push(`/audit/${auditId}/complete?source=test`)}
                >
                  Veure informe
                  <ArrowRight className="h-5 w-5" />
                </Button>

                {/* Nota */}
                <p className="text-center text-xs text-muted-foreground">
                  Recorda: després de l'informe hi ha l'enquesta (3-4 min)
                </p>
              </CardContent>
            </Card>
          ) : (
            /* MODE NORMAL: UI amb formulari email */
            <Card className="glass-card relative z-10 border-2 border-emerald-500/20">
            <CardHeader className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>
              </div>
              <CardTitle className="text-3xl font-extrabold">
                🎉 La Teva Auditoria Està Llesta!
              </CardTitle>
              <p className="mt-3 text-lg text-muted-foreground">
                Hem analitzat <strong className="text-slate-300">la teva empresa</strong> i descobert oportunitats d&apos;estalvi de temps i costos
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Benefits */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col items-center gap-2 rounded-xl bg-slate-800/30 p-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15">
                    <FileText className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-slate-200">Informe Complet</h3>
                  <p className="text-sm text-muted-foreground">
                    Oportunitats i recomanacions personalitzades
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2 rounded-xl bg-slate-800/30 p-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15">
                    <TrendingUp className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-slate-200">ROI Calculat</h3>
                  <p className="text-sm text-muted-foreground">
                    Estalvi estimat en hores i euros
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2 rounded-xl bg-slate-800/30 p-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15">
                    <Zap className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-slate-200">Pla d&apos;Acció</h3>
                  <p className="text-sm text-muted-foreground">
                    Passos concrets per començar
                  </p>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    On t&apos;enviem els resultats?
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nom@empresa.cat"
                      className="pl-12 text-base"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Consent Checkbox */}
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-slate-700 bg-slate-800/30 p-4 transition-all hover:border-emerald-500/50">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-5 w-5 rounded border-slate-600 text-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm text-slate-300">
                    Accepto la{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      className="text-emerald-400 underline hover:text-emerald-300"
                    >
                      política de privacitat
                    </a>{" "}
                    i vull rebre l&apos;informe complet al meu email.
                    Les meves dades seran tractades de forma confidencial.
                  </span>
                </label>

                {/* Privacy Note */}
                <div className="flex items-start gap-3 rounded-lg bg-emerald-500/5 p-4 text-sm">
                  <Lock className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                  <div className="text-slate-300">
                    <strong className="text-slate-200">100% Confidencial.</strong>{" "}
                    No compartirem les teves dades amb tercers. Pots cancel·lar la
                    subscripció en qualsevol moment.
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Preparant Resultats...
                    </>
                  ) : (
                    <>
                      <Mail className="h-5 w-5" />
                      Rebre Informe Complet
                    </>
                  )}
                </Button>
              </form>

              {/* Fine Print */}
              <p className="text-center text-xs text-muted-foreground">
                L&apos;informe és completament gratuït i sense compromís. El rebràs al teu email en menys d&apos;1 minut.
              </p>
            </CardContent>
          </Card>
          )}
        </div>
      </div>
    </div>
  );
}
