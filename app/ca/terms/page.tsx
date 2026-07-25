import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LegalLangSwitch } from "@/components/LegalLangSwitch";
import Link from "next/link";

export const metadata = {
  title: "Termes de Servei - empentIA",
  description: "Termes i condicions del servei d'empentIA, inclòs el canal de missatgeria WhatsApp Business",
  alternates: {
    canonical: "https://empentia.com/ca/terms/",
    languages: {
      es: "https://empentia.com/terms/",
      ca: "https://empentia.com/ca/terms/",
      en: "https://empentia.com/en/terms/",
      "x-default": "https://empentia.com/terms/",
    },
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background" lang="ca">
      <header className="border-b border-emerald-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center justify-between px-8">
          <Logo size="md" variant="image" />
          <LegalLangSwitch es="/terms/" ca="/ca/terms/" en="/en/terms/" active="ca" />
        </nav>
      </header>

      <div className="container mx-auto max-w-4xl px-8 py-16">
        <h1 className="mb-2 text-4xl font-extrabold">Termes de Servei</h1>
        <p className="mb-8 text-sm text-slate-400">Darrera actualització: 25 de juliol de 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>1. Objecte i acceptació</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Aquests Termes de Servei regulen la prestació dels serveis d&apos;automatització i
                intel·ligència artificial oferts per <strong className="text-slate-200">empentIA Tech SL</strong>{" "}
                (d&apos;ara endavant, «empentIA»), amb CIF B88914098 i domicili a c/ Cortina 16, 08720 Vilafranca del
                Penedès (Barcelona).
              </p>
              <p>
                La contractació dels serveis o l&apos;ús dels seus canals implica l&apos;acceptació plena d&apos;aquests
                termes. Quan el servei es presti a una empresa, la persona que el contracta declara tenir
                capacitat suficient per obligar aquesta empresa.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>2. Descripció del servei</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>empentIA ofereix, entre altres, els següents serveis:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Automatització de processos administratius i de negoci.</li>
                <li>Eines d&apos;intel·ligència artificial per a l&apos;anàlisi i la generació de contingut.</li>
                <li>
                  Configuració i operació de canals de missatgeria (inclosa la Plataforma de WhatsApp Business)
                  per a l&apos;atenció i comunicació amb les persones usuàries de l&apos;empresa client.
                </li>
              </ul>
              <p>
                L&apos;abast concret de cada servei es defineix a la proposta o contracte signat amb el client.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>3. Canal de WhatsApp Business: titularitat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  El compte de WhatsApp Business (WABA) i el número de telèfon associat són{" "}
                  <strong className="text-slate-200">propietat de l&apos;empresa client</strong>. empentIA únicament
                  els configura i opera per compte del client, sense adquirir cap dret de titularitat sobre ells.
                </li>
                <li>
                  Les dades i les converses que circulen pel canal pertanyen a l&apos;empresa client, que actua com a
                  responsable del tractament. empentIA actua com a encarregat, segons es descriu a la{" "}
                  <Link href="/ca/privacy/" className="text-emerald-400 underline">Política de Privacitat</Link>.
                </li>
                <li>
                  En finalitzar el servei, el control del compte i del número es manté a l&apos;empresa client, i
                  empentIA suprimeix o retorna les dades conforme al contracte d&apos;encàrrec del tractament.
                </li>
                <li>
                  L&apos;ús del canal està subjecte a les polítiques de WhatsApp i de Meta Platforms Ireland Ltd. El
                  client es compromet a respectar-les.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>4. Ús del canal de missatgeria i baixa (opt-out)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Les comunicacions a través del canal respecten les regles de la Plataforma de WhatsApp Business,
                  inclosa la <strong className="text-slate-200">finestra d&apos;atenció de 24 hores</strong>: fora
                  d&apos;aquest període només s&apos;envien missatges mitjançant plantilles prèviament aprovades.
                </li>
                <li>
                  Qualsevol persona usuària es pot donar de baixa i deixar de rebre missatges en qualsevol moment
                  escrivint <strong className="text-slate-200">«STOP»</strong> (o l&apos;opció equivalent indicada a
                  la conversa). La sol·licitud de baixa s&apos;atén de manera immediata.
                </li>
                <li>
                  No s&apos;utilitza el canal per a enviaments massius no sol·licitats ni per a finalitats diferents
                  de les informades a la persona usuària.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>5. Respostes automatitzades i intel·ligència artificial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Part de les respostes del canal poden estar{" "}
                  <strong className="text-slate-200">generades per un sistema automatitzat d&apos;intel·ligència
                  artificial</strong>. Aquesta circumstància es comunica de manera clara a la persona usuària,
                  en compliment del principi de transparència del Reglament Europeu d&apos;Intel·ligència
                  Artificial (AI Act).
                </li>
                <li>
                  La persona usuària pot <strong className="text-slate-200">sol·licitar en qualsevol moment
                  l&apos;atenció d&apos;una persona</strong>, indicant-ho a la conversa. La sol·licitud es deriva a
                  l&apos;equip humà de l&apos;empresa client.
                </li>
                <li>
                  Les respostes automatitzades tenen caràcter informatiu i d&apos;assistència; no substitueixen
                  l&apos;assessorament professional quan aquest sigui necessari.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>6. Obligacions del client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>Facilitar informació veraç i mantenir les seves dades actualitzades.</li>
                <li>
                  Disposar de la base legal adequada per al tractament de les dades dels seus usuaris i, quan
                  escaigui, recollir-ne el consentiment.
                </li>
                <li>Utilitzar el servei conforme a la llei, a aquests termes i a les polítiques de les plataformes implicades.</li>
                <li>No emprar el canal per a continguts il·lícits, enganyosos o que vulnerin drets de tercers.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>7. Propietat intel·lectual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                El programari, les eines i els materials desenvolupats per empentIA són de la seva titularitat o
                dels seus llicenciants. La contractació del servei no transfereix drets de propietat intel·lectual
                més enllà de l&apos;ús pactat. Els continguts i dades aportats pel client continuen sent de la seva titularitat.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>8. Responsabilitat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA presta el servei amb la diligència deguda, però no garanteix la disponibilitat
                ininterrompuda de plataformes de tercers (com la de Meta) ni es responsabilitza de les
                interrupcions alienes al seu control. empentIA no respon de l&apos;ús que el client faci del servei
                ni dels continguts que aquest publiqui o transmeti.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>9. Durada, modificacions i legislació aplicable</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>La durada del servei és l&apos;establerta al contracte o proposta corresponent.</li>
                <li>
                  empentIA pot modificar aquests termes per adaptar-los a novetats legals o del servei. Els
                  canvis es publicaran en aquesta pàgina.
                </li>
                <li>
                  Aquests termes es regeixen per la legislació espanyola. Per a qualsevol controvèrsia, les parts
                  se sotmeten als jutjats i tribunals que legalment corresponguin.
                </li>
              </ul>
              <div className="rounded-lg bg-emerald-500/10 p-4">
                <p className="text-sm">
                  <strong className="text-emerald-400">Contacte:</strong>{" "}
                  <a href="mailto:hola@empentia.com" className="text-emerald-400 underline">hola@empentia.com</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 text-sm">
          <div className="flex items-center gap-6">
            <Link href="/ca/privacy/" className="text-emerald-400 underline hover:text-emerald-300">
              Política de privacitat
            </Link>
            <Link href="/ca/legal/" className="text-emerald-400 underline hover:text-emerald-300">
              Avís legal
            </Link>
            <Link href="/ca/cookies/" className="text-emerald-400 underline hover:text-emerald-300">
              Política de cookies
            </Link>
          </div>
          <Link href="/ca/" className="text-slate-500 hover:text-slate-300">
            ← Tornar a l&apos;inici
          </Link>
        </div>
      </div>
    </div>
  );
}
