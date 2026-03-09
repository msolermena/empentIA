"use client";

import { useState, useRef } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Clock, Sparkles, Zap, Bot, MessageCircle, FileText, Search, BarChart3, Mail, Database, FileSpreadsheet, Wallet, Receipt, Car, UserCheck, Heart, TrendingUp, Sparkle } from "lucide-react";

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
    icon: Search,
    nom: "Prospector comercial",
    hook: "Leads nous cada dilluns",
    titolDetall: "Prospector comercial IA",
    subtitol: "El teu comercial IA que mai dorm",
    flux: [
      { icon: Search, text: "Detecta nous negocis oberts al teu territori" },
      { icon: BarChart3, text: "Analitza la seva web i detecta si encaixen" },
      { icon: Mail, text: "Prepara email personalitzat llest per enviar" },
    ],
    keypoint: "Cada dilluns reps 10-15 oportunitats noves amb fitxa completa i email ja redactat, llest per enviar amb un clic.",
    abans: "4h/setmana buscant leads a Google, LinkedIn, registres mercantils",
    ara: "0 minuts. Decideixes a qui contactar.",
  },
  {
    id: 3,
    tipus: "agent",
    icon: MessageCircle,
    nom: "Assistent comercial",
    hook: "Respon, registra i qualifica leads al moment",
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
    id: 4,
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
  {
    id: 5,
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
    id: 6,
    tipus: "auto",
    icon: Car,
    nom: "Recordatoris vehicle",
    hook: "Recorda i reserva sol",
    titolDetall: "Recordatoris vehicle + Reserva automàtica",
    subtitol: "ITV, revisions, canvis d'oli... el client recorda i reserva sense que facis res",
    flux: [
      { icon: Clock, text: "Servei proper (ITV, revisió, canvi d'oli...)" },
      { icon: MessageCircle, text: "WhatsApp automàtic amb link per reservar" },
      { icon: CheckCircle2, text: "Client tria hora → Cita confirmada al calendari" },
    ],
    keypoint: "ITV, revisions, canvis d'oli, pneumàtics... Recupera clients inactius amb recordatoris automàtics del seu proper manteniment.",
    abans: "Revisar Excel + trucar clients un a un + quadrar agendes",
    ara: "0 trucades. El client reserva sol i tu recuperes clients que feia mesos que no venien.",
  },
  {
    id: 7,
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
    id: 8,
    tipus: "agent",
    icon: TrendingUp,
    nom: "Analista competència",
    hook: "Competència sota control",
    titolDetall: "Analista de competència IA",
    subtitol: "Monitoritza la presència online dels competidors mentre tu treballes",
    flux: [
      { icon: Search, text: "Agent revisa webs i presència online dels competidors" },
      { icon: Sparkle, text: "Detecta canvis: preus, productes, ofertes, novetats" },
      { icon: BarChart3, text: "Resum setmanal amb alertes importants" },
    ],
    keypoint: "Cada setmana reps al correu: qui ha canviat preus, qui ha llançat ofertes, qui ha afegit productes. Alerta immediata si hi ha canvis crítics.",
    abans: "Entrar manualment a webs de competidors o no fer-ho mai",
    ara: "Tens un espia legal que t'informa de tot. Sempre un pas per davant.",
  },
];

