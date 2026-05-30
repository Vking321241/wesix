"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, HelpCircle, ChevronDown, Sparkles, AlertCircle } from "lucide-react";
import { PRICING_PLANS, FAQ_ITEMS } from "@/lib/mockData";

export default function PricingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="relative w-full min-h-screen bg-light-bg text-text-gray pt-32 pb-24 overflow-hidden">
      
      {/* Background spotlights */}
      <div className="absolute top-[10%] left-1/3 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-1/4 w-[400px] h-[400px] bg-accent/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wider uppercase font-jakarta">
              Simplicidade e Transparência
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-jakarta text-4xl md:text-6xl font-extrabold text-text-navy tracking-tight leading-tight mb-6"
          >
            Investimento em Clareza Absoluta.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-gray font-inter text-lg md:text-xl leading-relaxed"
          >
            Sem taxas ocultas ou surpresas corporativas. Selecione a estrutura que melhor se adapta às suas necessidades e metas financeiras.
          </motion.p>
        </div>

        {/* ---------------- PRICING CARDS GRID (Symmetric 2-column layout!) ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-36 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, index) => {
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white border rounded-3xl p-8 flex flex-col justify-between h-full transition-all duration-500 overflow-hidden shadow-[0_10px_35px_rgba(94,61,255,0.01)] ${
                  plan.isPopular
                    ? "border-primary shadow-[0_15px_40px_rgba(94,61,255,0.06)] scale-[1.02]"
                    : "border-primary/5"
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute top-4 right-4 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-primary font-jakarta">
                    Recomendado PJ
                  </div>
                )}

                <div>
                  {/* Name & Desc */}
                  <span className="text-xs font-jakarta font-bold text-[#9A98AF] uppercase tracking-widest block mb-1">
                    {plan.name}
                  </span>
                  <p className="text-text-gray font-inter text-xs leading-normal min-h-[40px] mb-8 font-semibold">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline space-x-1 mb-8">
                    <span className="text-4xl md:text-5xl font-extrabold text-text-navy font-jakarta">
                      R$ {plan.priceMonthly.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xs font-jakarta text-text-gray font-bold uppercase tracking-widest">
                      / mês
                    </span>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-4 pt-8 border-t border-primary/10 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-3 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-text-gray font-inter leading-tight font-semibold">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Action */}
                <a
                  href={plan.id === "minhas-financas" ? "https://wesixapp.com.br/minhasfinancas/" : "https://wesixapp.com.br/meunegocio/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 text-center rounded-xl font-jakarta font-bold text-sm transition-all duration-300 border uppercase tracking-wider block ${
                    plan.isPopular
                      ? "bg-accent text-white border-white/10 hover:bg-accent-dark shadow-[0_4px_15px_rgba(255,110,30,0.25)]"
                      : "bg-[#FAF9FF] text-primary border-primary/10 hover:bg-primary hover:text-white"
                  }`}
                >
                  {plan.ctaText}
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* ---------------- 3. ACCORDION FAQ SECTION ---------------- */}
        <div className="max-w-4xl mx-auto mb-24">
          <h3 className="font-jakarta text-2xl md:text-3xl font-extrabold text-text-navy text-center mb-12 flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" />
            Perguntas Frequentes
          </h3>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(94,61,255,0.01)] transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-jakarta font-bold text-text-navy text-sm md:text-base pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-text-gray shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-primary/10"
                      >
                        <div className="px-6 py-5 font-inter text-text-gray text-sm leading-relaxed font-medium">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security Warning note banner */}
        <div className="bg-[#FAF9FF] border border-primary/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 max-w-4xl mx-auto shadow-sm">
          <AlertCircle className="w-6 h-6 text-accent shrink-0" />
          <p className="text-xs text-text-gray font-inter leading-relaxed text-center sm:text-left font-medium">
            <strong>Custódia & Protocolos de Segurança:</strong> A WeSix não armazena suas credenciais bancárias nem possui acesso direto aos seus fundos. Todo o ecossistema é baseado em conexões de leitura segura autorizadas via Plaid, em conformidade com as diretrizes SOC2. Você pode desvincular contas a qualquer momento.
          </p>
        </div>

      </div>
    </div>
  );
}
