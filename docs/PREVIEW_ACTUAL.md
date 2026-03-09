# Landing Preview v2 — Estat actual

**Ruta:** `empentia.cat/preview`
**Última actualització:** Març 2026
**Fitxers:** `app/preview/page.tsx` + `components/landing-v2/*.tsx`

---

## Estructura visual (de dalt a baix)

---

### 1. Navbar (NavbarV2.tsx)

```
┌──────────────────────────────────────────────────────────────────────┐
│  [Logo empentIA]              Com funciona   Contacte   Accés clients│
└──────────────────────────────────────────────────────────────────────┘
```

- Fixed al top, transparent → blur amb border quan fas scroll
- Botons no funcionals (només visuals)
- "Accés clients" amb border emerald

---

### 2. Hero (HeroV2.tsx)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                       El teu negoci,                                 │
│                    en pilot automàtic.          ← emerald gradient    │
│                                                                      │
│           empentIA automatitza els processos que et fan               │
│           perdre temps i posa la IA a treballar amb les               │
│           teves dades reals. Tu supervises. El negoci avança.        │
│                                                                      │
│        ┌─────────────────────────────┬──────────────────────┐        │
│        │ La teva web (ex: empresa.cat) │ Comença l'auditoria → │        │
│        └─────────────────────────────┴──────────────────────┘        │
│                                                                      │
│              ✓ Gratuït    ✓ 3 minuts    ✓ Sense compromís            │
│                                                                      │
│         Ja saps què vols automatitzar? Explica'ns-ho →               │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Ocupa tota la pantalla (min-h-screen)
- Input i botó no funcionals (readOnly)
- Fons: slate-950 amb cercles decoratius emerald blur

---

### 3. Pain Points (PainPointsV2.tsx)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│    Si et passa alguna d'aquestes coses, empentIA és per a tu.        │
│                                                                      │
│    ✓ Tens feines que fas cada setmana que saps perfectament          │
│      que podrien fer-se soles                                        │
│                                                                      │
│    ✓ El teu equip perd temps picant dades, enviant recordatoris      │
│      o buscant documents                                             │
│                                                                      │
│    ✓ Has provat ChatGPT però no saps com connectar-ho al teu        │
│      negoci real                                                     │
│                                                                      │
│    ✓ Saps que la IA avança però no tens temps d'aprendre a           │
│      implementar-la                                                  │
│                                                                      │
│    ✓ Vols que el teu negoci funcioni millor sense haver              │
│      d'entendre de tecnologia                                        │
│                                                                      │
│        Si t'hi veus reflectit, empentIA és per a tu.                 │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- 5 ítems (vs 4 a la landing actual)
- Cada ítem: card amb border slate-800, hover emerald
- Tancament centrat amb "empentIA" en emerald-400

---

### 4. Examples + Cercle Virtuós (ExamplesV2.tsx)

#### 4a. Carousel d'exemples

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│              Processos reals que ja funcionen sols                    │
│    Automatitzacions i agents IA reals, funcionant en negocis         │
│    com el teu.                                                       │
│                                                                      │
│  ◄ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────  ►   │
│    │ 📊       │ │ 🔍       │ │ 💬       │ │ 💰       │ │ 🧾       │
│    │Pressu-   │ │Prospec-  │ │Assistent │ │Cobrament │ │Assis-    │
│    │postos    │ │tor       │ │comercial │ │intel·li- │ │tent      │
│    │automà-   │ │comercial │ │          │ │gent      │ │compta-   │
│    │tics      │ │          │ │          │ │          │ │ble       │
│    │"30s vs   │ │"Leads    │ │"Respon,  │ │"Cobra    │ │"Factu-   │
│    │ 15min"   │ │ nous"    │ │registra" │ │sense     │ │res que   │
│    └────▲─────┘ └──────────┘ └──────────┘ │perseguir"│ │es pro-   │
│         │                                  └──────────┘ │cessen"  │
│                                                         └─────     │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │ [Icona] Pressupostos automàtics          🟡 Automatització  │    │
│  │         El client demana, el sistema respon.                │    │
│  │                                                             │    │
│  │ 💬 Client escriu  → 🤖 IA extreu dades → 📄 PDF enviat    │    │
│  │    per WhatsApp       i aplica tarifes      en 30 seg      │    │
│  │                                                             │    │
│  │ Funciona 24/7. El client rep resposta immediata...          │    │
│  │                                                             │    │
│  │ ┌─── Abans ──────────┐ ┌─── Ara amb empentIA ──────────┐  │    │
│  │ │ 15 min per          │ │ Automàtic 24/7. El client     │  │    │
│  │ │ pressupost          │ │ rep resposta immediata.       │  │    │
│  │ └────────────────────┘ └────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- 8 exemples al carousel (scroll horitzontal amb fletxes)
- Detall expandit sota la card seleccionada
- Badge "Automatització" (amber) o "Agent IA" (purple)
- Bloc "Abans vs Ara" al final de cada detall
- **Contingut idèntic a la landing actual**

