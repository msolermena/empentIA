"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Globe,
  Loader2,
  Users,
  Clock,
  Euro,
  TrendingDown,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Download,
  Sparkles,
  AlertCircle,
  Headphones,
  Zap,
  Lock,
  Wallet,
  Receipt,
  BadgeCheck,
  Clock3,
} from "lucide-react";
import {
  scrapeCompany,
  createLandingLead,
  sendAuditoriaEmail,
  type AuditoriaDetalle,
} from "@/lib/api";
import { buildProposal, type Propuesta } from "@/lib/pricing";
import { STR, getLang, type Dict, type Lang } from "./i18n";

// ============================================================
// i18n CONTEXT
// ============================================================

const LangContext = createContext<Dict>(STR.es);
const useT = () => useContext(LangContext);

// ============================================================
// CONSTANTS
// ============================================================

const CAL_LINK = "https://cal.com/empentia/descobriment-empentia";
const HORAS_MES = 4.33; // setmanes per mes
const FACTOR_AUTOMATITZABLE = 0.6; // % de temps de tasques repetitives automatitzable

type StepId = "intro" | "analyzing" | "cuestionario" | "contacto" | "informe";

interface Contact {
  nom: string;
  email: string;
  empresa: string;
  consent: boolean;
  comercial: boolean;
}

const EMPTY_CONTACT: Contact = {
  nom: "",
  email: "",
  empresa: "",
  consent: false,
  comercial: false,
};

// Orden de canales (las etiquetas viven en i18n: t.canales[id])
const CANAL_IDS = [
  "telefono",
  "email",
  "formulario",
  "webchat",
  "whatsapp",
  "redes",
  "resenas",
  "presencial",
] as const;

// Identidad de marca por servicio — manual "04 Color por servicio".
// color: acento del manual · icon: icono de marca. (El nombre de producto
// vive en i18n: t.serviceName[id], para poder traducirlo.)
// official=false → color prestado de la paleta documentada (pendiente de que
// la marca asigne uno propio a email/reseñas/redes).
type BrandIconName =
  | "chat"
  | "email"
  | "whatsapp"
  | "voz"
  | "star"
  | "red"
  | "formulario"
  | "store"
  | "check"
  | "bolt";

// Icono de marca por canal del cuestionario (mismo estilo línea + nodos).
const CHIP_ICON: Record<string, BrandIconName> = {
  telefono: "voz",
  email: "email",
  formulario: "formulario",
  webchat: "chat",
  whatsapp: "whatsapp",
  redes: "red",
  resenas: "star",
  presencial: "store",
};

interface ServiceBrand {
  color: string;
  icon: BrandIconName;
  official: boolean;
}

const SERVICE: Record<string, ServiceBrand> = {
  webchat: { color: "#1a1a1a", icon: "chat", official: true },
  email: { color: "#3a5a6f", icon: "email", official: false },
  whatsapp: { color: "#1f7a3e", icon: "whatsapp", official: true },
  telefono: { color: "#8a6a1a", icon: "voz", official: true },
  resenas: { color: "#4a6a5a", icon: "star", official: false },
  redes: { color: "#4a3a6f", icon: "red", official: false },
  formulario: { color: "#1e3a5f", icon: "formulario", official: true },
};

const ANALYZING_ICONS = [Globe, Headphones, Zap, CheckCircle2];
const TIEMPO_IDS = [
  "menos_1h",
  "pocas_horas",
  "mismo_dia",
  "1_2_dias",
  "mas_2_dias",
];

// ============================================================
// HELPERS
// ============================================================

function normalizeUrl(raw: string): string {
  const v = raw.trim().replace(/\s+/g, "");
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v;
  return `https://${v}`;
}

function eur(n: number): string {
  return Math.round(n).toLocaleString("es-ES");
}

interface Answers {
  canalesActivos: string[];
  canalesNuevos: string[];
  consultasSemana: string;
  tipoPrincipal: string;
  horasSemana: string;
  costeHora: string;
  tiempoRespuesta: string;
  notas: string;
}

const EMPTY_ANSWERS: Answers = {
  canalesActivos: [],
  canalesNuevos: [],
  consultasSemana: "",
  tipoPrincipal: "",
  horasSemana: "",
  costeHora: "22",
  tiempoRespuesta: "",
  notas: "",
};

interface Report {
  horasSemana: number;
  costeHora: number;
  costeMes: number;
  costeAnio: number;
  consultasMes: number;
  horasLiberadas: number;
  ahorroMes: number;
  ahorroAnio: number;
}

function computeReport(a: Answers): Report {
  const horasSemana = parseFloat(a.horasSemana) || 0;
  const costeHora = parseFloat(a.costeHora) || 0;
  const consultasSemana = parseFloat(a.consultasSemana) || 0;
  const costeMes = horasSemana * costeHora * HORAS_MES;
  const horasLiberadas = horasSemana * FACTOR_AUTOMATITZABLE;
  const ahorroMes = horasLiberadas * costeHora * HORAS_MES;
  return {
    horasSemana,
    costeHora,
    costeMes,
    costeAnio: costeMes * 12,
    consultasMes: consultasSemana * HORAS_MES,
    horasLiberadas,
    ahorroMes,
    ahorroAnio: ahorroMes * 12,
  };
}