function ExemplesCarousel() {
  const [selectedId, setSelectedId] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const selectedExemple = exemples.find((e) => e.id === selectedId)!;

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      {/* Cards carousel */}
      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-700 bg-slate-900/90 p-2 text-slate-400 shadow-lg backdrop-blur-sm transition-all hover:border-emerald-500/50 hover:text-emerald-400 md:-left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-700 bg-slate-900/90 p-2 text-slate-400 shadow-lg backdrop-blur-sm transition-all hover:border-emerald-500/50 hover:text-emerald-400 md:-right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {exemples.map((exemple) => (
            <div key={exemple.id} className="relative flex-shrink-0 snap-start">
              <button
                onClick={() => setSelectedId(exemple.id)}
                className={`relative rounded-xl border-2 p-4 text-left transition-all w-[160px] md:w-[180px] h-[140px] flex flex-col ${
                  selectedId === exemple.id
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
                }`}
              >
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${
                    selectedId === exemple.id ? "bg-emerald-500/20" : "bg-slate-800"
                  }`}
                >
                  <exemple.icon
                    className={`h-5 w-5 ${
                      selectedId === exemple.id ? "text-emerald-400" : "text-slate-400"
                    }`}
                  />
                </div>
                <h3
                  className={`mb-1 text-sm font-semibold leading-tight ${
                    selectedId === exemple.id ? "text-emerald-400" : "text-slate-200"
                  }`}
                >
                  {exemple.nom}
                </h3>
                <p className="text-xs text-slate-500 leading-tight mt-auto">
                  &quot;{exemple.hook}&quot;
                </p>
              </button>
              {selectedId === exemple.id && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-emerald-500" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-1.5 md:hidden">
          {exemples.map((exemple) => (
            <div
              key={exemple.id}
              className={`h-1.5 rounded-full transition-all ${
                selectedId === exemple.id ? "w-4 bg-emerald-500" : "w-1.5 bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Detall expandit */}
      <div className="mt-6 rounded-2xl border-2 border-emerald-500/30 bg-slate-900/30 p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
              <selectedExemple.icon className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-50">
                {selectedExemple.titolDetall || selectedExemple.nom}
              </h3>
              <p className="text-sm text-slate-400">{selectedExemple.subtitol}</p>
            </div>
          </div>
          <div
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
              selectedExemple.tipus === "auto"
                ? "bg-amber-500/10 text-amber-400"
                : "bg-purple-500/10 text-purple-400"
            }`}
          >
            {selectedExemple.tipus === "auto" ? (
              <Zap className="h-4 w-4" />
            ) : (
              <Bot className="h-4 w-4" />
            )}
            {selectedExemple.tipus === "auto" ? "Automatització" : "Agent IA"}
          </div>
        </div>

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

        <div className="mb-6 rounded-xl bg-slate-800/30 p-4">
          <p className="text-sm text-slate-300">{selectedExemple.keypoint}</p>
        </div>

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

// Cercle virtuós
function CercleVirtuos() {
  const steps = [
    {
      num: "1",
      title: "1 automatització activa",
      desc: "El teu equip guanya 5h setmanals.",
    },
    {
      num: "3",
      title: "3 automatitzacions connectades",
      desc: "empentIA comença a conèixer el teu negoci. Les accions es coordinen soles.",
    },
    {
      num: "∞",
      title: "El negoci en pilot automàtic",
      desc: "Clients atesos, factures cobrades, oportunitats detectades.",
      highlight: true,
    },
  ];

  return (
    <div className="mt-16">
      {/* Separador */}
      <div className="mx-auto mb-12 h-px w-32 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-slate-50 md:text-3xl mb-3">
          Com més àrees automatitzes, més intel·ligent es torna tot.
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Cada procés que automatitzes alimenta el coneixement d&apos;empentIA
          sobre el teu negoci. El resultat s&apos;accelera sol.
        </p>
      </div>

      {/* 3 cards */}
      <div className="grid gap-6 md:grid-cols-3 md:gap-4">
        {steps.map((step, index) => (
          <div key={step.num} className="flex items-center gap-4 md:gap-2">
            <div
              className={`flex-1 rounded-xl border p-6 ${
                step.highlight
                  ? "border-emerald-500/30 bg-slate-900"
                  : "border-slate-700/50 bg-slate-900"
              }`}
            >
              <div className="mb-3 text-3xl font-bold text-emerald-500">
                {step.num}
              </div>
              <h4 className="mb-2 text-base font-semibold text-slate-200">
                {step.title}
              </h4>
              <p className="text-sm leading-relaxed text-slate-400">
                {step.desc}
              </p>
            </div>
            {/* Connector arrow (desktop only, not after last) */}
            {index < steps.length - 1 && (
              <ArrowRight className="hidden h-5 w-5 flex-shrink-0 text-emerald-500/40 md:block" />
            )}
          </div>
        ))}
      </div>

      {/* CTA subtil */}
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

export function ExamplesV2() {
  return (
    <section className="relative py-14 px-6 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-slate-50 md:text-4xl">
            Processos reals que ja funcionen sols
          </h2>
          <p className="text-slate-400">
            Automatitzacions i agents IA reals, funcionant en negocis com el teu.
          </p>
        </div>

        <ExemplesCarousel />
        <CercleVirtuos />
      </div>
    </section>
  );
}
