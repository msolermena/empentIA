"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createLead } from "@/lib/api";
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
  Database,
  ChevronLeft,
  ChevronRight,
  Zap,
  FileSpreadsheet,
  Wallet,
  Receipt,
  CalendarCheck,
  UserCheck,
  Heart,
  Target,
  PenTool,
  Clock,
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
    preferredContact: 'email' as 'email' | 'trucada' | 'whatsapp',
    description: ''
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
        missatge: formData.description || undefined,
      });
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setError(null);
        setFormData({ name: '', email: '', phone: '', preferredContact: 'email', description: '' });
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error enviant el formulari. Torna-ho a provar.");
      setIsSubmitting(false);
    }
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
                    { value: 'email' as const, icon: Mail, label: 'Email' },
                    { value: 'trucada' as const, icon: Phone, label: 'Trucada' },
                    { value: 'whatsapp' as const, icon: MessageCircle, label: 'WhatsApp' },
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

// Dades dels exemples
const exemples = [
  {
    id: 1,
    tipus: "auto",
    icon: FileSpreadsheet,
    nom: "Pressupostos automàtics",
    hook: "30 seg vs 15 min",
    titolDetall: "Pressupostos automàtics",
    subtitol: "El client demana, el sistema respon. Tu només aproves.",
    flux: [
      { icon: MessageCircle, text: "Client escriu per WhatsApp o formulari" },
      { icon: Bot, text: "IA extreu dades i aplica les teves tarifes" },
      { icon: FileText, text: "PDF enviat en 30 segons" },
    ],
    keypoint: "Funciona 24/7. El client rep resposta immediata encara que sigui diumenge a les 11 de la nit.",
    abans: "15 minuts per pressupost (llegir, calcular, redactar, enviar)",
    ara: "Automàtic 24/7. El client rep resposta immediata, tu revises si cal.",
  },
  {
    id: 2,
    tipus: "agent",
    icon: MessageCircle,
    nom: "Assistent comercial",
    hook: "Obté, respon, registra i qualifica leads",
    titolDetall: "Assistent comercial IA",
    subtitol: "Atén clients, resol dubtes i detecta oportunitats 24/7",
    flux: [
      { icon: MessageCircle, text: "Client contacta per web (chat/form) o WhatsApp" },
      { icon: Bot, text: "Agent respon dubtes i detecta interès de compra" },
      { icon: CheckCircle2, text: "Qualifica i passa leads calents amb fitxa completa" },
    ],
    keypoint: "Et passa els leads calents amb fitxa completa: què necessita, quan ho vol, pressupost estimat.",
    abans: "Respondre tots els contactes igual + perdre temps amb curiosos",
    ara: "L'agent filtra i qualifica 24/7. Tu parles amb qui realment vol comprar.",
  },
  {
    id: 3,
    tipus: "agent",
    icon: Target,
    nom: "Campanyes intel·ligents",
    hook: "Cap client important que se t'escapi",
    titolDetall: "Campanyes intel·ligents",
    subtitol: "200 clients analitzats. Els que toca contactar, detectats. Els emails, escrits. Tu només aproves i envies.",
    flux: [
      { icon: BarChart3, text: "IA analitza clients per patrons" },
      { icon: PenTool, text: "Genera emails únics personalitzats" },
      { icon: CheckCircle2, text: "Tu aproves i envies amb un sol clic" },
    ],
    keypoint: "Cap client important que se t'escapi.",
    abans: "Revisar clients un per un per saber a qui escriure. Hores de feina comercial.",
    ara: "El sistema detecta qui necessita atenció i redacta l'email sol. Tu revises i aproves en minuts.",
  },
  {
    id: 4,
    tipus: "agent",
    icon: Receipt,
    nom: "Assistent comptable",
    hook: "Factures que es processen soles",
    titolDetall: "Assistent comptable IA",
    subtitol: "Les factures s'ordenen soles mentre prens el cafè",
    flux: [
      { icon: Mail, text: "Factura arriba per email" },
      { icon: Bot, text: "OCR + IA extreu proveïdor, import, IVA, concepte" },
      { icon: Database, text: "Arxiu ordenat + sistema comptable actualitzat" },
    ],
    keypoint: "Detecta duplicats, alerta d'imports inusuals i genera el resum mensual per a la gestoria.",
    abans: "30 min/dia revisant correus, descarregant PDFs, picant dades",
    ara: "Tot processat automàticament. Tu valides el resum.",
  },
  {
    id: 5,
    tipus: "auto",
    icon: CalendarCheck,
    nom: "Recordatoris de cita",
    hook: "Recorda i reserva sol",
    titolDetall: "Recordatoris de cita + Reserva automàtica",
    subtitol: "Revisions, serveis pendents... el client recorda i reserva sense que facis res",
    flux: [
      { icon: Clock, text: "Servei proper (revisió, renovació, cita periòdica...)" },
      { icon: MessageCircle, text: "WhatsApp automàtic amb link per reservar" },
      { icon: CheckCircle2, text: "Client tria hora → Cita confirmada al calendari" },
    ],
    keypoint: "Recupera clients inactius amb recordatoris automàtics del seu proper servei o revisió.",
    abans: "Revisar Excel + trucar clients un a un + quadrar agendes",
    ara: "0 trucades. El client reserva sol i tu recuperes clients que feia mesos que no venien.",
  },
  {
    id: 6,
    tipus: "auto",
    icon: Heart,
    nom: "Benvinguda client",
    hook: "Primera impressió 10",
    titolDetall: "Benvinguda automàtica",
    subtitol: "Primera impressió impecable, sense fer res",
    flux: [
      { icon: UserCheck, text: "Nou client donat d'alta" },
      { icon: Mail, text: "Email benvinguda + documentació personalitzada" },
      { icon: FileText, text: "Formulari per recollir documents del client" },
    ],
    keypoint: "Inclou recollida de documents: el client rep formulari per pujar DNI, contractes o el que necessitis. Tot arxivat automàticament a la seva fitxa.",
    abans: "Recordar enviar email + buscar docs + demanar papers + apuntar seguiment",
    ara: "El client se sent atès des del minut 1. Documentació recollida sense haver de perseguir.",
  },
  {
    id: 7,
    tipus: "auto",
    icon: Wallet,
    nom: "Cobrament intel·ligent",
    hook: "Cobra sense perseguir",
    titolDetall: "Cobrament intel·ligent",
    subtitol: "Gestió de cobraments que s'adapta a cada client",
    flux: [
      { icon: Clock, text: "Factura propera a vèncer" },
      { icon: Bot, text: "IA analitza historial (bon pagador? reincident?)" },
      { icon: MessageCircle, text: "Acció personalitzada + seguiment automàtic" },
    ],
    keypoint: "Accions segons perfil: recordatori suau per bons pagadors, avís de tall de servei per reincidents, facilitats de pagament si detecta dificultats. Inclou enllaç de pagament directe.",
    abans: "Revisar venciments + trucar un a un + decidir com actuar amb cada cas",
    ara: "El sistema decideix el to i l'acció per cada client. Tu intervens quan cal.",
  },
];

