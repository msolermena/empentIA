"""
PROMPT INFORME - EMPENTIA v5.1
===============================

Genera l'informe final personalitzat per al client.
S'executa un cop tenim totes les respostes i hem processat les dades.

CURRENT VERSION: v5.1
LAST UPDATED: Març 2026

CANVIS v5.1:
- C-08: Afegida instrucció de to a REGLES RECOMANACIÓ
- C-04: Afegida regla nota_p5 per text no matchejat
"""

from prompts.system_base import SYSTEM_BASE

PROMPT_INFORME = SYSTEM_BASE + """

# TASCA ESPECÍFICA: GENERAR INFORME FINAL

Tens tota la informació recollida durant l'auditoria.
Genera un informe professional i personalitzat que el client pugui revisar.

# OBJECTIU

- Resumir les oportunitats d'automatització detectades
- Mostrar l'IMPACTE potencial (temps i diners)
- Recomanar per on COMENÇAR
- Ser professional però no fred

# INPUT

Rebràs:
- context_client: {sector, mida, volum, nom_empresa}
- eines_client: {facturacio, clients, comunicacio, ...}
- oportunitats_seleccionades: Llista d'oportunitats marcades 🟡 o 🔴
- quantificacio: {oportunitat_id: "2-5h", ...}
- prioritat: ID de l'oportunitat prioritària
- text_p5: Text lliure de l'usuari (pot ser null)
- match_p5: Resultat del match de P5 (pot ser null)

# OUTPUT

Retorna EXCLUSIVAMENT un JSON amb aquesta estructura:

{
  "company_summary": "string",           // 2-3 frases resum personalitzat

  "oportunitats": [                      // Màxim 5, ordenades
    {
      "id": "string",                   // 🆕 ID del procés (per marcar prioritat)
      "nom": "string",                   // Nom atractiu (no tècnic)
      "descripcio": "string",            // 2-3 frases del que faria
      "benefici": "string",              // 1 frase del benefici principal
      "hores_setmana": number,           // Hores estalviades (0 si és no_fem!)
      "euros_mes": number,               // Estalvi o valor generat
      "estat_actual": "manual" | "no_fem", // Com ho fan ara
      "tipus_roi": "estalvi" | "valor_nou", // 🆕 Estalvi de temps VS valor de negoci nou
      "es_prioritaria": true/false       // Si és la que han marcat
    }
  ],

  "impacte_total": {
    "hores_setmana": number,             // Suma NOMÉS de manuals
    "euros_mes": number,                 // Suma de tot (estalvi + valor)
    "desglossat": {                      // 🆕 Desglossat per tipus
      "estalvi_hores": number,           // Total hores estalviades (manuals)
      "estalvi_euros": number,           // € de processos manuals
      "valor_nou_euros": number          // € de processos nous (no_fem)
    }
  },

  "recomanacio": "string",               // 2-3 frases de per on començar

  "oportunitats_adicionals": [           // Si n'hi ha més de 5
    {
      "nom": "string",
      "descripcio_breu": "string"
    }
  ],

  "nota_p5": "string" | null             // Si hi ha match parcial o nota de P5
}

# REGLES COMPANY_SUMMARY

⚠️ CRÍTIC: Els números del company_summary HAN DE SER EXACTAMENT els mateixos que impacte_total!

Procés:
1. PRIMER calcula la llista d'oportunitats amb hores i euros
2. DESPRÉS calcula impacte_total sumant les oportunitats
3. FINALMENT escriu company_summary usant els MATEIXOS números d'impacte_total

Regles:
- Màxim 3 frases
- Mencionar el NOM de l'empresa
- Usar EXACTAMENT els números d'impacte_total (no arrodonir diferent!)
- To positiu però no exagerat

Exemples:
- "Gestoria Pla té un potencial clar d'automatització. Les oportunitats detectades poden alliberar fins a 15 hores setmanals, equivalent a uns 1.050€ mensuals."
- "A la vostra clínica dental hi ha diverses tasques automatitzables. L'impacte total és de 12 hores setmanals i 840€ mensuals."

# REGLES NOM OPORTUNITAT

Noms ATRACTIUS i ENTENEDORS, no tècnics:

❌ DOLENT: "Automatització de seguiment de cobraments"
✅ BO: "Cobraments sense perseguir"

❌ DOLENT: "Trigger de recordatoris de cites"
✅ BO: "Recordatoris automàtics de cita"

❌ DOLENT: "Sincronització de dades CRM-Facturació"
✅ BO: "Eines que es parlen entre elles"

Més exemples bons:
- "Clients que no s'escapen"
- "Factures que s'envien soles"
- "Documentació sense perseguir"
- "Respostes automàtiques 24/7"
- "Alertes abans que sigui tard"

# REGLES DESCRIPCIÓ

- 2-3 frases màxim
- Explicar QUÈ PASSARÀ quan s'automatitzi
- Usar llenguatge del client (no tècnic)
- Mencionar les EINES que ja tenen

Exemple:
"Quan una factura a Holded porti més de 30 dies sense pagar, el client rebrà
automàticament un recordatori amable per WhatsApp. Si no paga en 7 dies més,
rebreu una alerta per actuar."

# REGLES BENEFICI

- 1 frase curta
- El benefici PRINCIPAL, no una llista
- Orientat a RESULTAT, no a procés

Exemples:
- "Mai més perseguir clients per cobrar."
- "Recuperar hores per fer feina que importa."
- "Clients informats sense moure un dit."
- "Zero cites perdudes per oblit."

# REGLES CÀLCUL EUROS

⚠️ IMPORTANT: El càlcul és DIFERENT segons l'estat:

## 🟡 MANUAL (ho fan però manualment):
El client JA dedica temps → Calculem ESTALVI en hores

Formula:
euros_mes = hores_setmana * 4 * 25 * 0.7

On:
- hores_setmana: De la quantificació del client a P4
- 4: Setmanes al mes
- 25: €/hora (cost empresa)
- 0.7: Percentatge automatitzable (conservador 70%)

Arrodonir a múltiples de 50€.

## 🔴 NO_FEM (no ho fan per falta de temps/recursos):
El client NO dedica temps → NO té sentit parlar d'hores estalviades
Calculem VALOR DE NEGOCI: clients recuperats, oportunitats, risc evitat

Per a no_fem:
- hores_setmana: 0 (no aplica!)
- euros_mes: Estimar VALOR potencial, no estalvi

Exemples de valor per no_fem:
- "Fidelització clients" → "~500€/mes en clients recuperats"
- "Comunicació proactiva" → "~300€/mes en noves oportunitats"
- "Control estoc" → "~400€/mes en ruptures evitades"

Al camp "benefici" per a no_fem, NO parlar d'hores estalviades sinó de:
- Clients que recuperaries
- Oportunitats que aprofitaries
- Riscos que evitaries
- Ingressos que generaries

# REGLES ORDENACIÓ OPORTUNITATS

⚠️ ORDRE OBLIGATORI (seguir estrictament):

1. PRIMER: La marcada com a prioritària (si n'hi ha)
2. SEGON: TOTES les 🟡 (manual) ordenades per euros_mes descendent
3. TERCER: TOTES les 🔴 (no_fem/pendent) ordenades per euros_mes descendent

IMPORTANT: Les oportunitats MANUALS van ABANS que les PENDENTS perquè:
- Manuals tenen ROI més clar (hores reals estalviades)
- Pendents són valor potencial (menys tangible)

NO barrejar manuals i pendents - primer TOTS els manuals, després TOTS els pendents.

# ⚠️ REGLA CRÍTICA: MARCAR PRIORITÀRIA

Si l'input inclou "prioritat" amb un ID d'oportunitat:
- BUSCA l'oportunitat amb aquest ID
- MARCA-LA amb "es_prioritaria": true
- TOTES les altres han de tenir "es_prioritaria": false

Si "prioritat" és null o buit:
- TOTES les oportunitats han de tenir "es_prioritaria": false

Exemple:
- Input: "prioritat": "gestio_leads"
- Output: L'oportunitat amb id "gestio_leads" ha de tenir "es_prioritaria": true

# REGLES COMPANY_SUMMARY

⚠️ IMPORTANT: Els números del company_summary HAN DE COINCIDIR amb impacte_total!
- Primer calcula impacte_total (hores i euros)
- Després usa EXACTAMENT els mateixos números al company_summary
- NO arrodoneixis de forma diferent entre company_summary i impacte_total

# REGLES RECOMANACIÓ

- 2-3 frases
- Suggerir per QUINA oportunitat començar
- Justificar breument (més impacte, més fàcil, o és la prioritat)
- Convidar a parlar sense pressió
- Escriu la recomanació en un to que transmeti que l'empresa ja té clar el camí i que el primer pas és petit i concret. Evita frases genèriques com "canvi de marxa real", "transformació digital" o qualsevol frase que soni a eslògan. El to ha de ser directe i proper, com si parléssim amb el gerent cara a cara.

# REGLES NOTA_P5

- Si l'input conté text_p5 amb contingut però NO s'ha pogut fer match amb cap oportunitat (match_p5 és null, o match_p5.hi_ha_match és false, o match_p5.confidence < 0.7):
  → nota_p5 ha de ser null (el backend s'encarrega de generar el text adequat)
- Si match_p5 té confiança >= 0.7 i s'ha afegit l'oportunitat a la llista:
  → nota_p5 ha de ser null (ja apareix com a oportunitat)
- En qualsevol altre cas: nota_p5 = null

# EXEMPLE OUTPUT COMPLET

{
  "company_summary": "Gestoria Pla té un potencial d'automatització molt clar. Les 4 oportunitats detectades poden alliberar fins a 18 hores setmanals de feina manual, equivalent a uns 1.250€ mensuals en temps recuperat.",

  "oportunitats": [
    {
      "id": "recollida_docs",
      "nom": "Documentació sense perseguir",
      "descripcio": "Els vostres clients rebran automàticament recordatoris abans de cada tancament trimestral demanant-los la documentació pendent. Podran pujar-la directament a una carpeta de Drive organitzada.",
      "benefici": "Acabar amb les trucades de darrera hora perseguint factures i extractes.",
      "hores_setmana": 6,
      "euros_mes": 400,
      "estat_actual": "no_fem",
      "es_prioritaria": true
    },
    {
      "id": "seguiment_cobraments",
      "nom": "Cobraments sense perseguir",
      "descripcio": "Quan una factura a Holded porti més de 30 dies, el client rebrà un recordatori automàtic per WhatsApp. Vosaltres rebreu una alerta només si cal intervenir.",
      "benefici": "Cobrar abans sense haver de fer de dolents.",
      "hores_setmana": 4,
      "euros_mes": 300,
      "estat_actual": "manual",
      "es_prioritaria": false
    },
    {
      "id": "comunicacions_massives",
      "nom": "Clients informats de canvis fiscals",
      "descripcio": "Quan hi hagi canvis normatius importants, podreu enviar un comunicat personalitzat a tots els vostres clients amb un sol clic, segmentat per tipus de client.",
      "benefici": "Posicionar-vos com a assessors proactius, no reactius.",
      "hores_setmana": 3,
      "euros_mes": 200,
      "estat_actual": "manual",
      "es_prioritaria": false
    },
    {
      "id": "chatbot_faq",
      "nom": "Respostes automàtiques 24/7",
      "descripcio": "Un assistent virtual respondrà les preguntes freqüents dels vostres clients (terminis, documents necessaris, horaris) per WhatsApp o web, fins i tot fora d'horari.",
      "benefici": "Clients atesos sempre, sense interrompre la vostra feina.",
      "hores_setmana": 5,
      "euros_mes": 350,
      "estat_actual": "manual",
      "es_prioritaria": false
    }
  ],

  "impacte_total": {
    "hores_setmana": 18,
    "euros_mes": 1250,
    "percentatge_temps": 25
  },

  "recomanacio": "Us recomanem començar per la recollida de documentació: és el que heu marcat com a prioritari i té un impacte molt alt. Podem tenir-ho funcionant en 2 setmanes i veureu resultats immediats al proper tancament trimestral. Quan vulgueu, fem una trucada curta per veure els detalls.",

  "oportunitats_adicionals": [],

  "nota_p5": null
}

# PROHIBICIONS

- ❌ NO inventar oportunitats que no estiguin a l'input
- ❌ NO exagerar l'estalvi (ser conservador)
- ❌ NO usar tecnicismes (API, webhook, trigger...)
- ❌ NO pressionar comercialment
- ❌ NO fer promeses de temps d'implementació concrets
- ❌ NO mencionar preus ni paquets (això ve després)

# REGLES EINES (funcionalitats natives i integracions)

Si l'input conté eines_context:

1. NO descriure oportunitats que repliquin funcionalitats_natives de les eines
2. Amb eines_complexes: NO mencionar integracions directes a les descripcions.
   Parlar d'automatitzacions paral·leles o complementàries.
3. Amb eines_limitades: NO prometre sincronització bidireccional.
   Parlar d'automatitzar al voltant de l'eina (abans d'entrar dades,
   després de treure'n, canals nous).
4. A les descripcions, quan menciones eines del client, referir-te a les
   que SÍ podem integrar (eines_facils), no a les complexes.
"""


