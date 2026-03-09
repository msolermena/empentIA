# SPEC: Landing Page Preview v2
**Projecte:** empentIA — empentia.cat  
**Data:** Març 2026  
**Autor:** Arnau Orriols  
**Estat:** Llest per implementar

---

## Objectiu

Crear una versió preview de la landing page amb els nous textos i estructura, **sense modificar cap fitxer existent**. L'objectiu és poder comparar la versió actual amb la nova visualment abans de decidir implementar-la a producció.

---

## Principi fonamental: zero risc

- **NO modificar** cap fitxer existent de la landing actual
- **NO tocar** cap component d'auditoria ni d'informe
- Tots els fitxers nous van a `app/preview/` o equivalent aïllat
- Quan es vulgui implementar: és un copy-paste controlat, fitxer per fitxer

---

## Ruta d'accés a la preview

La preview ha de ser accessible a:
```
empentia.cat/preview
```
o equivalent local (`localhost:3000/preview`).

La landing actual (`/`) no es toca.

---

## Estructura de fitxers a crear

```
app/
└── preview/
    └── page.tsx                  ← Pàgina principal preview (importa tots els components)

components/
└── landing-v2/
    ├── NavbarV2.tsx
    ├── HeroV2.tsx
    ├── PainPointsV2.tsx
    ├── ExamplesV2.tsx            ← Inclou subsecció "El cercle virtuós"
    ├── HowItWorksV2.tsx
    ├── PlatformV2.tsx            ← Sense canvis de fons, però inclosa per completesa
    ├── WhyEmpentiaV2.tsx
    └── FinalCTAV2.tsx
```

Reutilitza components i estils existents (Tailwind, fonts, colors) sense modificar-los.

---

## Disseny i estil

