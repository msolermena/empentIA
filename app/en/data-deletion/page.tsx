import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Data Deletion Instructions - empentIA",
  description: "How to request deletion of your personal data from empentIA",
  // Página huérfana para la App Review de Meta: carga con 200 pero no se indexa.
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://empentia.com/en/data-deletion/",
  },
};

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-background" lang="en">
      {/* Header */}
      <header className="border-b border-emerald-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center px-8">
          <Logo size="md" variant="image" />
        </nav>
      </header>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-8 py-16">
        <h1 className="mb-2 text-4xl font-extrabold">Data Deletion Instructions</h1>
        <p className="mb-8 text-sm text-slate-400">Last updated: 6 August 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <p className="text-slate-300">
            empentIA Tech SL provides customer service messaging solutions on behalf of its
            business clients through the WhatsApp Business Platform and other channels.
          </p>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>1. Data controllership</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                When empentIA operates a messaging channel on behalf of a business client, that{" "}
                <strong className="text-slate-200">client is the data controller</strong> of the end
                users&apos; personal data, and empentIA acts as a{" "}
                <strong className="text-slate-200">data processor</strong> on its behalf. Requests to
                delete personal data are handled in accordance with the applicable data processing
                agreement and the GDPR.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>2. How to request deletion of your data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                If you have interacted with a business through a messaging channel operated by
                empentIA and wish to request the deletion of your personal data, you can:
              </p>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  Contact the business you interacted with directly (the data controller), or
                </li>
                <li>
                  Email{" "}
                  <a
                    href="mailto:hola@empentia.com?subject=Data%20deletion%20request"
                    className="text-emerald-400 underline"
                  >
                    hola@empentia.com
                  </a>{" "}
                  with the subject &quot;Data deletion request&quot;, indicating the phone number or
                  identifier used and the business you contacted.
                </li>
              </ol>
              <div className="rounded-lg bg-emerald-500/10 p-4">
                <p className="text-sm">
                  We will process your request without undue delay and within the timeframe required
                  by applicable law (no later than 30 days). We may verify your identity before
                  processing the request.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>3. Data we may retain</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                We may retain certain data where required for legal reasons (for example, records
                necessary to comply with tax or accounting obligations), as described in our{" "}
                <Link href="/en/privacy/" className="text-emerald-400 underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col items-center gap-3 text-sm">
          <div className="flex items-center gap-6">
            <Link href="/en/privacy/" className="text-emerald-400 underline hover:text-emerald-300">
              Privacy Policy
            </Link>
            <Link href="/en/terms/" className="text-emerald-400 underline hover:text-emerald-300">
              Terms of Service
            </Link>
            <Link href="/legal/" className="text-emerald-400 underline hover:text-emerald-300">
              Legal notice
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