// Construye el detalle COMPLETO de la auditoría para enviarlo al lead del
// portal. Etiquetas canónicas en castellano (STR.es) sea cual sea el idioma.
function buildAuditoriaDetalle(a: Answers, lang: Lang): AuditoriaDetalle {
  const r = computeReport(a);
  const propuesta = buildProposal({
    canales: [...a.canalesActivos, ...a.canalesNuevos],
    consultasMes: r.consultasMes,
  });
  const es = STR.es;
  const canal = (id: string) => es.canales[id] ?? id;

  return {
    idioma: lang,
    canales_activos: a.canalesActivos.map(canal),
    canales_nuevos: a.canalesNuevos.map(canal),
    consultas_semana: parseFloat(a.consultasSemana) || 0,
    consultas_mes: Math.round(r.consultasMes),
    tipo_principal: a.tipoPrincipal,
    horas_semana: r.horasSemana,
    coste_hora: r.costeHora,
    tiempo_respuesta: es.tiempos[a.tiempoRespuesta] ?? a.tiempoRespuesta,
    notas: a.notas || undefined,
    coste_mes: Math.round(r.costeMes),
    coste_anio: Math.round(r.costeAnio),
    ahorro_mes: Math.round(r.ahorroMes),
    ahorro_anio: Math.round(r.ahorroAnio),
    horas_liberadas: Math.round(r.horasLiberadas),
    propuesta: {
      lineas: propuesta.lineas.map((l) => ({
        canal: canal(l.channelId),
        servicio: es.serviceName[l.channelId] ?? l.label,
        plan: l.esPersonalizado ? "Personalizado" : l.tier.label,
        precio_mes: l.precioMes,
        setup: l.setup,
        personalizado: l.esPersonalizado,
      })),
      addons: propuesta.addons.map((ad) => ({
        nombre: ad.label,
        precio_mes: ad.precioMes,
      })),
      setup_total: propuesta.setupTotal,
      cuota_mensual: propuesta.cuotaMensual,
      tramo_dominante: propuesta.tramoDominante,
      hay_personalizado: propuesta.hayPersonalizado,
    },
  };
}

// ============================================================
// SHARED UI
// ============================================================

function Header({ step }: { step: StepId }) {
  const t = useT();
  const activeMap: Partial<Record<StepId, number>> = {
    cuestionario: 0,
    contacto: 1,
    informe: 2,
  };
  const active = activeMap[step];

  return (
    <header className="no-print fixed top-0 z-50 w-full border-b bd bg-[var(--bg)]/85 backdrop-blur-md">
      <nav className="container mx-auto flex h-16 items-center justify-between px-6">
        <a href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo/empentia-horizontal-color.svg"
            alt="empentIA"
            className="h-7 w-auto"
          />
        </a>
        {active === undefined ? (
          <span className="kicker hidden sm:inline">{t.header.label}</span>
        ) : (
          <Stepper active={active} />
        )}
      </nav>
    </header>
  );
}

