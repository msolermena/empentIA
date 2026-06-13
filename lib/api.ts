/**
 * API Client per empentIA Backend v6.1
 * =====================================
 * 
 * Nou flux:
 * - P1: Confirmació info detectada
 * - P2: Eines per àmbit
 * - P3: Oportunitats + Estats
 * - P4: Quantificació
 * - P5: Text lliure (opcional)
 * 
 * v6.1: Afegit suport per contacte complet (telèfon, preferència, consentiments)
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://empentia-backend-production.up.railway.app';

// ========================================
// TIPUS v6.1
// ========================================

export interface ScrapeResponse {
  success: boolean;
  company_id: string;
  pre_research: {
    sector_id: string;
    sector_name: string;
    nom_empresa: string;
    url: string;
    insights: {
      te_botiga_online: boolean;
      te_formulari_contacte: boolean;
      te_chat: boolean;
      te_blog: boolean;
      te_area_clients: boolean;
      xarxes_socials: string[];
      eines_detectades: string[];
    };
    observacions: string;
    // 🆕 v6.0
    info_detectada: InfoDetectada[];
    sistemes_detectats: string[];
  };
  error?: string;
}

export interface StartAuditResponse {
  success: boolean;
  audit_id: string;
  status: string;
  total_questions: number;
  error?: string;
}

// Opcions d'eines per un àmbit
export interface AmbitEines {
  id: string;
  nom: string;
  icona: string;
  multi_select: boolean;
  options: Array<{ id: string; label: string }>;
}

// Oportunitat mostrada a P3
export interface Oportunitat {
  id: string;
  index: number;
  text: string;
  estimacio_hores: number;
}

// Estat d'una oportunitat
export interface EstatOpcio {
  id: string;
  label: string;
  icona: string;
}

// 🆕 v6.0: Info detectada per P1
export interface InfoDetectada {
  tipus: string;
  valor: string;
  confianca: 'alta' | 'mitjana';
}

// 🆕 v6.1: Consentiments GDPR
export interface Consentiments {
  privacitat: boolean;
  comercial: boolean;
  timestamp: string;
}

// 🆕 v6.1: Dades contacte complet
export interface ContactData {
  email: string;
  telefon?: string | null;
  preferencia_contacte: 'email' | 'trucada' | 'whatsapp';
  consentiments: Consentiments;
  // 🆕 v6.2: Nom i càrrec
  nom?: string;
  carrec?: string;
}

// Question P1 (v5 - fallback per compatibilitat)
export interface QuestionP1 {
  success: boolean;
  number: 1;
  type: 'p1_wow_mida_volum';
  title: string;
  wow_text: string;
  mida: {
    label: string;
    type: 'radio';
    options: Array<{ id: string; label: string }>;
  };
  volum: {
    label: string;
    type: 'number';
    placeholder: string;
    hint?: string;
    min: number;
    max: number;
  };
  metadata: {
    sector_id: string;
    sector_name: string;
    terme_volum: string;
    context_volum?: string;
  };
}

// Question P1 Confirmació
export interface QuestionP1Confirmacio {
  success: boolean;
  number: 1;
  type: 'p1_confirmacio';
  title: string;
  subtitle: string;
  info_detectada: InfoDetectada[];
  correccions: {
    label: string;
    type: 'textarea';
    placeholder: string;
    required: boolean;
  };
  metadata: {
    sector_id: string;
    sector_name: string;
    sistemes_detectats: string[];
  };
}

// Question P2
export interface QuestionP2 {
  success: boolean;
  number: 2;
  type: 'p2_eines';
  title: string;
  subtitle: string;
  ambits: AmbitEines[];
  metadata: {
    sector_id: string;
    total_ambits: number;
  };
}

// Question P3
export interface QuestionP3 {
  success: boolean;
  number: 3;
  type: 'p3_oportunitats';
  title: string;
  subtitle: string;
  oportunitats: Oportunitat[];
  estats: EstatOpcio[];
  prioritat: {
    label: string;
    type: 'dropdown';
    placeholder: string;
  };
  metadata: {
    total_oportunitats: number;
  };
}

// Question P4
export interface QuestionP4 {
  success: boolean;
  number: 4;
  type: 'p4_quantificacio';
  title: string;
  subtitle: string;
  skip?: boolean;
  oportunitats: Array<{
    id: string;
    text: string;
    estimacio_preseleccionada: string;
    estat: string;
  }>;
  opcions_temps: Array<{ id: string; label: string }>;
  metadata: {
    total_a_quantificar: number;
    total_no_fem?: number;
    motiu_skip?: string;
  };
}

// Question P5
export interface QuestionP5 {
  success: boolean;
  number: 5;
  type: 'p5_text_lliure';
  title: string;
  subtitle: string;
  input: {
    type: 'textarea';
    placeholder: string;
    maxLength: number;
    optional: boolean;
  };
  skip_text: string;
  metadata: {
    is_optional: boolean;
  };
}

export type QuestionV5 = QuestionP1 | QuestionP1Confirmacio | QuestionP2 | QuestionP3 | QuestionP4 | QuestionP5;

export interface SaveAnswerResponse {
  success: boolean;
  conversation_id: string;
  is_last_question: boolean;
  error?: string;
}

// Informe v5.1
export interface OportunitatInforme {
  nom: string;
  descripcio: string;
  benefici: string;
  hores_setmana: number;
  euros_mes: number;
  estat_actual: 'manual' | 'no_fem';
  tipus_roi?: 'estalvi' | 'valor_nou';
  es_prioritaria: boolean;
}

export interface InformeV5 {
  company_summary: string;
  oportunitats: OportunitatInforme[];
  impacte_total: {
    hores_setmana: number;
    euros_mes: number;
    desglossat?: {
      estalvi_hores: number;
      estalvi_euros: number;
      valor_nou_euros: number;
    };
  };
  recomanacio: string;
  oportunitats_adicionals: Array<{
    nom: string;
    descripcio_breu: string;
  }>;
  nota_p5: string | null;
}

export interface GenerateAuditResponse {
  success: boolean;
  audit_id: string;
  audit: InformeV5;
  error?: string;
}

export interface GetAuditResponse {
  success: boolean;
  audit: {
    id: string;
    company_id: string;
    status: string;
    nom?: string;
    carrec?: string;
    email?: string;
    telefon?: string;
    preferencia_contacte?: string;
    audit_result?: InformeV5;
    created_at: string;
    completed_at?: string;
  };
  error?: string;
}

// ========================================
// FUNCIONS API
// ========================================

/**
 * POST /scrape - Escaneja la web i crea company
 */
