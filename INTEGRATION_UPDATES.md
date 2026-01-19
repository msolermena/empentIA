# 🔄 Frontend Integration Updates

**Data:** 19 Gener 2026  
**Versió:** 1.1 - Backend Integration Fixed

---

## ✅ Canvis Implementats

### 1. **lib/api.ts - Completament Refet**

#### Abans (❌ Endpoints que no existien):
```typescript
GET /audit/{id}/status
POST /audit/{id}/submit
```

#### Ara (✅ Endpoints reals del backend):
```typescript
POST /scrape                  // Scraping + crea company
POST /audit/start             // Inicia auditoria
POST /audit/next-question     // Genera pregunta dinàmica
POST /audit/answer            // Guarda resposta
POST /audit/generate          // Genera audit final
GET /audit/{audit_id}         // Obté audit complet
```

### 2. **Tipus TypeScript Actualitzats**

Ara els tipus coincideixen 100% amb el que retorna el backend:

```typescript
export interface ScrapeResponse {
  success: boolean;
  company_id: string;
  pre_research: {
    name: string;
    sector: string;
    subsector?: string;
    tech_stack?: string[];
    estimated_size?: string;
    insights?: string;
  };
}

export interface GenerateAuditResponse {
  success: boolean;
  audit_id: string;
  audit: {
    diagnosis: { ... };
    quick_wins: [ ... ];
    roi_estimation: { ... };
    tier_recommendation: { ... };
  };
}
```

### 3. **Pàgines Actualitzades**

#### **app/audit/[id]/questions/page.tsx**
- ✅ Usa `getNextQuestion()` de l'API client
- ✅ Usa `saveAnswer()` de l'API client
- ✅ Error handling millorat

#### **app/audit/[id]/email/page.tsx**
- ✅ Usa `generateAudit()` de l'API client
- ✅ Validació email robusta

#### **app/audit/[id]/complete/page.tsx**
- ✅ Fetch dades reals amb `getAudit()`
- ✅ Mostra ROI/diagnosis/quick_wins reals
- ✅ Loading i error states
- ✅ Botó PDF desactivat (pending implementació backend)

---

## 🧪 Com Testejar

### 1. **Verificar Variables d'Entorn**

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://empentia-backend-production.up.railway.app
```

### 2. **Reinstal·lar Dependencies (opcional)**

```bash
npm install
```

### 3. **Iniciar Dev Server**

```bash
npm run dev
```

Obre http://localhost:3000

### 4. **Flux Complet a Testejar**

```
1. Landing Page
   ↓ Introdueix URL: https://www.exemple.cat
   ↓ Click "Analitza la Teva Empresa"
   
2. Scraping (automàtic)
   ↓ POST /scrape
   ↓ POST /audit/start
   ↓ Redirect a /audit/{audit_id}/questions
   
3. Preguntes (8 preguntes)
   ↓ Cada pregunta:
     - POST /audit/next-question
     - Mostra pregunta dinàmica
     - User respon
     - POST /audit/answer
   ↓ Després de pregunta 8 → redirect a /email
   
4. Email + GDPR
   ↓ Introdueix email
   ↓ Accepta checkbox
   ↓ POST /audit/generate
   ↓ Redirect a /complete
   
5. Complete Page
   ↓ GET /audit/{audit_id}
   ↓ Mostra ROI real
   ✅ Success!
```

---

## 🐛 Debugging

### Error: "Error de connexió amb el servidor"

**Causa:** Backend no accessible

**Solució:**
1. Verifica que Railway backend està running
2. Comprova NEXT_PUBLIC_API_URL a .env.local
3. Intenta accedir manualment: https://empentia-backend-production.up.railway.app/health

### Error: "Error carregant pregunta"

**Causa:** Audit no iniciat correctament

**Solució:**
1. Obre DevTools → Network
2. Verifica que `/scrape` i `/audit/start` retornen success: true
3. Comprova que tens audit_id vàlid a la URL

### Error: "Auditoria no trobada"

**Causa:** GET /audit/{id} retorna error

**Solució:**
1. Verifica que audit_id existeix a la base de dades
2. Comprova que `/audit/generate` s'ha cridat correctament
3. Revisa logs del backend a Railway

---

## 📊 Endpoints Testing amb cURL

### Test Scraping:
```bash
curl -X POST https://empentia-backend-production.up.railway.app/scrape \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.exemple.cat"}'
```

Resposta esperada:
```json
{
  "success": true,
  "company_id": "uuid-aqui",
  "pre_research": { ... }
}
```

### Test Start Audit:
```bash
curl -X POST https://empentia-backend-production.up.railway.app/audit/start \
  -H "Content-Type: application/json" \
  -d '{"company_id": "uuid-del-scrape"}'
```

### Test Next Question:
```bash
curl -X POST https://empentia-backend-production.up.railway.app/audit/next-question \
  -H "Content-Type: application/json" \
  -d '{"audit_id": "uuid-audit", "question_number": 1}'
```

---

## 🚧 Pendent d'Implementar (Backend)

### 1. **PDF Generation**

Actualment el backend té:
```python
# TODO: Generar PDF aquí (futur)
# pdf_url = generate_pdf(audit_result, company, request.email)
```

**Opcions:**
- WeasyPrint (Python HTML → PDF)
- ReportLab (Python native PDF)
- Puppeteer via API (HTML → PDF amb Chrome)

### 2. **Email Service**

Configurar Resend per enviar:
- Email amb auditoria
- PDF adjunt
- Follow-up emails

### 3. **File Storage**

Guardar PDFs generats:
- Supabase Storage (inicial)
- S3 (quan escales)

---

## 📝 Next Steps Recomanats

### Prioritat Alta:
1. ✅ Frontend integration (COMPLETAT)
2. 🚧 PDF generation al backend
3. 🚧 Email service amb Resend
4. 🚧 Testing end-to-end complet

### Prioritat Mitjana:
5. Analytics (Plausible)
6. Error monitoring (Sentry)
7. Performance optimization

### Prioritat Baixa:
8. Admin dashboard
9. Client portal
10. A/B testing

---

## 🎯 Com Continuar

### Opció B: Implementar PDF + Email

**Fitxers a crear al backend:**

```
backend/
├── services/
│   ├── pdf_generator.py    # Generar PDF amb WeasyPrint
│   └── email_service.py    # Enviar emails amb Resend
└── templates/
    └── audit_template.html # Template HTML per PDF
```

**Passos:**
1. Instal·lar WeasyPrint: `pip install weasyprint`
2. Crear HTML template professional
3. Generar PDF des de HTML
4. Configurar Resend API key
5. Enviar email amb PDF adjunt
6. Actualitzar endpoint `/audit/generate`

---

**Status:** ✅ Frontend completament integrat amb backend  
**Pendent:** PDF generation + Email service

🚀 **Ready per continuar amb Opció B!**
