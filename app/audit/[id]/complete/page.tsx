"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  Download,
  Calendar,
  ArrowRight,
  Loader2,
  AlertCircle,
  Clock,
  Euro,
  Zap,
  Target,
  Sparkles,
  TrendingUp,
  Wrench,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Award,
} from "lucide-react";
import { getAudit } from "@/lib/api";

// =============================================================================
// COMPONENTS
// =============================================================================

// Fit Score Visual Bar
function FitScoreBar({ score }: { score: number }) {
  const getColor = () => {
    if (score >= 70) return "from-emerald-500 to-emerald-400";
    if (score >= 50) return "from-yellow-500 to-yellow-400";
    return "from-red-500 to-red-400";
  };

  const getLabel = () => {
    if (score >= 70) return "Excel·lent fit";
    if (score >= 50) return "Bon fit";
    return "Fit moderat";
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">Fit Score</span>
        <span className={`font-bold ${score >= 70 ? "text-emerald-400" : score >= 50 ? "text-yellow-400" : "text-red-400"}`}>
          {score}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-slate-700/50 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getColor()} transition-all duration-700 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-xs text-slate-500">{getLabel()}</p>
    </div>
  );
}

// Solution Card Component
function SolutionCard({ solution, isQuickWin = false }: { solution: any; isQuickWin?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
        isQuickWin
          ? "border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-slate-900/50 to-slate-900/50"
          : "border-slate-700/50 bg-slate-900/50 hover:border-slate-600"
      }`}
    >
      {/* Quick Win Badge */}
      {isQuickWin && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
            <Award className="h-3 w-3" />
            Quick Win Recomanat
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-2xl font-bold ${
              isQuickWin
                ? "bg-gradient-to-br from-emerald-500/30 to-emerald-600/30 text-emerald-400"
                : "bg-gradient-to-br from-blue-500/20 to-blue-600/20 text-blue-400"
            }`}
          >
            #{solution.rank}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-100 mb-1">{solution.name}</h3>
            <FitScoreBar score={solution.fit_score} />
          </div>
        </div>

        {/* Why it fits */}
        <div className="mb-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <p className="text-sm text-slate-300 leading-relaxed">
            <span className="text-emerald-400 font-medium">Per què encaixa: </span>
            {solution.why_fits}
          </p>
        </div>

        {/* ROI Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-700/30 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-slate-400">Estalvi temps</span>
            </div>
            <p className="text-lg font-bold text-blue-400">
              {solution.roi_estimate?.primary_metric || "4h/setmana"}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-700/30 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Euro className="h-4 w-4 text-emerald-400" />
              <span className="text-xs text-slate-400">Valor mensual</span>
            </div>
            <p className="text-lg font-bold text-emerald-400">
              {solution.roi_estimate?.value_monthly_eur?.toLocaleString() || "400"}€
            </p>
          </div>
        </div>

        {/* Implementation Info */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-colors text-sm"
        >
          <span className="flex items-center gap-2 text-slate-400">
            <Wrench className="h-4 w-4" />
            Implementació: {solution.implementation?.hours || 6}h | {solution.implementation?.difficulty || "mitjana"}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </button>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-3 p-4 rounded-xl bg-slate-900/50 border border-slate-700/30 space-y-3">
            <div>
              <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Què fem
              </h4>
              <p className="text-sm text-slate-300">
                {solution.implementation?.what_we_do || "Configurem i implementem aquesta automatització personalitzada per al vostre negoci."}
              </p>
            </div>
            {solution.fit_breakdown && (
              <div>
                <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Desglossament del Fit Score
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Pain points:</span>
                    <span className="text-slate-300">+{solution.fit_breakdown.pain_points}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tech compatible:</span>
                    <span className="text-slate-300">+{solution.fit_breakdown.tech_compatible}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sector fit:</span>
                    <span className="text-slate-300">+{solution.fit_breakdown.sector_fit}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Volum ROI:</span>
                    <span className="text-slate-300">+{solution.fit_breakdown.volume_roi}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Company Summary Header
function CompanySummary({ summary }: { summary: any }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-slate-900/50 to-emerald-500/10 p-6 mb-8">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
            <Sparkles className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-100">{summary?.name || "Empresa"}</h2>
            <p className="text-sm text-blue-400">{summary?.sector_name || "Sector"}</p>
          </div>
        </div>

        {summary?.wow_insight && (
          <p className="text-slate-300 leading-relaxed mb-4">{summary.wow_insight}</p>
        )}

        {summary?.tech_detected && summary.tech_detected.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-slate-400">Eines detectades:</span>
            {summary.tech_detected.map((tech: string, i: number) => (
              <span
                key={i}
                className="px-2 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Total Impact Summary
function TotalImpact({ impact }: { impact: any }) {
  return (
    <div className="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-100">Impacte Potencial Total</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 rounded-xl bg-slate-900/50">
          <p className="text-3xl font-bold text-emerald-400">
            {impact?.hours_saved_weekly || 18}h
          </p>
          <p className="text-sm text-slate-400">estalviades/setmana</p>
        </div>
        <div className="text-center p-4 rounded-xl bg-slate-900/50">
          <p className="text-3xl font-bold text-blue-400">
            {(impact?.hours_saved_weekly * 4 * 25 || 1800).toLocaleString()}€
          </p>
          <p className="text-sm text-slate-400">valor mensual estimat</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500 text-center">
        *Basat en 25€/hora de cost laboral mitjà i les top 3 solucions recomanades
      </p>
    </div>
  );
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function CompletePage() {
  const params = useParams();
  const auditId = params.id as string;

  const [auditData, setAuditData] = useState<any>(null);
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

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-blue-500/20 to-emerald-500/20 blur-2xl animate-pulse" />
          <Loader2 className="relative h-16 w-16 animate-spin text-blue-400" />
        </div>
        <p className="mt-6 text-lg text-slate-400">Preparant la teva auditoria personalitzada...</p>
      </div>
    );
  }

  // Error state
  if (error || !auditData?.success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6">
        <Card className="max-w-md border-red-500/30 bg-slate-900/50 p-8 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />
          <h2 className="mb-2 text-xl font-bold text-slate-200">Error</h2>
          <p className="text-red-400 mb-6">{error || "No s'ha pogut carregar l'auditoria"}</p>
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Tornar a l'inici
          </Button>
        </Card>
      </div>
    );
  }

  const audit = auditData.audit;
  
  // Check for v2 format (recommended_solutions) or v1 format (diagnosis, quick_wins)
  const isV2Format = audit.recommended_solutions && audit.recommended_solutions.length > 0;
  const hasResults = isV2Format || (audit.diagnosis && audit.quick_wins);

  // Get quick win (first solution with highest fit or specifically marked)
  const quickWin = audit.quick_win_highlighted || 
    (audit.recommended_solutions && audit.recommended_solutions[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <nav className="container mx-auto flex h-16 items-center justify-between px-6">
          <Logo size="sm" variant="image" />
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">Auditoria Completada</span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-6 pt-28 pb-16">
        {hasResults ? (
          <>
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 mb-4">
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">
                La Teva Auditoria Està Llesta
              </h1>
              <p className="text-slate-400 max-w-xl mx-auto">
                Hem analitzat el teu negoci i identificat les millors oportunitats d'automatització del nostre catàleg.
              </p>
            </div>

            {/* Company Summary */}
            {audit.company_summary && <CompanySummary summary={audit.company_summary} />}

            {/* Recommended Solutions */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20">
                  <Target className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-100">Solucions Recomanades</h2>
                  <p className="text-sm text-slate-400">Ordenades per fit score i potencial d'impacte</p>
                </div>
              </div>

              <div className="space-y-4">
                {audit.recommended_solutions?.map((solution: any, index: number) => (
                  <SolutionCard
                    key={solution.solution_id || index}
                    solution={solution}
                    isQuickWin={index === 0 || solution.solution_id === quickWin?.solution_id}
                  />
                ))}
              </div>
            </div>

            {/* Open Request Mapping (if user mentioned something specific) */}
            {audit.open_request_mapping?.user_said && audit.open_request_mapping.maps_to_solution && (
              <div className="mb-8 p-6 rounded-2xl border-2 border-blue-500/30 bg-blue-500/5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/20">
                    <Sparkles className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 mb-2">Sobre el que vas mencionar...</h3>
                    <p className="text-sm text-slate-400 mb-2">
                      "<em>{audit.open_request_mapping.user_said}</em>"
                    </p>
                    <p className="text-sm text-blue-400">{audit.open_request_mapping.response}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Blockers Addressed (if detected) */}
            {audit.blockers_addressed?.detected_blockers?.length > 0 && (
              <div className="mb-8 p-6 rounded-2xl border-2 border-yellow-500/30 bg-yellow-500/5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-500/20">
                    <Zap className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 mb-2">Per si et preocupa...</h3>
                    <p className="text-sm text-slate-300">{audit.blockers_addressed.response}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Total Impact */}
            <div className="mb-8">
              <TotalImpact impact={audit.total_potential_impact} />
            </div>

            {/* CTAs */}
            <Card className="border-2 border-slate-700/50 bg-slate-900/50 p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 mb-1">
                    {audit.next_steps?.cta_primary || "Vols veure com funciona?"}
                  </h3>
                  <p className="text-sm text-slate-400">
                    Reserva una demo gratuïta de 15 minuts i t'ensenyem com implementar-ho.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Button
                    size="lg"
                    className="gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-lg"
                  >
                    <Calendar className="h-5 w-5" />
                    Reservar Demo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2" disabled>
                    <Download className="h-5 w-5" />
                    PDF (Pròximament)
                  </Button>
                </div>
              </div>
            </Card>
          </>
        ) : (
          /* Processing State */
          <div className="text-center py-16">
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-yellow-400" />
            <h2 className="mb-2 text-xl font-bold text-slate-200">Processant Auditoria</h2>
            <p className="text-slate-400">
              L'auditoria s'està generant. Això pot trigar uns segons...
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Tens dubtes? Escriu-nos a{" "}
            <a
              href="mailto:hola@empentia.cat"
              className="text-blue-400 underline hover:text-blue-300"
            >
              hola@empentia.cat
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
