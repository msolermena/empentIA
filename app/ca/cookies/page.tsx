import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CookiePreferencesButton,
  CookieResetButton,
} from "@/components/CookiePreferencesButton";
import Link from "next/link";

export const metadata = {
  title: "Política de Cookies - empentIA",
  description: "Política de cookies d'empentIA",
  alternates: {
    canonical: "https://empentia.com/ca/cookies/",
    languages: {
      es: "https://empentia.com/cookies/",
      ca: "https://empentia.com/ca/cookies/",
      "x-default": "https://empentia.com/cookies/",
    },
  },
};

export default function CookiesPage() {
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
        <h1 className="mb-2 text-4xl font-extrabold">Política de Cookies</h1>
        <p className="mb-8 text-sm text-slate-400">Darrera actualització: 11 de febrer de 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>1. Què són les cookies?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Les cookies són petits fitxers de text que es guarden al dispositiu de l&apos;usuari
                quan visita un lloc web. Serveixen per recordar informació sobre la visita, com
                les preferències d&apos;idioma, dades de sessió o informació estadística.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>2. Quines cookies utilitzem?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-slate-300">
              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.1. Cookies tècniques (necessàries)</h4>
                <p className="mb-3">
                  Són essencials per al funcionament del Lloc Web. Permeten la navegació i l&apos;ús
                  de funcionalitats bàsiques com l&apos;autenticació al portal de client. No requereixen
                  consentiment.
                </p>
                <div className="rounded-lg bg-slate-800/30 p-4">
                  <ul className="list-disc space-y-2 pl-6 text-sm">
                    <li>
                      <strong className="text-slate-200">Sessió d&apos;autenticació:</strong> Mantenir la sessió
                      de l&apos;usuari al portal (app.empentia.com). Proveïdor: Supabase. Durada: sessió.
                    </li>
                    <li>
                      <strong className="text-slate-200">Preferències:</strong> Recordar les preferències
                      bàsiques de l&apos;usuari. Durada: 1 any.
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.2. Cookies analítiques (opcionals)</h4>
                <p>
                  Permeten obtenir informació estadística sobre l&apos;ús del Lloc Web de forma
                  agregada i anònima. En cas d&apos;activar-se serveis d&apos;analítica (com Vercel
                  Analytics, Google Analytics o similars), l&apos;usuari serà informat i se li
                  demanarà consentiment previ.
                </p>
                <div className="mt-3 rounded-lg bg-emerald-500/5 p-4 text-sm">
                  <strong className="text-slate-200">Estat actual:</strong> El Lloc Web no utilitza
                  cookies analítiques de tercers de manera activa. Si s&apos;incorporen en el futur,
                  aquesta política s&apos;actualitzarà en conseqüència.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>3. Mecanisme de consentiment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                En la primera visita al Lloc Web es mostra un avís de cookies amb tres
                opcions amb la mateixa rellevància visual: <strong className="text-slate-200">Acceptar
                totes</strong>, <strong className="text-slate-200">Rebutjar totes</strong> i{" "}
                <strong className="text-slate-200">Configurar</strong>. Les cookies no tècniques
                no s&apos;activen fins que l&apos;usuari n&apos;atorga consentiment explícit.
              </p>
              <p>
                El consentiment es desa al dispositiu de l&apos;usuari (localStorage i una
                cookie pròpia anomenada <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-emerald-400">empentia_cc</code>{" "}
                de durada 12 mesos) i inclou la versió de la política acceptada, la
                marca de temps i les categories activades. Transcorreguts 12 mesos, o
                si la versió de la política canvia, es torna a sol·licitar consentiment.
              </p>
              <p>
                L&apos;usuari pot <strong className="text-slate-200">modificar o revocar</strong>{" "}
                el seu consentiment en qualsevol moment des d&apos;aquesta mateixa pàgina,
                sense que això afecti la licitud del tractament anterior.
              </p>
              <div className="flex flex-wrap gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                <CookiePreferencesButton />
                <CookieResetButton />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>4. Configuració del navegador</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Addicionalment, l&apos;usuari pot configurar el seu navegador per bloquejar o
                eliminar les cookies. A continuació, s&apos;indiquen els enllaços de
                configuració dels navegadors més habituals:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Google Chrome:</strong>{" "}
                  <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-emerald-400">chrome://settings/cookies</code>
                </li>
                <li>
                  <strong className="text-slate-200">Mozilla Firefox:</strong>{" "}
                  <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-emerald-400">about:preferences#privacy</code>
                </li>
                <li>
                  <strong className="text-slate-200">Safari:</strong> Preferències → Privacitat
                </li>
                <li>
                  <strong className="text-slate-200">Microsoft Edge:</strong>{" "}
                  <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-emerald-400">edge://settings/privacy</code>
                </li>
              </ul>
              <p className="rounded-lg bg-emerald-500/5 p-4 text-sm">
                <strong className="text-slate-200">Nota:</strong> Si es bloquegen les cookies
                tècniques, algunes funcionalitats del Lloc Web (com l&apos;accés al portal de
                client) podrien no funcionar correctament.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>5. Actualització</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Aquesta Política de Cookies pot ser modificada en qualsevol moment. Qualsevol
                canvi serà publicat en aquesta pàgina. Recomanem revisar-la periòdicament.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col items-center gap-3 text-sm">
          <div className="flex items-center gap-6">
            <Link href="/ca/privacy" className="text-emerald-400 underline hover:text-emerald-300">
              Política de privacitat
            </Link>
            <Link href="/ca/legal" className="text-emerald-400 underline hover:text-emerald-300">
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
