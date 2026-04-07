"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createLandingLead, type LandingLeadOrigen } from "@/lib/api";

interface ContractacioModalProps {
  lang: "ca" | "es";
  isOpen: boolean;
  onClose: () => void;
  plaInicial?: "Starter" | "Pro" | "Business";
}

const content = {
  ca: {
    title: "Sol·licita l'activació",
    subtitle: "Et contactem en menys de 24h amb la proposta.",
    nomEmpresa: "Nom de l'empresa",
    urlWeb: "URL de la web",
    nomContacte: "Nom de contacte",
    email: "Email",
    telefon: "Telèfon (opcional)",
    plataforma: "Plataforma eCommerce",
    plaLabel: "Pla seleccionat",
    trucada: "Vull una trucada prèvia de 15 min",
    rgpd: "Accepto el tractament de les meves dades per gestionar aquesta sol·licitud.",
    submit: "Sol·licitar activació",
    submitting: "Enviant...",
    successTitle: "Sol·licitud rebuda!",
    successDesc:
      "Revisarem la teva sol·licitud i et contactarem en menys de 24h amb una proposta personalitzada.",
    close: "Tancar",
    platforms: ["WooCommerce", "PrestaShop", "Shopify", "Web custom", "Altra"],
    plans: ["Starter", "Pro", "Business"],
    errors: {
      required: "Aquest camp és obligatori.",
      email: "Introdueix un email vàlid.",
      rgpd: "Has d'acceptar el tractament de dades.",
    },
  },
  es: {
    title: "Solicita la activación",
    subtitle: "Te contactamos en menos de 24h con la propuesta.",
    nomEmpresa: "Nombre de la empresa",
    urlWeb: "URL de la web",
    nomContacte: "Nombre de contacto",
    email: "Email",
    telefon: "Teléfono (opcional)",
    plataforma: "Plataforma eCommerce",
    plaLabel: "Plan seleccionado",
    trucada: "Quiero una llamada previa de 15 min",
    rgpd: "Acepto el tratamiento de mis datos para gestionar esta solicitud.",
    submit: "Solicitar activación",
    submitting: "Enviando...",
    successTitle: "¡Solicitud recibida!",
    successDesc:
      "Revisaremos tu solicitud y te contactaremos en menos de 24h con una propuesta personalizada.",
    close: "Cerrar",
    platforms: ["WooCommerce", "PrestaShop", "Shopify", "Web custom", "Otra"],
    plans: ["Starter", "Pro", "Business"],
    errors: {
      required: "Este campo es obligatorio.",
      email: "Introduce un email válido.",
      rgpd: "Debes aceptar el tratamiento de datos.",
    },
  },
};

