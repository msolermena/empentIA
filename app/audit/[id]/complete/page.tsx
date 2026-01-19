"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Download, Mail, Calendar, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { getAudit, type GetAuditResponse } from "@/lib/api";

export default function CompletePage() {
  const params = useParams();
  const auditId = params.id as string;

  const [auditData, setAuditData] = useState<GetAuditResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudit = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getAudit(auditId);
        setAuditData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error carregant auditoria");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAudit();
  }, [auditId]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary-400" />
          <p className="text-muted-foreground">Carregant auditoria...</p>
        </div>
      </div>
    );
  }

  if (error || !auditData?.success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-8">
        <Card className="glass-card max-w-md border-2 border-red-500/20 p-8 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />
          <h2 className="mb-2 text-xl font-bold text-slate-200">Error</h2>
          <p className="text-red-400">{error || "No s'ha pogut carregar l'auditoria"}</p>
          <Button 
            variant="outline" 
            className="mt-6"
            onClick={() => window.location.href = "/"}
          >
            Tornar a l'inici
          </Button>
        </Card>
      </div>
    );
  }

  const audit = auditData.audit;
  const hasResults = audit.diagnosis && audit.quick_wins && audit.roi_estimation;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-primary-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center px-8">
          <Logo size="md" variant="image" />
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-8 pt-32 pb-16">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/15">
              <CheckCircle2 className="h-12 w-12 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-center text-4xl font-extrabold md:text-5xl">
          Auditoria Generada amb Èxit!
        </h1>
        <p className="mb-12 text-center text-lg text-muted-foreground">
          Hem enviat l&apos;auditoria completa al teu email. També la pots descarregar aquí:
        </p>

        {/* Download Card */}
        <Card className="glass-card mb-8 border-2 border-primary-500/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">La Teva Auditoria Personalitzada</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quick Stats Preview */}
            {hasResults ? (
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-800/30 p-4 text-center">
                  <p className="text-sm text-muted-foreground">Hores Perdudes</p>
                  <p className="text-2xl font-bold text-slate-200">
                    {audit.roi_estimation.total_hours_wasted_weekly}h/set
                  </p>
                </div>
                <div className="rounded-xl bg-slate-800/30 p-4 text-center">
                  <p className="text-sm text-muted-foreground">Estalvi Possible</p>
                  <p className="text-2xl font-bold text-emerald-400">
                    {audit.roi_estimation.monthly_savings_eur}€/mes
                  </p>
                </div>
                <div className="rounded-xl bg-slate-800/30 p-4 text-center">
                  <p className="text-sm text-muted-foreground">Potencial</p>
                  <p className="text-2xl font-bold text-primary-400">
                    {audit.roi_estimation.automation_potential_percent}%
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-slate-800/30 p-6 text-center text-muted-foreground">
                <p>L'auditoria s'està processant...</p>
              </div>
            )}

            {/* Download Button - Disabled fins que tinguem PDF */}
            <Button
              size="lg"
              className="w-full gap-2 text-base"
              disabled
              variant="outline"
            >
              <Download className="h-5 w-5" />
              Descarregar PDF (Pròximament)
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              PDF de 4-5 pàgines amb diagnòstic complet, quick wins i ROI detallat
            </p>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="glass-card border-2 border-primary-500/20">
          <CardHeader>
            <CardTitle className="text-2xl">Propers Passos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email Sent */}
            <div className="flex items-start gap-4 rounded-xl bg-slate-800/30 p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                <Mail className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-slate-200">
                  Revisa el Teu Email
                </h3>
                <p className="text-sm text-muted-foreground">
                  T&apos;hem enviat l&apos;auditoria completa. Revisa també la carpeta de spam.
                </p>
              </div>
            </div>

            {/* Book Demo */}
            <div className="flex items-start gap-4 rounded-xl bg-slate-800/30 p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-500/15">
                <Calendar className="h-5 w-5 text-primary-400" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1 font-semibold text-slate-200">
                  Reserva una Demo Gratuïta
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  Parlem de com implementar aquestes millores a <strong className="text-slate-300">la teva empresa</strong> en 30 dies.
                </p>
                <Button variant="secondary" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Reservar Demo (15 min)
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Implementation */}
            <div className="flex items-start gap-4 rounded-xl bg-slate-800/30 p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-slate-200">
                  Implementació Ràpida
                </h3>
                <p className="text-sm text-muted-foreground">
                  Els clients veuen resultats en els primers 30 dies. ROI mesurable des del mes 1.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Tens dubtes? Escriu-nos a{" "}
            <a href="mailto:hola@empentia.cat" className="text-primary-400 underline hover:text-primary-300">
              hola@empentia.cat
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
