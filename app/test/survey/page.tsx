"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createValidationTest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ClipboardList
} from "lucide-react";

// Tipus per les respostes
interface SurveyResponses {
  // Secció 1: Situació actual
  s1_problema_real: number;
  s1_que_fas_ara: string[];
  s1_que_et_frena: string[];
  s1_que_et_frena_altres: string;
  
  // Secció 2: Comprensió empentIA
  s2_punts_clars: string[];
  s2_confusio: string;
  
  // Secció 3: Valoració auditoria
  s3_encert: number;
  s3_wow_factor: number;
  s3_feedback_oportunitats: string;
  
  // Secció 4: Model de servei
  s4_subscripcio_vs_projecte: string;
  s4_delegar_vs_control: string;
  
  // Secció 5: Decisió i preu
  s5_contractaria: string;
  s5_per_que: string;
  s5_preu_arrencada_just: string;
  s5_preu_arrencada_max: string;
  s5_preu_acceleracio_just: string;
  s5_preu_acceleracio_max: string;
  s5_preu_transformacio_just: string;
  s5_preu_transformacio_max: string;
  
  // Secció 6: Feedback final
  s6_convençut_o_no: string;
  s6_altres: string;
}

const initialResponses: SurveyResponses = {
  s1_problema_real: 0,
  s1_que_fas_ara: [],
  s1_que_et_frena: [],
  s1_que_et_frena_altres: "",
  s2_punts_clars: [],
  s2_confusio: "",
  s3_encert: 0,
  s3_wow_factor: 0,
  s3_feedback_oportunitats: "",
  s4_subscripcio_vs_projecte: "",
  s4_delegar_vs_control: "",
  s5_contractaria: "",
  s5_per_que: "",
  s5_preu_arrencada_just: "",
  s5_preu_arrencada_max: "",
  s5_preu_acceleracio_just: "",
  s5_preu_acceleracio_max: "",
  s5_preu_transformacio_just: "",
  s5_preu_transformacio_max: "",
  s6_convençut_o_no: "",
  s6_altres: "",
};

// Component per escala 1-5
function RatingScale({ 
  value, 
  onChange, 
  leftLabel, 
  rightLabel 
}: { 
  value: number; 
  onChange: (v: number) => void;
  leftLabel: string;
  rightLabel: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-xs text-slate-500">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <div className="flex justify-between gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 text-lg font-semibold transition-all ${
              value === n
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-slate-700 text-slate-400 hover:border-slate-600"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

// Component per checkboxes
function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => toggle(option.value)}
          className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
            selected.includes(option.value)
              ? "border-emerald-500 bg-emerald-500/10"
              : "border-slate-700 hover:border-slate-600"
          }`}
        >
          <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${
            selected.includes(option.value)
              ? "border-emerald-500 bg-emerald-500"
              : "border-slate-600"
          }`}>
            {selected.includes(option.value) && (
              <CheckCircle2 className="h-3 w-3 text-white" />
            )}
          </div>
          <span className={selected.includes(option.value) ? "text-emerald-400" : "text-slate-300"}>
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}

