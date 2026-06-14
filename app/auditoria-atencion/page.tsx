"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Globe,
  Loader2,
  Phone,
  Mail,
  MessageCircle,
  MessageSquare,
  Star,
  Users,
  Store,
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
import { scrapeCompany, createLandingLead } from "@/lib/api";
import { buildProposal, type Propuesta } from "@/lib/pricing";

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
}

const EMPTY_CONTACT: Contact = { nom: "", email: "", empresa: "", consent: false };

interface Canal {
  id: string;
  label: string;
  icon: typeof Phone;
}

const CANALES: Canal[] = [
  { id: "telefono", label: "Teléfono", icon: Phone },
  { id: "email", label: "Email", icon: Mail },
  { id: "formulario", label: "Formulario web", icon: MessageSquare },
  { id: "webchat", label: "Chat / Webchat", icon: MessageCircle },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "redes", label: "Redes sociales (DMs)", icon: Users },
  { id: "resenas", label: "Reseñas (Google)", icon: Star },
  { id: "presencial", label: "Presencial / tienda", icon: Store },
];

const CANAL_ICON: Record<string, typeof Phone> = Object.fromEntries(
  CANALES.map((c) => [c.id, c.icon])
);

// Color de marca por servicio (acentos del manual) para las líneas de propuesta.
const CANAL_ACCENT: Record<string, string> = {
  webchat: "#009a6e",
  whatsapp: "#1f7a3e",
  email: "#3a5a6f",
  telefono: "#8a6a1a",
  resenas: "#4a6a5a",
  redes: "#4a3a6f",
  formulario: "#1e3a5f",
};

const TIPOS_CONSULTA = [
  "Dudas sobre productos o servicios",
  "Pedidos, envíos y seguimiento",
  "Incidencias y postventa",
  "Citas y reservas",
  "Información general",
  "Otros",
];

const TIEMPOS_RESPUESTA = [
  { id: "menos_1h", label: "Menos de 1 hora" },
  { id: "pocas_horas", label: "Pocas horas" },
  { id: "mismo_dia", label: "El mismo día" },
  { id: "1_2_dias", label: "1-2 días" },
  { id: "mas_2_dias", label: "Más de 2 días" },
];

const ANALYZING_STEPS = [
  { icon: Globe, message: "Analizando tu web..." },
  { icon: Headphones, message: "Detectando canales de atención..." },
  { icon: Zap, message: "Estimando volumen de consultas..." },
  { icon: CheckCircle2, message: "Preparando tus preguntas..." },
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

// ============================================================
// SHARED UI
// ============================================================

function Header({ step }: { step: StepId }) {
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
          <span className="kicker hidden sm:inline">
            Auditoría · atención al cliente
          </span>
        ) : (
          <Stepper active={active} />
        )}
      </nav>
    </header>
  );
}

