import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Aviso Legal - empentIA",
  description: "Aviso legal y condiciones de uso de empentIA",
  alternates: {
    canonical: "https://empentia.com/legal/",
    languages: {
      es: "https://empentia.com/legal/",
      ca: "https://empentia.com/ca/legal/",
      "x-default": "https://empentia.com/legal/",
    },
  },
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
        <h1 className="mb-2 text-4xl font-extrabold">Aviso Legal</h1>
        <p className="mb-8 text-sm text-slate-400">Última actualización: 11 de febrero de 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>1. Datos identificativos del titular</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                En cumplimiento del deber de información establecido en el artículo 10 de la Ley
                34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de
                Comercio Electrónico (LSSI-CE), se informa de que los datos identificativos del
                titular de este sitio web son:
              </p>
              <div className="rounded-lg bg-slate-800/30 p-4">
                <p className="text-sm">
                  <strong className="text-slate-200">Denominación social:</strong> empentIA Tech SL<br />
                  <strong className="text-slate-200">CIF:</strong> B88914098<br />
                  <strong className="text-slate-200">Domicilio social:</strong> c/ Cortina 16, 08720 Vilafranca del Penedès (Barcelona)<br />
                  <strong className="text-slate-200">Correo electrónico:</strong>{" "}
                  <a href="mailto:hola@empentia.com" className="text-emerald-400 underline">
                    hola@empentia.com
                  </a><br />
                  <strong className="text-slate-200">Teléfono:</strong> 685 615 150<br />
                  <strong className="text-slate-200">Dominios web:</strong> empentia.com / app.empentia.com
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>2. Objeto y ámbito de aplicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                El presente aviso legal regula el uso y las condiciones de acceso a los sitios web
                empentia.com y app.empentia.com (en adelante, conjuntamente, &quot;el Sitio
                Web&quot;), propiedad de empentIA Tech SL (en adelante,
                &quot;empentIA&quot; o &quot;el Titular&quot;).
              </p>
              <p>
                empentIA es una plataforma de automatización y productividad basada en
                inteligencia artificial, diseñada para pequeñas y medianas empresas.
                Los servicios incluyen: auditorías automatizadas de procesos empresariales,
                implementación de automatizaciones, herramientas de IA personalizadas y un portal
                de gestión para clientes.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>3. Condiciones generales de uso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                El acceso al Sitio Web atribuye la condición de usuario e implica la aceptación
                plena y sin reservas de todas las disposiciones incluidas en este Aviso Legal,
                la Política de Privacidad y la Política de Cookies, en la versión publicada en
                el momento en que el usuario acceda al Sitio Web.
              </p>
              <p>
                El usuario se compromete a hacer un uso adecuado de los contenidos y servicios
                ofrecidos a través del Sitio Web, absteniéndose de:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Realizar actividades ilícitas o contrarias a la buena fe y al orden público.</li>
                <li>Difundir contenidos de carácter racista, xenófobo, pornográfico, de apología del terrorismo o que atenten contra los derechos humanos.</li>
                <li>Provocar daños en los sistemas físicos y lógicos del Sitio Web o de sus proveedores.</li>
                <li>Intentar acceder a cuentas o áreas restringidas del Sitio Web sin autorización.</li>
                <li>Vulnerar los derechos de propiedad intelectual o industrial del Titular o de terceros.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>4. Propiedad intelectual e industrial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Todos los contenidos del Sitio Web, incluyendo de manera enunciativa pero no
                limitativa: textos, fotografías, gráficos, imágenes, iconos, tecnología, software,
                diseños, logotipos, marca empentIA y cualquier otro elemento susceptible de
                protección, son propiedad de empentIA Tech SL o de sus
                licenciantes, y están protegidos por las leyes de propiedad intelectual e industrial.
              </p>
              <p>
                Queda expresamente prohibida la reproducción, distribución, comunicación pública y
                transformación total o parcial de los contenidos del Sitio Web sin la autorización
                previa y expresa del Titular.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>5. Limitación de responsabilidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>El Titular no se hace responsable, de manera directa ni subsidiaria, de:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>La calidad del servicio, velocidad de acceso, correcto funcionamiento ni disponibilidad ininterrumpida del Sitio Web.</li>
                <li>Los daños que puedan causarse en los equipos del usuario por la utilización del Sitio Web.</li>
                <li>Los contenidos de páginas web de terceros enlazadas desde el Sitio Web.</li>
                <li>Las caídas, interrupciones o errores en el funcionamiento del Sitio Web.</li>
              </ul>
              <p>
                El Titular se reserva el derecho de modificar, suspender o eliminar cualquier elemento
                o servicio del Sitio Web en cualquier momento y sin aviso previo.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>6. Enlaces a terceros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                El Sitio Web puede contener enlaces a páginas web de terceros. El Titular no asume
                ninguna responsabilidad por el contenido, políticas de privacidad o prácticas de esos
                sitios web de terceros.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>7. Legislación aplicable y jurisdicción</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Las presentes condiciones se rigen por la legislación española. Para la resolución
                de cualquier controversia que pueda surgir en relación con el acceso o el uso del
                Sitio Web, las partes se someten a los juzgados y tribunales del domicilio del usuario,
                siempre que este tenga la condición de consumidor. En caso contrario, las partes se
                someten a los juzgados y tribunales de Barcelona.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>8. Modificaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                El Titular se reserva el derecho de modificar el presente Aviso Legal en cualquier
                momento. Las modificaciones serán efectivas desde el momento de su publicación
                en el Sitio Web.
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
            <Link href="/cookies" className="text-emerald-400 underline hover:text-emerald-300">
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
