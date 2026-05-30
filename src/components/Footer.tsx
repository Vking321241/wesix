"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Shield, Sparkles, CheckCircle2 } from "lucide-react";
import { getWesixConfig } from "@/lib/wesixConfig";

export default function Footer() {
  const { logoUrl, siteName } = getWesixConfig();
  const brandName = siteName || 'WeSix';
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("O e-mail é obrigatório.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, digite um e-mail válido.");
      return;
    }
    setError("");
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative bg-primary text-white pt-24 pb-12 overflow-hidden border-t border-white/10 shadow-[0_-10px_40px_rgba(94,61,255,0.15)]">
      
      {/* Delicate background highlight shapes inside purple block */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center space-x-2 group mb-6">
                {logoUrl ? (
                  <img src={logoUrl} alt={brandName} className="h-9 w-auto object-contain brightness-0 invert" />
                ) : (
                  <span className="font-jakarta text-2xl font-extrabold tracking-tight text-white">
                    {brandName}<span className="text-accent group-hover:text-white transition-colors duration-300">.io</span>
                  </span>
                )}
              </Link>
              <p className="text-white/85 font-inter text-sm max-w-sm leading-relaxed font-semibold">
                Seu parceiro para despesas e organização. Unindo controle financeiro estratégico, sandboxes dinâmicas e relatórios em tempo real.
              </p>
            </div>
          </div>

          {/* Quick links grids */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-12 max-w-sm ml-auto">
            {/* Column 1 */}
            <div>
              <h5 className="font-jakarta text-xs font-bold tracking-wider text-white uppercase mb-6 opacity-90">
                Navegação
              </h5>
              <ul className="space-y-4 font-semibold text-sm">
                <li>
                  <Link href="/" className="text-white/80 hover:text-white transition-all duration-300">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-white/80 hover:text-white transition-all duration-300">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-white/80 hover:text-white transition-all duration-300">
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-white/80 hover:text-white transition-all duration-300">
                    Planos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h5 className="font-jakarta text-xs font-bold tracking-wider text-white uppercase mb-6 opacity-90">
                Legal
              </h5>
              <ul className="space-y-4 font-semibold text-sm">
                <li>
                  <Link href="/" className="text-white/80 hover:text-white transition-all duration-300 font-medium">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-white/80 hover:text-white transition-all duration-300 font-medium">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-white/80 hover:text-white transition-all duration-300 font-medium">
                    Custódia de Dados
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Metadata & Certifications */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-6 text-xs text-white/70 font-inter">
            <span>© {new Date().getFullYear()} {brandName}. Todos os direitos reservados.</span>
            <span className="hidden sm:inline border-r border-white/20 h-4" />
            <span className="flex items-center gap-1.5 text-white">
              <Shield className="w-3.5 h-3.5 text-accent" />
              Custódia Segura Certificada SOC2 Tipo II
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
