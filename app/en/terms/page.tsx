import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service - empentIA",
  description: "empentIA terms of service for the WhatsApp Business messaging channel",
  // Página huérfana para la App Review de Meta: carga con 200 pero no se indexa.
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://empentia.com/en/terms/",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background" lang="en">
      <header className="border-b border-emerald-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center px-8">
          <Logo size="md" variant="image" />
        </nav>
      </header>

      <div className="container mx-auto max-w-4xl px-8 py-16">
        <h1 className="mb-2 text-4xl font-extrabold">Terms of Service</h1>
        <p className="mb-1 text-lg text-slate-300">empentIA Messaging Channel</p>
        <p className="mb-8 text-sm text-slate-400">Last updated: 25 July 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>1. Purpose</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                These Terms of Service govern the provision of the customer service and automated messaging service
                that empentIA Tech SL (&quot;empentIA&quot;) offers through the WhatsApp Business Platform and other messaging
                channels, both to its contracting clients and to the end users who interact with these channels.
              </p>
              <div className="rounded-lg bg-slate-800/30 p-4">
                <p className="text-sm">
                  <strong className="text-slate-200">Service provider:</strong><br />
                  Company name: empentIA Tech SL<br />
                  Tax ID (CIF): B88914098<br />
                  Address: c/ Cortina 16, 08720 Vilafranca del Penedès (Barcelona), Spain<br />
                  Contact:{" "}
                  <a href="mailto:hola@empentia.com" className="text-emerald-400 underline">hola@empentia.com</a>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>2. Definitions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Contracting client:</strong> the company or professional that
                  contracts empentIA to operate a messaging channel on its behalf (for example, a property management company).
                </li>
                <li>
                  <strong className="text-slate-200">End user:</strong> the person who writes to the contracting client&apos;s messaging channel.
                </li>
                <li>
                  <strong className="text-slate-200">Channel:</strong> the WhatsApp Business number and account (or equivalent channel) through which the service is provided.
                </li>
                <li>
                  <strong className="text-slate-200">AI assistant:</strong> the automated system that may generate responses within the channel.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>3. Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA provides a platform that allows the contracting client to manage customer service through
                WhatsApp, including the reception of messages, the generation of automated responses via artificial
                intelligence, escalation to human agents, and incident tracking.
              </p>
              <p>
                The service is provided over Meta&apos;s official Cloud API. empentIA acts as an authorized technology
                provider (Tech Provider).
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>4. Channel Ownership</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                The WhatsApp Business Account (WABA) and the phone number associated with the channel are the{" "}
                <strong className="text-slate-200">property of the contracting client</strong>, not of empentIA.
                empentIA accesses them solely as a technology provider authorized by the client.
              </p>
              <p>
                Upon termination of the contractual relationship, the client retains ownership of its number, its WABA
                and its conversation history, and may disconnect empentIA without loss of these assets.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>5. Automated Use and Human Intervention (Transparency)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                In compliance with Regulation (EU) 2024/1689 on artificial intelligence (AI Act), it is hereby disclosed that:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Channel responses may be <strong className="text-slate-200">generated wholly or partially by an automated artificial intelligence system</strong>.</li>
                <li>The end user is informed that they are interacting with an automated assistant.</li>
                <li>The end user may <strong className="text-slate-200">request human attention at any time</strong> by writing to the channel.</li>
                <li>The AI assistant does not make decisions with legal effects on the user without human oversight.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>6. Opt-out and User Control</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                The end user may stop receiving messages from the channel at any time by replying{" "}
                <strong className="text-slate-200">STOP</strong> (or equivalent configured expressions). The request is honored immediately.
              </p>
              <p>
                empentIA respects WhatsApp&apos;s 24-hour service window: outside this window, messages are only sent using
                templates previously approved by Meta, in accordance with its policies.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>7. Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>Regarding the personal data of end users processed through the channel:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>The <strong className="text-slate-200">contracting client is the data controller</strong>.</li>
                <li><strong className="text-slate-200">empentIA acts as the data processor</strong> on behalf of the client, under a data processing agreement signed between both parties in accordance with Article 28 of the GDPR.</li>
                <li>
                  The processing of data is governed by empentIA&apos;s{" "}
                  <Link href="/en/privacy/" className="text-emerald-400 underline">Privacy Policy</Link>{" "}
                  and the corresponding processing agreement.
                </li>
                <li>The AI systems used act as sub-processors, with appropriate contractual safeguards.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>8. Obligations of the Contracting Client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>The contracting client undertakes to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Use the channel in accordance with WhatsApp and Meta policies.</li>
                <li>Not use the channel to send unsolicited communications (spam) or unlawful content.</li>
                <li>Obtain the appropriate consent or legal basis to communicate with its end users.</li>
                <li>Maintain a valid payment method with Meta for the messaging costs that Meta bills it directly.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>9. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA provides the service with due diligence but does not guarantee the uninterrupted availability
                of third-party services (Meta, WhatsApp) on which the channel depends. empentIA is not responsible for
                interruptions, policy changes or costs imposed by Meta.
              </p>
              <p>
                empentIA is not responsible for the content of messages sent by the contracting client or for the use
                the client makes of the channel.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>10. Pricing and Billing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA bills the contracting client for platform, integration and support services as contractually agreed.
              </p>
              <p>
                <strong className="text-slate-200">WhatsApp messaging costs are billed directly by Meta to the
                contracting client.</strong> empentIA does not pass on or apply any margin to these costs.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>11. Amendments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA may amend these Terms to adapt them to regulatory, service or Meta policy changes. Changes
                will be published on this page.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>12. Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                These Terms are governed by Spanish law. For any dispute, the parties submit to the courts and
                tribunals that apply under the relevant regulations.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 text-sm">
          <div className="flex items-center gap-6">
            <Link href="/en/privacy/" className="text-emerald-400 underline hover:text-emerald-300">
              Privacy Policy
            </Link>
            <Link href="/legal/" className="text-emerald-400 underline hover:text-emerald-300">
              Legal notice
            </Link>
            <Link href="/cookies/" className="text-emerald-400 underline hover:text-emerald-300">
              Cookie policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