// Component Carousel d'Exemples
function ExemplesCarousel() {
  const [selectedId, setSelectedId] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const selectedExemple = exemples.find(e => e.id === selectedId)!;

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      {/* Cards carousel */}
      <div className="relative">
        {/* Fletxa esquerra */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-700 bg-slate-900/90 p-2 text-slate-400 shadow-lg backdrop-blur-sm transition-all hover:border-emerald-500/50 hover:text-emerald-400 md:-left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Fletxa dreta */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-700 bg-slate-900/90 p-2 text-slate-400 shadow-lg backdrop-blur-sm transition-all hover:border-emerald-500/50 hover:text-emerald-400 md:-right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        {/* Cards container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto pb-4 pr-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {exemples.map((exemple) => (
            <div key={exemple.id} className="relative flex-shrink-0 snap-start">
              <button
                onClick={() => setSelectedId(exemple.id)}
                className={`relative rounded-xl border-2 p-4 text-left transition-all w-[160px] md:w-[180px] h-[140px] flex flex-col ${
                  selectedId === exemple.id
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                {/* Icona */}
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${
                  selectedId === exemple.id ? 'bg-emerald-500/20' : 'bg-slate-800'
                }`}>
                  <exemple.icon className={`h-5 w-5 ${
                    selectedId === exemple.id ? 'text-emerald-400' : 'text-slate-400'
                  }`} />
                </div>

                {/* Nom */}
                <h3 className={`mb-1 text-sm font-semibold leading-tight ${
                  selectedId === exemple.id ? 'text-emerald-400' : 'text-slate-200'
                }`}>
                  {exemple.nom}
                </h3>

                {/* Hook */}
                <p className="text-xs text-slate-500 leading-tight mt-auto">"{exemple.hook}"</p>
              </button>

              {/* Fletxa indicadora sota la card seleccionada */}
              {selectedId === exemple.id && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-emerald-500" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Indicador scroll (punts) */}
        <div className="mt-4 flex justify-center gap-1.5 md:hidden">
          {exemples.map((exemple) => (
            <div
              key={exemple.id}
              className={`h-1.5 rounded-full transition-all ${
                selectedId === exemple.id ? 'w-4 bg-emerald-500' : 'w-1.5 bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Detall expandit */}
      <div className="mt-6 rounded-2xl border-2 border-emerald-500/30 bg-slate-900/30 p-6 md:p-8">
        {/* Header detall */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
              <selectedExemple.icon className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-50">{selectedExemple.titolDetall || selectedExemple.nom}</h3>
              <p className="text-sm text-slate-400">{selectedExemple.subtitol}</p>
            </div>
          </div>
          <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
            selectedExemple.tipus === 'auto' 
              ? 'bg-amber-500/10 text-amber-400' 
              : 'bg-purple-500/10 text-purple-400'
          }`}>
            {selectedExemple.tipus === 'auto' ? <Zap className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            {selectedExemple.tipus === 'auto' ? 'Automatització' : 'Agent IA'}
          </div>
        </div>

        {/* Flux visual */}
        <div className="mb-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2">
            {selectedExemple.flux.map((pas, index) => (
              <div key={index} className="flex items-center gap-2 md:flex-1">
                <div className="flex items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 md:flex-1">
                  <pas.icon className="h-5 w-5 flex-shrink-0 text-emerald-400" />
                  <span className="text-sm text-slate-300">{pas.text}</span>
                </div>
                {index < selectedExemple.flux.length - 1 && (
                  <ArrowRight className="hidden h-4 w-4 flex-shrink-0 text-slate-600 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Keypoint */}
        <div className="mb-6 rounded-xl bg-slate-800/30 p-4">
          <p className="text-sm text-slate-300">{selectedExemple.keypoint}</p>
        </div>

        {/* Abans vs Ara */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500">
              <Clock className="h-4 w-4" />
              Abans
            </div>
            <p className="text-sm text-slate-400">{selectedExemple.abans}</p>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-400">
              <Sparkles className="h-4 w-4" />
              Ara amb empentIA
            </div>
            <p className="text-sm text-slate-300">{selectedExemple.ara}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Cercle Virtuós
const cvAreas = [
  { label: "Vendes", angle: 270 },
  { label: "Cobraments", angle: 342 },
  { label: "Comunicació", angle: 54 },
  { label: "Operacions", angle: 126 },
  { label: "Finances", angle: 198 },
];

const cvStages = [
  {
    activeIndices: [0],
    title: "1 automatització",
    message: "Guanyes temps. empentIA comença a conèixer el teu negoci.",
  },
  {
    activeIndices: [0, 1, 2],
    title: "3 connectades",
    message: "Els agents de cada àmbit es parlen. El que veu un, ho saben tots.",
  },
  {
    activeIndices: [0, 1, 2, 3, 4],
    title: "Visió completa",
    message: "Menys feina. Més criteri. Millors decisions.",
  },
];

function CercleVirtuos() {
  const [activeStage, setActiveStage] = useState(0);
  const stage = cvStages[activeStage];

  return (
    <div className="mt-16">
      <div className="mx-auto mb-12 h-px w-32 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-50 md:text-3xl mb-3">
          Del &lsquo;guanya temps&rsquo; al &lsquo;decideix millor&rsquo;.
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Cada procés que automatitzes alimenta empentIA amb dades reals.
          Amb el temps, no només fas menys feina manual, tens una visió
          del teu negoci que abans no existia.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="relative mx-auto mb-8 h-[320px] w-[320px] sm:h-[380px] sm:w-[380px]">
          <div className="absolute left-1/2 top-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-emerald-500/50 bg-slate-900 shadow-lg shadow-emerald-500/20">
            <span className="text-xs font-bold text-emerald-400">empentIA</span>
          </div>

          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-700"
            style={{
              width: activeStage === 0 ? 140 : activeStage === 1 ? 180 : 220,
              height: activeStage === 0 ? 140 : activeStage === 1 ? 180 : 220,
              borderColor: activeStage === 2 ? "rgba(16,185,129,0.3)" : "rgba(16,185,129,0.1)",
              boxShadow: activeStage === 2 ? "0 0 40px rgba(16,185,129,0.15)" : "none",
            }}
          />

          <svg className="absolute inset-0 z-0" viewBox="-190 -190 380 380">
            {cvAreas.map((area, i) => {
              const isActive = stage.activeIndices.includes(i);
              const radius = 130;
              const angleRad = ((area.angle - 90) * Math.PI) / 180;
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;
              return (
                <line
                  key={`line-${i}`}
                  x1="0" y1="0"
                  x2={x} y2={y}
                  stroke={isActive ? "rgba(16,185,129,0.4)" : "rgba(51,65,85,0.3)"}
                  strokeWidth={isActive ? "2" : "1"}
                  strokeDasharray={isActive ? "none" : "4 4"}
                  className="transition-all duration-500"
                />
              );
            })}
            {stage.activeIndices.length > 1 && stage.activeIndices.map((ai, idx) => {
              const nextIdx = (idx + 1) % stage.activeIndices.length;
              const nextAi = stage.activeIndices[nextIdx];
              const r = 130;
              const a1 = ((cvAreas[ai].angle - 90) * Math.PI) / 180;
              const a2 = ((cvAreas[nextAi].angle - 90) * Math.PI) / 180;
              return (
                <line
                  key={`conn-${idx}`}
                  x1={Math.cos(a1) * r} y1={Math.sin(a1) * r}
                  x2={Math.cos(a2) * r} y2={Math.sin(a2) * r}
                  stroke="rgba(16,185,129,0.15)"
                  strokeWidth="1"
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>

          {cvAreas.map((area, i) => {
            const isActive = stage.activeIndices.includes(i);
            const radius = 130;
            const angleRad = ((area.angle - 90) * Math.PI) / 180;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;
            return (
              <div
                key={area.label}
                className="absolute left-1/2 top-1/2 z-10"
                style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
              >
                <div
                  className={`flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-500 ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-md shadow-emerald-500/10"
                      : "bg-slate-800/40 text-slate-500 border border-slate-700/50"
                  }`}
                >
                  {area.label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-6 flex justify-center gap-2">
          {cvStages.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveStage(i)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeStage === i
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-slate-800/50 text-slate-500 border border-slate-700/30 hover:text-slate-300"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        <p className="text-center text-slate-300 transition-all duration-300">
          {stage.message}
        </p>
      </div>

      <p className="mt-8 text-center text-slate-400">
        Comencem per una. La resta ve sola.{" "}
        <span className="inline-flex items-center gap-1 font-medium text-emerald-400 cursor-pointer hover:text-emerald-300 transition-colors">
          Comença l&apos;auditoria
          <ArrowRight className="h-4 w-4" />
        </span>
      </p>
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

  const handleSubmit = async (e: React.FormEvent, ctaOrigin: 'hero' | 'footer' = 'hero') => {
    e.preventDefault();
    setError(null);
    try {
      const normalizedUrl = normalizeUrl(url);
      // Propagar source=test si ve del test de validació
      const source = searchParams.get("source");
      const queryParams = new URLSearchParams({ url: normalizedUrl });
      if (source === "test") {
        queryParams.set("source", "test");
      }
      // Propagar origen del CTA
      queryParams.set("cta_origin", ctaOrigin);
      router.push(`/audit/analyzing?${queryParams.toString()}`);
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

          {/* Claim abans del CTA */}
          <p className="fade-in-up-delay-2 mb-4 text-slate-300">
            Descobreix com pots recuperar hores cada setmana →
          </p>

          {/* CTA Principal - Auditoria */}
          <form onSubmit={(e) => handleSubmit(e, 'hero')} className="fade-in-up-delay-2 mb-6">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-2xl border-2 border-slate-700 bg-slate-900/80 p-3 backdrop-blur-sm transition-all focus-within:border-emerald-500/50 focus-within:shadow-lg focus-within:shadow-emerald-500/10 sm:flex-row sm:p-2">
              <Input
                type="text"
                placeholder="La teva web (ex: empresa.cat)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 border-2 border-slate-600 bg-slate-800/80 rounded-xl px-4 h-14 text-base placeholder:text-slate-400 focus:border-emerald-500 focus:ring-0"
                required
              />
              <Button type="submit" size="lg" className="gap-2 whitespace-nowrap w-full sm:w-auto">
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
              Auditoria gratuïta
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
          <div className="fade-in-up-delay-3">
            <button
              onClick={() => setIsContactOpen(true)}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-emerald-400"
            >
              Ja saps què vols automatitzar? Explica'ns-ho
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="relative py-14 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">Si et passa alguna d&apos;aquestes coses, empentIA és per a tu.</h2>
          </div>

          <div className="space-y-4">
            {[
              "Tens feines que fas cada setmana que saps perfectament que podrien fer-se soles",
              "El teu equip perd temps picant dades, enviant recordatoris o buscant documents",
              "Has provat ChatGPT però no saps com connectar-ho al teu negoci real",
              "Saps que la IA avança però no tens temps d'aprendre a implementar-la",
              "Vols que el teu negoci funcioni millor sense haver d'entendre de tecnologia",
            ].map((text) => (
              <div
                key={text}
                className="flex items-start gap-4 rounded-xl border border-slate-800/60 bg-slate-900/20 p-4 transition-all hover:border-emerald-500/20 hover:bg-slate-900/40"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                <p className="text-base leading-relaxed text-slate-200">{text}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-lg text-slate-400">
            Si t&apos;hi veus reflectit, <span className="font-semibold text-emerald-400">empentIA és per a tu.</span>
          </p>
        </div>
      </section>

      {/* Exemples */}
      <section className="relative py-14 px-6 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-slate-50 md:text-4xl">Processos reals que ja funcionen sols</h2>
            <p className="text-slate-400">Automatitzacions i agents IA reals, funcionant en negocis com el teu.</p>
          </div>

          <ExemplesCarousel />

          {/* Cercle Virtuós */}
          <CercleVirtuos />
        </div>
      </section>

      {/* Com Funciona - 4 Passos */}
      <section id="com-funciona" className="relative py-16 px-6">
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
                  title: "Funciona!",
                  desc: "Supervisa resultats des de la teva plataforma",
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
      <section className="relative py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">Tot en un sol lloc. Totes les teves eines, una sola memòria.</h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              empentIA connecta el que ja tens i ho centralitza. Les teves dades, els teus clients, les teves automatitzacions. Visibles i accionables des d&apos;un sol portal.
            </p>
          </div>

          {/* Layout: Funcionalitats + Screenshot */}
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Funcionalitats */}
            <div className="space-y-6">
              {[
                {
                  icon: BarChart3,
                  title: "Impacte mesurable",
                  desc: "Visualitza quantes hores estalvies i quin valor generen les teves automatitzacions"
                },
                {
                  icon: Activity,
                  title: "Automatitzacions actives",
                  desc: "Monitoritza què s'ha executat: correus enviats, recordatoris, factures processades... Rep alertes quan cal la teva atenció"
                },
                {
                  icon: Bot,
                  title: "Agents IA que coneixen el teu negoci",
                  desc: "Assistents que coneixen el teu negoci: responen consultes, classifiquen documents, analitzen dades i actuen per tu 24/7 (no ChatGPT genèric)"
                },
                {
                  icon: Database,
                  title: "Una sola font de veritat",
                  desc: "Centralitza la informació del teu negoci en un sol lloc. T'ajudem a estructurar-la perquè automatitzacions i agents la puguin usar"
                },
                {
                  icon: RefreshCw,
                  title: "Sempre al dia",
                  desc: "Integrem les últimes novetats en IA. La tecnologia avança, el teu negoci també"
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                    <item.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-100">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
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
      <section className="relative py-14 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">Per què empentIA</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Sparkles,
                title: "Servei complet",
                desc: "Disseny, implementació, manteniment i suport. Tu només expliques què necessites."
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


      {/* Qui Hi Ha Al Darrere - AMAGAT TEMPORALMENT
      <section className="relative py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">Qui hi ha al darrere</h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-8 text-center md:p-12">
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
      */}

      {/* CTA Final */}
      <section className="relative py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-slate-900/50 p-8 text-center md:p-16">
            {/* Decorative glow */}
            <div className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl" />
            
            <div className="relative">
              <h3 className="mb-4 text-2xl font-bold text-slate-50 md:text-3xl">
                Descobreix en 3 minuts quant temps perd el teu negoci.
              </h3>
              <p className="mb-8 text-slate-400">
                L&apos;auditoria és gratuïta, sense compromís, i et mostra oportunitats concretes per al teu sector.
              </p>

              <form onSubmit={(e) => handleSubmit(e, 'footer')} className="mb-6">
                <div className="mx-auto flex max-w-xl flex-col items-center gap-3 rounded-2xl border-2 border-slate-700 bg-slate-900/80 p-3 transition-all focus-within:border-emerald-500/50 sm:flex-row sm:p-2">
                  <Input
                    type="text"
                    placeholder="La teva web (ex: empresa.cat)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 border-2 border-slate-600 bg-slate-800/80 rounded-xl px-4 h-14 text-base placeholder:text-slate-400 focus:border-emerald-500 focus:ring-0"
                    required
                  />
                  <Button type="submit" size="lg" className="gap-2 whitespace-nowrap w-full sm:w-auto">
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
                  Auditoria gratuïta
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
                Ja saps què vols automatitzar? Explica'ns-ho
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
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a href="/privacy" className="text-slate-500 transition-colors hover:text-slate-300">
                Política de privacitat
              </a>
              <a href="/legal" className="text-slate-500 transition-colors hover:text-slate-300">
                Avís legal
              </a>
              <a href="/cookies" className="text-slate-500 transition-colors hover:text-slate-300">
                Cookies
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
