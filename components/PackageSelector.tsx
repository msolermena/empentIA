"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PackageOption {
  id: string;
  name: string;
  icon: string;
  automations: number | string;
  suite: string;
  ideal_for: string;
}

interface PackageSelectorProps {
  options: PackageOption[];
}

export function PackageSelector({ options }: PackageSelectorProps) {
  if (!options || options.length === 0) return null;
  
  return (
    <Card className="glass-card border-2 border-emerald-500/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-center text-slate-200">
          Quin és el teu ritme?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((pkg, index) => (
            <div 
              key={pkg.id}
              className={`
                p-5 rounded-xl border transition-all cursor-default
                ${index === 1 
                  ? 'border-emerald-500/40 bg-emerald-500/5 ring-1 ring-emerald-500/20' 
                  : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50'
                }
              `}
            >
              {/* Badge "Recomanat" per l'opció del mig */}
              {index === 1 && (
                <div className="text-center mb-2">
                  <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-400">
                    Més popular
                  </span>
                </div>
              )}
              
              {/* Icon + Name */}
              <div className="text-center mb-4">
                <span className="text-4xl block mb-2">{pkg.icon}</span>
                <h4 className="text-lg font-semibold text-slate-200">
                  {pkg.name}
                </h4>
              </div>
              
              {/* Details */}
              <div className="space-y-3 text-center">
                <div className="p-2 rounded-lg bg-slate-900/50">
                  <p className="text-emerald-400 font-semibold">
                    {typeof pkg.automations === 'number' 
                      ? `${pkg.automations} automatització${pkg.automations > 1 ? 'ns' : ''}`
                      : `${pkg.automations} automatitzacions`
                    }
                  </p>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  + {pkg.suite}
                </p>
                
                <div className="pt-2 border-t border-slate-700/50">
                  <p className="text-xs text-slate-400">
                    <span className="text-slate-500">Ideal per:</span>
                    <br />
                    {pkg.ideal_for}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center text-sm text-muted-foreground mt-6">
          Parlem i t&apos;ajudem a triar el que et convé
        </p>
      </CardContent>
    </Card>
  );
}

export type { PackageOption };
