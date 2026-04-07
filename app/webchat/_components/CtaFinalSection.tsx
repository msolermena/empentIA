"use client";

import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { createLandingLead } from "@/lib/api";
import { useState } from "react";

interface CtaFinalSectionProps {
  lang: "ca" | "es";
  onContractar: () => void;
}

const content = {
  ca: {
    eyebrow: "Comença avui",
    title: "El teu agent comercial",
    titleHighlight: "llest en 48 hores.",
    subtitle:
      "Prova'l sense compromís. Si vols parlar primer, reserva una trucada de 15 min amb el nostre equip.",
    cta1: "Activa el webchat ara",
    cta2: "Reservar trucada",
    contactTitle: "O escriu-nos directament",
    namePlaceholder: "Nom i empresa",
    emailPlaceholder: "El teu email",
    send: "Enviar",
    sending: "Enviant...",
    sent: "Missatge enviat! Et contactem aviat.",
    error: "Error en enviar. Torna-ho a provar o escriu-nos a hola@empentia.cat",
  },
  es: {
    eyebrow: "Empieza hoy",
    title: "Tu agente comercial",
    titleHighlight: "listo en 48 horas.",
    subtitle:
      "Pruébalo sin compromiso. Si quieres hablar primero, reserva una llamada de 15 min con nuestro equipo.",
    cta1: "Activa el webchat ahora",
    cta2: "Reservar llamada",
    contactTitle: "O escríbenos directamente",
    namePlaceholder: "Nombre y empresa",
    emailPlaceholder: "Tu email",
    send: "Enviar",
    sending: "Enviando...",
    sent: "¡Mensaje enviado! Te contactamos pronto.",
    error: "Error al enviar. Inténtalo de nuevo o escríbenos a hola@empentia.cat",
  },
};

// TODO: substituir per la URL real de Cal.com quan estigui disponible
const CAL_URL = "#cal-coming-soon";

export function CtaFinalSection({ lang, onContractar }: CtaFinalSectionProps) {
  const t = content[lang];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleQuickLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    setSendError(false);
    try {
      await createLandingLead({
        email,
        origen: "landing-webchat-cta-final",
        nom_contacte: name || undefined,
      });
      setSent(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="cta-final" className="px-6 py-32">
      <div className="mx-auto max-w-3xl text-center">
        {/* Glow */}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-500">
            {t.eyebrow}
          </p>
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            {t.title}{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </h2>
          <p className="mb-10 text-lg text-slate-400">{t.subtitle}</p>

          {/* CTAs principals */}
          <div className="mb-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              onClick={onContractar}
              className="min-w-[220px] bg-emerald-600 text-white hover:bg-emerald-500"
            >
              {t.cta1} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-w-[220px] border-slate-600 text-slate-300 hover:border-emerald-500 hover:text-emerald-400"
              onClick={() => {
                if (CAL_URL !== "#cal-coming-soon") {
                  window.open(CAL_URL, "_blank");
                }
              }}
              disabled={CAL_URL === "#cal-coming-soon"}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {t.cta2}
            </Button>
          </div>

          {/* Formulari ràpid */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
            <p className="mb-6 text-sm font-medium text-slate-400">{t.contactTitle}</p>
            {sent ? (
              <p className="text-sm text-emerald-400">{t.sent}</p>
            ) : (
              <>
              {sendError && (
                <p className="mb-3 text-sm text-red-400">{t.error}</p>
              )}
              <form onSubmit={handleQuickLead} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none"
                />
                <Button
                  type="submit"
                  disabled={sending}
                  className="bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-60 sm:w-auto"
                >
                  {sending ? t.sending : t.send}
                </Button>
              </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