Segueix exactament el disseny actual:
- Fons: `#020617` (slate-950)
- Cards: `#0F172A` (slate-900)
- Superfícies elevades: `#1E293B` (slate-800)
- Color principal: `#10B981` (emerald-500)
- Gradient CTAs: `linear-gradient(135deg, #10B981, #047857)`
- Font: Inter (igual que l'actual)
- Logo: reutilitza el component Logo existent

---

## Seccions i contingut

### 1. NavbarV2
Idèntica a la navbar actual. Reutilitza el component existent sense canvis.

---

### 2. HeroV2

**Layout:** Idèntic a l'actual (centrat, fons fosc, input + botó CTA).

**Contingut:**

```
H1:
"El teu negoci, en pilot automàtic."

Subtext:
"empentIA automatitza els processos que et fan perdre temps
i posa la IA a treballar amb les teves dades reals.
Tu supervises. El negoci avança."

CTA principal (botó verd gradient):
"Comença l'auditoria →"

Input placeholder:
"La teva web (ex: empresa.cat)"

Checks sota el CTA (igual que ara):
✓ Gratuït   ✓ 3 minuts   ✓ Sense compromís

CTA secundari (link subtil sota els checks):
"Ja saps què vols automatitzar? Explica'ns-ho →"
```

**Notes d'implementació:**
- "en pilot automàtic." — la segona línia del H1 en color emerald-500, igual que "Decideix millor." a l'actual
- El subtext és una sola frase fluida, no tres fragments separats

---

### 3. PainPointsV2

**Posició:** Just sota el Hero. A l'actual és la penúltima secció — ara puja aquí.

**Layout:** Llista vertical de checkmarks, igual que l'actual.

**Contingut:**

```
Títol:
"Si et passa alguna d'aquestes coses, empentIA és per a tu."

Ítems (5, amb checkmark verd):
✓ "Tens feines que fas cada setmana que saps perfectament que podrien fer-se soles"
✓ "El teu equip perd temps picant dades, enviant recordatoris o buscant documents"
✓ "Has provat ChatGPT però no saps com connectar-ho al teu negoci real"
✓ "Saps que la IA avança però no tens temps d'aprendre a implementar-la"
✓ "Vols que el teu negoci funcioni millor sense haver d'entendre de tecnologia"

Tancament (text subtil centrat sota la llista):
"Si t'hi veus reflectit, empentIA és per a tu."
→ "empentIA" en emerald-500
```

**Notes:**
- L'ítem #5 és el substitut del descartat "no tens departament IT". To propositiu, no defensiu.
- Mateixa estructura visual que l'actual.

---

### 4. ExamplesV2

**Layout:** Igual que l'actual — carousel de tabs a dalt, detall expandit a baix.

**Canvi de títol:**

```
Títol: "Processos reals que ja funcionen sols"
Subtext: "Automatitzacions i agents IA reals, funcionant en negocis com el teu."
```

Els exemples individuals (Pressupostos automàtics, Prospector comercial, etc.) es mantenen exactament igual — contingut i disseny sense canvis.

**NOVA subsecció sota els exemples: "El cercle virtuós"**

Afegir just a sota del carousel d'exemples, dins la mateixa secció, amb un separador visual suau (línia o espai generós):

```
Títol subsecció:
"Com més àrees automatitzes, més intel·ligent es torna tot."

Subtext breu:
"Cada procés que automatitzes alimenta el coneixement d'empentIA
sobre el teu negoci. El resultat s'accelera sol."
```

Layout dels 3 passos: cards horitzontals (desktop) / verticals (mòbil), amb fletxes o connector visual entre ells:

```
┌─────────────────────┐    →    ┌─────────────────────┐    →    ┌─────────────────────┐
│  1 automatització   │         │  3 automatitzacions  │         │  El negoci en       │
│  activa             │         │  connectades         │         │  pilot automàtic    │
│                     │         │                      │         │                     │
│ "El teu equip       │         │ "empentIA comença a  │         │ "Clients atesos,    │
│  guanya 5h          │         │  conèixer el teu     │         │  factures cobrades, │
│  setmanals."        │         │  negoci. Les accions │         │  oportunitats       │
│                     │         │  es coordinen soles."│         │  detectades."       │
└─────────────────────┘         └─────────────────────┘         └─────────────────────┘
```

Estil de les cards:
- Fons: slate-900 (`#0F172A`)
- Border: slate-700 subtil
- Número (1, 3, ∞) en gran, color emerald-500, dalt a l'esquerra de cada card
- Text descripció: slate-200
- Connector entre cards: fletxa `→` o línia amb gradient emerald (desktop) / absent (mòbil)
- Última card (pilot automàtic): border emerald subtil per destacar-la lleugerament

CTA subtil sota les tres cards:
```
"Comencem per una. La resta ve sola."
→ Link/botó secundari: "Comença l'auditoria →"
```

---

### 5. HowItWorksV2

**Layout:** Idèntic a l'actual (4 passos en línia).

**Únic canvi — Pas 1:**

```
PAS 1
Auditoria intel·ligent
"Abans de fer-te cap pregunta, analitzem la teva web i el teu sector.
Arribes a la conversa i ja sabem de quin sector ets, quines eines
probablement fas servir i on tens més marge de millora."
```

Passos 2, 3 i 4: sense canvis.

---

### 6. PlatformV2

Sense canvis de contingut. Reutilitza el component actual (o còpia idèntica).

---

### 7. WhyEmpentiaV2

**Layout:** Grid 2x2 igual que l'actual.

**Contingut:** Les 4 cards es mantenen amb els mateixos títols i textos actuals. Cap canvi en aquesta secció per ara.

---

### 8. FinalCTAV2

**Layout:** Idèntic a l'actual (caixa centrada, input + botó).

**Contingut actualitzat:**

```
Títol:
"Descobreix en 3 minuts quant temps perd el teu negoci."

Subtext:
"L'auditoria és gratuïta, sense compromís,
i et mostra oportunitats concretes per al teu sector."

CTA principal (igual que ara):
[input web] [Comença l'auditoria →]

Checks (igual que ara):
✓ Gratuït   ✓ 3 minuts   ✓ Sense compromís

CTA secundari (mantenir):
"Ja saps què vols automatitzar? Explica'ns-ho →"
```

---

## Ordre de seccions (diferent de l'actual)

| # | Secció | Canvi vs. actual |
|---|--------|-----------------|
| 1 | Navbar | Sense canvis |
| 2 | **Hero** | Copy nou ← |
| 3 | **Pain Points** | Puja des de posició 6 + copy nou ← |
| 4 | **Examples** | Títol nou + subsecció cercle virtuós ← |
| 5 | **How It Works** | Pas 1 nou ← |
| 6 | Platform | Sense canvis |
| 7 | Why empentIA | Sense canvis |
| 8 | **Final CTA** | Copy nou ← |
| 9 | Footer | Sense canvis |

---

## Responsive

Segueix exactament el comportament responsive actual:
- Mobile < 640px: stack vertical, padding reduït
- Tablet 640-1024px: 2 columnes on aplica
- Desktop > 1024px: layout complet

La subsecció "Cercle virtuós" específicament:
- Desktop: 3 cards en horitzontal amb connectors
- Mòbil: 3 cards en vertical, sense connectors (massa estret)

---

## Checklist de validació abans de lliurar

- [ ] `/preview` accessible i renderitza sense errors
- [ ] `/` (landing actual) segueix funcionant exactament igual
- [ ] Cap import de components v2 als fitxers existents
- [ ] Hero: H1 dues línies, segona en emerald
- [ ] Pain Points: 5 ítems amb checkmark verd
- [ ] Cercle virtuós: 3 cards amb números, connector desktop, CTA subtil
- [ ] How It Works Pas 1: text nou sense "de quin peu calces"
- [ ] Final CTA: nou títol i subtext
- [ ] Responsive correcte a mòbil i desktop
- [ ] Colors i fonts coherents amb el disseny actual

---

## Secció addicional: Claims de marca (en revisió — mostrar a la preview)

Afegir una nova secció entre `WhyEmpentiaV2` i `FinalCTAV2` anomenada **`ClaimsV2`**, exclusivament per a la preview. L'objectiu és veure com ressonen els claims renderitzats en context real abans de decidir el text definitiu i si mereixen secció pròpia o s'integren en seccions existents.

### ClaimsV2 — Layout

Secció amb fons lleugerament diferent (slate-900 en lloc de slate-950) per delimitar-la visualment. Títol petit i discret a dalt: `"La veu d'empentIA"` en slate-400, mida petita — és un label intern de preview, no copy definitiu.

A continuació, **dos blocs de claims en paral·lel** (desktop: 2 columnes; mòbil: stack vertical) per poder comparar les dues opcions pendents de tancar:

---

### Bloc A — Claims tancats (mostrar tal qual, en verd)

Aquests 4 ja estan aprovats. Mostrar-los com a quotes o cards simples:

```
1. "No és IA genèrica. Coneix els teus clients,
    les teves tarifes i com et comuniques."

2. "No és una eina més. És la que connecta totes les altres."

3. "Tu expliques el problema. Nosaltres el resolem. Tu ho controles."

4. "Avui automatitzes una tasca. En 6 mesos, el teu negoci treballa sol."
```

Estil: card slate-800, border emerald-700 subtil, text slate-200, mida body normal.

---

### Bloc B — Claims pendents de tancar (mostrar amb badge "EN REVISIÓ")

**Claim #5 — Cascada de resultats** (dues opcions, mostrar les dues amb label A/B):

```
Opció A:
"Les factures arriben cobrades. Els leads, atesos.
Els clients, contents. Sense que ningú ho hagi de recordar."

Opció B:
"Cada dia, el teu negoci fa coses mentre tu fas altres coses."
```

**Claim #6 — Una sola plataforma** (dues opcions, mostrar les dues amb label A/B):

```
Opció A:
"No és un altre SaaS. És el que connecta i recorda tot el que ja tens."

Opció B:
"La diferència entre eines que fan coses
i un sistema que coneix el teu negoci."
```

Estil dels claims en revisió: card slate-800, border amber-700 subtil (per diferenciar dels aprovats), badge petit `EN REVISIÓ` en amber-500 a dalt a la dreta de cada card.

---

### Notes per a Claude Code sobre ClaimsV2

- Aquesta secció **no existirà a producció** — és exclusivament per a la preview de validació
- No cal CTA ni botó dins la secció — és purament informativa
- Si la secció queda visualment sorollosa, simplifica el layout: una columna, tots els claims seguits, amb el badge `EN REVISIÓ` per distingir els pendents

---

## El que NO fa aquesta spec

- Cap canvi a l'auditoria (P1-P5)
- Cap canvi a l'informe
- Cap canvi al portal (app.empentia.cat)
- Cap canvi als plans/pricing (pendent de decisions finals)
- Cap canvi al navbar ni footer

---

## Checklist de validació actualitzat

- [ ] `/preview` accessible i renderitza sense errors
- [ ] `/` (landing actual) segueix funcionant exactament igual
- [ ] Cap import de components v2 als fitxers existents
- [ ] Hero: H1 dues línies, segona en emerald
- [ ] Pain Points: 5 ítems amb checkmark verd, ítem #5 nou inclòs
- [ ] Cercle virtuós: 3 cards amb números, connector desktop, CTA subtil
- [ ] How It Works Pas 1: text nou (sense "de quin peu calces")
- [ ] Final CTA: nou títol i subtext
- [ ] ClaimsV2: 4 claims aprovats (verd) + 4 opcions en revisió (amber)
- [ ] Responsive correcte a mòbil i desktop
- [ ] Colors i fonts coherents amb el disseny actual

---

## Notes finals per a Claude Code

1. Si algun component actual ja està ben factoritzat (ex: el botó CTA, els checks), reutilitza'l directament — no el reimplementis.
2. El component `Logo` existent es reutilitza tal qual a `NavbarV2`.
3. Si no trobes un component existent per a alguna cosa, implementa-ho inline al component V2 — no creïs nous components compartits que puguin afectar l'actual.
4. La subsecció "Cercle virtuós" és nova i no té referència visual a l'actual — té llibertat de disseny dins el sistema de disseny existent (slate-950/900, emerald-500, Inter).
5. La secció `ClaimsV2` és de preview — disseny simple i funcional, no cal que sigui perfecta. L'important és que els textos siguin llegibles i comparables.

---

*Spec v1.1 — Març 2026 | Llest per passar a Claude Code*
