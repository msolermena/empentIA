import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-primary-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center px-8">
          <Logo size="md" variant="image" />
        </nav>
      </header>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center px-8">
        <Card className="glass-card max-w-lg border-2 border-primary-500/20 p-12 text-center">
          <div className="mb-6">
            <h1 className="mb-2 text-8xl font-extrabold gradient-text">404</h1>
            <h2 className="text-2xl font-bold text-slate-200">Pàgina No Trobada</h2>
          </div>
          
          <p className="mb-8 text-muted-foreground">
            Ho sentim, la pàgina que busques no existeix o ha estat moguda.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="default" className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Tornar a l&apos;Inici
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="gap-2">
              <Link href="javascript:history.back()">
                <ArrowLeft className="h-4 w-4" />
                Enrere
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
