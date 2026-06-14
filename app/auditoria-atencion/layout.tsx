import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./brand.css";

// Fuentes de marca — solo se cargan en esta ruta (code-split por segmento).
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  weight: ["400", "500", "600"],
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Auditoría de atención al cliente | empentIA",
  description:
    "Calcula con tus propios números cuánto te cuesta hoy tu atención al cliente y cuánto podrías ahorrar automatizándola. Propuesta clara, sin compromiso.",
};

export default function AuditoriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`atencion ${fraunces.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      {children}
    </div>
  );
}
