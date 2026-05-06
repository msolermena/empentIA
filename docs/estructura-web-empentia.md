# Estructura web empentia.com

> Mapa de la arquitectura de información del sitio empentIA.
> Versión: mayo 2026 · Autor: empentIA

---

## 🌳 Mapa global

```
empentia.com (WEB GLOBAL)
│
├── /                                  ← Home brand: misión, verticales, casos
├── /quienes-somos                     ← Equipo + historia + valores
├── /casos-exito                       ← Casos reales (cross-vertical)
├── /blog                              ← Contenido / SEO
├── /contacto                          ← Form contacto general
│
├── 📁 /agentes-ia-atencion-cliente/   ← VERTICAL 1
│   ├── /                              ← Umbrella (5 canales)
│   ├── /webchat/                      ✅ activo
│   ├── /whatsapp/                     🔒 noindex (en construcción)
│   ├── /email/                        🔒 noindex
│   ├── /llamadas/                     🔒 noindex
│   └── /resenas/                      🔒 noindex
│
├── 📁 /gestion-documental/            ← VERTICAL 2 (nuevo)
│   ├── /                              ← Umbrella
│   ├── /facturas/                     ← Captura + clasificación
│   ├── /contratos/                    ← Análisis automático
│   ├── /albaranes/                    ← OCR + ERP
│   ├── /firma-digital/                ← Procesos firma
│   └── /archivo-inteligente/          ← Búsqueda semántica
│
├── 📁 /[vertical-3]/                  ← VERTICAL 3 (futuro)
│   └── ...
│
├── 📁 /[vertical-4]/                  ← VERTICAL 4 (futuro)
│   └── ...
│
├── 📁 /recursos/                      ← Hub de contenido
│   ├── /guias/
│   ├── /casos-uso/
│   ├── /comparativas/
│   └── /glosario-ia/
│
├── 📁 /precios/                       ← Pricing global comparativo
├── 📁 /partners/                      ← Programa de partners
│
└── 📁 /legal/
    ├── /aviso-legal
    ├── /privacidad
    ├── /cookies
    └── /condiciones
```

---

## 🧭 Lógica de navegación

### Nav web global

```
[Logo empentIA] [Soluciones ▾] [Casos] [Recursos] [Precios] [Acceso clientes →] [Empezar]
                  ├ Atención al cliente
                  ├ Gestión documental
                  ├ [Vertical 3]
                  └ Ver todas →
```

### Nav dentro de un vertical (ej: gestión documental)

```
[Logo empentIA] [Servicios ▾] [Cómo funciona] [Quiénes somos] [Acceso clientes →] [Contratar]
                  ├ Facturas
                  ├ Contratos
                  ├ Albaranes
                  ├ Firma digital
                  └ Archivo inteligente
```

---

## 📊 Justificación de decisiones

| Decisión | Por qué |
|----------|---------|
| **Home global** distinta de los verticales | Permite posicionar empentIA como marca paraguas, no encasillada en un solo producto |
| **Cada vertical con umbrella + subpáginas** | Mismo patrón que ya funciona en atención al cliente. Replicable, escalable, bueno para SEO |
| **Subpáginas con membresía propia** | Cada servicio = producto SaaS independiente contratable por separado |
| **`/recursos/`, `/blog/` separados** | Captura tráfico SEO genérico (no comercial directo), nutre todos los verticales |
| **`/casos-exito/` cross-vertical** | Storytelling unificado de marca, no fragmentado por vertical |
| **`/precios/` global** | Comparador transversal — útil cuando el cliente valora múltiples verticales |
| **`noindex` en servicios no live** | Patrón ya implementado en webchat. Replicable en nuevos servicios en construcción |

---

## 🚦 Estado actual vs futuro

| Página | Estado |
|--------|--------|
| `/agentes-ia-atencion-cliente/webchat/` | ✅ Live, completa |
| `/agentes-ia-atencion-cliente/` (umbrella) | ✅ Live (con próximamente para 4 servicios) |
| `/agentes-ia-atencion-cliente/whatsapp/` | 🔒 Existe pero noindex |
| `/agentes-ia-atencion-cliente/email/` | 🔒 Existe pero noindex |
| `/agentes-ia-atencion-cliente/llamadas/` | 🔒 Existe pero noindex |
| `/agentes-ia-atencion-cliente/resenas/` | 🔒 Existe pero noindex |
| `/legal/`, `/privacy/`, `/cookies/` | ✅ Existen |
| Home global empresarial | ❌ Pendiente |
| `/quienes-somos` | ❌ Pendiente |
| `/casos-exito` | ❌ Pendiente |
| `/blog` | ❌ Pendiente |
| `/contacto` | ❌ Pendiente |
| `/gestion-documental/` (vertical 2) | ❌ Pendiente |
| `/recursos/` | ❌ Pendiente |
| `/precios/` global | ❌ Pendiente |
| `/partners/` | ❌ Pendiente |

---

## 🛣️ Roadmap propuesto

### Fase 1 — Marca (corto plazo)
1. Home global (`/`) — para recibir tráfico genérico
2. `/quienes-somos` + `/contacto` — páginas básicas de marca
3. Activar nav global con dropdown "Soluciones"

### Fase 2 — Segundo vertical (medio plazo)
4. `/gestion-documental/` umbrella + 5 subpáginas
5. Replicar patrón webchat (estructura, bento grid, comparativa, etc.)

### Fase 3 — Servicios actuales (medio plazo)
6. Activar `/whatsapp/`, `/email/`, `/llamadas/`, `/resenas/` (uno a uno cuando estén listos)
7. Quitar noindex y enlazar desde umbrella + nav

### Fase 4 — Contenido y captación (largo plazo)
8. `/blog/` — captación SEO
9. `/casos-exito/` — storytelling
10. `/recursos/` — guías, comparativas, glosario
11. `/partners/` — programa partners

### Fase 5 — Más verticales (largo plazo)
12. Vertical 3 (a definir)
13. Vertical 4 (a definir)

---

## 📁 Carpetas físicas en el repo

```
nextjs/
├── app/                               ← Next.js (rutas dinámicas, audit, etc.)
│   ├── page.tsx                       ← Home global (a construir)
│   ├── layout.tsx
│   ├── audit/, legal/, privacy/, cookies/, test/
│   └── ...
│
└── public/                            ← HTML estáticos (landings)
    ├── agentes-ia-atencion-cliente/   ✅ ya existe
    ├── gestion-documental/            ❌ a crear
    ├── images/
    └── landing-webchat/               (deprecada — sustituida por agentes-ia-...)
```

---

## ✅ Convenciones a respetar

- **Idioma URL:** español (`/quienes-somos`, no `/about-us` ni `/qui-som`)
- **Slugs:** kebab-case (`gestion-documental`, no `gestionDocumental`)
- **Trailing slash:** sí (`/webchat/`, no `/webchat`)
- **noindex** en servicios no operativos: `<meta name="robots" content="noindex, nofollow">`
- **Sin enlaces** desde producción a páginas noindex (ni en navs ni en CTAs)
- **Membresía por servicio:** cada subpágina con sus 3-4 planes propios
- **Botón "Acceso clientes"** siempre visible en el nav (a `https://app.empentia.com/login`)
- **Diseño:** sistema de tokens (Fraunces serif + Instrument Sans + JetBrains Mono, paleta cream + verde marca `#2d5a3d`)

---

*Documento vivo. Actualizar según evolucione la estructura.*
