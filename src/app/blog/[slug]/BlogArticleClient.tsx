"use client";

import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Link from "next/link";
import { ArrowLeft, Clock, ArrowRight, Share2, Shield } from "lucide-react";
import { MOCK_POSTS, BlogPost } from "@/lib/mockData";

export default function BlogArticleClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [copied, setCopied] = useState(false);

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

    const currentPost = allPosts.find((p) => p.slug === slug);
    if (currentPost) {
      setPost(currentPost);
      const related = allPosts.filter(
        (p) => p.category.slug === currentPost.category.slug && p.id !== currentPost.id
      ).slice(0, 2);
      setRelatedPosts(related);

      // Registrar visualização (Pageview insight)
      if (typeof window !== "undefined") {
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
        viewsMap[slug] = (viewsMap[slug] || 0) + 1;
        localStorage.setItem("wesix_post_views", JSON.stringify(viewsMap));
      }
    }
  }, [slug]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-light-bg text-text-navy flex flex-col items-center justify-center pt-24">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
        <p className="font-jakarta text-xs uppercase tracking-widest text-text-gray font-bold">
          Carregando publicação estratégica...
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-light-bg text-text-gray pt-32 pb-24 overflow-hidden">
      
      {/* Background spotlights */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Back Link & Share panel */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-text-gray hover:text-primary transition-colors duration-300 gap-1.5 font-jakarta group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Voltar ao Editorial
          </Link>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 bg-white border border-primary/5 px-3 py-1.5 rounded-full text-xs font-bold text-text-gray hover:text-primary shadow-sm transition-all duration-300 font-jakarta"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "Link Copiado!" : "Compartilhar Estratégia"}</span>
          </button>
        </div>

        {/* ---------------- 1. ARTICLE HEADER ---------------- */}
        <header className="mb-12 text-center md:text-left">
          <span className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-primary font-jakarta mb-6 inline-block">
            {post.category.name}
          </span>
          
          <h1 className="font-jakarta text-3xl md:text-5xl lg:text-6xl font-extrabold text-text-navy tracking-tight leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-primary/10">
            {/* Author */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-xs font-black text-white uppercase font-jakarta shadow-inner">
                {post.author.name.charAt(0)}
              </div>
              <div className="text-left">
                <span className="text-sm font-bold text-text-navy block">
                  {post.author.name}
                </span>
                <span className="text-[10px] text-text-gray block leading-none font-medium">
                  {post.author.role}
                </span>
              </div>
            </div>

            {/* Read Time & Date */}
            <div className="flex items-center space-x-6 text-xs text-text-gray font-inter font-semibold">
              <span>Publicado: {post.publishedAt}</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* ---------------- 2. ARTICLE MAIN HERO COVER IMAGE ---------------- */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden mb-16 shadow-[0_15px_45px_rgba(94,61,255,0.03)] border border-primary/5">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ---------------- 3. ARTICLE CONTENT BODY ---------------- */}
        <article className="prose prose-invert max-w-none mb-20 font-inter text-text-gray leading-relaxed text-base space-y-6">
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
            className="space-y-6 [&>p]:leading-relaxed [&>p]:mb-6 [&>h2]:text-text-navy [&>h2]:font-jakarta [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:pt-6 [&>h2]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:my-8 [&>blockquote]:text-text-gray [&>blockquote]:bg-[#FAF9FF] [&>blockquote]:py-3 [&>blockquote]:pr-4 [&>p>strong]:text-text-navy"
          />
        </article>

        {/* ---------------- 4. INLINE CALL-TO-ACTION (CTA) CARD ---------------- */}
        <div className="bg-primary text-white border border-white/10 rounded-3xl p-8 md:p-12 mb-24 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-2 max-w-md text-center md:text-left">
            <h4 className="font-jakarta text-xl font-bold text-white">
              Crie Sua Sandbox Patrimonial Hoje Mesmo
            </h4>
            <p className="text-white/80 font-inter text-xs leading-relaxed">
              Vincule suas contas bancárias e corretoras com total segurança Plaid SOC2. Comece a gerenciar receitas em harmonia visual imediata.
            </p>
          </div>

          <Link
            href="/pricing"
            className="shrink-0 font-jakarta font-bold text-xs text-[#110B33] bg-white hover:bg-white/90 shadow-[0_4px_15px_rgba(255,255,255,0.15)] px-6 py-3.5 rounded-full transition-all duration-300 flex items-center gap-1 group border border-white/10 uppercase tracking-wider"
          >
            <span>Experimentar Sandbox</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
          </Link>
        </div>

        {/* ---------------- 5. FOUNDER / AUTHOR MINI BIO ---------------- */}
        <div className="bg-[#FAF9FF] border border-primary/5 rounded-3xl p-8 mb-24 flex flex-col sm:flex-row gap-6 items-start shadow-sm">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent shrink-0 flex items-center justify-center text-sm font-black text-white uppercase font-jakarta">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <span className="text-xs font-jakarta font-bold text-[#9A98AF] uppercase tracking-widest block mb-1">Escrito por</span>
            <h4 className="font-jakarta text-lg font-bold text-text-navy mb-2">{post.author.name}</h4>
            <p className="text-text-gray font-inter text-sm leading-relaxed mb-4">{post.author.bio}</p>
            <span className="text-[10px] text-text-gray font-bold uppercase tracking-widest flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-primary" />
              Especialista Patrimonial Verificado WeSix
            </span>
          </div>
        </div>

        {/* ---------------- 6. RELATED POSTS RECOMMENDATION ---------------- */}
        {relatedPosts.length > 0 && (
          <div className="border-t border-primary/10 pt-16">
            <h3 className="font-jakarta text-2xl font-bold text-text-navy mb-8">Outros Insights Recomendados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((rPost) => (
                <article
                  key={rPost.id}
                  className="bg-white border border-primary/5 rounded-3xl p-6 flex flex-col justify-between group h-full shadow-sm"
                >
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2 font-jakarta">
                      {rPost.category.name}
                    </span>
                    <h4 className="font-jakarta text-lg font-bold text-text-navy group-hover:text-primary transition-colors duration-300 mb-3 leading-snug">
                      <Link href={`/blog/${rPost.slug}`}>{rPost.title}</Link>
                    </h4>
                    <p className="text-text-gray font-inter text-xs leading-relaxed mb-4">
                      {rPost.excerpt}
                    </p>
                  </div>
                  
                  <Link
                    href={`/blog/${rPost.slug}`}
                    className="inline-flex items-center text-xs font-bold text-primary hover:text-primary-dark font-jakarta group gap-1"
                  >
                    <span>Ler Publicação</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
