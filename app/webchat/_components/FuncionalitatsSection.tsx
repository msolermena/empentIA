import {
  Search,
  ShoppingCart,
  FileText,
  Users,
  Globe,
  Settings,
  BarChart3,
  Zap,
} from "lucide-react";

interface FuncionalitatsProps {
  lang: "ca" | "es";
}

const content = {
  ca: {
    eyebrow: "Funcionalitats",
    title: "Tot el que necessita",
    titleEnd: "un comercial digital.",
    features: [
      {
        icon: Search,
        title: "Cerca intel·ligent al catàleg",
        desc: "Troba productes per nom, categoria, preu o característiques. Funciona amb catàlegs estàtics i sincronització dinàmica via API.",
      },
      {
        icon: ShoppingCart,
        title: "Afegeix al carret",
        desc: "L'agent afegeix productes directament al carret real de la teva botiga. Compatible amb WooCommerce i PrestaShop.",
      },
      {
        icon: FileText,
        title: "Pressupostos automàtics",
        desc: "Genera i envia pressupostos per email amb productes, preus, IVA i total. Sense intervenció manual.",
      },
      {
        icon: Users,
        title: "Captació de leads i escalada",
        desc: "Recull dades de contacte quan el client mostra interès i escala a humà quan cal. Notificació immediata al teu equip.",
      },
      {
        icon: Zap,
        title: "Widget lleuger en una línia",
        desc: "Instal·lació amb un sol script. Sense plugins, sense dependències. Funciona a qualsevol web o eCommerce.",
      },
      {
        icon: Settings,
        title: "Personalització completa",
        desc: "Colors, avatar, posició i CSS custom. L'agent s'integra al disseny de la teva web com si fos nadiu.",
      },
      {
        icon: Globe,
        title: "Multiidioma automàtic",
        desc: "Detecta l'idioma del visitant i respon en català, castellà, anglès o qualsevol altre idioma. Sense configuració.",
      },
      {
        icon: BarChart3,
        title: "Mètriques i analytics",
        desc: "Converses, leads, productes més consultats, rendiment de l'agent. Tot visible al teu panell en temps real.",
      },
    ],
  },
  es: {
    eyebrow: "Funcionalidades",
    title: "Todo lo que necesita",
    titleEnd: "un comercial digital.",
    features: [
      {
        icon: Search,
        title: "Búsqueda inteligente en el catálogo",
        desc: "Encuentra productos por nombre, categoría, precio o características. Funciona con catálogos estáticos y sincronización dinámica vía API.",
      },
      {
        icon: ShoppingCart,
        title: "Añade al carrito",
        desc: "El agente añade productos directamente al carrito real de tu tienda. Compatible con WooCommerce y PrestaShop.",
      },
      {
        icon: FileText,
        title: "Presupuestos automáticos",
        desc: "Genera y envía presupuestos por email con productos, precios, IVA y total. Sin intervención manual.",
      },
      {
        icon: Users,
        title: "Captación de leads y escalada",
        desc: "Recoge datos de contacto cuando el cliente muestra interés y escala a humano cuando es necesario. Notificación inmediata a tu equipo.",
      },
      {
        icon: Zap,
        title: "Widget ligero en una línea",
        desc: "Instalación con un solo script. Sin plugins, sin dependencias. Funciona en cualquier web o eCommerce.",
      },
      {
        icon: Settings,
        title: "Personalización completa",
        desc: "Colores, avatar, posición y CSS custom. El agente se integra al diseño de tu web como si fuera nativo.",
      },
      {
        icon: Globe,
        title: "Multiidioma automático",
        desc: "Detecta el idioma del visitante y responde en catalán, castellano, inglés o cualquier otro idioma. Sin configuración.",
      },
      {
        icon: BarChart3,
        title: "Métricas y analytics",
        desc: "Conversaciones, leads, productos más consultados, rendimiento del agente. Todo visible en tu panel en tiempo real.",
      },
    ],
  },
};

export function FuncionalitatsSection({ lang }: FuncionalitatsProps) {
  const t = content[lang];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-500">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t.title}{" "}
            <span className="text-slate-400">{t.titleEnd}</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-emerald-500/30 hover:bg-slate-900"
            >
              <div className="mb-4 inline-flex rounded-xl bg-emerald-500/10 p-3">
                <f.icon className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="mb-2 font-semibold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
