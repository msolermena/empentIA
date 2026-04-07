import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    languages: {
      ca: "/webchat",
      es: "/es/webchat",
    },
  },
};

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return <div lang="es">{children}</div>;
}
