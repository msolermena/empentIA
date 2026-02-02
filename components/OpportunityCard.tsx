"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, Puzzle } from "lucide-react";

interface DetectedOpportunity {
  rank: number;
  solution_id: string;
  name: string;
  why_fits: string;
  hours_saved_weekly: number;
  monthly_savings_eur: number;
  integrates_with: string[];
  category: string;
}

interface BonusOpportunity {
  solution_id: string;
  name: string;
  monthly_savings_eur: number;
  popular_in_sector: boolean;
}

interface OpportunityCardProps {
  opportunity: DetectedOpportunity | BonusOpportunity;
  index: number;
  variant?: "detected" | "bonus";
}

const rankIcons = ["🥇", "🥈", "🥉"];
const rankColors = [
  "border-yellow-500/30 bg-yellow-500/5",
  "border-slate-400/30 bg-slate-400/5", 
  "border-amber-600/30 bg-amber-600/5"
];

function isDetectedOpportunity(opp: any): opp is DetectedOpportunity {
  return 'rank' in opp && 'why_fits' in opp;
}

export function OpportunityCard({ opportunity, index, variant = "detected" }: OpportunityCardProps) {
  const isDetected = variant === "detected" && isDetectedOpportunity(opportunity);
  
  return (
    <Card className={`glass-card border-2 transition-all hover:shadow-lg ${
      isDetected 
        ? rankColors[index] || "border-emerald-500/20" 
        : "border-slate-700/30 hover:border-slate-600/50"
    }`}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            {isDetected ? (
              <span className="text-2xl">{rankIcons[index] || `${index + 1}️⃣`}</span>
            ) : (
              <span className="text-xl">➕</span>
            )}
            <h3 className="text-lg font-semibold text-slate-200">
              {opportunity.name}
            </h3>
          </div>
          
          {/* Estalvi destacat */}
          <div className="text-right flex-shrink-0">
            <p className="text-2xl font-bold text-emerald-400">
              {opportunity.monthly_savings_eur.toLocaleString('ca-ES')}€
              <span className="text-sm font-normal text-muted-foreground">/mes</span>
            </p>
            {isDetected && isDetectedOpportunity(opportunity) && (
              <p className="text-xs text-muted-foreground">
                {opportunity.hours_saved_weekly}h/setmana
              </p>
            )}
          </div>
        </div>
        
        {/* Explicació personalitzada (només per detected) */}
        {isDetected && isDetectedOpportunity(opportunity) && opportunity.why_fits && (
          <div className="mb-4 p-3 rounded-lg bg-slate-800/50 border-l-4 border-emerald-500">
            <p className="text-sm text-slate-300">
              <span className="font-medium text-emerald-400">Què resol: </span>
              {opportunity.why_fits}
            </p>
          </div>
        )}
        
        {/* Integra amb (només per detected) */}
        {isDetected && isDetectedOpportunity(opportunity) && opportunity.integrates_with && opportunity.integrates_with.length > 0 && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Puzzle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-xs text-muted-foreground">Integra amb:</span>
            <div className="flex gap-1 flex-wrap">
              {opportunity.integrates_with.map((tool, i) => (
                <Badge key={i} variant="outline" className="text-xs capitalize">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Botó Saber-ne més (inactiu per ara) */}
        {isDetected && (
          <Button 
            variant="ghost" 
            size="sm" 
            disabled
            className="w-full mt-2 border border-dashed border-slate-600/50 text-slate-500 cursor-not-allowed hover:bg-transparent"
          >
            <Info className="h-4 w-4 mr-2" />
            Saber-ne més
            <span className="ml-2 text-xs opacity-70">(properament)</span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Export tipus per conveniència
export type { DetectedOpportunity, BonusOpportunity };
