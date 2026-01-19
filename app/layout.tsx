import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "empentIA - Auditoria IA Gratuïta per Pimes Catalanes",
  description: "Descobreix com la teva empresa pot estalviar 10-20 hores setmanals automatitzant processos repetitius. Auditoria gratuïta i personalitzada.",
  icons: {
    icon: [
      { url: '/images/favicons/favicon.ico' },
      { url: '/images/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'empentIA - Auditoria IA per Pimes Catalanes',
    description: 'Automatitza processos de la teva empresa i estalvia 10-20 hores setmanals',
    images: [
      {
        url: 'https://empentia.cat/images/social/og-image.png',
        width: 1200,
        height: 630,
        alt: 'empentIA - Auditoria IA',
      },
    ],
    locale: 'ca_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'empentIA - Auditoria IA per Pimes',
    description: 'Automatitza processos de la teva empresa i estalvia temps',
    images: ['https://empentia.cat/images/social/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
