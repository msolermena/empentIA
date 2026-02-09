"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { updateValidationTestEmail } from "@/lib/api";
import { 
  CheckCircle2,
  Mail,
  ExternalLink,
  Rocket
} from "lucide-react";

export default function ThanksPage() {
  const [email, setEmail] = useState("");
  const [wantsUpdates, setWantsUpdates] = useState(false);
  const [wantsPilot, setWantsPilot] = useState(false);
  const [acceptsPrivacy, setAcceptsPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testId, setTestId] = useState<string | null>(null);

  // Recuperar test_id de sessionStorage
  useEffect(() => {
    const storedTestId = sessionStorage.getItem("validationTestId");
    if (storedTestId) {
      setTestId(storedTestId);
    }
  }, []);

  const showEmailForm = wantsUpdates || wantsPilot;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Si us plau, introdueix el teu email");
      return;
    }

    if (!acceptsPrivacy) {
      setError("Has d'acceptar la política de privacitat");
      return;
    }

    if (!testId) {
      setError("Error: no s'ha trobat el test. Refresca la pàgina.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await updateValidationTestEmail({
        test_id: testId,
        email,
        wants_updates: wantsUpdates,
        wants_pilot: wantsPilot,
      });
      
      setSubmitted(true);
      
      // Netejar sessionStorage
      sessionStorage.removeItem("validationTestId");
      sessionStorage.removeItem("testValidation");
      
    } catch (err) {
      setError("Error guardant les dades. Torna-ho a provar.");
      console.error("Error:", err);
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

          {/* Card amb opcions */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm text-left">
            {submitted ? (
              <div className="py-4 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                  <Mail className="h-6 w-6 text-emerald-400" />
                </div>
                <p className="text-emerald-400 font-medium">
                  {wantsPilot ? "T'avisarem per la prova pilot! 🚀" : "T'avisarem quan llancem! 🚀"}
                </p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {/* Check novetats */}
                <button
                  type="button"
                  onClick={() => setWantsUpdates(!wantsUpdates)}
                  className="flex w-full items-start gap-3 text-left"
                >
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
                </button>

                {/* Check prova pilot */}
                <button
                  type="button"
                  onClick={() => setWantsPilot(!wantsPilot)}
                  className="flex w-full items-start gap-3 text-left"
                >
                  <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-colors ${
                    wantsPilot
                      ? "border-amber-500 bg-amber-500"
                      : "border-slate-600"
                  }`}>
                    {wantsPilot && (
                      <Rocket className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <span className={wantsPilot ? "text-slate-200" : "text-slate-400"}>
                    Estic interessat en participar en la prova pilot d'empentIA
                  </span>
                </button>

                {/* Camp email (només si algún check marcat) */}
                {showEmailForm && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="El teu email"
                        required
                        className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    {/* GDPR checkbox */}
                    <button
                      type="button"
                      onClick={() => setAcceptsPrivacy(!acceptsPrivacy)}
                      className="flex w-full items-start gap-3 text-left"
                    >
                      <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-colors ${
                        acceptsPrivacy
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-slate-600"
                      }`}>
                        {acceptsPrivacy && (
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm text-slate-400">
                        Accepto la{" "}
                        <a
                          href="/privacy"
                          target="_blank"
                          className="text-emerald-400 underline hover:text-emerald-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          política de privacitat
                        </a>
                      </span>
                    </button>

                    {/* Error */}
                    {error && (
                      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-400">
                        {error}
                      </div>
                    )}

                    {/* Botó submit */}
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Guardant..." : "Enviar"}
                    </Button>
                  </div>
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

        </div>
      </main>
    </div>
  );
}
