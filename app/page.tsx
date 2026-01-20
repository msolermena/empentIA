"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Globe, Lightbulb, BarChart3, ArrowRight, AlertCircle, Bug } from "lucide-react";

// Millora 5: Funció per normalitzar URLs
function normalizeUrl(input: string): string {
  let url = input.trim();
  
  // Eliminar espais
  url = url.replace(/\s+/g, '');
  
  // Si no té protocol, afegir https://
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  
  // Validar que té almenys un punt (domini vàlid)
  if (!url.includes('.')) {
    throw new Error("Si us plau, introdueix una URL vàlida (exemple: exemple.cat)");
  }
  
  // Validar format mínim
  try {
    new URL(url);
    return url;
  } catch {
    throw new Error("Si us plau, introdueix una URL vàlida (exemple: https://exemple.cat)");
  }
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  // Dev mode: mostra bypass per testing
  const [showDevTools, setShowDevTools] = useState(false);
  const [auditId, setAuditId] = useState("");

  useEffect(() => {
    // Activar dev tools amb ?dev=true o en localhost
    const isDev = searchParams.get('dev') === 'true' || 
                  window.location.hostname === 'localhost' ||
                  window.location.hostname === '127.0.0.1';
    setShowDevTools(isDev);
  }, [searchParams]);

  const handleBypass = (e: React.FormEvent) => {
    e.preventDefault();
    if (auditId.trim()) {
      router.push(`/audit/${auditId.trim()}/complete`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Millora 5: Normalitzar URL (afegeix https:// si cal, valida format)
      const normalizedUrl = normalizeUrl(url);

      // Redirigir a pàgina d'anàlisi (que farà scraping + start audit)
      router.push(`/audit/analyzing?url=${encodeURIComponent(normalizedUrl)}`);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error iniciant l'auditoria");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-primary-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center justify-between px-8">
          <Logo size="md" variant="image" />
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary-400">
              Com funciona
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary-400">
              Preus
            </a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary-400">
              Contacte
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center px-8 pt-20">
        {/* Animated background glow */}
        <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 animate-pulse-glow">
          <div className="h-full w-full rounded-full bg-primary-500/15 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="fade-in-up mb-6 text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
            <span className="gradient-text">
              Auditoria IA Gratuïta
            </span>
            <br />
            <span className="text-slate-50">per Pimes Catalanes</span>
          </h1>

          <p className="fade-in-up-delay-1 mb-12 text-lg text-muted-foreground md:text-xl">
            Descobreix com <strong className="text-slate-200">la teva empresa</strong> pot estalviar 10-20 hores setmanals automatitzant processos repetitius
          </p>

          {/* Input Group */}
          <form onSubmit={handleSubmit} className="fade-in-up-delay-2 mb-8">
            <div className="glass-card mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border-2 border-primary-500/20 p-3 shadow-2xl transition-all focus-within:border-primary-500 focus-within:shadow-primary-500/20 sm:flex-row">
              <Input
                type="text"
                placeholder="exemple.cat"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 border-0 bg-transparent focus:ring-0"
                required
              />
              <Button type="submit" size="lg" className="gap-2">
                Analitza la Teva Empresa
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            {error && (
              <div className="mx-auto mt-4 flex max-w-3xl items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </form>

          {/* Trust Badges */}
          <div className="fade-in-up-delay-3 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <span>Anàlisi en 60 segons</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <span>100% Confidencial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <span>Sense compromís</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-extrabold">Com Funciona l&apos;Auditoria</h2>
            <p className="text-lg text-muted-foreground">Intel·ligència artificial que entén <strong className="text-slate-300">el teu negoci</strong></p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group relative overflow-hidden">
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary-500 to-emerald-500 opacity-0 transition-opacity group-hover:opacity-100" />
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500/15">
                  <Globe className="h-7 w-7 text-primary-400" />
                </div>
                <CardTitle>1. Analitzem la Teva Web</CardTitle>
                <CardDescription className="text-base">
                  La nostra IA estudia <strong className="text-slate-300">el teu negoci</strong>, detecta el sector i identifica els processos principals abans de fer-te cap pregunta.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group relative overflow-hidden">
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary-500 to-emerald-500 opacity-0 transition-opacity group-hover:opacity-100" />
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500/15">
                  <Lightbulb className="h-7 w-7 text-primary-400" />
                </div>
                <CardTitle>2. Detectem Oportunitats</CardTitle>
                <CardDescription className="text-base">
                  Identifiquem processos que es poden automatitzar i calculem l&apos;estalvi de temps i cost per a cada un.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group relative overflow-hidden md:col-span-2 lg:col-span-1">
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary-500 to-emerald-500 opacity-0 transition-opacity group-hover:opacity-100" />
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500/15">
                  <BarChart3 className="h-7 w-7 text-primary-400" />
                </div>
                <CardTitle>3. Reps l&apos;Auditoria</CardTitle>
                <CardDescription className="text-base">
                  PDF complet amb diagnòstic, recomanacions prioritzades i ROI estimat. Tot en menys de 5 minuts.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="glass-card relative overflow-hidden border-2 border-primary-500/20 p-16 text-center">
            {/* Rotating background glow */}
            <div className="absolute -left-1/2 -top-1/2 h-[200%] w-[200%] animate-pulse-glow">
              <div className="h-full w-full rounded-full bg-primary-500/10 blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="mb-4 text-4xl font-extrabold">Comença Ara, És Gratuït</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Descobreix el potencial d&apos;automatització de <strong className="text-slate-300">la teva empresa</strong> en menys de 60 segons
              </p>

              <form onSubmit={handleSubmit}>
                <div className="glass-card mx-auto flex max-w-2xl flex-col gap-3 rounded-2xl border-2 border-primary-500/20 p-3 sm:flex-row">
                  <Input
                    type="text"
                    placeholder="exemple.cat"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 border-0 bg-transparent focus:ring-0"
                    required
                  />
                  <Button type="submit" size="lg" className="gap-2">
                    Obtenir Auditoria
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                
                {error && (
                  <div className="mx-auto mt-4 flex max-w-2xl items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}
              </form>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary-500/10 py-12 text-center">
        <div className="container mx-auto px-8">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 empentIA. Consultoria d&apos;automatització IA per pimes catalanes.
          </p>

          {/* Dev Tools - Només visible amb ?dev=true o localhost */}
          {showDevTools && (
            <div className="mt-8 mx-auto max-w-md">
              <div className="rounded-xl border-2 border-yellow-500/30 bg-yellow-500/5 p-4">
                <div className="flex items-center gap-2 mb-3 text-yellow-400">
                  <Bug className="h-4 w-4" />
                  <span className="text-sm font-medium">Dev Tools</span>
                </div>
                <form onSubmit={handleBypass} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="audit_id (UUID)"
                    value={auditId}
                    onChange={(e) => setAuditId(e.target.value)}
                    className="flex-1 text-sm bg-slate-900/50 border-yellow-500/20"
                  />
                  <Button 
                    type="submit" 
                    size="sm" 
                    variant="outline"
                    className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                  >
                    Anar a Informe
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-2">
                  Introdueix un audit_id per saltar directament a /complete
                </p>
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
