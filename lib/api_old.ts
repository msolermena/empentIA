// API Client per empentIA Backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://empentia-backend-production.up.railway.app';

// ========================================
// TIPUS REAL DEL BACKEND
// ========================================

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
  error?: string;
}

export interface StartAuditResponse {
  success: boolean;
  audit_id: string;
  status: string;
  error?: string;
}

export interface Question {
  question_text: string;
  type: "text" | "radio" | "textarea" | "checkbox";
  options?: string[];
  context?: string;
  help_text?: string;  // v2.0: text d'ajuda opcional
  question_number?: number;
  total_questions?: number;
}

export interface SaveAnswerResponse {
  success: boolean;
  conversation_id: string;
  error?: string;
}

export interface GenerateAuditResponse {
  success: boolean;
  audit_id: string;
  audit: {
    diagnosis: {
      main_problems: Array<{
        title: string;
        description: string;
        impact: string;
        severity: "high" | "medium" | "low";
      }>;
      overall_assessment: string;
    };
    quick_wins: Array<{
      title: string;
      description: string;
      implementation_steps: string[];
      estimated_time: string;
      hours_saved_weekly: number;
      monthly_savings_eur: number;
      difficulty: "easy" | "medium" | "hard";
    }>;
    roi_estimation: {
      total_hours_wasted_weekly: number;
      hourly_cost_eur: number;
      weekly_waste_eur: number;
      monthly_waste_eur: number;
      potential_hours_saved: number;
      monthly_savings_eur: number;
      automation_potential_percent: number;
    };
    tier_recommendation: {
      tier_name: "Essencial" | "Professional" | "Enterprise";
      monthly_price_eur: number;
      rationale: string;
      included_automations: string[];
    };
  };
  pdf_url?: string;
  error?: string;
}

export interface GetAuditResponse {
  success: boolean;
  audit: {
    id: string;
    company_id: string;
    status: string;
    email?: string;
    diagnosis?: any;
    quick_wins?: any;
    roi_estimation?: any;
    tier_recommendation?: any;
    created_at: string;
    completed_at?: string;
  };
  error?: string;
}

// ========================================
// FUNCIONS API
// ========================================

/**
 * POST /scrape
 * Escaneja la web de l'empresa i crea company amb pre-research
 */
export async function scrapeCompany(companyUrl: string): Promise<ScrapeResponse> {
  const response = await fetch(`${API_URL}/scrape`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: companyUrl,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      success: false,
      error: 'Error de connexió amb el servidor' 
    }));
    throw new Error(error.error || `Error ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Error fent scraping de la web');
  }

  return data;
}

/**
 * POST /audit/start
 * Inicia una nova auditoria amb el company_id
 */
export async function startAudit(companyId: string): Promise<StartAuditResponse> {
  const response = await fetch(`${API_URL}/audit/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      company_id: companyId,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      success: false,
      error: 'Error de connexió amb el servidor' 
    }));
    throw new Error(error.error || `Error ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Error iniciant auditoria');
  }

  return data;
}

/**
 * POST /audit/next-question
 * Genera la següent pregunta dinàmica amb context
 */
export async function getNextQuestion(
  auditId: string,
  questionNumber: number
): Promise<Question> {
  const response = await fetch(`${API_URL}/audit/next-question`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      audit_id: auditId,
      question_number: questionNumber,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error carregant pregunta ${questionNumber}`);
  }

  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

/**
 * POST /audit/answer
 * Guarda la resposta d'una pregunta
 */
export async function saveAnswer(
  auditId: string,
  questionNumber: number,
  questionData: Question,
  answer: string
): Promise<SaveAnswerResponse> {
  const response = await fetch(`${API_URL}/audit/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      audit_id: auditId,
      question_number: questionNumber,
      question_data: questionData,
      answer: answer,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      success: false,
      error: 'Error guardant resposta' 
    }));
    throw new Error(error.error || `Error ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Error guardant resposta');
  }

  return data;
}

/**
 * POST /audit/generate
 * Genera l'audit final amb diagnosis, quick wins, ROI
 */
export async function generateAudit(
  auditId: string,
  email: string
): Promise<GenerateAuditResponse> {
  const response = await fetch(`${API_URL}/audit/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      audit_id: auditId,
      email: email,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      success: false,
      error: 'Error generant auditoria' 
    }));
    throw new Error(error.error || `Error ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Error generant auditoria');
  }

  return data;
}

/**
 * GET /audit/{audit_id}
 * Obté l'auditoria completa (per pàgina /complete)
 */
export async function getAudit(auditId: string): Promise<GetAuditResponse> {
  const response = await fetch(`${API_URL}/audit/${auditId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      success: false,
      error: 'Error obtenint auditoria' 
    }));
    throw new Error(error.error || `Error ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Auditoria no trobada');
  }

  return data;
}

/**
 * HELPER: Scrape + Start Audit en una sola funció
 * Simplifica el codi del frontend
 */
export async function scrapeAndStartAudit(companyUrl: string): Promise<StartAuditResponse> {
  // Pas 1: Scraping (crea company amb pre-research)
  const scrapeResult = await scrapeCompany(companyUrl);
  
  // Pas 2: Iniciar auditoria amb el company_id
  const auditResult = await startAudit(scrapeResult.company_id);
  
  return auditResult;
}
