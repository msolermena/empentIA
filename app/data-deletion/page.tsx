import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LegalLangSwitch } from "@/components/LegalLangSwitch";
import Link from "next/link";

export const metadata = {
  title: "Supresión de datos - empentIA",
  description: "Cómo solicitar la supresión de tus datos personales en empentIA",
  alternates: {
    canonical: "https://empentia.com/data-deletion/",
    languages: {
      es: "https://empentia.com/data-deletion/",
      ca: "https://empentia.com/ca/data-deletion/",
      "x-default": "https://empentia.com/data-deletion/",
    },
  },
};

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-background" lang="es">
      {/* Header */}
      <header className="border-b border-emerald-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center justify-between px-8">
          <Logo size="md" variant="image" />
          <LegalLangSwitch es="/data-deletion/" ca="/ca/data-deletion/" active="es" />
        </nav>
      </header>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-8 py-16">
        <h1 className="mb-2 text-4xl font-extrabold">Supresión de datos</h1>
        <p className="mb-8 text-sm text-slate-400">Última actualización: 6 de agosto de 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <p className="text-slate-300">
            empentIA Tech SL ofrece soluciones de mensajería de atención al cliente en nombre de
            sus clientes empresariales a través de la Plataforma de WhatsApp Business y otros
            canales.
          </p>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>1. Responsabilidad del tratamiento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Cuando empentIA opera un canal de mensajería en nombre de un cliente empresarial,
                dicho <strong className="text-slate-200">cliente es el responsable del tratamiento</strong>{" "}
                de los datos personales de los usuarios finales, y empentIA actúa como{" "}
                <strong className="text-slate-200">encargado del tratamiento</strong> por cuenta de
                este. Las solicitudes de supresión de datos personales se gestionan de acuerdo con
                el correspondiente contrato de encargo de tratamiento y el RGPD.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>2. Cómo solicitar la supresión de tus datos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Si has interactuado con una empresa a través de un canal de mensajería operado por
                empentIA y deseas solicitar la supresión de tus datos personales, puedes:
              </p>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  Contactar directamente con la empresa con la que interactuaste (el responsable del
                  tratamiento), o
                </li>
                <li>
                  Enviar un correo a{" "}
                  <a
                    href="mailto:hola@empentia.com?subject=Solicitud%20de%20supresi%C3%B3n%20de%20datos"
                    className="text-emerald-400 underline"
                  >
                    hola@empentia.com
                  </a>{" "}
                  con el asunto «Solicitud de supresión de datos», indicando el número de teléfono o
                  identificador utilizado y la empresa con la que contactaste.
                </li>
              </ol>
              <div className="rounded-lg bg-emerald-500/10 p-4">
                <p className="text-sm">
                  Tramitaremos tu solicitud sin dilación indebida y dentro del plazo que exige la
                  legislación aplicable (como máximo 30 días). Podremos verificar tu identidad antes
                  de tramitar la solicitud.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>3. Datos que podemos conservar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Podemos conservar determinados datos cuando sea necesario por motivos legales (por
                ejemplo, los registros necesarios para cumplir con obligaciones fiscales o
                contables), tal como se describe en nuestra{" "}
                <Link href="/privacy/" className="text-emerald-400 underline">
                  Política de Privacidad
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col items-center gap-3 text-sm">
          <div className="flex items-center gap-6">
            <Link href="/privacy/" className="text-emerald-400 underline hover:text-emerald-300">
              Política de privacidad
            </Link>
            <Link href="/terms/" className="text-emerald-400 underline hover:text-emerald-300">
              Términos de servicio
            </Link>
            <Link href="/legal/" className="text-emerald-400 underline hover:text-emerald-300">
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
