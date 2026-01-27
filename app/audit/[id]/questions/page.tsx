"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  ArrowLeft, 
  Loader2, 
  Sparkles, 
  CheckCircle2,
  Circle,
  AlertCircle
} from "lucide-react";
import { 
  getNextQuestion, 
  saveAnswer as saveAnswerAPI, 
  type QuestionV5,
  type QuestionP1,
  type QuestionP2,
  type QuestionP3,
  type QuestionP4,
  type QuestionP5
} from "@/lib/api";

const TOTAL_QUESTIONS = 5;

// Labels per cada pregunta
const questionLabels: Record<number, string> = {
  1: "Sobre vosaltres",
  2: "Eines",
  3: "Oportunitats",
  4: "Quantificació",
  5: "Alguna cosa més",
};

export default function QuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const auditId = params.id as string;

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [question, setQuestion] = useState<QuestionV5 | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Respostes guardades
  const [savedAnswers, setSavedAnswers] = useState<Record<number, any>>({});

  // P1: Mida i volum
  const [midaSelected, setMidaSelected] = useState<string>("");
  const [volumValue, setVolumValue] = useState<string>("");

  // P2: Eines per àmbit
  const [einesSelected, setEinesSelected] = useState<Record<string, string | string[]>>({});

  // P3: Estats oportunitats i prioritat
  const [estatsOportunitats, setEstatsOportunitats] = useState<Record<string, string>>({});
  const [prioritatSelected, setPrioritatSelected] = useState<string>("");

  // P4: Quantificació
  const [quantificacioSelected, setQuantificacioSelected] = useState<Record<string, string>>({});

  // P5: Text lliure
  const [textLliure, setTextLliure] = useState<string>("");

  const progress = (currentQuestion / TOTAL_QUESTIONS) * 100;

  // Carregar pregunta
  useEffect(() => {
    loadQuestion(currentQuestion);
  }, [currentQuestion]);

  const loadQuestion = async (qNum: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getNextQuestion(auditId, qNum);
      
      // 🆕 Si P4 ve amb skip: true, saltar directament a P5
      if (qNum === 4 && data.skip) {
        console.log("⏭️ P4 skip - no hi ha manuals, saltant a P5");
        setCurrentQuestion(5);
        return;
      }
      
      setQuestion(data);
      
      // Restaurar respostes si existeixen
      if (savedAnswers[qNum]) {
        restoreAnswer(qNum, savedAnswers[qNum]);
      } else {
        resetCurrentAnswer(qNum);
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconegut");
    } finally {
      setIsLoading(false);
    }
  };

  const resetCurrentAnswer = (qNum: number) => {
    switch (qNum) {
      case 1:
        setMidaSelected("");
        setVolumValue("");
        break;
      case 2:
        setEinesSelected({});
        break;
      case 3:
        setEstatsOportunitats({});
        setPrioritatSelected("");
        break;
      case 4:
        // Pre-seleccionar amb estimacions del backend
        if (question?.type === 'p4_quantificacio') {
          const preselected: Record<string, string> = {};
          (question as QuestionP4).oportunitats.forEach(op => {
            preselected[op.id] = op.estimacio_preseleccionada;
          });
          setQuantificacioSelected(preselected);
        }
        break;
      case 5:
        setTextLliure("");
        break;
    }
  };

  const restoreAnswer = (qNum: number, answer: any) => {
    switch (qNum) {
      case 1:
        setMidaSelected(answer.mida || "");
        setVolumValue(answer.volum?.toString() || "");
        break;
      case 2:
        setEinesSelected(answer || {});
        break;
      case 3:
        setEstatsOportunitats(answer.estats || {});
        setPrioritatSelected(answer.prioritat || "");
        break;
      case 4:
        setQuantificacioSelected(answer || {});
        break;
      case 5:
        setTextLliure(answer.text || "");
        break;
    }
  };

  const getCurrentAnswer = (): any => {
    switch (currentQuestion) {
      case 1:
        return { mida: midaSelected, volum: parseInt(volumValue) || 0 };
      case 2:
        return einesSelected;
      case 3:
        // 🆕 Completar estats amb no_aplica abans de retornar
        const q3 = question as QuestionP3;
        const completedEstats = { ...estatsOportunitats };
        if (q3) {
          q3.oportunitats.forEach(op => {
            if (!completedEstats[op.id]) {
              completedEstats[op.id] = "no_aplica";
            }
          });
        }
        return { estats: completedEstats, prioritat: prioritatSelected };
      case 4:
        return quantificacioSelected;
      case 5:
        return { text: textLliure };
      default:
        return null;
    }
  };

  const validateAnswer = (): boolean => {
    switch (currentQuestion) {
      case 1:
        if (!midaSelected) {
          setError("Selecciona la mida del vostre equip");
          return false;
        }
        if (!volumValue || parseInt(volumValue) <= 0) {
          setError("Introdueix un volum mensual aproximat");
          return false;
        }
        return true;
      case 2:
        // Almenys un àmbit respost
        if (Object.keys(einesSelected).length === 0) {
          setError("Selecciona almenys una eina");
          return false;
        }
        return true;
      case 3:
        // 🆕 Si no marca alguna oportunitat, assumim no_aplica
        const q3 = question as QuestionP3;
        if (q3) {
          const completedEstats = { ...estatsOportunitats };
          q3.oportunitats.forEach(op => {
            if (!completedEstats[op.id]) {
              completedEstats[op.id] = "no_aplica";
            }
          });
          // Actualitzar estat amb els valors completats
          setEstatsOportunitats(completedEstats);
        }
        // Prioritat és opcional - sempre vàlid
        return true;
      case 4:
        // 🆕 Si no hi ha oportunitats (cas edge), és vàlid
        const q4 = question as QuestionP4;
        if (!q4 || q4.oportunitats.length === 0) {
          return true;
        }
        // Tots els temps han d'estar marcats
        if (Object.keys(quantificacioSelected).length < q4.oportunitats.length) {
          setError("Indica el temps per a cada oportunitat");
          return false;
        }
        return true;
      case 5:
        // Opcional, sempre vàlid
        return true;
      default:
        return true;
    }
  };

  const saveAnswer = async () => {
    if (!validateAnswer()) return;
    if (!question) return;

    setIsSaving(true);
    setError(null);

    try {
      const answer = getCurrentAnswer();
      const answerString = JSON.stringify(answer);
      
      await saveAnswerAPI(auditId, currentQuestion, question, answerString);
      
      setSavedAnswers(prev => ({ ...prev, [currentQuestion]: answer }));

      if (currentQuestion === TOTAL_QUESTIONS) {
        router.push(`/audit/${auditId}/email`);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error guardant resposta");
    } finally {
      setIsSaving(false);
    }
  };

  const goBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // 🆕 Loading text segons pregunta
  const getLoadingText = () => {
    switch (currentQuestion) {
      case 1: return "Analitzant el vostre negoci...";
      case 2: return "Preparant eines...";
      case 3: return "Personalitzant oportunitats...";
      case 4: return "Generant quantificació...";
      case 5: return "Preparant...";
      default: return "Carregant...";
    }
  };

  // Loading inicial
  if (isLoading && !question) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background gap-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-xl animate-pulse" />
          <Loader2 className="relative h-12 w-12 animate-spin text-primary-400" />
        </div>
        <p className="text-muted-foreground animate-pulse">{getLoadingText()}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-primary-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-16 items-center justify-between px-6">
          <Logo size="sm" variant="image" />
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {questionLabels[currentQuestion]}
            </span>
            <span className="text-sm font-medium text-primary-400">
              {currentQuestion}/{TOTAL_QUESTIONS}
            </span>
          </div>
        </nav>
      </header>

      {/* Progress bar */}
      <div className="fixed top-16 left-0 right-0 z-40 h-1 bg-slate-800">
        <div 
          className="h-full bg-gradient-to-r from-primary-600 to-primary-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-2xl px-6 pt-24 pb-12">
        <Card className="glass-card border-2 border-primary-500/20">
          <CardContent className="p-8">
            
            {/* Error */}
            {error && (
              <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            {/* Question Content */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary-400" />
              </div>
            ) : question?.type === 'p1_wow_mida_volum' ? (
              <RenderP1 
                question={question as QuestionP1}
                midaSelected={midaSelected}
                setMidaSelected={setMidaSelected}
                volumValue={volumValue}
                setVolumValue={setVolumValue}
                setError={setError}
              />
            ) : question?.type === 'p2_eines' ? (
              <RenderP2
                question={question as QuestionP2}
                einesSelected={einesSelected}
                setEinesSelected={setEinesSelected}
                setError={setError}
              />
            ) : question?.type === 'p3_oportunitats' ? (
              <RenderP3
                question={question as QuestionP3}
                estatsOportunitats={estatsOportunitats}
                setEstatsOportunitats={setEstatsOportunitats}
                prioritatSelected={prioritatSelected}
                setPrioritatSelected={setPrioritatSelected}
                setError={setError}
              />
            ) : question?.type === 'p4_quantificacio' ? (
              <RenderP4
                question={question as QuestionP4}
                quantificacioSelected={quantificacioSelected}
                setQuantificacioSelected={setQuantificacioSelected}
                setError={setError}
              />
            ) : question?.type === 'p5_text_lliure' ? (
              <RenderP5
                question={question as QuestionP5}
                textLliure={textLliure}
                setTextLliure={setTextLliure}
              />
            ) : null}

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4 pt-6 mt-6 border-t border-slate-800">
              <Button
                variant="ghost"
                onClick={goBack}
                disabled={currentQuestion === 1 || isSaving || isLoading}
                className="gap-2 text-slate-400 hover:text-slate-200"
              >
                <ArrowLeft className="h-4 w-4" />
                Enrere
              </Button>

              <Button
                onClick={saveAnswer}
                disabled={isSaving || isLoading}
                size="lg"
                className="gap-2 bg-primary-600 hover:bg-primary-500 text-white px-6"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Guardant...
                  </>
                ) : currentQuestion === TOTAL_QUESTIONS ? (
                  <>
                    Finalitzar
                    <Sparkles className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Següent
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ============================================================
// RENDER P1: WOW + Mida + Volum
// ============================================================
function RenderP1({ 
  question, 
  midaSelected, 
  setMidaSelected, 
  volumValue, 
  setVolumValue,
  setError 
}: {
  question: QuestionP1;
  midaSelected: string;
  setMidaSelected: (v: string) => void;
  volumValue: string;
  setVolumValue: (v: string) => void;
  setError: (e: string | null) => void;
}) {
  return (
    <div className="space-y-6">
      {/* WOW Text */}
      {question.wow_text && (
        <div className="p-4 rounded-lg bg-primary-500/10 border border-primary-500/20">
          <p className="text-slate-200 leading-relaxed">
            {question.wow_text}
          </p>
        </div>
      )}

      {/* Mida empresa */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          {question.mida.label}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {question.mida.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => { setMidaSelected(opt.id); setError(null); }}
              className={`px-4 py-3 rounded-lg border text-sm transition-all ${
                midaSelected === opt.id
                  ? "border-primary-500 bg-primary-500/20 text-primary-300"
                  : "border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Volum mensual */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          {question.volum.label}
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={volumValue}
            onChange={(e) => { setVolumValue(e.target.value); setError(null); }}
            placeholder={question.volum.placeholder}
            min={question.volum.min}
            max={question.volum.max}
            className="flex-1 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
          <span className="text-slate-400 text-sm">al mes</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// RENDER P2: Eines per àmbit
// ============================================================
function RenderP2({
  question,
  einesSelected,
  setEinesSelected,
  setError
}: {
  question: QuestionP2;
  einesSelected: Record<string, string | string[]>;
  setEinesSelected: (v: Record<string, string | string[]>) => void;
  setError: (e: string | null) => void;
}) {
  const handleSelect = (ambitId: string, optionId: string, multiSelect: boolean) => {
    setError(null);
    
    if (multiSelect) {
      const current = (einesSelected[ambitId] as string[]) || [];
      const updated = current.includes(optionId)
        ? current.filter(x => x !== optionId)
        : [...current, optionId];
      setEinesSelected({ ...einesSelected, [ambitId]: updated });
    } else {
      setEinesSelected({ ...einesSelected, [ambitId]: optionId });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-200 mb-2">{question.title}</h2>
        <p className="text-sm text-muted-foreground">{question.subtitle}</p>
      </div>

      {question.ambits.map((ambit) => (
        <div key={ambit.id} className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <span>{ambit.icona}</span>
            <span>{ambit.nom}</span>
            {ambit.multi_select && (
              <span className="text-xs text-slate-500">(pots seleccionar vàries)</span>
            )}
          </label>
          
          <div className="flex flex-wrap gap-2">
            {ambit.options.map((opt) => {
              const isSelected = ambit.multi_select
                ? ((einesSelected[ambit.id] as string[]) || []).includes(opt.id)
                : einesSelected[ambit.id] === opt.id;
              
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(ambit.id, opt.id, ambit.multi_select)}
                  className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                    isSelected
                      ? "border-primary-500 bg-primary-500/20 text-primary-300"
                      : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                  }`}
                >
                  {ambit.multi_select && isSelected && (
                    <CheckCircle2 className="inline h-3 w-3 mr-1" />
                  )}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// RENDER P3: Oportunitats + Estats + Prioritat
// ============================================================

// 🆕 Labels curts per als botons
const estatLabelsShort: Record<string, string> = {
  resolt: "Resolt",
  manual: "Manual", 
  no_fem: "Pendent",
  no_aplica: "N/A"
};

function RenderP3({
  question,
  estatsOportunitats,
  setEstatsOportunitats,
  prioritatSelected,
  setPrioritatSelected,
  setError
}: {
  question: QuestionP3;
  estatsOportunitats: Record<string, string>;
  setEstatsOportunitats: (v: Record<string, string>) => void;
  prioritatSelected: string;
  setPrioritatSelected: (v: string) => void;
  setError: (e: string | null) => void;
}) {
  const handleEstatChange = (opId: string, estatId: string) => {
    setError(null);
    setEstatsOportunitats({ ...estatsOportunitats, [opId]: estatId });
  };

  // Oportunitats que són manual o no_fem (per dropdown prioritat)
  const oportuniatsPerPrioritat = question.oportunitats.filter(op => {
    const estat = estatsOportunitats[op.id];
    return estat === 'manual' || estat === 'no_fem';
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-200 mb-2">{question.title}</h2>
        <p className="text-sm text-muted-foreground">{question.subtitle}</p>
      </div>

      {/* Llegenda estats */}
      <div className="flex flex-wrap gap-4 text-xs text-slate-400 pb-2 border-b border-slate-800">
        {question.estats.map(e => (
          <span key={e.id} className="flex items-center gap-1">
            <span>{e.icona}</span>
            <span>{e.label}</span>
          </span>
        ))}
      </div>

      {/* Llista oportunitats */}
      <div className="space-y-4">
        {question.oportunitats.map((op) => (
          <div 
            key={op.id} 
            className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30"
          >
            <p className="text-slate-200 mb-3 leading-relaxed">
              <span className="text-primary-400 font-medium mr-2">{op.index}.</span>
              {op.text}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {question.estats.map((estat) => {
                const isSelected = estatsOportunitats[op.id] === estat.id;
                return (
                  <button
                    key={estat.id}
                    onClick={() => handleEstatChange(op.id, estat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                      isSelected
                        ? "border-primary-500 bg-primary-500/20 text-primary-300"
                        : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <span>{estat.icona}</span>
                    <span>{estatLabelsShort[estat.id] || estat.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Prioritat dropdown - ara opcional */}
      {oportuniatsPerPrioritat.length > 0 && (
        <div className="pt-4 border-t border-slate-800">
          <label className="block text-sm font-medium text-slate-300 mb-3">
            {question.prioritat.label} <span className="text-slate-500 font-normal">(opcional)</span>
          </label>
          <select
            value={prioritatSelected}
            onChange={(e) => setPrioritatSelected(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-200 focus:border-primary-500 focus:outline-none"
          >
            <option value="">{question.prioritat.placeholder}</option>
            {oportuniatsPerPrioritat.map((op) => (
              <option key={op.id} value={op.id}>
                {op.index}. {op.text.slice(0, 60)}...
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

// ============================================================
// RENDER P4: Quantificació
// ============================================================

// 🆕 Labels curts per als temps
const tempsLabelsShort: Record<string, string> = {
  menys_5: "< 5 h/set.",
  "5_10": "5-10 h/set.",
  "10_20": "10-20 h/set.",
  mes_20: "> 20 h/set.",
  no_se: "No ho sé"
};

function RenderP4({
  question,
  quantificacioSelected,
  setQuantificacioSelected,
  setError
}: {
  question: QuestionP4;
  quantificacioSelected: Record<string, string>;
  setQuantificacioSelected: (v: Record<string, string>) => void;
  setError: (e: string | null) => void;
}) {
  const handleSelect = (opId: string, tempsId: string) => {
    setError(null);
    setQuantificacioSelected({ ...quantificacioSelected, [opId]: tempsId });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-200 mb-2">{question.title}</h2>
        <p className="text-sm text-muted-foreground">{question.subtitle}</p>
      </div>

      <div className="space-y-4">
        {question.oportunitats.map((op) => (
          <div 
            key={op.id}
            className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30"
          >
            <p className="text-slate-300 text-sm mb-3 leading-relaxed">
              {op.text}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {question.opcions_temps.map((temps) => {
                const isSelected = quantificacioSelected[op.id] === temps.id;
                return (
                  <button
                    key={temps.id}
                    onClick={() => handleSelect(op.id, temps.id)}
                    className={`px-3 py-2 rounded-lg border text-xs transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                        : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    {tempsLabelsShort[temps.id] || temps.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center pt-2">
        💡 Si no ho saps segur, selecciona l'opció que et sembli més propera
      </p>
    </div>
  );
}

// ============================================================
// RENDER P5: Text lliure
// ============================================================
function RenderP5({
  question,
  textLliure,
  setTextLliure
}: {
  question: QuestionP5;
  textLliure: string;
  setTextLliure: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-200 mb-2">{question.title}</h2>
        <p className="text-sm text-muted-foreground">{question.subtitle}</p>
      </div>

      <textarea
        value={textLliure}
        onChange={(e) => setTextLliure(e.target.value)}
        placeholder={question.input.placeholder}
        maxLength={question.input.maxLength}
        className="min-h-[140px] w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none"
      />

      <p className="text-xs text-muted-foreground text-center">
        💡 Aquesta pregunta és opcional - pots deixar-la en blanc si no se t'acut res més
      </p>
    </div>
  );
}
