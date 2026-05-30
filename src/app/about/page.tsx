"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Heart, Calendar, Compass, ShieldCheck } from "lucide-react";
import { getWesixConfig } from "@/lib/wesixConfig";

export default function AboutPage() {
  const { founderPhoto, siteName } = getWesixConfig();
  const brandName = siteName || 'WeSix';
  const TIMELINE_EVENTS = [
    {
      year: "2006",
      title: "O começo ao lado da família",
      description: "A jornada começou ao lado da mãe, administrando a fábrica de salgados da família. Em paralelo, Wellington trabalhava como estoquista e depois como vendedor. Desde o início, empreendedorismo e trabalho duro andaram juntos. A semente estava plantada."
    },
    {
      year: "2008",
      title: "Aprendendo por dentro do negócio",
      description: "Passou a trabalhar como frentista e depois como caixa. Cada função nova era uma aula prática de como um negócio funciona por dentro. A experiência no caixa foi o primeiro contato real com controle financeiro no dia a dia."
    },
    {
      year: "2011",
      title: "A porta do financeiro se abre",
      description: "Uma oportunidade no posto de combustível onde trabalhava como frentista abriu espaço para o caixa e depois para o administrativo financeiro. Wellington foi crescendo dentro da empresa, acumulando conhecimento sobre gestão, fluxo de caixa e rotinas financeiras. A mão do Senhor já estava direcionando cada passo."
    },
    {
      year: "2014",
      title: "A grande virada",
      description: "Sem o perfil formal exigido, Wellington recebeu a oportunidade de assumir o setor financeiro de uma grande distribuidora de equipamentos de segurança, responsável por 3 lojas no estado. Em termos humanos, a conta não fechava. Mas foi Deus quem abriu essa porta, e foi nela que Wellington se formou de verdade como gestor financeiro. Ficou até 2018, saindo como supervisor financeiro."
    },
    {
      year: "2018",
      title: "O risco do empreendimento próprio",
      description: "Em março de 2018, abriu uma marmitaria de delivery. O negócio avançava bem até a greve dos caminhoneiros paralisar as entregas. Sem entregadores e com o caixa no limite, tomou a decisão difícil de fechar as portas em setembro. A primeira empresa própria durou seis meses. A dor foi grande, mas a lição foi maior."
    },
    {
      year: "2019",
      title: "Uma nova porta num momento de fragilidade",
      description: "Após a falência da marmitaria, num momento de fragilidade emocional, Deus abriu uma porta em uma distribuidora de alimentos. Logo em seguida, o mesmo posto de combustível onde havia começado em 2011 fez uma proposta: gerenciar as 3 unidades da rede. A história se repetia em um nível maior."
    },
    {
      year: "2020",
      title: "Gerente e Controller",
      description: "Assumiu o cargo de gerente financeiro e controller do grupo de postos, com responsabilidade total sobre as 3 unidades. Mais uma vez, assim como na distribuidora, eram 3 operações sob sua gestão. Não era coincidência. Era preparação."
    },
    {
      year: "2021",
      title: "O encontro com o restaurante",
      description: "Ainda no posto, Wellington começou a prestar BPO financeiro para um restaurante de culinária japonesa em Palmas. Ali conheceu de perto a operação e as finanças do negócio, e sua esposa esteve ao lado em cada etapa, como em toda a jornada."
    },
    {
      year: "2022",
      title: "A decisão de arrendar",
      description: "Recebeu uma proposta para arrendar o restaurante de culinária japonesa. Saiu do posto e assumiu o restaurante. Mais uma vez a mão do Senhor se manifestando numa virada que não estava nos planos humanos."
    },
    {
      year: "2023",
      title: "O restaurante próprio",
      description: "Comprou o restaurante em sociedade com a mãe, que sempre esteve presente desde a fábrica de salgados lá em 2006. A família, que foi o ponto de partida, voltava a ser o centro do negócio. A esposa, companheira de toda a trajetória, seguiu ao lado em cada decisão."
    },
    {
      year: "2024",
      title: "A crise e a virada",
      description: "Uma crise que afetou vários negócios de alimentação pressionou o restaurante. Foi nesse período que Wellington percebeu que precisava de uma fonte de renda menos vulnerável."
    },
    {
      year: "2025",
      title: "O chamado do WeSix",
      description: "Em outubro de 2025, a caminho do restaurante, Deus colocou no seu coração o modelo do WeSix com clareza. Cada experiência anterior, o caixa do posto, o financeiro da distribuidora, a falência da marmitaria, os 3 postos, o restaurante de culinária japonesa, havia sido uma preparação. Nada foi por acaso. Wellington começou a desenhar e construir."
    },
    {
      year: "2026",
      title: "WeSix no ar",
      description: "Em abril de 2026, o WeSix foi lançado nas lojas. Mais de 500 downloads. O app completo do pequeno empresário brasileiro chegou ao mercado."
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-light-bg text-text-gray pt-32 pb-24 overflow-hidden">
      
      {/* Glow spotlights */}
      <div className="absolute top-[15%] right-10 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-10 w-[300px] h-[300px] bg-accent/2 rounded-full blur-[100px] pointer-events-none" />

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
              Nossa História
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-jakarta text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-navy tracking-tight leading-tight mb-6"
          >
            Construído por quem viveu o problema na própria pele
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-gray font-inter text-lg md:text-xl leading-relaxed font-semibold max-w-2xl mx-auto"
          >
            O WeSix não nasceu numa aceleradora nem numa sala de reunião. Nasceu de quase 20 anos de experiência real com gestão, finanças, erros e recomeços, e de uma convicção: Deus estava preparando o caminho.
          </motion.p>
        </div>

        {/* ---------------- 1. CORE STORY LAYOUT ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-36">
          
          {/* Left Column Profile Card */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
            <div className="relative border border-primary/10 rounded-3xl overflow-hidden aspect-[3/4] w-full max-w-sm shadow-md">
              {founderPhoto ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={founderPhoto} alt="Foto do Fundador" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="text-xs font-bold tracking-widest text-white/80 uppercase mb-1 font-jakarta block">👤 Perfil do Fundador</span>
                    <h4 className="font-jakarta text-3xl font-extrabold text-white leading-none mb-1">Wellington</h4>
                    <span className="text-sm text-accent font-jakarta font-bold block mb-1">Fundador do {brandName}</span>
                    <span className="text-xs text-white/70 font-inter font-bold">@eusouowellington</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-primary/15 via-[#FAF9FF] to-accent/15 flex flex-col justify-end p-8">
                  <div className="absolute top-8 left-8 w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center text-3xl font-black font-jakarta shadow-lg">
                    W
                  </div>
                  <span className="text-xs font-bold tracking-widest text-primary uppercase mb-1 font-jakarta">👤 Perfil do Fundador</span>
                  <h4 className="font-jakarta text-3xl font-extrabold text-text-navy leading-none mb-1">Wellington</h4>
                  <span className="text-sm text-primary font-jakarta font-bold block mb-1">Fundador do {brandName}</span>
                  <span className="text-xs text-text-gray font-inter font-bold">@eusouowellington</span>
                </div>
              )}
            </div>
            
            <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-sm space-y-4">
              <h5 className="font-jakarta text-base font-bold text-text-navy flex items-center gap-2">
                <Compass className="w-5 h-5 text-accent" />
                Origem & Experiência
              </h5>
              <p className="text-text-gray text-xs leading-relaxed font-medium">
                Empreendedor desde 2006. Passou por fábrica de salgados, posto de combustível, distribuidoras, marmitaria e restaurante antes de criar o WeSix.
              </p>
              <p className="text-text-gray text-xs leading-relaxed font-medium">
                Em cada etapa, sentiu na pele a dificuldade de gerir negócio e vida financeira sem uma ferramenta que fosse simples e completa ao mesmo tempo. O WeSix é o app que ele mesmo precisou e nunca encontrou.
              </p>
            </div>

            {/* Why WeSix Pillar */}
            <div className="bg-[#FAF9FF] border border-primary/10 rounded-2xl p-6 shadow-sm space-y-3">
              <h5 className="font-jakarta text-base font-bold text-primary flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Por que WeSix?
              </h5>
              <p className="text-text-gray text-xs leading-relaxed font-semibold">
                O nome WeSix significa **nós seis**. Uma referência direta à família: Wellington, sua esposa e seus quatro filhos. O app nasceu para o empreendedor, mas carrega dentro do nome o motivo pelo qual vale a pena empreender.
              </p>
            </div>
          </div>

          {/* Right Column Timeline */}
          <div className="lg:col-span-8 space-y-12">
            <div className="border-b border-primary/10 pb-6 mb-4">
              <h3 className="font-jakarta text-2xl font-bold text-text-navy leading-tight">
                A jornada até o WeSix
              </h3>
              <p className="text-text-gray text-sm font-jakarta mt-1">
                Uma trajetória moldada por trabalho, resiliência e propósito.
              </p>
            </div>
            
            {/* Visual Timeline wrapper */}
            <div className="relative border-l-2 border-primary/20 pl-8 ml-4 space-y-12">
              {TIMELINE_EVENTS.map((event, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="relative group"
                >
                  {/* Bullet indicator with year inside */}
                  <span className="absolute left-[-48px] top-1.5 w-8 h-8 rounded-xl bg-white border-2 border-primary text-[10px] font-black text-primary font-jakarta flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {event.year.slice(2)}
                  </span>
                  
                  {/* Timeline card content */}
                  <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-sm hover:border-primary/20 hover:shadow-md transition-all duration-300 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-black font-jakarta text-accent uppercase tracking-widest bg-accent/5 px-2.5 py-1 rounded-md">
                        Ano {event.year}
                      </span>
                    </div>
                    <h4 className="font-jakarta text-lg font-bold text-text-navy group-hover:text-primary transition-colors duration-300">
                      {event.title}
                    </h4>
                    <p className="text-text-gray font-inter text-xs md:text-sm leading-relaxed font-semibold">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- 2. MISSION BANNER ---------------- */}
        <div className="bg-primary text-white border border-white/10 rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-xl relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <span className="text-[10px] font-extrabold tracking-widest text-accent uppercase bg-white/15 px-3 py-1 rounded-full inline-block">
              Nossa Missão
            </span>
            <h3 className="font-jakarta text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
              Dar ao pequeno empresário brasileiro o controle que ele merece sobre o próprio negócio e a própria vida financeira, com um app simples, completo e feito para a realidade de quem trabalha de verdade.
            </h3>
            <div className="pt-4">
              <Link
                href="/pricing"
                className="font-jakarta font-bold text-[#110B33] bg-white hover:bg-white/90 shadow-[0_4px_15px_rgba(255,255,255,0.15)] px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center gap-2 group border border-white/10"
              >
                <span>Conhecer Planos WeSix</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
