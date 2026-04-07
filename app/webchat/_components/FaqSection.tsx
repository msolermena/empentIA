"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqSectionProps {
  lang: "ca" | "es";
}

const content = {
  ca: {
    eyebrow: "Preguntes freqüents",
    title: "Tot el que necessites saber",
    titleEnd: "abans de decidir.",
    faqs: [
      {
        q: "Quant triga en estar operatiu?",
        a: "En 1-2 dies laborables. El nostre equip configura l'agent amb el teu catàleg i instruccions específiques. Tu no has de tocar cap codi.",
      },
      {
        q: "Funciona amb WooCommerce i PrestaShop?",
        a: "Sí. Tenim integració nativa amb WooCommerce i PrestaShop per a la sincronització del catàleg i l'addició al carret. Per a altres plataformes, usem web scraping o fitxers de catàleg.",
      },
      {
        q: "Puc cancel·lar quan vulgui?",
        a: "Sí, sense permanències. Pots cancel·lar en qualsevol moment des del teu panell. El servei continua fins al final del període facturat.",
      },
      {
        q: "Les converses estan incloses? Què passa si les supero?",
        a: "Cada pla inclou un nombre de converses mensuals (50, 100 o 200). Si les superes, es factura 0,25€ per conversa addicional. Mai tallem el servei.",
      },
      {
        q: "Les dades dels meus clients estan segures?",
        a: "Sí. Totes les dades es tracten sota RGPD, amb servidors a la UE. Mai compartim dades de clients amb tercers. Pots sol·licitar el DPA en qualsevol moment.",
      },
      {
        q: "Quina diferència hi ha entre els plans?",
        a: "Principalment: nombre de converses, profunditat de la integració (API vs manual), personalització visual i nivell de suport. El pla Pro afegeix pressupostos automàtics i integració de carret. El Business suma personalització CSS completa i SLA 4h.",
      },
      {
        q: "L'agent pot atendre en castellà i anglès?",
        a: "Sí. Detecta automàticament l'idioma del visitant i respon en el mateix idioma. No cal configuració addicional.",
      },
      {
        q: "Puc provar-lo abans de contractar?",
        a: "Sí. A la secció de demo d'aquesta pàgina pots parlar amb un agent real d'empentIA. Si vols veure'l configurat amb el teu catàleg específic, demana una demo personalitzada.",
      },
    ],
  },
  es: {
    eyebrow: "Preguntas frecuentes",
    title: "Todo lo que necesitas saber",
    titleEnd: "antes de decidir.",
    faqs: [
      {
        q: "¿Cuánto tarda en estar operativo?",
        a: "En 1-2 días laborables. Nuestro equipo configura el agente con tu catálogo e instrucciones específicas. Tú no tienes que tocar ningún código.",
      },
      {
        q: "¿Funciona con WooCommerce y PrestaShop?",
        a: "Sí. Tenemos integración nativa con WooCommerce y PrestaShop para la sincronización del catálogo y la adición al carrito. Para otras plataformas, usamos web scraping o archivos de catálogo.",
      },
      {
        q: "¿Puedo cancelar cuando quiera?",
        a: "Sí, sin permanencias. Puedes cancelar en cualquier momento desde tu panel. El servicio continúa hasta el final del período facturado.",
      },
      {
        q: "¿Las conversaciones están incluidas? ¿Qué pasa si las supero?",
        a: "Cada plan incluye un número de conversaciones mensuales (50, 100 o 200). Si las superas, se factura 0,25€ por conversación adicional. Nunca cortamos el servicio.",
      },
      {
        q: "¿Los datos de mis clientes están seguros?",
        a: "Sí. Todos los datos se tratan bajo RGPD, con servidores en la UE. Nunca compartimos datos de clientes con terceros. Puedes solicitar el DPA en cualquier momento.",
      },
      {
        q: "¿Qué diferencia hay entre los planes?",
        a: "Principalmente: número de conversaciones, profundidad de la integración (API vs manual), personalización visual y nivel de soporte. El plan Pro añade presupuestos automáticos e integración de carrito. El Business suma personalización CSS completa y SLA 4h.",
      },
      {
        q: "¿El agente puede atender en catalán e inglés?",
        a: "Sí. Detecta automáticamente el idioma del visitante y responde en el mismo idioma. No hace falta configuración adicional.",
      },
      {
        q: "¿Puedo probarlo antes de contratar?",
        a: "Sí. En la sección de demo de esta página puedes hablar con un agente real de empentIA. Si quieres verlo configurado con tu catálogo específico, solicita una demo personalizada.",
      },
    ],
  },
};

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-800">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-medium text-white">{q}</span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed text-slate-400">{a}</p>
      )}
    </div>
  );
}

export function FaqSection({ lang }: FaqSectionProps) {
  const t = content[lang];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-500">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t.title}{" "}
            <span className="text-slate-400">{t.titleEnd}</span>
          </h2>
        </div>

        <div>
          {t.faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
