"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  X,
  Wallet,
  PieChart as ChartIcon,
  ShieldCheck,
  Sparkles,
  DollarSign,
  Calendar,
} from "lucide-react";

export default function FeaturesPage() {
  const [activePainTab, setActivePainTab] = useState<"pf" | "pj">("pf");

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-light-bg text-text-gray pt-20">

      {/* ---------------- 3. PAIN POINTS / THOUGHTS GRID ---------------- */}
      <section className="relative py-28 px-6 bg-primary text-white overflow-hidden shadow-inner">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10">

          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-white/70 tracking-wider uppercase mb-3 font-jakarta">
              Se você já teve esse pensamento…
            </h2>
            <p className="font-jakarta text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              O WeSix foi feito sob medida para você.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/10 border border-white/15 p-1 rounded-full flex items-center shadow-sm">
              <button
                onClick={() => setActivePainTab("pf")}
                className={`px-6 py-2.5 rounded-full font-jakarta text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activePainTab === "pf"
                    ? "bg-white text-primary shadow-lg"
                    : "text-white/80 hover:text-white"
                }`}
              >
                Na Vida Pessoal (PF)
              </button>
              <button
                onClick={() => setActivePainTab("pj")}
                className={`px-6 py-2.5 rounded-full font-jakarta text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activePainTab === "pj"
                    ? "bg-white text-primary shadow-lg"
                    : "text-white/80 hover:text-white"
                }`}
              >
                No seu Negócio (PJ)
              </button>
            </div>
          </div>

          {/* Thoughts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto min-h-[380px]">
            {activePainTab === "pf" ? (
              [
                `“Recebi bem esse mês, mas não sobrou nada.”`,
                `“Não sei exatamente quanto tenho disponível agora.”`,
                `“Emprestei dinheiro para um amigo e não lembro o valor nem quando ele vai pagar.”`,
                `“Vendi um item e fico anotando no papel quem já pagou e quem não pagou.”`,
                `“Meu cartão de crédito é um mistério — só descubro o tamanho do problema quando a fatura fecha.”`,
                `“Tenho conta em dois bancos e nunca sei o saldo real de cada um.”`,
                `“Pago as contas mas nunca consigo guardar dinheiro.”`,
                `“Sei que gasto demais, mas não sei onde.”`,
              ].map((thought, idx) => (
                <motion.div
                  key={`pf-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white/10 border border-white/10 p-6 rounded-2xl flex items-start space-x-3.5 shadow-md hover:bg-white/15 hover:border-white/30 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-primary transition-colors duration-300">
                    <span className="text-xs font-extrabold font-jakarta">{idx + 1}</span>
                  </div>
                  <p className="text-white font-medium text-sm md:text-base leading-relaxed">
                    {thought}
                  </p>
                </motion.div>
              ))
            ) : (
              [
                "Você trabalha, vende, entrega… Mas quando vai olhar o dinheiro, nada fecha.",
                "Mistura o dinheiro do negócio com o da vida pessoal.",
                `"Não sabe se realmente está tendo lucro ou "achando que está"."`,
                "Chega no fim do mês sem saber para onde o dinheiro foi.",
                `"Depende de anotações soltas, planilhas complicadas ou “memória”."`,
                "Decide no escuro por falta de clareza financeira.",
                "Sente ansiedade só de abrir o extrato ou maquininha.",
                "Vive com a sensação de que o dinheiro some.",
                `"As contas não fecham e eu não sei onde está o erro."`,
              ].map((thought, idx) => (
                <motion.div
                  key={`pj-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white/10 border border-white/10 p-6 rounded-2xl flex items-start space-x-3.5 shadow-md hover:bg-white/15 hover:border-white/30 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center shrink-0 group-hover:shadow-lg transition-all duration-300">
                    <span className="text-xs font-extrabold font-jakarta">{idx + 1}</span>
                  </div>
                  <p className="text-white font-medium text-sm md:text-base leading-relaxed">
                    {thought}
                  </p>
                </motion.div>
              ))
            )}
          </div>

          <div className="text-center mt-16">
            <span className="font-jakarta text-sm font-bold text-white border border-white/20 inline-block px-6 py-2.5 rounded-full bg-white/10">
              Identificou-se com alguma dessas dores? O WeSix foi feito exatamente para você.
            </span>
          </div>

        </div>
      </section>

      {/* ---------------- 4. CORE BENEFITS & MATRIX COMPARISON SECTION ---------------- */}
      <section className="relative py-28 px-6 bg-[#FAF9FF] border-t border-b border-primary/5">
        <div className="max-w-7xl mx-auto w-full">

          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-bold text-primary tracking-wider uppercase mb-3 font-jakarta">
              Ferramentas de Sucesso
            </h2>
            <h3 className="font-jakarta text-3xl md:text-4xl font-extrabold tracking-tight text-text-navy leading-tight">
              Com o WeSix, você finalmente tem:
            </h3>
          </div>

          {/* 8 Feature Blocks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">

            <div className="bg-white border border-primary/5 p-8 rounded-3xl shadow-sm hover:border-primary/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h4 className="font-jakarta text-lg font-bold text-text-navy mb-3">Precificação completa</h4>
                <p className="text-text-gray font-inter text-xs leading-relaxed">
                  Cadastre seu serviço ou produto e o WeSix calcula tudo: Ele sugere o preço ideal e mostra seu lucro real por venda. Preço certo. Margem certa. Decisão certa.
                </p>
              </div>
            </div>

            <div className="bg-white border border-primary/5 p-8 rounded-3xl shadow-sm hover:border-primary/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Wallet className="w-5 h-5" />
                </div>
                <h4 className="font-jakarta text-lg font-bold text-text-navy mb-3">Fluxo de Caixa real</h4>
                <p className="text-text-gray font-inter text-xs leading-relaxed">
                  Saiba o que entrou, o que saiu, para onde foi, o que sobrou e qual categoria gastou mais. Fluxo diário, semanal e mensal com total clareza.
                </p>
              </div>
            </div>

            <div className="bg-white border border-primary/5 p-8 rounded-3xl shadow-sm hover:border-primary/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <ChartIcon className="w-5 h-5" />
                </div>
                <h4 className="font-jakarta text-lg font-bold text-text-navy mb-3">Indicadores do seu segmento</h4>
                <p className="text-text-gray font-inter text-xs leading-relaxed">
                  Compare seu negócio com a média do mercado. Saiba se você está acima, na média ou abaixo. Descubra onde pode melhorar.
                </p>
              </div>
            </div>

            <div className="bg-white border border-primary/5 p-8 rounded-3xl shadow-sm hover:border-primary/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-jakarta text-lg font-bold text-text-navy mb-3">Orçamento com alertas</h4>
                <p className="text-text-gray font-inter text-xs leading-relaxed">
                  Cadastre sua previsão de receita e despesa. O WeSix te avisa quando você estiver perto de estourar o orçamento. Controle diário. Zero sustos.
                </p>
              </div>
            </div>

            <div className="bg-white border border-primary/5 p-8 rounded-3xl shadow-sm hover:border-primary/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-jakarta text-lg font-bold text-text-navy mb-3">Contas a pagar e receber</h4>
                <p className="text-text-gray font-inter text-xs leading-relaxed">
                  Organize todas as contas. Receba notificações de vencimento e alertas automáticos de atrasos. Evite atrasos, juros e confusão.
                </p>
              </div>
            </div>

            <div className="bg-white border border-primary/5 p-8 rounded-3xl shadow-sm hover:border-primary/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Calendar className="w-5 h-5" />
                </div>
                <h4 className="font-jakarta text-lg font-bold text-text-navy mb-3">Pedidos e agendamentos</h4>
                <p className="text-text-gray font-inter text-xs leading-relaxed">
                  Registre tudo que vai entrar: serviços, atendimentos, pedidos e vendas. Veja quanto cada dia vai render antes mesmo de começar a trabalhar.
                </p>
              </div>
            </div>

            <div className="bg-white border border-primary/5 p-8 rounded-3xl shadow-sm hover:border-primary/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <ChartIcon className="w-5 h-5" />
                </div>
                <h4 className="font-jakarta text-lg font-bold text-text-navy mb-3">Relatórios automáticos</h4>
                <p className="text-text-gray font-inter text-xs leading-relaxed">
                  Gráficos descomplicados e resumos visuais que mostram o real desempenho do seu negócio sem que você precise entender de termos complexos.
                </p>
              </div>
            </div>

            <div className="bg-white border border-primary/5 p-8 rounded-3xl shadow-sm hover:border-primary/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-jakarta text-lg font-bold text-text-navy mb-3">Clareza total do dinheiro</h4>
                <p className="text-text-gray font-inter text-xs leading-relaxed">
                  Aba intuitiva para separar gastos da empresa e despesas da vida pessoal de forma 100% segura, com importações integradas.
                </p>
              </div>
            </div>

          </div>

          {/* Matrix comparison table */}
          <div className="bg-white border border-primary/5 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-[0_15px_40px_rgba(94,61,255,0.03)]">
            <h3 className="font-jakarta text-2xl font-bold text-text-navy text-center mb-8">
              Por que WeSix é diferente das ferramentas tradicionais?
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-primary/10 pb-4">
                    <th className="font-jakarta text-sm text-[#9A98AF] font-bold uppercase pb-4">Capacidade</th>
                    <th className="font-jakarta text-sm text-primary font-bold uppercase pb-4">Ecossistema WeSix PJ/PF</th>
                    <th className="font-jakarta text-sm text-[#9A98AF] font-bold uppercase pb-4">Bancos & Planilhas Antigas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5 font-inter text-sm text-text-gray">
                  <tr>
                    <td className="py-4 font-semibold text-text-navy">Precificação e Cálculo de Margens</td>
                    <td className="py-4 text-primary font-bold">
                      <div className="flex items-center">
                        <Check className="w-4 h-4 mr-1.5 shrink-0 text-primary" /> Automática com Lucro Real
                      </div>
                    </td>
                    <td className="py-4 text-text-gray">
                      <div className="flex items-center">
                        <X className="w-4 h-4 mr-1.5 shrink-0 text-red-500" /> Fórmulas manuais complexas
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 font-semibold text-text-navy">Separação Pessoal e Empresa</td>
                    <td className="py-4 text-primary font-bold">
                      <div className="flex items-center">
                        <Check className="w-4 h-4 mr-1.5 shrink-0 text-primary" /> Dividido de forma Visual
                      </div>
                    </td>
                    <td className="py-4 text-text-gray">
                      <div className="flex items-center">
                        <X className="w-4 h-4 mr-1.5 shrink-0 text-red-500" /> Contas e saldos misturados
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 font-semibold text-text-navy">Pedidos e Agendamentos</td>
                    <td className="py-4 text-primary font-bold">
                      <div className="flex items-center">
                        <Check className="w-4 h-4 mr-1.5 shrink-0 text-primary" /> Conectados ao Caixa
                      </div>
                    </td>
                    <td className="py-4 text-text-gray">
                      <div className="flex items-center">
                        <X className="w-4 h-4 mr-1.5 shrink-0 text-red-500" /> Cadernos e anotações soltas
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 font-semibold text-text-navy">Interface Clara e Descomplicada</td>
                    <td className="py-4 text-primary font-bold">
                      <div className="flex items-center">
                        <Check className="w-4 h-4 mr-1.5 shrink-0 text-primary" /> Feita para pessoas comuns
                      </div>
                    </td>
                    <td className="py-4 text-text-gray">
                      <div className="flex items-center">
                        <X className="w-4 h-4 mr-1.5 shrink-0 text-red-500" /> Gráficos cinzas e técnicos
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- 6. HOW WESIX WORKS (3 Steps) ---------------- */}
      <section className="relative py-28 px-6 bg-primary text-white overflow-hidden shadow-inner">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto w-full relative z-10">

          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-bold text-white/70 tracking-wider uppercase mb-3 font-jakarta">
              Metodologia MEI
            </h2>
            <h3 className="font-jakarta text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Como o WeSix Funciona
            </h3>
            <p className="text-white/80 text-sm font-jakarta mt-2">
              Em 3 passos, você sai da confusão para a clareza:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center text-lg font-bold font-jakarta mx-auto shadow-md">
                1
              </div>
              <h4 className="font-jakarta text-lg font-extrabold text-white">Registre suas entradas e saídas</h4>
              <p className="text-white/85 text-xs leading-relaxed font-medium">
                Pix, cartão, dinheiro vivo, maquininha: lance manualmente ou importe o extrato do seu banco de forma rápida em segundos.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center text-lg font-bold font-jakarta mx-auto shadow-md">
                2
              </div>
              <h4 className="font-jakarta text-lg font-extrabold text-white">O WeSix separa as suas contas</h4>
              <p className="text-white/85 text-xs leading-relaxed font-medium">
                Chega de misturar tudo. Você visualiza o que é da vida pessoal e o que é do negócio em abas dedicadas e separadas.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center text-lg font-bold font-jakarta mx-auto shadow-md">
                3
              </div>
              <h4 className="font-jakarta text-lg font-extrabold text-white">Veja quanto sobrou e qual o lucro</h4>
              <p className="text-white/85 text-xs leading-relaxed font-medium">
                Fluxo de caixa, relatórios automáticos, gráficos de custos fixos e variáveis e resumo de caixa na palma da mão.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/pricing"
              className="font-jakarta font-bold text-white bg-accent hover:bg-accent-dark shadow-[0_4px_15px_rgba(255,110,30,0.35)] px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center gap-2 border border-white/10"
            >
              <span>Criar minha conta grátis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-[10px] text-white/70 block mt-3 font-medium font-jakarta">
              Em menos de 10 minutos você já vê seu primeiro relatório.
            </span>
          </div>

        </div>
      </section>

      {/* ---------------- 7. BEFORE VS AFTER COMPARISON ---------------- */}
      <section className="relative py-28 px-6 bg-white text-text-navy border-t border-b border-primary/5">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto w-full relative z-10">

          <h3 className="font-jakarta text-3xl font-extrabold text-text-navy text-center mb-16">
            A Transformação Prometida
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#FAF9FF] border border-primary/5 p-8 md:p-12 rounded-3xl shadow-sm">

            <div className="space-y-6">
              <h4 className="font-jakarta text-xl font-black text-accent uppercase tracking-wider flex items-center gap-2">
                <X className="w-5 h-5 text-accent shrink-0" />
                Antes do WeSix
              </h4>
              <ul className="space-y-3 font-inter text-sm text-text-gray font-medium">
                {[
                  "Insegurança e ansiedade para abrir o extrato",
                  "Mistura de contas pessoais e profissionais",
                  "Falta de clareza sobre lucro e prejuízo",
                  "Planilhas complexas e anotações soltas",
                  `"Decisões guiadas por "achismo""`,
                  "Sensação de descontrole e culpa financeira",
                  "Sem saber se o negócio está realmente dando dinheiro"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-accent font-bold shrink-0 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 border-t md:border-t-0 md:border-l border-primary/10 pt-6 md:pt-0 md:pl-8">
              <h4 className="font-jakarta text-xl font-black text-primary uppercase tracking-wider flex items-center gap-2">
                <Check className="w-5 h-5 text-primary shrink-0" />
                Depois do WeSix
              </h4>
              <ul className="space-y-3 font-inter text-sm text-text-navy font-semibold">
                {[
                  "Clareza total do fluxo de caixa",
                  "Controle seguro do dinheiro, sem planilhas",
                  "Separação segura entre pessoal e profissional",
                  "Relatórios que mostram exatamente para onde vai cada real",
                  "Sensação de segurança, controle e tranquilidade",
                  "Decisões financeiras com total confiança",
                  "Vida financeira como ferramenta de realização, não estresse"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="text-center mt-12 space-y-4">
            <p className="text-text-gray font-inter text-sm max-w-md mx-auto leading-relaxed font-semibold">
              O WeSix transforma confusão em clareza, desorganização em controle e ansiedade financeira em tranquilidade.
            </p>
            <Link
              href="/pricing"
              className="font-jakarta font-bold text-white bg-accent hover:bg-accent-dark shadow-[0_4px_15px_rgba(255,110,30,0.25)] px-8 py-3.5 rounded-full transition-all duration-300 inline-flex items-center gap-2 border border-white/10 uppercase"
            >
              <span>Começar agora</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ---------------- 11. FINAL CALL TO ACTION ---------------- */}
      <section className="relative py-32 px-6 overflow-hidden bg-primary text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto w-full relative z-10 text-center space-y-10">
          <h3 className="font-jakarta text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Controle seu dinheiro.<br />Controle seu negócio.<br />Teste grátis por 7 dias.
          </h3>

          <div className="space-y-2 max-w-md mx-auto text-white/80 font-semibold font-inter text-sm md:text-base leading-relaxed">
            <p>Experimente ver seus números de verdade.</p>
            <p>Experimente sentir controle.</p>
            <p>Experimente ter tranquilidade financeira.</p>
          </div>

          <div className="pt-4">
            <Link
              href="/pricing"
              className="font-jakarta font-bold text-[#110B33] bg-white hover:bg-white/90 shadow-[0_4px_15px_rgba(255,255,255,0.15)] px-10 py-4 rounded-full transition-all duration-300 inline-flex items-center gap-2 border border-white/10 uppercase"
            >
              <span>Começar agora</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-[10px] text-white/60 block mt-3 font-semibold font-jakarta uppercase tracking-wider">
              Comece hoje. É grátis por 7 dias. Sem cartão. Sem complicação.
            </span>
          </div>

        </div>
      </section>

    </div>
  );
}
