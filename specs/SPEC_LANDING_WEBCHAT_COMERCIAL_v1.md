# SPEC — Landing Comercial Webchat empentIA

**Versió:** 1.1  
**Data:** 2 abril 2026  
**Estat:** Spec llesta per a /analitza_spec  
**Prioritat:** Alta  
**Prerequisit de:** cap  
**Bloquejat per:** cap (la landing actual ja existeix a empentia.cat/webchat)

---

## Problema

La landing actual de webchat (empentia.cat/webchat) va ser generada ràpidament amb Claude Code sense iteració de contingut. Té diverses mancances:

1. **No mostra preus ni plans.** El visitant no pot avaluar si el servei encaixa al seu pressupost sense contactar. Molts marxen.
2. **No hi ha demo interactiva real.** La secció "Demo en viu" és una captura estàtica decorativa. No demostra el producte.
3. **No hi ha social proof.** Ni logos de clients, ni testimonials, ni mètriques reals.
4. **Els casos d'ús són ficticis genèrics.** No aprofiten les dades reals dels pilots (VBSports 630 productes, Antihurto 34 productes configurables).
5. **No hi ha flux de contractació directa.** Tot porta a "Demana demo" — no hi ha opció per als que volen activar directament.
6. **Falten funcionalitats importants.** El brief documenta 8 blocs funcionals; la landing en mostra 6 superficialment. Falten: pressupostos automàtics, integració carret (WooCommerce/PrestaShop), behavioral editor, analytics.
7. **No hi ha secció de ROI / justificació econòmica.** El cost per conversa (<0,10€) i la comparativa amb agents humans són arguments de venda potents que no apareixen.
8. **El CTA és uniforme.** Només "Demana demo", sense opció de contractació directa ni reserva de cita.

---

## Objectiu

Una landing comercial que:

1. **Impressiona i genera confiança** — disseny professional, dades reals, social proof
2. **Demostra el producte in situ** — webchat real d'empentIA embegut que el visitant pot provar
3. **Mostra plans i preus transparents** — taula comparativa de 3+1 tiers amb funcionalitats detallades
4. **Capta leads qualificats** — cada CTA crea un lead al mòdul Assistent Comercial del portal amb origen traçable
5. **Permet contractació directa** — formulari que alimenta el pipeline de propostes existent al portal
6. **Ofereix reserva de cita** — integració Cal.com per a qui prefereix parlar primer

---

## Arquitectura / Decisions de disseny

### Repos i responsabilitats

- **Landing pública:** repo `nextjs` (empentia.cat/webchat) — tot el contingut, disseny, formularis, CTAs
- **Webchat demo:** repo `empentia-portal` (app.empentia.com) — instància webchat real amb instance_key `empentia-webchat-landing`, servida via widget JS com amb qualsevol client
- **Portal empentIA:** repo `empentia-portal` — rep leads via API, gestiona pipeline propostes→client

### Ponts entre landing i portal (només 2)

1. **CTAs / Formularis → Lead a Assistent Comercial**
   - La landing fa POST a un endpoint API del portal (o webhook)
   - Crea un lead al mòdul Assistent Comercial d'empentIA
   - Camp `origen` identifica el CTA específic (ex: `landing-webchat-hero`, `landing-webchat-pricing-starter`, `landing-webchat-pricing-pro`, `landing-webchat-contractar`, `landing-webchat-cta-final`)
   - A partir d'aquí, el lead segueix la pipeline existent: lead → proposta → acceptació → onboarding → producció

2. **Widget webchat demo**
   - Script JS carregat des d'app.empentia.com (CDN del widget existent)
   - instance_key: `empentia-webchat-landing`
   - Client intern empentIA al portal
   - L'agent pot captar leads directament des de la conversa (tool capture_lead existent)

### Disseny visual del widget a la landing

El widget webchat a la pròpia landing d'empentIA utilitza la **personalització visual completa** (equivalent a tier Business): colors empentIA (emerald gradient), avatar de marca, CSS custom adaptat al branding de la landing. Això serveix de showcase del nivell de personalització possible.

A la secció "Demo en viu", el widget es mostra dins un contenidor integrat al disseny de la pàgina (no com a botó flotant), amb context visual al voltant (mockup de navegador o entorn de botiga). El widget JS segueix carregant-se des d'app.empentia.com; la landing només estilitza el contenidor i l'entorn.