function Stepper({ active }: { active: number }) {
  const steps = ["Preguntas", "Tus datos", "Propuesta"];
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
    <>
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
          onBack={() => setStep("cuestionario")}
          onDone={(c) => {
            setContact(c);
            setStep("informe");
          }}
        />
      )}

      {step === "informe" && (
        <InformeStep answers={answers} contact={contact} url={url} />
      )}
    </>
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
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = normalizeUrl(url);
    if (!v || !/\.[a-z]{2,}/i.test(v)) {
      setError("Introduce una web válida (ej: tuempresa.com)");
      return;
    }
    setUrl(v);
    onStart();
  };

  return (
    <div className="a-glow">
      <div className="container mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 pt-24 pb-16">
        <div className="a-in flex flex-col items-center">
          <span className="kicker mb-5 inline-flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" />
            Auditoría gratuita · 2 min
          </span>

          <h1 className="serif mb-5 text-center text-4xl leading-[1.05] t-ink md:text-5xl">
            ¿Cuánto te cuesta tu <em>atención al cliente</em>?
          </h1>
          <p className="mb-9 max-w-xl text-center text-lg leading-relaxed t-soft">
            Responde unas preguntas y te calculamos, con tus propios números, lo
            que dedicas hoy y lo que podrías ahorrar. Te llevas una propuesta
            clara.
          </p>
        </div>

        <div className="a-card a-in w-full p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium t-soft">
              Tu página web
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
                  placeholder="tuempresa.com"
                  className="a-input pl-12"
                />
              </div>
              <button type="submit" className="a-btn a-btn-primary a-btn-lg">
                Empezar
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
          {[
            { icon: CheckCircle2, t: "Con tus propios números" },
            { icon: Lock, t: "Sin compromiso" },
            { icon: Zap, t: "Propuesta al instante" },
          ].map((f) => (
            <span
              key={f.t}
              className="inline-flex items-center gap-2 text-sm t-mute"
            >
              <f.icon className="h-4 w-4 t-green" />
              {f.t}
            </span>
          ))}
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
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const progressInterval = setInterval(() => {
      setProgress((p) => (p >= 95 ? p : p + 0.8));
    }, 200);

    const stepInterval = setInterval(() => {
      setCurrentStep((s) => (s < ANALYZING_STEPS.length - 1 ? s + 1 : s));
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

  const CurrentIcon = ANALYZING_STEPS[currentStep].icon;

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
            {ANALYZING_STEPS[currentStep].message}
          </h2>
          <p className="mb-8 t-soft">
            Estamos analizando{" "}
            <strong className="mono text-[13px] t-ink">{url}</strong>
          </p>

          <div className="a-track mb-2">
            <div className="a-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="mono text-sm t-mute">{Math.round(progress)}% completado</p>

          <div className="mt-8 flex items-center justify-center gap-2">
            {ANALYZING_STEPS.map((_, i) => (
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
  options,
  selected,
  onToggle,
}: {
  options: Canal[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => {
        const isSel = selected.includes(opt.id);
        const Icon = opt.icon;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onToggle(opt.id)}
            className={`a-chip ${isSel ? "a-chip-on" : ""}`}
          >
            {isSel ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <Icon className="h-4 w-4" />
            )}
            {opt.label}
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
  children,
}: {
  n: number;
  title: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="a-card p-6">
      <div className="mb-1 flex items-baseline gap-2.5">
        <span className="kicker">{String(n).padStart(2, "0")}</span>
        <h2 className="serif text-lg t-ink">
          {title}
          {optional && (
            <span className="ml-2 text-sm not-italic t-mute">(opcional)</span>
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
    if (answers.canalesActivos.length === 0)
      return setError("Selecciona al menos un canal de atención activo");
    if (!answers.consultasSemana || parseFloat(answers.consultasSemana) <= 0)
      return setError("Indica cuántas consultas recibís a la semana");
    if (!answers.tipoPrincipal)
      return setError("Selecciona el tipo de consulta más habitual");
    if (!answers.horasSemana || parseFloat(answers.horasSemana) <= 0)
      return setError("Indica cuántas horas dedicáis a la semana");
    if (!answers.costeHora || parseFloat(answers.costeHora) <= 0)
      return setError("Indica el coste por hora del personal");
    if (!answers.tiempoRespuesta)
      return setError("Selecciona vuestro tiempo de respuesta actual");
    onNext();
  };

  const nuevosDisponibles = CANALES.filter(
    (c) => !answers.canalesActivos.includes(c.id)
  );

  return (
    <div className="container mx-auto max-w-2xl px-6 pt-24 pb-12">
      <div className="a-in mb-8">
        <span className="kicker">Paso 1 de 3</span>
        <h1 className="serif mt-2 text-3xl t-ink">
          Cuéntanos cómo gestionáis la atención
        </h1>
        <p className="mt-2 t-soft">
          Con tus respuestas calculamos el coste real y el ahorro potencial.
        </p>
      </div>

      <div className="space-y-5">
        <QCard
          n={1}
          title="¿Por qué canales atendéis hoy?"
          hint="Marca todos los que uséis actualmente."
        >
          <ChipGroup
            options={CANALES}
            selected={answers.canalesActivos}
            onToggle={(id) => toggle("canalesActivos", id)}
          />
        </QCard>

        <QCard
          n={2}
          title="¿Pensáis abrir algún canal nuevo?"
          optional
          hint="Canales que aún no usáis pero os gustaría ofrecer."
        >
          {nuevosDisponibles.length > 0 ? (
            <ChipGroup
              options={nuevosDisponibles}
              selected={answers.canalesNuevos}
              onToggle={(id) => toggle("canalesNuevos", id)}
            />
          ) : (
            <p className="text-sm t-mute">Ya tenéis todos los canales activos 👌</p>
          )}
        </QCard>

        <QCard n={3} title="Volumen de consultas">
          <div className="space-y-4">
            <div>
              <FieldLabel>
                ¿Cuántas consultas recibís a la semana? (aprox.)
              </FieldLabel>
              <input
                type="number"
                min={0}
                value={answers.consultasSemana}
                onChange={(e) => set("consultasSemana", e.target.value)}
                placeholder="Ej: 80"
                className="a-input"
              />
            </div>
            <div>
              <FieldLabel>¿Cuál es el tipo de consulta más habitual?</FieldLabel>
              <select
                value={answers.tipoPrincipal}
                onChange={(e) => set("tipoPrincipal", e.target.value)}
                className="a-input"
              >
                <option value="">Selecciona una opción</option>
                {TIPOS_CONSULTA.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </QCard>

        <QCard n={4} title="Tiempo y coste del equipo">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Horas/semana dedicadas a atención</FieldLabel>
              <input
                type="number"
                min={0}
                value={answers.horasSemana}
                onChange={(e) => set("horasSemana", e.target.value)}
                placeholder="Ej: 15"
                className="a-input"
              />
            </div>
            <div>
              <FieldLabel>Coste por hora del personal (€)</FieldLabel>
              <input
                type="number"
                min={0}
                value={answers.costeHora}
                onChange={(e) => set("costeHora", e.target.value)}
                placeholder="22"
                className="a-input"
              />
              <p className="mt-1.5 text-xs t-mute">
                Ajústalo a tu realidad. Por defecto, 22 €/h.
              </p>
            </div>
          </div>
        </QCard>

        <QCard n={5} title="¿Cuánto tardáis en responder de media?">
          <div className="flex flex-wrap gap-2.5">
            {TIEMPOS_RESPUESTA.map((t) => {
              const isSel = answers.tiempoRespuesta === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => set("tiempoRespuesta", t.id)}
                  className={`a-chip ${isSel ? "a-chip-on" : ""}`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </QCard>

        <QCard n={6} title="¿Algo más que deberíamos saber?" optional>
          <textarea
            value={answers.notas}
            onChange={(e) => set("notas", e.target.value)}
            rows={3}
            placeholder="Picos de temporada, idiomas, herramientas que usáis..."
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
          Atrás
        </button>
        <button onClick={handleNext} className="a-btn a-btn-primary a-btn-lg">
          Ver mi informe
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
  onBack,
  onDone,
}: {
  url: string;
  onBack: () => void;
  onDone: (contact: Contact) => void;
}) {
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
    if (!nom.trim()) return setError("Introduce tu nombre");
    if (!emailRegex.test(email)) return setError("Introduce un email válido");
    if (!consent)
      return setError("Debes aceptar la política de privacidad para continuar");

    setIsSubmitting(true);

    // Lead fire-and-forget: no bloqueja veure l'informe
    createLandingLead({
      email,
      origen: "landing-atencio-auditoria-contacte",
      nom_contacte: nom.trim(),
      nom_empresa: empresa.trim() || undefined,
      url_web: url || undefined,
      consentiment_rgpd: consent,
    }).catch(() => {});

    const c: Contact = {
      nom: nom.trim(),
      email: email.trim(),
      empresa: empresa.trim(),
      consent,
    };
    setTimeout(() => onDone(c), 300);
  };

  return (
    <div className="a-glow min-h-screen">
      <div className="container mx-auto max-w-md px-6 pt-28 pb-16">
        <div className="a-card a-in p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(0,192,136,0.12)]">
              <CheckCircle2 className="h-7 w-7 t-green" />
            </div>
            <span className="kicker">Paso 2 de 3</span>
            <h2 className="serif mt-2 text-2xl t-ink">Tu informe está listo</h2>
            <p className="mt-2 t-soft">¿A dónde te enviamos la propuesta?</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <FieldLabel>Nombre *</FieldLabel>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Tu nombre"
                className="a-input"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <FieldLabel>Email *</FieldLabel>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@empresa.com"
                className="a-input"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <FieldLabel>
                Empresa <span className="t-mute">(opcional)</span>
              </FieldLabel>
              <input
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="Nombre de tu empresa"
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
                Acepto la{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  className="t-green underline"
                >
                  política de privacidad
                </a>{" "}
                *
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
              <span className="text-sm t-soft">
                Quiero recibir información sobre novedades y ofertas
              </span>
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
                  Preparando...
                </>
              ) : (
                <>
                  Ver mi informe
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <button
            onClick={onBack}
            className="mt-4 flex w-full items-center justify-center gap-1 text-sm t-mute transition-colors hover:t-ink"
          >
            <ArrowLeft className="h-3 w-3" /> Volver a las preguntas
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm t-mute">
            <Lock className="h-4 w-4" />
            <span>100% confidencial</span>
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
}: {
  answers: Answers;
  contact: Contact;
  url: string;
}) {
  const r = computeReport(answers);

  const propuesta = buildProposal({
    canales: [...answers.canalesActivos, ...answers.canalesNuevos],
    consultasMes: r.consultasMes,
  });

  const tiempoLabel =
    TIEMPOS_RESPUESTA.find((t) => t.id === answers.tiempoRespuesta)?.label ||
    "—";
  const canalesActivosLabels = CANALES.filter((c) =>
    answers.canalesActivos.includes(c.id)
  ).map((c) => c.label);
  const canalesNuevosLabels = CANALES.filter((c) =>
    answers.canalesNuevos.includes(c.id)
  ).map((c) => c.label);

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

    createLandingLead({
      email: contact.email,
      origen: "landing-atencio-auditoria-preacord",
      nom_contacte: contact.nom || undefined,
      nom_empresa: contact.empresa || undefined,
      url_web: url || undefined,
      consentiment_rgpd: contact.consent,
      pla: propuesta.tramoDominante ?? undefined,
    }).catch(() => {});

    // Mostrem confirmació encara que el lead trigui / falli
    setTimeout(() => {
      setAccepting(false);
      setAccepted(true);
    }, 600);
  };

  return (
    <div className="container mx-auto max-w-3xl px-6 pt-24 pb-16">
      {/* Hero */}
      <div className="a-in mb-10 text-center">
        <span className="kicker inline-flex items-center gap-2">
          <TrendingDown className="h-3.5 w-3.5" />
          Tu informe
        </span>
        <h1 className="serif mt-3 text-3xl t-ink md:text-4xl">
          Esto te cuesta tu atención al cliente
        </h1>
        <p className="mx-auto mt-3 max-w-xl t-soft">
          Calculado con tus propios datos: {eur(r.consultasMes)} consultas/mes y{" "}
          {r.horasSemana} h/semana de equipo.
        </p>
      </div>

      {/* Coste actual */}
      <div
        className="a-card mb-8 overflow-hidden p-8"
        style={{ borderTop: "3px solid var(--terra)" }}
      >
        <p className="kicker mb-4 text-center" style={{ color: "var(--terra)" }}>
          Coste actual de gestión
        </p>
        <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-2">
          <div>
            <p className="serif text-5xl t-terra">{eur(r.costeMes)}€</p>
            <p className="mt-1 text-sm t-mute">al mes</p>
          </div>
          <div className="md:border-l md:bd md:pl-6">
            <p className="serif text-5xl t-terra">{eur(r.costeAnio)}€</p>
            <p className="mt-1 text-sm t-mute">al año</p>
          </div>
        </div>
        <p className="mt-5 text-center text-sm t-soft">
          {r.horasSemana} h/semana × {eur(r.costeHora)} €/h, hoy 100% manual.
        </p>
      </div>

      {/* Comparativa */}
      <div className="mb-4">
        <span className="kicker">Comparativa</span>
        <h2 className="serif mt-2 text-2xl t-ink">Hoy vs con empentIA</h2>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Hoy */}
        <div className="a-card p-6">
          <h3 className="serif mb-4 text-lg t-ink">Hoy (gestión interna)</h3>
          <ul className="space-y-3 text-sm t-soft">
            <li className="flex items-start gap-2">
              <Euro className="mt-0.5 h-4 w-4 flex-shrink-0 t-terra" />
              {eur(r.costeMes)}€/mes en horas de tu equipo
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 t-terra" />
              Tiempo de respuesta: {tiempoLabel.toLowerCase()}
            </li>
            <li className="flex items-start gap-2">
              <Users className="mt-0.5 h-4 w-4 flex-shrink-0 t-terra" />
              Cobertura limitada al horario del equipo
            </li>
          </ul>
          <div className="mt-5">
            <div className="a-track">
              <div
                className="h-full w-full rounded-full"
                style={{ background: "rgba(154,90,26,0.55)" }}
              />
            </div>
            <p className="mt-1.5 text-xs t-mute">Coste 100%</p>
          </div>
        </div>

        {/* Con empentIA */}
        <div className="a-card border-2 bd-green p-6">
          <h3 className="serif mb-4 text-lg t-green">Con empentIA</h3>
          <ul className="space-y-3 text-sm t-soft">
            <li className="flex items-start gap-2">
              <TrendingDown className="mt-0.5 h-4 w-4 flex-shrink-0 t-green" />
              Recuperas hasta {r.horasLiberadas.toFixed(0)} h/semana
            </li>
            <li className="flex items-start gap-2">
              <Euro className="mt-0.5 h-4 w-4 flex-shrink-0 t-green" />
              Ahorro de hasta {eur(r.ahorroMes)}€/mes
            </li>
            <li className="flex items-start gap-2">
              <Zap className="mt-0.5 h-4 w-4 flex-shrink-0 t-green" />
              Respuesta inmediata, 24/7, en todos los canales
            </li>
          </ul>
          <div className="mt-5">
            <div className="a-track">
              <div className="a-fill" style={{ width: `${restoPct}%` }} />
            </div>
            <p className="mt-1.5 text-xs t-mute">Coste estimado tras automatizar</p>
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-2xl border bd-green bg-[rgba(0,192,136,0.06)] p-6 text-center">
        <p className="text-lg t-ink">
          Ahorro potencial estimado:{" "}
          <strong className="serif t-green">{eur(r.ahorroAnio)}€/año</strong>
        </p>
        <p className="mt-2 text-sm t-soft">
          Y esto es lo que costaría automatizarlo en tu caso 👇
        </p>
      </div>

      {/* Propuesta a medida */}
      <PropuestaCard propuesta={propuesta} r={r} />

      {/* Resumen de tu situación */}
      <div className="a-card mb-10 p-6">
        <h3 className="serif mb-4 text-lg t-ink">
          Resumen de lo que nos has contado
        </h3>
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <ResumenItem
            label="Canales activos"
            value={canalesActivosLabels.join(", ") || "—"}
          />
          <ResumenItem
            label="Canales a abrir"
            value={canalesNuevosLabels.join(", ") || "Ninguno indicado"}
          />
          <ResumenItem
            label="Consultas / mes"
            value={`${eur(r.consultasMes)} aprox.`}
          />
          <ResumenItem
            label="Tipo más habitual"
            value={answers.tipoPrincipal || "—"}
          />
          <ResumenItem label="Dedicación" value={`${r.horasSemana} h/semana`} />
          <ResumenItem label="Tiempo de respuesta" value={tiempoLabel} />
        </div>
        {answers.notas && (
          <p className="mt-4 border-t bd pt-4 text-sm t-soft">
            <span className="t-mute">Notas: </span>
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
            ¡Propuesta pre-aceptada! 🎉
          </h3>
          <p
            className="mx-auto mb-6 max-w-md"
            style={{ color: "rgba(6,36,26,0.8)" }}
          >
            Hemos guardado tu propuesta{contact.nom ? `, ${contact.nom}` : ""}.
            Reserva ahora el kickoff y la dejamos cerrada en 20 minutos. Sin pago
            ni permanencia hasta confirmarla juntos.
          </p>
          <div className="no-print flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="a-btn a-btn-on-grad a-btn-lg"
            >
              <Calendar className="h-5 w-5" />
              Reservar kickoff
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
              Descargar propuesta
            </button>
          </div>
        </div>
      ) : (
        <div className="a-cta p-8 text-center md:p-10">
          <h3 className="serif mb-3 text-3xl" style={{ color: "var(--green-ink)" }}>
            ¿Empezamos?
          </h3>
          <p
            className="mx-auto mb-6 max-w-md"
            style={{ color: "rgba(6,36,26,0.8)" }}
          >
            Acepta la propuesta y reservamos el kickoff para ponerla en marcha.
            Queda pre-acordada: sin pago ni permanencia, lo confirmamos todo
            juntos en la reunión.
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
                  Guardando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Aceptar propuesta y reservar
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
              Hablarlo primero
            </a>
          </div>
          <button
            onClick={() => window.print()}
            className="no-print mx-auto mt-5 flex items-center gap-1.5 text-sm"
            style={{ color: "rgba(6,36,26,0.7)" }}
          >
            <Download className="h-4 w-4" />
            Descargar propuesta en PDF
          </button>
        </div>
      )}
    </div>
  );
}

function PropuestaCard({ propuesta, r }: { propuesta: Propuesta; r: Report }) {
  // Cap fallback: cliente sin ningún canal con producto (p. ej. solo presencial)
  if (propuesta.sinCanalesVendibles) {
    return (
      <div className="a-card mb-8 border-2 bd-green p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(0,192,136,0.12)]">
          <Sparkles className="h-7 w-7 t-green" />
        </div>
        <h3 className="serif mb-2 text-xl t-ink">
          Te preparamos una propuesta a medida
        </h3>
        <p className="mx-auto max-w-md text-sm t-soft">
          Por tus canales, lo mejor es diseñarla contigo en una llamada corta. En
          el kickoff te damos números cerrados.
        </p>
      </div>
    );
  }

  const inversionMes = propuesta.cuotaMensual;
  const ahorroNeto = r.ahorroMes - inversionMes;
  const meses =
    ahorroNeto > 0 && propuesta.setupTotal > 0
      ? Math.ceil(propuesta.setupTotal / ahorroNeto)
      : null;

  return (
    <div className="a-card mb-8 border-2 bd-green p-6 md:p-8">
      <div className="mb-1 flex items-center gap-2.5">
        <Receipt className="h-5 w-5 t-green" />
        <span className="kicker">Tu propuesta</span>
      </div>
      <h2 className="serif mb-1 text-2xl t-ink">Plan recomendado</h2>
      <p className="mb-6 text-sm t-mute">
        Según tus canales y tu volumen estimado. Precios sin IVA.
      </p>

      {/* Líneas por canal */}
      <div className="space-y-3">
        {propuesta.lineas.map((l) => {
          const Icon = CANAL_ICON[l.channelId] ?? Sparkles;
          const accent = CANAL_ACCENT[l.channelId] ?? "#009a6e";
          return (
            <div
              key={l.channelId}
              className="flex items-start justify-between gap-3 rounded-xl border bd bg-soft p-4"
            >
              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `${accent}18`, color: accent }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold t-ink">{l.label}</span>
                    <span className="a-tag a-tag-green">
                      {l.esPersonalizado ? "Personalizado" : l.tier.label}
                    </span>
                    {l.estado !== "publicado" && (
                      <span className="a-tag a-tag-line">
                        {l.estado === "nuevo" ? "Nuevo" : "Disponible pronto"}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs t-mute">
                    {l.esPersonalizado
                      ? `Por encima del tramo estándar · lo dimensionamos contigo`
                      : `~${eur(l.volumenEstimado)} ${l.unidad}/mes incluidas`}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                {l.esPersonalizado ? (
                  <p className="font-bold t-ink">A medida</p>
                ) : (
                  <p className="font-bold t-ink">
                    {eur(l.precioMes)}€
                    <span className="text-sm font-normal t-mute">/mes</span>
                  </p>
                )}
                <p className="mt-0.5 text-xs t-mute">
                  {l.esPersonalizado ? "Setup a medida" : `Setup ${eur(l.setup)}€`}
                </p>
              </div>
            </div>
          );
        })}

        {/* Add-ons */}
        {propuesta.addons.map((a) => (
          <div
            key={a.label}
            className="flex items-start justify-between gap-3 rounded-xl border bd bg-soft p-4"
          >
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                style={{ background: "rgba(0,192,136,0.12)", color: "#009a6e" }}
              >
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <span className="font-semibold t-ink">{a.label}</span>
                <p className="mt-1 text-xs t-mute">Complemento</p>
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="font-bold t-ink">
                {eur(a.precioMes)}€
                <span className="text-sm font-normal t-mute">/mes</span>
              </p>
              <p className="mt-0.5 text-xs t-mute">Sin setup</p>
            </div>
          </div>
        ))}
      </div>

      {/* Totales */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl border bd bg-soft p-4">
          <div className="flex items-center gap-2 text-sm t-soft">
            <Receipt className="h-4 w-4" />
            Setup (pago único)
          </div>
          <p className="serif mt-1 text-3xl t-ink">
            {eur(propuesta.setupTotal)}€
            {propuesta.hayPersonalizado && (
              <span className="text-sm t-mute"> + a medida</span>
            )}
          </p>
          <p className="mt-0.5 text-xs t-mute">
            {propuesta.numCanales} canal
            {propuesta.numCanales === 1 ? "" : "es"} a configurar
          </p>
        </div>
        <div className="rounded-xl border-2 bd-green bg-[rgba(0,192,136,0.08)] p-4">
          <div className="flex items-center gap-2 text-sm t-green">
            <Wallet className="h-4 w-4" />
            Cuota mensual
          </div>
          <p className="serif mt-1 text-3xl t-green">
            {eur(propuesta.cuotaMensual)}€
            <span className="text-sm font-normal">/mes</span>
            {propuesta.hayPersonalizado && (
              <span className="text-sm t-mute"> + a medida</span>
            )}
          </p>
          <p className="mt-0.5 text-xs t-mute">
            Sin permanencia · cancelas cuando quieras
          </p>
        </div>
      </div>

      {/* ROI */}
      {ahorroNeto > 0 && (
        <div className="mt-4 flex items-start gap-3 rounded-xl border bd-green bg-[rgba(0,192,136,0.06)] p-4">
          <TrendingDown className="mt-0.5 h-5 w-5 flex-shrink-0 t-green" />
          <p className="text-sm t-soft">
            Ahorras ~<strong className="t-green">{eur(r.ahorroMes)}€/mes</strong> y
            la cuota es {eur(propuesta.cuotaMensual)}€/mes → ahorro neto de ~
            <strong className="t-green">{eur(ahorroNeto)}€/mes</strong>.
            {meses !== null && (
              <>
                {" "}
                El setup se amortiza en ~{meses} {meses === 1 ? "mes" : "meses"}.
              </>
            )}
          </p>
        </div>
      )}

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs t-mute">
        <Clock3 className="h-3.5 w-3.5" />
        Estimación a partir de tu volumen. El plan exacto de cada canal lo
        afinamos contigo en el kickoff.
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