// Component per radio buttons
function RadioGroup({
  options,
  selected,
  onChange,
}: {
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
            selected === option.value
              ? "border-emerald-500 bg-emerald-500/10"
              : "border-slate-700 hover:border-slate-600"
          }`}
        >
          <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
            selected === option.value
              ? "border-emerald-500 bg-emerald-500"
              : "border-slate-600"
          }`}>
            {selected === option.value && (
              <div className="h-2 w-2 rounded-full bg-white" />
            )}
          </div>
          <span className={selected === option.value ? "text-emerald-400" : "text-slate-300"}>
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default function SurveyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auditId = searchParams.get("audit_id");
  
  const [currentSection, setCurrentSection] = useState(1);
  const [responses, setResponses] = useState<SurveyResponses>(initialResponses);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testData, setTestData] = useState<any>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const totalSections = 6;

  useEffect(() => {
    // Recuperar dades del test des de sessionStorage
    const stored = sessionStorage.getItem("testValidation");
    if (stored) {
      setTestData(JSON.parse(stored));
    }
  }, []);

  const updateResponse = <K extends keyof SurveyResponses>(
    key: K,
    value: SurveyResponses[K]
  ) => {
    setResponses((prev) => ({ ...prev, [key]: value }));
    setValidationError(null);
  };

  // Validar camps obligatoris per secció
  const validateSection = (): boolean => {
    setValidationError(null);
    
    switch (currentSection) {
      case 1:
        if (responses.s1_problema_real === 0) {
          setValidationError("Si us plau, valora el nivell de problema (1-5)");
          return false;
        }
        if (responses.s1_que_fas_ara.length === 0) {
          setValidationError("Si us plau, selecciona almenys una opció sobre què fas ara");
          return false;
        }
        if (responses.s1_que_et_frena.length === 0) {
          setValidationError("Si us plau, selecciona almenys una opció sobre què et frena");
          return false;
        }
        return true;
        
      case 2:
        if (responses.s2_punts_clars.length === 0) {
          setValidationError("Si us plau, selecciona els punts que has entès");
          return false;
        }
        return true;
        
      case 3:
        if (responses.s3_encert === 0) {
          setValidationError("Si us plau, valora l'encert de les oportunitats (1-5)");
          return false;
        }
        if (responses.s3_wow_factor === 0) {
          setValidationError("Si us plau, valora el wow factor (1-5)");
          return false;
        }
        return true;
        
      case 4:
        if (!responses.s4_subscripcio_vs_projecte) {
          setValidationError("Si us plau, selecciona la teva preferència de model");
          return false;
        }
        if (!responses.s4_delegar_vs_control) {
          setValidationError("Si us plau, selecciona com et fa sentir delegar");
          return false;
        }
        return true;
        
      case 5:
        if (!responses.s5_contractaria) {
          setValidationError("Si us plau, indica si contractaries empentIA");
          return false;
        }
        return true;
        
      case 6:
        // Tot opcional en aquesta secció
        return true;
        
      default:
        return true;
    }
  };

  const nextSection = () => {
    if (!validateSection()) {
      return;
    }
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevSection = () => {
    setValidationError(null);
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (!validateSection()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Preparar dades per enviar a Supabase via API
      const payload = {
        audit_id: auditId,
        tester_name: testData?.name || null,
        tester_role: testData?.role || null,
        has_business: testData?.hasBusiness || null,
        started_at: testData?.startedAt || null,
        survey_responses: responses,
        completed_at: new Date().toISOString(),
      };

      // Enviar a backend
      const result = await createValidationTest(payload);
      
      // Guardar test_id per la pàgina thanks (per actualitzar email)
      if (result.test_id) {
        sessionStorage.setItem("validationTestId", result.test_id);
      }
      
      // Redirigir a pàgina d'agraïment
      router.push("/test/thanks");
      
    } catch (error) {
      console.error("Error submitting survey:", error);
      setValidationError("Error guardant l'enquesta. Torna-ho a provar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="mb-2 text-xl font-bold text-slate-50">Situació actual</h2>
              <p className="text-slate-400">Com gestiones les tasques repetitives ara mateix?</p>
            </div>

            {/* 1.1 */}
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                Les tasques repetitives que fas manualment al negoci, són un problema real? *
              </label>
              <RatingScale
                value={responses.s1_problema_real}
                onChange={(v) => updateResponse("s1_problema_real", v)}
                leftLabel="No em preocupen"
                rightLabel="Em treuen molt temps"
              />
            </div>

            {/* 1.2 */}
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                Què fas ara per gestionar aquestes tasques? *
              </label>
              <CheckboxGroup
                options={[
                  { value: "manual", label: "Tot manual, no tinc res automatitzat" },
                  { value: "basic", label: "Tinc algunes automatitzacions bàsiques" },
                  { value: "diy", label: "Utilitzo eines tipus Zapier/Make jo mateix" },
                  { value: "external", label: "Tinc algú extern que m'ho porta" },
                  { value: "tried", label: "He provat coses però no han funcionat" },
                ]}
                selected={responses.s1_que_fas_ara}
                onChange={(v) => updateResponse("s1_que_fas_ara", v)}
              />
            </div>

            {/* 1.3 */}
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                Què et frena més a l'hora d'automatitzar? *
              </label>
              <CheckboxGroup
                options={[
                  { value: "no_se", label: "No sé per on començar" },
                  { value: "no_temps", label: "No tinc temps per dedicar-hi" },
                  { value: "no_confio", label: "No confio que funcioni bé" },
                  { value: "car", label: "Em sembla car" },
                  { value: "control", label: "Prefereixo tenir-ho controlat jo" },
                  { value: "no_sabia", label: "No sabia que es podia fer" },
                ]}
                selected={responses.s1_que_et_frena}
                onChange={(v) => updateResponse("s1_que_et_frena", v)}
              />
              <input
                type="text"
                placeholder="Altres (especifica)"
                value={responses.s1_que_et_frena_altres}
                onChange={(e) => updateResponse("s1_que_et_frena_altres", e.target.value)}
                className="mt-2 w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="mb-2 text-xl font-bold text-slate-50">Comprensió d'empentIA</h2>
              <p className="text-slate-400">Què has entès del servei?</p>
            </div>

            {/* 2.1 */}
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                Quin d'aquests punts has entès clarament? *
              </label>
              <CheckboxGroup
                options={[
                  { value: "subscripcio", label: "És un servei de subscripció mensual (no un projecte puntual)" },
                  { value: "complet", label: "Inclou implementació + manteniment + suport continu" },
                  { value: "mida", label: "Les automatitzacions es fan a mida pel meu negoci" },
                  { value: "no_diy", label: "No he de fer res jo, ho fan ells (no és DIY)" },
                  { value: "gratuit", label: "L'auditoria és gratuïta i sense compromís" },
                ]}
                selected={responses.s2_punts_clars}
                onChange={(v) => updateResponse("s2_punts_clars", v)}
              />
            </div>

            {/* 2.2 */}
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                Hi ha alguna cosa que no t'ha quedat clara o t'ha confós?{" "}
                <span className="text-slate-500">(opcional)</span>
              </label>
              <textarea
                value={responses.s2_confusio}
                onChange={(e) => updateResponse("s2_confusio", e.target.value)}
                rows={3}
                className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none"
                placeholder="Explica'ns què no ha quedat clar..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="mb-2 text-xl font-bold text-slate-50">Valoració de l'auditoria</h2>
              <p className="text-slate-400">Com valores l'experiència i els resultats?</p>
            </div>

            {/* 3.1 */}
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                Les oportunitats que t'ha mostrat l'informe, encerten amb els problemes reals del negoci? *
              </label>
              <RatingScale
                value={responses.s3_encert}
                onChange={(v) => updateResponse("s3_encert", v)}
                leftLabel="Gens"
                rightLabel="Totalment"
              />
            </div>

            {/* 3.2 */}
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                L'auditoria t'ha sorprès positivament? *
              </label>
              <RatingScale
                value={responses.s3_wow_factor}
                onChange={(v) => updateResponse("s3_wow_factor", v)}
                leftLabel="Gens"
                rightLabel="Molt"
              />
            </div>

            {/* 3.3 */}
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                Hi ha alguna cosa que hauries automatitzat que NO ha sortit? O alguna que ha sortit i no té sentit?{" "}
                <span className="text-slate-500">(opcional)</span>
              </label>
              <textarea
                value={responses.s3_feedback_oportunitats}
                onChange={(e) => updateResponse("s3_feedback_oportunitats", e.target.value)}
                rows={3}
                className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none"
                placeholder="Comenta'ns..."
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="mb-2 text-xl font-bold text-slate-50">Model de servei</h2>
              <p className="text-slate-400">Com valores el model que proposem?</p>
            </div>

            {/* 4.1 */}
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                El model de subscripció mensual (vs pagar un projecte tancat d'una vegada), et sembla: *
              </label>
              <RadioGroup
                options={[
                  { value: "subscripcio", label: "Prefereixo subscripció (actualitzacions, suport continu)" },
                  { value: "projecte", label: "Prefereixo pagar un cop i ja" },
                  { value: "depen_preu", label: "Depèn del preu" },
                  { value: "igual", label: "M'és igual" },
                ]}
                selected={responses.s4_subscripcio_vs_projecte}
                onChange={(v) => updateResponse("s4_subscripcio_vs_projecte", v)}
              />
            </div>

            {/* 4.2 */}
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                Que empentIA s'encarregui de tot (configurar, mantenir, actualitzar) et genera: *
              </label>
              <RadioGroup
                options={[
                  { value: "tranquilitat", label: "Tranquil·litat (prefereixo delegar)" },
                  { value: "desconfiança", label: "Desconfiança (vull controlar-ho jo)" },
                  { value: "indiferencia", label: "Indiferència" },
                ]}
                selected={responses.s4_delegar_vs_control}
                onChange={(v) => updateResponse("s4_delegar_vs_control", v)}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="mb-2 text-xl font-bold text-slate-50">Decisió i preu</h2>
              <p className="text-slate-400">Contractaries empentIA? A quin preu?</p>
            </div>

            {/* 5.1 */}
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                Si tinguessis aquest negoci, contractaries empentIA? *
              </label>
              <RadioGroup
                options={[
                  { value: "si_segur", label: "Sí, segur" },
                  { value: "probablement_si", label: "Probablement sí" },
                  { value: "potser", label: "Potser, ho hauria de pensar" },
                  { value: "probablement_no", label: "Probablement no" },
                  { value: "no_segur", label: "No, segur que no" },
                ]}
                selected={responses.s5_contractaria}
                onChange={(v) => updateResponse("s5_contractaria", v)}
              />
            </div>

            {/* 5.1b - Per què */}
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                Per què? <span className="text-slate-500">(opcional)</span>
              </label>
              <textarea
                value={responses.s5_per_que}
                onChange={(e) => updateResponse("s5_per_que", e.target.value)}
                rows={3}
                className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none"
                placeholder="Explica'ns els motius..."
              />
            </div>

            {/* 5.2 - Pricing */}
            <div>
              <label className="mb-4 block text-sm font-medium text-slate-300">
                Quin preu mensual et semblaria raonable? <span className="text-slate-500">(opcional)</span>
              </label>
              
              <div className="space-y-4">
                {/* Arrencada */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <div className="mb-3">
                    <h4 className="font-semibold text-slate-200">Pla Arrencada</h4>
                    <p className="text-sm text-slate-500">1-2 automatitzacions + plataforma amb agents IA bàsica</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="mb-1 block text-xs text-slate-500">Preu just (€/mes)</label>
                      <input
                        type="number"
                        value={responses.s5_preu_arrencada_just}
                        onChange={(e) => updateResponse("s5_preu_arrencada_just", e.target.value)}
                        className="w-full rounded-lg border-2 border-slate-700 bg-slate-800/50 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                        placeholder="€"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="mb-1 block text-xs text-slate-500">Màxim (€/mes)</label>
                      <input
                        type="number"
                        value={responses.s5_preu_arrencada_max}
                        onChange={(e) => updateResponse("s5_preu_arrencada_max", e.target.value)}
                        className="w-full rounded-lg border-2 border-slate-700 bg-slate-800/50 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                        placeholder="€"
                      />
                    </div>
                  </div>
                </div>

                {/* Acceleració */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <div className="mb-3">
                    <h4 className="font-semibold text-slate-200">Pla Acceleració</h4>
                    <p className="text-sm text-slate-500">3-5 automatitzacions + plataforma amb agents IA avançada</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="mb-1 block text-xs text-slate-500">Preu just (€/mes)</label>
                      <input
                        type="number"
                        value={responses.s5_preu_acceleracio_just}
                        onChange={(e) => updateResponse("s5_preu_acceleracio_just", e.target.value)}
                        className="w-full rounded-lg border-2 border-slate-700 bg-slate-800/50 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                        placeholder="€"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="mb-1 block text-xs text-slate-500">Màxim (€/mes)</label>
                      <input
                        type="number"
                        value={responses.s5_preu_acceleracio_max}
                        onChange={(e) => updateResponse("s5_preu_acceleracio_max", e.target.value)}
                        className="w-full rounded-lg border-2 border-slate-700 bg-slate-800/50 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                        placeholder="€"
                      />
                    </div>
                  </div>
                </div>

                {/* Transformació */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                  <div className="mb-3">
                    <h4 className="font-semibold text-slate-200">Pla Transformació</h4>
                    <p className="text-sm text-slate-500">6+ automatitzacions + plataforma amb agents IA completa</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="mb-1 block text-xs text-slate-500">Preu just (€/mes)</label>
                      <input
                        type="number"
                        value={responses.s5_preu_transformacio_just}
                        onChange={(e) => updateResponse("s5_preu_transformacio_just", e.target.value)}
                        className="w-full rounded-lg border-2 border-slate-700 bg-slate-800/50 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                        placeholder="€"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="mb-1 block text-xs text-slate-500">Màxim (€/mes)</label>
                      <input
                        type="number"
                        value={responses.s5_preu_transformacio_max}
                        onChange={(e) => updateResponse("s5_preu_transformacio_max", e.target.value)}
                        className="w-full rounded-lg border-2 border-slate-700 bg-slate-800/50 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                        placeholder="€"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="mb-2 text-xl font-bold text-slate-50">Feedback final</h2>
              <p className="text-slate-400">L'última secció! Gràcies per arribar fins aquí 🙌</p>
            </div>

            {/* 6.1 */}
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                Què t'ha convençut més? I què et faria dir que no? <span className="text-slate-500">(opcional)</span>
              </label>
              <textarea
                value={responses.s6_convençut_o_no}
                onChange={(e) => updateResponse("s6_convençut_o_no", e.target.value)}
                rows={4}
                className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none"
                placeholder="Explica'ns..."
              />
            </div>

            {/* 6.2 */}
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">
                Alguna cosa més?{" "}
                <span className="text-slate-500">(opcional)</span>
              </label>
              <textarea
                value={responses.s6_altres}
                onChange={(e) => updateResponse("s6_altres", e.target.value)}
                rows={3}
                className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none"
                placeholder="Qualsevol comentari addicional..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[400px] -right-[400px] h-[800px] w-[800px] rounded-full bg-emerald-500/[0.07] blur-3xl" />
        <div className="absolute -bottom-[400px] -left-[400px] h-[800px] w-[800px] rounded-full bg-emerald-500/[0.05] blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <Logo size="md" variant="image" />
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <ClipboardList className="h-4 w-4" />
            Enquesta de valoració
          </div>
        </nav>
      </header>

      {/* Progress bar */}
      <div className="relative z-10 border-b border-slate-800 bg-slate-900/50">
        <div className="mx-auto max-w-2xl px-6 py-4">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-400">Secció {currentSection} de {totalSections}</span>
            <span className="text-emerald-400">{Math.round((currentSection / totalSections) * 100)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
              style={{ width: `${(currentSection / totalSections) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="relative z-10 mx-auto max-w-2xl px-6 py-12">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-sm">
          {renderSection()}

          {/* Error de validació */}
          {validationError && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-400">
              {validationError}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="mt-6 flex justify-between gap-4">
            {currentSection > 1 ? (
              <Button 
                variant="outline" 
                onClick={prevSection}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Anterior
              </Button>
            ) : (
              <div />
            )}

            {currentSection < totalSections ? (
              <Button onClick={nextSection} className="gap-2">
                Següent
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? "Enviant..." : "Enviar enquesta"}
                <CheckCircle2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
