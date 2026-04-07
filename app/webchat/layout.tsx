import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webchat IA per a botigues online | empentIA",
  description:
    "Agent d'intel·ligència artificial que coneix el teu catàleg, assessora clients, genera pressupostos i tanca vendes 24/7. Des de 49€/mes.",
  alternates: {
    canonical: "https://empentia.cat/webchat",
    languages: {
      ca: "https://empentia.cat/webchat",
      es: "https://empentia.cat/es/webchat",
    },
  },
  openGraph: {
    title: "Webchat IA per a botigues online | empentIA",
    description:
      "Agent IA que coneix el teu catàleg, assessora, genera pressupostos i tanca vendes 24/7. Des de 49€/mes.",
    url: "https://empentia.cat/webchat",
    siteName: "empentIA",
    locale: "ca_ES",
    type: "website",
  },
};

export default function WebchatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
