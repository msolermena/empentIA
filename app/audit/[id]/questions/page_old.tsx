"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { getNextQuestion, saveAnswer as saveAnswerAPI, type Question } from "@/lib/api";

export default function QuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const auditId = params.id as string;

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");
  const [multipleAnswers, setMultipleAnswers] = useState<string[]>([]); // MILLORA 2: Per checkbox
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalQuestions = 8; // v2.0: 8 preguntes consultives (màxim WOW factor)
  const progress = (currentQuestion / totalQuestions) * 100;

  // Carregar pregunta actual
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
        
        // MILLORA 2: Gestionar múltiples respostes per checkbox
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
    // MILLORA 2: Validar segons tipus de pregunta
    const currentAnswer = question?.type === "checkbox" ? multipleAnswers : answer;
    
    if (question?.type === "checkbox") {
      if (multipleAnswers.length === 0) {
        setError("Si us plau, selecciona almenys una opció");
        return;
      }
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

    setIsLoading(true);
    setError(null);

    try {
      // Guardar amb el format adequat (string o array)
      const answerToSave = question.type === "checkbox" 
        ? multipleAnswers.join(", ") // Backend espera string
        : answer;
      
      await saveAnswerAPI(auditId, currentQuestion, question, answerToSave);

      // Guardar resposta localment (format original per recuperar)
      setAnswers({ ...answers, [currentQuestion]: currentAnswer });

      // Si és l'última pregunta, redirigir a email
      if (currentQuestion === totalQuestions) {
        router.push(`/audit/${auditId}/email`);
      } else {
        // Següent pregunta
        setCurrentQuestion(currentQuestion + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error guardant resposta");
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // MILLORA 2: Gestionar canvis en checkboxes
  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (checked) {
      // Afegir opció
      setMultipleAnswers([...multipleAnswers, option]);
    } else {
      // Treure opció
      setMultipleAnswers(multipleAnswers.filter(a => a !== option));
    }
  };

  if (isLoading && !question) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-primary-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center justify-between px-8">
          <Logo size="md" variant="image" />
          <div className="text-sm text-muted-foreground">
            Pregunta {currentQuestion} de {totalQuestions}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto max-w-3xl px-8 pt-32 pb-16">
        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-200">
              Progrés: {Math.round(progress)}%
            </span>
            <span className="text-muted-foreground">
              {currentQuestion}/{totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="glass-card border-2 border-primary-500/20">
          <CardHeader>
            <CardTitle className="text-2xl">
              {question?.question_text || "Carregant..."}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Answer Input */}
            {/* MILLORA 2: Checkbox (múltiples respostes) */}
            {question?.type === "checkbox" && question.options ? (
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isChecked = multipleAnswers.includes(option);
                  const isNoneOption = option.toLowerCase().includes("cap de les anteriors") || 
                                       option.toLowerCase().includes("cap d'aquestes") ||
                                       option.toLowerCase().includes("altres");
                  
                  return (
                    <label
                      key={index}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-all ${
                        isChecked
                          ? "border-primary-500 bg-primary-500/10"
                          : "border-slate-700 bg-slate-800/30 hover:border-primary-500/50 hover:bg-slate-800/50"
                      } ${isNoneOption ? "border-slate-600" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                        className="mt-0.5 h-5 w-5 rounded border-slate-600 text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0"
                      />
                      <span className={`text-slate-200 ${isNoneOption ? "text-slate-400 italic" : ""}`}>
                        {option}
                      </span>
                    </label>
                  );
                })}
                <p className="text-sm text-muted-foreground">
                  💡 Pots seleccionar múltiples opcions
                </p>
              </div>
            ) : question?.type === "radio" && question.options ? (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-slate-700 bg-slate-800/30 p-4 transition-all hover:border-primary-500/50 hover:bg-slate-800/50"
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={answer === option}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="h-5 w-5 text-primary-500"
                    />
                    <span className="text-slate-200">{option}</span>
                  </label>
                ))}
              </div>
            ) : question?.type === "textarea" ? (
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="min-h-[150px] w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-5 py-3 text-slate-50 placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10"
                placeholder="Escriu la teva resposta aquí..."
              />
            ) : (
              <Input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Escriu la teva resposta..."
                className="text-base"
              />
            )}

            {/* Error Message */}
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4 pt-4">
              <Button
                variant="outline"
                onClick={goBack}
                disabled={currentQuestion === 1 || isLoading}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Enrere
              </Button>

              <Button
                onClick={saveAnswer}
                disabled={isLoading}
                size="lg"
                className="gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {currentQuestion === totalQuestions
                      ? "Generant..."
                      : "Guardant..."}
                  </>
                ) : (
                  <>
                    {currentQuestion === totalQuestions
                      ? "Finalitzar"
                      : "Següent"}
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
