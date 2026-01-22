// ========================================
// TIPUS v2.0 - Informe Auditoria
// lib/types-v2.ts
// ========================================

// Company Summary
export interface CompanySummary {
  name: string;
  sector: string;
  sector_name: string;
  wow_insight: string;
  tech_detected: string[];
  volume_metric: string;
}

// Impact Summary
export interface ImpactSummary {
  total_hours_saved_weekly: number;
  total_monthly_savings_eur: number;
  detected_savings_eur: number;
  bonus_savings_eur: number;
}

// Detected Opportunity (les 3 principals basades en respostes)
export interface DetectedOpportunity {
  rank: number;
  solution_id: string;
  name: string;
  why_fits: string;
  hours_saved_weekly: number;
  monthly_savings_eur: number;
  integrates_with: string[];
  category: string;
}

// Bonus Opportunity (les 2 addicionals del sector)
export interface BonusOpportunity {
  solution_id: string;
  name: string;
  monthly_savings_eur: number;
  popular_in_sector: boolean;
}

// Current Situation Area
export interface CurrentSituationArea {
  title: string;
  description: string;
}

// Current Situation
export interface CurrentSituation {
  summary: string;
  areas: CurrentSituationArea[];
}

// Justification
export interface Justification {
  text: string;
  reasons: string[];
}

// Package Option
export interface PackageOption {
  id: string;
  name: string;
  icon: string;
  automations: number | string;
  suite: string;
  ideal_for: string;
}

// Packages
export interface Packages {
  show_packages: boolean;
  options: PackageOption[];
}

// CTA
export interface CTA {
  main_text: string;
  button_text: string;
  subtext: string;
  calendly_url: string;
}

// Audit Result v2.0 (el que rep el frontend)
export interface AuditResultV2 {
  company_summary: CompanySummary;
  impact_summary: ImpactSummary;
  detected_opportunities: DetectedOpportunity[];
  bonus_opportunities: BonusOpportunity[];
  current_situation: CurrentSituation;
  justification: Justification;
  packages: Packages;
  cta: CTA;
  // NOTA: _internal NO s'exposa al frontend
}

// Response del GET /audit/{id}
export interface GetAuditResponseV2 {
  success: boolean;
  audit: {
    id: string;
    company_id: string;
    status: string;
    email?: string;
    // Camps nous v2.0
    company_summary?: CompanySummary;
    impact_summary?: ImpactSummary;
    detected_opportunities?: DetectedOpportunity[];
    bonus_opportunities?: BonusOpportunity[];
    current_situation?: CurrentSituation;
    justification?: Justification;
    packages?: Packages;
    cta?: CTA;
    // Camps legacy (per compatibilitat)
    diagnosis?: any;
    quick_wins?: any;
    roi_estimation?: any;
    tier_recommendation?: any;
    // Timestamps
    created_at: string;
    completed_at?: string;
  };
  error?: string;
}

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Comprova si una auditoria és v2.0 o legacy
 */
export function isAuditV2(audit: any): boolean {
  return !!(
    audit?.detected_opportunities && 
    audit?.impact_summary &&
    audit?.company_summary
  );
}

/**
 * Formata euros amb separador de milers
 */
export function formatEuros(amount: number): string {
  return amount.toLocaleString('ca-ES') + '€';
}

/**
 * Formata hores setmanals
 */
export function formatHoursWeekly(hours: number): string {
  return `${hours}h/setmana`;
}

/**
 * Obté el color per categoria
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'atencio_client': 'text-blue-400',
    'finances': 'text-emerald-400',
    'administracio': 'text-purple-400',
    'vendes': 'text-orange-400',
    'operacions': 'text-cyan-400',
    'reporting': 'text-yellow-400',
    'onboarding': 'text-pink-400',
  };
  return colors[category] || 'text-slate-400';
}

/**
 * Obté icona per categoria
 */
export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'atencio_client': '💬',
    'finances': '💰',
    'administracio': '📋',
    'vendes': '🎯',
    'operacions': '⚙️',
    'reporting': '📊',
    'onboarding': '🚀',
  };
  return icons[category] || '📦';
}
