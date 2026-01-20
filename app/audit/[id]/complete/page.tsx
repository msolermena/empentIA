"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle2, 
  Download, 
  Mail, 
  Calendar, 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  AlertTriangle,
  Clock,
  Euro,
  TrendingUp,
  Zap,
  Target,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { getAudit, type GetAuditResponse } from "@/lib/api";

// Component per mostrar severitat amb colors
function SeverityBadge({ severity }: { severity: string }) {
  const colors = {
    high: "bg-red-500/20 text-red-400 border-red-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    low: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  };
  const labels = {
    high: "Alt",
    medium: "Mitjà",
    low: "Baix",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors[severity as keyof typeof colors] || colors.medium}`}>
      {labels[severity as keyof typeof labels] || severity}
    </span>
  );
}

// Component per mostrar dificultat
function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colors = {
    easy: "bg-emerald-500/20 text-emerald-400",
    medium: "bg-yellow-500/20 text-yellow-400",
    hard: "bg-red-500/20 text-red-400",
  };
  const labels = {
    easy: "Fàcil",
    medium: "Mitjana",
    hard: "Complexa",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[difficulty as keyof typeof colors] || colors.medium}`}>
      {labels[difficulty as keyof typeof labels] || difficulty}
    </span>
  );
}

// Component expandible per Quick Wins
function QuickWinCard({ win, index }: { win: any; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 overflow-hidden">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 text-left flex items-start gap-4 hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="font-semibold text-slate-200">{win.title}</h4>
            <DifficultyBadge difficulty={win.difficulty} />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{win.description}</p>
          <div className="flex flex-wrap gap-4 mt-2 text-sm">
            <span className="flex items-center gap-1 text-emerald-400">
              <Clock className="h-4 w-4" />
              {win.hours_saved_weekly}h/setmana
            </span>
            <span className="flex items-center gap-1 text-primary-400">
              <Euro className="h-4 w-4" />
              {win.monthly_savings_eur}€/mes
            </span>
            <span className="text-muted-foreground">
              ⏱️ {win.estimated_time}
            </span>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-5 pb-5 pt-2 border-t border-slate-700/50 bg-slate-900/30">
          <h5 className="text-sm font-medium text-slate-300 mb-3">Passos d&apos;implementació:</h5>
          <ol className="space-y-2">
            {win.implementation_steps?.map((step: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-500/20 text-primary-400 text-xs font-medium">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

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
            Tornar a l&apos;inici
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
      <div className="container mx-auto max-w-5xl px-8 pt-28 pb-16">
        {/* Success Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15">
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
              </div>
            </div>
          </div>
          <h1 className="mb-3 text-4xl font-extrabold md:text-5xl">
            La Teva Auditoria Personalitzada
          </h1>
          <p className="text-lg text-muted-foreground">
            Hem analitzat la teva empresa i detectat oportunitats d&apos;automatització
          </p>
        </div>

        {hasResults ? (
          <div className="space-y-8">
            {/* ROI Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="glass-card border-primary-500/20">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/15">
                      <Clock className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Hores perdudes</p>
                      <p className="text-2xl font-bold text-slate-200">
                        {audit.roi_estimation.total_hours_wasted_weekly}h
                        <span className="text-sm font-normal text-muted-foreground">/set</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-primary-500/20">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/15">
                      <Euro className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Cost mensual</p>
                      <p className="text-2xl font-bold text-slate-200">
                        {audit.roi_estimation.monthly_waste_eur.toLocaleString()}€
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-emerald-500/20">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15">
                      <TrendingUp className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Estalvi possible</p>
                      <p className="text-2xl font-bold text-emerald-400">
                        {audit.roi_estimation.monthly_savings_eur.toLocaleString()}€
                        <span className="text-sm font-normal text-muted-foreground">/mes</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-primary-500/20">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/15">
                      <Zap className="h-5 w-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Potencial automatització</p>
                      <p className="text-2xl font-bold text-primary-400">
                        {audit.roi_estimation.automation_potential_percent}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Diagnosis Section */}
            <Card className="glass-card border-2 border-primary-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/15">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  Diagnòstic: Problemes Detectats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {audit.diagnosis.overall_assessment && (
                  <p className="text-muted-foreground mb-6 p-4 rounded-lg bg-slate-800/30 border-l-4 border-primary-500">
                    {audit.diagnosis.overall_assessment}
                  </p>
                )}
                
                <div className="space-y-4">
                  {audit.diagnosis.main_problems?.map((problem: any, index: number) => (
                    <div 
                      key={index}
                      className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-5"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h4 className="font-semibold text-slate-200 flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 text-red-400 text-sm">
                            {index + 1}
                          </span>
                          {problem.title}
                        </h4>
                        <SeverityBadge severity={problem.severity} />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{problem.description}</p>
                      {problem.impact && (
                        <p className="text-sm text-yellow-400/80 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          <strong>Impacte:</strong> {problem.impact}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Wins Section */}
            <Card className="glass-card border-2 border-emerald-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15">
                    <Zap className="h-5 w-5 text-emerald-400" />
                  </div>
                  Quick Wins: Accions Recomanades
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  Aquestes són les automatitzacions que et recomanem implementar primer, ordenades per impacte i facilitat:
                </p>
                
                <div className="space-y-3">
                  {audit.quick_wins?.map((win: any, index: number) => (
                    <QuickWinCard key={index} win={win} index={index} />
                  ))}
                </div>

                {/* Quick Wins Summary */}
                <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex flex-wrap justify-between gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-emerald-400">
                        {audit.quick_wins?.reduce((sum: number, w: any) => sum + (w.hours_saved_weekly || 0), 0)}h
                      </p>
                      <p className="text-xs text-muted-foreground">hores/setmana estalviades</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-400">
                        {audit.quick_wins?.reduce((sum: number, w: any) => sum + (w.monthly_savings_eur || 0), 0).toLocaleString()}€
                      </p>
                      <p className="text-xs text-muted-foreground">estalvi mensual total</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tier Recommendation */}
            {audit.tier_recommendation && (
              <Card className="glass-card border-2 border-primary-500/30 bg-gradient-to-br from-primary-500/5 to-emerald-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/15">
                      <Target className="h-5 w-5 text-primary-400" />
                    </div>
                    Pla Recomanat per a Tu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="mb-4">
                        <span className="text-sm text-muted-foreground">El teu pla ideal:</span>
                        <h3 className="text-3xl font-bold text-slate-100">
                          {audit.tier_recommendation.tier_name}
                        </h3>
                        <p className="text-2xl font-semibold text-primary-400">
                          {audit.tier_recommendation.monthly_price_eur}€
                          <span className="text-sm font-normal text-muted-foreground">/mes</span>
                        </p>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">
                        {audit.tier_recommendation.rationale}
                      </p>

                      {audit.tier_recommendation.included_automations?.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-slate-300 mb-2">Inclou:</h4>
                          <ul className="space-y-1">
                            {audit.tier_recommendation.included_automations.map((item: string, i: number) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-3 md:w-64">
                      <Button size="lg" className="gap-2">
                        <Calendar className="h-5 w-5" />
                        Reservar Demo Gratuïta
                      </Button>
                      <Button size="lg" variant="outline" className="gap-2" disabled>
                        <Download className="h-5 w-5" />
                        Descarregar PDF (Pròximament)
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Next Steps */}
            <Card className="glass-card border-2 border-primary-500/20">
              <CardHeader>
                <CardTitle className="text-xl">Propers Passos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4 rounded-xl bg-slate-800/30 p-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                    <Mail className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-200">
                      Revisa el Teu Email
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      T&apos;enviarem l&apos;auditoria completa en PDF. Revisa també la carpeta de spam.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl bg-slate-800/30 p-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-500/15">
                    <Calendar className="h-5 w-5 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-slate-200">
                      Reserva una Demo Gratuïta
                    </h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      Parlem de com implementar aquestes millores a la teva empresa en 30 dies.
                    </p>
                    <Button variant="secondary" className="gap-2">
                      <Calendar className="h-4 w-4" />
                      Reservar Demo (15 min)
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="glass-card border-2 border-yellow-500/20 p-8 text-center">
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-yellow-400" />
            <h2 className="mb-2 text-xl font-bold text-slate-200">Processant Auditoria</h2>
            <p className="text-muted-foreground">
              L&apos;auditoria s&apos;està generant. Això pot trigar uns segons...
            </p>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
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
