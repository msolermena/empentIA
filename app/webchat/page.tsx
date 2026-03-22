"use client";

import { useState, useEffect, useRef } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { createLead } from "@/lib/api";
import {
  Search,
  ShoppingCart,
  FileText,
  Users,
  Globe,
  Settings,
  CheckCircle2,
  X,
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Zap,
  Clock,
  TrendingUp,
  MessageSquare,
  Bot,
  Star,
} from "lucide-react";

// ── ContactModal ────────────────────────────────────────────────
function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredContact: "email" as "email" | "trucada" | "whatsapp",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await createLead({
        nom: formData.name,
        email: formData.email,
        telefon: formData.phone || undefined,
        preferencia_contacte: formData.preferredContact,
        missatge: `[WEBCHAT DEMO] ${formData.description || ""}`,
      });
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setError(null);
        setFormData({ name: "", email: "", phone: "", preferredContact: "email", description: "" });
      }, 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error enviant el formulari. Torna-ho a provar.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
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
            <p className="text-slate-400">Configurem la demo en menys de 48 hores.</p>
          </div>
        ) : (
          <>
            <h3 className="mb-1 text-2xl font-bold text-slate-50">Demana la teva demo</h3>
            <p className="mb-6 text-slate-400">Configurem una demo amb el teu catàleg real en 48 hores.</p>
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
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Telèfon <span className="text-slate-500">(opcional)</span>
                </label>
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
                  {([
                    { value: "email" as const, icon: Mail, label: "Email" },
                    { value: "trucada" as const, icon: Phone, label: "Trucada" },
                    { value: "whatsapp" as const, icon: MessageCircle, label: "WhatsApp" },
                  ]).map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredContact: opt.value })}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${
                        formData.preferredContact === opt.value
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                          : "border-slate-700 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      <opt.icon className="h-4 w-4" />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  A quin sector pertany el teu negoci? <span className="text-slate-500">(opcional)</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none"
                  placeholder="Botiga online, empresa de seguretat, servei tècnic..."
                />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Enviant..." : "Demana la demo gratuïta"}
              </Button>
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ── ChatDemo ─────────────────────────────────────────────────────
function ChatDemo() {
  const messages = [
    { from: "user", text: "Busco una bici de muntanya per menys de 1.500€" },
    { from: "bot", text: "Perfecte! Prefereixes elèctrica o convencional?" },
    { from: "user", text: "Convencional" },
    {
      from: "bot",
      text: "T'he trobat 3 opcions que s'adapten perfectament al teu pressupost:",
      cards: [
        { name: "Trek Marlin 7", price: "1.199€", tag: "Més venut" },
        { name: "Specialized Rockhopper", price: "1.349€", tag: "Millor relació" },
        { name: "Giant Talon 1", price: "1.099€", tag: "Millor preu" },
      ],
    },
    { from: "user", text: "M'agrada la Trek Marlin 7" },
    { from: "bot", text: "Genial elecció! L'he afegida al carret. Vols continuar o prefereixes finalitzar la compra?" },
  ];

  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible < messages.length) {
      const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 600 : 1100);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-emerald-500/20 bg-slate-900/80 shadow-2xl shadow-emerald-500/10 overflow-hidden">
      {/* Header del xat */}
      <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20">
          <Bot className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-100">Agent empentIA</p>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400">En línia</span>
          </div>
        </div>
      </div>

      {/* Missatges */}
      <div className="space-y-3 p-5 min-h-[340px]">
        {messages.slice(0, visible).map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            {msg.from === "bot" ? (
              <div className="max-w-[85%] space-y-2">
                <div className="rounded-2xl rounded-tl-sm bg-slate-800 px-4 py-3 text-sm text-slate-200 leading-relaxed">
                  {msg.text}
                </div>
                {msg.cards && (
                  <div className="space-y-2">
                    {msg.cards.map((card, ci) => (
                      <div
                        key={ci}
                        className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-slate-800/60 px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-100">{card.name}</p>
                          <span className="text-xs text-emerald-400">{card.tag}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-emerald-400">{card.price}</p>
                          <button className="mt-1 rounded-lg bg-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-400 hover:bg-emerald-500/30 transition-colors flex items-center gap-1">
                            <ShoppingCart className="h-3 w-3" />
                            Afegir
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-emerald-600 px-4 py-3 text-sm text-white leading-relaxed">
                {msg.text}
              </div>
            )}
          </div>
        ))}
        {visible < messages.length && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-tl-sm bg-slate-800 px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-slate-800 px-4 py-3">
        <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5">
          <span className="flex-1 text-sm text-slate-500">Escriu un missatge...</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20">
            <ArrowRight className="h-4 w-4 text-emerald-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── FAQ Item ──────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      className="w-full text-left rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-5 transition-all hover:border-emerald-500/20"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-semibold text-slate-100">{q}</span>
        {open ? (
          <ChevronUp className="h-5 w-5 shrink-0 text-emerald-400" />
        ) : (
          <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
        )}
      </div>
      {open && <p className="mt-3 text-sm leading-relaxed text-slate-400">{a}</p>}
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function WebchatLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openModal = () => setModalOpen(true);

  const features = [
    {
      icon: Search,
      title: "Cerca intel·ligent",
      desc: "Troba productes per característiques, no per paraules exactes. Entén el que el client vol dir.",
    },
    {
      icon: ShoppingCart,
      title: "Afegeix al carret",
      desc: "L'agent completa la venda sense que el client surti del xat. Del dubte a la compra en un sol fil.",
    },
    {
      icon: FileText,
      title: "Pressupostos automàtics",
      desc: "Genera i envia pressupostos personalitzats per email en qüestió de segons, sense intervenció humana.",
    },
    {
      icon: Users,
      title: "Captura leads qualificats",
      desc: "Recull nom, email i necessitat real abans d'escalar a humà. Només leads calents arriben al teu equip.",
    },
    {
      icon: Globe,
      title: "Multiidioma",
      desc: "Detecta i respon en l'idioma del client automàticament. Castellà, català, anglès i més.",
    },
    {
      icon: Settings,
      title: "100% personalitzable",
      desc: "To, regles, productes destacats i comportament adaptat al teu negoci. Nosaltres ho configurem.",
    },
  ];

  const cases = [
    {
      icon: ShoppingCart,
      sector: "Botiga online",
      scenario:
        "Un client pregunta per una bici de muntanya elèctrica. L'agent filtra el catàleg, recomana les 3 millors opcions i l'afegeix al carret sense que el client hagi de navegar.",
      result: "Venda tancada en 3 minuts",
    },
    {
      icon: Star,
      sector: "Empresa de seguretat",
      scenario:
        "Un visitant demana protecció per a un local de 200 m². L'agent qualifica les necessitats, genera un pressupost i recull el contacte per tancar la venda.",
      result: "Lead qualificat en temps real",
    },
    {
      icon: Zap,
      sector: "Servei tècnic",
      scenario:
        "Fora d'horari, un client explica una averia. L'agent recull totes les dades i les envia a l'equip. Al matí, el tècnic ja té el cas preparat.",
      result: "Zero temps perdut al matí",
    },
  ];

  const faqs = [
    {
      q: "Necessito coneixements tècnics per instal·lar-lo?",
      a: "No. Una línia de codi a la teva web és tot el que cal. Si prefereixes, ens n'encarreguem nosaltres sense cost addicional.",
    },
    {
      q: "Funciona amb el meu WooCommerce / PrestaShop?",
      a: "Sí, tenim integració nativa amb WooCommerce i PrestaShop. També funciona amb Shopify, Magento i qualsevol plataforma web.",
    },
    {
      q: "Pot respondre en castellà, català i anglès?",
      a: "Sí. L'agent detecta automàticament l'idioma del client i respon en el mateix idioma. S'adapta a tots els idiomes principals.",
    },
    {
      q: "Quant triga a estar en marxa?",
      a: "Entre 3 i 7 dies des de la primera reunió. Nosaltres configurem tot: productes, to de veu, regles i integracions.",
    },
    {
      q: "Puc personalitzar com parla l'agent?",
      a: "Sí, al 100%. Definim junts el to, les regles de comportament, els productes destacats i qualsevol excepció que necessitis.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-emerald-500/4 blur-3xl" />
      </div>

      {/* ── Header ── */}
      <header
        className={`fixed top-0 z-40 w-full transition-all duration-300 ${
          isScrolled ? "border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <Logo size="md" variant="image" />
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="hidden text-sm font-medium text-slate-400 transition-colors hover:text-emerald-400 md:block"
            >
              Inici
            </a>
            <Button size="sm" onClick={openModal}>
              Demana la demo
            </Button>
          </div>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
        <div className="animate-fade-in-up mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2">
            <Bot className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">Agent comercial IA per a la teva web</span>
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight md:text-7xl">
            El teu millor comercial{" "}
            <span className="gradient-text">treballa 24/7</span>
            <br />i no cobra comissions
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-slate-400">
            El webchat d&apos;empentIA entén el que busca el teu client, li recomana el producte adequat i l&apos;acompanya
            fins a la compra.{" "}
            <span className="text-slate-300">Sense formularis. Sense esperes.</span>
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="px-10 text-base" onClick={openModal}>
              Demana una demo gratuïta
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-slate-500">Demo amb el teu catàleg real en 48 hores</p>
          </div>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up-delay-2 mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm">
          {[
            { icon: Clock, value: "24/7", label: "Disponible sempre" },
            { icon: TrendingUp, value: "3×", label: "Més leads qualificats" },
            { icon: MessageSquare, value: "<2s", label: "Temps de resposta" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1 text-center">
              <stat.icon className="mb-1 h-5 w-5 text-emerald-400" />
              <p className="text-2xl font-extrabold text-slate-50">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">El problema</p>
            <h2 className="text-4xl font-extrabold text-slate-50 md:text-5xl">
              Estàs perdent vendes cada dia
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                num: "70%",
                title: "Abandonen sense comprar",
                desc: "Dels visitants de la teva web marxen perquè no troben resposta immediata al seu dubte.",
                color: "from-red-500/20 to-transparent",
                border: "border-red-500/20",
                text: "text-red-400",
              },
              {
                num: "3h",
                title: "Per dia en consultes repetitives",
                desc: "Horaris, preus, compatibilitats... El teu equip respon les mateixes preguntes una i altra vegada.",
                color: "from-amber-500/20 to-transparent",
                border: "border-amber-500/20",
                text: "text-amber-400",
              },
              {
                num: "48h",
                title: "Fins que reben resposta",
                desc: "Els formularis de contacte generen leads freds que perden l'interès mentre esperen.",
                color: "from-orange-500/20 to-transparent",
                border: "border-orange-500/20",
                text: "text-orange-400",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl border ${item.border} bg-slate-900/60 p-6 backdrop-blur-sm`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-30`}
                />
                <div className="relative">
                  <p className={`mb-2 text-4xl font-extrabold ${item.text}`}>{item.num}</p>
                  <h3 className="mb-2 text-lg font-bold text-slate-100">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUCIÓ EN 3 PASSOS ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">La solució</p>
            <h2 className="text-4xl font-extrabold text-slate-50 md:text-5xl">
              Operatiu en 3 passos
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
              Sense complicacions tècniques. Sense formacions. Tu expliques el teu negoci, nosaltres fem la resta.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Instal·la",
                desc: "Una línia de codi a la teva web. Compatible amb qualsevol plataforma: WooCommerce, Shopify, PrestaShop o la teva web a mida.",
                icon: Zap,
              },
              {
                step: "02",
                title: "Configura",
                desc: "Li expliquem els teus productes, el teu to i les teves regles. Nosaltres ens en cuidem de tot el procés de configuració.",
                icon: Settings,
              },
              {
                step: "03",
                title: "Ven",
                desc: "El teu agent comença a atendre clients, recollir leads i tancar vendes des del primer dia. Sense supervisió.",
                icon: TrendingUp,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-emerald-500/10 bg-slate-900/60 p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-5xl font-extrabold text-slate-800 group-hover:text-slate-700 transition-colors">
                    {item.step}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                    <item.icon className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-100">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">Demo en viu</p>
              <h2 className="mb-6 text-4xl font-extrabold leading-[1.15] text-slate-50 md:text-5xl">
                Veu-ho en acció
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-slate-400">
                Un client busca una bici. L&apos;agent entén la seva necessitat, filtra el catàleg, presenta les millors
                opcions i tanca la venda, tot en un únic fil de conversa.
              </p>
              <ul className="space-y-3">
                {[
                  "Entén la necessitat en llenguatge natural",
                  "Filtra el catàleg sense que el client navegui",
                  "Tanca la venda directament des del xat",
                ].map((point, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <span className="text-slate-300">{point}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="mt-10" onClick={openModal}>
                Vull una demo amb el meu catàleg
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-emerald-500/5 blur-2xl" />
              <div className="relative">
                <ChatDemo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FUNCIONALITATS ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">Funcionalitats</p>
            <h2 className="text-4xl font-extrabold text-slate-50 md:text-5xl">Tot el que necessita el teu agent</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
              Cada funcionalitat pensada per convertir visitants en compradors.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-emerald-500/10 bg-slate-900/60 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 transition-colors group-hover:bg-emerald-500/20">
                  <feat.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="mb-2 text-base font-bold text-slate-100">{feat.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASOS D'ÚS ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">Casos d&apos;ús</p>
            <h2 className="text-4xl font-extrabold text-slate-50 md:text-5xl">
              Funciona en qualsevol sector
            </h2>
          </div>

          <div className="space-y-5">
            {cases.map((c, i) => (
              <div
                key={i}
                className="group grid items-start gap-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-sm transition-all hover:border-emerald-500/20 md:grid-cols-[auto_1fr_auto]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                  <c.icon className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-slate-100">{c.sector}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">&ldquo;{c.scenario}&rdquo;</p>
                </div>
                <div className="shrink-0 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-center">
                  <p className="text-xs font-semibold text-emerald-400 whitespace-nowrap">{c.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">Preguntes freqüents</p>
            <h2 className="text-4xl font-extrabold text-slate-50 md:text-5xl">Tens dubtes?</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="px-6 py-32">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-emerald-500/20 bg-slate-900/80 p-12 text-center shadow-2xl shadow-emerald-500/10 backdrop-blur-sm">
          {/* Glow de fons */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-medium text-emerald-400">Prova-ho sense compromís</span>
            </div>

            <h2 className="mb-4 text-4xl font-extrabold leading-tight text-slate-50 md:text-5xl">
              El teu agent comercial
              <br />
              <span className="gradient-text">llest en 48 hores</span>
            </h2>

            <p className="mx-auto mb-10 max-w-xl text-lg text-slate-400">
              Configurem una demo amb el teu catàleg real en 48 hores. Sense compromís, sense targeta de crèdit.
            </p>

            <Button size="lg" className="px-12 text-base" onClick={openModal}>
              Demana la teva demo gratuïta
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              {["Sense permanència", "Configuració inclosa", "Suport continu"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500/60" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <Logo size="sm" variant="image" />
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} empentIA. Tots els drets reservats.</p>
            <div className="flex gap-6">
              {[
                { label: "Privacitat", href: "/privacy" },
                { label: "Avís legal", href: "/legal" },
                { label: "Inici", href: "/" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-500 transition-colors hover:text-slate-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
