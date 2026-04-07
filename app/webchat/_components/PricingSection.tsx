"use client";

import { useState } from "react";
import { Check, X, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingSectionProps {
  lang: "ca" | "es";
  onContractar: (pla: "Starter" | "Pro" | "Business") => void;
}

// Tooltip component
function Tooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block">
      <button
        type="button"
        className="ml-1 inline-flex cursor-help items-center text-slate-600 hover:text-slate-400"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        aria-label="Més informació"
      >
        <Info className="h-3 w-3" />
      </button>
      {open && (
        <span className="absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-left text-xs text-slate-300 shadow-xl">
          {text}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-700" />
        </span>
      )}
    </span>
  );
}

// Badge properament
function SoonBadge({ lang }: { lang: "ca" | "es" }) {
  return (
    <span className="ml-1.5 inline-flex items-center rounded-full bg-emerald-900/40 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400 ring-1 ring-emerald-500/30">
      {lang === "ca" ? "Properament" : "Próximamente"}
    </span>
  );
}

type RowValue = string | boolean | null | { value: string; soon?: boolean };

interface PricingRow {
  label: string;
  tooltip?: string;
  starter: RowValue;
  pro: RowValue;
  business: RowValue;
  isHeader?: boolean;
}

const tooltips = {
  ca: {
    gestio_coneixement: "Manual = tu ens envies la info. Automàtic = sincronització programada des de la teva botiga.",
    font_informacio: "Manual = text i fitxers. Web = scraping de la teva web. API eCommerce = connexió directa amb WooCommerce o PrestaShop.",
    personalitzacio: "Bàsica = color principal. Estàndard = colors, avatar i posició. Completa = CSS custom, branding total.",
    multi_agent: "Agents separats per a departaments, botigues o marques, cadascun amb el seu catàleg i personalitat.",
    respostes_rapides: "Botons clicables que l'agent suggereix durant la conversa per facilitar la interacció.",
    alertes_lead: "Notificació quan un visitant deixa les seves dades o mostra interès de compra.",
    pressupostos: "L'agent genera i envia pressupostos per email amb productes, preus, IVA i total.",
    carret: "L'agent afegeix productes al carret real de la teva botiga. Compatible WooCommerce i PrestaShop.",
    exportacio_leads: "CSV = descàrrega manual. Webhook = enviament automàtic en temps real a la teva eina.",
    informe: "Resum mensual d'activitat: converses, leads, productes més consultats, rendiment de l'agent.",
    suport: "Documentació = guies i tutorials. Assistida = configurem amb tu. Dedicada = configuració completa per part nostra.",
  },
  es: {
    gestio_coneixement: "Manual = tú nos envías la info. Automático = sincronización programada desde tu tienda.",
    font_informacio: "Manual = texto y archivos. Web = scraping de tu web. API eCommerce = conexión directa con WooCommerce o PrestaShop.",
    personalitzacio: "Básica = color principal. Estándar = colores, avatar y posición. Completa = CSS custom, branding total.",
    multi_agent: "Agentes separados para departamentos, tiendas o marcas, cada uno con su catálogo y personalidad.",
    respostes_rapides: "Botones clicables que el agente sugiere durante la conversación para facilitar la interacción.",
    alertes_lead: "Notificación cuando un visitante deja sus datos o muestra interés de compra.",
    pressupostos: "El agente genera y envía presupuestos por email con productos, precios, IVA y total.",
    carret: "El agente añade productos al carrito real de tu tienda. Compatible WooCommerce y PrestaShop.",
    exportacio_leads: "CSV = descarga manual. Webhook = envío automático en tiempo real a tu herramienta.",
    informe: "Resumen mensual de actividad: conversaciones, leads, productos más consultados, rendimiento del agente.",
    suport: "Documentación = guías y tutoriales. Asistida = configuramos contigo. Dedicada = configuración completa por nuestra parte.",
  },
};

