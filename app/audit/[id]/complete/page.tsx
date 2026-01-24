"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  Calendar,
  Download,
  TrendingUp,
  Sparkles
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { OpportunityCard } from "@/components/OpportunityCard";
import { PackageSelector } from "@/components/PackageSelector";
import { getAudit } from "@/lib/api";

// Tipus inline per evitar problemes d'importació durant la migració
interface CompanySummary {
  name: string;
  sector: string;
  sector_name: string;
  wow_insight: string;
  volume_metric: string;
}

interface ImpactSummary {
  total_hours_saved_weekly: number;
  total_monthly_savings_eur: number;
  solutions_count: number;
}

interface DetectedOpportunity {
  rank: number;
  solution_id: string;
  name: string;
  why_fits: string;
  how_it_works?: string;  // v4.0: NOU
  hours_saved_weekly: number;
  monthly_savings_eur: number;
  integrates_with: string[];
  category: string;
}

// v4.0: NOU - Also Requested (P5)
interface AlsoRequested {
  show: boolean;
  client_text: string;
  solution: {
    solution_id: string;
    name: string;
    how_it_works?: string;
    monthly_savings_eur: number;
  };
}

// v4.0: Bonus actualitzat
interface BonusOpportunities {
  show: boolean;
  reason?: string;
  solutions: Array<{
    solution_id: string;
    name: string;
    monthly_savings_eur: number;
  }>;
}

interface AuditResultV4 {
  company_summary: CompanySummary;
  impact_summary: ImpactSummary;
  detected_opportunities: DetectedOpportunity[];
  also_requested?: AlsoRequested;  // v4.0: NOU
  bonus_opportunities?: BonusOpportunities;  // v4.0: Actualitzat
  justification: {
    text: string;
    reasons: string[];
  };
  packages: {
    show_packages: boolean;
    options: Array<{
      id: string;
      name: string;
      icon: string;
      automations: number | string;
      suite?: string;  // Opcional per compatibilitat
      ideal_for: string;
    }>;
  };
  cta: {
    main_text: string;
    button_text: string;
    subtext: string;
    calendly_url: string;
  };
}

// Helper per detectar si és v4 (o v2 compatible)
function isAuditV4(audit: any): audit is AuditResultV4 {
  return !!(
    audit?.detected_opportunities && 
    audit?.impact_summary &&
    audit?.company_summary
  );
}

