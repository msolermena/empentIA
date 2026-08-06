import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LegalLangSwitch } from "@/components/LegalLangSwitch";
import Link from "next/link";

export const metadata = {
  title: "Supressió de dades - empentIA",
  description: "Com sol·licitar la supressió de les teves dades personals a empentIA",
  alternates: {
    canonical: "https://empentia.com/ca/data-deletion/",
    languages: {
      es: "https://empentia.com/data-deletion/",
      ca: "https://empentia.com/ca/data-deletion/",
      "x-default": "https://empentia.com/data-deletion/",
    },
  },
};

export default function DataDeletionPageCA() {
  return (
    <div className="min-h-screen bg-background" lang="ca">
      {/* Header */}
      <header className="border-b border-emerald-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center justify-between px-8">
          <Logo size="md" variant="image" />
          <LegalLangSwitch es="/data-deletion/" ca="/ca/data-deletion/" active="ca" />
        </nav>
      </header>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-8 py-16">
        <h1 className="mb-2 text-4xl font-extrabold">Supressió de dades</h1>
        <p className="mb-8 text-sm text-slate-400">Darrera actualització: 6 d&apos;agost de 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <p className="text-slate-300">
            empentIA Tech SL ofereix solucions de missatgeria d&apos;atenció al client en nom dels
            seus clients empresarials a través de la Plataforma de WhatsApp Business i altres
            canals.
          </p>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>1. Responsabilitat del tractament</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Quan empentIA opera un canal de missatgeria en nom d&apos;un client empresarial,
                aquest <strong className="text-slate-200">client és el responsable del tractament</strong>{" "}
                de les dades personals dels usuaris finals, i empentIA actua com a{" "}
                <strong className="text-slate-200">encarregat del tractament</strong> per compte seu.
                Les sol·licituds de supressió de dades personals es gestionen d&apos;acord amb el
                corresponent contracte d&apos;encàrrec de tractament i el RGPD.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>2. Com sol·licitar la supressió de les teves dades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Si has interactuat amb una empresa a través d&apos;un canal de missatgeria operat per
                empentIA i vols sol·licitar la supressió de les teves dades personals, pots:
              </p>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  Contactar directament amb l&apos;empresa amb qui vas interactuar (el responsable
                  del tractament), o
                </li>
                <li>
                  Enviar un correu a{" "}
                  <a
                    href="mailto:hola@empentia.com?subject=Sol%C2%B7licitud%20de%20supressi%C3%B3%20de%20dades"
                    className="text-emerald-400 underline"
                  >
                    hola@empentia.com
                  </a>{" "}
                  amb l&apos;assumpte «Sol·licitud de supressió de dades», indicant el número de
                  telèfon o identificador utilitzat i l&apos;empresa amb qui vas contactar.
                </li>
              </ol>
              <div className="rounded-lg bg-emerald-500/10 p-4">
                <p className="text-sm">
                  Tramitarem la teva sol·licitud sense dilació indeguda i dins del termini que
                  exigeix la legislació aplicable (com a màxim 30 dies). Podrem verificar la teva
                  identitat abans de tramitar la sol·licitud.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>3. Dades que podem conservar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Podem conservar determinades dades quan sigui necessari per motius legals (per
                exemple, els registres necessaris per complir amb obligacions fiscals o comptables),
                tal com es descriu a la nostra{" "}
                <Link href="/ca/privacy/" className="text-emerald-400 underline">
                  Política de Privacitat
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col items-center gap-3 text-sm">
          <div className="flex items-center gap-6">
            <Link href="/ca/privacy/" className="text-emerald-400 underline hover:text-emerald-300">
              Política de privacitat
            </Link>
            <Link href="/ca/terms/" className="text-emerald-400 underline hover:text-emerald-300">
              Termes del servei
            </Link>
            <Link href="/ca/legal/" className="text-emerald-400 underline hover:text-emerald-300">
              Avís legal
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
