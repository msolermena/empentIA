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
      <header className="border-b border-primary-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center px-8">
          <Logo size="md" variant="image" />
        </nav>
      </header>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-8 py-16">
        <h1 className="mb-8 text-4xl font-extrabold">Política de Privacitat</h1>
        
        <div className="prose prose-invert max-w-none space-y-8">
          <Card className="glass-card border-primary-500/10">
            <CardHeader>
              <CardTitle>1. Informació General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                A <strong className="text-slate-200">empentIA</strong>, respectem la teva privacitat i ens comprometem 
                a protegir les teves dades personals. Aquesta política de privacitat t&apos;informa sobre 
                com recollim, utilitzem i protegim la teva informació.
              </p>
              <div className="rounded-lg bg-slate-800/30 p-4">
                <p className="text-sm">
                  <strong className="text-slate-200">Responsable:</strong> empentIA<br />
                  <strong className="text-slate-200">Email:</strong> hola@empentia.cat<br />
                  <strong className="text-slate-200">Ubicació:</strong> Barcelona, Catalunya
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary-500/10">
            <CardHeader>
              <CardTitle>2. Quines Dades Recollim</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>Quan utilitzes el nostre servei d&apos;auditoria gratuïta, recollim:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Email:</strong> Per enviar-te l&apos;auditoria personalitzada
                </li>
                <li>
                  <strong className="text-slate-200">URL de l&apos;empresa:</strong> Per analitzar la teva web
                </li>
                <li>
                  <strong className="text-slate-200">Respostes al qüestionari:</strong> 8 preguntes sobre els processos 
                  de la teva empresa
                </li>
                <li>
                  <strong className="text-slate-200">Dades tècniques:</strong> Informació pública de la teva web 
                  (tecnologies, sector, mida estimada)
                </li>
              </ul>
              <p className="rounded-lg bg-primary-500/5 p-4 text-sm">
                <strong className="text-slate-200">Important:</strong> NO recollim dades financeres, 
                contrasenyes, ni altra informació sensible de la teva empresa.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary-500/10">
            <CardHeader>
              <CardTitle>3. Com Utilitzem les Teves Dades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>Utilitzem les teves dades exclusivament per:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Generar la teva auditoria personalitzada d&apos;automatització</li>
                <li>Enviar-te el PDF de l&apos;auditoria per email</li>
                <li>Contactar-te si sol·licites una demo o més informació</li>
                <li>Millorar el nostre servei (anàlisi agregada i anònima)</li>
              </ul>
              <p className="font-semibold text-slate-200">
                NO vendem, lloguem ni compartim les teves dades amb tercers amb fins comercials.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary-500/10">
            <CardHeader>
              <CardTitle>4. Base Legal (GDPR)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>Processem les teves dades basant-nos en:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Consentiment explícit:</strong> Marques la casella 
                  acceptant aquesta política abans de rebre l&apos;auditoria
                </li>
                <li>
                  <strong className="text-slate-200">Interès legítim:</strong> Proporcionar-te el servei 
                  sol·licitat (auditoria gratuïta)
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary-500/10">
            <CardHeader>
              <CardTitle>5. On Guardem les Teves Dades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>Les teves dades s&apos;emmagatzemen de forma segura a:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Servidors a la UE:</strong> Utilitzem Supabase amb 
                  servidors ubicats a Europa
                </li>
                <li>
                  <strong className="text-slate-200">Encriptació:</strong> Totes les dades estan encriptades 
                  en trànsit (HTTPS) i en repòs
                </li>
                <li>
                  <strong className="text-slate-200">Accés restringit:</strong> Només personal autoritzat té 
                  accés a les dades
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary-500/10">
            <CardHeader>
              <CardTitle>6. Quant Temps Guardem les Dades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Auditories no clients:</strong> 12 mesos després de 
                  la generació
                </li>
                <li>
                  <strong className="text-slate-200">Clients actius:</strong> Mentre duri la relació comercial 
                  + 5 anys (obligació legal)
                </li>
                <li>
                  <strong className="text-slate-200">Després d&apos;aquest període:</strong> Les dades 
                  s&apos;anonimitzen o s&apos;eliminen
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary-500/10">
            <CardHeader>
              <CardTitle>7. Els Teus Drets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>Tens dret a:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Accés:</strong> Sol·licitar una còpia de les teves dades
                </li>
                <li>
                  <strong className="text-slate-200">Rectificació:</strong> Corregir dades inexactes
                </li>
                <li>
                  <strong className="text-slate-200">Supressió:</strong> Eliminar les teves dades 
                  (&quot;dret a l&apos;oblit&quot;)
                </li>
                <li>
                  <strong className="text-slate-200">Portabilitat:</strong> Rebre les teves dades en format 
                  estructurat
                </li>
                <li>
                  <strong className="text-slate-200">Oposició:</strong> Oposar-te al processament de les 
                  teves dades
                </li>
                <li>
                  <strong className="text-slate-200">Retirada del consentiment:</strong> En qualsevol moment
                </li>
              </ul>
              <div className="rounded-lg bg-emerald-500/10 p-4">
                <p className="text-sm">
                  <strong className="text-emerald-400">Per exercir aquests drets:</strong><br />
                  Envia un email a{" "}
                  <a href="mailto:hola@empentia.cat" className="text-primary-400 underline">
                    hola@empentia.cat
                  </a>{" "}
                  amb l&apos;assumpte &quot;Drets GDPR&quot; i respondrem en menys de 30 dies.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary-500/10">
            <CardHeader>
              <CardTitle>8. Cookies i Tecnologies Similars</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>Utilitzem cookies essencials per:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Mantenir la sessió durant el procés d&apos;auditoria</li>
                <li>Recordar les teves preferències de privacitat</li>
                <li>Analytics anònims (Plausible, GDPR compliant)</li>
              </ul>
              <p>
                <strong className="text-slate-200">NO utilitzem</strong> cookies de tercers, publicitat 
                ni tracking invasiu.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary-500/10">
            <CardHeader>
              <CardTitle>9. Compartició amb Tercers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>Només compartim dades amb proveïdors essencials per al servei:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Anthropic (Claude API):</strong> Per generar l&apos;auditoria. 
                  Les dades s&apos;anonimitzen i NO s&apos;emmagatzemen pel seu entrenament.
                </li>
                <li>
                  <strong className="text-slate-200">Supabase:</strong> Base de dades (UE, GDPR compliant)
                </li>
                <li>
                  <strong className="text-slate-200">Resend:</strong> Enviament d&apos;emails (UE)
                </li>
              </ul>
              <p className="text-sm">
                Tots aquests proveïdors tenen acords de processament de dades (DPA) i compleixen el GDPR.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary-500/10">
            <CardHeader>
              <CardTitle>10. Seguretat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>Mesures de seguretat implementades:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Encriptació HTTPS/SSL en totes les comunicacions</li>
                <li>Encriptació de dades en repòs a la base de dades</li>
                <li>Autenticació de dos factors per accés administratiu</li>
                <li>Backups diaris encriptats</li>
                <li>Auditories de seguretat periòdiques</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary-500/10">
            <CardHeader>
              <CardTitle>11. Canvis a Aquesta Política</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Podem actualitzar aquesta política ocasionalment. Si hi ha canvis significatius, 
                t&apos;ho notificarem per email. La versió més recent sempre estarà disponible en aquesta pàgina.
              </p>
              <p className="text-sm text-slate-400">
                Última actualització: 16 de gener de 2026
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary-500/10">
            <CardHeader>
              <CardTitle>12. Contacte i Reclamacions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>Per qualsevol dubte sobre privacitat:</p>
              <div className="rounded-lg bg-slate-800/30 p-4">
                <p className="text-sm">
                  <strong className="text-slate-200">Email:</strong>{" "}
                  <a href="mailto:hola@empentia.cat" className="text-primary-400 underline">
                    hola@empentia.cat
                  </a>
                </p>
              </div>
              <p className="text-sm">
                Si no estàs satisfet amb la nostra resposta, tens dret a presentar una reclamació davant 
                l&apos;<strong className="text-slate-200">Agència Espanyola de Protecció de Dades (AEPD)</strong>.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="text-primary-400 underline hover:text-primary-300"
          >
            ← Tornar a l&apos;inici
          </Link>
        </div>
      </div>
    </div>
  );
}