export function ContractacioModal({
  lang,
  isOpen,
  onClose,
  plaInicial,
}: ContractacioModalProps) {
  const t = content[lang];
  const [form, setForm] = useState({
    nom_empresa: "",
    url_web: "",
    nom_contacte: "",
    email: "",
    telefon: "",
    plataforma: "" as "" | "WooCommerce" | "PrestaShop" | "Shopify" | "Web custom" | "Altra",
    pla: (plaInicial ?? "Pro") as "Starter" | "Pro" | "Business",
    trucada: false,
    rgpd: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Actualitza el pla si canvia desde fora
  useEffect(() => {
    if (plaInicial) setForm((f) => ({ ...f, pla: plaInicial }));
  }, [plaInicial]);

  // Tanca amb Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const set = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.nom_empresa.trim()) errs.nom_empresa = t.errors.required;
    if (!form.nom_contacte.trim()) errs.nom_contacte = t.errors.required;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = t.errors.email;
    if (!form.plataforma) errs.plataforma = t.errors.required;
    if (!form.rgpd) errs.rgpd = t.errors.rgpd;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const origen: LandingLeadOrigen = `landing-webchat-contractar-${form.pla.toLowerCase() as 'starter' | 'pro' | 'business'}`;
      await createLandingLead({
        email: form.email,
        origen,
        nom_empresa: form.nom_empresa,
        url_web: form.url_web || undefined,
        nom_contacte: form.nom_contacte,
        telefon: form.telefon || undefined,
        plataforma: form.plataforma || undefined,
        pla: form.pla,
        consentiment_rgpd: form.rgpd,
      });
      setSubmitted(true);
    } catch {
      setErrors({ submit: lang === "ca" ? "Error enviant. Torna-ho a provar." : "Error al enviar. Inténtalo de nuevo." });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none";
  const labelClass = "mb-1 block text-xs font-medium text-slate-400";
  const errorClass = "mt-1 text-xs text-red-400";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-600 hover:text-slate-400"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">{t.successTitle}</h3>
            <p className="text-sm text-slate-400">{t.successDesc}</p>
            <Button onClick={onClose} className="mt-4 bg-emerald-600 text-white hover:bg-emerald-500">
              {t.close}
            </Button>
          </div>
        ) : (
          <>
            <h2 className="mb-1 text-xl font-bold text-white">{t.title}</h2>
            <p className="mb-6 text-sm text-slate-400">{t.subtitle}</p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className={labelClass}>{t.nomEmpresa} *</label>
                <input className={inputClass} value={form.nom_empresa} onChange={(e) => set("nom_empresa", e.target.value)} placeholder="Botiga Example SL" />
                {errors.nom_empresa && <p className={errorClass}>{errors.nom_empresa}</p>}
              </div>

              <div>
                <label className={labelClass}>{t.urlWeb}</label>
                <input className={inputClass} value={form.url_web} onChange={(e) => set("url_web", e.target.value)} placeholder="https://labotiga.com" type="url" />
              </div>

              <div>
                <label className={labelClass}>{t.nomContacte} *</label>
                <input className={inputClass} value={form.nom_contacte} onChange={(e) => set("nom_contacte", e.target.value)} placeholder="Joan Garcia" />
                {errors.nom_contacte && <p className={errorClass}>{errors.nom_contacte}</p>}
              </div>

              <div>
                <label className={labelClass}>{t.email} *</label>
                <input className={inputClass} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="joan@labotiga.com" type="email" />
                {errors.email && <p className={errorClass}>{errors.email}</p>}
              </div>

              <div>
                <label className={labelClass}>{t.telefon}</label>
                <input className={inputClass} value={form.telefon} onChange={(e) => set("telefon", e.target.value)} placeholder="600 123 456" type="tel" />
              </div>

              <div>
                <label className={labelClass}>{t.plataforma} *</label>
                <select
                  className={inputClass}
                  value={form.plataforma}
                  onChange={(e) => set("plataforma", e.target.value)}
                >
                  <option value="">—</option>
                  {t.platforms.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {errors.plataforma && <p className={errorClass}>{errors.plataforma}</p>}
              </div>

              <div>
                <label className={labelClass}>{t.plaLabel}</label>
                <div className="flex gap-2">
                  {(["Starter", "Pro", "Business"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => set("pla", p)}
                      className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${
                        form.pla === p
                          ? "border-emerald-500 bg-emerald-950/50 text-emerald-400"
                          : "border-slate-700 text-slate-500 hover:border-slate-600"
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
                  checked={form.trucada}
                  onChange={(e) => set("trucada", e.target.checked)}
                  className="mt-0.5 accent-emerald-500"
                />
                <span className="text-sm text-slate-400">{t.trucada}</span>
              </label>

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.rgpd}
                  onChange={(e) => set("rgpd", e.target.checked)}
                  className="mt-0.5 accent-emerald-500"
                />
                <span className="text-sm text-slate-400">{t.rgpd}</span>
              </label>
              {errors.rgpd && <p className={errorClass}>{errors.rgpd}</p>}

              {errors.submit && (
                <p className="text-sm text-red-400">{errors.submit}</p>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-60"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> {t.submitting}
                  </span>
                ) : (
                  t.submit
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
