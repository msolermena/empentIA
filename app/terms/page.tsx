import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LegalLangSwitch } from "@/components/LegalLangSwitch";
import Link from "next/link";

export const metadata = {
  title: "Términos de Servicio - empentIA",
  description: "Términos y condiciones del servicio de empentIA, incluido el canal de mensajería WhatsApp Business",
  alternates: {
    canonical: "https://empentia.com/terms/",
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
    <div className="min-h-screen bg-background" lang="es">
      <header className="border-b border-emerald-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center justify-between px-8">
          <Logo size="md" variant="image" />
          <LegalLangSwitch es="/terms/" ca="/ca/terms/" en="/en/terms/" active="es" />
        </nav>
      </header>

      <div className="container mx-auto max-w-4xl px-8 py-16">
        <h1 className="mb-2 text-4xl font-extrabold">Términos de Servicio</h1>
        <p className="mb-8 text-sm text-slate-400">Última actualización: 25 de julio de 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>1. Objeto y aceptación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Los presentes Términos de Servicio regulan la prestación de los servicios de automatización e
                inteligencia artificial ofrecidos por <strong className="text-slate-200">empentIA Tech SL</strong>{" "}
                (en adelante, «empentIA»), con CIF B88914098 y domicilio en c/ Cortina 16, 08720 Vilafranca del
                Penedès (Barcelona).
              </p>
              <p>
                La contratación de los servicios o el uso de sus canales implica la aceptación plena de estos
                términos. Cuando el servicio se preste a una empresa, la persona que lo contrata declara tener
                capacidad suficiente para obligar a dicha empresa.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>2. Descripción del servicio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>empentIA ofrece, entre otros, los siguientes servicios:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Automatización de procesos administrativos y de negocio.</li>
                <li>Herramientas de inteligencia artificial para el análisis y la generación de contenido.</li>
                <li>
                  Configuración y operación de canales de mensajería (incluida la Plataforma de WhatsApp Business)
                  para la atención y comunicación con las personas usuarias de la empresa cliente.
                </li>
              </ul>
              <p>
                El alcance concreto de cada servicio se define en la propuesta o contrato firmado con el cliente.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>3. Canal de WhatsApp Business: titularidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  La cuenta de WhatsApp Business (WABA) y el número de teléfono asociado son{" "}
                  <strong className="text-slate-200">propiedad de la empresa cliente</strong>. empentIA únicamente
                  los configura y opera por cuenta del cliente, sin adquirir ningún derecho de titularidad sobre ellos.
                </li>
                <li>
                  Los datos y las conversaciones que circulan por el canal pertenecen a la empresa cliente, que
                  actúa como responsable del tratamiento. empentIA actúa como encargado, según se describe en la{" "}
                  <Link href="/privacy/" className="text-emerald-400 underline">Política de Privacidad</Link>.
                </li>
                <li>
                  A la finalización del servicio, el control de la cuenta y del número se mantiene en la empresa
                  cliente, y empentIA suprime o devuelve los datos conforme al contrato de encargo del tratamiento.
                </li>
                <li>
                  El uso del canal está sujeto a las políticas de WhatsApp y de Meta Platforms Ireland Ltd. El
                  cliente se compromete a respetarlas.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>4. Uso del canal de mensajería y baja (opt-out)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Las comunicaciones a través del canal respetan las reglas de la Plataforma de WhatsApp Business,
                  incluida la <strong className="text-slate-200">ventana de atención de 24 horas</strong>: fuera de
                  ese periodo solo se envían mensajes mediante plantillas previamente aprobadas.
                </li>
                <li>
                  Cualquier persona usuaria puede darse de baja y dejar de recibir mensajes en cualquier momento
                  escribiendo <strong className="text-slate-200">«STOP»</strong> (o la opción equivalente indicada
                  en la conversación). La solicitud de baja se atiende de forma inmediata.
                </li>
                <li>
                  No se utiliza el canal para envíos masivos no solicitados ni para finalidades distintas de las
                  informadas a la persona usuaria.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>5. Respuestas automatizadas e inteligencia artificial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Parte de las respuestas del canal pueden estar{" "}
                  <strong className="text-slate-200">generadas por un sistema automatizado de inteligencia
                  artificial</strong>. Esta circunstancia se comunica de forma clara a la persona usuaria,
                  en cumplimiento del principio de transparencia del Reglamento Europeo de Inteligencia
                  Artificial (AI Act).
                </li>
                <li>
                  La persona usuaria puede <strong className="text-slate-200">solicitar en cualquier momento la
                  atención de una persona</strong>, indicándolo en la conversación. La solicitud se deriva al
                  equipo humano de la empresa cliente.
                </li>
                <li>
                  Las respuestas automatizadas tienen carácter informativo y de asistencia; no sustituyen el
                  asesoramiento profesional cuando este sea necesario.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>6. Obligaciones del cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>Facilitar información veraz y mantener sus datos actualizados.</li>
                <li>
                  Disponer de la base legal adecuada para el tratamiento de los datos de sus usuarios y, cuando
                  proceda, recabar su consentimiento.
                </li>
                <li>Utilizar el servicio conforme a la ley, a estos términos y a las políticas de las plataformas implicadas.</li>
                <li>No emplear el canal para contenidos ilícitos, engañosos o que vulneren derechos de terceros.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>7. Propiedad intelectual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                El software, las herramientas y los materiales desarrollados por empentIA son de su titularidad o
                de sus licenciantes. La contratación del servicio no transfiere derechos de propiedad intelectual
                más allá del uso pactado. Los contenidos y datos aportados por el cliente siguen siendo de su titularidad.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>8. Responsabilidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA presta el servicio con la diligencia debida, pero no garantiza la disponibilidad
                ininterrumpida de plataformas de terceros (como la de Meta) ni se responsabiliza de las
                interrupciones ajenas a su control. empentIA no responde del uso que el cliente haga del servicio
                ni de los contenidos que este publique o transmita.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>9. Duración, modificaciones y legislación aplicable</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>La duración del servicio es la establecida en el contrato o propuesta correspondiente.</li>
                <li>
                  empentIA puede modificar estos términos para adaptarlos a novedades legales o del servicio. Los
                  cambios se publicarán en esta página.
                </li>
                <li>
                  Estos términos se rigen por la legislación española. Para cualquier controversia, las partes se
                  someten a los juzgados y tribunales que legalmente correspondan.
                </li>
              </ul>
              <div className="rounded-lg bg-emerald-500/10 p-4">
                <p className="text-sm">
                  <strong className="text-emerald-400">Contacto:</strong>{" "}
                  <a href="mailto:hola@empentia.com" className="text-emerald-400 underline">hola@empentia.com</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 text-sm">
          <div className="flex items-center gap-6">
            <Link href="/privacy/" className="text-emerald-400 underline hover:text-emerald-300">
              Política de privacidad
            </Link>
            <Link href="/legal/" className="text-emerald-400 underline hover:text-emerald-300">
              Aviso legal
            </Link>
            <Link href="/cookies/" className="text-emerald-400 underline hover:text-emerald-300">
              Política de cookies
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