export async function scrapeCompany(companyUrl: string): Promise<ScrapeResponse> {
  const response = await fetch(`${API_URL}/scrape`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: companyUrl }),
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Error fent scraping de la web');
  }
  return data;
}

/**
 * POST /audit/start - Inicia auditoria
 */
export async function startAudit(companyId: string, origen?: string): Promise<StartAuditResponse> {
  const response = await fetch(`${API_URL}/audit/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      company_id: companyId,
      origen: origen || 'auditoria'  // Default a 'auditoria' si no s'especifica
    }),
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Error iniciant auditoria');
  }
  return data;
}

/**
 * POST /audit/next-question - Obté següent pregunta
 */
export async function getNextQuestion(
  auditId: string,
  questionNumber: number
): Promise<QuestionV5> {
  const response = await fetch(`${API_URL}/audit/next-question`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      audit_id: auditId,
      question_number: questionNumber,
    }),
  });

  const data = await response.json();
  if (data.error || !data.success) {
    throw new Error(data.error || `Error carregant pregunta ${questionNumber}`);
  }
  return data;
}

/**
 * POST /audit/answer - Guarda resposta
 */
export async function saveAnswer(
  auditId: string,
  questionNumber: number,
  questionData: any,
  answer: string
): Promise<SaveAnswerResponse> {
  const response = await fetch(`${API_URL}/audit/answer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      audit_id: auditId,
      question_number: questionNumber,
      question_data: questionData,
      answer: answer,
    }),
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Error guardant resposta');
  }
  return data;
}

/**
 * POST /audit/generate - Genera informe final
 * 
 * 🆕 v6.1: Accepta contactData complet amb telèfon, preferència i consentiments
 */
export async function generateAudit(
  auditId: string,
  email?: string,
  contactData?: ContactData
): Promise<GenerateAuditResponse> {
  // Construir body amb nous camps
  const body: any = {
    audit_id: auditId,
  };

  // Si tenim contactData complet (nova versió)
  if (contactData) {
    body.email = contactData.email;
    body.telefon = contactData.telefon;
    body.preferencia_contacte = contactData.preferencia_contacte;
    body.consentiments = contactData.consentiments;
    // 🆕 v6.2: Nom i càrrec
    body.nom = contactData.nom;
    body.carrec = contactData.carrec;
  } else if (email) {
    // Compatibilitat amb versió antiga (només email)
    body.email = email;
  }

  const response = await fetch(`${API_URL}/audit/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Error generant auditoria');
  }
  return data;
}

/**
 * GET /audit/{id} - Obté auditoria completa
 */
export async function getAudit(auditId: string): Promise<GetAuditResponse> {
  const response = await fetch(`${API_URL}/audit/${auditId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Auditoria no trobada');
  }
  return data;
}

/**
 * HELPER: Scrape + Start en una sola funció
 */
export async function scrapeAndStartAudit(
  companyUrl: string, 
  ctaOrigin?: string,
  source?: string  // 'test' si ve del test de validació
): Promise<StartAuditResponse & { pre_research: ScrapeResponse['pre_research'] }> {
  const scrapeResult = await scrapeCompany(companyUrl);
  // Si source=test, origen = "test", sinó convertir cta_origin
  const origen = source === 'test' 
    ? 'test' 
    : (ctaOrigin === 'footer' ? 'auditoria_2' : 'auditoria');
  const auditResult = await startAudit(scrapeResult.company_id, origen);
  
  return {
    ...auditResult,
    pre_research: scrapeResult.pre_research,
  };
}


// ========================================
// VALIDATION TEST API
// ========================================

export interface ValidationTestRequest {
  audit_id?: string | null;
  tester_name?: string | null;
  tester_role?: string | null;
  has_business?: string | null;
  started_at?: string | null;
  survey_responses: Record<string, any>;
  completed_at?: string | null;
  current_section?: number;  // 🆕 Per tracking abandonaments
}

export interface ValidationTestResponse {
  success: boolean;
  test_id?: string;
  error?: string;
}

export interface ValidationTestEmailRequest {
  test_id: string;
  email?: string | null;
  wants_updates: boolean;
  wants_pilot: boolean;
}

/**
 * POST /validation-test - Crea nou test de validació
 */
export async function createValidationTest(
  data: ValidationTestRequest
): Promise<ValidationTestResponse> {
  const response = await fetch(`${API_URL}/validation-test`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'Error guardant test de validació');
  }
  return result;
}

