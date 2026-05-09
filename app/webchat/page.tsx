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
  Clock,
  Shield,
  Star,
  Info,
  Phone,
  Mail,
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

// ─── Contacte Form (Hero / CTA Final) ─────────────────────────────────────────

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
      setError("Has d'acceptar la política de privacitat.");
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
      setError("Error enviant el formulari. Torna-ho a provar.");
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
        <h3 className="mb-2 text-xl font-bold text-slate-50">Sol·licitud rebuda!</h3>
        <p className="text-slate-400">Et contactarem en menys de 24h amb una proposta personalitzada.</p>
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
            placeholder="Nom de l'empresa"
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
            placeholder="https://botiga.cat"
            className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-slate-100 placeholder-slate-500 transition focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">Nom de contacte *</label>
          <input
            type="text"
            required
            value={form.nom_contacte}
            onChange={(e) => setForm({ ...form, nom_contacte: e.target.value })}
            placeholder="El teu nom"
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
            placeholder="tu@empresa.cat"
            className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-slate-100 placeholder-slate-500 transition focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300">
            Telèfon <span className="text-slate-500">(opcional)</span>
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
            <option value="Web custom">Web custom</option>
            <option value="Altra">Altra</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">Pla d'interès</label>
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
          Accepto la{" "}
          <Link href="/privacy" className="text-emerald-400 underline-offset-2 hover:underline">
            política de privacitat
          </Link>{" "}
          i el tractament de les meves dades per rebre informació sobre els serveis d'empentIA. *
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
        {sending ? "Enviant…" : "Sol·licitar activació"}
        {!sending && <ArrowRight className="h-4 w-4" />}
      </button>

      <p className="text-center text-xs text-slate-500">
        Sense permanència · Resposta en menys de 24h · IVA no inclòs als preus
      </p>
    </form>
  );
}

// ─── Pricing Table ─────────────────────────────────────────────────────────────

