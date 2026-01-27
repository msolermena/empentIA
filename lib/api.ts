/**
 * API Client per empentIA Backend v5.0
 * =====================================
 * 
 * Nou flux:
 * - P1: Mida + Volum + WOW
 * - P2: Eines per àmbit
 * - P3: Oportunitats + Estats
 * - P4: Quantificació
 * - P5: Text lliure (opcional)
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://empentia-backend-production.up.railway.app';

// ========================================
// TIPUS v5.0
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

// Question P1
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
    min: number;
    max: number;
  };
  metadata: {
    sector_id: string;
    sector_name: string;
    terme_volum: string;
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
  skip?: boolean;  // 🆕 Si true, saltar P4
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

export type QuestionV5 = QuestionP1 | QuestionP2 | QuestionP3 | QuestionP4 | QuestionP5;

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
  tipus_roi?: 'estalvi' | 'valor_nou';  // 🆕
  es_prioritaria: boolean;
}

export interface InformeV5 {
  company_summary: string;
  oportunitats: OportunitatInforme[];
  impacte_total: {
    hores_setmana: number;
    euros_mes: number;
    desglossat?: {  // 🆕
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
    email?: string;
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
export async function startAudit(companyId: string): Promise<StartAuditResponse> {
  const response = await fetch(`${API_URL}/audit/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ company_id: companyId }),
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
 */
export async function generateAudit(
  auditId: string,
  email?: string
): Promise<GenerateAuditResponse> {
  const response = await fetch(`${API_URL}/audit/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      audit_id: auditId,
      email: email || null,
    }),
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
export async function scrapeAndStartAudit(companyUrl: string): Promise<StartAuditResponse & { pre_research: ScrapeResponse['pre_research'] }> {
  const scrapeResult = await scrapeCompany(companyUrl);
  const auditResult = await startAudit(scrapeResult.company_id);
  
  return {
    ...auditResult,
    pre_research: scrapeResult.pre_research,
  };
}