/**
 * PATCH /validation-test/{id}/responses - Actualitza respostes parcials (auto-save)
 */
export async function updateValidationResponses(
  testId: string,
  responses: Record<string, any>,
  currentSection: number
): Promise<{ success: boolean; error?: string }> {
  const response = await fetch(`${API_URL}/validation-test/${testId}/responses`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      survey_responses: responses,
      current_section: currentSection 
    }),
  });

  const result = await response.json();
  if (!result.success) {
    console.error('Auto-save failed:', result.error);
  }
  return result;
}

/**
 * PATCH /validation-test/{id} - Actualitza email i preferències
 */
export async function updateValidationTestEmail(
  data: ValidationTestEmailRequest
): Promise<{ success: boolean; error?: string }> {
  const response = await fetch(`${API_URL}/validation-test/${data.test_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'Error actualitzant test');
  }
  return result;
}


// ========================================
// LEAD & CONTACT API (v6.3)
// ========================================

export interface LeadData {
  nom: string;
  email: string;
  telefon?: string;
  preferencia_contacte?: 'email' | 'trucada' | 'whatsapp';
  missatge?: string;
}

/**
 * POST /lead - Crea lead de contacte directe (landing, sense audit)
 */
export async function createLead(
  data: LeadData
): Promise<{ success: boolean; lead_id?: string; error?: string }> {
  const response = await fetch(`${API_URL}/lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'Error enviant formulari de contacte');
  }
  return result;
}

// ========================================
// LEADS LANDING WEBCHAT
// ========================================

const PORTAL_URL = 'https://app.empentia.com';

export type LandingLeadOrigen =
  // Landing webchat
  | 'landing-webchat-hero'
  | 'landing-webchat-pricing-starter'
  | 'landing-webchat-pricing-pro'
  | 'landing-webchat-pricing-business'
  | `landing-webchat-contractar-${'starter' | 'pro' | 'business'}`
  | 'landing-webchat-cta-final'
  | 'landing-webchat-calendly'
  // Home
  | 'landing-home-contacte'
  // Audit
  | 'landing-auditoria-email'
  | 'landing-auditoria-contacte'
  // Auditoria atenció al client (calculadora de cost)
  | 'landing-atencio-auditoria-contacte'
  | 'landing-atencio-auditoria-reunio';

export interface LandingLeadData {
  email: string;
  origen: LandingLeadOrigen;
  audit_id?: string;        // si present, el portal fa upsert en lloc de crear nou lead
  nom_empresa?: string;
  url_web?: string;
  nom_contacte?: string;
  telefon?: string;
  plataforma?: 'WooCommerce' | 'PrestaShop' | 'Shopify' | 'Web custom' | 'Altra';
  pla?: 'Starter' | 'Pro' | 'Business';
  consentiment_rgpd?: boolean;
}

/**
 * POST /api/leads/landing - Crea lead des de la landing de webchat
 * Tots els camps opcionals excepte email i origen.
 */
export async function createLandingLead(
  data: LandingLeadData
): Promise<{ success: boolean; error?: string }> {
  const response = await fetch(`${PORTAL_URL}/api/leads/landing`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'Error enviant formulari');
  }
  return result;
}

/**
 * PATCH /audit/{id}/contact - Actualitza contacte d'una auditoria (complete)
 */
export async function updateAuditContact(
  auditId: string,
  data: Partial<LeadData>
): Promise<{ success: boolean; error?: string }> {
  const response = await fetch(`${API_URL}/audit/${auditId}/contact`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'Error actualitzant dades de contacte');
  }
  return result;
}
