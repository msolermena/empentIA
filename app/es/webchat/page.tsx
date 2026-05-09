"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { createLandingLead } from "@/lib/api";
import {
  ArrowRight,
  CheckCircle2,
  X,
  ChevronDown,
  MessageCircle,
  Bot,
  Zap,
  Globe,
  BarChart3,
  ShoppingCart,
  FileText,
  Users,
  Star,
  Info,
  Sparkles,
} from "lucide-react";

// ─── Utilities ────────────────────────────────────────────────────────────────

function Badge({ text }: { text: string }) {
  return (
    <span className="ml-1.5 inline-flex items-center rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400 ring-1 ring-emerald-500/20">
      {text}
    </span>
  );
}

function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="relative inline-flex cursor-help items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && (
        <span className="absolute bottom-full left-1/2 z-50 mb-2 w-52 -translate-x-1/2 rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-xs leading-relaxed text-slate-300 shadow-xl">
          {text}
          <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-700" />
        </span>
      )}
    </span>
  );
}

// ─── Lead Form ────────────────────────────────────────────────────────────────

type Pla = "Starter" | "Pro" | "Business" | "";

interface LeadFormProps {
  origen: "landing-webchat-hero" | "landing-webchat-cta-final";
  plaPreseleccionat?: Pla;
}

