"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { getNextQuestion, saveAnswer as saveAnswerAPI, type Question } from "@/lib/api";

export default function QuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const auditId = params.id as string;
  const topRef = useRef<HTMLDivElement>(null);

  const [displayedQuestion, setDisplayedQuestion] = useState(1); // Per mostrar a la UI
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");
  const [multipleAnswers, setMultipleAnswers] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ v2.0: 6 preguntes
  const totalQuestions = 6;
  const progress = (displayedQuestion / totalQuestions) * 100;

  // Question type labels for UX
  const questionLabels: Record<number, string> = {
    1: "Validació",
    2: "Reptes actuals",
    3: "Eines",
    4: "Detall",
    5: "Detall",
    6: "Obertura",
  };

  useEffect(() => {
    loadQuestion(currentQuestion);
  }, [currentQuestion]);

  const loadQuestion = async (questionNumber: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getNextQuestion(auditId, questionNumber);
      setQuestion(data);
      
      // ✅ FIX 1: Actualitzar el número mostrat NOMÉS quan la pregunta s'ha carregat
      setDisplayedQuestion(questionNumber);
      
      // ✅ FIX 2: Scroll a dalt de la pàgina quan es carrega nova pregunta
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Recuperar resposta anterior si existeix
      if (answers[questionNumber]) {
        const savedAnswer = answers[questionNumber];

        if (data.type === "checkbox" && Array.isArray(savedAnswer)) {
          setMultipleAnswers(savedAnswer);
          setAnswer("");
        } else {
          setAnswer(savedAnswer);
          setMultipleAnswers([]);
        }
      } else {
        setAnswer("");
        setMultipleAnswers([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconegut");
    } finally {
      setIsLoading(false);
    }
  };

  const saveAnswer = async () => {
    const currentAnswer = question?.type === "checkbox" ? multipleAnswers : answer;

    // Validació segons tipus
    if (question?.type === "checkbox") {
      if (multipleAnswers.length === 0) {
        setError("Si us plau, selecciona almenys una opció");
        return;
      }
    } else if (question?.type === "textarea") {
      // Textarea és opcional (P6)
      // No validar si està buit
    } else {
      if (!answer.trim()) {
        setError("Si us plau, respon la pregunta abans de continuar");
        return;
      }
    }

    if (!question) {
      setError("Error: pregunta no carregada");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const answerToSave =
        question.type === "checkbox"
          ? multipleAnswers.join(", ")
          : answer;

      await saveAnswerAPI(auditId, currentQuestion, question, answerToSave);

      setAnswers({ ...answers, [currentQuestion]: currentAnswer });

      if (currentQuestion === totalQuestions) {
        router.push(`/audit/${auditId}/email`);
      } else {
        // ✅ FIX 1: NO actualitzem displayedQuestion aquí, només currentQuestion
        // El displayedQuestion s'actualitzarà quan loadQuestion acabi
        setCurrentQuestion(currentQuestion + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error guardant resposta");
      setIsSaving(false); // Només aquí si hi ha error
    }
    // ✅ FIX 1: NO fem setIsSaving(false) aquí - es farà quan loadQuestion acabi
  };

  const goBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (checked) {
      setMultipleAnswers([...multipleAnswers, option]);
    } else {
      setMultipleAnswers(multipleAnswers.filter((a) => a !== option));
    }
    setError(null);
  };

  // ✅ FIX 1: Quan acaba de carregar, treure estat saving
  useEffect(() => {
    if (!isLoading && question) {
      setIsSaving(false);
    }
  }, [isLoading, question]);

  if (isLoading && !question) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background gap-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-xl animate-pulse" />
          <Loader2 className="relative h-12 w-12 animate-spin text-primary-400" />
        </div>
        <p className="text-muted-foreground animate-pulse">Preparant pregunta...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" ref={topRef}>
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-primary-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-16 items-center justify-between px-6">
          <Logo size="sm" variant="image" />
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              {questionLabels[displayedQuestion]}
            </span>
            <div className="h-4 w-px bg-slate-700" />
            <span className="text-sm font-medium text-slate-300">
              {displayedQuestion}/{totalQuestions}
            </span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-2xl px-6 pt-28 pb-16">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {/* Step indicators */}
            <div className="flex gap-1.5">
              {Array.from({ length: totalQuestions }, (_, i) => (
                <div
                  key={i}
                  className={`h-2 w-8 rounded-full transition-all duration-300 ${
                    i + 1 < displayedQuestion
                      ? "bg-emerald-500"
                      : i + 1 === displayedQuestion
                      ? "bg-primary-500"
                      : "bg-slate-700"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-emerald-400 font-medium">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl md:text-2xl leading-relaxed text-slate-100">
              {isLoading ? "Carregant..." : question?.question_text}
            </CardTitle>
            {question?.help_text && !isLoading && (
              <p className="text-sm text-muted-foreground mt-2">
                {question.help_text}
              </p>
            )}
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Loading overlay */}
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary-400" />
              </div>
            )}

            {/* CHECKBOX - Múltiples respostes */}
            {!isLoading && question?.type === "checkbox" && question.options ? (
              <div className="space-y-2.5">
                {question.options.map((option, index) => {
                  const isChecked = multipleAnswers.includes(option);
                  const isNoneOption =
                    option.toLowerCase().includes("cap de les anteriors") ||
                    option.toLowerCase().includes("cap d'") ||
                    option.toLowerCase().includes("altres");

                  return (
                    <label
                      key={index}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all duration-200 ${
                        isChecked
                          ? "border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/10"
                          : "border-slate-700/50 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50"
                      } ${isNoneOption ? "opacity-70" : ""}`}
                    >
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all ${
                          isChecked
                            ? "border-primary-500 bg-primary-500"
                            : "border-slate-600"
                        }`}
                      >
                        {isChecked && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                        )}
                      </div>
                      <span
                        className={`flex-1 ${
                          isNoneOption ? "text-slate-400 italic" : "text-slate-200"
                        }`}
                      >
                        {option}
                      </span>
                    </label>
                  );
                })}
                <p className="text-xs text-muted-foreground pt-2">
                  Pots seleccionar múltiples opcions
                </p>
              </div>
            ) : !isLoading && question?.type === "radio" && question.options ? (
              /* RADIO - Una sola resposta */
              <div className="space-y-2.5">
                {question.options.map((option, index) => {
                  const isSelected = answer === option;
                  return (
                    <label
                      key={index}
                      onClick={() => {
                        setAnswer(option);
                        setError(null);
                      }}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all duration-200 ${
                        isSelected
                          ? "border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/10"
                          : "border-slate-700/50 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50"
                      }`}
                    >
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                          isSelected
                            ? "border-primary-500 bg-primary-500"
                            : "border-slate-600"
                        }`}
                      >
                        {isSelected && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="flex-1 text-slate-200">{option}</span>
                    </label>
                  );
                })}
              </div>
            ) : !isLoading && question?.type === "textarea" ? (
              /* TEXTAREA - Text lliure (P6) */
              <div className="space-y-3">
                <textarea
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    setError(null);
                  }}
                  className="min-h-[140px] w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none transition-all"
                  placeholder="Escriu aquí... (opcional)"
                />
                <p className="text-xs text-muted-foreground">
                  Opcional - qualsevol detall ens ajuda a personalitzar les recomanacions
                </p>
              </div>
            ) : !isLoading && (
              /* TEXT - Input simple */
              <input
                type="text"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setError(null);
                }}
                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                placeholder="Escriu la teva resposta..."
              />
            )}

            {/* Error Message */}
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <Button
                variant="ghost"
                onClick={goBack}
                disabled={displayedQuestion === 1 || isSaving || isLoading}
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
                {isSaving || isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isSaving ? "Guardant..." : "Carregant..."}
                  </>
                ) : displayedQuestion === totalQuestions ? (
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

        {/* Question context hint */}
        {currentQuestion <= 3 && (
          <p className="text-center text-xs text-muted-foreground mt-6">
            💡 Aquestes preguntes ens ajuden a identificar les millors solucions pel teu cas
          </p>
        )}
        {currentQuestion >= 4 && currentQuestion <= 5 && (
          <p className="text-center text-xs text-muted-foreground mt-6">
            💡 Quantifiquem l'impacte per calcular el ROI de cada solució
          </p>
        )}
        {currentQuestion === 6 && (
          <p className="text-center text-xs text-muted-foreground mt-6">
            💡 Última pregunta - qualsevol comentari és benvingut
          </p>
        )}
      </div>
    </div>
  );
}
