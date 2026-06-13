"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
} from "lucide-react";
import { scrapeCompany, createLandingLead } from "@/lib/api";

// ============================================================
// CONSTANTS
// ============================================================

const CAL_LINK = "https://cal.com/empentia/descobriment-empentia";
const HORAS_MES = 4.33; // setmanes per mes
const FACTOR_AUTOMATITZABLE = 0.6; // % de temps de tasques repetitives automatitzable

type StepId = "intro" | "analyzing" | "cuestionario" | "contacto" | "informe";

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
// PAGE
// ============================================================

export default function AuditoriaAtencionPage() {
  const searchParams = useSearchParams();

  const [step, setStep] = useState<StepId>("intro");
  const [url, setUrl] = useState("");
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);

  // Deep-link: si arriba ?url=... saltem directament a l'anàlisi
  useEffect(() => {
    const u = searchParams.get("url");
    if (u) {
      setUrl(u);
      setStep("analyzing");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 z-50 w-full border-b border-emerald-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-16 items-center px-6">
          <Logo size="sm" variant="image" />
          <span className="ml-4 hidden text-sm text-muted-foreground sm:inline">
            Auditoría de atención al cliente
          </span>
        </nav>
      </header>

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
          onDone={() => setStep("informe")}
        />
      )}

      {step === "informe" && <InformeStep answers={answers} />}
    </div>
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
    <div className="container mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 pt-16 pb-12">
      <div className="mb-6 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15">
          <Headphones className="h-8 w-8 text-emerald-400" />
        </div>
      </div>

      <h1 className="mb-4 text-center text-3xl font-extrabold text-slate-50 md:text-4xl">
        ¿Cuánto te cuesta tu atención al cliente?
      </h1>
      <p className="mb-8 max-w-xl text-center text-lg leading-relaxed text-slate-300">
        Responde unas preguntas y te calculamos, con tus propios números, lo que
        dedicas hoy y lo que podrías ahorrar. Te llevas una propuesta clara.
      </p>

      <Card className="w-full border-2 border-emerald-500/20">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-slate-300">
              Tu página web
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Globe className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError(null);
                  }}
                  placeholder="tuempresa.com"
                  className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 py-3 pl-12 pr-4 text-slate-100 placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <Button type="submit" size="lg" className="gap-2 whitespace-nowrap">
                Empezar
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
            {error && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}
            <p className="text-xs text-slate-500">
              Tarda menos de 2 minutos · Sin compromiso
            </p>
          </form>
        </CardContent>
      </Card>
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
    <div className="flex min-h-screen items-center justify-center px-6 pt-16">
      <div className="w-full max-w-xl">
        <div className="glass-card relative z-10 rounded-2xl border-2 border-emerald-500/20 p-8 md:p-12">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-emerald-400 opacity-50" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/15">
                <CurrentIcon className="h-12 w-12 text-emerald-400 transition-all duration-300" />
              </div>
            </div>
          </div>

          <h2 className="mb-3 text-center text-2xl font-bold text-slate-50 md:text-3xl">
            {ANALYZING_STEPS[currentStep].message}
          </h2>
          <p className="mb-8 text-center text-muted-foreground">
            Estamos analizando{" "}
            <strong className="text-slate-300">{url}</strong>
          </p>

          <Progress value={progress} className="mb-2 h-3" />
          <p className="text-center text-sm text-muted-foreground">
            {Math.round(progress)}% completado
          </p>

          <div className="mt-8 flex items-center justify-center gap-2">
            {ANALYZING_STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i <= currentStep ? "w-8 bg-emerald-400" : "w-2 bg-slate-700"
                }`}
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
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isSel = selected.includes(opt.id);
        const Icon = opt.icon;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onToggle(opt.id)}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-all ${
              isSel
                ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-slate-300"
            }`}
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
      <h1 className="mb-2 text-2xl font-bold text-slate-100">
        Cuéntanos cómo gestionáis la atención
      </h1>
      <p className="mb-8 text-slate-400">
        Con tus respuestas calculamos el coste real y el ahorro potencial.
      </p>

      <div className="space-y-5">
        {/* Q1 — Canales activos */}
        <Card className="border border-slate-700/50">
          <CardContent className="p-6">
            <h2 className="mb-1 font-semibold text-slate-200">
              1. ¿Por qué canales atendéis hoy?
            </h2>
            <p className="mb-4 text-sm text-slate-500">
              Marca todos los que uséis actualmente.
            </p>
            <ChipGroup
              options={CANALES}
              selected={answers.canalesActivos}
              onToggle={(id) => toggle("canalesActivos", id)}
            />
          </CardContent>
        </Card>

        {/* Q2 — Nuevos canales */}
        <Card className="border border-slate-700/50">
          <CardContent className="p-6">
            <h2 className="mb-1 font-semibold text-slate-200">
              2. ¿Pensáis abrir algún canal nuevo?{" "}
              <span className="text-sm font-normal text-slate-500">
                (opcional)
              </span>
            </h2>
            <p className="mb-4 text-sm text-slate-500">
              Canales que aún no usáis pero os gustaría ofrecer.
            </p>
            {nuevosDisponibles.length > 0 ? (
              <ChipGroup
                options={nuevosDisponibles}
                selected={answers.canalesNuevos}
                onToggle={(id) => toggle("canalesNuevos", id)}
              />
            ) : (
              <p className="text-sm text-slate-500">
                Ya tenéis todos los canales activos 👌
              </p>
            )}
          </CardContent>
        </Card>

        {/* Q3 — Volumen */}
        <Card className="border border-slate-700/50">
          <CardContent className="p-6">
            <h2 className="mb-4 font-semibold text-slate-200">
              3. Volumen de consultas
            </h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  ¿Cuántas consultas recibís a la semana? (aprox.)
                </label>
                <input
                  type="number"
                  min={0}
                  value={answers.consultasSemana}
                  onChange={(e) => set("consultasSemana", e.target.value)}
                  placeholder="Ej: 80"
                  className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  ¿Cuál es el tipo de consulta más habitual?
                </label>
                <select
                  value={answers.tipoPrincipal}
                  onChange={(e) => set("tipoPrincipal", e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-200 focus:border-emerald-500 focus:outline-none"
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
          </CardContent>
        </Card>

        {/* Q4 + Q5 — Tiempo y coste */}
        <Card className="border border-slate-700/50">
          <CardContent className="p-6">
            <h2 className="mb-4 font-semibold text-slate-200">
              4. Tiempo y coste del equipo
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Horas/semana dedicadas a atención
                </label>
                <input
                  type="number"
                  min={0}
                  value={answers.horasSemana}
                  onChange={(e) => set("horasSemana", e.target.value)}
                  placeholder="Ej: 15"
                  className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Coste por hora del personal (€)
                </label>
                <input
                  type="number"
                  min={0}
                  value={answers.costeHora}
                  onChange={(e) => set("costeHora", e.target.value)}
                  placeholder="22"
                  className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
                <p className="mt-1.5 text-xs text-slate-500">
                  Ajústalo a tu realidad. Por defecto, 22 €/h.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Q6 — Tiempo de respuesta */}
        <Card className="border border-slate-700/50">
          <CardContent className="p-6">
            <h2 className="mb-4 font-semibold text-slate-200">
              5. ¿Cuánto tardáis en responder de media?
            </h2>
            <div className="flex flex-wrap gap-2">
              {TIEMPOS_RESPUESTA.map((t) => {
                const isSel = answers.tiempoRespuesta === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => set("tiempoRespuesta", t.id)}
                    className={`rounded-xl border px-4 py-2 text-sm transition-all ${
                      isSel
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                        : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Q7 — Notas */}
        <Card className="border border-slate-700/50">
          <CardContent className="p-6">
            <h2 className="mb-2 font-semibold text-slate-200">
              6. ¿Algo más que deberíamos saber?{" "}
              <span className="text-sm font-normal text-slate-500">
                (opcional)
              </span>
            </h2>
            <textarea
              value={answers.notas}
              onChange={(e) => set("notas", e.target.value)}
              rows={3}
              placeholder="Picos de temporada, idiomas, herramientas que usáis..."
              className="w-full resize-none rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="gap-2 text-slate-400 hover:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Atrás
        </Button>
        <Button onClick={handleNext} size="lg" className="gap-2 px-6">
          Ver mi informe
          <ArrowRight className="h-4 w-4" />
        </Button>
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
  onDone: () => void;
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
    if (!emailRegex.test(email))
      return setError("Introduce un email válido");
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

    setTimeout(() => onDone(), 300);
  };

  return (
    <div className="container mx-auto max-w-md px-6 pt-28 pb-16">
      <Card className="border-2 border-emerald-500/20">
        <CardContent className="p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-50">
              Tu informe está listo
            </h2>
            <p className="mt-2 text-slate-400">
              ¿A dónde te enviamos la propuesta?
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                Nombre *
              </label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Tu nombre"
                className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@empresa.com"
                className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                Empresa{" "}
                <span className="text-slate-500">(opcional)</span>
              </label>
              <input
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="Nombre de tu empresa"
                className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                disabled={isSubmitting}
              />
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-slate-700 bg-slate-800/30 p-4 transition-all hover:border-emerald-500/50">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-5 w-5 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-2 focus:ring-emerald-500"
                disabled={isSubmitting}
              />
              <span className="text-sm text-slate-300">
                Acepto la{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  className="text-emerald-400 underline hover:text-emerald-300"
                >
                  política de privacidad
                </a>{" "}
                *
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-slate-700 bg-slate-800/30 p-4 transition-all hover:border-emerald-500/50">
              <input
                type="checkbox"
                checked={comercial}
                onChange={(e) => setComercial(e.target.checked)}
                className="mt-0.5 h-5 w-5 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-2 focus:ring-emerald-500"
                disabled={isSubmitting}
              />
              <span className="text-sm text-slate-300">
                Quiero recibir información sobre novedades y ofertas
              </span>
            </label>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="h-14 w-full gap-2 text-base"
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
            </Button>
          </form>

          <button
            onClick={onBack}
            className="mt-4 flex w-full items-center justify-center gap-1 text-sm text-slate-500 hover:text-slate-300"
          >
            <ArrowLeft className="h-3 w-3" /> Volver a las preguntas
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
            <Lock className="h-4 w-4" />
            <span>100% confidencial</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================
// STEP 5 — INFORME
// ============================================================

function InformeStep({ answers }: { answers: Answers }) {
  const r = computeReport(answers);

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

  return (
    <div className="container mx-auto max-w-3xl px-6 pt-24 pb-16">
      {/* Hero */}
      <div className="mb-10 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
            <TrendingDown className="h-8 w-8 text-emerald-400" />
          </div>
        </div>
        <h1 className="mb-3 text-3xl font-extrabold text-slate-50 md:text-4xl">
          Esto te cuesta tu atención al cliente
        </h1>
        <p className="mx-auto max-w-xl text-slate-300">
          Calculado con tus propios datos: {eur(r.consultasMes)} consultas/mes y{" "}
          {r.horasSemana} h/semana de equipo.
        </p>
      </div>

      {/* Coste actual */}
      <Card className="mb-8 border-2 border-amber-500/30">
        <CardContent className="p-8">
          <p className="mb-1 text-center text-sm uppercase tracking-wide text-amber-400">
            Coste actual de gestión
          </p>
          <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-2">
            <div>
              <p className="text-4xl font-extrabold text-amber-400">
                {eur(r.costeMes)}€
              </p>
              <p className="text-sm text-slate-500">al mes</p>
            </div>
            <div className="md:border-l md:border-slate-700/50 md:pl-6">
              <p className="text-4xl font-extrabold text-amber-400">
                {eur(r.costeAnio)}€
              </p>
              <p className="text-sm text-slate-500">al año</p>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-slate-400">
            {r.horasSemana} h/semana × {eur(r.costeHora)} €/h, hoy 100% manual.
          </p>
        </CardContent>
      </Card>

      {/* Comparativa */}
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-200">
        <Sparkles className="h-6 w-6 text-emerald-400" />
        Comparativa: hoy vs con empentIA
      </h2>

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Hoy */}
        <Card className="border border-slate-700/50">
          <CardContent className="p-6">
            <h3 className="mb-4 font-semibold text-slate-300">
              Hoy (gestión interna)
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <Euro className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
                {eur(r.costeMes)}€/mes en horas de tu equipo
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
                Tiempo de respuesta: {tiempoLabel.toLowerCase()}
              </li>
              <li className="flex items-start gap-2">
                <Users className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
                Cobertura limitada al horario del equipo
              </li>
            </ul>
            <div className="mt-5">
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-full rounded-full bg-amber-500/70" />
              </div>
              <p className="mt-1 text-xs text-slate-500">Coste 100%</p>
            </div>
          </CardContent>
        </Card>

        {/* Con empentIA */}
        <Card className="border-2 border-emerald-500/40">
          <CardContent className="p-6">
            <h3 className="mb-4 font-semibold text-emerald-300">
              Con empentIA
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <TrendingDown className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                Recuperas hasta {r.horasLiberadas.toFixed(0)} h/semana
              </li>
              <li className="flex items-start gap-2">
                <Euro className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                Ahorro de hasta {eur(r.ahorroMes)}€/mes
              </li>
              <li className="flex items-start gap-2">
                <Zap className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                Respuesta inmediata, 24/7, en todos los canales
              </li>
            </ul>
            <div className="mt-5">
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${restoPct}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Coste estimado tras automatizar
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8 border border-emerald-500/20 bg-emerald-500/5">
        <CardContent className="p-6 text-center">
          <p className="text-lg text-slate-200">
            Ahorro potencial estimado:{" "}
            <strong className="text-emerald-400">
              {eur(r.ahorroAnio)}€/año
            </strong>
          </p>
          <p className="mt-2 text-sm text-slate-400">
            El plan exacto y su precio te los preparamos a medida en la reunión,
            según tus canales y volumen.
          </p>
        </CardContent>
      </Card>

      {/* Resumen de tu situación */}
      <Card className="mb-10 border border-slate-700/50">
        <CardContent className="p-6">
          <h3 className="mb-4 font-semibold text-slate-200">
            Resumen de lo que nos has contado
          </h3>
          <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <ResumenItem label="Canales activos" value={canalesActivosLabels.join(", ") || "—"} />
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
            <ResumenItem
              label="Dedicación"
              value={`${r.horasSemana} h/semana`}
            />
            <ResumenItem
              label="Tiempo de respuesta"
              value={tiempoLabel}
            />
          </div>
          {answers.notas && (
            <p className="mt-4 border-t border-slate-800 pt-4 text-sm text-slate-400">
              <span className="text-slate-500">Notas: </span>
              {answers.notas}
            </p>
          )}
        </CardContent>
      </Card>

      {/* CTA final */}
      <Card className="border-2 border-emerald-500/30">
        <CardContent className="p-8 text-center">
          <h3 className="mb-3 text-2xl font-bold text-slate-100">
            Validemos juntos esta propuesta
          </h3>
          <p className="mx-auto mb-6 max-w-md text-slate-400">
            En 20 minutos repasamos estos números contigo y te enseñamos cómo lo
            automatizaríamos en tu caso, sin compromiso.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2">
                <Calendar className="h-5 w-5" />
                Concertar reunión
              </Button>
            </a>
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => window.print()}
            >
              <Download className="h-5 w-5" />
              Descargar propuesta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ResumenItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-3">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-0.5 text-slate-200">{value}</p>
    </div>
  );
}