function Stepper({ active }: { active: number }) {
  const t = useT();
  const steps = t.header.steps;
  return (
    <div className="flex items-center gap-1.5 sm:gap-2.5">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-1.5 sm:gap-2.5">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
              i <= active ? "a-step-on" : "a-step-off"
            }`}
          >
            {i + 1}
          </span>
          <span
            className={`hidden text-xs font-medium sm:inline ${
              i <= active ? "t-green" : "t-mute"
            }`}
          >
            {s}
          </span>
          {i < steps.length - 1 && (
            <span className="mx-0.5 h-px w-4 bg-line sm:w-6" />
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// PAGE
// ============================================================

export default function AuditoriaAtencionPage() {
  const searchParams = useSearchParams();

  const lang = getLang(searchParams.get("lang"));
  const t = STR[lang];

  const [step, setStep] = useState<StepId>("intro");
  const [url, setUrl] = useState("");
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [contact, setContact] = useState<Contact>(EMPTY_CONTACT);

  // Deep-link: si arriba ?url=... saltem directament a l'anàlisi
  useEffect(() => {
    const u = searchParams.get("url");
    if (u) {
      setUrl(u);
      setStep("analyzing");
    }
  }, [searchParams]);

  return (
    <LangContext.Provider value={t}>
      <Header step={step} />

      {step === "intro" && (
        <IntroStep
          url={url}
          setUrl={setUrl}
          onStart={() => setStep("analyzing")}
        />
      )}

      {step === "analyzing" && (
        <AnalyzingStep
          url={url}
          onDone={(detected) => {
            setAnswers((prev) => ({ ...prev, canalesActivos: detected }));
            setStep("cuestionario");
          }}
          onError={() => setStep("cuestionario")}
        />
      )}

      {step === "cuestionario" && (
        <CuestionarioStep
          answers={answers}
          setAnswers={setAnswers}
          onBack={() => setStep("intro")}
          onNext={() => setStep("contacto")}
        />
      )}

      {step === "contacto" && (
        <ContactoStep
          url={url}
          answers={answers}
          lang={lang}
          onBack={() => setStep("cuestionario")}
          onDone={(c) => {
            setContact(c);
            setStep("informe");
          }}
        />
      )}

      {step === "informe" && (
        <InformeStep
          answers={answers}
          contact={contact}
          url={url}
          lang={lang}
        />
      )}
    </LangContext.Provider>
  );
}

// ============================================================
// STEP 1 — INTRO (URL)
// ============================================================

function IntroStep({
  url,
  setUrl,
  onStart,
}: {
  url: string;
  setUrl: (v: string) => void;
  onStart: () => void;
}) {
  const t = useT();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = normalizeUrl(url);
    if (!v || !/\.[a-z]{2,}/i.test(v)) {
      setError(t.intro.errInvalid);
      return;
    }
    setUrl(v);
    onStart();
  };

  const bulletIcons = [CheckCircle2, Lock, Zap];

  return (
    <div className="a-glow">
      <div className="container mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 pt-24 pb-16">
        <div className="a-in flex flex-col items-center">
          <span className="kicker mb-5 inline-flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" />
            {t.intro.kicker}
          </span>

          <h1 className="serif mb-5 text-center text-4xl leading-[1.05] t-ink md:text-5xl">
            {t.intro.h1a}
            <em>{t.intro.h1em}</em>
            {t.intro.h1b}
          </h1>
          <p className="mb-9 max-w-xl text-center text-lg leading-relaxed t-soft">
            {t.intro.sub}
          </p>
        </div>

        <div className="a-card a-in w-full p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium t-soft">
              {t.intro.urlLabel}
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Globe className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 t-mute" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError(null);
                  }}
                  placeholder={t.intro.urlPlaceholder}
                  className="a-input pl-12"
                />
              </div>
              <button type="submit" className="a-btn a-btn-primary a-btn-lg">
                {t.intro.start}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            {error && (
              <p className="flex items-center gap-2 text-sm t-terra">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}
          </form>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {t.intro.bullets.map((b, i) => {
            const Icon = bulletIcons[i] ?? CheckCircle2;
            return (
              <span
                key={b}
                className="inline-flex items-center gap-2 text-sm t-mute"
              >
                <Icon className="h-4 w-4 t-green" />
                {b}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// STEP 2 — ANALYZING
// ============================================================

function AnalyzingStep({
  url,
  onDone,
  onError,
}: {
  url: string;
  onDone: (detected: string[]) => void;
  onError: () => void;
}) {
  const t = useT();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const progressInterval = setInterval(() => {
      setProgress((p) => (p >= 95 ? p : p + 0.8));
    }, 200);

    const stepInterval = setInterval(() => {
      setCurrentStep((s) => (s < ANALYZING_ICONS.length - 1 ? s + 1 : s));
    }, 2200);

    let finished = false;
    const finish = (detected: string[], failed: boolean) => {
      if (finished) return;
      finished = true;
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      setProgress(100);
      setTimeout(() => (failed ? onError() : onDone(detected)), 500);
    };

    const minDelay = new Promise<void>((r) => setTimeout(r, 4000));

    (async () => {
      try {
        const res = await scrapeCompany(normalizeUrl(url));
        const insights = res.pre_research?.insights;
        const detected: string[] = [];
        if (insights?.te_chat) detected.push("webchat");
        if (insights?.te_formulari_contacte) detected.push("formulario");
        if (insights?.xarxes_socials && insights.xarxes_socials.length > 0)
          detected.push("redes");
        await minDelay;
        finish(detected, false);
      } catch {
        await minDelay;
        finish([], false); // continuem encara que el scrape falli
      }
    })();

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const CurrentIcon = ANALYZING_ICONS[currentStep];

  return (
    <div className="a-glow flex min-h-screen items-center justify-center px-6 pt-16">
      <div className="w-full max-w-xl">
        <div className="a-card p-8 text-center md:p-12">
          <div className="mb-8 flex justify-center">
            <div className="relative h-24 w-24">
              <div className="a-ring absolute inset-0 h-24 w-24" />
              <div className="absolute inset-2 flex items-center justify-center rounded-full bg-[rgba(0,192,136,0.1)]">
                <CurrentIcon className="h-11 w-11 t-green transition-all duration-300" />
              </div>
            </div>
          </div>

          <h2 className="serif mb-3 text-2xl t-ink md:text-3xl">
            {t.analyzing.steps[currentStep]}
          </h2>
          <p className="mb-8 t-soft">
            {t.analyzing.analyzing}{" "}
            <strong className="mono text-[13px] t-ink">{url}</strong>
          </p>

          <div className="a-track mb-2">
            <div className="a-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="mono text-sm t-mute">
            {Math.round(progress)}
            {t.analyzing.completed}
          </p>

          <div className="mt-8 flex items-center justify-center gap-2">
            {ANALYZING_ICONS.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i <= currentStep ? "w-8" : "w-2 bg-line"
                }`}
                style={i <= currentStep ? { background: "var(--green)" } : {}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// STEP 3 — CUESTIONARIO
// ============================================================

function ChipGroup({
  ids,
  selected,
  onToggle,
}: {
  ids: string[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const t = useT();
  return (
    <div className="flex flex-wrap gap-2.5">
      {ids.map((id) => {
        const isSel = selected.includes(id);
        return (
          <button
            key={id}
            type="button"
            onClick={() => onToggle(id)}
            className={`a-chip ${isSel ? "a-chip-on" : ""}`}
          >
            <BrandIcon
              name={isSel ? "check" : CHIP_ICON[id] ?? "bolt"}
              className="h-4 w-4"
            />
            {t.canales[id]}
          </button>
        );
      })}
    </div>
  );
}

function QCard({
  n,
  title,
  hint,
  optional,
  optionalLabel,
  children,
}: {
  n: number;
  title: string;
  hint?: string;
  optional?: boolean;
  optionalLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="a-card p-6">
      <div className="mb-1 flex items-baseline gap-2.5">
        <span className="kicker">{String(n).padStart(2, "0")}</span>
        <h2 className="serif text-lg t-ink">
          {title}
          {optional && (
            <span className="ml-2 text-sm not-italic t-mute">
              {optionalLabel}
            </span>
          )}
        </h2>
      </div>
      {hint && <p className="mb-4 text-sm t-mute">{hint}</p>}
      <div className={hint ? "" : "mt-4"}>{children}</div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-2 block text-sm font-medium t-soft">{children}</label>;
}

function CuestionarioStep({
  answers,
  setAnswers,
  onBack,
  onNext,
}: {
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
  onBack: () => void;
  onNext: () => void;
}) {
  const t = useT();
  const [error, setError] = useState<string | null>(null);

  const toggle = (key: "canalesActivos" | "canalesNuevos", id: string) => {
    setError(null);
    setAnswers((prev) => {
      const list = prev[key];
      return {
        ...prev,
        [key]: list.includes(id)
          ? list.filter((x) => x !== id)
          : [...list, id],
      };
    });
  };

  const set = (key: keyof Answers, value: string) => {
    setError(null);
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    const q = t.cuestionario;
    if (answers.canalesActivos.length === 0) return setError(q.errCanal);
    if (!answers.consultasSemana || parseFloat(answers.consultasSemana) <= 0)
      return setError(q.errConsultas);
    if (!answers.tipoPrincipal) return setError(q.errTipo);
    if (!answers.horasSemana || parseFloat(answers.horasSemana) <= 0)
      return setError(q.errHoras);
    if (!answers.costeHora || parseFloat(answers.costeHora) <= 0)
      return setError(q.errCoste);
    if (!answers.tiempoRespuesta) return setError(q.errTiempo);
    onNext();
  };

  const q = t.cuestionario;
  const nuevosDisponibles = CANAL_IDS.filter(
    (id) => !answers.canalesActivos.includes(id)
  );

  return (
    <div className="container mx-auto max-w-2xl px-6 pt-24 pb-12">
      <div className="a-in mb-8">
        <span className="kicker">{q.step}</span>
        <h1 className="serif mt-2 text-3xl t-ink">{q.h1}</h1>
        <p className="mt-2 t-soft">{q.sub}</p>
      </div>

      <div className="space-y-5">
        <QCard n={1} title={q.q1t} hint={q.q1h}>
          <ChipGroup
            ids={[...CANAL_IDS]}
            selected={answers.canalesActivos}
            onToggle={(id) => toggle("canalesActivos", id)}
          />
        </QCard>

        <QCard
          n={2}
          title={q.q2t}
          optional
          optionalLabel={q.optional}
          hint={q.q2h}
        >
          {nuevosDisponibles.length > 0 ? (
            <ChipGroup
              ids={nuevosDisponibles}
              selected={answers.canalesNuevos}
              onToggle={(id) => toggle("canalesNuevos", id)}
            />
          ) : (
            <p className="text-sm t-mute">{q.allActive}</p>
          )}
        </QCard>

        <QCard n={3} title={q.q3t}>
          <div className="space-y-4">
            <div>
              <FieldLabel>{q.qVol}</FieldLabel>
              <input
                type="number"
                min={0}
                value={answers.consultasSemana}
                onChange={(e) => set("consultasSemana", e.target.value)}
                placeholder={q.qVolPh}
                className="a-input"
              />
            </div>
            <div>
              <FieldLabel>{q.qTipo}</FieldLabel>
              <select
                value={answers.tipoPrincipal}
                onChange={(e) => set("tipoPrincipal", e.target.value)}
                className="a-input"
              >
                <option value="">{q.selectOpt}</option>
                {t.tipos.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </QCard>

        <QCard n={4} title={q.q4t}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>{q.qHoras}</FieldLabel>
              <input
                type="number"
                min={0}
                value={answers.horasSemana}
                onChange={(e) => set("horasSemana", e.target.value)}
                placeholder={q.qHorasPh}
                className="a-input"
              />
            </div>
            <div>
              <FieldLabel>{q.qCoste}</FieldLabel>
              <input
                type="number"
                min={0}
                value={answers.costeHora}
                onChange={(e) => set("costeHora", e.target.value)}
                placeholder="22"
                className="a-input"
              />
              <p className="mt-1.5 text-xs t-mute">{q.qCosteHint}</p>
            </div>
          </div>
        </QCard>

        <QCard n={5} title={q.q5t}>
          <div className="flex flex-wrap gap-2.5">
            {TIEMPO_IDS.map((id) => {
              const isSel = answers.tiempoRespuesta === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => set("tiempoRespuesta", id)}
                  className={`a-chip ${isSel ? "a-chip-on" : ""}`}
                >
                  {t.tiempos[id]}
                </button>
              );
            })}
          </div>
        </QCard>

        <QCard n={6} title={q.q6t} optional optionalLabel={q.optional}>
          <textarea
            value={answers.notas}
            onChange={(e) => set("notas", e.target.value)}
            rows={3}
            placeholder={q.notasPh}
            className="a-input resize-none"
          />
        </QCard>
      </div>

      {error && (
        <div className="mt-5 flex items-center gap-2 rounded-xl border bd-terra bg-[rgba(154,90,26,0.07)] px-4 py-3 text-sm t-terra">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-4">
        <button onClick={onBack} className="a-btn a-btn-ghost">
          <ArrowLeft className="h-4 w-4" />
          {q.back}
        </button>
        <button onClick={handleNext} className="a-btn a-btn-primary a-btn-lg">
          {q.next}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ============================================================
// STEP 4 — CONTACTO
// ============================================================

function ContactoStep({
  url,
  answers,
  lang,
  onBack,
  onDone,
}: {
  url: string;
  answers: Answers;
  lang: Lang;
  onBack: () => void;
  onDone: (contact: Contact) => void;
}) {
  const t = useT();
  const c = t.contacto;
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [consent, setConsent] = useState(false);
  const [comercial, setComercial] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!nom.trim()) return setError(c.errNombre);
    if (!emailRegex.test(email)) return setError(c.errEmail);
    if (!consent) return setError(c.errConsent);

    setIsSubmitting(true);

    // Lead fire-and-forget: no bloqueja veure l'informe.
    // Enviem el detall COMPLET de l'auditoria (respostes + proposta).
    const detalle = buildAuditoriaDetalle(answers, lang);
    createLandingLead({
      email,
      origen: "landing-atencio-auditoria-contacte",
      nom_contacte: nom.trim(),
      nom_empresa: empresa.trim() || undefined,
      url_web: url || undefined,
      consentiment_rgpd: consent,
      consentiment_comercial: comercial,
      detalle_auditoria: detalle,
    }).catch(() => {});

    // Stopgap: avís per email a hola@empentia.com mentre el portal no recull
    sendAuditoriaEmail({
      estado: "Auditoría completada",
      nombre: nom.trim(),
      email: email.trim(),
      empresa: empresa.trim() || undefined,
      web: url || undefined,
      marketing: comercial,
      detalle,
    }).catch(() => {});

    const data: Contact = {
      nom: nom.trim(),
      email: email.trim(),
      empresa: empresa.trim(),
      consent,
      comercial,
    };
    setTimeout(() => onDone(data), 300);
  };

  return (
    <div className="a-glow min-h-screen">
      <div className="container mx-auto max-w-md px-6 pt-28 pb-16">
        <div className="a-card a-in p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(0,192,136,0.12)]">
              <CheckCircle2 className="h-7 w-7 t-green" />
            </div>
            <span className="kicker">{c.step}</span>
            <h2 className="serif mt-2 text-2xl t-ink">{c.ready}</h2>
            <p className="mt-2 t-soft">{c.where}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <FieldLabel>{c.nombre}</FieldLabel>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder={c.nombrePh}
                className="a-input"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <FieldLabel>{c.email}</FieldLabel>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={c.emailPh}
                className="a-input"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <FieldLabel>
                {c.empresa} <span className="t-mute">{t.cuestionario.optional}</span>
              </FieldLabel>
              <input
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder={c.empresaPh}
                className="a-input"
                disabled={isSubmitting}
              />
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border bd bg-soft p-4 transition-colors hover:border-[var(--ink-mute)]">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-5 w-5"
                disabled={isSubmitting}
              />
              <span className="text-sm t-soft">
                {c.consentPre}
                <a href="/privacy" target="_blank" className="t-green underline">
                  {c.consentLink}
                </a>
                {c.consentPost}
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border bd bg-soft p-4 transition-colors hover:border-[var(--ink-mute)]">
              <input
                type="checkbox"
                checked={comercial}
                onChange={(e) => setComercial(e.target.checked)}
                className="mt-0.5 h-5 w-5"
                disabled={isSubmitting}
              />
              <span className="text-sm t-soft">{c.comercial}</span>
            </label>

            {error && (
              <div className="rounded-xl border bd-terra bg-[rgba(154,90,26,0.07)] p-3 text-sm t-terra">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="a-btn a-btn-primary a-btn-lg w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {c.submitting}
                </>
              ) : (
                <>
                  {c.submit}
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <button
            onClick={onBack}
            className="mt-4 flex w-full items-center justify-center gap-1 text-sm t-mute transition-colors hover:t-ink"
          >
            <ArrowLeft className="h-3 w-3" /> {c.backQ}
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm t-mute">
            <Lock className="h-4 w-4" />
            <span>{c.confidential}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// STEP 5 — INFORME
// ============================================================

function InformeStep({
  answers,
  contact,
  url,
  lang,
}: {
  answers: Answers;
  contact: Contact;
  url: string;
  lang: Lang;
}) {
  const t = useT();
  const r = computeReport(answers);

  const propuesta = buildProposal({
    canales: [...answers.canalesActivos, ...answers.canalesNuevos],
    consultasMes: r.consultasMes,
  });

  const tiempoLabel = t.tiempos[answers.tiempoRespuesta] || "—";
  const canalesActivosLabels = answers.canalesActivos.map(
    (id) => t.canales[id] ?? id
  );
  const canalesNuevosLabels = answers.canalesNuevos.map(
    (id) => t.canales[id] ?? id
  );

  // % de la barra "con empentIA" respecto al coste actual
  const restoPct =
    r.costeMes > 0
      ? Math.max(12, Math.round(((r.costeMes - r.ahorroMes) / r.costeMes) * 100))
      : 100;

  const [accepted, setAccepted] = useState(false);
  const [accepting, setAccepting] = useState(false);

  const handlePreaccept = () => {
    if (accepting || accepted) return;
    setAccepting(true);

    const detalle = buildAuditoriaDetalle(answers, lang);
    createLandingLead({
      email: contact.email,
      origen: "landing-atencio-auditoria-preacord",
      nom_contacte: contact.nom || undefined,
      nom_empresa: contact.empresa || undefined,
      url_web: url || undefined,
      consentiment_rgpd: contact.consent,
      consentiment_comercial: contact.comercial,
      pla: propuesta.tramoDominante ?? undefined,
      detalle_auditoria: detalle,
    }).catch(() => {});

    // Stopgap: avís per email a hola@empentia.com (lead calent)
    sendAuditoriaEmail({
      estado: "PROPUESTA PRE-ACEPTADA",
      nombre: contact.nom || undefined,
      email: contact.email,
      empresa: contact.empresa || undefined,
      web: url || undefined,
      marketing: contact.comercial,
      detalle,
    }).catch(() => {});

    // Mostrem confirmació encara que el lead trigui / falli
    setTimeout(() => {
      setAccepting(false);
      setAccepted(true);
    }, 600);
  };

  const inf = t.informe;

  return (
    <div className="container mx-auto max-w-3xl px-6 pt-24 pb-16">
      {/* Hero */}
      <div className="a-in mb-10 text-center">
        <span className="kicker inline-flex items-center gap-2">
          <TrendingDown className="h-3.5 w-3.5" />
          {inf.kicker}
        </span>
        <h1 className="serif mt-3 text-3xl t-ink md:text-4xl">{inf.h1}</h1>
        <p className="mx-auto mt-3 max-w-xl t-soft">
          {inf.sub(eur(r.consultasMes), String(r.horasSemana))}
        </p>
      </div>

      {/* Coste actual */}
      <div
        className="a-card mb-8 overflow-hidden p-8"
        style={{ borderTop: "3px solid var(--terra)" }}
      >
        <p className="kicker mb-4 text-center" style={{ color: "var(--terra)" }}>
          {inf.costeActual}
        </p>
        <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-2">
          <div>
            <p className="serif text-5xl t-terra">{eur(r.costeMes)}€</p>
            <p className="mt-1 text-sm t-mute">{inf.alMes}</p>
          </div>
          <div className="md:border-l md:bd md:pl-6">
            <p className="serif text-5xl t-terra">{eur(r.costeAnio)}€</p>
            <p className="mt-1 text-sm t-mute">{inf.alAnio}</p>
          </div>
        </div>
        <p className="mt-5 text-center text-sm t-soft">
          {inf.costeFormula(String(r.horasSemana), eur(r.costeHora))}
        </p>
      </div>

      {/* Comparativa */}
      <div className="mb-4">
        <span className="kicker">{inf.comparativa}</span>
        <h2 className="serif mt-2 text-2xl t-ink">{inf.hoyVs}</h2>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Hoy */}
        <div className="a-card p-6">
          <h3 className="serif mb-4 text-lg t-ink">{inf.hoyTitle}</h3>
          <ul className="space-y-3 text-sm t-soft">
            <li className="flex items-start gap-2">
              <Euro className="mt-0.5 h-4 w-4 flex-shrink-0 t-terra" />
              {inf.hoyCoste(eur(r.costeMes))}
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 t-terra" />
              {inf.hoyTiempo(tiempoLabel.toLowerCase())}
            </li>
            <li className="flex items-start gap-2">
              <Users className="mt-0.5 h-4 w-4 flex-shrink-0 t-terra" />
              {inf.hoyCobertura}
            </li>
          </ul>
          <div className="mt-5">
            <div className="a-track">
              <div
                className="h-full w-full rounded-full"
                style={{ background: "rgba(154,90,26,0.55)" }}
              />
            </div>
            <p className="mt-1.5 text-xs t-mute">{inf.coste100}</p>
          </div>
        </div>

        {/* Con empentIA */}
        <div className="a-card border-2 bd-green p-6">
          <h3 className="serif mb-4 text-lg t-green">{inf.conEmpentia}</h3>
          <ul className="space-y-3 text-sm t-soft">
            <li className="flex items-start gap-2">
              <TrendingDown className="mt-0.5 h-4 w-4 flex-shrink-0 t-green" />
              {inf.recuperas(r.horasLiberadas.toFixed(0))}
            </li>
            <li className="flex items-start gap-2">
              <Euro className="mt-0.5 h-4 w-4 flex-shrink-0 t-green" />
              {inf.ahorroHasta(eur(r.ahorroMes))}
            </li>
            <li className="flex items-start gap-2">
              <Zap className="mt-0.5 h-4 w-4 flex-shrink-0 t-green" />
              {inf.respuesta247}
            </li>
          </ul>
          <div className="mt-5">
            <div className="a-track">
              <div className="a-fill" style={{ width: `${restoPct}%` }} />
            </div>
            <p className="mt-1.5 text-xs t-mute">{inf.costeTras}</p>
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-2xl border bd-green bg-[rgba(0,192,136,0.06)] p-6 text-center">
        <p className="text-lg t-ink">{inf.ahorroAnual(eur(r.ahorroAnio))}</p>
        <p className="mt-2 text-sm t-soft">{inf.yEsto}</p>
      </div>

      {/* Propuesta a medida */}
      <PropuestaCard propuesta={propuesta} r={r} />

      {/* Resumen de tu situación */}
      <div className="a-card mb-10 p-6">
        <h3 className="serif mb-4 text-lg t-ink">{t.resumen.title}</h3>
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <ResumenItem
            label={t.resumen.canalesActivos}
            value={canalesActivosLabels.join(", ") || "—"}
          />
          <ResumenItem
            label={t.resumen.canalesAbrir}
            value={canalesNuevosLabels.join(", ") || t.resumen.ninguno}
          />
          <ResumenItem
            label={t.resumen.consultasMes}
            value={t.resumen.aprox(eur(r.consultasMes))}
          />
          <ResumenItem
            label={t.resumen.tipoHab}
            value={answers.tipoPrincipal || "—"}
          />
          <ResumenItem
            label={t.resumen.dedicacion}
            value={t.resumen.hSemana(String(r.horasSemana))}
          />
          <ResumenItem label={t.resumen.tiempoResp} value={tiempoLabel} />
        </div>
        {answers.notas && (
          <p className="mt-4 border-t bd pt-4 text-sm t-soft">
            <span className="t-mute">{t.resumen.notas}</span>
            {answers.notas}
          </p>
        )}
      </div>

      {/* CTA final */}
      {accepted ? (
        <div className="a-cta a-in p-8 text-center md:p-10">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(6,36,26,0.12)]">
            <BadgeCheck className="h-8 w-8" style={{ color: "var(--green-ink)" }} />
          </div>
          <h3 className="serif mb-2 text-3xl" style={{ color: "var(--green-ink)" }}>
            {t.cta.acceptedTitle}
          </h3>
          <p
            className="mx-auto mb-6 max-w-md"
            style={{ color: "rgba(6,36,26,0.8)" }}
          >
            {t.cta.acceptedText(contact.nom)}
          </p>
          <div className="no-print flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="a-btn a-btn-on-grad a-btn-lg"
            >
              <Calendar className="h-5 w-5" />
              {t.cta.reservarKickoff}
            </a>
            <button
              onClick={() => window.print()}
              className="a-btn a-btn-lg"
              style={{
                background: "transparent",
                color: "var(--green-ink)",
                borderColor: "rgba(6,36,26,0.35)",
              }}
            >
              <Download className="h-5 w-5" />
              {t.cta.descargar}
            </button>
          </div>
        </div>
      ) : (
        <div className="a-cta p-8 text-center md:p-10">
          <h3 className="serif mb-3 text-3xl" style={{ color: "var(--green-ink)" }}>
            {t.cta.empezarTitle}
          </h3>
          <p
            className="mx-auto mb-6 max-w-md"
            style={{ color: "rgba(6,36,26,0.8)" }}
          >
            {t.cta.empezarText}
          </p>
          <div className="no-print flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              className="a-btn a-btn-on-grad a-btn-lg"
              onClick={handlePreaccept}
              disabled={accepting}
            >
              {accepting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {t.cta.guardando}
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  {t.cta.aceptar}
                </>
              )}
            </button>
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="a-btn a-btn-lg"
              style={{
                background: "transparent",
                color: "var(--green-ink)",
                borderColor: "rgba(6,36,26,0.35)",
              }}
            >
              <Calendar className="h-5 w-5" />
              {t.cta.hablar}
            </a>
          </div>
          <button
            onClick={() => window.print()}
            className="no-print mx-auto mt-5 flex items-center gap-1.5 text-sm"
            style={{ color: "rgba(6,36,26,0.7)" }}
          >
            <Download className="h-4 w-4" />
            {t.cta.descargarPdf}
          </button>
        </div>
      )}
    </div>
  );
}

// Iconos de marca: línea (stroke = color del servicio) con nodos verdes,
// heredados del símbolo empentIA. Stroke 1.8, esquinas redondeadas.
function BrandIcon({
  name,
  color,
  className,
}: {
  name: BrandIconName;
  color?: string;
  className?: string;
}) {
  const node = "#00C088";
  const inner: Record<BrandIconName, React.ReactNode> = {
    chat: (
      <>
        <path d="M4 7.5A3.5 3.5 0 0 1 7.5 4h9A3.5 3.5 0 0 1 20 7.5v5A3.5 3.5 0 0 1 16.5 16H10l-4.5 3.2V16H7.5A3.5 3.5 0 0 1 4 12.5z" />
        <circle cx="9" cy="10" r="1" fill={node} stroke="none" />
        <circle cx="12" cy="10" r="1" fill={node} stroke="none" />
        <circle cx="15" cy="10" r="1" fill={node} stroke="none" />
      </>
    ),
    email: (
      <>
        <path d="M3 7A2.5 2.5 0 0 1 5.5 4.5h13A2.5 2.5 0 0 1 21 7v10a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17z" />
        <path d="M4 7.5l8 5.5 8-5.5" />
        <circle cx="12" cy="13.2" r="1.1" fill={node} stroke="none" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M12 3.6a8.4 8.4 0 0 0-7.2 12.8L3.6 20.4l4.4-1.1A8.4 8.4 0 1 0 12 3.6z" />
        <circle cx="9" cy="12" r="1" fill={node} stroke="none" />
        <circle cx="12" cy="12" r="1" fill={node} stroke="none" />
        <circle cx="15" cy="12" r="1" fill={node} stroke="none" />
      </>
    ),
    voz: (
      <>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0" />
        <path d="M12 18v3M9 21h6" />
        <circle cx="12" cy="8" r="1" fill={node} stroke="none" />
      </>
    ),
    star: (
      <>
        <path d="M12 3.6l2.5 5.1 5.6.8-4.05 3.95.96 5.6L12 16.4l-5.01 2.65.96-5.6L3.9 9.5l5.6-.8z" />
        <circle cx="12" cy="11.6" r="1" fill={node} stroke="none" />
      </>
    ),
    red: (
      <>
        <path d="M7 7 L17 12 M7 17 L17 12" />
        <circle cx="6" cy="6" r="2.2" fill={node} stroke="none" />
        <circle cx="6" cy="18" r="2.2" fill={node} stroke="none" />
        <circle cx="18" cy="12" r="2.2" fill={node} stroke="none" />
      </>
    ),
    formulario: (
      <>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v4h4" />
        <path d="M9.5 12h5M9.5 15.5h5" />
        <circle cx="10" cy="8.5" r="1" fill={node} stroke="none" />
      </>
    ),
    store: (
      <>
        <path d="M4 4h16l1 5H3z" />
        <path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
        <path d="M9.5 20v-5h5v5" />
        <circle cx="12" cy="6.5" r="1" fill={node} stroke="none" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M8.5 12.2l2.3 2.3 4.7-4.9" />
      </>
    ),
    bolt: <path d="M13 3 L6 13 h5 l-1 8 L18 10 h-5 z" />,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={color ? { color } : undefined}
      aria-hidden="true"
    >
      {inner[name]}
    </svg>
  );
}

function PropuestaCard({ propuesta, r }: { propuesta: Propuesta; r: Report }) {
  const t = useT();
  const p = t.propuesta;

  // Cap fallback: cliente sin ningún canal con producto (p. ej. solo presencial)
  if (propuesta.sinCanalesVendibles) {
    return (
      <div className="a-card mb-8 border-2 bd-green p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(0,192,136,0.12)]">
          <Sparkles className="h-7 w-7 t-green" />
        </div>
        <h3 className="serif mb-2 text-xl t-ink">{p.fallbackTitle}</h3>
        <p className="mx-auto max-w-md text-sm t-soft">{p.fallbackText}</p>
      </div>
    );
  }

  const inversionMes = propuesta.cuotaMensual;
  const ahorroNeto = r.ahorroMes - inversionMes;
  const meses =
    ahorroNeto > 0 && propuesta.setupTotal > 0
      ? Math.ceil(propuesta.setupTotal / ahorroNeto)
      : null;

  const estadoLabel = (estado: string) =>
    estado === "nuevo" ? p.nuevo : p.pronto;

  return (
    <div className="a-card mb-8 border-2 bd-green p-6 md:p-8">
      <div className="mb-1 flex items-center gap-2.5">
        <Receipt className="h-5 w-5 t-green" />
        <span className="kicker">{p.kicker}</span>
      </div>
      <h2 className="serif mb-1 text-2xl t-ink">{p.h2}</h2>
      <p className="mb-6 text-sm t-mute">{p.sub}</p>

      {/* Líneas por canal */}
      <div className="space-y-3">
        {propuesta.lineas.map((l) => {
          const svc = SERVICE[l.channelId];
          const accent = svc?.color ?? "#009a6e";
          const nombre = t.serviceName[l.channelId] ?? l.label;
          const canal = t.canales[l.channelId] ?? l.label;
          const unidad = t.unidad[l.unidad] ?? l.unidad;
          return (
            <div
              key={l.channelId}
              className="flex items-stretch overflow-hidden rounded-xl border bd bg-soft"
            >
              <span
                className="w-1 flex-shrink-0"
                style={{ background: accent }}
                aria-hidden="true"
              />
              <div className="flex flex-1 items-start justify-between gap-3 p-4">
                <div className="flex items-start gap-3">
                  <div
                    className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${accent}1f` }}
                  >
                    <BrandIcon
                      name={svc?.icon ?? "bolt"}
                      color={accent}
                      className="h-5 w-5"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold t-ink">{nombre}</span>
                      <span className="a-tag a-tag-green">
                        {l.esPersonalizado ? p.personalizado : l.tier.label}
                      </span>
                      {l.estado !== "publicado" && (
                        <span className="a-tag a-tag-line">
                          {estadoLabel(l.estado)}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs t-mute">
                      {l.esPersonalizado
                        ? p.lineaPerso(canal)
                        : p.lineaVol(canal, eur(l.volumenEstimado), unidad)}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  {l.esPersonalizado ? (
                    <p className="font-bold t-ink">{p.aMedida}</p>
                  ) : (
                    <p className="font-bold t-ink">
                      {eur(l.precioMes)}€
                      <span className="text-sm font-normal t-mute">/mes</span>
                    </p>
                  )}
                  <p className="mt-0.5 text-xs t-mute">
                    {l.esPersonalizado ? p.setupMedida : p.setup(eur(l.setup))}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add-ons */}
        {propuesta.addons.map((a) => {
          const svc = SERVICE.formulario;
          return (
            <div
              key={a.label}
              className="flex items-stretch overflow-hidden rounded-xl border bd bg-soft"
            >
              <span
                className="w-1 flex-shrink-0"
                style={{ background: svc.color }}
                aria-hidden="true"
              />
              <div className="flex flex-1 items-start justify-between gap-3 p-4">
                <div className="flex items-start gap-3">
                  <div
                    className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${svc.color}1f` }}
                  >
                    <BrandIcon name={svc.icon} color={svc.color} className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-semibold t-ink">
                      {t.serviceName.formulario}
                    </span>
                    <p className="mt-1 text-xs t-mute">{p.complemento}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="font-bold t-ink">
                    {eur(a.precioMes)}€
                    <span className="text-sm font-normal t-mute">/mes</span>
                  </p>
                  <p className="mt-0.5 text-xs t-mute">{p.sinSetup}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Totales */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl border bd bg-soft p-4">
          <div className="flex items-center gap-2 text-sm t-soft">
            <Receipt className="h-4 w-4" />
            {p.setupTitle}
          </div>
          <p className="serif mt-1 text-3xl t-ink">
            {eur(propuesta.setupTotal)}€
            {propuesta.hayPersonalizado && (
              <span className="text-sm t-mute">{p.masMedida}</span>
            )}
          </p>
          <p className="mt-0.5 text-xs t-mute">
            {p.canalesConfig(propuesta.numCanales)}
          </p>
        </div>
        <div className="rounded-xl border-2 bd-green bg-[rgba(0,192,136,0.08)] p-4">
          <div className="flex items-center gap-2 text-sm t-green">
            <Wallet className="h-4 w-4" />
            {p.cuota}
          </div>
          <p className="serif mt-1 text-3xl t-green">
            {eur(propuesta.cuotaMensual)}€
            <span className="text-sm font-normal">/mes</span>
            {propuesta.hayPersonalizado && (
              <span className="text-sm t-mute">{p.masMedida}</span>
            )}
          </p>
          <p className="mt-0.5 text-xs t-mute">{p.sinPermanencia}</p>
        </div>
      </div>

      {/* ROI */}
      {ahorroNeto > 0 && (
        <div className="mt-4 flex items-start gap-3 rounded-xl border bd-green bg-[rgba(0,192,136,0.06)] p-4">
          <TrendingDown className="mt-0.5 h-5 w-5 flex-shrink-0 t-green" />
          <p className="text-sm t-soft">
            {p.roi(
              eur(r.ahorroMes),
              eur(propuesta.cuotaMensual),
              eur(ahorroNeto)
            )}
            {meses !== null && p.roiAmort(meses)}
          </p>
        </div>
      )}

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs t-mute">
        <Clock3 className="h-3.5 w-3.5" />
        {p.footnote}
      </p>
    </div>
  );
}

function ResumenItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bd bg-soft p-3">
      <p className="kicker" style={{ color: "var(--ink-mute)" }}>
        {label}
      </p>
      <p className="mt-1 t-ink">{value}</p>
    </div>
  );
}
