import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CookiePreferencesButton,
  CookieResetButton,
} from "@/components/CookiePreferencesButton";
import Link from "next/link";

export const metadata = {
  title: "Política de Cookies - empentIA",
  description: "Política de cookies de empentIA",
  alternates: {
    canonical: "https://empentia.com/cookies/",
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
        <p className="mb-8 text-sm text-slate-400">Última actualización: 11 de febrero de 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>1. ¿Qué son las cookies?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Las cookies son pequeños archivos de texto que se guardan en el dispositivo del
                usuario cuando visita un sitio web. Sirven para recordar información sobre la visita,
                como las preferencias de idioma, datos de sesión o información estadística.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>2. ¿Qué cookies utilizamos?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-slate-300">
              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.1. Cookies técnicas (necesarias)</h4>
                <p className="mb-3">
                  Son esenciales para el funcionamiento del Sitio Web. Permiten la navegación y el uso
                  de funcionalidades básicas como la autenticación en el portal de cliente. No requieren
                  consentimiento.
                </p>
                <div className="rounded-lg bg-slate-800/30 p-4">
                  <ul className="list-disc space-y-2 pl-6 text-sm">
                    <li>
                      <strong className="text-slate-200">Sesión de autenticación:</strong> Mantener la sesión
                      del usuario en el portal (app.empentia.com). Proveedor: Supabase. Duración: sesión.
                    </li>
                    <li>
                      <strong className="text-slate-200">Preferencias:</strong> Recordar las preferencias
                      básicas del usuario. Duración: 1 año.
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.2. Cookies analíticas (opcionales)</h4>
                <p>
                  Permiten obtener información estadística sobre el uso del Sitio Web de forma
                  agregada y anónima. En caso de activarse servicios de analítica (como Vercel
                  Analytics, Google Analytics o similares), el usuario será informado y se le
                  solicitará consentimiento previo.
                </p>
                <div className="mt-3 rounded-lg bg-emerald-500/5 p-4 text-sm">
                  <strong className="text-slate-200">Estado actual:</strong> El Sitio Web no utiliza
                  cookies analíticas de terceros de manera activa. Si se incorporan en el futuro,
                  esta política se actualizará en consecuencia.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>3. Mecanismo de consentimiento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                En la primera visita al Sitio Web se muestra un aviso de cookies con tres
                opciones con la misma relevancia visual: <strong className="text-slate-200">Aceptar
                todas</strong>, <strong className="text-slate-200">Rechazar todas</strong> y{" "}
                <strong className="text-slate-200">Configurar</strong>. Las cookies no técnicas
                no se activan hasta que el usuario otorga su consentimiento explícito.
              </p>
              <p>
                El consentimiento se guarda en el dispositivo del usuario (localStorage y una
                cookie propia llamada <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-emerald-400">empentia_cc</code>{" "}
                de 12 meses de duración) e incluye la versión de la política aceptada, la
                marca de tiempo y las categorías activadas. Transcurridos 12 meses, o
                si la versión de la política cambia, se vuelve a solicitar el consentimiento.
              </p>
              <p>
                El usuario puede <strong className="text-slate-200">modificar o revocar</strong>{" "}
                su consentimiento en cualquier momento desde esta misma página,
                sin que ello afecte a la licitud del tratamiento anterior.
              </p>
              <div className="flex flex-wrap gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                <CookiePreferencesButton />
                <CookieResetButton />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>4. Configuración del navegador</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Adicionalmente, el usuario puede configurar su navegador para bloquear o
                eliminar las cookies. A continuación, se indican los enlaces de
                configuración de los navegadores más habituales:
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
                  <strong className="text-slate-200">Safari:</strong> Preferencias → Privacidad
                </li>
                <li>
                  <strong className="text-slate-200">Microsoft Edge:</strong>{" "}
                  <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-emerald-400">edge://settings/privacy</code>
                </li>
              </ul>
              <p className="rounded-lg bg-emerald-500/5 p-4 text-sm">
                <strong className="text-slate-200">Nota:</strong> Si se bloquean las cookies
                técnicas, algunas funcionalidades del Sitio Web (como el acceso al portal de
                cliente) podrían no funcionar correctamente.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>5. Actualización</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Esta Política de Cookies puede ser modificada en cualquier momento. Cualquier
                cambio será publicado en esta página. Recomendamos revisarla periódicamente.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col items-center gap-3 text-sm">
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-emerald-400 underline hover:text-emerald-300">
              Política de privacidad
            </Link>
            <Link href="/legal" className="text-emerald-400 underline hover:text-emerald-300">
              Aviso legal
            </Link>
          </div>
          <Link href="/" className="text-slate-500 hover:text-slate-300">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
