"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Sparkles, Clock, ArrowRight, Eye, ChevronRight, Smartphone, Sliders, DollarSign, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { MOCK_POSTS, MOCK_CATEGORIES, BlogPost, Category } from "@/lib/mockData";

export default function BlogHomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [postViews, setPostViews] = useState<Record<string, number>>({});

  // 1. Load custom categories, posts and views on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load Posts
      let allPosts = [...MOCK_POSTS];
      const storedPosts = localStorage.getItem("wesix_custom_posts") || localStorage.getItem("wesix_posts");
      if (storedPosts) {
        try {
          const parsed = JSON.parse(storedPosts);
          // If storedPosts is wesix_posts it contains MOCK_POSTS, so filter out MOCK_POSTS duplicates
          const customOnly = parsed.filter((p: any) => p.id.startsWith("custom-"));
          allPosts = [...customOnly, ...MOCK_POSTS];
        } catch (e) {
          console.error("Erro ao carregar posts", e);
        }
      }
      setPosts(allPosts);

      // Load Categories
      let allCats = [...MOCK_CATEGORIES];
      const storedCats = localStorage.getItem("wesix_custom_categories");
      if (storedCats) {
        try {
          const parsed = JSON.parse(storedCats);
          allCats = [...MOCK_CATEGORIES, ...parsed];
        } catch (e) {
          console.error("Erro ao carregar categorias", e);
        }
      }
      setCategories(allCats);

      // Load Views
      const storedViews = localStorage.getItem("wesix_post_views");
      let viewsMap: Record<string, number> = {
        "erro-numero-um-mei-misturar-contas": 1240,
        "guia-precificacao-prestadores-servicos": 856
      };
      if (storedViews) {
        try {
          viewsMap = { ...viewsMap, ...JSON.parse(storedViews) };
        } catch (e) {
          console.error("Erro ao carregar visualizações", e);
        }
      }
      setPostViews(viewsMap);

      // Set Featured Post
      const feat = allPosts.find((p) => p.featured) || allPosts[0];
      setFeaturedPost(feat);
    }
  }, []);

  // 2. Real-time filtering based on category and search query
  useEffect(() => {
    let filtered = posts;

    // Filter by selected category (ignoring featured in recent list to prevent duplication)
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category.slug === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query)
      );
    }

    // Exclude featured post from the list if there's no active filter/search to keep layout clean
    if (featuredPost && !searchQuery && selectedCategory === "all") {
      filtered = filtered.filter((p) => p.id !== featuredPost.id);
    }

    setFilteredPosts(filtered);
  }, [posts, selectedCategory, searchQuery, featuredPost]);  return (
    <div className="relative w-full min-h-screen bg-light-bg text-text-gray pt-20 pb-0 overflow-hidden font-inter">
      {/* CSS custom keyframe style for marquee scrolling */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-scroll {
          display: flex;
          width: max-content;
          animation: marquee-scroll 35s linear infinite;
        }
        @keyframes glow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.5; }
        }
        .animate-glow {
          animation: glow 8s ease-in-out infinite;
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
        }
        @keyframes moving-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-moving-gradient {
          background-size: 200% auto;
          animation: moving-gradient 6s linear infinite;
        }
      `}} />

      {/* ---------------- 1. HERO SECTION (PURPLE) ---------------- */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center px-6 py-20 overflow-hidden bg-primary text-white">
        
        {/* Soft elegant background mesh spotlights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/5 rounded-full blur-[120px] pointer-events-none animate-glow" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 self-center lg:self-start backdrop-blur-md animate-float-fast"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span className="text-xs font-semibold text-white tracking-wider uppercase font-jakarta">
                WeSix Negócios & Finanças Pessoais
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-jakarta text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white"
            >
              Você sabe quanto ganhou esse mês?<br />
              <span className="bg-gradient-to-r from-accent via-[#FF9E66] to-accent bg-clip-text text-transparent animate-moving-gradient">
                Mas sabe para onde foi cada real?
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/90 font-inter text-lg md:text-xl max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium"
            >
              O WeSix organiza seu dinheiro, seus compromissos e tudo que te devem — em um app simples, sem planilhas, sem confusão e sem precisar ser especialista em finanças.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col items-center lg:items-start space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full">
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto font-jakarta font-bold text-center text-white bg-accent hover:bg-accent-dark shadow-[0_4px_20px_rgba(255,110,30,0.3)] hover:shadow-[0_4px_25px_rgba(255,110,30,0.55)] px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 group animate-float-fast"
                >
                  <span>Teste grátis por 7 dias</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  href="/features"
                  className="w-full sm:w-auto font-jakarta font-semibold text-center text-white bg-white/10 hover:bg-white/20 border border-white/15 px-8 py-4 rounded-full transition-all duration-300"
                >
                  Conhecer Recursos
                </Link>
              </div>

              {/* Sub CTA descriptions */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1 text-xs text-white/80 font-medium pt-1">
                <span>⚡ Comece em menos de 3 minutos</span>
                <span className="hidden sm:inline">•</span>
                <span>🔒 Sem cartão na criação da conta</span>
                <span className="hidden sm:inline">•</span>
                <span>✓ Cancele quando quiser</span>
              </div>
            </motion.div>

            {/* App Store / Google Play links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="pt-6 border-t border-white/10"
            >
              <p className="text-xs font-jakarta font-bold uppercase tracking-widest text-white/60 mb-3">
                Escolha sua loja e comece grátis
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a 
                  href="https://apps.apple.com/br/app/wesix-app/id6756078749" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-white/10 border border-white/10 px-4 py-2 rounded-xl hover:border-white/30 hover:bg-white/15 transition-all duration-300 shadow-sm"
                >
                  <Smartphone className="w-4 h-4 text-white shrink-0" />
                  <div className="text-left">
                    <span className="text-[8px] text-white/60 font-bold block leading-none">Baixar na</span>
                    <span className="text-[10px] font-bold text-white block leading-none mt-0.5">App Store</span>
                  </div>
                </a>
                <a 
                  href="https://play.google.com/store/apps/details?id=br.com.wesixapp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-white/10 border border-white/10 px-4 py-2 rounded-xl hover:border-white/30 hover:bg-white/15 transition-all duration-300 shadow-sm"
                >
                  <Smartphone className="w-4 h-4 text-white shrink-0" />
                  <div className="text-left">
                    <span className="text-[8px] text-white/60 font-bold block leading-none">Disponível no</span>
                    <span className="text-[10px] font-bold text-white block leading-none mt-0.5">Google Play</span>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Layout Interactive Mockups */}
          <div className="lg:col-span-5 relative h-[560px] w-full flex items-center justify-center">
            
            {/* Ambient blur backplates */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Central Mobile Mockup container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-[260px] h-[520px] bg-white rounded-[40px] border-[5px] border-[#EAE8FC] shadow-[0_20px_50px_rgba(94,61,255,0.06)] overflow-hidden flex flex-col justify-between p-3.5 animate-float-medium"
            >
              {/* iPhone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#EAE8FC] rounded-b-xl z-20" />

              {/* Phone Header */}
              <div className="pt-3 flex justify-between items-center z-10 text-[9px] text-[#9A98AF] font-bold">
                <span>9:41</span>
                <div className="flex space-x-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-primary font-jakarta">WeSix</span>
                </div>
              </div>

              {/* Phone Content Dashboard */}
              <div className="flex-grow pt-4 space-y-3.5">
                {/* Total profit */}
                <div className="bg-[#FAF9FF] p-3 rounded-lg border border-primary/5">
                  <div className="flex justify-between items-center text-left">
                    <span className="text-[7px] text-[#9A98AF] uppercase font-bold block">Lucro Real Empresa</span>
                    <span className="text-[8px] bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded font-bold font-jakarta">+18.5%</span>
                  </div>
                  <span className="text-lg font-black text-text-navy mt-0.5 block text-left">R$ 8.940,00</span>
                </div>

                {/* Simulated split tab */}
                <div className="grid grid-cols-2 gap-1.5 bg-[#FAF9FF] p-1 rounded-lg border border-primary/5 text-center">
                  <div className="bg-white rounded p-1.5 text-center text-[7px] font-bold text-primary shadow-sm border border-primary/5">
                    Pessoal
                  </div>
                  <div className="rounded p-1.5 text-center text-[7px] font-bold text-text-gray">
                    Empresa (PJ)
                  </div>
                </div>

                {/* Services/Orders item list */}
                <div className="space-y-1.5 text-left">
                  <span className="text-[7px] text-[#9A98AF] uppercase font-bold block">Faturamento do Dia</span>
                  
                  <div className="bg-white border border-primary/5 p-2 rounded-lg flex items-center justify-between text-[8px] shadow-sm">
                    <div>
                      <span className="font-bold text-text-navy block">Pedido #1042 — João</span>
                      <span className="text-text-gray block text-[6px]">14:00 - Concluído</span>
                    </div>
                    <span className="text-green-600 font-bold">+ R$ 350,00</span>
                  </div>

                  <div className="bg-white border border-primary/5 p-2 rounded-lg flex items-center justify-between text-[8px] shadow-sm">
                    <div>
                      <span className="font-bold text-text-navy block">Agendamento — Maria</span>
                      <span className="text-text-gray block text-[6px]">16:30 - Pendente</span>
                    </div>
                    <span className="text-[#9A98AF] font-bold">R$ 180,00</span>
                  </div>
                </div>

                {/* Budget alert tracker */}
                <div className="bg-[#FAF9FF] p-2.5 rounded-lg border border-primary/5 space-y-1 text-left">
                  <div className="flex justify-between items-center text-[7px] font-bold">
                    <span className="text-text-navy">Orçamento Mensal</span>
                    <span className="text-accent">R$ 4.200 / R$ 5.000</span>
                  </div>
                  <div className="w-full bg-[#EAE8FC] h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[84%]" />
                  </div>
                </div>
              </div>

              {/* Indicator */}
              <div className="w-16 h-0.5 bg-[#EAE8FC] rounded-full self-center mb-0.5 mt-1" />
            </motion.div>

            {/* FLOATING CARD 1 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[-20px] top-[140px] z-20 hidden sm:flex items-center space-x-3 bg-white border border-primary/10 p-3.5 rounded-xl shadow-md"
            >
              <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <Sliders className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-[8px] text-[#9A98AF] block font-bold font-jakarta uppercase">Margem de Venda</span>
                <span className="text-xs font-bold text-text-navy font-jakarta">Preço Sugerido: R$ 89,90</span>
              </div>
            </motion.div>

            {/* FLOATING CARD 2 */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute right-[-15px] bottom-[120px] z-20 hidden sm:flex items-center space-x-3 bg-white border border-primary/10 p-3.5 rounded-xl shadow-md"
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-[8px] text-[#9A98AF] block font-bold font-jakarta uppercase">Separação</span>
                <span className="text-xs font-bold text-text-navy font-jakarta">R$ 2.450 para Pessoal</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------- 2. DECORATIVE LIGHTS & BLOG INSIGHTS SECTION ---------------- */}
      <div className="relative w-full py-24 bg-[#FAF9FF]">
        {/* Decorative light lights */}
        <div className="absolute top-[10%] left-1/4 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-1/4 w-[400px] h-[400px] bg-accent/2 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* ---------------- BLOG PURPOSE BANNER ---------------- */}
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 animate-float-fast">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-bold text-primary tracking-wider uppercase font-jakarta">
                Editorial WeSix • Ideias e Insights
              </span>
            </div>

            <h2 className="font-jakarta text-4xl md:text-5xl font-extrabold text-text-navy tracking-tight leading-tight">
              Estratégias Financeiras Reais.
            </h2>

            <p className="text-text-gray font-inter text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
              O **WeSix** é a plataforma de gestão financeira que ajuda MEIs, autônomos e pequenos empreendedores a dominarem o fluxo de caixa, calcularem a precificação ideal e separarem o saldo PJ do Pessoal sem planilhas complexas. Bem-vindo ao nosso espaço de clareza e insights práticos!
            </p>
          </div>

          {/* ---------------- FEATURED POST ---------------- */}
          {featuredPost && !searchQuery && selectedCategory === "all" && (
            <div className="mb-24">
              <h2 className="text-xs font-bold text-[#9A98AF] uppercase tracking-widest mb-6 font-jakarta">Publicação em Destaque</h2>
              <article className="bg-white border border-primary/5 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 group shadow-sm hover:shadow-[0_15px_40px_rgba(94,61,255,0.04)] transition-all duration-300">
                <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden relative min-h-[300px]">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700 brightness-95"
                  />
                </div>

                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between text-left">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-xs text-text-gray font-semibold font-inter">
                      <span className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full font-bold uppercase tracking-wider text-primary">
                        {featuredPost.category.name}
                      </span>
                      <span>{featuredPost.publishedAt}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-bold text-text-navy">
                        <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    
                    <h3 className="font-jakarta text-2xl md:text-3xl font-extrabold text-text-navy group-hover:text-primary transition-colors duration-300 leading-snug">
                      <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                    </h3>
                    
                    <p className="text-text-gray font-inter text-sm leading-relaxed font-medium">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-primary/10 pt-6 mt-8">
                    <div className="flex items-center space-x-3">
                      {featuredPost.author.avatarUrl ? (
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-primary/10">
                          <img src={featuredPost.author.avatarUrl} alt={featuredPost.author.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-xs font-black text-white uppercase font-jakarta">
                          {featuredPost.author.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <span className="text-xs font-bold text-text-navy block">
                          {featuredPost.author.name}
                        </span>
                        <span className="text-[9px] text-text-gray block leading-none font-semibold">
                          {featuredPost.author.role}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="font-jakarta text-[11px] font-bold text-white bg-primary hover:bg-primary-dark px-4 py-2.5 rounded-full border border-white/10 transition-colors duration-300 flex items-center gap-1"
                    >
                      <span>Ler Artigo</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* ---------------- CATEGORIES & SEARCH BAR (EXACT DESIGN MATCH) ---------------- */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12 border-b border-primary/10 pb-8 text-left">
            {/* Categories select options list */}
            <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4.5 py-2.5 rounded-full font-jakarta text-xs font-bold tracking-wide transition-all duration-300 border ${
                    selectedCategory === cat.slug
                      ? "bg-primary text-white border-primary shadow-sm shadow-primary/15"
                      : "text-text-gray hover:text-primary bg-white border-primary/5 hover:border-primary/15 shadow-sm"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full md:max-w-xs self-start md:self-center">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-primary shrink-0" />
              <input
                type="text"
                placeholder="Buscar estratégias e termos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-primary/5 focus:border-primary/30 text-text-navy rounded-full py-3 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-300 placeholder:text-gray-400 font-bold"
              />
            </div>
          </div>

          {/* ---------------- RECENT POSTS LIST GRID ---------------- */}
          <div className="mb-24 text-left">
            {searchQuery || selectedCategory !== "all" ? (
              <h2 className="text-xs font-bold text-[#9A98AF] uppercase tracking-widest mb-8 font-jakarta">Resultados da Busca</h2>
            ) : (
              <h2 className="text-xs font-bold text-[#9A98AF] uppercase tracking-widest mb-8 font-jakarta">Publicações Recentes</h2>
            )}

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white border border-primary/5 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <Link href={`/blog/${post.slug}`} className="block overflow-hidden aspect-[16/10]">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 brightness-95"
                      />
                    </Link>

                    <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 text-[10px] text-text-gray font-bold font-inter">
                          <span className="text-primary uppercase tracking-wider">{post.category.name}</span>
                          <span>•</span>
                          <span>{post.publishedAt}</span>
                        </div>
                        
                        <h4 className="font-jakarta text-lg font-bold text-text-navy group-hover:text-primary transition-colors duration-300 leading-snug">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h4>
                        
                        <p className="text-text-gray font-inter text-xs leading-relaxed font-semibold line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-primary/5 pt-5 mt-6">
                        <div className="flex items-center space-x-2">
                          {post.author.avatarUrl ? (
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/10">
                              <img src={post.author.avatarUrl} alt={post.author.name} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-[10px] font-black text-white uppercase font-jakarta">
                              {post.author.name.charAt(0)}
                            </div>
                          )}
                          <span className="text-[11px] font-bold text-text-navy">{post.author.name}</span>
                        </div>

                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#9A98AF]">
                          <Eye className="w-3.5 h-3.5" />
                          {(postViews[post.slug] || 0).toLocaleString("pt-BR")}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-primary/5 rounded-3xl p-8">
                <p className="font-inter text-sm text-text-gray font-semibold italic">Nenhuma publicação encontrada para os critérios informados.</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ---------------- 5. INFINITE MARQUEE PROMOTIONAL BANNER ---------------- */}
      <div className="w-full overflow-hidden bg-accent text-white py-4.5 border-t border-white/10 select-none relative z-10">
        <div className="animate-marquee-scroll whitespace-nowrap">
          <span className="text-[11px] font-extrabold uppercase tracking-widest font-jakarta mx-4">
            WESIX: GESTÃO FINANCEIRA DESCOMPLICADA PARA AUTÔNOMOS • EXPERIMENTE GRÁTIS POR 7 DIAS • SEPARAÇÃO PESSOAL X PJ • ORGANIZE SEU CAIXA SEM PLANILHAS COMPLEXAS • PRECIFICAÇÃO INTELIGENTE DE PRODUTOS E SERVIÇOS • SUPORTE ESPECIALIZADO MEI • CONCILIADOR DE CONTAS • 
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-widest font-jakarta mx-4">
            WESIX: GESTÃO FINANCEIRA DESCOMPLICADA PARA AUTÔNOMOS • EXPERIMENTE GRÁTIS POR 7 DIAS • SEPARAÇÃO PESSOAL X PJ • ORGANIZE SEU CAIXA SEM PLANILHAS COMPLEXAS • PRECIFICAÇÃO INTELIGENTE DE PRODUTOS E SERVIÇOS • SUPORTE ESPECIALIZADO MEI • CONCILIADOR DE CONTAS • 
          </span>
        </div>
      </div>
    </div>
  );
}
