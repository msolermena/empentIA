# empentIA Frontend

Frontend de l'aplicació empentIA desenvolupat amb Next.js 14, Tailwind CSS i shadcn/ui.

## 🎯 Descripció

Auditoria IA gratuïta per pimes catalanes. Sistema d'intel·ligència artificial que analitza empreses i genera recomanacions personalitzades d'automatització.

## 🚀 Quick Start

### Prerequisits

- Node.js 18+ 
- npm o pnpm

### Instal·lació

```bash
# Instal·lar dependències
npm install

# Copiar variables d'entorn
cp .env.example .env.local

# IMPORTANT: Edita .env.local amb la URL correcta del backend
# NEXT_PUBLIC_API_URL=https://empentia-backend-production.up.railway.app

# Iniciar servidor de desenvolupament
npm run dev
```

Obre [http://localhost:3000](http://localhost:3000) al navegador.

## 📁 Estructura del Projecte

```
empentia-frontend/
├── app/
│   ├── layout.tsx              # Layout principal amb metadata SEO
│   ├── page.tsx                # Landing page
│   ├── loading.tsx             # Loading global
│   ├── not-found.tsx           # 404 page
│   ├── globals.css             # Estils globals + utilitats
│   ├── audit/[id]/
│   │   ├── questions/page.tsx  # Qüestionari dinàmic (8 preguntes)
│   │   ├── email/page.tsx      # Lead capture
│   │   └── complete/page.tsx   # Thank you + download PDF
│   └── privacy/page.tsx        # Política privacitat GDPR
├── components/
│   ├── ui/                     # Components shadcn/ui
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── progress.tsx
│   └── Logo.tsx                # Logo empentIA (SVG)
├── lib/
│   ├── utils.ts                # Utilitats (cn helper)
│   └── api.ts                  # Client API backend
└── public/
    └── images/
        ├── logo/               # Logos SVG/PNG
        ├── favicons/           # Favicons
        └── social/             # OG images
```

## 🎨 Sistema de Disseny

### Colors

Paleta basada en logo empentIA:

- **Primary (Logo Blue):** `#3B82F6` (blue-500)
- **Accent (Emerald):** `#10B981` (emerald-500)
- **Background:** `#020617` (slate-950)
- **Cards:** `#0F172A` (slate-900)

### Components

Components base de shadcn/ui:
- Button (5 variants: default, success, outline, secondary, ghost)
- Input (glassmorphism focus states)
- Card (hover effects + backdrop blur)
- Badge (4 status: active, config, paused, error)
- Progress (gradient blue→emerald)

### Utilitats CSS Personalitzades

```css
.glass-card                    // Glassmorphism background
.gradient-text                 // Gradient slate→blue
.gradient-text-blue-emerald    // Gradient blue→emerald
.fade-in-up                    // Animation + delays
```

## 🔗 Integració Backend

Backend API: `https://empentia-backend-production.up.railway.app`

### Flow Complet

```
1. POST /scrape {url}
   → {company_id, pre_research}

2. POST /audit/start {company_id}
   → {audit_id}

3. POST /audit/next-question {audit_id, question_number: 1-8}
   → {question_text, type, options}

4. POST /audit/answer {audit_id, question_number, answer}
   → Save answer

5. POST /audit/generate {audit_id, email}
   → {audit, pdf_url}
```

### API Client

```typescript
import { scrapeAndStartAudit } from "@/lib/api";

// Combina scrape + start audit
const response = await scrapeAndStartAudit(url);
// → {audit_id, company_name, status}
```

## 📦 Scripts

```bash
npm run dev      # Desenvolupament (port 3000)
npm run build    # Build producció
npm run start    # Inicia producció
npm run lint     # Linter
```

## 🎯 Estratègia Terminologia (SEO)

### 3 Capes Aplicades:

**CAPA 1 - SEO (invisible):**
- Meta title, H1: "Auditoria IA per **Pimes Catalanes**"
- Keywords: "pimes catalanes", "automatització pimes"

**CAPA 2 - Copy (visible, emocional):**
- Subtítols, CTAs: "**la teva empresa**", "**el teu negoci**"
- Connexió emocional amb l'usuari

**CAPA 3 - Varietat natural:**
- Mix estratègic segons context

## 🔐 GDPR Compliance

- ✅ Política privacitat completa (`/privacy`)
- ✅ Consentiment explícit (checkbox obligatori)
- ✅ Dret a supressió, accés, rectificació
- ✅ Dades encriptades (HTTPS + DB encryption)
- ✅ Servidors UE (Supabase)
- ✅ DPA amb proveïdors (Anthropic, Resend)

## 🚧 TODO / Roadmap

- [ ] Implementar fetch real dades auditoria a `/complete`
- [ ] Integrar Calendly per "Reservar Demo"
- [ ] Afegir Analytics (Plausible)
- [ ] Descarregar PDF real (ara placeholder)
- [ ] Email transaccional amb PDF adjunt
- [ ] Testing E2E (Playwright)
- [ ] Optimitzar imatges (next/image)

## 📊 Pàgines Implementades

1. **Landing (`/`)** - Captura URL empresa
2. **Questions (`/audit/[id]/questions`)** - 8 preguntes dinàmiques
3. **Email (`/audit/[id]/email`)** - Lead capture
4. **Complete (`/audit/[id]/complete`)** - Thank you + PDF
5. **Privacy (`/privacy`)** - Política privacitat
6. **404 (`not-found`)** - Error page

## 🎨 Logos i Assets

### Logos Necessaris:

Afegir a `/public/images/logo/`:
- `logo-horizontal.svg` (180x45px) - Header
- `logo-square.svg` (256x256px) - Avatars

### Favicons:

Afegir a `/public/favicons/`:
- `favicon.ico`
- `apple-touch-icon.png` (180x180px)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

**Nota:** Sense aquests fitxers, el logo i favicons no es veuran. El component Logo té fallback a text.

## 🐛 Troubleshooting

### Error "failed to fetch"
- Verifica `NEXT_PUBLIC_API_URL` a `.env.local`
- Comprova que el backend està actiu (Railway)

### Logo no es veu
- Afegeix `logo-horizontal.svg` a `/public/images/logo/`
- O canvia `variant="text"` al component Logo

### 404 després de generar auditoria
- Backend necessita retornar `{success: true, pdf_url: "..."}`
- Comprova endpoint `/audit/generate`

---

**Desenvolupat per:** Arnau Orriols  
**Data:** Gener 2026  
**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
