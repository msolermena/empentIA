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
  Phone,
  MessageCircle,
  ArrowRight
} from "lucide-react";
import { generateAudit, ContactData } from "@/lib/api";

export default function EmailPage() {
  const params = useParams();
  const router = useRouter();
  const auditId = params.id as string;

  // Form state
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [preferenciaContacte, setPreferenciaContacte] = useState<"email" | "trucada" | "whatsapp">("email");
  const [consentPrivacitat, setConsentPrivacitat] = useState(false);
  const [consentComercial, setConsentComercial] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mostrar camp telèfon si preferència és trucada o whatsapp
  const mostrarTelefon = preferenciaContacte === "trucada" || preferenciaContacte === "whatsapp";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validació email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Si us plau, introdueix un email vàlid");
      return;
    }

    // Validació consentiment obligatori
    if (!consentPrivacitat) {
      setError("Has d'acceptar la política de privacitat per continuar");
      return;
    }

    // Validació telèfon si és necessari
    if (mostrarTelefon && !telefon.trim()) {
      setError("Si us plau, introdueix el teu telèfon per poder contactar-te");
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar contactData complet
      const contactData: ContactData = {
        email,
        telefon: mostrarTelefon ? telefon : null,
        preferencia_contacte: preferenciaContacte,
        consentiments: {
          privacitat: consentPrivacitat,
          comercial: consentComercial,
          timestamp: new Date().toISOString()
        }
      };

      // Generar auditoria amb contactData complet
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
      <div className="relative z-10 mx-auto max-w-xl px-6 pt-32 pb-20">
        
        {/* Card Principal */}
        <Card className="border-2 border-emerald-500/20 bg-slate-900/60 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-50 md:text-3xl">
              🎉 L&apos;auditoria està llesta!
            </CardTitle>
            <p className="mt-3 text-slate-400">
              On t&apos;enviem l&apos;informe?
            </p>
          </CardHeader>

          <CardContent className="space-y-5 pt-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              
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

              {/* Preferència de contacte */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Com prefereixes que et contactem?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "email" as const, icon: Mail, label: "Email" },
                    { value: "trucada" as const, icon: Phone, label: "Trucada" },
                    { value: "whatsapp" as const, icon: MessageCircle, label: "WhatsApp" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setPreferenciaContacte(option.value)}
                      disabled={isSubmitting}
                      className={`flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-3 text-sm font-medium transition-all ${
                        preferenciaContacte === option.value
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                          : "border-slate-700 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      <option.icon className="h-4 w-4" />
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Telèfon (condicional) */}
              {mostrarTelefon && (
                <div className="animate-in slide-in-from-top-2 duration-200">
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Telèfon *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <Input
                      type="tel"
                      value={telefon}
                      onChange={(e) => setTelefon(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="pl-12 h-12 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-500"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              )}

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
                  i el tractament de les meves dades per rebre l&apos;informe. *
                </span>
              </label>

              {/* Consentiment Comercial (opcional) */}
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-slate-700/50 bg-slate-800/20 p-4 transition-all hover:border-slate-600">
                <input
                  type="checkbox"
                  checked={consentComercial}
                  onChange={(e) => setConsentComercial(e.target.checked)}
                  className="mt-0.5 h-5 w-5 rounded border-slate-600 text-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0 bg-slate-800"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-slate-400">
                  Vull rebre informació sobre automatitzacions i ofertes (opcional)
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
