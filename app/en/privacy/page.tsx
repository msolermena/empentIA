import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LegalLangSwitch } from "@/components/LegalLangSwitch";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - empentIA",
  description: "empentIA privacy policy and data protection",
  alternates: {
    canonical: "https://empentia.com/en/privacy/",
    languages: {
      es: "https://empentia.com/privacy/",
      ca: "https://empentia.com/ca/privacy/",
      en: "https://empentia.com/en/privacy/",
      "x-default": "https://empentia.com/privacy/",
    },
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background" lang="en">
      {/* Header */}
      <header className="border-b border-emerald-500/10 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-20 items-center justify-between px-8">
          <Logo size="md" variant="image" />
          <LegalLangSwitch es="/privacy/" ca="/ca/privacy/" en="/en/privacy/" active="en" />
        </nav>
      </header>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-8 py-16">
        <h1 className="mb-2 text-4xl font-extrabold">Privacy Policy</h1>
        <p className="mb-8 text-sm text-slate-400">Last updated: 25 July 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>1. Data controller and data processor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>empentIA acts under two distinct roles depending on the processing activity:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">As data controller:</strong> for the data we collect
                  directly through this website (automation audit, client portal and marketing communications),
                  empentIA Tech SL determines the purposes and means of the processing.
                </li>
                <li>
                  <strong className="text-slate-200">As data processor:</strong> when we operate a messaging
                  channel (for example, WhatsApp Business) on behalf of a business client, that business client
                  is the data controller and empentIA acts solely as processor, processing the data under its
                  instructions. In these cases a data processing agreement (art. 28 GDPR) is in place between
                  the client and empentIA, available upon request from the controller.
                </li>
              </ul>
              <p>Identification of the controller for this website&apos;s own processing activities:</p>
              <div className="rounded-lg bg-slate-800/30 p-4">
                <p className="text-sm">
                  <strong className="text-slate-200">Legal name:</strong> empentIA Tech SL<br />
                  <strong className="text-slate-200">Tax ID (CIF):</strong> B88914098<br />
                  <strong className="text-slate-200">Registered address:</strong> c/ Cortina 16, 08720 Vilafranca del Penedès (Barcelona), Spain<br />
                  <strong className="text-slate-200">Contact:</strong>{" "}
                  <a href="mailto:hola@empentia.com" className="text-emerald-400 underline">
                    hola@empentia.com
                  </a><br />
                  <strong className="text-slate-200">Phone:</strong> +34 685 615 150
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>2. Purposes of processing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-slate-300">
              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.1. Automation audit (empentia.com)</h4>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-slate-200">Data collected:</strong> company URL, sector of activity,
                    company size, software tools used, business processes, name, email, phone, job title,
                    contact preference.
                  </li>
                  <li>
                    <strong className="text-slate-200">Purpose:</strong> to carry out an automated audit to
                    identify automation opportunities and improve the audited company&apos;s productivity, and to
                    contact the requester with the results and, with their consent, related commercial information.
                  </li>
                  <li>
                    <strong className="text-slate-200">Legal basis:</strong> consent of the data subject (art. 6.1.a GDPR)
                    and legitimate interest in providing the requested service (art. 6.1.f GDPR).
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.2. Client portal (app.empentia.com)</h4>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-slate-200">Data collected:</strong> email, name, company data,
                    business information provided voluntarily (customers, products, invoices).
                  </li>
                  <li>
                    <strong className="text-slate-200">Purpose:</strong> management of the contractual relationship,
                    delivery of the contracted automation and AI services, and related service communications.
                  </li>
                  <li>
                    <strong className="text-slate-200">Legal basis:</strong> performance of a contract (art. 6.1.b GDPR).
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.3. Marketing communications</h4>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-slate-200">Purpose:</strong> sending information about services, news
                    and content of interest related to automation and artificial intelligence for businesses.
                  </li>
                  <li>
                    <strong className="text-slate-200">Legal basis:</strong> explicit consent of the data subject (art. 6.1.a GDPR).
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.4. Public scraping</h4>
                <p>
                  As part of the audit service, empentIA accesses publicly available information on the audited
                  company&apos;s website (text, metadata, detected technologies). This information is used solely to
                  personalise the audit and does not include personal data beyond what is already public.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>3. Messaging channel — WhatsApp Business</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA operates instant messaging channels, including the WhatsApp Business Platform, on
                behalf of its business clients. In this processing the business client is the data controller and
                empentIA acts as processor, as set out in section 1.
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Data processed:</strong> phone number, WhatsApp profile name,
                  content of the messages exchanged, and associated technical metadata (timestamps, delivery
                  status, conversation identifiers).
                </li>
                <li>
                  <strong className="text-slate-200">Purpose:</strong> to handle, respond to and follow up on the
                  conversations a person starts with the business client through the channel, including the
                  generation of replies by automated artificial intelligence systems.
                </li>
                <li>
                  <strong className="text-slate-200">Legal basis:</strong> the basis applicable to the controller
                  (the business client), typically the user&apos;s consent when starting the conversation or the
                  legitimate interest in handling their request. empentIA processes this data following the
                  controller&apos;s instructions.
                </li>
                <li>
                  <strong className="text-slate-200">Channel provider:</strong> messages are transmitted through
                  <strong className="text-slate-200"> Meta Platforms Ireland Ltd.</strong>, provider of the
                  WhatsApp Business Platform, which processes the data under its own terms and privacy policy.
                </li>
                <li>
                  <strong className="text-slate-200">AI sub-processor:</strong> automated replies are generated by
                  a third-party artificial intelligence model, which acts as a sub-processor and processes the
                  data solely to provide that service.
                </li>
                <li>
                  <strong className="text-slate-200">Automated replies:</strong> some of the channel&apos;s replies may
                  be generated by an automated system. The user may request human assistance at any time, and may
                  stop receiving messages by writing <strong className="text-slate-200">&quot;STOP&quot;</strong> (or the
                  equivalent option indicated in the conversation).
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>4. Recipients of the data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Personal data may be shared with the following recipients, only when necessary to provide the service:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Meta Platforms Ireland Ltd.</strong> — Provider of the
                  WhatsApp Business Platform through which messages are transmitted.
                </li>
                <li>
                  <strong className="text-slate-200">Artificial intelligence provider</strong> — Generates, as a
                  sub-processor, the channel&apos;s automated replies and the analysis and content generation of the
                  contracted services.
                </li>
                <li>
                  <strong className="text-slate-200">Database and authentication provider</strong> — Data storage
                  with servers in the European Union.
                </li>
                <li>
                  <strong className="text-slate-200">Hosting providers</strong> — Hosting of the website and the
                  application backend.
                </li>
                <li>
                  <strong className="text-slate-200">Email delivery provider</strong> — Sending of email communications.
                </li>
              </ul>
              <p className="text-sm">
                No international data transfers outside the European Economic Area will be carried out without
                appropriate safeguards. For providers based outside the EEA, we ensure they have adequate
                certifications or transfer mechanisms (standard contractual clauses or other safeguards provided
                for under the GDPR).
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>5. Retention period</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Audit data:</strong> retained for a maximum of 12 months from
                  collection, unless the data subject requests earlier erasure.
                </li>
                <li>
                  <strong className="text-slate-200">Client data:</strong> retained for the duration of the
                  contractual relationship and, afterwards, for the periods legally established to address
                  potential liabilities (5 years).
                </li>
                <li>
                  <strong className="text-slate-200">Messaging channel data:</strong> conversation content is
                  retained for as long as necessary to provide the service and according to the instructions of
                  the business client acting as controller. Once the relationship ends, it is deleted or returned
                  to the controller in accordance with the data processing agreement.
                </li>
                <li>
                  <strong className="text-slate-200">Marketing communications:</strong> until the data subject
                  withdraws their consent.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>6. Rights of data subjects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>Every person has the right to obtain confirmation as to whether we are processing their personal data. In particular, they may exercise the following rights:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li><strong className="text-slate-200">Access:</strong> the right to obtain information about their personal data being processed.</li>
                <li><strong className="text-slate-200">Rectification:</strong> the right to request the correction of inaccurate or incomplete data.</li>
                <li><strong className="text-slate-200">Erasure:</strong> the right to request the deletion of their data (&quot;right to be forgotten&quot;).</li>
                <li><strong className="text-slate-200">Restriction:</strong> the right to request the restriction of processing in certain cases.</li>
                <li><strong className="text-slate-200">Portability:</strong> the right to receive the data in a structured, commonly used format.</li>
                <li><strong className="text-slate-200">Objection:</strong> the right to object to the processing of their data.</li>
              </ul>
              <div className="rounded-lg bg-emerald-500/10 p-4">
                <p className="text-sm">
                  <strong className="text-emerald-400">To exercise these rights:</strong><br />
                  If the processing relates to this website, send an email to{" "}
                  <a href="mailto:hola@empentia.com" className="text-emerald-400 underline">
                    hola@empentia.com
                  </a>{" "}
                  stating the right you wish to exercise and attaching a copy of your identity document. We will
                  respond within a maximum of 30 days. If your data is processed through a messaging channel
                  operated on behalf of a business client, please direct your request to that company as the data
                  controller; empentIA will forward the request if it receives it.
                </p>
              </div>
              <p className="text-sm">
                You also have the right to lodge a complaint with the{" "}
                <strong className="text-slate-200">Catalan Data Protection Authority</strong>{" "}
                (<a href="https://apdcat.gencat.cat" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">apdcat.gencat.cat</a>)
                or the <strong className="text-slate-200">Spanish Data Protection Agency</strong>{" "}
                (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">aepd.es</a>).
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>7. Security measures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA Tech SL has adopted the technical and organisational measures necessary to ensure the
                security of personal data:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Encryption of communications (HTTPS/TLS)</li>
                <li>Secure authentication via magic link (no password storage)</li>
                <li>Per-client data isolation (multi-tenant architecture)</li>
                <li>Access to data restricted to authorised personnel only</li>
                <li>Regular backups</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>8. Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                This Privacy Policy may be amended to adapt it to legislative developments or changes in our
                services. Any change will be published on this page. We recommend reviewing it periodically.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col items-center gap-3 text-sm">
          <div className="flex items-center gap-6">
            <Link href="/en/terms/" className="text-emerald-400 underline hover:text-emerald-300">
              Terms of Service
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