### Pipeline de contractació

```
Landing (formulari contractació)
    → POST API portal (crea lead amb origen + pla seleccionat)
    → Lead apareix a Assistent Comercial empentIA
    → Arnau/Marc revisa, genera proposta des del mòdul Propostes
    → Envia proposta al client (flux existent: landing acceptació amb SEPA)
    → Client accepta → Onboarding → Demo si no s'ha fet → Producció
    → Cobrament per rebut bancari (SEPA)
```

Fase futura: pagament amb targeta directe des de la landing.

---

## Abast

### Inclòs (Fase 1 — aquesta spec)

#### A. Redisseny contingut i estructura de la landing

Nova estructura de seccions (repo nextjs):

1. **Hero**
   - Titular: "El teu millor comercial treballa 24/7" (o iteració millorada)
   - Subtítol: agent IA que coneix el catàleg, assessora, genera pressupostos i tanca vendes
   - 2 CTAs: "Prova la demo" (scroll a secció demo) + "Veure plans i preus" (scroll a pricing)
   - 3 xifres clau: 24/7 disponible / <1s resposta / <0,10€ per conversa

2. **Social proof bar**
   - "Ja confien en nosaltres:" + logos clients (Antihurto, VBSports, Bofill si aplica)
   - Si no hi ha permís per mostrar logos, usar versió anònima: "Botigues online, empreses de seguretat i distribuïdores ja l'utilitzen"

