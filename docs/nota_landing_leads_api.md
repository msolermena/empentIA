# Nota per al repo `nextjs` (empentia.cat) — API de captació de leads

> Data: 2026-04-07  
> Autor: Claude Code (sessió empentia-ops)  
> Relacionat amb: `POST https://app.empentia.com/api/leads/landing`

---

## Resum del canvi

S'ha corregit l'endpoint de captació de leads al portal. **Pot ser que el formulari actual de la landing hagi d'ajustar els camps que envia.**

---

## Estat anterior (buggy)

L'endpoint requeria `email` **i** `nom_empresa` com a obligatoris. A més, la columna `companies.url` a la BD era NOT NULL. Això feia que:

- Qualsevol formulari que no enviés `nom_empresa` rebia un **400**.
- Qualsevol formulari que no enviés `url_web` rebia un **500** de la BD.

**Resultat: cap lead de la landing havia arribat al portal.**

---

## Estat actual (corregit)

### Camps obligatoris
```
email   ← únic camp realment obligatori
```

### Camps opcionals (tots)
```json
{
  "email": "contact@empresa.com",        // OBLIGATORI
  "origen": "landing-webchat-hero",      // recomanat — per traçabilitat
  "nom_contacte": "Joan Garcia",
  "nom_empresa": "Empresa SL",
  "url_web": "https://empresa.com",
  "telefon": "+34 600 000 000",
  "plataforma": "WooCommerce",           // PrestaShop | WooCommerce | Shopify | ...
  "pla": "Pro",
  "consentiment_rgpd": true
}
```

### `origen` — valors recomanats per CTA
Usar valors descriptius per a filtrar leads al portal per procedència:

| CTA | origen suggerit |
|-----|----------------|
| Hero / banner principal | `landing-webchat-hero` |
| Secció de preus — Starter | `landing-webchat-pricing-starter` |
| Secció de preus — Pro | `landing-webchat-pricing-pro` |
| Secció de preus — Enterprise | `landing-webchat-pricing-enterprise` |
| CTA final de la pàgina | `landing-webchat-cta-final` |
| Formulari de contacte / demo | `landing-webchat-demo` |
| Formulari de contractació directa | `landing-webchat-contractar` |
| Auditoria gratuïta | `landing-webchat-auditoria` |

---

## CORS

L'endpoint **només accepta peticions des de `https://empentia.cat`**. Qualsevol altre origen rep un 403.

Si en algun moment cal cridar-lo des d'un subdomini (`www.empentia.cat`, `webchat.empentia.cat`...) cal actualitzar `ALLOWED_ORIGIN` al portal.

---

## Curl de verificació

```bash
curl -X POST https://app.empentia.com/api/leads/landing \
  -H "Content-Type: application/json" \
  -H "Origin: https://empentia.cat" \
  -d '{
    "email": "test@test.com",
    "origen": "landing-webchat-hero",
    "nom_contacte": "Test",
    "nom_empresa": "Empresa Test",
    "url_web": "https://test.com"
  }'
# Esperem: {"success":true,"message":"Lead creat correctament"}
```

---

## Arquitectura futura de leads (decisió presa)

Tots els punts de captació (formularis, webchat, auditoria, futures landings) han d'usar **el mateix endpoint** amb `origen` per diferenciar la font. No crear endpoints nous per cada landing o CTA.

Quan es creïn noves landings (`/solucions`, `/agents`, etc.), reutilitzar aquest mateix endpoint amb un `origen` descriptiu.
