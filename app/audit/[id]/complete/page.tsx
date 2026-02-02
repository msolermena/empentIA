"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  Calendar,
  Clock,
  Euro,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Target
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { getAudit, type InformeV5, type OportunitatInforme } from "@/lib/api";

export default function CompletePage() {
  const params = useParams();
  const auditId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [informe, setInforme] = useState<InformeV5 | null>(null);

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const response = await getAudit(auditId);
        if (response.success && response.audit.audit_result) {
          setInforme(response.audit.audit_result);
        } else {
          setError("No s'ha pogut carregar l'informe");
        }
      } catch (err: any) {
        setError(err.message || "Error carregant informe");
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
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-emerald-400" />
          <p className="text-muted-foreground">Preparant el teu informe...</p>
        </div>
      </div>
    );
  }

  if (error || !informe) {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-emerald-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center px-8">
          <Logo size="md" variant="image" />
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-6 md:px-8 pt-28 pb-16">
        
        {/* ==================== HERO ==================== */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15">
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
              </div>
            </div>
          </div>
          
          <h1 className="mb-4 text-3xl font-extrabold md:text-4xl text-slate-100">
            El teu Informe d'Automatització
          </h1>
          
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {informe.company_summary}
          </p>
        </div>

        {/* ==================== IMPACTE TOTAL ==================== */}
        <Card className="glass-card border-2 border-emerald-500/30 mb-10">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              {/* Hores estalviades */}
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm text-slate-400 uppercase tracking-wide">Hores Estalviades</span>
                </div>
                <p className="text-4xl font-extrabold text-emerald-400">
                  {informe.impacte_total.hores_setmana}h
                </p>
                <p className="text-sm text-slate-500">per setmana</p>
              </div>

              {/* Euros totals */}
              <div className="md:border-l border-slate-700/50 md:pl-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Euro className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm text-slate-400 uppercase tracking-wide">Impacte Total</span>
                </div>
                <p className="text-4xl font-extrabold text-emerald-400">
                  {informe.impacte_total.euros_mes.toLocaleString('ca-ES')}€
                </p>
                <p className="text-sm text-slate-500">al mes</p>
              </div>
            </div>
            
            {/* 🆕 Desglossat si existeix */}
            {informe.impacte_total.desglossat && (
              <div className="mt-6 pt-4 border-t border-slate-700/50 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
                {informe.impacte_total.desglossat.estalvi_euros > 0 && (
                  <span>
                    💡 {informe.impacte_total.desglossat.estalvi_euros.toLocaleString('ca-ES')}€ en temps estalviat
                  </span>
                )}
                {informe.impacte_total.desglossat.valor_nou_euros > 0 && (
                  <span>
                    🚀 {informe.impacte_total.desglossat.valor_nou_euros.toLocaleString('ca-ES')}€ en noves oportunitats
                  </span>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ==================== OPORTUNITATS PRINCIPALS ==================== */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15">
              <Target className="h-5 w-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-200">
              Oportunitats Detectades
            </h2>
          </div>

          <div className="space-y-4">
            {informe.oportunitats.map((op, index) => (
              <OportunitatCard key={index} oportunitat={op} index={index + 1} />
            ))}
          </div>
        </div>

        {/* ==================== OPORTUNITATS ADICIONALS ==================== */}
        {informe.oportunitats_adicionals && informe.oportunitats_adicionals.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700/50">
                <Sparkles className="h-5 w-5 text-slate-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-300">
                  Altres oportunitats per explorar
                </h2>
                <p className="text-sm text-slate-500">
                  Quan tingueu les principals resoltes
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {informe.oportunitats_adicionals.map((op, index) => (
                <Card key={index} className="glass-card border border-slate-700/30">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-slate-300 mb-1">{op.nom}</h4>
                    <p className="text-sm text-slate-500">{op.descripcio_breu}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ==================== NOTA P5 ==================== */}
        {informe.nota_p5 && (
          <Card className="glass-card border border-purple-500/20 mb-10">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-purple-300 mb-1">
                    Nota sobre el que ens has demanat
                  </p>
                  <p className="text-slate-400">{informe.nota_p5}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ==================== RECOMANACIÓ ==================== */}
        <Card className="glass-card border-2 border-emerald-500/20 mb-10">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-emerald-300 mb-2 uppercase tracking-wide">
                  La nostra recomanació
                </p>
                <p className="text-slate-200 leading-relaxed">
                  {informe.recomanacio}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ==================== PLANS ==================== */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15">
              <Sparkles className="h-5 w-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-200">
              Tria el pla que s'adapti a tu
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Pla Arrencada */}
            <Card className="glass-card border border-slate-700/50 hover:border-emerald-500/30 transition-all">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">🚀</div>
                <h3 className="text-lg font-bold text-slate-200 mb-1">Arrencada</h3>
                <p className="text-2xl font-bold text-emerald-400 mb-2">1 procés</p>
                <p className="text-sm text-slate-400 mb-3">Plataforma empentIA</p>
                <p className="text-xs text-slate-500">Ideal per provar i veure resultats ràpids</p>
              </CardContent>
            </Card>

            {/* Pla Acceleració - Destacat */}
            <Card className="glass-card border-2 border-emerald-500/50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Recomanat
              </div>
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="text-lg font-bold text-slate-200 mb-1">Acceleració</h3>
                <p className="text-2xl font-bold text-emerald-400 mb-2">3 processos</p>
                <p className="text-sm text-slate-400 mb-3">Plataforma empentIA Pro</p>
                <p className="text-xs text-slate-500">Impacte real en operacions</p>
              </CardContent>
            </Card>

            {/* Pla Transformació */}
            <Card className="glass-card border border-slate-700/50 hover:border-emerald-500/30 transition-all">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">🏆</div>
                <h3 className="text-lg font-bold text-slate-200 mb-1">Transformació</h3>
                <p className="text-2xl font-bold text-emerald-400 mb-2">5+ processos</p>
                <p className="text-sm text-slate-400 mb-3">Plataforma empentIA Premium</p>
                <p className="text-xs text-slate-500">Canvi complet de processos</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-sm text-slate-500">
            Tots els plans inclouen: implementació, suport i manteniment
          </p>
        </div>

        {/* ==================== AGENTS IA (abans "EMPENTIA SUITE") ==================== */}
        <Card className="glass-card border border-purple-500/30 mb-10 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500/10 to-emerald-500/10 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20">
                <span className="text-xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-slate-200">
                Inclòs: Agents IA personalitzats
              </h3>
            </div>
            <p className="text-slate-300 mb-4">
              La plataforma empentIA amb les teves automatitzacions actives, mètriques en temps real i agents IA que coneixen el teu negoci, disponibles 24/7.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
              onClick={() => window.open('/plataforma', '_blank')}
            >
              Descobreix la plataforma →
            </Button>
          </div>
        </Card>

        {/* ==================== CTA ==================== */}
        <Card className="glass-card border-2 border-emerald-500/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-200 mb-3">
              Vols que t'ajudem a implementar-ho?
            </h3>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Parlem 15 minuts sense compromís per veure quines automatitzacions
              tenen més sentit pel vostre cas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gap-2 bg-emerald-600 hover:bg-emerald-500"
                onClick={() => window.open('https://calendly.com/empentia/15min', '_blank')}
              >
                <Calendar className="h-5 w-5" />
                Reservar trucada gratuïta
              </Button>
            </div>

            <p className="text-xs text-slate-500 mt-4">
              Sense compromís • 15 minuts • Et mostrem exemples reals
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

// ==========================================
// COMPONENT: Oportunitat Card
// ==========================================
function OportunitatCard({ 
  oportunitat, 
  index 
}: { 
  oportunitat: OportunitatInforme; 
  index: number;
}) {
  const isManual = oportunitat.estat_actual === 'manual';
  const isNoFem = oportunitat.estat_actual === 'no_fem';

  // Calendly amb context (de moment link genèric)
  const handleSaberMes = () => {
    window.open('https://calendly.com/empentia/15min', '_blank');
  };

  return (
    <Card className={`glass-card border-2 ${oportunitat.es_prioritaria ? 'border-emerald-500/40' : 'border-slate-700/50'} overflow-hidden`}>
      {oportunitat.es_prioritaria && (
        <div className="bg-emerald-500/20 px-4 py-1.5 text-xs font-medium text-emerald-400 flex items-center gap-1">
          <Target className="h-3 w-3" />
          La vostra prioritat
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Info principal */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-200 mb-2">
              {oportunitat.nom}
            </h3>
            
            <p className="text-slate-400 text-sm mb-3 leading-relaxed">
              {oportunitat.descripcio}
            </p>
            
            <p className="text-emerald-400 text-sm flex items-center gap-1 mb-3">
              <CheckCircle2 className="h-4 w-4" />
              {oportunitat.benefici}
            </p>

            {/* Botó saber-ne més */}
            <button
              onClick={handleSaberMes}
              className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
            >
              Saber-ne més →
            </button>
          </div>

          {/* Mètriques - diferent segons tipus */}
          <div className="flex md:flex-col gap-4 md:gap-2 md:text-right md:min-w-[140px]">
            {isManual && oportunitat.hores_setmana > 0 && (
              <div>
                <p className="text-2xl font-bold text-emerald-400">
                  {oportunitat.hores_setmana}h
                </p>
                <p className="text-xs text-slate-500">estalviades/set.</p>
              </div>
            )}
            <div>
              <p className="text-xl font-semibold text-slate-300">
                {oportunitat.euros_mes.toLocaleString('ca-ES')}€
              </p>
              <p className="text-xs text-slate-500">
                {isManual ? 'estalvi/mes' : 'valor/mes'}
              </p>
            </div>
            
            {/* Badge d'estat a sota-dreta */}
            <div className="mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                isManual 
                  ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400' 
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}>
                {isManual ? '🟡 Manual' : '🔴 Pendent'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
