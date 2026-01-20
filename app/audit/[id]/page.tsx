"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

/**
 * Pàgina intermèdia que redirigeix a /questions
 * El flux principal va per /audit/analyzing → /audit/[id]/questions
 * Aquesta pàgina és un fallback per si algú accedeix directament a /audit/[id]
 */
export default function AuditPage() {
  const params = useParams();
  const router = useRouter();
  const auditId = params.id as string;

  useEffect(() => {
    // Redirigir directament a questions
    router.replace(`/audit/${auditId}/questions`);
  }, [auditId, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-muted-foreground">Redirigint...</p>
    </div>
  );
}
