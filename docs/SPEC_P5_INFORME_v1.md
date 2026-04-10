# SPEC: P5 Auditoria + Informe — Canvis C-03 i C-04/C-08
**Projecte:** empentIA — empentia.cat  
**Data:** Març 2026  
**Estat:** Llest per implementar

---

## Objectiu

Dos canvis independents però relacionats:

1. **C-03 — P5 reformulació completa:** Millorar la pregunta i el placeholder de P5 per activar la reflexió del visitant i capturar necessitats no previstes al catàleg de processos.
2. **C-04 + C-08 — Informe:** Afegir bloc de resposta quan P5 té contingut no matchejat, i corregir el prompt de la secció `recomanacio`.

Aquests canvis **no afecten P1, P2, P3 ni P4**. No afecten el portal (app.empentia.com).

---

## C-03 — P5 Reformulació completa

### Problema actual

P5 presenta una pregunta oberta genèrica que no activa la reflexió del visitant. La majoria no escriu res o escriu algo vague. El potencial real de P5 és capturar necessitats que no estaven al catàleg de 61 processos.

### Canvis al títol/pregunta de P5

**Actual:** (pregunta genèrica tipus "Hi ha alguna cosa més?")

**Nou:**
```
Tu coneixes el teu negoci millor que ningú. Més enllà del que hem 
identificat fins ara, quina és la feina que més t'agradaria que 
es fés automàticament?
```

**Notes d'implementació:**
- Primera frase ("Tu coneixes...") pot anar en text subtil/muted per sobre de la pregunta principal, actuant com a introducció
- La pregunta principal en pes normal, igual que les altres preguntes del flux
- Respectar capitalització: "quina" en minúscula perquè és continuació de frase

### Canvis al placeholder del camp de text

**Actual:** buit o text genèric

**Nou** (text subtil dins el camp, desapareix quan l'usuari escriu):
```
Ex: "Fer el resum setmanal de vendes", "Enviar recordatoris de 
pagament", "Preparar pressupostos des de zero cada vegada"
```

**Notes:**
- Estil: color muted (slate-500), italic, mida lleument menor que el text normal
- Aquests exemples actuen com a ceba per activar la memòria del visitant — no restringeixen les respostes
- Han de desaparèixer completament quan l'usuari comença a escriure (comportament placeholder estàndard)

### Comportament del match — sense canvis de lògica, millora de robustesa

El match actual (text P5 → procés del catàleg) es manté. Afegir:

- Si match amb confiança alta → comportament actual: afegir oportunitat a la llista principal ✅
- Si match amb confiança baixa o text massa genèric → **no ignorar**: guardar el text original al camp `p5_text_original` i passar-lo a l'informe (vegeu C-04)
- Si camp buit → comportament actual, res canvia ✅

El sistema no ha de fingir que ha entès algo que no ha pogut analitzar. La confiança baixa és informació vàlida.

---

## C-04 — Bloc P5 a l'informe (text no matchejat)

### Problema actual

Quan P5 té contingut però el match no és prou fort per afegir una oportunitat, el text desapareix. El visitant ha fet l'esforç d'escriure algo i l'informe no en fa cap menció.

### Comportament nou

**Condició:** `p5_text_original` té contingut I no s'ha generat oportunitat per match de P5.

**Acció:** Afegir un bloc curt al final de la secció d'oportunitats de l'informe.

**Text del bloc:**
```
Ens has mencionat: "[p5_text_original]". Ho tindrem en compte i 
et donarem resposta personalitzada sobre si és automatitzable i 
com encaixaria amb el que hem detectat.
```

**Notes d'implementació:**
- `[p5_text_original]` → substituir pel text real que ha escrit el visitant, entre cometes
- Estil visual: card o bloc lleugerament diferent de les oportunitats principals (per exemple, border amber subtil o fons slate-800 en lloc de slate-900) — indica que és "en revisió", no una oportunitat confirmada
- Posició: al final de la llista d'oportunitats, just abans de la secció de plans/recomanació
- Si P5 estava buit o si ja s'ha generat oportunitat per match, aquest bloc **no apareix**

---

## C-08 — Prompt `recomanacio` (informe)

### Problema actual

La secció `recomanacio` del `prompt_informe.py` conté una frase d'exemple ("és el que els nostres clients descriuen com el canvi de marxa real") que el LLM pot copiar literalment als informes reals. S'ha de moure al prompt com a instrucció de to, no com a copy a reproduir.

### Canvi al prompt

**Localitzar** la secció `# REGLES recomanacio` (o equivalent) a `prompt_informe.py`.

**Afegir/substituir** la instrucció de to per:

```
Escriu la recomanació en un to que transmeti que l'empresa ja té 
clar el camí i que el primer pas és petit i concret. Evita frases 
genèriques com "canvi de marxa real", "transformació digital" o 
qualsevol frase que soni a eslògan. El to ha de ser directe i proper, 
com si parléssim amb el gerent cara a cara.
```

**Notes:**
- Aquest canvi és només al prompt, no al frontend
- Si la frase problemàtica apareix com a exemple dins el prompt (no com a instrucció), eliminar-la completament — els exemples al prompt es poden "enganxar" a l'output
- Verificar que no hi hagi altres frases d'exemple similars a la mateixa secció

---

## Checklist de validació abans de lliurar

### C-03 (P5)
- [ ] Nou títol/pregunta visible i ben formatat
- [ ] Primera frase en text muted per sobre de la pregunta
- [ ] Placeholder amb exemples en italic/muted, desapareix en escriure
- [ ] Camp de text funcional, guarda contingut com sempre
- [ ] Match fort → oportunitat s'afegeix a la llista (comportament actual preservat)
- [ ] Match feble o text genèric → `p5_text_original` guardat correctament a DB
- [ ] Camp buit → res canvia

### C-04 (bloc informe)
- [ ] Bloc apareix quan `p5_text_original` té contingut i no hi ha match
- [ ] Text del bloc mostra el contingut real de P5 entre cometes
- [ ] Bloc té estil visual diferent de les oportunitats principals
- [ ] Bloc apareix al final de les oportunitats, abans dels plans
- [ ] Bloc **no apareix** si P5 buit o si ja hi ha match

### C-08 (prompt)
- [ ] Instrucció de to afegida a la secció `recomanacio` del prompt
- [ ] Frase "canvi de marxa real" eliminada com a copy d'exemple
- [ ] Informe generat no conté frases genèriques tipus eslògan
- [ ] Resta del prompt_informe.py sense canvis

---

## El que NO fa aquesta spec

- Cap canvi a P1, P2, P3 ni P4
- Cap canvi al portal (app.empentia.com)
- Cap canvi a la landing (empentia.cat) — cobert per SPEC_LANDING_PREVIEW_v2.md
- Cap canvi a la lògica de match de P5 (algorisme) — només robustesa i gestió del cas feble
- Cap canvi als plans/pricing

---

*Spec v1.0 — Març 2026 | Llest per passar a Claude Code*
