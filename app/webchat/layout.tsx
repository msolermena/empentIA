import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent comercial IA 24/7 per a botigues online | empentIA Webchat",
  description:
    "L'agent IA d'empentIA coneix el teu catàleg, assessora, genera pressupostos i tanca vendes 24/7. Plans des de 49€/mes. Sense permanència.",
  alternates: {
    canonical: "/webchat",
    languages: {
      ca: "/webchat",
      es: "/es/webchat",
    },
  },
  openGraph: {
    title: "Agent comercial IA 24/7 per a botigues online | empentIA",
    description:
      "Coneix el teu catàleg, assessora i tanca vendes. Disponible 24/7, des de 49€/mes.",
    locale: "ca_ES",
    type: "website",
  },
};

export default function WebchatLayout({ children }: { children: React.ReactNode }) {
  return <div lang="ca">{children}</div>;
}
