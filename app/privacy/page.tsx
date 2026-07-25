import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LegalLangSwitch } from "@/components/LegalLangSwitch";
import Link from "next/link";

export const metadata = {
  title: "Política de Privacidad - empentIA",
  description: "Política de privacidad y protección de datos de empentIA",
  alternates: {
    canonical: "https://empentia.com/privacy/",
    languages: {
      es: "https://empentia.com/privacy/",
      ca: "https://empentia.com/ca/privacy/",
      "x-default": "https://empentia.com/privacy/",
    },
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background" lang="es">
      {/* Header */}
      <header className="border-b border-emerald-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center justify-between px-8">
          <Logo size="md" variant="image" />
          <LegalLangSwitch es="/privacy/" ca="/ca/privacy/" active="es" />
        </nav>
      </header>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-8 py-16">
        <h1 className="mb-2 text-4xl font-extrabold">Política de Privacidad</h1>
        <p className="mb-8 text-sm text-slate-400">Última actualización: 25 de julio de 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>1. Responsable del tratamiento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                El responsable del tratamiento de los datos personales recogidos a través
                de este sitio web es:
              </p>
              <div className="rounded-lg bg-slate-800/30 p-4">
                <p className="text-sm">
                  <strong className="text-slate-200">Denominación social:</strong> empentIA Tech SL<br />
                  <strong className="text-slate-200">CIF:</strong> B88914098<br />
                  <strong className="text-slate-200">Domicilio:</strong> c/ Cortina 16, 08720 Vilafranca del Penedès (Barcelona)<br />
                  <strong className="text-slate-200">Contacto:</strong>{" "}
                  <a href="mailto:hola@empentia.com" className="text-emerald-400 underline">
                    hola@empentia.com
                  </a><br />
                  <strong className="text-slate-200">Teléfono:</strong> 685 615 150
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>2. Finalidades del tratamiento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-slate-300">
              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.1. Auditoría de automatización (empentia.com)</h4>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-slate-200">Datos recogidos:</strong> URL de la empresa, sector de actividad,
                    tamaño de la empresa, herramientas de software utilizadas, procesos empresariales, nombre,
                    correo electrónico, teléfono, cargo, preferencia de contacto.
                  </li>
                  <li>
                    <strong className="text-slate-200">Finalidad:</strong> Realizar una auditoría automatizada para
                    identificar oportunidades de automatización y mejorar la productividad de
                    la empresa auditada. Contactar al solicitante para hacerle llegar los resultados y,
                    si lo consiente, información comercial relacionada.
                  </li>
                  <li>
                    <strong className="text-slate-200">Base legal:</strong> Consentimiento del interesado (art. 6.1.a RGPD)
                    e interés legítimo para la prestación del servicio solicitado (art. 6.1.f RGPD).
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.2. Portal de cliente (app.empentia.com)</h4>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-slate-200">Datos recogidos:</strong> Correo electrónico, nombre, datos de
                    la empresa, información de negocio proporcionada voluntariamente (clientes, productos, facturas).
                  </li>
                  <li>
                    <strong className="text-slate-200">Finalidad:</strong> Gestión de la relación contractual, prestación de los
                    servicios de automatización y herramientas de IA contratados, y comunicación relacionada con el servicio.
                  </li>
                  <li>
                    <strong className="text-slate-200">Base legal:</strong> Ejecución de un contrato (art. 6.1.b RGPD).
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.3. Comunicaciones comerciales</h4>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-slate-200">Finalidad:</strong> Envío de información sobre servicios, novedades
                    y contenido de interés relacionado con la automatización y la inteligencia artificial para empresas.
                  </li>
                  <li>
                    <strong className="text-slate-200">Base legal:</strong> Consentimiento explícito del interesado (art. 6.1.a RGPD).
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.4. Scraping público</h4>
                <p>
                  Como parte del servicio de auditoría, empentIA accede a información públicamente
                  disponible en la página web de la empresa auditada (textos, metadatos, tecnologías
                  detectadas). Esta información se utiliza exclusivamente para personalizar
                  la auditoría y no incluye datos de carácter personal más allá de los ya públicos.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.5. Canal de mensajería WhatsApp (servicio operado por cuenta de clientes)</h4>
                <p>
                  Cuando empentIA presta el servicio de atención al cliente vía WhatsApp por cuenta de un
                  cliente suyo (por ejemplo, una administración de fincas), el cliente contratante es el{" "}
                  <strong className="text-slate-200">responsable del tratamiento</strong> de los datos de los
                  usuarios finales que escriben a ese canal, y empentIA actúa como{" "}
                  <strong className="text-slate-200">encargado del tratamiento</strong> en su nombre, en virtud
                  de un contrato de encargo de tratamiento firmado entre ambas partes (art. 28 RGPD).
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-slate-200">Datos tratados:</strong> número de teléfono, nombre de perfil
                    de WhatsApp, contenido de los mensajes intercambiados y metadatos asociados (marcas temporales,
                    estado de entrega).
                  </li>
                  <li>
                    <strong className="text-slate-200">Finalidad:</strong> gestión de consultas, incidencias y atención
                    al cliente a través del canal de WhatsApp, incluyendo respuestas generadas de forma automatizada
                    mediante sistemas de inteligencia artificial.
                  </li>
                  <li>
                    <strong className="text-slate-200">Base legal:</strong> la que determine el cliente responsable,
                    habitualmente la ejecución de un contrato o la relación de servicio con el usuario final
                    (art. 6.1.b RGPD) o el interés legítimo (art. 6.1.f RGPD).
                  </li>
                  <li>
                    <strong className="text-slate-200">Sistemas automatizados:</strong> las respuestas pueden ser
                    generadas por un asistente de IA. El usuario puede solicitar en cualquier momento la atención de
                    una persona, y puede darse de baja del canal respondiendo <strong className="text-slate-200">STOP</strong>.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>3. Destinatarios de los datos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Los datos personales podrán ser comunicados a los siguientes destinatarios, únicamente
                cuando sea necesario para la prestación del servicio:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Supabase Inc.</strong> — Proveedor de base de datos y autenticación (servidores en la UE).
                </li>
                <li>
                  <strong className="text-slate-200">Vercel Inc.</strong> — Proveedor de alojamiento web del frontend.
                </li>
                <li>
                  <strong className="text-slate-200">Railway Corp.</strong> — Proveedor de alojamiento del backend.
                </li>
                <li>
                  <strong className="text-slate-200">Anthropic PBC</strong> — Proveedor de inteligencia artificial para análisis y generación de contenido.
                </li>
                <li>
                  <strong className="text-slate-200">Brevo (Sendinblue)</strong> — Proveedor de envío de correos electrónicos.
                </li>
                <li>
                  <strong className="text-slate-200">Meta Platforms Ireland Ltd.</strong> — Proveedor de la
                  infraestructura de mensajería de WhatsApp Business Platform. En el tratamiento de los datos del
                  canal de WhatsApp, Meta actúa como responsable independiente respecto de las finalidades propias
                  determinadas por sus condiciones de servicio. Los datos se procesan a través de la Cloud API de Meta.
                </li>
              </ul>
              <p className="text-sm">
                No se realizarán transferencias internacionales de datos fuera del Espacio Económico
                Europeo sin las garantías adecuadas. En el caso de proveedores con sede en EE. UU.,
                nos aseguramos de que cuenten con las certificaciones o mecanismos de transferencia adecuados.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>4. Plazo de conservación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Datos de auditoría:</strong> Se conservarán durante un plazo
                  máximo de 12 meses desde su recogida, salvo que el interesado solicite su
                  supresión antes.
                </li>
                <li>
                  <strong className="text-slate-200">Datos de clientes:</strong> Se conservarán durante la vigencia de
                  la relación contractual y, posteriormente, durante los plazos legalmente establecidos
                  para atender posibles responsabilidades (5 años).
                </li>
                <li>
                  <strong className="text-slate-200">Comunicaciones comerciales:</strong> Hasta que el interesado revoque
                  su consentimiento.
                </li>
                <li>
                  <strong className="text-slate-200">Datos del canal WhatsApp:</strong> se conservarán según las
                  instrucciones del cliente responsable del tratamiento, y en todo caso no más allá de lo necesario
                  para la finalidad del servicio o de lo que establezca el contrato de encargo.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>5. Derechos de los interesados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>Toda persona tiene derecho a obtener confirmación sobre si estamos tratando sus datos personales. En particular, puede ejercer los siguientes derechos:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Acceso:</strong> Derecho a obtener información sobre sus datos personales objeto de tratamiento.
                </li>
                <li>
                  <strong className="text-slate-200">Rectificación:</strong> Derecho a solicitar la modificación de datos inexactos o incompletos.
                </li>
                <li>
                  <strong className="text-slate-200">Supresión:</strong> Derecho a solicitar la eliminación de sus datos (&quot;derecho al olvido&quot;).
                </li>
                <li>
                  <strong className="text-slate-200">Limitación:</strong> Derecho a solicitar la limitación del tratamiento en determinados supuestos.
                </li>
                <li>
                  <strong className="text-slate-200">Portabilidad:</strong> Derecho a recibir los datos en un formato estructurado y de uso común.
                </li>
                <li>
                  <strong className="text-slate-200">Oposición:</strong> Derecho a oponerse al tratamiento de sus datos.
                </li>
              </ul>
              <div className="rounded-lg bg-emerald-500/10 p-4">
                <p className="text-sm">
                  <strong className="text-emerald-400">Para ejercer estos derechos:</strong><br />
                  Envía un email a{" "}
                  <a href="mailto:hola@empentia.com" className="text-emerald-400 underline">
                    hola@empentia.com
                  </a>{" "}
                  indicando el derecho que quieres ejercer y adjuntando una copia del documento de identidad.
                  Responderemos en un plazo máximo de 30 días.
                </p>
              </div>
              <p className="text-sm">
                Asimismo, tienes derecho a presentar una reclamación ante
                l&apos;<strong className="text-slate-200">Autoridad Catalana de Protección de Datos</strong>{" "}
                (<a href="https://apdcat.gencat.cat" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">apdcat.gencat.cat</a>)
                o l&apos;<strong className="text-slate-200">Agencia Española de Protección de Datos</strong>{" "}
                (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">aepd.es</a>).
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>6. Medidas de seguridad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA Tech SL ha adoptado las medidas técnicas y organizativas
                necesarias para garantizar la seguridad de los datos personales:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Cifrado de las comunicaciones (HTTPS/TLS)</li>
                <li>Autenticación segura mediante magic link (sin almacenamiento de contraseñas)</li>
                <li>Aislamiento de datos por cliente (arquitectura multi-tenant)</li>
                <li>Acceso restringido a los datos solo al personal autorizado</li>
                <li>Copias de seguridad periódicas</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>7. Actualización</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Esta Política de Privacidad puede ser modificada para adaptarla a novedades
                legislativas o cambios en nuestros servicios. Cualquier cambio será publicado en
                esta página. Recomendamos revisarla periódicamente.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col items-center gap-3 text-sm">
          <div className="flex items-center gap-6">
            <Link href="/terms/" className="text-emerald-400 underline hover:text-emerald-300">
              Términos de servicio
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
