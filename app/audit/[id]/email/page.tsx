"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle2, 
  Mail, 
  Lock, 
  Loader2,
  ArrowRight,
  User,
  Briefcase
} from "lucide-react";
import { generateAudit, ContactData } from "@/lib/api";

export default function EmailPage() {
  const params = useParams();
  const router = useRouter();
  const auditId = params.id as string;

  // Form state
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [carrec, setCarrec] = useState("");
  const [consentPrivacitat, setConsentPrivacitat] = useState(false);
  const [consentComercial, setConsentComercial] = useState(true);  // Marcat per defecte
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validació email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Si us plau, introdueix un email vàlid");
      return;
    }

    // Validació nom
    if (!nom.trim()) {
      setError("Si us plau, introdueix el teu nom");
      return;
    }

    // Validació consentiment obligatori
    if (!consentPrivacitat) {
      setError("Has d'acceptar la política de privacitat per continuar");
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar contactData
      const contactData: ContactData = {
        email,
        telefon: null,
        preferencia_contacte: "email",  // Per defecte, encara no han triat
        consentiments: {
          privacitat: consentPrivacitat,
          comercial: consentComercial,
          timestamp: new Date().toISOString()
        },
        // 🆕 v6.2: Nom i càrrec
        nom: nom.trim(),
        carrec: carrec.trim() || undefined
      };
      
      const data = await generateAudit(auditId, undefined, contactData);

      if (data.success) {
        router.push(`/audit/${auditId}/complete`);
      } else {
        throw new Error(data.error || "Error generant auditoria");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconegut");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-emerald-500/[0.07] blur-3xl" />
      </div>

      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-6xl items-center px-6">
          <Logo size="md" variant="image" />
        </nav>
      </header>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-md px-6 pt-32 pb-20">
        
        {/* Card Principal */}
        <Card className="border-2 border-emerald-500/20 bg-slate-900/60 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-50">
              🎉 L&apos;auditoria està llesta!
            </CardTitle>
            <p className="mt-3 text-slate-400">
              On t&apos;enviem l&apos;informe?
            </p>
          </CardHeader>

          <CardContent className="space-y-5 pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Nom */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Nom *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <Input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="El teu nom"
                    className="pl-12 h-12 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@empresa.cat"
                    className="pl-12 h-12 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Càrrec (opcional) */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Càrrec <span className="text-slate-500">(opcional)</span>
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <Input
                    type="text"
                    value={carrec}
                    onChange={(e) => setCarrec(e.target.value)}
                    placeholder="Gerent, CEO, Administració..."
                    className="pl-12 h-12 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-500"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Consentiment Privacitat (obligatori) */}
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-slate-700 bg-slate-800/30 p-4 transition-all hover:border-emerald-500/50">
                <input
                  type="checkbox"
                  checked={consentPrivacitat}
                  onChange={(e) => setConsentPrivacitat(e.target.checked)}
                  className="mt-0.5 h-5 w-5 rounded border-slate-600 text-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0 bg-slate-800"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-slate-300">
                  Accepto la{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    className="text-emerald-400 underline hover:text-emerald-300"
                  >
                    política de privacitat
                  </a>{" "}
                  *
                </span>
              </label>

              {/* Consentiment Comercial (opcional, marcat per defecte) */}
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-slate-700 bg-slate-800/30 p-4 transition-all hover:border-emerald-500/50">
                <input
                  type="checkbox"
                  checked={consentComercial}
                  onChange={(e) => setConsentComercial(e.target.checked)}
                  className="mt-0.5 h-5 w-5 rounded border-slate-600 text-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0 bg-slate-800"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-slate-300">
                  Vull rebre informació sobre novetats i ofertes
                </span>
              </label>

              {/* Error Message */}
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 gap-2 text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Preparant informe...
                  </>
                ) : (
                  <>
                    Veure l&apos;informe
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Nota privacitat */}
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Lock className="h-4 w-4" />
              <span>100% confidencial</span>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
