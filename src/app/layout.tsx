import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WeSix.io — Fluxo de Caixa, Sandboxes Patrimoniais e Design de Finanças",
  description: "Experimente a WeSix: o acelerador de finanças pessoais moderno. Transforme o gerenciamento de despesas em uma jornada visual inteligente com auto-alocações, análises e curadoria de estratégias semanais.",
  keywords: ["Fintech", "SaaS", "Gestão Patrimonial", "Organização Financeira", "Orçamento", "Fluxo de Caixa", "Colchão de Segurança", "Manifesto"],
  authors: [{ name: "Equipe WeSix" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-light-bg text-text-gray">
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
