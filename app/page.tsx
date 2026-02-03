"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Bug,
  Search,
  FileText,
  Rocket,
  LayoutDashboard,
  Sparkles,
  Wrench,
  CalendarX,
  RefreshCw,
  Linkedin,
  X,
  Phone,
  Mail,
  MessageCircle,
  BarChart3,
  Bot,
  Activity,
  TrendingUp,
  Headphones
} from "lucide-react";

// Normalitzar URLs
function normalizeUrl(input: string): string {
  let url = input.trim().replace(/\s+/g, '');
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  if (!url.includes('.')) {
    throw new Error("Si us plau, introdueix una URL vàlida (exemple: exemple.cat)");
  }
  try {
    new URL(url);
    return url;
  } catch {
    throw new Error("Si us plau, introdueix una URL vàlida (exemple: https://exemple.cat)");
  }
}

// Component Modal Contacte
function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Integrar amb backend/Brevo
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', preferredContact: 'email', description: '' });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl border border-emerald-500/20 bg-slate-900 p-8 pt-12 shadow-2xl shadow-emerald-500/10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-50">Missatge enviat!</h3>
            <p className="text-slate-400">Et contactarem aviat.</p>
          </div>
        ) : (
          <>
            <h3 className="mb-2 text-2xl font-bold text-slate-50">Parlem</h3>
            <p className="mb-6 text-slate-400">Explica'ns què necessites i et contactarem.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Nom *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none"
                  placeholder="El teu nom"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none"
                  placeholder="email@exemple.cat"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Telèfon <span className="text-slate-500">(opcional)</span></label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none"
                  placeholder="+34 600 000 000"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Com prefereixes que et contactem?</label>
                <div className="flex gap-3">
                  {[
                    { value: 'email', icon: Mail, label: 'Email' },
                    { value: 'phone', icon: Phone, label: 'Trucada' },
                    { value: 'whatsapp', icon: MessageCircle, label: 'WhatsApp' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredContact: option.value })}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${
                        formData.preferredContact === option.value
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                          : 'border-slate-700 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <option.icon className="h-4 w-4" />
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Què necessites? <span className="text-slate-500">(opcional)</span></label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none"
                  placeholder="Explica'ns breument..."
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Enviant...' : 'Enviar missatge'}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showDevTools, setShowDevTools] = useState(false);
  const [auditId, setAuditId] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const isDev = searchParams.get('dev') === 'true' || 
                  window.location.hostname === 'localhost' ||
                  window.location.hostname === '127.0.0.1';
    setShowDevTools(isDev);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      const normalizedUrl = normalizeUrl(url);
      router.push(`/audit/analyzing?url=${encodeURIComponent(normalizedUrl)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error iniciant l'auditoria");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Gradient background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[400px] -right-[400px] h-[800px] w-[800px] rounded-full bg-emerald-500/[0.07] blur-3xl" />
        <div className="absolute -bottom-[400px] -left-[400px] h-[800px] w-[800px] rounded-full bg-emerald-500/[0.05] blur-3xl" />
      </div>

      {/* Header */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl' 
          : 'bg-transparent'
      }`}>
        <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <Logo size="md" variant="image" />
          <div className="flex items-center gap-6">
            <a 
              href="#com-funciona" 
              className="hidden text-sm font-medium text-slate-400 transition-colors hover:text-emerald-400 md:block"
            >
              Com funciona
            </a>
            <button
              onClick={() => setIsContactOpen(true)}
              className="hidden text-sm font-medium text-slate-400 transition-colors hover:text-emerald-400 md:block"
            >
              Contacte
            </button>
            <a 
              href="https://app.empentia.cat" 
              className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 transition-all hover:bg-emerald-500/20"
            >
              Accés clients
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Main headline */}
          <h1 className="fade-in-up mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-50 md:text-6xl lg:text-7xl">
            Guanya temps.
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Decideix millor.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="fade-in-up-delay-1 mx-auto mb-10 max-w-2xl text-lg text-slate-400 md:text-xl">
            Automatitzacions i agents IA a mida per impulsar l'eficiència 
            i el creixement del teu negoci. <span className="text-slate-300">Sense complicacions tècniques.</span>
          </p>

          {/* CTA Principal - Auditoria */}
          <form onSubmit={handleSubmit} className="fade-in-up-delay-2 mb-6">
            <div className="mx-auto flex max-w-2xl flex-col gap-3 rounded-2xl border-2 border-slate-800 bg-slate-900/60 p-2 backdrop-blur-sm transition-all focus-within:border-emerald-500/50 focus-within:shadow-lg focus-within:shadow-emerald-500/10 sm:flex-row sm:p-2">
              <Input
                type="text"
                placeholder="Introdueix la web de la teva empresa"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 border-0 bg-transparent px-4 text-base placeholder:text-slate-500 focus:ring-0"
                required
              />
              <Button type="submit" size="lg" className="gap-2 whitespace-nowrap">
                Comença l'auditoria
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            {error && (
              <div className="mx-auto mt-4 flex max-w-xl items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </form>

          {/* Trust Badges */}
          <div className="fade-in-up-delay-2 mb-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Gratuït
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              3 minuts
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Sense compromís
            </span>
          </div>

          {/* Descripció sota CTA */}
          <p className="fade-in-up-delay-3 mx-auto max-w-lg text-sm text-slate-500">
            Descobreix com pots recuperar hores cada setmana automatitzant processos repetitius
          </p>
        </div>
      </section>

      {/* Com Funciona - 4 Passos */}
      <section id="com-funciona" className="relative py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">Com funciona</h2>
          </div>

          {/* Timeline de 4 passos */}
          <div className="relative">
            {/* Línia connectora (només desktop) */}
            <div className="absolute left-0 right-0 top-[60px] mx-auto hidden h-0.5 w-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0 md:block" />

            <div className="grid gap-8 md:grid-cols-4 md:gap-6">
              {[
                {
                  num: "1",
                  icon: Search,
                  title: "Auditoria",
                  desc: "Analitzem el teu negoci i detectem oportunitats d'automatització"
                },
                {
                  num: "2",
                  icon: FileText,
                  title: "Proposta",
                  desc: "Et presentem solucions a mida amb preu clar"
                },
                {
                  num: "3",
                  icon: Rocket,
                  title: "Implementació",
                  desc: "Ho construïm i configurem nosaltres"
                },
                {
                  num: "4",
                  icon: LayoutDashboard,
                  title: "El teu portal",
                  desc: "Accedeix a la teva plataforma per gestionar-ho tot",
                  highlight: true
                },
              ].map((step) => (
                <div key={step.num} className="relative flex gap-4 md:flex-col md:items-center md:text-center">
                  {/* Número/Icona */}
                  <div className={`relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl ${
                    step.highlight 
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/30' 
                      : 'border-2 border-slate-700 bg-slate-900'
                  }`}>
                    <step.icon className={`h-7 w-7 ${step.highlight ? 'text-white' : 'text-emerald-400'}`} />
                  </div>
                  
                  {/* Contingut */}
                  <div className="flex-1 pt-1 md:pt-6">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-500">
                      Pas {step.num}
                    </div>
                    <h3 className={`mb-2 text-lg font-bold ${step.highlight ? 'text-emerald-400' : 'text-slate-100'}`}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-400">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plataforma empentIA */}
      <section className="relative py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">Plataforma empentIA</h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              Tot el que necessites per gestionar les teves automatitzacions i agents IA en un sol lloc.
            </p>
          </div>

          {/* Layout: Funcionalitats + Screenshot */}
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Funcionalitats */}
            <div className="space-y-6">
              {[
                {
                  icon: BarChart3,
                  title: "Dashboard amb KPIs",
                  desc: "Visualitza hores estalviades, valor generat i ROI en temps real"
                },
                {
                  icon: Bot,
                  title: "Agents IA connectats",
                  desc: "Assistents intel·ligents que coneixen el teu negoci i treballen per tu"
                },
                {
                  icon: Activity,
                  title: "Monitorització en temps real",
                  desc: "Segueix l'activitat de les teves automatitzacions amb alertes i notificacions"
                },
                {
                  icon: TrendingUp,
                  title: "Històric i evolució",
                  desc: "Analitza el rendiment mensual i descobreix noves oportunitats"
                },
                {
                  icon: Headphones,
                  title: "Suport i actualitzacions",
                  desc: "Sempre actualitzat amb les últimes novetats, amb suport inclòs"
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                    <item.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Screenshot */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl">
                <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/60" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                    <div className="h-3 w-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="ml-2 text-xs text-slate-500">app.empentia.cat</span>
                </div>
                <img 
                  src="/images/screenshots/dashboard.png" 
                  alt="Plataforma empentIA - Dashboard" 
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Per Què empentIA */}
      <section className="relative py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">Per què empentIA</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Sparkles,
                title: "Servei complet",
                desc: "Disseny, implementació i manteniment. Tu només expliques què necessites."
              },
              {
                icon: Wrench,
                title: "Fet a mida",
                desc: "Solucions adaptades als teus processos reals, no plantilles genèriques."
              },
              {
                icon: CalendarX,
                title: "Sense permanència",
                desc: "Subscripció mensual flexible. Sense projectes de milers d'euros."
              },
              {
                icon: RefreshCw,
                title: "Sempre actualitzat",
                desc: "Integrem les últimes novetats en IA. La tecnologia avança, tu també."
              },
            ].map((item) => (
              <div 
                key={item.title}
                className="group flex gap-4 rounded-xl border border-slate-800/60 bg-slate-900/20 p-4 transition-all hover:border-emerald-500/20 hover:bg-slate-900/40"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <item.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-slate-100">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qui Hi Ha Al Darrere */}
      <section className="relative py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">Qui hi ha al darrere</h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-8 text-center md:p-12">
            {/* Avatar placeholder - sense foto per ara */}
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 text-3xl font-bold text-emerald-400">
              AO
            </div>
            
            <h3 className="mb-4 text-2xl font-bold text-slate-50">Arnau Orriols</h3>
            
            <p className="mx-auto mb-6 max-w-xl leading-relaxed text-slate-400">
              Més de 15 anys d'experiència en direcció, emprenedoria i consultoria. 
              Enginyer Industrial per la UPC, he creat i dirigit negocis (telecomunicacions 
              i energia) i assessorat a grans i petites empreses. Ara ajudo pimes a créixer 
              amb automatització i IA.
            </p>

            <a 
              href="https://www.linkedin.com/in/arnau-orriols-9b31136/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-emerald-400"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-slate-900/50 p-8 text-center md:p-16">
            {/* Decorative glow */}
            <div className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl" />
            
            <div className="relative">
              <h3 className="mb-4 text-2xl font-bold text-slate-50 md:text-3xl">
                Recupera hores cada setmana
              </h3>
              <p className="mb-8 text-slate-400">
                Descobreix quins processos pots automatitzar al teu negoci
              </p>

              <form onSubmit={handleSubmit} className="mb-6">
                <div className="mx-auto flex max-w-xl flex-col gap-3 rounded-2xl border-2 border-slate-700 bg-slate-900/80 p-2 transition-all focus-within:border-emerald-500/50 sm:flex-row">
                  <Input
                    type="text"
                    placeholder="Introdueix la web de la teva empresa"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 border-0 bg-transparent px-4 text-base placeholder:text-slate-500 focus:ring-0"
                    required
                  />
                  <Button type="submit" size="lg" className="gap-2 whitespace-nowrap">
                    Comença l'auditoria
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                
                {error && (
                  <div className="mx-auto mt-4 flex max-w-lg items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}
              </form>

              {/* Trust Badges */}
              <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Gratuït
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  3 minuts
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Sense compromís
                </span>
              </div>

              {/* CTA Secundari */}
              <button
                onClick={() => setIsContactOpen(true)}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-emerald-400"
              >
                Ja saps què necessites? Parlem
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-sm text-slate-500">
              © 2026 empentIA
            </p>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="/privacy" className="text-slate-500 transition-colors hover:text-slate-300">
                Política de privacitat
              </a>
              <a href="/legal" className="text-slate-500 transition-colors hover:text-slate-300">
                Avís legal
              </a>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="text-slate-500 transition-colors hover:text-slate-300"
              >
                Contacte
              </button>
            </div>
          </div>

          {/* Dev Tools */}
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
                <p className="text-xs text-slate-500 mt-2">
                  Introdueix un audit_id per saltar directament a /complete
                </p>
              </div>
            </div>
          )}
        </div>
      </footer>

      {/* Modal Contacte */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
