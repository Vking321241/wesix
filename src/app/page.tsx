"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Sparkles, Clock, Eye, ChevronRight } from "lucide-react";
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

    // Always exclude featured post from the recent list (it's shown separately above)
    if (featuredPost && !searchQuery) {
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

      {/* ---------------- 1. BLOG EDITORIAL HEADER ---------------- */}
      <section className="relative px-6 pt-12 pb-12 border-b border-primary/10">
        <div className="max-w-7xl mx-auto w-full">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wider uppercase font-jakarta">
              Editorial WeSix
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-jakarta text-4xl md:text-5xl font-extrabold text-text-navy tracking-tight leading-tight mb-3"
          >
            Conteúdo para quem<br />
            <span className="text-primary">empreende de verdade.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-text-gray font-inter text-base leading-relaxed max-w-xl"
          >
            Gestão, finanças e crescimento para o pequeno empresário brasileiro. Publicações semanais sobre controle financeiro e decisões que fazem diferença no dia a dia.
          </motion.p>
        </div>
      </section>

      {/* ---------------- 2. DECORATIVE LIGHTS & BLOG INSIGHTS SECTION ---------------- */}
      <div className="relative w-full py-24 bg-[#FAF9FF]">
        {/* Decorative light lights */}
        <div className="absolute top-[10%] left-1/4 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-1/4 w-[400px] h-[400px] bg-accent/2 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* ---------------- FEATURED POST ---------------- */}
          {featuredPost && !searchQuery && (
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