const tooltips: Record<string, string> = {
  "gestio-coneixement": "Manual = tu ens envies la info. Automàtic = sincronització programada des de la teva botiga.",
  "font-informacio": "Manual = text i fitxers. Web = scraping de la teva web. API eCommerce = connexió directa amb WooCommerce o PrestaShop.",
  "personalitzacio-visual": "Bàsica = color principal. Estàndard = colors, avatar i posició. Completa = CSS custom, branding total, integrat al disseny de la teva web.",
  "multi-agent": "Agents separats per a departaments, botigues o marques, cadascun amb el seu catàleg i personalitat.",
  "respostes-rapides": "Botons clicables que l'agent suggereix durant la conversa per facilitar la interacció.",
  "alertes-lead": "Notificació quan un visitant deixa les seves dades o mostra interès de compra.",
  "pressupostos": "L'agent genera i envia pressupostos per email amb productes, preus, IVA i total.",
  "integracio-carret": "L'agent afegeix productes al carret real de la teva botiga. Compatible WooCommerce i PrestaShop.",
  "exportacio-leads": "CSV = descàrrega manual. Webhook = enviament automàtic en temps real a la teva eina.",
  "informe-mensual": "Resum d'activitat: converses, leads, productes més consultats, rendiment de l'agent.",
  "suport-impl": "Documentació = guies i tutorials. Assistida = configurem amb tu. Dedicada = configuració completa per part nostra amb prioritat.",
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
  { label: "Converses i ús", isHeader: true, starter: { type: "text", val: "" }, pro: { type: "text", val: "" }, business: { type: "text", val: "" }, custom: { type: "text", val: "" } },
  { label: "Converses incloses/mes", starter: { type: "text", val: "50" }, pro: { type: "text", val: "100" }, business: { type: "text", val: "200" }, custom: { type: "text", val: "A mida" } },
  { label: "Extra per conversa", starter: { type: "text", val: "0,25€" }, pro: { type: "text", val: "0,25€" }, business: { type: "text", val: "0,25€" }, custom: { type: "text", val: "A mida" } },
  { label: "Usuaris del panell", starter: { type: "text", val: "1" }, pro: { type: "text", val: "3" }, business: { type: "text", val: "5" }, custom: { type: "text", val: "Il·limitats" } },
  { label: "Catàleg i coneixement", isHeader: true, starter: { type: "text", val: "" }, pro: { type: "text", val: "" }, business: { type: "text", val: "" }, custom: { type: "text", val: "" } },
  { label: "Gestió del coneixement", tooltip: "gestio-coneixement", starter: { type: "text", val: "Manual" }, pro: { type: "text", val: "Automàtic" }, business: { type: "text", val: "Automàtic" }, custom: { type: "text", val: "A mida" } },
  { label: "Font d'informació", tooltip: "font-informacio", starter: { type: "text", val: "Manual + Web" }, pro: { type: "text", val: "+ API eCommerce" }, business: { type: "text", val: "+ API eCommerce" }, custom: { type: "text", val: "A mida" } },
  { label: "Agent i personalització", isHeader: true, starter: { type: "text", val: "" }, pro: { type: "text", val: "" }, business: { type: "text", val: "" }, custom: { type: "text", val: "" } },
  { label: "Personalització visual", tooltip: "personalitzacio-visual", starter: { type: "text", val: "Bàsica" }, pro: { type: "text", val: "Estàndard" }, business: { type: "text", val: "Completa" }, custom: { type: "text", val: "Total" } },
  { label: "Multi-agent", tooltip: "multi-agent", starter: { type: "check", val: false }, pro: { type: "text", val: "2 departaments" }, business: { type: "text", val: "4 departaments" }, custom: { type: "text", val: "Il·limitats" } },
  { label: "Idiomes actius", starter: { type: "text", val: "2" }, pro: { type: "text", val: "4" }, business: { type: "text", val: "Il·limitats" }, custom: { type: "text", val: "Il·limitats" } },
  { label: "Respostes ràpides", tooltip: "respostes-rapides", starter: { type: "text", val: "3 fixes" }, pro: { type: "text", val: "Il·limitades" }, business: { type: "text", val: "Il·limitades", soon: true }, custom: { type: "text", val: "Il·limitades" } },
  { label: "Accions comercials", isHeader: true, starter: { type: "text", val: "" }, pro: { type: "text", val: "" }, business: { type: "text", val: "" }, custom: { type: "text", val: "" } },
  { label: "Alertes per lead", tooltip: "alertes-lead", starter: { type: "text", val: "Email" }, pro: { type: "text", val: "Email + panell" }, business: { type: "text", val: "Email + panell + webhook", soon: true }, custom: { type: "text", val: "A mida" } },
  { label: "Pressupostos automàtics", tooltip: "pressupostos", starter: { type: "check", val: false }, pro: { type: "check", val: true }, business: { type: "check", val: true }, custom: { type: "check", val: true } },
  { label: "Integració carret", tooltip: "integracio-carret", starter: { type: "check", val: false }, pro: { type: "check", val: true }, business: { type: "check", val: true }, custom: { type: "check", val: true } },
  { label: "Dades i historial", isHeader: true, starter: { type: "text", val: "" }, pro: { type: "text", val: "" }, business: { type: "text", val: "" }, custom: { type: "text", val: "" } },
  { label: "Historial de converses", starter: { type: "text", val: "60 dies" }, pro: { type: "text", val: "180 dies" }, business: { type: "text", val: "Complet" }, custom: { type: "text", val: "Complet" } },
  { label: "Mètriques i analytics", starter: { type: "text", val: "Bàsiques" }, pro: { type: "text", val: "Completes" }, business: { type: "text", val: "Completes + exportació" }, custom: { type: "text", val: "Completes" } },
  { label: "Exportació de leads", tooltip: "exportacio-leads", starter: { type: "text", val: "CSV manual" }, pro: { type: "text", val: "CSV + webhook", soon: true }, business: { type: "text", val: "CSV + webhook + CRM", soon: true }, custom: { type: "text", val: "A mida" } },
  { label: "Informe mensual", tooltip: "informe-mensual", starter: { type: "check", val: false }, pro: { type: "text", val: "PDF automàtic", soon: true }, business: { type: "text", val: "PDF + reunió trimestral", soon: true }, custom: { type: "text", val: "A mida" } },
  { label: "Suport", isHeader: true, starter: { type: "text", val: "" }, pro: { type: "text", val: "" }, business: { type: "text", val: "" }, custom: { type: "text", val: "" } },
  { label: "Suport implementació", tooltip: "suport-impl", starter: { type: "text", val: "Documentació + ticket" }, pro: { type: "text", val: "Implementació assistida" }, business: { type: "text", val: "Prioritària + dedicada" }, custom: { type: "text", val: "Dedicat" } },
  { label: "SLA resposta suport", starter: { type: "text", val: "48h" }, pro: { type: "text", val: "24h" }, business: { type: "text", val: "4h" }, custom: { type: "text", val: "A acordar" } },
];

