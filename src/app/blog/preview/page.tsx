"use client";

import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Link from "next/link";
import { ArrowLeft, Clock, AlertTriangle, Eye, Shield } from "lucide-react";
import { BlogPost } from "@/lib/mockData";

export default function BlogDraftPreviewPage() {
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("wesix_preview_post");
      if (stored) {
        try {
          setPost(JSON.parse(stored));
        } catch (e) {
          console.error("Erro ao carregar rascunho temporário", e);
        }
      }
    }
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-light-bg text-text-navy flex flex-col items-center justify-center pt-24 font-inter">
        <AlertTriangle className="w-10 h-10 text-accent mb-4 animate-float-medium" />
        <p className="font-jakarta text-xs uppercase tracking-widest text-text-gray font-bold">
          Nenhum rascunho de pré-visualização encontrado.
        </p>
        <p className="text-xs text-text-gray/70 mt-1 font-semibold">
          Abra o painel administrativo e clique em "Visualizar Rascunho".
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-light-bg text-text-gray pt-36 pb-24 overflow-hidden font-inter">
      {/* ---------------- PREVIEW WARNING BANNER ---------------- */}
      <div className="fixed top-[80px] left-0 right-0 z-40 bg-amber-500 text-white font-jakarta text-[10px] sm:text-xs font-bold tracking-widest py-3 px-6 text-center flex items-center justify-center gap-2 shadow-md uppercase select-none border-y border-amber-400/20">
        <Eye className="w-4 h-4 shrink-0 animate-pulse" />
        <span>Modo de Pré-visualização de Rascunho • Artigo não publicado oficialmente</span>
      </div>

      {/* Background spotlights */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Back Link & Info panel */}
        <div className="flex items-center justify-between mb-8 border-b border-primary/5 pb-4">
          <button
            onClick={() => typeof window !== "undefined" && window.close()}
            className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-dark transition-colors duration-300 gap-1.5 font-jakarta"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Fechar Visualização</span>
          </button>

          <span className="text-[10px] font-bold text-[#9A98AF] uppercase tracking-wider font-jakarta italic">
            Visualizador de Sandbox
          </span>
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
              {post.author.avatarUrl ? (
                <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/10">
                  <img src={post.author.avatarUrl} alt={post.author.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-xs font-black text-white uppercase font-jakarta shadow-inner">
                  {post.author.name.charAt(0)}
                </div>
              )}
              <div className="text-left">
                <span className="text-sm font-bold text-text-navy block">
                  {post.author.name}
                </span>
                <span className="text-[10px] text-text-gray block leading-none font-semibold">
                  {post.author.role}
                </span>
              </div>
            </div>

            {/* Read Time & Date */}
            <div className="flex items-center space-x-6 text-xs text-text-gray font-inter font-bold">
              <span>Rascunho de: {post.publishedAt}</span>
              <span className="hidden sm:inline text-primary/30">•</span>
              <span className="flex items-center gap-1 text-primary">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* ---------------- 2. ARTICLE MAIN HERO COVER IMAGE ---------------- */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden mb-16 shadow-lg border border-primary/5">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ---------------- 3. ARTICLE CONTENT BODY ---------------- */}
        <article className="prose prose-invert max-w-none mb-20 font-inter text-text-gray leading-relaxed text-base space-y-6 text-left">
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
            className="space-y-6 [&>p]:leading-relaxed [&>p]:mb-6 [&>h2]:text-text-navy [&>h2]:font-jakarta [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:pt-6 [&>h2]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:my-8 [&>blockquote]:text-text-gray [&>blockquote]:bg-[#FAF9FF] [&>blockquote]:py-3 [&>blockquote]:pr-4 [&>p>strong]:text-text-navy font-medium"
          />
        </article>

        {/* ---------------- 4. FOUNDER / AUTHOR MINI BIO ---------------- */}
        <div className="bg-[#FAF9FF] border border-primary/5 rounded-3xl p-8 mb-12 flex flex-col sm:flex-row gap-6 items-start shadow-sm text-left">
          {post.author.avatarUrl ? (
            <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/10 shrink-0">
              <img src={post.author.avatarUrl} alt={post.author.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent shrink-0 flex items-center justify-center text-sm font-black text-white uppercase font-jakarta">
              {post.author.name.charAt(0)}
            </div>
          )}
          <div>
            <span className="text-xs font-jakarta font-bold text-[#9A98AF] uppercase tracking-widest block mb-1">Escrito por</span>
            <h4 className="font-jakarta text-lg font-bold text-text-navy mb-2">{post.author.name}</h4>
            <p className="text-text-gray font-inter text-sm leading-relaxed mb-4 font-semibold">{post.author.bio}</p>
            <span className="text-[10px] text-text-gray font-bold uppercase tracking-widest flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
              Especialista Financeiro Autorizado WeSix
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
