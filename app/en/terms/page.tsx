import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LegalLangSwitch } from "@/components/LegalLangSwitch";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service - empentIA",
  description: "empentIA terms of service, including the WhatsApp Business messaging channel",
  alternates: {
    canonical: "https://empentia.com/en/terms/",
    languages: {
      es: "https://empentia.com/terms/",
      ca: "https://empentia.com/ca/terms/",
      en: "https://empentia.com/en/terms/",
      "x-default": "https://empentia.com/terms/",
    },
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background" lang="en">
      <header className="border-b border-emerald-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center justify-between px-8">
          <Logo size="md" variant="image" />
          <LegalLangSwitch es="/terms/" ca="/ca/terms/" en="/en/terms/" active="en" />
        </nav>
      </header>

      <div className="container mx-auto max-w-4xl px-8 py-16">
        <h1 className="mb-2 text-4xl font-extrabold">Terms of Service</h1>
        <p className="mb-8 text-sm text-slate-400">Last updated: 25 July 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>1. Purpose and acceptance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                These Terms of Service govern the provision of the automation and artificial intelligence
                services offered by <strong className="text-slate-200">empentIA Tech SL</strong> (hereinafter,
                &quot;empentIA&quot;), with tax ID B88914098 and registered address at c/ Cortina 16, 08720 Vilafranca del
                Penedès (Barcelona), Spain.
              </p>
              <p>
                Contracting the services or using their channels implies full acceptance of these terms. Where the
                service is provided to a company, the person contracting it declares they have sufficient capacity
                to bind that company.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>2. Description of the service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>empentIA provides, among others, the following services:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Automation of administrative and business processes.</li>
                <li>Artificial intelligence tools for analysis and content generation.</li>
                <li>
                  Setup and operation of messaging channels (including the WhatsApp Business Platform) for support
                  and communication with the business client&apos;s users.
                </li>
              </ul>
              <p>The specific scope of each service is defined in the proposal or contract signed with the client.</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>3. WhatsApp Business channel: ownership</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  The WhatsApp Business Account (WABA) and its associated phone number are the{" "}
                  <strong className="text-slate-200">property of the business client</strong>. empentIA only
                  configures and operates them on the client&apos;s behalf, acquiring no ownership rights over them.
                </li>
                <li>
                  The data and conversations that flow through the channel belong to the business client, who acts
                  as data controller. empentIA acts as processor, as described in the{" "}
                  <Link href="/en/privacy/" className="text-emerald-400 underline">Privacy Policy</Link>.
                </li>
                <li>
                  Upon termination of the service, control of the account and number remains with the business
                  client, and empentIA deletes or returns the data in accordance with the data processing agreement.
                </li>
                <li>
                  Use of the channel is subject to the policies of WhatsApp and Meta Platforms Ireland Ltd. The
                  client undertakes to comply with them.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>4. Use of the messaging channel and opt-out</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Communications through the channel respect the rules of the WhatsApp Business Platform, including
                  the <strong className="text-slate-200">24-hour customer service window</strong>: outside that
                  period, messages are only sent using previously approved templates.
                </li>
                <li>
                  Any user may opt out and stop receiving messages at any time by writing{" "}
                  <strong className="text-slate-200">&quot;STOP&quot;</strong> (or the equivalent option indicated in the
                  conversation). Opt-out requests are honoured immediately.
                </li>
                <li>
                  The channel is not used for unsolicited bulk messaging or for purposes other than those disclosed
                  to the user.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>5. Automated replies and artificial intelligence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Some of the channel&apos;s replies may be{" "}
                  <strong className="text-slate-200">generated by an automated artificial intelligence system</strong>.
                  This is clearly disclosed to the user, in compliance with the transparency principle of the
                  European Artificial Intelligence Regulation (AI Act).
                </li>
                <li>
                  The user may <strong className="text-slate-200">request human assistance at any time</strong> by
                  indicating so in the conversation. The request is routed to the business client&apos;s human team.
                </li>
                <li>
                  Automated replies are informational and assistive in nature; they do not replace professional
                  advice where such advice is required.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>6. Client obligations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>Provide truthful information and keep their data up to date.</li>
                <li>
                  Have an appropriate legal basis for processing their users&apos; data and, where applicable, obtain
                  their consent.
                </li>
                <li>Use the service in accordance with the law, these terms and the policies of the platforms involved.</li>
                <li>Not use the channel for unlawful or misleading content or content that infringes third-party rights.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>7. Intellectual property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                The software, tools and materials developed by empentIA are owned by empentIA or its licensors.
                Contracting the service does not transfer intellectual property rights beyond the agreed use.
                Content and data provided by the client remain the client&apos;s property.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>8. Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA provides the service with due diligence but does not guarantee the uninterrupted
                availability of third-party platforms (such as Meta&apos;s) and is not liable for interruptions beyond
                its control. empentIA is not responsible for the client&apos;s use of the service or for the content the
                client publishes or transmits.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>9. Duration, amendments and governing law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>The duration of the service is that established in the corresponding contract or proposal.</li>
                <li>
                  empentIA may amend these terms to adapt them to legal or service developments. Changes will be
                  published on this page.
                </li>
                <li>
                  These terms are governed by Spanish law. For any dispute, the parties submit to the courts that
                  legally have jurisdiction.
                </li>
              </ul>
              <div className="rounded-lg bg-emerald-500/10 p-4">
                <p className="text-sm">
                  <strong className="text-emerald-400">Contact:</strong>{" "}
                  <a href="mailto:hola@empentia.com" className="text-emerald-400 underline">hola@empentia.com</a>
                </p>
              </div>
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
              Cookie Policy
            </Link>
          </div>
          <Link href="/" className="text-slate-500 hover:text-slate-300">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