function CellContent({ cell, soon }: { cell: CellValue; soon?: boolean }) {
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
      {(cell.soon || soon) && <Badge text="Properament" />}
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
              { name: "Personalitzat", price: "Contacta'ns", highlight: false },
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
                        Més popular
                      </span>
                    </div>
                  )}
                  <div className="mb-1 font-bold text-slate-50">{name}</div>
                  <div className={`text-2xl font-extrabold ${highlight ? "text-emerald-400" : "text-slate-200"}`}>
                    {price}
                    {price !== "Contacta'ns" && <span className="text-base font-normal text-slate-500">/mes</span>}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-500">IVA no inclòs</div>
                  <button
                    onClick={() => onSelectPlan(name === "Personalitzat" ? "" : (name as Pla))}
                    className={`mt-4 w-full rounded-lg py-2 text-sm font-semibold transition ${
                      highlight
                        ? "bg-emerald-500 text-white hover:bg-emerald-400"
                        : "border border-slate-700 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400"
                    }`}
                  >
                    {name === "Personalitzat" ? "Parlem" : "Activa ara"}
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
    q: "Quant triga a estar operatiu?",
    a: "En 1-2 dies laborables. Nosaltres ens encarreguem de tota la configuració: l'agent, el coneixement del teu catàleg i la integració a la teva web. Tu només ens expliques el negoci.",
  },
  {
    q: "Cal saber programar per instal·lar-lo?",
    a: "No. L'agent s'integra amb una sola línia de codi (un script) que t'enviem nosaltres. Si necessites ajuda, el nostre equip ho fa per tu.",
  },
  {
    q: "És compatible amb la meva plataforma?",
    a: "Sí, funciona amb WooCommerce, PrestaShop, Shopify, webs custom i qualsevol plataforma que accepti HTML. Les funcionalitats d'integració profunda (carret, estoc en temps real) estan disponibles des del pla Pro amb WooCommerce i PrestaShop.",
  },
  {
    q: "Com aprèn el catàleg de productes?",
    a: "Al pla Starter, tu ens envies la informació (fitxers, PDFs, texts). Als plans Pro i Business, sincronitzem directament amb la teva botiga via API per tenir el catàleg sempre actualitzat.",
  },
  {
    q: "Puc cancel·lar quan vulgui?",
    a: "Sí. Subscripció mensual, sense permanència mínima. Pots cancel·lar en qualsevol moment des del teu panell.",
  },
  {
    q: "Com gestiona les dades dels meus clients? Compleix el RGPD?",
    a: "Sí. Les converses es processen i emmagatzemen a servidors europeus. L'agent no desa dades personals sense consentiment. T'ajudem a configurar els textos legals necessaris per al teu widget.",
  },
  {
    q: "Quina diferència hi ha amb un chatbot de FAQs tradicional?",
    a: "Un chatbot de FAQs respon preguntes fixes que tu has programat. L'agent d'empentIA entén el context, busca al catàleg en temps real, pot negociar, generar pressupostos i detectar l'interès de compra. És un agent comercial, no un menú de respostes.",
  },
  {
    q: "Puc provar-lo abans de contractar?",
    a: "Sí. Prova el widget de demostració en aquesta mateixa pàgina. Si vols una demo amb el teu catàleg real, sol·licita-la i en 48h tens el teu agent configurat per provar-lo.",
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
    // Widget injectat des d'app.empentia.com
    const script = document.createElement("script");
    script.src = "https://app.empentia.com/widget/webchat.js";
    script.setAttribute("data-instance-key", "empentia-webchat-landing");
    script.setAttribute("data-mode", "embedded");
    script.setAttribute("data-container", "webchat-demo-container");
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
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/60" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <div className="h-3 w-3 rounded-full bg-green-500/60" />
        </div>
        <span className="ml-2 text-xs text-slate-500">La teva botiga online</span>
      </div>
      {/* Demo container */}
      <div
        id="webchat-demo-container"
        ref={containerRef}
        className="min-h-[420px] bg-gradient-to-br from-slate-900 to-slate-950 p-6 md:p-8"
      >
        {/* Fallback visual mentre carrega */}
        <div className="flex h-full min-h-[380px] flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-2 ring-emerald-500/30">
            <MessageCircle className="h-8 w-8 text-emerald-400" />
          </div>
          <div>
            <p className="font-semibold text-slate-200">Agent empentIA</p>
            <p className="mt-1 text-sm text-slate-500">Pregunta'm sobre el servei, funcionalitats o preus</p>
          </div>
          <div className="mt-2 flex gap-2 flex-wrap justify-center">
            {["Com funciona?", "Quant costa?", "Quins plans hi ha?"].map((q) => (
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

export default function WebchatLandingCA() {
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
      {/* Background glows */}
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
            {/* Lang switcher */}
            <div className="hidden items-center gap-1 text-sm md:flex">
              <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 font-semibold text-emerald-400">CA</span>
              <Link href="/es/webchat" className="rounded-md px-2.5 py-1 text-slate-500 hover:text-slate-300 transition">
                ES
              </Link>
            </div>
            <a
              href="#demo"
              className="hidden text-sm font-medium text-slate-400 transition hover:text-emerald-400 md:block"
            >
              Demo
            </a>
            <a
              href="#preus"
              className="hidden text-sm font-medium text-slate-400 transition hover:text-emerald-400 md:block"
            >
              Preus
            </a>
            <button
              onClick={() => scrollToForm()}
              className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500/20"
            >
              Sol·licitar demo
            </button>
          </div>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-sm text-emerald-400">
            <Sparkles className="h-4 w-4" />
            Agent comercial IA per a botigues online
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            El teu millor comercial
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              treballa 24/7
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 md:text-xl">
            Un agent IA que coneix el teu catàleg, assessora, genera pressupostos i tanca vendes.{" "}
            <span className="text-slate-300">Sense hores de feina. Sense descans.</span>
          </p>

          {/* 3 xifres clau */}
          <div className="mb-10 flex flex-wrap justify-center gap-8 text-center">
            {[
              { val: "24/7", label: "Disponible sempre" },
              { val: "<1s", label: "Temps de resposta" },
              { val: "<0,10€", label: "Per conversa" },
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
              Prova la demo
            </a>
            <a
              href="#preus"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3.5 text-base font-medium text-slate-300 transition hover:border-emerald-500/40 hover:text-emerald-400"
            >
              Veure plans i preus
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Social Proof Bar ── */}
      <section className="relative border-y border-slate-800/60 bg-slate-900/30 py-8">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 text-sm font-medium text-slate-500">Botigues online, empreses de seguretat i distribuïdores ja l'utilitzen</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { name: "Botiga de ciclisme", detail: "+630 productes" },
              { name: "Sistemes de seguretat", detail: "Productes configurables" },
              { name: "Distribuïdora B2B", detail: "Catàleg multiidioma" },
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
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">La teva botiga perd vendes cada nit</h2>
            <p className="text-slate-400">Mentre dormes, els teus clients fan preguntes que no rep resposta.</p>
          </div>
          <div className="space-y-3">
            {[
              "Un client pregunta per un producte a les 11 de la nit. No rep resposta. Compra a la competència.",
              "El teu equip de vendes dedica hores a respondre les mateixes preguntes bàsiques del catàleg.",
              "No saps quins productes interessen més ni quins dubtes frenen la compra.",
              "Tens un formulari de contacte, però la conversió és baixa i el seguiment, manual.",
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
            L'agent empentIA és la solució:{" "}
            <span className="font-semibold text-emerald-400">disponible 24/7, coneix el teu catàleg i tanca vendes.</span>
          </p>
        </div>
      </section>

      {/* ── Demo ── */}
      <section id="demo" className="relative py-16 px-6 scroll-mt-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">Prova'l ara, en viu</h2>
            <p className="text-slate-400">
              Pregunta sobre el servei, funcionalitats o preus. L'agent respon en temps real.
            </p>
          </div>
          <WebchatDemo />
        </div>
      </section>

      {/* ── Funcionalitats ── */}
      <section className="relative py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">Tot el que necessites per vendre més</h2>
            <p className="text-slate-400">Vuit capacitats, un sol agent.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Bot,
                title: "Cerca intel·ligent",
                desc: "Entén el que el client busca i troba el producte adequat al catàleg, fins i tot si escriu malament.",
              },
              {
                icon: ShoppingCart,
                title: "Afegeix al carret",
                desc: "L'agent afegeix productes directament al carret de la teva botiga. Compatible WooCommerce i PrestaShop.",
              },
              {
                icon: FileText,
                title: "Pressupostos automàtics",
                desc: "Genera i envia pressupostos per email amb productes, quantitats, IVA i total en segons.",
              },
              {
                icon: Users,
                title: "Captació de leads",
                desc: "Detecta interès de compra, recull dades i escala al teu equip els clients que volen parlar.",
              },
              {
                icon: Zap,
                title: "Integració senzilla",
                desc: "Una sola línia de codi. Funciona amb qualsevol web i plataforma eCommerce.",
              },
              {
                icon: Star,
                title: "Personalització total",
                desc: "Colors, avatar, posició, CSS custom. L'agent s'integra com si fos part del disseny de la teva web.",
              },
              {
                icon: Globe,
                title: "Multiidioma automàtic",
                desc: "Detecta l'idioma del client i respon en català, castellà, anglès o el que necessitis.",
              },
              {
                icon: BarChart3,
                title: "Mètriques i analytics",
                desc: "Saps quins productes interessen, quins dubtes frenen la compra i quants leads genera l'agent.",
              },
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
      <section id="preus" className="relative py-16 px-6 scroll-mt-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">Plans i preus transparents</h2>
            <p className="text-slate-400">Sense sorpreses. Sense permanència. Cancel·la quan vulguis.</p>
          </div>
          <PricingTable onSelectPlan={(pla) => scrollToForm(pla)} />
        </div>
      </section>

      {/* ── Casos d'ús reals ── */}
      <section className="relative py-16 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">Casos d'ús reals</h2>
            <p className="text-slate-400">Com utilitzen l'agent els nostres clients.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                sector: "Ciclisme",
                detail: "+630 productes",
                situation: "Clients que pregunten per talla, compatibilitat i stock a tota hora.",
                what: "L'agent respon en temps real, filtra per talles disponibles i afegeix la bicicleta al carret.",
                result: "30% menys consultes manuals. Vendes completades fora d'horari comercial.",
              },
              {
                sector: "Seguretat",
                detail: "Productes configurables",
                situation: "Clients que necessiten kits a mida segons instal·lació i pressupost.",
                what: "L'agent entén els requisits, proposa el kit adequat i genera el pressupost automàticament.",
                result: "Pressupostos enviats en <1 minut. Temps del comercial reduït a la meitat.",
              },
              {
                sector: "Distribució B2B",
                detail: "Catàleg multiidioma",
                situation: "Compradors internacionals que consulten disponibilitat i preus en el seu idioma.",
                what: "L'agent detecta l'idioma, consulta l'estoc i escala el lead al gestor d'exportació.",
                result: "Cobertura 24/7 en 3 idiomes sense contractar personal addicional.",
              },
            ].map(({ sector, detail, situation, what, result }) => (
              <div key={sector} className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
                <div>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-emerald-500">{sector}</div>
                  <div className="text-sm text-slate-500">{detail}</div>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-slate-400">Situació: </span>
                    <span className="text-slate-400">{situation}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-300">Què fa l'agent: </span>
                    <span className="text-slate-300">{what}</span>
                  </div>
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                    <span className="font-semibold text-emerald-400">Resultat: </span>
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
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">El cost d'un agent humà vs. empentIA</h2>
            <p className="text-slate-400">Números clars, sense lletra petita.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/30 p-8">
              <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-500">
                Agent humà comercial
              </div>
              <div className="mb-6 text-4xl font-extrabold text-slate-300">
                1.800–2.500€
                <span className="text-lg font-normal text-slate-500">/mes</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-400">
                {["Disponible 8h/dia, 5 dies/setmana", "Vacances, baixes, formació", "Rendiment variable", "Escalat = contractar més personal"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <X className="h-4 w-4 text-slate-600" />{t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-500/5 p-8">
              <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-emerald-500">
                Agent empentIA
              </div>
              <div className="mb-6 text-4xl font-extrabold text-emerald-400">
                49–149€
                <span className="text-lg font-normal text-slate-500">/mes</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                {["Disponible 24/7, 365 dies/any", "Sense vacances ni baixes", "Rendiment consistent i mesurable", "Escala automàticament"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-slate-500">
            El cost per conversa és de menys de 0,10€. Un agent humà costa entre 10 i 30€ per conversa de suport.
          </p>
        </div>
      </section>

      {/* ── Com s'activa ── */}
      <section className="relative py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">Operatiu en 1-2 dies laborables</h2>
            <p className="text-slate-400">Nosaltres ens encarreguem de tot. Tu ens expliques el negoci.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { num: "1", title: "Sol·licita", desc: "Omple el formulari amb les dades de la teva botiga. En menys de 24h, t'enviem una proposta personalitzada." },
              { num: "2", title: "Configurem", desc: "El nostre equip configura l'agent amb el teu catàleg, la teva identitat visual i les teves instruccions comercials." },
              { num: "3", title: "Activa i ven", desc: "Una línia de codi i el teu agent comercial és operatiu. Monitoritza converses i resultats des del panell." },
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
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">Preguntes freqüents</h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* ── CTA Final + Form ── */}
      <section ref={ctaRef} className="relative py-16 px-6 scroll-mt-20">
        <div className="mx-auto max-w-2xl">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-slate-900/60 p-8 md:p-12">
            <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="relative">
              <div className="mb-8 text-center">
                <h2 className="mb-3 text-2xl font-bold md:text-3xl">
                  El teu agent comercial llest en 48 hores
                </h2>
                <p className="text-slate-400">
                  Omple el formulari i t'enviem una proposta personalitzada. Sense compromís.
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
            <p className="text-sm text-slate-500">© 2026 empentIA. Tots els drets reservats.</p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-slate-500 transition hover:text-slate-300">
                Política de privacitat
              </Link>
              <Link href="/legal" className="text-slate-500 transition hover:text-slate-300">
                Avís legal
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