export default function CompletePage() {
  const params = useParams();
  const auditId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [auditData, setAuditData] = useState<any>(null);

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const response = await getAudit(auditId);
        if (response.success) {
          setAuditData(response.audit);
        } else {
          setError("No s'ha pogut carregar l'auditoria");
        }
      } catch (err: any) {
        setError(err.message || "Error carregant auditoria");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAudit();
  }, [auditId]);

  // Loading state
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

  // Error state
  if (error || !auditData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-8">
        <Card className="glass-card max-w-md border-2 border-red-500/20 p-8 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />
          <h2 className="mb-2 text-xl font-bold text-slate-200">Error</h2>
          <p className="text-red-400">{error}</p>
          <Button variant="outline" className="mt-6" onClick={() => window.location.href = "/"}>
            Tornar a l&apos;inici
          </Button>
        </Card>
      </div>
    );
  }

  // Determinar si és v4 o legacy
  const isV4 = isAuditV4(auditData);
  
  // Si no és v4, mostrar versió legacy simplificada
  if (!isV4) {
    return <LegacyAuditView audit={auditData} />;
  }

  const audit = auditData as AuditResultV4;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-primary-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center px-8">
          <Logo size="md" variant="image" />
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-8 pt-28 pb-16">
        
        {/* ==================== SECCIÓ 1: CAPÇALERA WOW ==================== */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15">
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
              </div>
            </div>
          </div>
          
          <h1 className="mb-3 text-3xl font-extrabold md:text-4xl">
            Auditoria de {audit.company_summary.name}
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {audit.company_summary.wow_insight}
          </p>
        </div>

        {/* ==================== SECCIÓ 2: IMPACTE GLOBAL ==================== */}
        <Card className="glass-card border-2 border-emerald-500/30 mb-8">
          <CardContent className="p-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">
                Estalvi Mensual Potencial
              </p>
              <p className="text-5xl font-extrabold text-emerald-400 mb-2">
                {audit.impact_summary.total_monthly_savings_eur.toLocaleString('ca-ES')}€
                <span className="text-lg font-normal text-muted-foreground">/mes</span>
              </p>
              <p className="text-muted-foreground">
                Equivalent a{' '}
                <span className="text-emerald-400 font-semibold">
                  {audit.impact_summary.total_hours_saved_weekly}h/setmana
                </span>
                {' '}recuperades
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ==================== SECCIÓ 3: OPORTUNITATS DETECTADES ==================== */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/15">
              <Sparkles className="h-5 w-5 text-primary-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-200">Oportunitats Detectades</h2>
              <p className="text-sm text-muted-foreground">Basades en el que ens has explicat</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {audit.detected_opportunities.map((opp, index) => (
              <OpportunityCard 
                key={opp.solution_id} 
                opportunity={opp} 
                index={index}
                variant="detected"
              />
            ))}
          </div>
          
          {/* Subtotal detectades */}
          <div className="mt-4 p-4 rounded-xl bg-primary-500/10 border border-primary-500/20">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Estalvi amb oportunitats detectades:</span>
              <span className="text-xl font-bold text-primary-400">
                {audit.detected_opportunities.reduce((sum, o) => sum + (o.monthly_savings_eur || 0), 0).toLocaleString('ca-ES')}€/mes
              </span>
            </div>
          </div>
        </div>

        {/* ==================== SECCIÓ 4: TAMBÉ ENS HAS DEMANAT (P5) ==================== */}
        {audit.also_requested?.show && audit.also_requested.solution && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/15">
                <Sparkles className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-300">💡 També ens has demanat</h2>
                <p className="text-sm text-muted-foreground italic">
                  &quot;{audit.also_requested.client_text}&quot;
                </p>
              </div>
            </div>
            
            <Card className="glass-card border-2 border-purple-500/20">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">
                      {audit.also_requested.solution.name}
                    </h3>
                    {audit.also_requested.solution.how_it_works && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {audit.also_requested.solution.how_it_works}
                      </p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <span className="text-2xl font-bold text-purple-400">
                      {audit.also_requested.solution.monthly_savings_eur.toLocaleString('ca-ES')}€
                    </span>
                    <span className="text-sm text-muted-foreground">/mes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ==================== SECCIÓ 5: ALTRES OPORTUNITATS (Bonus condicional) ==================== */}
        {audit.bonus_opportunities?.show && audit.bonus_opportunities.solutions?.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700/50">
                <TrendingUp className="h-5 w-5 text-slate-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-300">💫 Altres oportunitats</h2>
                <p className="text-sm text-muted-foreground">
                  {audit.bonus_opportunities.reason || `Populars en empreses de ${audit.company_summary.sector_name}`}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {audit.bonus_opportunities.solutions.map((bonus) => (
                <Card key={bonus.solution_id} className="glass-card border border-slate-700/30 hover:border-slate-600/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">➕</span>
                        <span className="text-slate-300">{bonus.name}</span>
                      </div>
                      <span className="text-emerald-400 font-semibold">
                        +{bonus.monthly_savings_eur.toLocaleString('ca-ES')}€/mes
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ==================== SECCIÓ 6: JUSTIFICACIÓ ==================== */}
        <Card className="glass-card border border-emerald-500/20 mb-8">
          <CardContent className="p-6">
            <p className="font-medium text-slate-300 mb-3">
              {audit.justification.text}
            </p>
            <ul className="space-y-2">
              {audit.justification.reasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {reason}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* ==================== SECCIÓ 7: PAQUETS ==================== */}
        {audit.packages && audit.packages.show_packages && (
          <div className="mb-8">
            <PackageSelector options={audit.packages.options as any} />
          </div>
        )}

        {/* ==================== SECCIÓ 8: CTA PRINCIPAL ==================== */}
        <Card className="glass-card border-2 border-emerald-500/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-200 mb-2">
              {audit.cta.main_text}
            </h3>
            <p className="text-muted-foreground mb-6">
              {audit.cta.subtext}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={() => window.open(audit.cta.calendly_url, '_blank')}
              >
                <Calendar className="h-5 w-5" />
                {audit.cta.button_text}
              </Button>
              
              <Button size="lg" variant="outline" className="gap-2" disabled>
                <Download className="h-5 w-5" />
                Descarregar PDF
                <span className="text-xs ml-1 opacity-70">(properament)</span>
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

// ==========================================
// VISTA LEGACY (per compatibilitat amb v1)
// ==========================================
function LegacyAuditView({ audit }: { audit: any }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 z-50 w-full border-b border-primary-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center px-8">
          <Logo size="md" variant="image" />
        </nav>
      </header>

      <div className="container mx-auto max-w-4xl px-8 pt-28 pb-16">
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15">
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
              </div>
            </div>
          </div>
          
          <h1 className="mb-3 text-3xl font-extrabold md:text-4xl">
            La Teva Auditoria Personalitzada
          </h1>
          <p className="text-lg text-muted-foreground">
            Hem analitzat la teva empresa i detectat oportunitats d&apos;automatització
          </p>
        </div>

        {/* Mostrar dades legacy si existeixen */}
        {audit.roi_estimation && (
          <Card className="glass-card border-2 border-emerald-500/30 mb-8">
            <CardContent className="p-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">ESTALVI POTENCIAL</p>
              <p className="text-5xl font-extrabold text-emerald-400">
                {audit.roi_estimation.monthly_savings_eur?.toLocaleString('ca-ES') || '---'}€
                <span className="text-lg font-normal text-muted-foreground">/mes</span>
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quick wins legacy */}
        {audit.quick_wins && audit.quick_wins.length > 0 && (
          <Card className="glass-card border-2 border-primary-500/20 mb-8">
            <CardHeader>
              <CardTitle>Oportunitats Detectades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {audit.quick_wins.map((win: any, index: number) => (
                <div key={index} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <h4 className="font-semibold text-slate-200 mb-2">{win.title}</h4>
                  <p className="text-sm text-muted-foreground">{win.description}</p>
                  {win.monthly_savings_eur && (
                    <p className="text-emerald-400 mt-2">
                      Estalvi: {win.monthly_savings_eur}€/mes
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* CTA */}
        <Card className="glass-card border-2 border-emerald-500/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-200 mb-4">
              Vols saber com implementar-ho?
            </h3>
            <Button 
              size="lg" 
              className="gap-2"
              onClick={() => window.open('https://calendly.com/empentia/15min', '_blank')}
            >
              <Calendar className="h-5 w-5" />
              Parlem 15 minuts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
