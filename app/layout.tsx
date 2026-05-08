import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://empentia.com'),
  title: "empentIA - Automatització i IA per pimes",
  description: "Automatitzacions i agents IA a mida per impulsar l'eficiència i el creixement del teu negoci. Sense complicacions tècniques.",
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: 'empentIA - Automatització i IA per pimes',
    description: 'Automatitzacions i agents IA a mida per impulsar l\'eficiència i el creixement del teu negoci.',
    images: [
      {
        url: 'https://empentia.com/images/social/og-image.png',
        width: 1200,
        height: 630,
        alt: 'empentIA',
      },
    ],
    locale: 'ca_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'empentIA - Automatització i IA per pimes',
    description: 'Automatitzacions i agents IA a mida per impulsar l\'eficiència del teu negoci.',
    images: ['https://empentia.com/images/social/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" className="dark">
      <body className={inter.className}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