#### 4b. Cercle Virtuós (subsecció nova)

```
┌──────────────────────────────────────────────────────────────────────┐
│                     ── separador emerald ──                          │
│                                                                      │
│     Com més àrees automatitzes, més intel·ligent es torna tot.       │
│     Cada procés que automatitzes alimenta el coneixement             │
│     d'empentIA sobre el teu negoci. El resultat s'accelera sol.     │
│                                                                      │
│  ┌─────────────────┐    →    ┌─────────────────┐    →    ┌─────────────────┐ │
│  │ 1               │         │ 3               │         │ ∞               │ │
│  │ 1 automatització│         │ 3 automatitza-   │         │ El negoci en    │ │
│  │ activa          │         │ cions connectades│         │ pilot automàtic │ │
│  │                 │         │                  │         │                 │ │
│  │ "El teu equip   │         │ "empentIA        │         │ "Clients atesos,│ │
│  │  guanya 5h      │         │  comença a       │         │  factures       │ │
│  │  setmanals."    │         │  conèixer el teu │         │  cobrades,      │ │
│  │                 │         │  negoci."        │         │  oportunitats   │ │
│  └─────────────────┘         └─────────────────┘         │  detectades."   │ │
│                                                           └──────┬──────────┘ │
│                                                      border emerald subtil    │
│                                                                      │
│          Comencem per una. La resta ve sola. Comença l'auditoria →   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Desktop: 3 cards horitzontals amb fletxes `→` entre elles
- Mòbil: 3 cards verticals, sense fletxes
- Números (1, 3, ∞) en emerald-500, mida gran
- Última card amb border emerald subtil
- CTA text al final

---

### 5. How It Works (HowItWorksV2.tsx)

```
┌──────────────────────────────────────────────────────────────────────┐
│                          Com funciona                                │
│                                                                      │
│  ───────────────── línia emerald gradient ─────────────────          │
│                                                                      │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐         │
│  │  🔍      │   │  📄      │   │  🚀      │   │  📊      │         │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘         │
│   PAS 1          PAS 2          PAS 3          PAS 4                │
│   Auditoria      Proposta       Implementació  Funciona!            │
│   intel·ligent                                                       │
│                                                                      │
│   Abans de       Et presentem   Ho construïm   Supervisa            │
│   fer-te cap     solucions a    i configurem   resultats des        │
│   pregunta,      mida amb       nosaltres      de la teva           │
│   analitzem la   preu clar                     plataforma           │
│   teva web i                                                         │
│   el teu sector. ← TEXT NOU                       ← highlight verd  │
│   Arribes a la                                                       │
│   conversa i ja                                                      │
│   sabem de quin                                                      │
│   sector ets...                                                      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- **Pas 1 text actualitzat** (la resta igual que l'actual)
- Pas 4 amb fons gradient emerald (highlight)
- Desktop: 4 columnes; Mòbil: vertical

---

### 6. Platform (PlatformV2.tsx)

```
┌──────────────────────────────────────────────────────────────────────┐
│                       Plataforma empentIA                            │
│     Tot el que necessites per gestionar les teves                     │
│     automatitzacions i agents IA en un sol lloc.                     │
│                                                                      │
│  ┌───────────────────────┐    ┌──────────────────────────────┐      │
│  │                       │    │ ● ● ●  app.empentia.cat      │      │
│  │ 📊 Impacte mesurable  │    │ ┌──────────────────────────┐ │      │
│  │    Visualitza quantes │    │ │                          │ │      │
│  │    hores estalvies... │    │ │   [screenshot dashboard] │ │      │
│  │                       │    │ │                          │ │      │
│  │ ⚡ Automatitzacions   │    │ │                          │ │      │
│  │    actives            │    │ └──────────────────────────┘ │      │
│  │                       │    └──────────────────────────────┘      │
│  │ 🤖 Agents IA         │                                           │
│  │                       │                                           │
│  │ 🗄 Dades organitzades │                                           │
│  │                       │                                           │
│  │ 🔄 Sempre al dia     │                                           │
│  └───────────────────────┘                                           │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- **Còpia idèntica** de la secció actual
- 2 columnes desktop (features + screenshot)
- Imatge: `/images/screenshots/dashboard.png`

---

### 7. Why empentIA (WhyEmpentiaV2.tsx)

```
┌──────────────────────────────────────────────────────────────────────┐
│                        Per què empentIA                               │
│                                                                      │
│  ┌────────────────────────┐  ┌────────────────────────┐             │
│  │ ✨ Servei complet      │  │ 🔧 Fet a mida          │             │
│  │    Disseny, implemen-  │  │    Solucions adaptades  │             │
│  │    tació, manteniment  │  │    als teus processos   │             │
│  │    i suport.           │  │    reals.               │             │
│  └────────────────────────┘  └────────────────────────┘             │
│  ┌────────────────────────┐  ┌────────────────────────┐             │
│  │ 📅 Sense permanència   │  │ 🔄 Sempre actualitzat  │             │
│  │    Subscripció mensual │  │    Integrem les últimes │             │
│  │    flexible.           │  │    novetats en IA.      │             │
│  └────────────────────────┘  └────────────────────────┘             │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- **Còpia idèntica** de la secció actual
- Grid 2x2

---

### 8. Claims (ClaimsV2.tsx) — PREVIEW ONLY

```
┌──────────────────────────────────────────────────────────────────────┐
│                  fons: slate-900/50 (diferent)                       │
│                                                                      │
│                      La veu d'empentIA                                │
│                      (label petit slate-500)                         │
│                                                                      │
│  ┌─── CLAIMS TANCATS ────────┐  ┌─── EN REVISIÓ ─────────────────┐ │
│  │                            │  │                                 │ │
│  │ ┌────────────────────────┐ │  │ Claim #5 — Cascada de resultats│ │
│  │ │ "No és IA genèrica.   │ │  │ ┌─────────────────── Opció A ┐ │ │
│  │ │  Coneix els teus       │ │  │ │ "Les factures arriben      │ │ │
│  │ │  clients..."           │ │  │ │  cobrades. Els leads,      │ │ │
│  │ │  border: emerald-700  │ │  │ │  atesos..."                │ │ │
│  │ └────────────────────────┘ │  │ │  border: amber-700        │ │ │
│  │                            │  │ └────────────────────────────┘ │ │
│  │ ┌────────────────────────┐ │  │ ┌─────────────────── Opció B ┐ │ │
│  │ │ "No és una eina més.  │ │  │ │ "Cada dia, el teu negoci   │ │ │
│  │ │  És la que connecta   │ │  │ │  fa coses mentre tu fas    │ │ │
│  │ │  totes les altres."   │ │  │ │  altres coses."            │ │ │
│  │ └────────────────────────┘ │  │ └────────────────────────────┘ │ │
│  │                            │  │                                 │ │
│  │ ┌────────────────────────┐ │  │ Claim #6 — Una sola plataforma │ │
│  │ │ "Tu expliques el      │ │  │ ┌─────────────────── Opció A ┐ │ │
│  │ │  problema. Nosaltres  │ │  │ │ "No és un altre SaaS..."   │ │ │
│  │ │  el resolem."         │ │  │ └────────────────────────────┘ │ │
│  │ └────────────────────────┘ │  │ ┌─────────────────── Opció B ┐ │ │
│  │                            │  │ │ "La diferència entre       │ │ │
│  │ ┌────────────────────────┐ │  │ │  eines que fan coses..."   │ │ │
│  │ │ "Avui automatitzes    │ │  │ └────────────────────────────┘ │ │
│  │ │  una tasca. En 6      │ │  │                                 │ │
│  │ │  mesos, el teu negoci │ │  │                                 │ │
│  │ │  treballa sol."       │ │  │                                 │ │
│  │ └────────────────────────┘ │  │                                 │ │
│  └────────────────────────────┘  └─────────────────────────────────┘ │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- **No existirà a producció** — només per validar textos
- 2 columnes desktop, stack vertical mòbil
- Claims aprovats: border emerald-700
- Claims en revisió: border amber-700, badge "Opció A/B" en amber

---

### 9. CTA Final (FinalCTAV2.tsx)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│       ┌─────────────────────────────────────────────────┐           │
│       │          ~~~ glow emerald decoratiu ~~~         │           │
│       │                                                 │           │
│       │   Descobreix en 3 minuts quant temps perd       │           │
│       │   el teu negoci.                                │           │
│       │                                                 │           │
│       │   L'auditoria és gratuïta, sense compromís,     │           │
│       │   i et mostra oportunitats concretes per al     │           │
│       │   teu sector.                                   │           │
│       │                                                 │           │
│       │   ┌──────────────────┬────────────────────┐     │           │
│       │   │ La teva web...   │ Comença l'auditoria│     │           │
│       │   └──────────────────┴────────────────────┘     │           │
│       │                                                 │           │
│       │   ✓ Gratuït   ✓ 3 minuts   ✓ Sense compromís   │           │
│       │                                                 │           │
│       │   Ja saps què vols automatitzar? Explica'ns-ho →│           │
│       │                                                 │           │
│       └─────────────────────────────────────────────────┘           │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Card arrodonida amb border emerald i glow
- Input i botó no funcionals

---

### 10. Footer

```
┌──────────────────────────────────────────────────────────────────────┐
│  © 2026 empentIA     Política de privacitat  Avís legal  Cookies  Contacte │
└──────────────────────────────────────────────────────────────────────┘
```

- Enllaços no funcionals (només visuals)

---

## Diferències clau vs landing actual (`/`)

| Aspecte | Actual (`/`) | Preview (`/preview`) |
|---------|-------------|---------------------|
| H1 | "Guanya temps. Decideix millor." | "El teu negoci, en pilot automàtic." |
| Subtext Hero | 3 fragments separats | Frase fluida + "Tu supervises. El negoci avança." |
| Pain Points | Posició 6a, 4 ítems | Posició 3a (just sota Hero), 5 ítems nous |
| Títol Examples | "Exemples del que podem fer per tu" | "Processos reals que ja funcionen sols" |
| Cercle virtuós | No existeix | 3 cards progressives (1→3→∞) |
| How It Works Pas 1 | "Analitzem el teu negoci i detectem oportunitats" | Text llarg explicant anàlisi web prèvia |
| CTA Final títol | "Recupera hores cada setmana" | "Descobreix en 3 minuts quant temps perd el teu negoci." |
| CTA Final subtext | "Descobreix quins processos pots automatitzar" | "L'auditoria és gratuïta, sense compromís, i et mostra oportunitats concretes per al teu sector." |
| Claims | No existeix | Secció de validació amb claims aprovats + en revisió |
| Funcionalitat | Tot funcional (input, contacte, links) | Tot visual (res funcional) |

---

## Fitxers

| Fitxer | Línia | Què conté |
|--------|-------|-----------|
| `app/preview/page.tsx` | — | Pàgina principal, munta tots els components |
| `components/landing-v2/NavbarV2.tsx` | — | Navbar fixa amb scroll effect |
| `components/landing-v2/HeroV2.tsx` | — | Hero amb H1 + input + badges |
| `components/landing-v2/PainPointsV2.tsx` | — | 5 pain points amb checkmarks |
| `components/landing-v2/ExamplesV2.tsx` | — | Carousel 8 exemples + cercle virtuós |
| `components/landing-v2/HowItWorksV2.tsx` | — | 4 passos (pas 1 actualitzat) |
| `components/landing-v2/PlatformV2.tsx` | — | Funcionalitats + screenshot |
| `components/landing-v2/WhyEmpentiaV2.tsx` | — | Grid 2x2 de beneficis |
| `components/landing-v2/ClaimsV2.tsx` | — | Claims aprovats + en revisió |
| `components/landing-v2/FinalCTAV2.tsx` | — | CTA final amb input + badges |

---

*Document generat per iterar amb Claude Code. Actualitzar després de cada canvi.*