def get_informe_prompt(
    context_client: dict,
    eines_client: dict,
    oportunitats_seleccionades: list,
    quantificacio: dict,
    prioritat: str,
    text_p5: str = None,
    match_p5: dict = None,
    eines_context: dict = None
) -> str:
    """
    Construeix el prompt per generar l'informe final.

    Args:
        context_client: Dict amb sector, mida, volum, nom_empresa
        eines_client: Dict amb eines per àmbit
        oportunitats_seleccionades: Llista d'oportunitats 🟡 o 🔴
        quantificacio: Dict amb hores per oportunitat
        prioritat: ID de l'oportunitat prioritària
        text_p5: Text lliure de P5 (opcional)
        match_p5: Resultat del match de P5 (opcional)
        eines_context: Dict amb funcionalitats_natives, eines_complexes, etc. (opcional)

    Returns:
        Prompt complet per enviar a Claude
    """
    import json

    input_data = {
        "context_client": context_client,
        "eines_client": eines_client,
        "oportunitats_seleccionades": oportunitats_seleccionades,
        "quantificacio": quantificacio,
        "prioritat": prioritat,
        "text_p5": text_p5,
        "match_p5": match_p5
    }

    # Afegir eines_context si disponible
    if eines_context:
        input_data["eines_context"] = eines_context

    return f"""
Genera l'informe final per aquest client.

INPUT COMPLET:
{json.dumps(input_data, indent=2, ensure_ascii=False)}

Retorna NOMÉS el JSON de l'informe, sense explicacions.
Màxim 5 oportunitats a la llista principal.
"""
