import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - empentIA",
  description: "empentIA privacy policy and data protection",
  // Página huérfana para la App Review de Meta: carga con 200 pero no se indexa.
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://empentia.com/en/privacy/",
  },
};

export default function PrivacyPage() {
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
        <h1 className="mb-2 text-4xl font-extrabold">Privacy Policy</h1>
        <p className="mb-8 text-sm text-slate-400">Last updated: 25 July 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>1. Data Controller</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>The controller of the personal data collected through this website is:</p>
              <div className="rounded-lg bg-slate-800/30 p-4">
                <p className="text-sm">
                  <strong className="text-slate-200">Company name:</strong> empentIA Tech SL<br />
                  <strong className="text-slate-200">Tax ID (CIF):</strong> B88914098<br />
                  <strong className="text-slate-200">Address:</strong> c/ Cortina 16, 08720 Vilafranca del Penedès (Barcelona), Spain<br />
                  <strong className="text-slate-200">Contact:</strong>{" "}
                  <a href="mailto:hola@empentia.com" className="text-emerald-400 underline">
                    hola@empentia.com
                  </a><br />
                  <strong className="text-slate-200">Phone:</strong> 685 615 150
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>2. Purposes of Processing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-slate-300">
              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.1. Automation audit (empentia.com)</h4>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-slate-200">Data collected:</strong> company URL, sector of activity,
                    company size, software tools used, business processes, name, email, phone, position, contact preference.
                  </li>
                  <li>
                    <strong className="text-slate-200">Purpose:</strong> to carry out an automated audit identifying
                    automation opportunities and improving the audited company&apos;s productivity. To contact the
                    applicant with the results and, subject to consent, related commercial information.
                  </li>
                  <li>
                    <strong className="text-slate-200">Legal basis:</strong> consent of the data subject (Art. 6.1.a GDPR)
                    and legitimate interest for the provision of the requested service (Art. 6.1.f GDPR).
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.2. Client portal (app.empentia.com)</h4>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-slate-200">Data collected:</strong> email, name, company data, business
                    information provided voluntarily (clients, products, invoices).
                  </li>
                  <li>
                    <strong className="text-slate-200">Purpose:</strong> management of the contractual relationship,
                    provision of the contracted automation and AI services, and service-related communication.
                  </li>
                  <li>
                    <strong className="text-slate-200">Legal basis:</strong> performance of a contract (Art. 6.1.b GDPR).
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.3. Commercial communications</h4>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-slate-200">Purpose:</strong> sending information about services, news and
                    content of interest related to automation and artificial intelligence for businesses.
                  </li>
                  <li>
                    <strong className="text-slate-200">Legal basis:</strong> explicit consent of the data subject (Art. 6.1.a GDPR).
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.4. Public scraping</h4>
                <p>
                  As part of the audit service, empentIA accesses publicly available information on the audited
                  company&apos;s website (text, metadata, detected technologies). This information is used exclusively to
                  personalize the audit and does not include personal data beyond that already public.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-200">2.5. WhatsApp messaging channel (service operated on behalf of clients)</h4>
                <p>
                  When empentIA provides customer service via WhatsApp on behalf of one of its clients (for example,
                  a property management company), the contracting client is the{" "}
                  <strong className="text-slate-200">data controller</strong> of the end users who write to that
                  channel, and empentIA acts as the <strong className="text-slate-200">data processor</strong> on its
                  behalf, under a data processing agreement signed between both parties (Art. 28 GDPR).
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-slate-200">Data processed:</strong> phone number, WhatsApp profile name,
                    content of the messages exchanged, and associated metadata (timestamps, delivery status).
                  </li>
                  <li>
                    <strong className="text-slate-200">Purpose:</strong> handling of enquiries, incidents and customer
                    service through the WhatsApp channel, including responses generated automatically by artificial
                    intelligence systems.
                  </li>
                  <li>
                    <strong className="text-slate-200">Legal basis:</strong> as determined by the controlling client,
                    typically the performance of a contract or the service relationship with the end user
                    (Art. 6.1.b GDPR) or legitimate interest (Art. 6.1.f GDPR).
                  </li>
                  <li>
                    <strong className="text-slate-200">Automated systems:</strong> responses may be generated by an AI
                    assistant. The user may request human attention at any time, and may opt out of the channel by
                    replying <strong className="text-slate-200">STOP</strong>.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>3. Data Recipients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                Personal data may be shared with the following recipients, only where necessary for the provision of
                the service:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li><strong className="text-slate-200">Supabase Inc.</strong> — Database and authentication provider (servers in the EU).</li>
                <li><strong className="text-slate-200">Vercel Inc.</strong> — Frontend web hosting provider.</li>
                <li><strong className="text-slate-200">Railway Corp.</strong> — Backend hosting provider.</li>
                <li><strong className="text-slate-200">Anthropic PBC</strong> — Artificial intelligence provider for analysis and content generation.</li>
                <li><strong className="text-slate-200">Brevo (Sendinblue)</strong> — Email delivery provider.</li>
                <li>
                  <strong className="text-slate-200">Meta Platforms Ireland Ltd.</strong> — Provider of the WhatsApp
                  Business Platform messaging infrastructure. In the processing of WhatsApp channel data, Meta acts
                  as an independent controller with respect to its own purposes as determined by its terms of service.
                  Data is processed through Meta&apos;s Cloud API.
                </li>
              </ul>
              <p className="text-sm">
                No international data transfers outside the European Economic Area will be carried out without
                adequate safeguards. For providers based in the USA, we ensure they have the appropriate
                certifications or transfer mechanisms in place.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>4. Retention Period</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-slate-200">Audit data:</strong> retained for a maximum period of 12 months
                  from collection, unless the data subject requests earlier deletion.
                </li>
                <li>
                  <strong className="text-slate-200">Client data:</strong> retained for the duration of the contractual
                  relationship and, subsequently, for the legally established periods to address potential liabilities (5 years).
                </li>
                <li>
                  <strong className="text-slate-200">Commercial communications:</strong> until the data subject withdraws consent.
                </li>
                <li>
                  <strong className="text-slate-200">WhatsApp channel data:</strong> retained according to the
                  instructions of the controlling client, and in any case no longer than necessary for the purpose of
                  the service or as established by the processing agreement.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>5. Rights of Data Subjects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>Everyone has the right to obtain confirmation as to whether we are processing their personal data. In particular, the following rights may be exercised:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li><strong className="text-slate-200">Access:</strong> the right to obtain information about the personal data being processed.</li>
                <li><strong className="text-slate-200">Rectification:</strong> the right to request the correction of inaccurate or incomplete data.</li>
                <li><strong className="text-slate-200">Erasure:</strong> the right to request the deletion of data (&quot;right to be forgotten&quot;).</li>
                <li><strong className="text-slate-200">Restriction:</strong> the right to request the restriction of processing in certain cases.</li>
                <li><strong className="text-slate-200">Portability:</strong> the right to receive the data in a structured, commonly used format.</li>
                <li><strong className="text-slate-200">Objection:</strong> the right to object to the processing of the data.</li>
              </ul>
              <div className="rounded-lg bg-emerald-500/10 p-4">
                <p className="text-sm">
                  <strong className="text-emerald-400">To exercise these rights:</strong>{" "}
                  send an email to{" "}
                  <a href="mailto:hola@empentia.com" className="text-emerald-400 underline">hola@empentia.com</a>{" "}
                  indicating the right you wish to exercise and attaching a copy of your identity document. We will
                  respond within a maximum of 30 days.
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
              <CardTitle>6. Security Measures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                empentIA Tech SL has adopted the technical and organizational measures necessary to guarantee the
                security of personal data:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Encryption of communications (HTTPS/TLS)</li>
                <li>Secure authentication via magic link (no password storage)</li>
                <li>Per-client data isolation (multi-tenant architecture)</li>
                <li>Access restricted to authorized personnel only</li>
                <li>Periodic backups</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-emerald-500/10">
            <CardHeader>
              <CardTitle>7. Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <p>
                This Privacy Policy may be amended to adapt it to legislative developments or changes in our services.
                Any changes will be published on this page. We recommend reviewing it periodically.
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
              Cookie policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
