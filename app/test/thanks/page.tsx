"use client";

import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2,
  Heart,
  Mail,
  ExternalLink
} from "lucide-react";

export default function ThanksPage() {
  const [email, setEmail] = useState("");
  const [wantsUpdates, setWantsUpdates] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wantsUpdates || !email) return;
    
    setIsSubmitting(true);
    
    try {
      // TODO: Guardar email a Supabase o Brevo
      console.log("Email subscrit:", email);
      
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
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
        <nav className="mx-auto flex h-20 max-w-6xl items-center justify-center px-6">
          <Logo size="md" variant="image" />
        </nav>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg text-center">
          {/* Success icon */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/20">
            <CheckCircle2 className="h-12 w-12 text-emerald-400" />
          </div>

          {/* Títol */}
          <h1 className="mb-4 text-4xl font-bold text-slate-50">
            Gràcies! <span className="inline-block animate-bounce">🙌</span>
          </h1>

          {/* Missatge */}
          <p className="mb-8 text-lg text-slate-400">
            La teva opinió ens ajuda moltíssim a fer empentIA millor.
            <br />
            De veritat, moltes gràcies pel teu temps.
          </p>

          {/* Card email */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
            {submitted ? (
              <div className="py-4">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                  <Mail className="h-6 w-6 text-emerald-400" />
                </div>
                <p className="text-emerald-400">T'avisarem quan llancemos! 🚀</p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {/* Checkbox */}
                <label className="flex cursor-pointer items-start gap-3 text-left">
                  <input
                    type="checkbox"
                    checked={wantsUpdates}
                    onChange={(e) => setWantsUpdates(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-colors ${
                    wantsUpdates
                      ? "border-emerald-500 bg-emerald-500"
                      : "border-slate-600"
                  }`}>
                    {wantsUpdates && (
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <span className={wantsUpdates ? "text-slate-200" : "text-slate-400"}>
                    Vull estar informat de les novetats d'empentIA
                  </span>
                </label>

                {/* Camp email (només si checkbox marcat) */}
                {wantsUpdates && (
                  <div className="fade-in-up">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="El teu email"
                      required
                      className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                )}

                {/* Botó submit */}
                {wantsUpdates && email && (
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Guardant..." : "Subscriu-me"}
                  </Button>
                )}
              </form>
            )}
          </div>

          {/* Enllaç a la landing */}
          <div className="mt-8">
            <a 
              href="https://empentia.cat"
              className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-400"
            >
              Tornar a empentia.cat
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* Footer amb cor */}
          <div className="mt-12 flex items-center justify-center gap-2 text-sm text-slate-600">
            <span>Fet amb</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>a Catalunya</span>
          </div>
        </div>
      </main>
    </div>
  );
}
