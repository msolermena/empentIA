import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary-400" />
        <p className="text-muted-foreground">Carregant...</p>
      </div>
    </div>
  );
}