3. **Problema**
   - Refinar la secció actual amb dades més concretes
   - 3 pain points amb xifres (mantenir l'estructura actual que funciona bé)

4. **Demo en viu (amb webchat real)**
   - Secció destacada amb el widget webchat empentIA real embegut
   - Contenidor visual atractiu (mockup de navegador/mòbil)
   - Text: "Prova'l ara — pregunta'ns sobre el servei, funcionalitats o preus"
   - L'agent respon dubtes sobre el propi servei webchat d'empentIA
   - L'agent pot recollir dades de contacte si el visitant mostra interès

5. **Funcionalitats**
   - 8 blocs funcionals (ampliat dels 6 actuals):
     - Cerca intel·ligent al catàleg (estàtic + dinàmic)
     - Afegeix al carret (WooCommerce + PrestaShop)
     - Pressupostos automàtics (generació + email)
     - Captació de leads i escalada a humà
     - Widget embegut lleuger (una línia de codi)
     - Personalització completa (behavioral editor)
     - Multiidioma automàtic
     - Mètriques i analytics
   - Cada funcionalitat amb icona + descripció curta + tooltip (?) amb detall

6. **Plans i preus**
   - Taula comparativa de 3 tiers + 1 personalitzat (veure secció Pricing a sota)
   - CTA per tier: "Activa ara" (porta a formulari de contractació) + "Demana demo" (alternativa)

7. **Casos d'ús reals**
   - 2-3 casos basats en pilots reals (anonimitzats si cal):
     - "Botiga de ciclisme amb 630 productes" (basat en VBSports)
     - "Tenda online de sistemes de seguretat amb productes configurables" (basat en Antihurto)
     - "Distribuïdora B2B" (basat en Bofill, si aplica)
   - Format: situació → què fa l'agent → resultat concret

8. **ROI / Per què empentIA**
   - Comparativa visual: cost agent humà (1.800-2.500€/mes) vs empentIA (49-149€/mes)
   - Avantatges: 24/7, consistència, escalabilitat, sense formació
   - Taula vs chatbots FAQs tradicionals i vs live chat (del brief)

9. **Com s'activa**
   - 3 passos (refinar l'actual): Contracta → Configurem → Ven
   - Emfatitzar: "Nosaltres ens en cuidem de tot. Tu només ens expliques el teu negoci."
   - Temps: "Operatiu en 1-2 dies laborables"

10. **FAQs**
    - Ampliar amb preguntes sobre: pricing, seguretat/RGPD, compatibilitat tècnica, cancel·lació, diferències entre plans

11. **CTA final**
    - 2 opcions: Formulari de contacte ràpid + Reservar cita (Cal.com)
    - "El teu agent comercial llest en 48 hores"

#### B. Taula de pricing (3+1 tiers)

**Noms:** Starter (49€/mes) / Pro (79€/mes) / Business (149€/mes) / Personalitzat

**Estructura de la taula:**

| Funcionalitat | Starter (49€/mes) | Pro (79€/mes) | Business (149€/mes) |
|---|---|---|---|
| **Converses i ús** | | | |
| Converses incloses/mes | 50 | 100 | 200 |
| Extra per conversa addicional | 0,25€ | 0,25€ | 0,25€ |
| Usuaris del panell | 1 | 3 | 5 |
| **Catàleg i coneixement** | | | |
| Gestió del coneixement (?) | Manual | Automàtic | Automàtic |
| Font d'informació (?) | Manual + Web | + API eCommerce | + API eCommerce |
| **Agent i personalització** | | | |
| Personalització visual (?) | Bàsica (colors) | Estàndard (colors + avatar + posició) | Completa (CSS custom + branding) |
| Multi-agent (?) | ✗ | 1 agent extra (2 departaments) | Fins a 3 agents extra (4 departaments) |
| Idiomes actius | 2 | 4 | Il·limitats |
| Respostes ràpides (chips) (?) | 3 fixes | Il·limitades | Il·limitades + dinàmiques per IA `Properament` |
| **Accions comercials** | | | |
| Alertes per lead rebut (?) | Email | Email + notificació panell | Email + notificació panell + webhook `Properament` |
| Pressupostos automàtics (?) | ✗ | ✓ | ✓ |
| Integració carret (?) | ✗ | ✓ | ✓ |
| **Dades i historial** | | | |
| Historial de converses | 60 dies | 180 dies | Complet |
| Mètriques i analytics | Bàsiques | Completes | Completes + exportació |
| Exportació de leads (?) | CSV manual | CSV + webhook `Properament` | CSV + webhook `Properament` + integració CRM `Properament` |
| Informe mensual (?) | ✗ | PDF automàtic `Properament` | PDF `Properament` + reunió trimestral revisió `Properament` |
| **Suport** | | | |
| Suport implementació (?) | Documentació + ticket | Implementació assistida | Implementació prioritària + dedicada |
| SLA resposta suport | 48h | 24h | 4h |

**Nota implementació `Properament`:** Les funcionalitats marcades amb `Properament` es mostren a la taula amb un badge/tag visual petit (ex: pill verd clar amb text "Properament") al costat del text de la funcionalitat. No es marquen amb ✗ sinó que es mostra el valor del tier + el badge. Això comunica que la funcionalitat està inclosa al pla i en preparació, sense amagar-ho.

**Tier Personalitzat:**
- Mostra com a 4a columna amb "Contacta'ns" en lloc de preu
- Icona o badge "A mida"
- Text: "Per a cadenes, franquícies o necessitats específiques. Agents, converses i funcionalitats a mida."
- CTA: "Parlem" (porta a formulari o Cal.com)

**Tooltips (?):**
Cada funcionalitat marcada amb (?) ha de tenir un tooltip al fer hover que explica breument:
- Gestió coneixement: "Manual = tu ens envies la info. Automàtic = sincronització programada des de la teva botiga."
- Font d'informació: "Manual = text i fitxers. Web = scraping de la teva web. API eCommerce = connexió directa amb WooCommerce o PrestaShop."
- Personalització visual: "Bàsica = color principal. Estàndard = colors, avatar i posició del widget. Completa = CSS custom, branding total, integrat al disseny de la teva web."
- Multi-agent: "Agents separats per a departaments, botigues o marques diferents, cadascun amb el seu catàleg i personalitat."
- Respostes ràpides: "Botons clicables que l'agent suggereix durant la conversa per facilitar la interacció."
- Alertes per lead: "Notificació quan un visitant deixa les seves dades o mostra interès de compra."
- Pressupostos automàtics: "L'agent genera i envia pressupostos per email amb productes, preus, IVA i total."
- Integració carret: "L'agent afegeix productes al carret real de la teva botiga. Compatible WooCommerce i PrestaShop."
- Exportació leads: "CSV = descàrrega manual. Webhook = enviament automàtic en temps real a la teva eina."
- Informe mensual: "Resum d'activitat: converses, leads, productes més consultats, rendiment de l'agent."
- Suport implementació: "Documentació = guies i tutorials. Assistida = nosaltres configurem amb tu. Dedicada = configuració completa per part nostra amb prioritat."

#### C. Formulari de contractació directa

Formulari a la landing (secció pricing o pàgina dedicada) que recull:

- Nom de l'empresa (obligatori)
- URL de la web (obligatori)
- Nom de contacte (obligatori)
- Email (obligatori)
- Telèfon (opcional)
- Plataforma eCommerce: WooCommerce / PrestaShop / Shopify / Web custom / Altra (obligatori)
- Pla seleccionat: Starter / Pro / Business (pre-seleccionat si ve del CTA d'un tier concret)
- Checkbox: "Vull una trucada prèvia de 15 min" (opcional, porta a Cal.com si marcat)
- Checkbox RGPD: consentiment tractament dades (obligatori)
- Botó: "Sol·licitar activació"

El submit fa POST a l'API del portal i crea un lead a l'Assistent Comercial amb:
- Totes les dades del formulari
- `origen`: `landing-webchat-contractar-{pla}` (ex: `landing-webchat-contractar-pro`)
- `tipus`: `contractacio_directa`

Confirmació post-submit: "Gràcies! Revisarem la teva sol·licitud i et contactarem en menys de 24h amb una proposta personalitzada."

#### D. Instància webchat demo empentIA

Nova instància webchat al portal:

- **instance_key:** `empentia-webchat-landing`
- **Client:** empentIA (intern)
- **Mode catàleg:** `cataleg_estatic` (les funcionalitats i plans del webchat com a "productes")
- **Coneixement base:** brief de funcionalitats (webchat_landing_brief.md), plans i preus, FAQs, diferenciadors
- **Personalitat:** Proper, professional, entusiasta però no agressiu. Parla en l'idioma del visitant (català/castellà/anglès).
- **Instruccions específiques:**
  - Pot respondre preguntes sobre funcionalitats, preus, compatibilitat, temps d'activació
  - Si el visitant mostra interès de compra: recull nom, empresa, email, URL web → capture_lead
  - Si pregunta coses que no sap: escalar a humà (email a equip empentIA)
  - Mai inventar funcionalitats que no existeixen
  - Pot suggerir "Vols que t'enviem una proposta?" o "Vols veure una demo amb el teu catàleg?"
- **Disseny visual:** Personalització completa empentIA (emerald gradient, logo empentIA com a avatar, estil premium)
- **Auto-open:** Sí, als 8 segons
- **Nudge:** Text IA contextual: "Tens dubtes sobre el webchat? Pregunta'm el que vulguis!"

#### E. Integració Cal.com

- Botó "Reserva una trucada" a diversos punts de la landing (CTA final, formulari, tier personalitzat)
- Obre Cal.com en modal o nova pestanya
- URL Cal.com amb paràmetres prefilled si possible (nom empresa, email)
- El lead es crea igualment al portal amb `origen: landing-webchat-calendly`

#### F. Endpoint API per rebre leads des de la landing

- `POST /api/leads/landing` (o reutilitzar webhook existent si és adequat)
- Valida dades mínimes (email, nom empresa)
- Crea registre a la taula de l'Assistent Comercial
- Camp `origen` amb el valor rebut
- Camp `metadata` amb totes les dades addicionals (URL, plataforma, pla, etc.)
- Resposta: `{ success: true, message: "Lead creat" }` o error
- **CORS:** permetre només empentia.cat
- **Rate limit:** prevenir abús (ex: 5 leads/minut per IP)

#### G. Internacionalització (i18n) — Català + Castellà

La landing es publica en dos idiomes des del primer dia.

**Patró tècnic:**
- Usar next-intl (o la mateixa solució i18n que el portal si el repo nextjs ja en té una)
- Rutes amb prefix d'idioma: `/webchat` (català, idioma per defecte) i `/es/webchat` (castellà)
- Fitxers de traducció JSON separats per idioma: `messages/ca.json`, `messages/es.json`
- Middleware de detecció d'idioma: Accept-Language header → redirecció automàtica si el navegador és castellà
- El català és l'idioma per defecte (sense prefix a la URL)

**SEO:**
- Tags `hreflang` al `<head>`: `ca` per defecte, `es` per castellà
- `<link rel="alternate">` bidireccional entre versions
- Meta titles i descriptions traduïts

**Contingut a traduir:**
- Totes les 11 seccions de la landing (textos, CTAs, tooltips, FAQs)
- Formulari de contractació (labels, placeholders, validacions, missatge de confirmació)
- Taula de pricing (noms de funcionalitats, tooltips, badges "Properament")
- El widget webchat NO cal traduir-lo: l'agent ja detecta l'idioma del visitant automàticament

**Detecció d'idioma i UX:**
- Selector d'idioma visible al header (CA / ES)
- Si el visitant arriba amb navegador en castellà → redirecció a `/es/webchat`
- Si arriba amb navegador en català o qualsevol altre idioma → versió catalana per defecte

**Qualitat de traducció:**
- La traducció al castellà no és literal: cal adaptar expressions, to comercial i naturalitat
- Claude Code pot generar la primera versió; Arnau/Marc revisen abans de publicar
- El fitxer `messages/es.json` és editable manualment per refinar

### Fora d'abast (Fase 2)

- Pagament amb targeta (Stripe) des de la landing
- Demo automatitzada via scraping de la URL del visitant
- Mini-calculadora ROI interactiva (per ara, secció estàtica amb números)
- Implementació real de: integració CRM, webhook de leads, informe PDF mensual, reunió trimestral, respostes ràpides dinàmiques per IA, sync automàtic d'estoc via API eCommerce (tots mostrats a la taula de pricing amb badge "Properament")
- A/B testing de la landing
- Anglès i altres idiomes a la landing (per ara CA + ES)
- Vídeo demo / screencast

---

## Restriccions crítiques

1. **El widget webchat de la landing carrega des d'app.empentia.com.** No es duplica codi del webchat al repo de la landing.
2. **L'endpoint API de leads ha de validar CORS** (només empentia.cat) i aplicar rate limiting.
3. **Les dades del formulari de contractació es tracten com a leads**, no es crea el client automàticament. Arnau/Marc revisa i genera proposta manualment.
4. **La taula de preus és informativa.** Els preus mostrats són IVA no inclòs. Cal indicar-ho clarament.
5. **Funcionalitats no implementades porten badge "Properament".** A la taula de pricing, les funcionalitats de Fase 2 (webhook leads, CRM export, informe PDF, reunió trimestral, respostes ràpides dinàmiques per IA, sync automàtic estoc) es mostren amb un badge visual "Properament" (petit tag al costat del ✓ o del text). El tooltip de la funcionalitat pot detallar: "Funcionalitat en preparació, disponible properament." Això és transparent i genera expectativa sense enganyar.
6. **El brief del webchat (coneixement de l'agent demo) ha de ser precís.** L'agent no pot prometre funcionalitats que no tenim. Millor dir "pregunta'ns i t'ho confirmem" que inventar.

---

## Decisions ja preses

1. **Noms dels tiers:** Starter (49€) / Pro (79€) / Business (149€) / Personalitzat
2. **Repos:** Landing a repo nextjs, webchat demo a repo empentia-portal
3. **Pont landing→portal:** Leads a Assistent Comercial via API, webchat via widget JS
4. **Multi-agent = departaments**, no idiomes. Un agent pot parlar múltiples idiomes.
5. **Alertes per lead:** inclòs als 3 plans, diferencial per canal (email / +panell / +webhook)
6. **Suport tier Starter:** documentació + ticket (SLA 48h), no "sense suport"
7. **Contractació directa sense pagament online** per ara. El formulari genera lead → proposta manual → flux existent
8. **Agent demo:** instance_key `empentia-webchat-landing`, personalització visual completa empentIA
9. **Cal.com:** integrat com a CTA alternatiu, no com a flux obligatori
10. **Preus IVA no inclòs**
11. **i18n CA + ES** dins l'scope. Patró next-intl, rutes amb prefix (`/es/webchat`), català per defecte sense prefix.
12. **Funcionalitats Fase 2 a la taula de pricing:** es mostren amb badge "Properament", no s'oculten ni es marquen com a ✗

---

## Preguntes obertes

Per a Claude Code a `/analitza_spec`:

1. **Endpoint leads:** existeix algun endpoint o webhook reutilitzable al portal per rebre leads externs? O cal crear-ne un de nou? Revisar `/api/webhooks/new-lead/` i la taula de l'Assistent Comercial.
2. **Widget webchat a la landing:** com s'integra el widget JS actual? Revisar el codi del widget per confirmar que es pot embeure dins un contenidor custom (no només com a botó flotant) amb CSS override.
3. **Instància webchat:** cal migració SQL per crear la instància `empentia-webchat-landing` o es pot fer des del panell admin? Revisar el flux de creació d'instàncies a module_instances/webchat_config.
4. **Cal.com:** quina és la URL actual o en procés? Cal configurar alguna cosa a nivell de backend per passar paràmetres?
5. **Imatges i assets:** existeixen logos dels clients (VBSports, Antihurto) al repo? Calen captures de pantalla del webchat real per a la landing?
6. **Estructura actual de la landing:** revisar l'estructura de components actual de `/webchat` per determinar si és millor refactoritzar o reescriure.
7. **i18n al repo nextjs:** el repo de la web pública ja té next-intl o similar configurat? Si no, caldrà instal·lar-lo i configurar middleware, layout amb locale, i estructura de fitxers de traducció. Revisar si hi ha alguna pàgina ja traduïda que serveixi de referència.

---

Nota d'integració — /api/leads/landing (repo empentia-portal)

  Endpoint ja implementat. La landing no necessita cap variable d'entorn especial.

  URL: https://app.empentia.com/api/leads/landing
  Mètode: POST
  Content-Type: application/json

  {
    "nom_empresa": "Botiga Example",
    "url_web": "https://exemple.com",
    "nom_contacte": "Joan",
    "email": "joan@exemple.com",
    "telefon": "600123456",
    "plataforma": "WooCommerce",
    "pla": "Pro",
    "origen": "landing-webchat-contractar-pro",
    "consentiment_rgpd": true
  }

  - email i nom_empresa són obligatoris. La resta opcionals.
  - origen ha de ser un dels valors del spec: landing-webchat-hero, landing-webchat-pricing-starter, landing-webchat-pricing-pro,
  landing-webchat-pricing-business, landing-webchat-contractar-{pla}, landing-webchat-cta-final, landing-webchat-calendly
  - Resposta OK: { success: true, message: "Lead creat correctament" } (HTTP 201)
  - CORS configurat per a https://empentia.cat. Si cal provar en local amb un domini diferent, fer-ho via Postman/curl (no des del navegador).

## Definició de "acabat"

### Landing (repo nextjs)
- [ ] Nova estructura de 11 seccions implementada segons spec
- [ ] Taula de pricing amb 3+1 tiers, tooltips funcionals al hover
- [ ] Badge "Properament" visible a les funcionalitats de Fase 2 (estil pill/tag discret)
- [ ] Formulari de contractació funcional que crea lead al portal via API
- [ ] Integració Cal.com funcional (botó obre modal/pestanya)
- [ ] Widget webchat empentIA embegut i funcional a la secció demo
- [ ] Tots els CTAs tenen `origen` únic traçable
- [ ] i18n implementat: versió catalana (`/webchat`) i castellana (`/es/webchat`) completes
- [ ] Selector d'idioma CA/ES al header
- [ ] Tags hreflang i meta SEO per idioma
- [ ] Detecció automàtica d'idioma del navegador amb redirecció
- [ ] Responsive: correcte en mòbil, tablet i desktop
- [ ] Preus marcats com "IVA no inclòs"
- [ ] Coherència visual amb DESIGN_GUIDE_v2.md

### Portal (repo empentia-portal)
- [ ] Endpoint API `/api/leads/landing` funcional amb CORS i rate limit
- [ ] Instància webchat `empentia-webchat-landing` creada i configurada
- [ ] Agent demo amb coneixement del servei webchat (funcionalitats, preus, FAQs)
- [ ] Personalització visual completa empentIA al widget demo
- [ ] Leads de la landing apareixen a l'Assistent Comercial amb origen correcte

### Validació
- [ ] Un visitant pot provar el webchat demo i fer preguntes sobre el servei
- [ ] Un visitant pot veure plans i preus sense contactar
- [ ] Les funcionalitats Fase 2 es mostren amb badge "Properament" (no com a ✗ ni com a funcional)
- [ ] Un visitant pot omplir el formulari de contractació i el lead apareix al portal
- [ ] Un visitant pot reservar cita via Cal.com
- [ ] El widget demo funciona correctament embegut a la landing (no com a popup flotant)
- [ ] Cada CTA crea un lead amb origen diferent i traçable a l'Assistent Comercial
- [ ] La versió castellana (`/es/webchat`) és completa, natural i no una traducció literal
- [ ] El selector d'idioma canvia entre versions sense perdre la secció on es troba el visitant