function buildRows(lang: "ca" | "es"): PricingRow[] {
  const tt = tooltips[lang];
  const isCA = lang === "ca";

  return [
    // Header grup
    { label: isCA ? "Converses i ús" : "Conversaciones y uso", isHeader: true, starter: "", pro: "", business: "" },
    { label: isCA ? "Converses incloses/mes" : "Conversaciones incluidas/mes", starter: "50", pro: "100", business: "200" },
    { label: isCA ? "Extra per conversa addicional" : "Extra por conversación adicional", starter: "0,25€", pro: "0,25€", business: "0,25€" },
    { label: isCA ? "Usuaris del panell" : "Usuarios del panel", starter: "1", pro: "3", business: "5" },

    { label: isCA ? "Catàleg i coneixement" : "Catálogo y conocimiento", isHeader: true, starter: "", pro: "", business: "" },
    {
      label: isCA ? "Gestió del coneixement" : "Gestión del conocimiento",
      tooltip: tt.gestio_coneixement,
      starter: isCA ? "Manual" : "Manual",
      pro: isCA ? "Automàtic" : "Automático",
      business: isCA ? "Automàtic" : "Automático",
    },
    {
      label: isCA ? "Font d'informació" : "Fuente de información",
      tooltip: tt.font_informacio,
      starter: isCA ? "Manual + Web" : "Manual + Web",
      pro: "+ API eCommerce",
      business: "+ API eCommerce",
    },

    { label: isCA ? "Agent i personalització" : "Agente y personalización", isHeader: true, starter: "", pro: "", business: "" },
    {
      label: isCA ? "Personalització visual" : "Personalización visual",
      tooltip: tt.personalitzacio,
      starter: isCA ? "Bàsica (colors)" : "Básica (colores)",
      pro: isCA ? "Estàndard" : "Estándar",
      business: isCA ? "Completa (CSS custom)" : "Completa (CSS custom)",
    },
    {
      label: "Multi-agent",
      tooltip: tt.multi_agent,
      starter: false,
      pro: isCA ? "1 agent extra" : "1 agente extra",
      business: isCA ? "Fins a 3 agents" : "Hasta 3 agentes",
    },
    { label: isCA ? "Idiomes actius" : "Idiomas activos", starter: "2", pro: "4", business: isCA ? "Il·limitats" : "Ilimitados" },
    {
      label: isCA ? "Respostes ràpides" : "Respuestas rápidas",
      tooltip: tt.respostes_rapides,
      starter: isCA ? "3 fixes" : "3 fijas",
      pro: isCA ? "Il·limitades" : "Ilimitadas",
      business: { value: isCA ? "Il·limitades + dinàmiques" : "Ilimitadas + dinámicas", soon: true },
    },

    { label: isCA ? "Accions comercials" : "Acciones comerciales", isHeader: true, starter: "", pro: "", business: "" },
    {
      label: isCA ? "Alertes per lead rebut" : "Alertas por lead recibido",
      tooltip: tt.alertes_lead,
      starter: "Email",
      pro: isCA ? "Email + panell" : "Email + panel",
      business: { value: isCA ? "Email + panell + webhook" : "Email + panel + webhook", soon: true },
    },
    {
      label: isCA ? "Pressupostos automàtics" : "Presupuestos automáticos",
      tooltip: tt.pressupostos,
      starter: false,
      pro: true,
      business: true,
    },
    {
      label: isCA ? "Integració carret" : "Integración carrito",
      tooltip: tt.carret,
      starter: false,
      pro: true,
      business: true,
    },

    { label: isCA ? "Dades i historial" : "Datos e historial", isHeader: true, starter: "", pro: "", business: "" },
    {
      label: isCA ? "Historial de converses" : "Historial de conversaciones",
      starter: isCA ? "60 dies" : "60 días",
      pro: isCA ? "180 dies" : "180 días",
      business: isCA ? "Complet" : "Completo",
    },
    {
      label: isCA ? "Mètriques i analytics" : "Métricas y analytics",
      starter: isCA ? "Bàsiques" : "Básicas",
      pro: isCA ? "Completes" : "Completas",
      business: isCA ? "Completes + exportació" : "Completas + exportación",
    },
    {
      label: isCA ? "Exportació de leads" : "Exportación de leads",
      tooltip: tt.exportacio_leads,
      starter: "CSV",
      pro: { value: "CSV + Webhook", soon: true },
      business: { value: "CSV + Webhook + CRM", soon: true },
    },
    {
      label: isCA ? "Informe mensual" : "Informe mensual",
      tooltip: tt.informe,
      starter: false,
      pro: { value: "PDF automàtic", soon: true },
      business: { value: "PDF + reunió trimestral", soon: true },
    },

    { label: "Suport", isHeader: true, starter: "", pro: "", business: "" },
    {
      label: isCA ? "Suport implementació" : "Soporte implementación",
      tooltip: tt.suport,
      starter: isCA ? "Documentació + ticket" : "Documentación + ticket",
      pro: isCA ? "Implementació assistida" : "Implementación asistida",
      business: isCA ? "Implementació dedicada" : "Implementación dedicada",
    },
    {
      label: isCA ? "SLA resposta suport" : "SLA respuesta soporte",
      starter: "48h",
      pro: "24h",
      business: "4h",
    },
  ];
}

function renderValue(val: RowValue, lang: "ca" | "es") {
  if (val === true) return <Check className="mx-auto h-4 w-4 text-emerald-400" />;
  if (val === false) return <X className="mx-auto h-4 w-4 text-slate-700" />;
  if (val === "" || val === null) return null;
  if (typeof val === "object") {
    return (
      <span className="inline-flex flex-wrap items-center justify-center gap-1 text-slate-300">
        {val.value}
        {val.soon && <SoonBadge lang={lang} />}
      </span>
    );
  }
  return <span className="text-slate-300">{val}</span>;
}

