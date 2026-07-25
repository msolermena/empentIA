import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LegalLangSwitch } from "@/components/LegalLangSwitch";
import Link from "next/link";

export const metadata = {
  title: "Términos de Servicio - empentIA",
  description: "Términos de servicio de empentIA para el canal de mensajería WhatsApp Business",
  alternates: {
    canonical: "https://empentia.com/terms/",
    languages: {
      es: "https://empentia.com/terms/",
      ca: "https://empentia.com/ca/terms/",
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
          <LegalLangSwitch es="/terms/" ca="/ca/terms/" active="es" />
        </nav>
      </header>

      <div className="container mx-auto max-w-4xl px-8 py-16">
        <h1 className="mb-2 text-4xl font-extrabold">Términos de Servicio</h1>
        <p className="mb-1 text-lg text-slate-300">Canal de mensajería de empentIA</p>
        <p className="mb-8 text-sm text-slate-400">Última actualización: 25 de julio de 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>1. Objeto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Los presentes Términos de Servicio regulan la prestación del servicio de atención al cliente y
                mensajería automatizada que empentIA Tech SL («empentIA») ofrece a través de la Plataforma de
                WhatsApp Business y otros canales de mensajería, tanto a sus clientes contratantes como a los
                usuarios finales que interactúan con estos canales.
              </p>
              <div className="rounded-lg bg-slate-800/30 p-4">
                <p className="text-sm">
                  <strong className="text-slate-200">Prestador del servicio:</strong><br />
                  Denominación social: empentIA Tech SL<br />
                  CIF: B88914098<br />
                  Domicilio: c/ Cortina 16, 08720 Vilafranca del Penedès (Barcelona)<br />
                  Contacto:{" "}
                  <a href="mailto:hola@empentia.com" className="text-emerald-400 underline">hola@empentia.com</a>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>2. Definiciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Cliente contratante:</strong> la empresa o profesional que
                  contrata a empentIA para operar un canal de mensajería en su nombre (por ejemplo, una administración de fincas).
                </li>
                <li>
                  <strong className="text-slate-200">Usuario final:</strong> la persona que escribe al canal de mensajería del cliente contratante.
                </li>
                <li>
                  <strong className="text-slate-200">Canal:</strong> el número y la cuenta de WhatsApp Business (o canal equivalente) a través del cual se presta el servicio.
                </li>
                <li>
                  <strong className="text-slate-200">Asistente de IA:</strong> el sistema automatizado que puede generar respuestas dentro del canal.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>3. Descripción del servicio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA proporciona una plataforma que permite al cliente contratante gestionar la atención al
                cliente a través de WhatsApp, incluyendo la recepción de mensajes, la generación de respuestas
                automatizadas mediante inteligencia artificial, la escalada a agentes humanos y el seguimiento de incidencias.
              </p>
              <p>
                El servicio se presta sobre la Cloud API oficial de Meta. empentIA actúa como proveedor tecnológico
                autorizado (Tech Provider).
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>4. Titularidad del canal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                La cuenta de WhatsApp Business (WABA) y el número de teléfono asociado al canal son{" "}
                <strong className="text-slate-200">propiedad del cliente contratante</strong>, no de empentIA.
                empentIA accede a ellos únicamente como proveedor tecnológico autorizado por el cliente.
              </p>
              <p>
                A la terminación de la relación contractual, el cliente conserva la titularidad de su número, su WABA
                y su historial de conversaciones, y puede desconectar a empentIA sin pérdida de estos activos.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>5. Uso automatizado e intervención humana (transparencia)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                En cumplimiento del Reglamento (UE) 2024/1689 sobre inteligencia artificial (AI Act), se informa de que:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Las respuestas del canal pueden estar <strong className="text-slate-200">generadas total o parcialmente por un sistema automatizado de inteligencia artificial</strong>.</li>
                <li>Se informa al usuario final de que está interactuando con un asistente automatizado.</li>
                <li>El usuario final puede <strong className="text-slate-200">solicitar la atención de una persona en cualquier momento</strong> escribiendo al canal.</li>
                <li>El asistente de IA no toma decisiones con efectos jurídicos sobre el usuario sin supervisión humana.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>6. Baja (opt-out) y control del usuario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                El usuario final puede dejar de recibir mensajes del canal en cualquier momento respondiendo{" "}
                <strong className="text-slate-200">STOP</strong> (o expresiones equivalentes configuradas). La solicitud se atiende de forma inmediata.
              </p>
              <p>
                empentIA respeta la ventana de servicio de 24 horas de WhatsApp: fuera de esta ventana, los mensajes
                solo se envían mediante plantillas previamente aprobadas por Meta, conforme a sus políticas.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>7. Protección de datos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>Respecto de los datos personales de los usuarios finales tratados a través del canal:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>El <strong className="text-slate-200">cliente contratante es el responsable del tratamiento</strong>.</li>
                <li><strong className="text-slate-200">empentIA actúa como encargado del tratamiento</strong> por cuenta del cliente, en virtud de un contrato de encargo de tratamiento firmado entre ambas partes conforme al artículo 28 del RGPD.</li>
                <li>
                  El tratamiento de datos se rige por la{" "}
                  <Link href="/privacy/" className="text-emerald-400 underline">Política de Privacidad</Link>{" "}
                  de empentIA y el correspondiente contrato de encargo.
                </li>
                <li>Los sistemas de IA utilizados actúan como subencargados, con las garantías contractuales adecuadas.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>8. Obligaciones del cliente contratante</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>El cliente contratante se compromete a:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Utilizar el canal conforme a las políticas de WhatsApp y Meta.</li>
                <li>No utilizar el canal para enviar comunicaciones no solicitadas (spam) ni contenido ilícito.</li>
                <li>Obtener el consentimiento o la base legal adecuados para comunicarse con sus usuarios finales.</li>
                <li>Mantener un método de pago válido con Meta para los costes de mensajería que Meta le factura directamente.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>9. Limitación de responsabilidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA presta el servicio con la diligencia debida, pero no garantiza la disponibilidad
                ininterrumpida de los servicios de terceros (Meta, WhatsApp) de los que depende el canal. empentIA no
                se responsabiliza de las interrupciones, cambios de política o costes impuestos por Meta.
              </p>
              <p>
                empentIA no se responsabiliza del contenido de los mensajes enviados por el cliente contratante ni del
                uso que el cliente haga del canal.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>10. Precios y facturación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA factura al cliente contratante los servicios de plataforma, integración y soporte según lo
                acordado contractualmente.
              </p>
              <p>
                <strong className="text-slate-200">Los costes de mensajería de WhatsApp los factura Meta directamente
                al cliente contratante.</strong> empentIA no los repercute ni aplica ningún margen sobre estos costes.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>11. Modificaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA puede modificar estos Términos para adaptarlos a cambios normativos, del servicio o de las
                políticas de Meta. Los cambios se publicarán en esta página.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>12. Legislación aplicable</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Estos Términos se rigen por la legislación española. Para cualquier controversia, las partes se
                someten a los juzgados y tribunales que correspondan conforme a la normativa aplicable.
              </p>
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
