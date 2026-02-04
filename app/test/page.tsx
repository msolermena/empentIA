"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Clock,
  Eye,
  FileSearch,
  ClipboardList,
  Users
} from "lucide-react";

export default function TestIntroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    hasBusiness: ""
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.hasBusiness) {
      setError("Si us plau, selecciona una opció");
      return;
    }

    // Guardar dades a sessionStorage per recuperar-les després
    sessionStorage.setItem("testValidation", JSON.stringify({
      ...formData,
      startedAt: new Date().toISOString()
    }));

    // Redirigir a la landing amb paràmetre source=test
    router.push("/?source=test");
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[400px] -right-[400px] h-[800px] w-[800px] rounded-full bg-emerald-500/[0.07] blur-3xl" />
        <div className="absolute -bottom-[400px] -left-[400px] h-[800px] w-[800px] rounded-full bg-emerald-500/[0.05] blur-3xl" />
      </div>

      {/* Header simple */}
      <header className="relative z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-6xl items-center justify-center px-6">
          <Logo size="md" variant="image" />
        </nav>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Card principal */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-sm md:p-12">
            
            {/* Icona i títol */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
                <Users className="h-8 w-8 text-emerald-400" />
              </div>
              <h1 className="mb-3 text-3xl font-bold text-slate-50 md:text-4xl">
                Ajuda'ns a millorar empentIA
              </h1>
              <p className="text-lg text-slate-400">
                La teva opinió sincera ens ajudarà a crear un servei millor
              </p>
            </div>

            {/* Què et demanem */}
            <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Què et demanem?
              </h2>
              <div className="space-y-3">
                {[
                  { icon: Eye, text: "Llegir la web (és curta)", time: "2-3 min" },
                  { icon: FileSearch, text: "Fer una auditoria de prova", time: "5-7 min" },
                  { icon: ClipboardList, text: "Respondre una enquesta ràpida", time: "3-4 min" },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800">
                      <step.icon className="h-4 w-4 text-emerald-400" />
                    </div>
                    <span className="flex-1 text-slate-300">{step.text}</span>
                    <span className="text-sm text-slate-500">{step.time}</span>
                  </div>
                ))}
              </div>
              
              {/* Temps total */}
              <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 py-3 text-emerald-400">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">Temps total estimat: 10-15 minuts</span>
              </div>
            </div>

            {/* Nota sobre l'auditoria */}
            <p className="mb-8 text-center text-sm text-slate-500">
              Si tens un negoci amb web, fes l'auditoria amb la teva. 
              Si no, pots fer servir qualsevol web d'un negoci que coneguis una mica.
            </p>

            {/* Formulari */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nom (opcional) */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Nom <span className="text-slate-500">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none"
                  placeholder="El teu nom"
                />
              </div>

              {/* Càrrec/Rol (opcional) */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Càrrec / Rol <span className="text-slate-500">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-100 placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none"
                  placeholder="Ex: Gerent, Director, Propietari..."
                />
              </div>

              {/* Té negoci? (obligatori) */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Tens un negoci propi? *
                </label>
                <div className="space-y-2">
                  {[
                    { value: "yes_web", label: "Sí, amb web" },
                    { value: "yes_no_web", label: "Sí, sense web" },
                    { value: "no", label: "No, però conec bé algun sector" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, hasBusiness: option.value })}
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
                        formData.hasBusiness === option.value
                          ? "border-emerald-500 bg-emerald-500/10"
                          : "border-slate-700 hover:border-slate-600"
                      }`}
                    >
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                        formData.hasBusiness === option.value
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-slate-600"
                      }`}>
                        {formData.hasBusiness === option.value && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className={formData.hasBusiness === option.value ? "text-emerald-400" : "text-slate-300"}>
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Botó */}
              <Button type="submit" size="lg" className="w-full gap-2">
                Veure la web
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              <p className="text-center text-sm text-slate-500">
                Fes-hi un cop d'ull i després fes l'auditoria
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