const plans = {
  ca: [
    { key: "Starter" as const, name: "Starter", price: "49€", period: "/mes", highlight: false, cta: "Activa ara" },
    { key: "Pro" as const, name: "Pro", price: "79€", period: "/mes", highlight: true, cta: "Activa ara" },
    { key: "Business" as const, name: "Business", price: "149€", period: "/mes", highlight: false, cta: "Activa ara" },
  ],
  es: [
    { key: "Starter" as const, name: "Starter", price: "49€", period: "/mes", highlight: false, cta: "Actívalo ahora" },
    { key: "Pro" as const, name: "Pro", price: "79€", period: "/mes", highlight: true, cta: "Actívalo ahora" },
    { key: "Business" as const, name: "Business", price: "149€", period: "/mes", highlight: false, cta: "Actívalo ahora" },
  ],
};

const uiText = {
  ca: {
    eyebrow: "Plans i preus",
    title: "Transparent des del primer dia.",
    vatNote: "Preus sense IVA",
    popular: "Més popular",
    custom: {
      name: "Personalitzat",
      price: "A mida",
      desc: "Per a cadenes, franquícies o necessitats específiques. Agents, converses i funcionalitats sense límit.",
      cta: "Parlem",
    },
    tableToggle: "Veure comparativa completa",
    tableToggleClose: "Tancar comparativa",
  },
  es: {
    eyebrow: "Planes y precios",
    title: "Transparente desde el primer día.",
    vatNote: "Precios sin IVA",
    popular: "Más popular",
    custom: {
      name: "Personalizado",
      price: "A medida",
      desc: "Para cadenas, franquicias o necesidades específicas. Agentes, conversaciones y funcionalidades sin límite.",
      cta: "Hablemos",
    },
    tableToggle: "Ver comparativa completa",
    tableToggleClose: "Cerrar comparativa",
  },
};

export function PricingSection({ lang, onContractar }: PricingSectionProps) {
  const t = uiText[lang];
  const planList = plans[lang];
  const rows = buildRows(lang);
  const [showTable, setShowTable] = useState(false);

  return (
    <section id="pricing" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-500">
            {t.eyebrow}
          </p>
          <h2 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
            {t.title}
          </h2>
          <p className="text-sm text-slate-600">{t.vatNote}</p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          {planList.map((plan) => (
            <div
              key={plan.key}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                plan.highlight
                  ? "border-emerald-500/50 bg-emerald-950/30 shadow-lg shadow-emerald-900/20"
                  : "border-slate-800 bg-slate-900/50"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-semibold text-white">
                    {t.popular}
                  </span>
                </div>
              )}
              <h3 className="mb-1 text-lg font-bold text-white">{plan.name}</h3>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-sm text-slate-500">{plan.period}</span>
              </div>
              <Button
                onClick={() => onContractar(plan.key)}
                className={`mt-auto w-full ${
                  plan.highlight
                    ? "bg-emerald-600 text-white hover:bg-emerald-500"
                    : "border border-slate-700 bg-transparent text-slate-300 hover:border-emerald-500 hover:text-emerald-400"
                }`}
                variant={plan.highlight ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </div>
          ))}

          {/* Personalitzat */}
          <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="mb-1 text-lg font-bold text-white">{t.custom.name}</h3>
            <div className="mb-3 flex items-baseline">
              <span className="text-xl font-bold text-slate-400">{t.custom.price}</span>
            </div>
            <p className="mb-6 text-xs leading-relaxed text-slate-500">{t.custom.desc}</p>
            <Button
              variant="outline"
              className="mt-auto w-full border-slate-700 text-slate-300 hover:border-emerald-500 hover:text-emerald-400"
              onClick={() => document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t.custom.cta} <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Toggle taula completa */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowTable((v) => !v)}
            className="text-sm text-emerald-500 underline-offset-4 hover:underline"
          >
            {showTable ? t.tableToggleClose : t.tableToggle}
          </button>
        </div>

        {/* Taula comparativa */}
        {showTable && (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80">
                  <th className="py-3 pl-6 text-left font-medium text-slate-500" />
                  {planList.map((p) => (
                    <th key={p.key} className={`py-3 text-center font-semibold ${p.highlight ? "text-emerald-400" : "text-white"}`}>
                      {p.name}
                    </th>
                  ))}
                  <th className="py-3 text-center font-semibold text-slate-400">
                    {t.custom.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) =>
                  row.isHeader ? (
                    <tr key={i} className="border-t border-slate-800 bg-slate-900/30">
                      <td colSpan={5} className="py-2 pl-6 text-xs font-semibold uppercase tracking-wider text-slate-600">
                        {row.label}
                      </td>
                    </tr>
                  ) : (
                    <tr key={i} className="border-t border-slate-800/50 hover:bg-slate-900/30">
                      <td className="py-3 pl-6 text-slate-400">
                        {row.label}
                        {row.tooltip && <Tooltip text={row.tooltip} />}
                      </td>
                      <td className="py-3 text-center">{renderValue(row.starter, lang)}</td>
                      <td className="py-3 text-center">{renderValue(row.pro, lang)}</td>
                      <td className="py-3 text-center">{renderValue(row.business, lang)}</td>
                      <td className="py-3 text-center text-slate-600">—</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
