# CLAUDE.md — Instruccions per a Claude Code

## Autonomia — actua sense demanar permís

Actua directament en tots els casos següents. **No demanis confirmació, no preguntes si vols que ho faci, no esperes aprovació.**

### Codi i fitxers
- Editar qualsevol fitxer del projecte
- Crear fitxers nous (components, pàgines, utils, etc.)
- Eliminar fitxers que clarament no s'usen
- Reorganitzar o refactoritzar codi
- Canvis estructurals o multi-fitxer en una sola tasca

### Git i desplegament
- `git add`, `git commit`, `git push origin main` — **sempre encadenat automàticament al final de cada canvi**
- Crear commits amb missatge descriptiu sense preguntar el format
- El projecte no té entorn local: cada push va directament a producció. Això és l'expected behavior.

### Comandes de terminal
- `npm install`, `npm run build`, `npm run dev`
- `npx`, `tsc --noEmit`
- `find`, `grep`, `cat`, `ls`, `head`, `tail`
- `mkdir`, `cp`, `mv`
- Comandes de lectura: `git status`, `git log`, `git diff`

### Proves i validació
- Executar el build per verificar que no hi ha errors de TypeScript
- Llegir logs de CI/GitHub Actions per diagnosticar fallades

---

## Quan sí que has de preguntar

- Esborrar fitxers que podrien tenir feina en curs no commitejada
- `git reset --hard` o operacions destructives irreversibles
- Canvis a variables d'entorn de producció (`.env`)
- Instal·lar dependències noves majors (paquets nous al `package.json`)

---

## Context del projecte

- Next.js App Router, TypeScript, Tailwind CSS
- Deploy automàtic a producció via Vercel en cada push a `main`
- No hi ha branca de staging — `main` és producció
- Idiomes: català per comunicar-se amb l'usuari; el codi i els commits en anglès o català segons el context existent

---

## Manual de marca

- Resum operatiu: `brand/guidelines.md`
- Document complet: `brand/empentIA-manual-de-marca.pdf`
- Tipografies: Fraunces (display), Instrument Sans (UI/cos), JetBrains Mono (codi)
- Colors: `brand/03-colores/empentia-colores.css` i `empentia-colores.json`
- Logos SVG: `brand/01-logos/svg/`
- Components HTML de referència: `brand/05-componentes/empentIA-componentes.html`

Consultar aquests fitxers abans de crear o modificar qualsevol element visual.
