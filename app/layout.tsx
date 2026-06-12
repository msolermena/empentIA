import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://empentia.com'),
  title: "Agentes de IA para pymes | empentIA",
  description: "Diseñamos y operamos agentes de inteligencia artificial para pymes: atención al cliente, gestión documental y más. Tú pones el criterio; ellos, las horas.",
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-brand-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-brand.png', type: 'image/png' },
    ],
    apple: [
      { url: '/favicons/favicon-brand-180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Agentes de IA para pymes | empentIA',
    description: 'Diseñamos y operamos agentes de inteligencia artificial para pymes: atención al cliente, gestión documental y más.',
    images: [
      {
        url: 'https://empentia.com/images/social/og-atencion-cliente-es.jpg',
        width: 1200,
        height: 630,
        alt: 'empentIA',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentes de IA para pymes | empentIA',
    description: 'Diseñamos y operamos agentes de inteligencia artificial para pymes.',
    images: ['https://empentia.com/images/social/og-atencion-cliente-es.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3HNWY32B0D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3HNWY32B0D');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
