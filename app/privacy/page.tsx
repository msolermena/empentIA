import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Política de Privacitat - empentIA",
  description: "Política de privacitat i protecció de dades d'empentIA",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-emerald-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center px-8">
          <Logo size="md" variant="image" />
        </nav>
      </header>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-8 py-16">
        <h1 className="mb-2 text-4xl font-extrabold">Política de Privacitat</h1>
        <p className="mb-8 text-sm text-slate-400">Darrera actualització: 11 de febrer de 2026</p>
        
        <div className="prose prose-invert max-w-none space-y-8">
          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>1. Responsable del tractament</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                El responsable del tractament de les dades personals recollides a través
                d&apos;aquest lloc web és:
              </p>
              <div className="rounded-lg bg-slate-800/30 p-4">
                <p className="text-sm">
                  <strong className="text-slate-200">Denominació social:</strong> empentIA Tech SL<br />
                  <strong className="text-slate-200">CIF:</strong> B88914098<br />
                  <strong className="text-slate-200">Domicili:</strong> c/ Cortina 16, 08720 Vilafranca del Penedès (Barcelona)<br />
                  <strong className="text-slate-200">Contacte:</strong>{" "}
                  <a href="mailto:hola@empentia.com" className="text-emerald-400 underline">
                    hola@empentia.com
                  </a><br />
                  <strong className="text-slate-200">Telèfon:</strong> 685 615 150
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>2. Finalitats del tractament</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-slate-300">
              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.1. Auditoria d&apos;automatització (empentia.com)</h4>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-slate-200">Dades recollides:</strong> URL de l&apos;empresa, sector d&apos;activitat,
                    mida de l&apos;empresa, eines de programari utilitzades, processos empresarials, nom,
                    correu electrònic, telèfon, càrrec, preferència de contacte.
                  </li>
                  <li>
                    <strong className="text-slate-200">Finalitat:</strong> Realitzar una auditoria automatitzada per
                    identificar oportunitats d&apos;automatització i millorar la productivitat de
                    l&apos;empresa auditada. Contactar el sol·licitant per fer-li arribar els resultats i,
                    si ho consent, informació comercial relacionada.
                  </li>
                  <li>
                    <strong className="text-slate-200">Base legal:</strong> Consentiment de l&apos;interessat (art. 6.1.a RGPD)
                    i interès legítim per a la prestació del servei sol·licitat (art. 6.1.f RGPD).
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.2. Portal de client (app.empentia.com)</h4>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-slate-200">Dades recollides:</strong> Correu electrònic, nom, dades de
                    l&apos;empresa, informació de negoci proporcionada voluntàriament (clients, productes, factures).
                  </li>
                  <li>
                    <strong className="text-slate-200">Finalitat:</strong> Gestió de la relació contractual, prestació dels
                    serveis d&apos;automatització i eines d&apos;IA contractats, i comunicació relacionada amb el servei.
                  </li>
                  <li>
                    <strong className="text-slate-200">Base legal:</strong> Execució d&apos;un contracte (art. 6.1.b RGPD).
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.3. Comunicacions comercials</h4>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-slate-200">Finalitat:</strong> Enviament d&apos;informació sobre serveis, novetats
                    i contingut d&apos;interès relacionat amb l&apos;automatització i la intel·ligència artificial per a empreses.
                  </li>
                  <li>
                    <strong className="text-slate-200">Base legal:</strong> Consentiment explícit de l&apos;interessat (art. 6.1.a RGPD).
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.4. Scraping públic</h4>
                <p>
                  Com a part del servei d&apos;auditoria, empentIA accedeix a informació públicament
                  disponible a la pàgina web de l&apos;empresa auditada (textos, metadades, tecnologies
                  detectades). Aquesta informació s&apos;utilitza exclusivament per personalitzar
                  l&apos;auditoria i no inclou dades de caràcter personal més enllà de les ja públiques.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>3. Destinataris de les dades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Les dades personals podran ser comunicades als següents destinataris, únicament
                quan sigui necessari per a la prestació del servei:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Supabase Inc.</strong> — Proveïdor de base de dades i autenticació (servidors a la UE).
                </li>
                <li>
                  <strong className="text-slate-200">Vercel Inc.</strong> — Proveïdor d&apos;allotjament web del frontend.
                </li>
                <li>
                  <strong className="text-slate-200">Railway Corp.</strong> — Proveïdor d&apos;allotjament del backend.
                </li>
                <li>
                  <strong className="text-slate-200">Anthropic PBC</strong> — Proveïdor d&apos;intel·ligència artificial per a anàlisi i generació de contingut.
                </li>
                <li>
                  <strong className="text-slate-200">Brevo (Sendinblue)</strong> — Proveïdor d&apos;enviament de correus electrònics.
                </li>
              </ul>
              <p className="text-sm">
                No es realitzaran transferències internacionals de dades fora de l&apos;Espai Econòmic
                Europeu sense les garanties adequades. En el cas de proveïdors amb seus als EUA,
                ens assegurem que comptin amb les certificacions o mecanismes de transferència adequats.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>4. Termini de conservació</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Dades d&apos;auditoria:</strong> Es conservaran durant un termini
                  màxim de 12 mesos des de la seva recollida, tret que l&apos;interessat sol·liciti la
                  seva supressió abans.
                </li>
                <li>
                  <strong className="text-slate-200">Dades de clients:</strong> Es conservaran durant la vigència de
                  la relació contractual i, posteriorment, durant els terminis legalment establerts
                  per atendre possibles responsabilitats (5 anys).
                </li>
                <li>
                  <strong className="text-slate-200">Comunicacions comercials:</strong> Fins que l&apos;interessat revoqui
                  el seu consentiment.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>5. Drets dels interessats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>Tota persona té dret a obtenir confirmació sobre si estem tractant les seves dades personals. En particular, pot exercir els següents drets:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Accés:</strong> Dret a obtenir informació sobre les seves dades personals objecte de tractament.
                </li>
                <li>
                  <strong className="text-slate-200">Rectificació:</strong> Dret a sol·licitar la modificació de dades inexactes o incompletes.
                </li>
                <li>
                  <strong className="text-slate-200">Supressió:</strong> Dret a sol·licitar l&apos;eliminació de les seves dades (&quot;dret a l&apos;oblit&quot;).
                </li>
                <li>
                  <strong className="text-slate-200">Limitació:</strong> Dret a sol·licitar la limitació del tractament en determinats supòsits.
                </li>
                <li>
                  <strong className="text-slate-200">Portabilitat:</strong> Dret a rebre les dades en un format estructurat i d&apos;ús comú.
                </li>
                <li>
                  <strong className="text-slate-200">Oposició:</strong> Dret a oposar-se al tractament de les seves dades.
                </li>
              </ul>
              <div className="rounded-lg bg-emerald-500/10 p-4">
                <p className="text-sm">
                  <strong className="text-emerald-400">Per exercir aquests drets:</strong><br />
                  Envia un email a{" "}
                  <a href="mailto:hola@empentia.com" className="text-emerald-400 underline">
                    hola@empentia.com
                  </a>{" "}
                  indicant el dret que vols exercir i adjuntant una còpia del document d&apos;identitat.
                  Respondrem en un termini màxim de 30 dies.
                </p>
              </div>
              <p className="text-sm">
                Així mateix, tens dret a presentar una reclamació davant
                l&apos;<strong className="text-slate-200">Autoritat Catalana de Protecció de Dades</strong>{" "}
                (<a href="https://apdcat.gencat.cat" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">apdcat.gencat.cat</a>)
                o l&apos;<strong className="text-slate-200">Agència Espanyola de Protecció de Dades</strong>{" "}
                (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">aepd.es</a>).
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>6. Mesures de seguretat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA Tech SL ha adoptat les mesures tècniques i organitzatives
                necessàries per garantir la seguretat de les dades personals:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Xifratge de les comunicacions (HTTPS/TLS)</li>
                <li>Autenticació segura mitjançant magic link (sense emmagatzematge de contrasenyes)</li>
                <li>Aïllament de dades per client (arquitectura multi-tenant)</li>
                <li>Accés restringit a les dades només al personal autoritzat</li>
                <li>Còpies de seguretat periòdiques</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>7. Actualització</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Aquesta Política de Privacitat pot ser modificada per adaptar-la a novetats
                legislatives o canvis en els nostres serveis. Qualsevol canvi serà publicat en
                aquesta pàgina. Recomanem revisar-la periòdicament.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col items-center gap-3 text-sm">
          <div className="flex items-center gap-6">
            <Link href="/legal" className="text-emerald-400 underline hover:text-emerald-300">
              Avís legal
            </Link>
            <Link href="/cookies" className="text-emerald-400 underline hover:text-emerald-300">
              Política de cookies
            </Link>
          </div>
          <Link href="/" className="text-slate-500 hover:text-slate-300">
            ← Tornar a l&apos;inici
          </Link>
        </div>
      </div>
    </div>
  );
}
