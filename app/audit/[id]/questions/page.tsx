"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Loader2, CheckCircle2, Sparkles } from "lucide-react";
import { getNextQuestion, saveAnswer as saveAnswerAPI, type Question } from "@/lib/api";

export default function QuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const auditId = params.id as string;

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");
  const [multipleAnswers, setMultipleAnswers] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // v2.0: 6 preguntes
  const totalQuestions = 6;
  const progress = (currentQuestion / totalQuestions) * 100;

  // Icones per cada pregunta
  const questionIcons = ["🏢", "🎯", "🔧", "📊", "📈", "💡"];

  useEffect(() => {
    loadQuestion(currentQuestion);
  }, [currentQuestion]);

  const loadQuestion = async (questionNumber: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getNextQuestion(auditId, questionNumber);
      setQuestion(data);

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

    // Validació per checkbox
    if (question?.type === "checkbox") {
      if (multipleAnswers.length === 0) {
        setError("Si us plau, selecciona almenys una opció");
        return;
      }
    } 
    // Validació per textarea (P6) - és opcional
    else if (question?.type === "textarea") {
      // Permet resposta buida per P6
    }
    // Validació per altres tipus
    else if (!answer.trim()) {
      setError("Si us plau, respon la pregunta abans de continuar");
      return;
    }

    if (!question) {
      setError("Error: pregunta no carregada");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const answerToSave = question.type === "checkbox"
        ? multipleAnswers.join(", ")
        : answer || "(sense resposta)";

      await saveAnswerAPI(auditId, currentQuestion, question, answerToSave);
      setAnswers({ ...answers, [currentQuestion]: currentAnswer });

      // Si és l'última pregunta, redirigir a email
      if (currentQuestion === totalQuestions) {
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

  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (checked) {
      setMultipleAnswers([...multipleAnswers, option]);
    } else {
      setMultipleAnswers(multipleAnswers.filter((a) => a !== option));
    }
    setError(null);
  };

  const handleRadioChange = (option: string) => {
    setAnswer(option);
    setError(null);
  };

  if (isLoading && !question) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/20 to-emerald-500/20 blur-xl animate-pulse" />
          <Loader2 className="relative h-16 w-16 animate-spin text-blue-400" />
        </div>
        <p className="mt-6 text-lg text-slate-400 animate-pulse">Preparant la següent pregunta...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <nav className="container mx-auto flex h-16 items-center justify-between px-6">
          <Logo size="sm" variant="image" />
          
          {/* Question indicators */}
          <div className="hidden md:flex items-center gap-2">
            {Array.from({ length: totalQuestions }, (_, i) => (
              <div
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
                  i + 1 < currentQuestion
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : i + 1 === currentQuestion
                    ? "bg-blue-500/20 text-blue-400 border-2 border-blue-500 scale-110"
                    : "bg-slate-800/50 text-slate-500 border border-slate-700"
                }`}
              >
                {i + 1 < currentQuestion ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  i + 1
                )}
              </div>
            ))}
          </div>

          <div className="text-sm font-medium text-slate-400">
            <span className="text-blue-400">{currentQuestion}</span> / {totalQuestions}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-2xl px-6 pt-28 pb-16">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-300 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-400" />
              Progrés de l'auditoria
            </span>
            <span className="text-emerald-400 font-semibold">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-800/50 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="relative overflow-hidden border-slate-800/50 bg-slate-900/50 backdrop-blur-sm shadow-2xl shadow-blue-500/5">
          {/* Gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500" />
          
          <CardHeader className="pb-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 text-2xl">
                {questionIcons[currentQuestion - 1]}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-blue-400 mb-2">
                  Pregunta {currentQuestion} de {totalQuestions}
                </p>
                <CardTitle className="text-xl leading-relaxed text-slate-100">
                  {question?.question_text || "Carregant..."}
                </CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Help text */}
            {question?.help_text && (
              <p className="text-sm text-slate-400 bg-slate-800/30 rounded-lg px-4 py-3 border border-slate-700/50">
                💡 {question.help_text}
              </p>
            )}

            {/* CHECKBOX - Múltiples respostes (P2, P3) */}
            {question?.type === "checkbox" && question.options ? (
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isChecked = multipleAnswers.includes(option);
                  const isNoneOption =
                    option.toLowerCase().includes("cap de les anteriors") ||
                    option.toLowerCase().includes("cap d'aquestes") ||
                    option.toLowerCase().includes("altres");

                  return (
                    <label
                      key={index}
                      className={`group flex cursor-pointer items-start gap-4 rounded-xl border-2 p-4 transition-all duration-200 ${
                        isChecked
                          ? "border-blue-500/50 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                          : "border-slate-700/50 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50"
                      } ${isNoneOption ? "opacity-70" : ""}`}
                    >
                      <div className={`flex h-6 w-6 items-center justify-center rounded-md border-2 transition-all ${
                        isChecked 
                          ? "border-blue-500 bg-blue-500" 
                          : "border-slate-600 group-hover:border-slate-500"
                      }`}>
                        {isChecked && (
                          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                        className="sr-only"
                      />
                      <span className={`flex-1 ${isNoneOption ? "text-slate-400 italic" : "text-slate-200"}`}>
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            ) : 
            
            /* RADIO - Una resposta (P1, P4, P5) */
            question?.type === "radio" && question.options ? (
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = answer === option;
                  
                  return (
                    <label
                      key={index}
                      className={`group flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200 ${
                        isSelected
                          ? "border-emerald-500/50 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
                          : "border-slate-700/50 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50"
                      }`}
                      onClick={() => handleRadioChange(option)}
                    >
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                        isSelected 
                          ? "border-emerald-500" 
                          : "border-slate-600 group-hover:border-slate-500"
                      }`}>
                        {isSelected && (
                          <div className="h-3 w-3 rounded-full bg-emerald-500" />
                        )}
                      </div>
                      <input
                        type="radio"
                        name="answer"
                        value={option}
                        checked={isSelected}
                        onChange={() => {}}
                        className="sr-only"
                      />
                      <span className="flex-1 text-slate-200">{option}</span>
                    </label>
                  );
                })}
              </div>
            ) : 
            
            /* TEXTAREA - Text lliure (P6) */
            question?.type === "textarea" ? (
              <div className="space-y-3">
                <textarea
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    setError(null);
                  }}
                  className="min-h-[150px] w-full rounded-xl border-2 border-slate-700/50 bg-slate-800/50 px-5 py-4 text-slate-100 placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                  placeholder="Escriu aquí la teva resposta... (opcional)"
                />
                <p className="text-xs text-slate-500 text-right">
                  Pots deixar-ho en blanc si no tens res a afegir
                </p>
              </div>
            ) : null}

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {error}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800/50">
              <Button
                variant="ghost"
                onClick={goBack}
                disabled={currentQuestion === 1 || isSaving}
                className="gap-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              >
                <ArrowLeft className="h-4 w-4" />
                Enrere
              </Button>

              <Button
                onClick={saveAnswer}
                disabled={isSaving}
                size="lg"
                className="gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {currentQuestion === totalQuestions ? "Finalitzant..." : "Guardant..."}
                  </>
                ) : (
                  <>
                    {currentQuestion === totalQuestions ? "Finalitzar" : "Següent"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Question type hint */}
        <div className="mt-6 text-center text-xs text-slate-500">
          {question?.type === "checkbox" && "Selecciona totes les opcions que apliquin"}
          {question?.type === "radio" && "Selecciona una opció"}
          {question?.type === "textarea" && "Resposta oberta (opcional)"}
        </div>
      </div>
    </div>
  );
}
