"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, ChevronRight, Bookmark, Clock, ArrowRight } from "lucide-react";
import { MOCK_POSTS, MOCK_CATEGORIES } from "@/lib/mockData";

export default function BlogDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [posts, setPosts] = useState(MOCK_POSTS);

  // Filtro dinâmico com base na busca e categorias
  useEffect(() => {
    let allPosts = [...MOCK_POSTS];
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("wesix_custom_posts");
      if (stored) {
        try {
          const custom = JSON.parse(stored);
          allPosts = [...custom, ...allPosts];
        } catch (e) {
          console.error("Erro ao carregar posts locais", e);
        }
      }
    }

    let filtered = allPosts;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category.slug === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query)
      );
    }

    setPosts(filtered);
  }, [searchQuery, selectedCategory]);

  const [featuredPost, setFeaturedPost] = useState<any>(null);
  useEffect(() => {
    let allPosts = [...MOCK_POSTS];
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("wesix_custom_posts");
      if (stored) {
        try {
          const custom = JSON.parse(stored);
          allPosts = [...custom, ...allPosts];
        } catch (e) {
          console.error("Erro ao carregar posts locais", e);
        }
      }
    }
    const feat = allPosts.find((post) => post.featured);
    setFeaturedPost(feat);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-light-bg text-text-gray pb-24 overflow-hidden">

      {/* ---------------- BLOG HEADER EDITORIAL ---------------- */}
      <div className="pt-32 pb-12 px-6 border-b border-primary/10">
        <div className="max-w-7xl mx-auto">
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

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-jakarta text-4xl md:text-5xl font-extrabold text-text-navy tracking-tight leading-tight mb-3"
              >
                Conteúdo para quem<br />
                <span className="text-primary">empreende de verdade</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-text-navy font-jakarta text-lg font-semibold mb-2 max-w-xl"
              >
                Gestão, finanças e crescimento para o pequeno empresário brasileiro
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-text-gray font-inter text-base leading-relaxed max-w-xl"
              >
                Publicações semanais sobre controle financeiro, organização do negócio e decisões que fazem diferença no dia a dia.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Background spotlights for content area */}
      <div className="absolute top-[60%] left-1/4 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-1/4 w-[400px] h-[400px] bg-accent/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-16">

        {/* ---------------- FEATURED POST AREA (Destaque) ---------------- */}
        {featuredPost && !searchQuery && (
          <div className="mb-24">
            <h2 className="text-xs font-bold text-text-gray uppercase tracking-widest mb-6 font-jakarta">Publicação em Destaque</h2>
            <article className="bg-white border border-primary/5 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 group shadow-[0_15px_40px_rgba(94,61,255,0.03)]">
              <div className="lg:col-span-7 aspect-[16/10] overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 brightness-95"
                />
              </div>

              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 text-xs text-text-gray mb-6 font-inter">
                    <span className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full font-bold uppercase tracking-wider text-primary">
                      {featuredPost.category.name}
                    </span>
                    <span>{featuredPost.publishedAt}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold text-text-navy">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  
                  <h3 className="font-jakarta text-3xl font-extrabold text-text-navy group-hover:text-primary transition-colors duration-300 mb-4 leading-snug">
                    <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h3>
                  <p className="text-text-gray font-inter text-sm leading-relaxed mb-8">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-primary/10 pt-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-xs font-black text-white uppercase font-jakarta">
                      {featuredPost.author.name.charAt(0)}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-text-navy block">
                        {featuredPost.author.name}
                      </span>
                      <span className="text-[10px] text-text-gray block leading-none font-medium">
                        {featuredPost.author.role}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="font-jakarta text-xs font-bold text-white bg-primary hover:bg-primary-dark px-4 py-2.5 rounded-full border border-white/10 transition-colors duration-300 flex items-center gap-1"
                  >
                    <span>Ler Artigo</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* ---------------- 2. SEARCH & FILTER DIRECTORY BAR ---------------- */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12 border-b border-primary/10 pb-8">
          {/* Categories select */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
            {MOCK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full font-jakarta text-xs font-semibold tracking-wider transition-all duration-300 ${
                  selectedCategory === cat.slug
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-text-gray hover:text-primary bg-white border border-primary/5 shadow-sm"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Keyword Search Input */}
          <div className="relative w-full md:max-w-xs self-start md:self-center">
            <Search className="absolute left-3 top-3 w-4 h-4 text-primary/60" />
            <input
              type="text"
              placeholder="Buscar estratégias e termos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-primary/5 focus:border-primary/45 text-text-navy rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all duration-300 placeholder:text-gray-400 font-medium"
            />
          </div>
        </div>

        {/* ---------------- 3. ARTICLES DIRECTORY GRID ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {posts.map((post) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-primary/5 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-[0_10px_35px_rgba(94,61,255,0.02)]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 border border-primary/5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-primary backdrop-blur-md shadow-sm">
                    {post.category.name}
                  </span>
                </div>

                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-3 text-xs text-text-gray mb-4 font-inter">
                      <span>{post.publishedAt}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h4 className="font-jakarta text-xl font-bold text-text-navy group-hover:text-primary transition-colors duration-300 mb-3 leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h4>
                    <p className="text-text-gray font-inter text-xs leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-primary/10 pt-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-[10px] font-black text-white uppercase font-jakarta">
                        {post.author.name.charAt(0)}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-text-navy block leading-none mb-0.5">
                          {post.author.name}
                        </span>
                        <span className="text-[10px] text-text-gray block leading-none">
                          {post.author.role}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="w-8 h-8 rounded-full bg-[#FAF9FF] border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          {posts.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <Bookmark className="w-12 h-12 text-primary/30 mb-4 animate-bounce" />
              <p className="font-jakarta text-text-navy font-bold uppercase tracking-wider text-center">
                Nenhuma publicação encontrada
              </p>
              <p className="text-text-gray text-xs mt-1 text-center">
                Tente ajustar os termos ou filtros de sua pesquisa.
              </p>
            </div>
          )}
        </div>

        {/* ---------------- 4. NEWSLETTER PROMOTION BANNER ---------------- */}
        <div className="mt-36 bg-primary text-white border border-white/10 rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-xl">
          <h3 className="font-jakarta text-3xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Estratégias diretamente no seu e-mail.
          </h3>
          <p className="text-white/80 font-inter text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Una-se a mais de 15.000 portfolio designers. Inscreva-se pelo rodapé e receba informativos semanais todos os domingos de manhã.
          </p>
          <div className="max-w-md mx-auto">
            <Link
              href="/"
              className="font-jakarta font-bold text-[#110B33] bg-white hover:bg-white/90 shadow-[0_4px_15px_rgba(255,255,255,0.15)] px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center gap-2 group border border-white/10"
            >
              <span>Ir para Assinatura</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
