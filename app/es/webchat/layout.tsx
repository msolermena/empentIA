import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agente comercial IA 24/7 para tiendas online | empentIA Webchat",
  description:
    "El agente IA de empentIA conoce tu catálogo, asesora, genera presupuestos y cierra ventas 24/7. Planes desde 49€/mes. Sin permanencia.",
  alternates: {
    canonical: "/es/webchat",
    languages: {
      ca: "/webchat",
      es: "/es/webchat",
    },
  },
  openGraph: {
    title: "Agente comercial IA 24/7 para tiendas online | empentIA",
    description:
      "Conoce tu catálogo, asesora y cierra ventas. Disponible 24/7, desde 49€/mes.",
    locale: "es_ES",
    type: "website",
  },
};

export default function WebchatESLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