function LeadForm({ origen, plaPreseleccionat = "" }: LeadFormProps) {
  const [form, setForm] = useState({
    nom_empresa: "",
    url_web: "",
    nom_contacte: "",
    email: "",
    telefon: "",
    plataforma: "" as "" | "WooCommerce" | "PrestaShop" | "Shopify" | "Web custom" | "Altra",
    pla: plaPreseleccionat as Pla,
    consentiment_rgpd: false,
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consentiment_rgpd) {
      setError("Debes aceptar la política de privacidad.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      await createLandingLead({
        email: form.email,
        origen,
        nom_empresa: form.nom_empresa || undefined,
        url_web: form.url_web || undefined,
        nom_contacte: form.nom_contacte || undefined,
        telefon: form.telefon || undefined,
        plataforma: form.plataforma || undefined,
        pla: (form.pla as "Starter" | "Pro" | "Business") || undefined,
        consentiment_rgpd: form.consentiment_rgpd,
      });
      setDone(true);
    } catch {
      setError("Error al enviar el formulario. Inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
          <CheckCircle2 className="h-7 w-7 text-emerald-400" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-slate-50">¡Solicitud recibida!</h3>
        <p className="text-slate-400">Nos pondremos en contacto en menos de 24h con una propuesta personalizada.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Empresa *</label>
          <input
            type="text"
            required
            value={form.nom_empresa}
            onChange={(e) => setForm({ ...form, nom_empresa: e.target.value })}
            placeholder="Nombre de la empresa"
            className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-slate-100 placeholder-slate-500 transition focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Web *</label>
          <input
            type="text"
            required
            value={form.url_web}
            onChange={(e) => setForm({ ...form, url_web: e.target.value })}
            placeholder="https://tienda.com"
            className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-slate-100 placeholder-slate-500 transition focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Nombre de contacto *</label>
          <input
            type="text"
            required
            value={form.nom_contacte}
            onChange={(e) => setForm({ ...form, nom_contacte: e.target.value })}
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-slate-100 placeholder-slate-500 transition focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Email *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="tu@empresa.com"
            className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-slate-100 placeholder-slate-500 transition focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">
            Teléfono <span className="text-slate-500">(opcional)</span>
          </label>
          <input
            type="tel"
            value={form.telefon}
            onChange={(e) => setForm({ ...form, telefon: e.target.value })}
            placeholder="+34 600 000 000"
            className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-slate-100 placeholder-slate-500 transition focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Plataforma *</label>
          <select
            required
            value={form.plataforma}
            onChange={(e) => setForm({ ...form, plataforma: e.target.value as typeof form.plataforma })}
            className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-slate-100 transition focus:border-emerald-500 focus:outline-none"
          >
            <option value="" disabled className="text-slate-500">Selecciona…</option>
            <option value="WooCommerce">WooCommerce</option>
            <option value="PrestaShop">PrestaShop</option>
            <option value="Shopify">Shopify</option>
            <option value="Web custom">Web personalizada</option>
            <option value="Altra">Otra</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">Plan de interés</label>
        <div className="flex gap-3">
          {(["Starter", "Pro", "Business"] as Pla[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setForm({ ...form, pla: p })}
              className={`flex-1 rounded-xl border py-2.5 text-sm font-medium transition ${
                form.pla === p
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                  : "border-slate-700 text-slate-400 hover:border-slate-600"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={form.consentiment_rgpd}
          onChange={(e) => setForm({ ...form, consentiment_rgpd: e.target.checked })}
          className="mt-0.5 h-4 w-4 flex-shrink-0 accent-emerald-500"
        />
        <span className="text-sm text-slate-400">
          Acepto la{" "}
          <Link href="/privacy" className="text-emerald-400 underline-offset-2 hover:underline">
            política de privacidad
          </Link>{" "}
          y el tratamiento de mis datos para recibir información sobre los servicios de empentIA. *
        </span>
      </label>

      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-emerald-400 disabled:opacity-60"
      >
        {sending ? "Enviando…" : "Solicitar activación"}
        {!sending && <ArrowRight className="h-4 w-4" />}
      </button>

      <p className="text-center text-xs text-slate-500">
        Sin permanencia · Respuesta en menos de 24h · Precios sin IVA
      </p>
    </form>
  );
}

// ─── Pricing Table ─────────────────────────────────────────────────────────────

const tooltips: Record<string, string> = {
  "gestio-coneixement": "Manual = tú nos envías la info. Automático = sincronización programada desde tu tienda.",
  "font-informacio": "Manual = texto y archivos. Web = scraping de tu web. API eCommerce = conexión directa con WooCommerce o PrestaShop.",
  "personalitzacio-visual": "Básica = color principal. Estándar = colores, avatar y posición. Completa = CSS custom, branding total, integrado en el diseño de tu web.",
  "multi-agent": "Agentes separados para departamentos, tiendas o marcas, cada uno con su catálogo y personalidad.",
  "respostes-rapides": "Botones clicables que el agente sugiere durante la conversación para facilitar la interacción.",
  "alertes-lead": "Notificación cuando un visitante deja sus datos o muestra interés de compra.",
  "pressupostos": "El agente genera y envía presupuestos por email con productos, precios, IVA y total.",
  "integracio-carret": "El agente añade productos al carrito real de tu tienda. Compatible WooCommerce y PrestaShop.",
  "exportacio-leads": "CSV = descarga manual. Webhook = envío automático en tiempo real a tu herramienta.",
  "informe-mensual": "Resumen de actividad: conversaciones, leads, productos más consultados, rendimiento del agente.",
  "suport-impl": "Documentación = guías y tutoriales. Asistida = configuramos contigo. Dedicada = configuración completa por nuestra parte con prioridad.",
};

type CellValue =
  | { type: "text"; val: string; soon?: boolean }
  | { type: "check"; val: boolean; soon?: boolean }
  | { type: "cta" };

interface PricingRow {
  label: string;
  tooltip?: string;
  starter: CellValue;
  pro: CellValue;
  business: CellValue;
  custom: CellValue;
  isHeader?: boolean;
}

const pricingRows: PricingRow[] = [
  { label: "Conversaciones y uso", isHeader: true, starter: { type: "text", val: "" }, pro: { type: "text", val: "" }, business: { type: "text", val: "" }, custom: { type: "text", val: "" } },
  { label: "Conversaciones incluidas/mes", starter: { type: "text", val: "50" }, pro: { type: "text", val: "100" }, business: { type: "text", val: "200" }, custom: { type: "text", val: "A medida" } },
  { label: "Extra por conversación", starter: { type: "text", val: "0,25€" }, pro: { type: "text", val: "0,25€" }, business: { type: "text", val: "0,25€" }, custom: { type: "text", val: "A medida" } },
  { label: "Usuarios del panel", starter: { type: "text", val: "1" }, pro: { type: "text", val: "3" }, business: { type: "text", val: "5" }, custom: { type: "text", val: "Ilimitados" } },
  { label: "Catálogo y conocimiento", isHeader: true, starter: { type: "text", val: "" }, pro: { type: "text", val: "" }, business: { type: "text", val: "" }, custom: { type: "text", val: "" } },
  { label: "Gestión del conocimiento", tooltip: "gestio-coneixement", starter: { type: "text", val: "Manual" }, pro: { type: "text", val: "Automático" }, business: { type: "text", val: "Automático" }, custom: { type: "text", val: "A medida" } },
  { label: "Fuente de información", tooltip: "font-informacio", starter: { type: "text", val: "Manual + Web" }, pro: { type: "text", val: "+ API eCommerce" }, business: { type: "text", val: "+ API eCommerce" }, custom: { type: "text", val: "A medida" } },
  { label: "Agente y personalización", isHeader: true, starter: { type: "text", val: "" }, pro: { type: "text", val: "" }, business: { type: "text", val: "" }, custom: { type: "text", val: "" } },
  { label: "Personalización visual", tooltip: "personalitzacio-visual", starter: { type: "text", val: "Básica" }, pro: { type: "text", val: "Estándar" }, business: { type: "text", val: "Completa" }, custom: { type: "text", val: "Total" } },
  { label: "Multi-agente", tooltip: "multi-agent", starter: { type: "check", val: false }, pro: { type: "text", val: "2 departamentos" }, business: { type: "text", val: "4 departamentos" }, custom: { type: "text", val: "Ilimitados" } },
  { label: "Idiomas activos", starter: { type: "text", val: "2" }, pro: { type: "text", val: "4" }, business: { type: "text", val: "Ilimitados" }, custom: { type: "text", val: "Ilimitados" } },
  { label: "Respuestas rápidas", tooltip: "respostes-rapides", starter: { type: "text", val: "3 fijas" }, pro: { type: "text", val: "Ilimitadas" }, business: { type: "text", val: "Ilimitadas", soon: true }, custom: { type: "text", val: "Ilimitadas" } },
  { label: "Acciones comerciales", isHeader: true, starter: { type: "text", val: "" }, pro: { type: "text", val: "" }, business: { type: "text", val: "" }, custom: { type: "text", val: "" } },
  { label: "Alertas por lead", tooltip: "alertes-lead", starter: { type: "text", val: "Email" }, pro: { type: "text", val: "Email + panel" }, business: { type: "text", val: "Email + panel + webhook", soon: true }, custom: { type: "text", val: "A medida" } },
  { label: "Presupuestos automáticos", tooltip: "pressupostos", starter: { type: "check", val: false }, pro: { type: "check", val: true }, business: { type: "check", val: true }, custom: { type: "check", val: true } },
  { label: "Integración carrito", tooltip: "integracio-carret", starter: { type: "check", val: false }, pro: { type: "check", val: true }, business: { type: "check", val: true }, custom: { type: "check", val: true } },
  { label: "Datos e historial", isHeader: true, starter: { type: "text", val: "" }, pro: { type: "text", val: "" }, business: { type: "text", val: "" }, custom: { type: "text", val: "" } },
  { label: "Historial de conversaciones", starter: { type: "text", val: "60 días" }, pro: { type: "text", val: "180 días" }, business: { type: "text", val: "Completo" }, custom: { type: "text", val: "Completo" } },
  { label: "Métricas y analytics", starter: { type: "text", val: "Básicas" }, pro: { type: "text", val: "Completas" }, business: { type: "text", val: "Completas + exportación" }, custom: { type: "text", val: "Completas" } },
  { label: "Exportación de leads", tooltip: "exportacio-leads", starter: { type: "text", val: "CSV manual" }, pro: { type: "text", val: "CSV + webhook", soon: true }, business: { type: "text", val: "CSV + webhook + CRM", soon: true }, custom: { type: "text", val: "A medida" } },
  { label: "Informe mensual", tooltip: "informe-mensual", starter: { type: "check", val: false }, pro: { type: "text", val: "PDF automático", soon: true }, business: { type: "text", val: "PDF + reunión trimestral", soon: true }, custom: { type: "text", val: "A medida" } },
  { label: "Soporte", isHeader: true, starter: { type: "text", val: "" }, pro: { type: "text", val: "" }, business: { type: "text", val: "" }, custom: { type: "text", val: "" } },
  { label: "Soporte implementación", tooltip: "suport-impl", starter: { type: "text", val: "Documentación + ticket" }, pro: { type: "text", val: "Implementación asistida" }, business: { type: "text", val: "Prioritaria + dedicada" }, custom: { type: "text", val: "Dedicado" } },
  { label: "SLA respuesta soporte", starter: { type: "text", val: "48h" }, pro: { type: "text", val: "24h" }, business: { type: "text", val: "4h" }, custom: { type: "text", val: "A acordar" } },
];

function CellContent({ cell }: { cell: CellValue }) {
  if (cell.type === "cta") return null;
  if (cell.type === "check") {
    return cell.val ? (
      <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-400" />
    ) : (
      <X className="mx-auto h-5 w-5 text-slate-600" />
    );
  }
  if (!cell.val) return null;
  return (
    <span className="text-sm text-slate-300">
      {cell.val}
      {cell.soon && <Badge text="Próximamente" />}
    </span>
  );
}

function PricingTable({ onSelectPlan }: { onSelectPlan: (pla: Pla) => void }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[680px] border-collapse text-left">
        <thead>
          <tr>
            <th className="w-[200px] pb-6 pr-4 text-sm font-medium text-slate-500" />
            {[
              { name: "Starter", price: "49€", highlight: false },
              { name: "Pro", price: "79€", highlight: true },
              { name: "Business", price: "149€", highlight: false },
              { name: "Personalizado", price: "Contáctanos", highlight: false },
            ].map(({ name, price, highlight }) => (
              <th key={name} className="pb-6 pr-2 text-center align-bottom">
                <div
                  className={`rounded-2xl p-4 ${
                    highlight
                      ? "border-2 border-emerald-500 bg-emerald-500/10"
                      : "border border-slate-800 bg-slate-900/40"
                  }`}
                >
                  {highlight && (
                    <div className="mb-2 flex justify-center">
                      <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-bold text-white">
                        Más popular
                      </span>
                    </div>
                  )}
                  <div className="mb-1 font-bold text-slate-50">{name}</div>
                  <div className={`text-2xl font-extrabold ${highlight ? "text-emerald-400" : "text-slate-200"}`}>
                    {price}
                    {price !== "Contáctanos" && <span className="text-base font-normal text-slate-500">/mes</span>}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-500">IVA no incluido</div>
                  <button
                    onClick={() => onSelectPlan(name === "Personalizado" ? "" : (name as Pla))}
                    className={`mt-4 w-full rounded-lg py-2 text-sm font-semibold transition ${
                      highlight
                        ? "bg-emerald-500 text-white hover:bg-emerald-400"
                        : "border border-slate-700 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400"
                    }`}
                  >
                    {name === "Personalizado" ? "Hablemos" : "Activar ahora"}
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pricingRows.map((row, i) => {
            if (row.isHeader) {
              return (
                <tr key={i}>
                  <td colSpan={5} className="pb-1 pt-5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      {row.label}
                    </span>
                  </td>
                </tr>
              );
            }
            return (
              <tr key={i} className="border-t border-slate-800/60">
                <td className="py-3 pr-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    {row.label}
                    {row.tooltip && (
                      <Tooltip text={tooltips[row.tooltip]}>
                        <Info className="h-3.5 w-3.5 text-slate-600 hover:text-slate-400" />
                      </Tooltip>
                    )}
                  </span>
                </td>
                {(["starter", "pro", "business", "custom"] as const).map((plan) => (
                  <td key={plan} className="py-3 pr-2 text-center">
                    <CellContent cell={row[plan]} />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "¿Cuánto tarda en estar operativo?",
    a: "En 1-2 días laborables. Nuestro equipo se encarga de toda la configuración: el agente, el conocimiento de tu catálogo y la integración en tu web. Tú solo nos explicas el negocio.",
  },
  {
    q: "¿Hace falta saber programar para instalarlo?",
    a: "No. El agente se integra con una sola línea de código (un script) que te enviamos nosotros. Si necesitas ayuda, nuestro equipo lo hace por ti.",
  },
  {
    q: "¿Es compatible con mi plataforma?",
    a: "Sí, funciona con WooCommerce, PrestaShop, Shopify, webs personalizadas y cualquier plataforma que acepte HTML. Las funcionalidades de integración profunda (carrito, stock en tiempo real) están disponibles desde el plan Pro con WooCommerce y PrestaShop.",
  },
  {
    q: "¿Cómo aprende el catálogo de productos?",
    a: "En el plan Starter, tú nos envías la información (archivos, PDFs, textos). En los planes Pro y Business, sincronizamos directamente con tu tienda vía API para tener el catálogo siempre actualizado.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. Suscripción mensual, sin permanencia mínima. Puedes cancelar en cualquier momento desde tu panel.",
  },
  {
    q: "¿Cómo gestiona los datos de mis clientes? ¿Cumple el RGPD?",
    a: "Sí. Las conversaciones se procesan y almacenan en servidores europeos. El agente no guarda datos personales sin consentimiento. Te ayudamos a configurar los textos legales necesarios para tu widget.",
  },
  {
    q: "¿Qué diferencia hay con un chatbot de FAQs tradicional?",
    a: "Un chatbot de FAQs responde preguntas fijas que tú has programado. El agente de empentIA entiende el contexto, busca en el catálogo en tiempo real, puede negociar, generar presupuestos y detectar el interés de compra. Es un agente comercial, no un menú de respuestas.",
  },
  {
    q: "¿Puedo probarlo antes de contratar?",
    a: "Sí. Prueba el widget de demostración en esta misma página. Si quieres una demo con tu catálogo real, solicítala y en 48h tienes tu agente configurado para probarlo.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/30 overflow-hidden">
          <button
            className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-base font-medium text-slate-200 hover:text-emerald-400 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            {faq.q}
            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 text-slate-500 transition-transform ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <div className="border-t border-slate-800 px-6 py-4 text-sm leading-relaxed text-slate-400">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Webchat Widget ────────────────────────────────────────────────────────────

function WebchatDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.empentia.com/widget/webchat.js";
    script.setAttribute("data-instance-key", "empentia-webchat-landing");
    script.setAttribute("data-mode", "embedded");
    script.setAttribute("data-container", "webchat-demo-container-es");
    script.setAttribute("data-lang", "es");
    script.async = true;
    containerRef.current?.appendChild(script);
    return () => {
      if (containerRef.current?.contains(script)) {
        containerRef.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-slate-900/60 shadow-2xl shadow-emerald-500/5">
      <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/60" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <div className="h-3 w-3 rounded-full bg-green-500/60" />
        </div>
        <span className="ml-2 text-xs text-slate-500">Tu tienda online</span>
      </div>
      <div
        id="webchat-demo-container-es"
        ref={containerRef}
        className="min-h-[420px] bg-gradient-to-br from-slate-900 to-slate-950 p-6 md:p-8"
      >
        <div className="flex h-full min-h-[380px] flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-2 ring-emerald-500/30">
            <MessageCircle className="h-8 w-8 text-emerald-400" />
          </div>
          <div>
            <p className="font-semibold text-slate-200">Agente empentIA</p>
            <p className="mt-1 text-sm text-slate-500">Pregúntame sobre el servicio, funcionalidades o precios</p>
          </div>
          <div className="mt-2 flex gap-2 flex-wrap justify-center">
            {["¿Cómo funciona?", "¿Cuánto cuesta?", "¿Qué planes hay?"].map((q) => (
              <span key={q} className="rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1.5 text-xs text-emerald-400">
                {q}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function WebchatLandingES() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formPlan, setFormPlan] = useState<Pla>("");
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = (pla: Pla = "") => {
    setFormPlan(pla);
    setTimeout(() => {
      ctaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[300px] right-0 h-[700px] w-[700px] rounded-full bg-emerald-500/[0.06] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-emerald-500/[0.04] blur-3xl" />
      </div>

      {/* ── Header ── */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <Logo size="md" variant="image" />
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-1 text-sm md:flex">
              <Link href="/webchat" className="rounded-md px-2.5 py-1 text-slate-500 hover:text-slate-300 transition">
                CA
              </Link>
              <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 font-semibold text-emerald-400">ES</span>
            </div>
            <a href="#demo" className="hidden text-sm font-medium text-slate-400 transition hover:text-emerald-400 md:block">
              Demo
            </a>
            <a href="#precios" className="hidden text-sm font-medium text-slate-400 transition hover:text-emerald-400 md:block">
              Precios
            </a>
            <button
              onClick={() => scrollToForm()}
              className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500/20"
            >
              Solicitar demo
            </button>
          </div>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-sm text-emerald-400">
            <Sparkles className="h-4 w-4" />
            Agente comercial IA para tiendas online
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            Tu mejor comercial
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              trabaja 24/7
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 md:text-xl">
            Un agente IA que conoce tu catálogo, asesora, genera presupuestos y cierra ventas.{" "}
            <span className="text-slate-300">Sin horas de trabajo. Sin descanso.</span>
          </p>

          <div className="mb-10 flex flex-wrap justify-center gap-8 text-center">
            {[
              { val: "24/7", label: "Siempre disponible" },
              { val: "<1s", label: "Tiempo de respuesta" },
              { val: "<0,10€", label: "Por conversación" },
            ].map(({ val, label }) => (
              <div key={label}>
                <div className="text-3xl font-extrabold text-emerald-400">{val}</div>
                <div className="mt-1 text-sm text-slate-500">{label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-emerald-400"
            >
              <MessageCircle className="h-5 w-5" />
              Probar la demo
            </a>
            <a
              href="#precios"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3.5 text-base font-medium text-slate-300 transition hover:border-emerald-500/40 hover:text-emerald-400"
            >
              Ver planes y precios
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="relative border-y border-slate-800/60 bg-slate-900/30 py-8">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 text-sm font-medium text-slate-500">Tiendas online, empresas de seguridad y distribuidoras ya lo utilizan</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { name: "Tienda de ciclismo", detail: "+630 productos" },
              { name: "Sistemas de seguridad", detail: "Productos configurables" },
              { name: "Distribuidora B2B", detail: "Catálogo multiidioma" },
            ].map(({ name, detail }) => (
              <div key={name} className="text-center">
                <div className="text-sm font-semibold text-slate-300">{name}</div>
                <div className="text-xs text-slate-600">{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problema ── */}
      <section className="relative py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Tu tienda pierde ventas cada noche</h2>
            <p className="text-slate-400">Mientras duermes, tus clientes hacen preguntas que no reciben respuesta.</p>
          </div>
          <div className="space-y-3">
            {[
              "Un cliente pregunta por un producto a las 11 de la noche. No recibe respuesta. Compra en la competencia.",
              "Tu equipo de ventas dedica horas a responder las mismas preguntas básicas del catálogo.",
              "No sabes qué productos interesan más ni qué dudas frenan la compra.",
              "Tienes un formulario de contacto, pero la conversión es baja y el seguimiento, manual.",
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-slate-800/60 bg-slate-900/20 p-4 hover:border-emerald-500/20 hover:bg-slate-900/40 transition"
              >
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs text-red-400">
                  ✕
                </div>
                <p className="text-slate-300">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-slate-400">
            El agente empentIA es la solución:{" "}
            <span className="font-semibold text-emerald-400">disponible 24/7, conoce tu catálogo y cierra ventas.</span>
          </p>
        </div>
      </section>

      {/* ── Demo ── */}
      <section id="demo" className="relative py-16 px-6 scroll-mt-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">Pruébalo ahora, en vivo</h2>
            <p className="text-slate-400">Pregunta sobre el servicio, funcionalidades o precios. El agente responde en tiempo real.</p>
          </div>
          <WebchatDemo />
        </div>
      </section>

      {/* ── Funcionalitats ── */}
      <section className="relative py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">Todo lo que necesitas para vender más</h2>
            <p className="text-slate-400">Ocho capacidades, un solo agente.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Bot, title: "Búsqueda inteligente", desc: "Entiende lo que el cliente busca y encuentra el producto adecuado en el catálogo, aunque escriba mal." },
              { icon: ShoppingCart, title: "Añade al carrito", desc: "El agente añade productos directamente al carrito de tu tienda. Compatible WooCommerce y PrestaShop." },
              { icon: FileText, title: "Presupuestos automáticos", desc: "Genera y envía presupuestos por email con productos, cantidades, IVA y total en segundos." },
              { icon: Users, title: "Captación de leads", desc: "Detecta interés de compra, recoge datos y escala a tu equipo los clientes que quieren hablar." },
              { icon: Zap, title: "Integración sencilla", desc: "Una sola línea de código. Funciona con cualquier web y plataforma eCommerce." },
              { icon: Star, title: "Personalización total", desc: "Colores, avatar, posición, CSS custom. El agente se integra como si fuera parte del diseño de tu web." },
              { icon: Globe, title: "Multiidioma automático", desc: "Detecta el idioma del cliente y responde en español, catalán, inglés o lo que necesites." },
              { icon: BarChart3, title: "Métricas y analytics", desc: "Sabes qué productos interesan, qué dudas frenan la compra y cuántos leads genera el agente." },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col gap-3 rounded-xl border border-slate-800/60 bg-slate-900/20 p-5 hover:border-emerald-500/20 hover:bg-slate-900/40 transition"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <Icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-slate-100">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="precios" className="relative py-16 px-6 scroll-mt-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">Planes y precios transparentes</h2>
            <p className="text-slate-400">Sin sorpresas. Sin permanencia. Cancela cuando quieras.</p>
          </div>
          <PricingTable onSelectPlan={(pla) => scrollToForm(pla)} />
        </div>
      </section>

      {/* ── Casos d'ús ── */}
      <section className="relative py-16 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">Casos de uso reales</h2>
            <p className="text-slate-400">Cómo utilizan el agente nuestros clientes.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                sector: "Ciclismo",
                detail: "+630 productos",
                situation: "Clientes que preguntan por talla, compatibilidad y stock a todas horas.",
                what: "El agente responde en tiempo real, filtra por tallas disponibles y añade la bicicleta al carrito.",
                result: "30% menos consultas manuales. Ventas completadas fuera del horario comercial.",
              },
              {
                sector: "Seguridad",
                detail: "Productos configurables",
                situation: "Clientes que necesitan kits a medida según instalación y presupuesto.",
                what: "El agente entiende los requisitos, propone el kit adecuado y genera el presupuesto automáticamente.",
                result: "Presupuestos enviados en <1 minuto. Tiempo del comercial reducido a la mitad.",
              },
              {
                sector: "Distribución B2B",
                detail: "Catálogo multiidioma",
                situation: "Compradores internacionales que consultan disponibilidad y precios en su idioma.",
                what: "El agente detecta el idioma, consulta el stock y escala el lead al gestor de exportación.",
                result: "Cobertura 24/7 en 3 idiomas sin contratar personal adicional.",
              },
            ].map(({ sector, detail, situation, what, result }) => (
              <div key={sector} className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
                <div>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-emerald-500">{sector}</div>
                  <div className="text-sm text-slate-500">{detail}</div>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-slate-400">Situación: </span>
                    <span className="text-slate-400">{situation}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-300">Qué hace el agente: </span>
                    <span className="text-slate-300">{what}</span>
                  </div>
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                    <span className="font-semibold text-emerald-400">Resultado: </span>
                    <span className="text-slate-300">{result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI ── */}
      <section className="relative py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">El coste de un agente humano vs. empentIA</h2>
            <p className="text-slate-400">Números claros, sin letra pequeña.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/30 p-8">
              <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-500">Agente humano comercial</div>
              <div className="mb-6 text-4xl font-extrabold text-slate-300">
                1.800–2.500€<span className="text-lg font-normal text-slate-500">/mes</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-400">
                {["Disponible 8h/día, 5 días/semana", "Vacaciones, bajas, formación", "Rendimiento variable", "Escalar = contratar más personal"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <X className="h-4 w-4 text-slate-600" />{t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-500/5 p-8">
              <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-emerald-500">Agente empentIA</div>
              <div className="mb-6 text-4xl font-extrabold text-emerald-400">
                49–149€<span className="text-lg font-normal text-slate-500">/mes</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                {["Disponible 24/7, 365 días/año", "Sin vacaciones ni bajas", "Rendimiento consistente y medible", "Escala automáticamente"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-slate-500">
            El coste por conversación es de menos de 0,10€. Un agente humano cuesta entre 10 y 30€ por conversación de soporte.
          </p>
        </div>
      </section>

      {/* ── Com s'activa ── */}
      <section className="relative py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">Operativo en 1-2 días laborables</h2>
            <p className="text-slate-400">Nosotros nos encargamos de todo. Tú nos explicas el negocio.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { num: "1", title: "Solicita", desc: "Rellena el formulario con los datos de tu tienda. En menos de 24h, te enviamos una propuesta personalizada." },
              { num: "2", title: "Configuramos", desc: "Nuestro equipo configura el agente con tu catálogo, tu identidad visual y tus instrucciones comerciales." },
              { num: "3", title: "Activa y vende", desc: "Una línea de código y tu agente comercial está operativo. Monitoriza conversaciones y resultados desde el panel." },
            ].map(({ num, title, desc }) => (
              <div key={num} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-xl font-extrabold text-white shadow-lg shadow-emerald-500/30">
                  {num}
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-100">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">Preguntas frecuentes</h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section ref={ctaRef} className="relative py-16 px-6 scroll-mt-20">
        <div className="mx-auto max-w-2xl">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-slate-900/60 p-8 md:p-12">
            <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="relative">
              <div className="mb-8 text-center">
                <h2 className="mb-3 text-2xl font-bold md:text-3xl">
                  Tu agente comercial listo en 48 horas
                </h2>
                <p className="text-slate-400">
                  Rellena el formulario y te enviamos una propuesta personalizada. Sin compromiso.
                </p>
              </div>
              <LeadForm origen="landing-webchat-cta-final" plaPreseleccionat={formPlan} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-sm text-slate-500">© 2026 empentIA. Todos los derechos reservados.</p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-slate-500 transition hover:text-slate-300">
                Política de privacidad
              </Link>
              <Link href="/legal" className="text-slate-500 transition hover:text-slate-300">
                Aviso legal
              </Link>
              <Link href="/cookies" className="text-slate-500 transition hover:text-slate-300">
                Política de cookies
              </Link>
              <Link href="/" className="text-slate-500 transition hover:text-slate-300">
                empentIA
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
