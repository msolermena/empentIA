import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LegalLangSwitch } from "@/components/LegalLangSwitch";
import Link from "next/link";

export const metadata = {
  title: "Termes de Servei - empentIA",
  description: "Termes de servei d'empentIA per al canal de missatgeria WhatsApp Business",
  alternates: {
    canonical: "https://empentia.com/ca/terms/",
    languages: {
      es: "https://empentia.com/terms/",
      ca: "https://empentia.com/ca/terms/",
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
          <LegalLangSwitch es="/terms/" ca="/ca/terms/" active="ca" />
        </nav>
      </header>

      <div className="container mx-auto max-w-4xl px-8 py-16">
        <h1 className="mb-2 text-4xl font-extrabold">Termes de Servei</h1>
        <p className="mb-1 text-lg text-slate-300">Canal de missatgeria d&apos;empentIA</p>
        <p className="mb-8 text-sm text-slate-400">Darrera actualització: 25 de juliol de 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>1. Objecte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Aquests Termes de Servei regulen la prestació del servei d&apos;atenció al client i missatgeria
                automatitzada que empentIA Tech SL («empentIA») ofereix a través de la Plataforma de WhatsApp Business
                i altres canals de missatgeria, tant als seus clients contractants com als usuaris finals que
                interactuen amb aquests canals.
              </p>
              <div className="rounded-lg bg-slate-800/30 p-4">
                <p className="text-sm">
                  <strong className="text-slate-200">Prestador del servei:</strong><br />
                  Denominació social: empentIA Tech SL<br />
                  CIF: B88914098<br />
                  Domicili: c/ Cortina 16, 08720 Vilafranca del Penedès (Barcelona)<br />
                  Contacte:{" "}
                  <a href="mailto:hola@empentia.com" className="text-emerald-400 underline">hola@empentia.com</a>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>2. Definicions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Client contractant:</strong> l&apos;empresa o professional que
                  contracta empentIA per operar un canal de missatgeria en nom seu (per exemple, una administració de finques).
                </li>
                <li>
                  <strong className="text-slate-200">Usuari final:</strong> la persona que escriu al canal de missatgeria del client contractant.
                </li>
                <li>
                  <strong className="text-slate-200">Canal:</strong> el número i el compte de WhatsApp Business (o canal equivalent) a través del qual es presta el servei.
                </li>
                <li>
                  <strong className="text-slate-200">Assistent d&apos;IA:</strong> el sistema automatitzat que pot generar respostes dins del canal.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>3. Descripció del servei</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA proporciona una plataforma que permet al client contractant gestionar l&apos;atenció al client a
                través de WhatsApp, incloent-hi la recepció de missatges, la generació de respostes automatitzades
                mitjançant intel·ligència artificial, l&apos;escalat a agents humans i el seguiment d&apos;incidències.
              </p>
              <p>
                El servei es presta sobre la Cloud API oficial de Meta. empentIA actua com a proveïdor tecnològic
                autoritzat (Tech Provider).
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>4. Titularitat del canal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                El compte de WhatsApp Business (WABA) i el número de telèfon associat al canal són{" "}
                <strong className="text-slate-200">propietat del client contractant</strong>, no d&apos;empentIA.
                empentIA hi accedeix únicament com a proveïdor tecnològic autoritzat pel client.
              </p>
              <p>
                En finalitzar la relació contractual, el client conserva la titularitat del seu número, el seu WABA i
                el seu historial de converses, i pot desconnectar empentIA sense pèrdua d&apos;aquests actius.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>5. Ús automatitzat i intervenció humana (transparència)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                En compliment del Reglament (UE) 2024/1689 sobre intel·ligència artificial (AI Act), s&apos;informa que:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Les respostes del canal poden estar <strong className="text-slate-200">generades totalment o parcialment per un sistema automatitzat d&apos;intel·ligència artificial</strong>.</li>
                <li>S&apos;informa l&apos;usuari final que està interactuant amb un assistent automatitzat.</li>
                <li>L&apos;usuari final pot <strong className="text-slate-200">sol·licitar l&apos;atenció d&apos;una persona en qualsevol moment</strong> escrivint al canal.</li>
                <li>L&apos;assistent d&apos;IA no pren decisions amb efectes jurídics sobre l&apos;usuari sense supervisió humana.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>6. Baixa (opt-out) i control de l&apos;usuari</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                L&apos;usuari final pot deixar de rebre missatges del canal en qualsevol moment responent{" "}
                <strong className="text-slate-200">STOP</strong> (o expressions equivalents configurades). La sol·licitud s&apos;atén de manera immediata.
              </p>
              <p>
                empentIA respecta la finestra de servei de 24 hores de WhatsApp: fora d&apos;aquesta finestra, els missatges
                només s&apos;envien mitjançant plantilles prèviament aprovades per Meta, conforme a les seves polítiques.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>7. Protecció de dades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>Pel que fa a les dades personals dels usuaris finals tractades a través del canal:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>El <strong className="text-slate-200">client contractant és el responsable del tractament</strong>.</li>
                <li><strong className="text-slate-200">empentIA actua com a encarregat del tractament</strong> per compte del client, en virtut d&apos;un contracte d&apos;encàrrec de tractament signat entre ambdues parts conforme a l&apos;article 28 del RGPD.</li>
                <li>
                  El tractament de dades es regeix per la{" "}
                  <Link href="/ca/privacy/" className="text-emerald-400 underline">Política de Privacitat</Link>{" "}
                  d&apos;empentIA i el corresponent contracte d&apos;encàrrec.
                </li>
                <li>Els sistemes d&apos;IA utilitzats actuen com a subencarregats, amb les garanties contractuals adequades.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>8. Obligacions del client contractant</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>El client contractant es compromet a:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Utilitzar el canal conforme a les polítiques de WhatsApp i Meta.</li>
                <li>No utilitzar el canal per enviar comunicacions no sol·licitades (spam) ni contingut il·lícit.</li>
                <li>Obtenir el consentiment o la base legal adequats per comunicar-se amb els seus usuaris finals.</li>
                <li>Mantenir un mètode de pagament vàlid amb Meta per als costos de missatgeria que Meta li factura directament.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>9. Limitació de responsabilitat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA presta el servei amb la diligència deguda, però no garanteix la disponibilitat ininterrompuda
                dels serveis de tercers (Meta, WhatsApp) dels quals depèn el canal. empentIA no es responsabilitza de
                les interrupcions, canvis de política o costos imposats per Meta.
              </p>
              <p>
                empentIA no es responsabilitza del contingut dels missatges enviats pel client contractant ni de l&apos;ús
                que el client faci del canal.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>10. Preus i facturació</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA factura al client contractant els serveis de plataforma, integració i suport segons el que
                s&apos;acordi contractualment.
              </p>
              <p>
                <strong className="text-slate-200">Els costos de missatgeria de WhatsApp els factura Meta directament
                al client contractant.</strong> empentIA no els repercuteix ni aplica cap marge sobre aquests costos.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>11. Modificacions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA pot modificar aquests Termes per adaptar-los a canvis normatius, del servei o de les
                polítiques de Meta. Els canvis es publicaran en aquesta pàgina.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>12. Legislació aplicable</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Aquests Termes es regeixen per la legislació espanyola. Per a qualsevol controvèrsia, les parts se
                sotmeten als jutjats i tribunals que corresponguin conforme a la normativa aplicable.
              </p>
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
