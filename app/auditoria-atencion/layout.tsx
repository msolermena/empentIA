import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./brand.css";

// Embed de Cal.com (instancia EU app.cal.eu), namespace "descobriment" —
// el mismo que usan las landings de atención al cliente.
const CAL_EMBED = `
(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal; let ar = arguments;
    if (!cal.loaded) {
      cal.ns = {}; cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, "https://app.cal.eu/embed/embed.js", "init");
Cal("init", "descobriment", { origin: "https://app.cal.eu" });
Cal.ns["descobriment"]("ui", { hideEventTypeDetails: false });
`;

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
      <Script id="cal-embed" strategy="afterInteractive">
        {CAL_EMBED}
      </Script>
      {children}
    </div>
  );
}
