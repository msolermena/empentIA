"use client";

const approvedClaims = [
  "No és IA genèrica. Coneix els teus clients, les teves tarifes i com et comuniques.",
  "No és una eina més. És la que connecta totes les altres.",
  "Tu expliques el problema. Nosaltres el resolem. Tu ho controles.",
  "Avui automatitzes una tasca. En 6 mesos, el teu negoci treballa sol.",
];

const pendingClaims = [
  {
    label: "Claim #5:Cascada de resultats",
    options: [
      {
        id: "A",
        text: "Les factures arriben cobrades. Els leads, atesos. Els clients, contents. Sense que ningú ho hagi de recordar.",
      },
      {
        id: "B",
        text: "Cada dia, el teu negoci fa coses mentre tu fas altres coses.",
      },
    ],
  },
  {
    label: "Claim #6:Una sola plataforma",
    options: [
      {
        id: "A",
        text: "No és un altre SaaS. És el que connecta i recorda tot el que ja tens.",
      },
      {
        id: "B",
        text: "La diferència entre eines que fan coses i un sistema que coneix el teu negoci.",
      },
    ],
  },
];

export function ClaimsV2() {
  return (
    <section className="relative py-14 px-6 bg-slate-900/50">
      <div className="mx-auto max-w-5xl">
        {/* Label intern de preview */}
        <p className="mb-8 text-center text-sm font-medium text-slate-500">
          La veu d&apos;empentIA
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Bloc A:Claims aprovats */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-500">
              Claims tancats
            </h3>
            <div className="space-y-3">
              {approvedClaims.map((claim, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-emerald-700/30 bg-slate-800 p-4"
                >
                  <p className="text-sm leading-relaxed text-slate-200">
                    &quot;{claim}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bloc B:Claims en revisió */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-500">
              En revisió
            </h3>
            <div className="space-y-4">
              {pendingClaims.map((claim) => (
                <div key={claim.label}>
                  <p className="mb-2 text-xs font-medium text-slate-500">
                    {claim.label}
                  </p>
                  <div className="space-y-2">
                    {claim.options.map((option) => (
                      <div
                        key={option.id}
                        className="relative rounded-xl border border-amber-700/30 bg-slate-800 p-4"
                      >
                        <span className="absolute right-3 top-3 rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-400">
                          Opció {option.id}
                        </span>
                        <p className="text-sm leading-relaxed text-slate-200 pr-16">
                          &quot;{option.text}&quot;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
