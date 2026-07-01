import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Avís Legal - empentIA",
  description: "Avís legal i condicions d'ús d'empentIA",
};

export default function LegalPage() {
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
        <h1 className="mb-2 text-4xl font-extrabold">Avís Legal</h1>
        <p className="mb-8 text-sm text-slate-400">Darrera actualització: 11 de febrer de 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>1. Dades identificatives del titular</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                En compliment del deure d&apos;informació establert a l&apos;article 10 de la Llei
                34/2002, d&apos;11 de juliol, de Serveis de la Societat de la Informació i de
                Comerç Electrònic (LSSI-CE), s&apos;informa que les dades identificatives del
                titular d&apos;aquest lloc web són:
              </p>
              <div className="rounded-lg bg-slate-800/30 p-4">
                <p className="text-sm">
                  <strong className="text-slate-200">Denominació social:</strong> ADVANCED ENERGY CONSULTING SL<br />
                  <strong className="text-slate-200">CIF:</strong> B88914098<br />
                  <strong className="text-slate-200">Domicili social:</strong> c/ Cortina 16, 08720 Vilafranca del Penedès (Barcelona)<br />
                  <strong className="text-slate-200">Correu electrònic:</strong>{" "}
                  <a href="mailto:hola@empentia.cat" className="text-emerald-400 underline">
                    hola@empentia.cat
                  </a><br />
                  <strong className="text-slate-200">Telèfon:</strong> 685 615 150<br />
                  <strong className="text-slate-200">Dominis web:</strong> empentia.cat / app.empentia.com<br />
                  <strong className="text-slate-200">Registre Mercantil:</strong> Inscrita al Registre Mercantil de Barcelona,
                  Tom 42643, Foli 64, Secció 8, Full Registral 412814, Inscripció 1
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>2. Objecte i àmbit d&apos;aplicació</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                El present avís legal regula l&apos;ús i les condicions d&apos;accés als llocs web
                empentia.cat i app.empentia.com (d&apos;ara endavant, conjuntament, &quot;el Lloc
                Web&quot;), propietat d&apos;ADVANCED ENERGY CONSULTING SL (d&apos;ara endavant,
                &quot;empentIA&quot; o &quot;el Titular&quot;).
              </p>
              <p>
                empentIA és una plataforma d&apos;automatització i productivitat basada en
                intel·ligència artificial, dissenyada per a petites i mitjanes empreses.
                Els serveis inclouen: auditories automatitzades de processos empresarials,
                implementació d&apos;automatitzacions, eines d&apos;IA personalitzades i un portal
                de gestió per a clients.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>3. Condicions generals d&apos;ús</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                L&apos;accés al Lloc Web atribueix la condició d&apos;usuari i implica l&apos;acceptació
                plena i sense reserves de totes les disposicions incloses en aquest Avís Legal,
                la Política de Privacitat i la Política de Cookies, en la versió publicada en
                el moment en què l&apos;usuari accedeixi al Lloc Web.
              </p>
              <p>
                L&apos;usuari es compromet a fer un ús adequat dels continguts i serveis oferts
                a través del Lloc Web, abstenint-se de:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Realitzar activitats il·lícites o contràries a la bona fe i a l&apos;ordre públic.</li>
                <li>Difondre continguts de caràcter racista, xenòfob, pornogràfic, d&apos;apologia del terrorisme o que atemptin contra els drets humans.</li>
                <li>Provocar danys en els sistemes físics i lògics del Lloc Web o dels seus proveïdors.</li>
                <li>Intentar accedir a comptes o àrees restringides del Lloc Web sense autorització.</li>
                <li>Vulnerar els drets de propietat intel·lectual o industrial del Titular o de tercers.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>4. Propietat intel·lectual i industrial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Tots els continguts del Lloc Web, incloent-hi de manera enunciativa però no
                limitativa: textos, fotografies, gràfics, imatges, icones, tecnologia, programari,
                dissenys, logotips, marca empentIA i qualsevol altre element susceptible de
                protecció, són propietat d&apos;ADVANCED ENERGY CONSULTING SL o dels seus
                llicenciants, i estan protegits per les lleis de propietat intel·lectual i industrial.
              </p>
              <p>
                Queda expressament prohibida la reproducció, distribució, comunicació pública i
                transformació total o parcial dels continguts del Lloc Web sense l&apos;autorització
                prèvia i expressa del Titular.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>5. Limitació de responsabilitat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>El Titular no es fa responsable, de manera directa ni subsidiària, de:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>La qualitat del servei, velocitat d&apos;accés, correcte funcionament ni disponibilitat ininterrompuda del Lloc Web.</li>
                <li>Els danys que puguin causar-se als equips de l&apos;usuari per la utilització del Lloc Web.</li>
                <li>Els continguts de pàgines web de tercers enllaçades des del Lloc Web.</li>
                <li>Les caigudes, interrupcions o errors en el funcionament del Lloc Web.</li>
              </ul>
              <p>
                El Titular es reserva el dret de modificar, suspendre o eliminar qualsevol element
                o servei del Lloc Web en qualsevol moment i sense avís previ.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>6. Enllaços a tercers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                El Lloc Web pot contenir enllaços a pàgines web de tercers. El Titular no assumeix
                cap responsabilitat pel contingut, polítiques de privacitat o pràctiques d&apos;aquests
                llocs web de tercers.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>7. Legislació aplicable i jurisdicció</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Les presents condicions es regeixen per la legislació espanyola. Per a la resolució
                de qualsevol controvèrsia que pugui sorgir en relació amb l&apos;accés o l&apos;ús del
                Lloc Web, les parts se sotmeten als jutjats i tribunals del domicili de l&apos;usuari,
                sempre que aquest tingui la condició de consumidor. En cas contrari, les parts se
                sotmeten als jutjats i tribunals de Barcelona.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>8. Modificacions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                El Titular es reserva el dret de modificar el present Avís Legal en qualsevol
                moment. Les modificacions seran efectives des del moment de la seva publicació
                al Lloc Web.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col items-center gap-3 text-sm">
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-emerald-400 underline hover:text-emerald-300">
              Política de privacitat
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
