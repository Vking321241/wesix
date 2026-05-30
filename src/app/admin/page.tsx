"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Lock, 
  Unlock, 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  ArrowLeft, 
  LogOut, 
  Sparkles, 
  Image as ImageIcon, 
  FileText, 
  Check, 
  X,
  AlertCircle,
  HelpCircle,
  Bold,
  Italic,
  Heading2,
  Quote,
  List,
  Eye
} from "lucide-react";
import { MOCK_POSTS, MOCK_CATEGORIES, MOCK_AUTHORS, BlogPost, Category, Author } from "@/lib/mockData";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const customPosts = posts.filter(post => post.id.startsWith("custom-"));
  const [activeForm, setActiveForm] = useState<"list" | "create" | "edit">("list");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("strategy");
  const [selectedAuthorId, setSelectedAuthorId] = useState("wellington");
  const [publishedAt, setPublishedAt] = useState("");
  const [readTime, setReadTime] = useState("");
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);
  const [formError, setFormError] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  // Author Management states
  const [authors, setAuthors] = useState<Record<string, Author>>({});
  const [newAuthorName, setNewAuthorName] = useState("");
  const [newAuthorRole, setNewAuthorRole] = useState("");
  const [newAuthorAvatar, setNewAuthorAvatar] = useState("");
  const [newAuthorBio, setNewAuthorBio] = useState("");
  const [authorFormError, setAuthorFormError] = useState("");
  const [postViews, setPostViews] = useState<Record<string, number>>({});

  // Category Management states
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryFormError, setCategoryFormError] = useState("");

  // Load posts and authors from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Posts loader
      let activePostsList = [...MOCK_POSTS];
      const storedCustomPosts = localStorage.getItem("wesix_custom_posts");
      const storedPosts = localStorage.getItem("wesix_posts");

      if (storedCustomPosts) {
        try {
          const custom = JSON.parse(storedCustomPosts);
          activePostsList = [...custom, ...MOCK_POSTS];
        } catch (e) {
          console.error("Erro ao carregar posts customizados locais", e);
        }
      } else if (storedPosts) {
        try {
          activePostsList = JSON.parse(storedPosts);
        } catch (e) {
          console.error("Erro ao carregar posts locais", e);
        }
      }
      localStorage.setItem("wesix_posts", JSON.stringify(activePostsList));
      const justCustom = activePostsList.filter(p => p.id.startsWith("custom-"));
      localStorage.setItem("wesix_custom_posts", JSON.stringify(justCustom));
      setPosts(activePostsList);

      // 2. Authors loader
      let activeAuthorsMap = { ...MOCK_AUTHORS };
      const storedCustomAuthors = localStorage.getItem("wesix_custom_authors");
      const storedAuthors = localStorage.getItem("wesix_authors");

      if (storedCustomAuthors) {
        try {
          const custom = JSON.parse(storedCustomAuthors);
          activeAuthorsMap = { ...MOCK_AUTHORS, ...custom };
        } catch (e) {
          console.error("Erro ao carregar autores customizados locais", e);
        }
      } else if (storedAuthors) {
        try {
          activeAuthorsMap = JSON.parse(storedAuthors);
        } catch (e) {
          console.error("Erro ao carregar autores locais", e);
        }
      }
      localStorage.setItem("wesix_authors", JSON.stringify(activeAuthorsMap));
      const justCustomAuths: Record<string, Author> = {};
      Object.keys(activeAuthorsMap).forEach(k => {
        if (k !== "wellington" && k !== "sofia") {
          justCustomAuths[k] = activeAuthorsMap[k];
        }
      });
      localStorage.setItem("wesix_custom_authors", JSON.stringify(justCustomAuths));
      setAuthors(activeAuthorsMap);

      // 2.3 Categories loader
      let activeCatsList = [...MOCK_CATEGORIES];
      const storedCustomCats = localStorage.getItem("wesix_custom_categories");
      if (storedCustomCats) {
        try {
          const parsed = JSON.parse(storedCustomCats);
          activeCatsList = [...MOCK_CATEGORIES, ...parsed];
        } catch (e) {
          console.error("Erro ao carregar categorias locais", e);
        }
      }
      setCategories(activeCatsList);

      // 3. Views loader
      const storedViews = localStorage.getItem("wesix_post_views");
      let viewsMap: Record<string, number> = {
        "erro-numero-um-mei-misturar-contas": 1240,
        "guia-precificacao-prestadores-servicos": 856
      };
      if (storedViews) {
        try {
          viewsMap = { ...viewsMap, ...JSON.parse(storedViews) };
        } catch (e) {
          console.error("Erro ao carregar visualizações locais", e);
        }
      }
      setPostViews(viewsMap);
    }
  }, []);

  // Synchronize editor innerHTML on form active switch or load
  useEffect(() => {
    if ((activeForm === "create" || activeForm === "edit") && editorRef.current) {
      if (editorRef.current.innerHTML !== content) {
        editorRef.current.innerHTML = content;
      }
    }
  }, [activeForm, editingPost, content]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminKey = process.env.NEXT_PUBLIC_ADMIN_KEY;
    if (adminKey && password === adminKey) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Senha incorreta. Tente novamente.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleAddAuthor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthorName || !newAuthorRole || !newAuthorBio || !newAuthorAvatar) {
      setAuthorFormError("Por favor, preencha todos os campos obrigatórios (*).");
      return;
    }

    const generatedId = "author-" + newAuthorName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    
    if (authors[generatedId]) {
      setAuthorFormError("Já existe um autor cadastrado com este nome.");
      return;
    }

    const newAuthor: Author = {
      id: generatedId,
      name: newAuthorName,
      role: newAuthorRole,
      avatarUrl: newAuthorAvatar,
      bio: newAuthorBio
    };

    const updatedAuthors = {
      ...authors,
      [generatedId]: newAuthor
    };
    
    if (typeof window !== "undefined") {
      localStorage.setItem("wesix_authors", JSON.stringify(updatedAuthors));
      
      // Sync to wesix_custom_authors
      const customAuths: Record<string, Author> = {};
      Object.keys(updatedAuthors).forEach(k => {
        if (k !== "wellington" && k !== "sofia") {
          customAuths[k] = updatedAuthors[k];
        }
      });
      localStorage.setItem("wesix_custom_authors", JSON.stringify(customAuths));
    }
    setAuthors(updatedAuthors);

    setNewAuthorName("");
    setNewAuthorRole("");
    setNewAuthorAvatar("");
    setNewAuthorBio("");
    setAuthorFormError("");
  };

  const handleDeleteAuthor = (id: string) => {
    if (confirm("Tem certeza de que deseja excluir este autor? Essa ação não pode ser desfeita.")) {
      const updatedAuthors = { ...authors };
      delete updatedAuthors[id];
      
      if (typeof window !== "undefined") {
        localStorage.setItem("wesix_authors", JSON.stringify(updatedAuthors));
        
        // Sync to wesix_custom_authors
        const customAuths: Record<string, Author> = {};
        Object.keys(updatedAuthors).forEach(k => {
          if (k !== "wellington" && k !== "sofia") {
            customAuths[k] = updatedAuthors[k];
          }
        });
        localStorage.setItem("wesix_custom_authors", JSON.stringify(customAuths));
      }
      setAuthors(updatedAuthors);

      if (selectedAuthorId === id) {
        setSelectedAuthorId("wellington");
      }
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName) {
      setCategoryFormError("Por favor, preencha o nome da categoria.");
      return;
    }
    const generatedSlug = newCategoryName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (categories.some(c => c.slug === generatedSlug)) {
      setCategoryFormError("Já existe uma categoria cadastrada com este nome.");
      return;
    }

    const newCat: Category = {
      id: "cat-" + Date.now(),
      name: newCategoryName,
      slug: generatedSlug
    };

    const updated = [...categories, newCat];
    setCategories(updated);
    if (typeof window !== "undefined") {
      const custom = updated.filter(c => c.id.startsWith("cat-"));
      localStorage.setItem("wesix_custom_categories", JSON.stringify(custom));
    }
    setNewCategoryName("");
    setCategoryFormError("");
  };

  const handleDeleteCategory = (catId: string) => {
    if (catId === "all" || catId === "strategy" || catId === "cashflow" || catId === "lifestyle" || catId === "product") {
      alert("Categorias padrão do sistema não podem ser excluídas.");
      return;
    }
    if (confirm("Tem certeza de que deseja excluir esta categoria? Essa ação não pode ser desfeita.")) {
      const updated = categories.filter(c => c.id !== catId);
      setCategories(updated);
      if (typeof window !== "undefined") {
        const custom = updated.filter(c => c.id.startsWith("cat-"));
        localStorage.setItem("wesix_custom_categories", JSON.stringify(custom));
      }
      if (selectedCategorySlug === catId) {
        setSelectedCategorySlug("strategy");
      }
    }
  };

  const handlePreviewPost = () => {
    const finalContent = editorRef.current?.innerHTML || "";
    const categoryObj = categories.find(c => c.slug === selectedCategorySlug) || categories[1];
    const authorObj = authors[selectedAuthorId] || authors.wellington;
    const generatedSlug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const tempPost: BlogPost = {
      id: "preview-temp",
      title: title || "Rascunho de Artigo",
      slug: generatedSlug || "preview-temp",
      excerpt: excerpt || "Resumo temporário...",
      content: finalContent || "Corpo do artigo...",
      coverImage: coverImage || "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200",
      publishedAt: publishedAt || new Date().toISOString().split('T')[0],
      readTime: readTime || "5 min de leitura",
      category: categoryObj,
      author: authorObj,
      featured: featured,
      tags: []
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("wesix_preview_post", JSON.stringify(tempPost));
      window.open("/blog/preview", "_blank");
    }
  };

  const execEditorCommand = (command: string, value: string = "") => {
    if (typeof window !== "undefined") {
      document.execCommand(command, false, value);
      if (editorRef.current) {
        setContent(editorRef.current.innerHTML);
      }
    }
  };

  const handleEditorInput = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerHTML);
  };

  const resetForm = () => {
    setTitle("");
    setExcerpt("");
    setContent("");
    setCoverImage("");
    setSelectedCategorySlug("strategy");
    setSelectedAuthorId("wellington");
    setPublishedAt(new Date().toISOString().split('T')[0]);
    setReadTime("5 min de leitura");
    setTags("MEI, Finanças");
    setFeatured(false);
    setFormError("");
    setEditingPost(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const finalContent = editorRef.current?.innerHTML || "";
    if (!title || !excerpt || !finalContent || finalContent === "<br>" || !coverImage) {
      setFormError("Por favor, preencha todos os campos obrigatórios (*).");
      return;
    }

    const generatedSlug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check if slug is duplicated
    if (posts.some(p => p.slug === generatedSlug)) {
      setFormError("Já existe uma publicação com este título (slug duplicado).");
      return;
    }

    const categoryObj = MOCK_CATEGORIES.find(c => c.slug === selectedCategorySlug) || MOCK_CATEGORIES[1];
    const authorObj = authors[selectedAuthorId] || authors.wellington;

    const newPost: BlogPost = {
      id: "custom-" + Date.now(),
      title,
      slug: generatedSlug,
      excerpt,
      content: finalContent,
      coverImage,
      publishedAt,
      readTime,
      category: categoryObj,
      author: authorObj,
      featured,
      tags: tags.split(",").map(t => t.trim()).filter(t => t.length > 0)
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("wesix_posts", JSON.stringify(updated));
      const custom = updated.filter(p => p.id.startsWith("custom-"));
      localStorage.setItem("wesix_custom_posts", JSON.stringify(custom));
    }

    setActiveForm("list");
    resetForm();
  };

  const handleEditClick = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setCoverImage(post.coverImage);
    setSelectedCategorySlug(post.category.slug);
    // Find author key
    const authorKey = Object.keys(authors).find(k => authors[k].name === post.author.name) || "wellington";
    setSelectedAuthorId(authorKey);
    setPublishedAt(post.publishedAt);
    setReadTime(post.readTime);
    setTags(post.tags.join(", "));
    setFeatured(post.featured);
    setFormError("");
    setActiveForm("edit");
  };

  const handleUpdatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    const finalContent = editorRef.current?.innerHTML || "";
    if (!title || !excerpt || !finalContent || finalContent === "<br>" || !coverImage) {
      setFormError("Por favor, preencha todos os campos obrigatórios (*).");
      return;
    }

    const generatedSlug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const categoryObj = MOCK_CATEGORIES.find(c => c.slug === selectedCategorySlug) || MOCK_CATEGORIES[1];
    const authorObj = authors[selectedAuthorId] || authors.wellington;

    const updatedPosts = posts.map(p => {
      if (p.id === editingPost.id) {
        return {
          ...p,
          title,
          slug: generatedSlug,
          excerpt,
          content: finalContent,
          coverImage,
          publishedAt,
          readTime,
          category: categoryObj,
          author: authorObj,
          featured,
          tags: tags.split(",").map(t => t.trim()).filter(t => t.length > 0)
        };
      }
      return p;
    });

    setPosts(updatedPosts);
    if (typeof window !== "undefined") {
      localStorage.setItem("wesix_posts", JSON.stringify(updatedPosts));
      const custom = updatedPosts.filter(p => p.id.startsWith("custom-"));
      localStorage.setItem("wesix_custom_posts", JSON.stringify(custom));
    }

    setActiveForm("list");
    resetForm();
  };

  const handleDeletePost = (postId: string) => {
    if (confirm("Tem certeza de que deseja deletar este post? Essa ação não pode ser desfeita.")) {
      const updated = posts.filter(p => p.id !== postId);
      setPosts(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("wesix_posts", JSON.stringify(updated));
        const custom = updated.filter(p => p.id.startsWith("custom-"));
        localStorage.setItem("wesix_custom_posts", JSON.stringify(custom));
      }
    }
  };

  const handleExportMockData = () => {
    // Merge custom posts and default posts
    const allPosts = [...customPosts, ...MOCK_POSTS];
    const postsString = JSON.stringify(allPosts, null, 2);
    const authorsString = JSON.stringify(authors, null, 2);

    const fileContent = `export interface Author {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  category: Category;
  author: Author;
  featured: boolean;
  tags: string[];
}

export interface BenefitCard {
  id: string;
  title: string;
  description: string;
  iconName: "wallet" | "chart" | "shield" | "sparkles";
}

export interface Plan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  isPopular: boolean;
  ctaText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  age: number;
  role: string;
  quote: string;
}

export const MOCK_AUTHORS: Record<string, Author> = ${authorsString};

export const MOCK_CATEGORIES: Category[] = [
  { id: "all", name: "Todos os Temas", slug: "all" },
  { id: "strategy", name: "Separação de Contas", slug: "strategy" },
  { id: "cashflow", name: "Precificação e Lucro", slug: "cashflow" },
  { id: "lifestyle", name: "Tranquilidade Empreendedora", slug: "lifestyle" },
  { id: "product", name: "Funcionalidades MEI", slug: "product" },
];

export const BENEFIT_CARDS: BenefitCard[] = [
  {
    id: "pricing",
    title: "Precificação Completa",
    description: "Cadastre produtos e serviços e a WeSix calcula seu lucro real. Preço sugerido ideal, sem achismos nas contas.",
    iconName: "wallet",
  },
  {
    id: "separation",
    title: "Separação Pessoal x PJ",
    description: "Divida o dinheiro 'da vida' e o 'do negócio' em abas simples. Chega de misturar faturamento e compras diárias.",
    iconName: "chart",
  },
  {
    id: "pedidos",
    title: "Pedidos e Agenda",
    description: "Registre atendimentos, pedidos e agendamentos de clientes. Acompanhe a projeção do dia por período de execução.",
    iconName: "shield",
  },
  {
    id: "segment",
    title: "Indicadores de Segmento",
    description: "Compare o desempenho do seu negócio com a média geral do mercado. Saiba onde você pode cortar custos e melhorar.",
    iconName: "sparkles",
  },
];

export const PRICING_PLANS: Plan[] = [
  {
    id: "minhas-financas",
    name: "Plano Minhas Finanças",
    priceMonthly: 26.90,
    priceYearly: 0,
    description: "Menos que um almoço por semana para nunca mais perder o controle do seu dinheiro.",
    features: [
      "Fluxo de caixa pessoal descomplicado",
      "Organização de contas e compromissos",
      "Controle de tudo que te devem (empréstimos e vendas)",
      "Relatórios simples que falam a sua língua",
      "Sem planilhas e sem complicação",
      "Acesso móvel e alertas de vencimento",
      "Cancelamento simples a qualquer momento",
    ],
    isPopular: false,
    ctaText: "Teste grátis por 7 dias",
  },
  {
    id: "assinatura-negocios",
    name: "Assinatura para negócios",
    priceMonthly: 69.90,
    priceYearly: 0,
    description: "Ganhe grátis o acesso ao plano pessoal. Ideal para MEI e pequenos empreendedores que querem clareza de lucro.",
    features: [
      "Tudo do plano Minhas Finanças incluído",
      "Precificação completa por produto/serviço",
      "Margem de lucro real calculada automaticamente",
      "Fluxo de caixa separado de verdade (Pessoal x PJ)",
      "Orçamento inteligente com alertas diários de limites",
      "Pedidos e agendamento de rotinas integrados",
      "Dashboards de desempenho automáticos para MEI",
      "Suporte dedicado com ajuda financeira descomplicada",
    ],
    isPopular: true,
    ctaText: "Teste grátis por 7 dias",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "O WeSix serve para MEI?",
    answer: "Sim. O app foi criado exatamente para a rotina do MEI. Ele organiza vendas, despesas, cobranças, pedidos, agenda e dá visão real do seu dinheiro, mesmo para quem não entende de finanças."
  },
  {
    question: "Ele mostra o lucro real?",
    answer: "Sim. Ao registrar suas receitas e despesas operacionais da empresa, o WeSix desconta os custos e impostos automaticamente e aponta seu lucro líquido e margem real por período."
  },
  {
    question: "Como funciona a precificação?",
    answer: "O app conta com uma calculadora onde você insere os insumos, despesas e margem desejada. Ele sugere o preço ideal de venda de seus produtos ou serviços e calcula o lucro projetado."
  },
  {
    question: "O app calcula margem?",
    answer: "Sim! Ele calcula automaticamente a margem de contribuição e a margem de lucro líquido de cada venda e do balanço mensal, simplificando as decisões de descontos ou reajustes."
  },
  {
    question: "O WeSix funciona para salão de beleza?",
    answer: "Perfeitamente. Ele permite controlar os horários da agenda, cadastrar as taxas de comissão de profissionais parceiros, precificar tratamentos e ratear recebíveis de forma simples."
  },
  {
    question: "Serve para técnicos e oficinas?",
    answer: "Com certeza. Ideal para gerenciar ordens de serviço pendentes, contas a receber de clientes e registrar saídas de estoque de peças integradas."
  },
  {
    question: "Funciona para comércio?",
    answer: "Sim, excelente para pequenos comércios e lojas virtuais. Você acompanha custos de aquisição de mercadorias, saídas de caixa e fluxo de vendas em maquininhas ou Pix na mesma tela."
  },
  {
    question: "Posso cadastrar pedidos e agenda?",
    answer: "Sim! A nossa agenda integrada permite priorizar tarefas por cores, cadastrar pedidos recorrentes de clientes e saber quanto você vai faturar no dia antes mesmo de abrir a porta do negócio."
  },
  {
    question: "Preciso saber de finanças para usar?",
    answer: "Nenhum conhecimento prévio é necessário. Desenvolvemos o WeSix com linguagem comum, relatórios simples e sem planilhas. Você gerencia seu negócio como se estivesse batendo um papo."
  },
  {
    question: "Tem teste grátis?",
    answer: "Sim, você experimenta todas as funções de negócios gratuitamente por 7 dias. Não pedimos dados de cartão de crédito para iniciar o teste, garantindo risco zero."
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Totalmente livre. Você pode cancelar sua assinatura com apenas um clique nas configurações do aplicativo. Sem carências, sem multas e sem burocracia."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Mariana",
    age: 29,
    role: "Dona de Salão de beleza",
    quote: "Eu achava que sobrava mais. Depois do WeSix, finalmente separei o dinheiro do salão e parei de depender da sorte."
  },
  {
    name: "João",
    age: 38,
    role: "Dono de Hamburgueria",
    quote: "Eu não sabia se a hamburgueria dava lucro de verdade. O WeSix me mostrou na hora. Agora tomo decisões sem medo e consigo ver quando o lucro sobe ou cai."
  },
  {
    name: "Carlos",
    age: 32,
    role: "MEI Prestador de Serviços",
    quote: "O WeSix colocou ordem na minha rotina. Agora controlo meus atendimentos, meu estoque e minhas finanças — tudo no mesmo app."
  }
];

export const MOCK_POSTS: BlogPost[] = ${postsString};
`;

    const blob = new Blob([fileContent], { type: "text/typescript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mockData.ts";
    a.click();
    URL.revokeObjectURL(url);
  };

  // If not logged in, show lock screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-primary text-white flex flex-col justify-center items-center px-6 py-20 relative overflow-hidden font-inter">
        {/* Glow plates */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/5 rounded-full blur-[120px] pointer-events-none animate-glow" />
        
        <div className="max-w-md w-full bg-white text-text-navy rounded-3xl p-8 shadow-2xl relative z-10 border border-primary/5 text-center space-y-8 animate-float-medium">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="font-jakarta text-[10px] font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">Painel Administrativo</span>
            <h1 className="font-jakarta text-3xl font-extrabold tracking-tight">WeSix Hub</h1>
            <p className="text-text-gray text-xs font-semibold">Entre com a chave de acesso para gerenciar as postagens do blog.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1 text-left">
              <label htmlFor="pass" className="text-[10px] font-bold text-[#9A98AF] uppercase tracking-wider block">Chave Secreta *</label>
              <input 
                id="pass"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Insira a senha do admin..."
                className="w-full bg-[#FAF9FF] border border-primary/10 focus:border-primary text-text-navy text-sm font-semibold rounded-xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400 transition-all duration-300"
              />
            </div>

            {authError && (
              <div className="flex items-center gap-1.5 text-xs text-red-500 font-semibold bg-red-500/10 p-3 rounded-xl border border-red-500/20 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full font-jakarta font-bold text-center text-white bg-primary hover:bg-primary-dark shadow-[0_4px_15px_rgba(94,61,255,0.25)] hover:shadow-[0_4px_20px_rgba(94,61,255,0.4)] py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 border border-white/10 uppercase text-xs tracking-wider"
            >
              <span>Acessar Painel</span>
              <Unlock className="w-4 h-4" />
            </button>
          </form>

          <Link href="/" className="inline-flex items-center text-xs font-bold text-primary hover:text-primary-dark gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Site</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-light-bg text-text-gray pt-32 pb-24 overflow-hidden font-inter">
      <div className="absolute top-[10%] left-1/3 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-primary/10 pb-8 mb-12">
          <div className="text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-bold text-primary tracking-wider uppercase font-jakarta">WeSix Blog Manager</span>
            </div>
            <h1 className="font-jakarta text-3xl font-extrabold text-text-navy tracking-tight leading-none">Painel Editorial</h1>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleExportMockData} 
              className="font-jakarta text-xs font-bold text-white bg-green-600 hover:bg-green-700 px-5 py-3 rounded-full transition-colors flex items-center gap-1.5 shadow-sm"
              title="Baixar arquivo mockData.ts atualizado com todas as postagens para atualizar permanentemente o repositório Git"
            >
              <Download className="w-4 h-4" />
              <span>Exportar mockData.ts</span>
            </button>
            <button 
              onClick={handleLogout} 
              className="font-jakarta text-xs font-bold text-text-gray hover:text-red-500 bg-white border border-primary/5 hover:border-red-500/10 px-5 py-3 rounded-full transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>

        {/* ---------------- 1. DASHBOARD LIST VIEW ---------------- */}
        {activeForm === "list" && (
          <div className="space-y-8 text-left">
             {/* Stats row */}
             <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
               <div className="bg-white border border-primary/5 p-6 rounded-2xl shadow-sm">
                 <span className="text-[10px] font-bold tracking-widest uppercase text-[#9A98AF] block mb-1">Posts Editáveis</span>
                 <span className="font-jakarta text-3xl font-extrabold text-text-navy">{customPosts.length}</span>
               </div>
               <div className="bg-white border border-primary/5 p-6 rounded-2xl shadow-sm">
                 <span className="text-[10px] font-bold tracking-widest uppercase text-[#9A98AF] block mb-1">Posts Padrão (Read-Only)</span>
                 <span className="font-jakarta text-3xl font-extrabold text-text-navy">{MOCK_POSTS.length}</span>
               </div>
               <div className="bg-white border border-primary/5 p-6 rounded-2xl shadow-sm">
                 <span className="text-[10px] font-bold tracking-widest uppercase text-[#9A98AF] block mb-1">Leituras Totais</span>
                 <span className="font-jakarta text-3xl font-extrabold text-text-navy">
                   {Object.values(postViews).reduce((a, b) => a + b, 0).toLocaleString("pt-BR")}
                 </span>
               </div>
               <div className="bg-white border border-primary/5 p-6 rounded-2xl shadow-sm">
                 <span className="text-[10px] font-bold tracking-widest uppercase text-[#9A98AF] block mb-1">Exportação Segura</span>
                 <span className="text-xs text-text-gray font-semibold block leading-relaxed mt-1.5 flex items-center gap-1"><Check className="w-4 h-4 text-green-500 shrink-0" /> Pronta para Docker & Git</span>
               </div>
             </div>

            <div className="bg-white border border-primary/5 rounded-3xl p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <h3 className="font-jakarta text-xl font-bold text-text-navy">Publicações Ativas no Site</h3>
                <button 
                  onClick={() => { resetForm(); setActiveForm("create"); }} 
                  className="font-jakarta text-xs font-bold text-white bg-primary hover:bg-primary-dark px-5 py-3 rounded-full transition-colors flex items-center gap-1.5 shadow-sm shadow-primary/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nova Postagem</span>
                </button>
              </div>

              {/* Warnings and Info banner */}
              <div className="bg-[#FAF9FF] border border-primary/10 rounded-2xl p-5 mb-8 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-xs space-y-1 font-semibold text-text-gray leading-relaxed">
                  <p className="text-text-navy font-bold">ℹ️ Como funciona a persistência client-side:</p>
                  <p>Qualquer postagem criada ou editada por este painel ficará **instantaneamente visível no seu navegador** ao navegar pelo site (Página Inicial, Blog ou leitura de Artigo)!</p>
                  <p>Para tornar as alterações **permanentes e públicas para todos os usuários globais**, basta clicar no botão verde **"Exportar mockData.ts"** acima, substituir o arquivo em `src/lib/mockData.ts` no seu repositório local e fazer o push para o GitHub (que o EasyPanel compilará a nova lista imediatamente)!</p>
                </div>
              </div>

              {/* Table list */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-primary/10 pb-4 text-[10px] font-bold text-[#9A98AF] uppercase tracking-wider">
                      <th className="pb-4 pr-4">Capa</th>
                      <th className="pb-4">Título</th>
                      <th className="pb-4">Categoria</th>
                      <th className="pb-4">Autor</th>
                      <th className="pb-4">Data</th>
                      <th className="pb-4">Leituras</th>
                      <th className="pb-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5 text-sm text-text-gray font-semibold font-inter">
                    {/* Custom Posts */}
                    {customPosts.map(post => (
                      <tr key={post.id} className="hover:bg-[#FAF9FF] transition-all">
                        <td className="py-4 pr-4">
                          <div className="w-12 h-8 rounded-lg overflow-hidden border border-primary/5 bg-[#EAE8FC]">
                            <img src={post.coverImage} alt="capa" className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="py-4 font-bold text-text-navy max-w-xs truncate pr-4">
                          {post.title}
                          {post.featured && <span className="bg-accent/15 text-accent text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded ml-2">Destaque</span>}
                        </td>
                        <td className="py-4">{post.category.name}</td>
                        <td className="py-4">{post.author.name}</td>
                        <td className="py-4">{post.publishedAt}</td>
                        <td className="py-4">
                          <span className="inline-flex items-center gap-1 bg-primary/5 text-primary text-xs font-bold px-2.5 py-1 rounded-full border border-primary/5">
                            <Eye className="w-3.5 h-3.5" />
                            {(postViews[post.slug] || 0).toLocaleString("pt-BR")}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleEditClick(post)} 
                              className="w-8 h-8 rounded-full bg-primary/5 hover:bg-primary/10 text-primary flex items-center justify-center transition-colors"
                              title="Editar publicação"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeletePost(post.id)} 
                              className="w-8 h-8 rounded-full bg-red-500/5 hover:bg-red-500/10 text-red-500 flex items-center justify-center transition-colors"
                              title="Deletar publicação"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {/* Hardcoded Default Posts (Read only) */}
                    {MOCK_POSTS.map(post => (
                      <tr key={post.id} className="opacity-60 bg-[#FAF9FF]/20 hover:opacity-100 transition-all">
                        <td className="py-4 pr-4">
                          <div className="w-12 h-8 rounded-lg overflow-hidden border border-primary/5 bg-[#EAE8FC]">
                            <img src={post.coverImage} alt="capa" className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="py-4 font-bold text-text-navy max-w-xs truncate pr-4">
                          {post.title}
                          <span className="bg-primary/15 text-primary text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded ml-2">Padrão</span>
                          {post.featured && <span className="bg-accent/15 text-accent text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded ml-2">Destaque</span>}
                        </td>
                        <td className="py-4">{post.category.name}</td>
                        <td className="py-4">{post.author.name}</td>
                        <td className="py-4">{post.publishedAt}</td>
                        <td className="py-4">
                          <span className="inline-flex items-center gap-1 bg-[#FAF9FF] text-[#9A98AF] text-xs font-bold px-2.5 py-1 rounded-full border border-primary/5">
                            <Eye className="w-3.5 h-3.5 text-text-gray" />
                            {(postViews[post.slug] || 0).toLocaleString("pt-BR")}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <span className="text-[10px] text-[#9A98AF] uppercase tracking-wider font-bold italic bg-white border border-primary/5 px-2.5 py-1 rounded-md">Apenas Leitura</span>
                        </td>
                      </tr>
                    ))}

                    {customPosts.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-xs text-text-gray italic font-semibold">
                          Nenhum post personalizado criado. Clique em "Nova Postagem" para adicionar!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
            </div>
          </div>

            {/* ---------------- 1.2 AUTHOR MANAGEMENT CARD ---------------- */}
            <div className="bg-white border border-primary/5 rounded-3xl p-8 shadow-sm mt-8">
              <div className="border-b border-primary/5 pb-4 mb-6">
                <h3 className="font-jakarta text-xl font-bold text-text-navy flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span>Gerenciar Autores Cadastrados</span>
                </h3>
                <p className="text-xs text-text-gray font-semibold mt-1">
                  Adicione ou exclua autores para assinar suas publicações editoriais. Autores padrão do sistema são somente-leitura.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Authors List (col-span-7) */}
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#9A98AF] block mb-2">Autores Ativos</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-2">
                    {Object.keys(authors).map(key => {
                      const author = authors[key];
                      const isDefault = key === "wellington" || key === "sofia";
                      return (
                        <div key={key} className="bg-[#FAF9FF] border border-primary/5 rounded-2xl p-4 flex flex-col justify-between hover:border-primary/20 transition-all duration-300 relative group">
                          
                          {/* Delete button for custom authors */}
                          {!isDefault && (
                            <button 
                              onClick={() => handleDeleteAuthor(key)}
                              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500/5 hover:bg-red-500/10 text-red-500 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                              title="Excluir Autor"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              {author.avatarUrl.startsWith("data:image") || author.avatarUrl.startsWith("/") || author.avatarUrl.startsWith("http") ? (
                                <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/10">
                                  <img src={author.avatarUrl} alt={author.name} className="w-full h-full object-cover" />
                                </div>
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-xs font-black text-white uppercase font-jakarta shadow-inner">
                                  {author.name.charAt(0)}
                                </div>
                              )}
                              <div className="text-left">
                                <span className="text-sm font-bold text-text-navy block leading-tight">{author.name}</span>
                                <span className="text-[10px] text-text-gray font-medium block mt-0.5">{author.role}</span>
                              </div>
                            </div>
                            <p className="text-[11px] text-text-gray leading-relaxed font-semibold italic text-left">
                              "{author.bio}"
                            </p>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-primary/5 flex justify-between items-center text-[9px] font-bold uppercase tracking-wider">
                            <span className={isDefault ? "text-[#9A98AF]" : "text-primary"}>
                              {isDefault ? "Padrão" : "Personalizado"}
                            </span>
                            {!isDefault && <span className="text-red-500">Excluível</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side: Add Author Form (col-span-5) */}
                <div className="lg:col-span-5 bg-[#FAF9FF] border border-primary/10 p-6 rounded-3xl space-y-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-primary block">Novo Autor</span>
                  
                  {authorFormError && (
                    <div className="flex items-center gap-1.5 text-[10px] text-red-500 font-semibold bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{authorFormError}</span>
                    </div>
                  )}

                  <form onSubmit={handleAddAuthor} className="space-y-3.5 text-xs text-left">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-[#9A98AF] uppercase tracking-wider block">Nome *</label>
                      <input 
                        type="text" 
                        value={newAuthorName}
                        onChange={(e) => setNewAuthorName(e.target.value)}
                        placeholder="Ex: Juliana Freitas"
                        className="w-full bg-white border border-primary/10 focus:border-primary text-text-navy font-semibold rounded-xl px-3 py-2.5 focus:outline-none placeholder:text-gray-400 font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-[#9A98AF] uppercase tracking-wider block">Cargo / Função *</label>
                      <input 
                        type="text" 
                        value={newAuthorRole}
                        onChange={(e) => setNewAuthorRole(e.target.value)}
                        placeholder="Ex: Dona de Confeitaria"
                        className="w-full bg-white border border-primary/10 focus:border-primary text-text-navy font-semibold rounded-xl px-3 py-2.5 focus:outline-none placeholder:text-gray-400 font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-[#9A98AF] uppercase tracking-wider block">Biografia Curta *</label>
                      <textarea 
                        value={newAuthorBio}
                        onChange={(e) => setNewAuthorBio(e.target.value)}
                        placeholder="Ex: Juliana viveu a rotina de vendas e hoje apoia pequenos empreendedores..."
                        rows={2}
                        className="w-full bg-white border border-primary/10 focus:border-primary text-text-navy font-semibold rounded-xl px-3 py-2.5 focus:outline-none placeholder:text-gray-400 font-medium resize-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-[#9A98AF] uppercase tracking-wider block">Foto de Avatar *</label>
                      <div className="flex gap-2 items-center">
                        <input 
                          type="text" 
                          value={newAuthorAvatar.startsWith("data:image") ? "" : newAuthorAvatar}
                          onChange={(e) => setNewAuthorAvatar(e.target.value)}
                          placeholder="Link da imagem ou upload..."
                          className="w-full bg-white border border-primary/10 focus:border-primary text-text-navy font-semibold rounded-xl px-3 py-2.5 focus:outline-none placeholder:text-gray-400 font-medium"
                        />
                        <label className="shrink-0 bg-white border border-primary/10 text-primary text-[10px] font-bold font-jakarta px-3 py-2.5 rounded-xl cursor-pointer flex items-center gap-1 transition-colors hover:bg-primary/5">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Arquivo</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setNewAuthorAvatar(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="hidden" 
                          />
                        </label>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full font-jakarta font-bold text-center text-white bg-primary hover:bg-primary-dark shadow-[0_2px_10px_rgba(94,61,255,0.15)] py-3.5 rounded-xl transition-all duration-300 uppercase text-[10px] tracking-wider flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Adicionar Autor</span>
                    </button>
                  </form>
                </div>

              </div>
            </div>

            {/* ---------------- 1.3 CATEGORY MANAGEMENT CARD ---------------- */}
            <div className="bg-white border border-primary/5 rounded-3xl p-8 shadow-sm mt-8">
              <div className="border-b border-primary/5 pb-4 mb-6">
                <h3 className="font-jakarta text-xl font-bold text-text-navy flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span>Gerenciar Categorias Cadastradas</span>
                </h3>
                <p className="text-xs text-text-gray font-semibold mt-1">
                  Adicione ou exclua categorias para organizar seus artigos. Categorias padrão do sistema são somente-leitura.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Categories List (col-span-7) */}
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#9A98AF] block mb-2">Categorias Ativas</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2">
                    {categories.map(cat => {
                      const isDefault = cat.id === "all" || cat.id === "strategy" || cat.id === "cashflow" || cat.id === "lifestyle" || cat.id === "product";
                      return (
                        <div key={cat.id} className="bg-[#FAF9FF] border border-primary/5 rounded-2xl p-4 flex flex-col justify-between hover:border-primary/20 transition-all duration-300 relative group">
                          
                          {/* Delete button for custom categories */}
                          {!isDefault && (
                            <button 
                              onClick={() => handleDeleteCategory(cat.id)}
                              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500/5 hover:bg-red-500/10 text-red-500 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                              title="Excluir Categoria"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <div className="space-y-1">
                            <span className="text-sm font-bold text-text-navy block leading-tight">{cat.name}</span>
                            <span className="text-[9px] text-text-gray font-medium block mt-0.5">Slug: {cat.slug}</span>
                          </div>

                          <div className="mt-3 pt-2 flex justify-between items-center text-[9px] font-bold uppercase tracking-wider">
                            <span className={isDefault ? "text-[#9A98AF]" : "text-primary"}>
                              {isDefault ? "Padrão" : "Personalizada"}
                            </span>
                            {!isDefault && <span className="text-red-500">Excluível</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side: Add Category Form (col-span-5) */}
                <div className="lg:col-span-5 bg-[#FAF9FF] border border-primary/10 p-6 rounded-3xl space-y-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-primary block">Nova Categoria</span>
                  
                  {categoryFormError && (
                    <div className="flex items-center gap-1.5 text-[10px] text-red-500 font-semibold bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{categoryFormError}</span>
                    </div>
                  )}

                  <form onSubmit={handleAddCategory} className="space-y-3.5 text-xs text-left">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-[#9A98AF] uppercase tracking-wider block">Nome da Categoria *</label>
                      <input 
                        type="text" 
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Ex: Gestão MEI"
                        className="w-full bg-white border border-primary/10 focus:border-primary text-text-navy font-semibold rounded-xl px-3 py-2.5 focus:outline-none placeholder:text-gray-400 font-medium"
                      />
                      <span className="text-[8px] text-text-gray italic font-semibold mt-1 block">O slug do filtro será gerado automaticamente (ex: `gestao-mei`).</span>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full font-jakarta font-bold text-center text-white bg-primary hover:bg-primary-dark shadow-[0_2px_10px_rgba(94,61,255,0.15)] py-3.5 rounded-xl transition-all duration-300 uppercase text-[10px] tracking-wider flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Adicionar Categoria</span>
                    </button>
                  </form>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ---------------- 2. CREATOR / EDITOR FORM VIEWS ---------------- */}
        {(activeForm === "create" || activeForm === "edit") && (
          <div className="max-w-3xl mx-auto bg-white border border-primary/5 rounded-3xl p-8 md:p-12 shadow-sm text-left relative">
            <button 
              onClick={() => { resetForm(); setActiveForm("list"); }} 
              className="absolute top-8 right-8 w-8 h-8 rounded-full bg-[#FAF9FF] hover:bg-[#EAE8FC] text-text-gray flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-jakarta text-2xl font-bold text-text-navy mb-8 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              <span>{activeForm === "create" ? "Nova Publicação Editorial" : "Editar Publicação"}</span>
            </h3>

            <form onSubmit={activeForm === "create" ? handleCreatePost : handleUpdatePost} className="space-y-6">
              {/* Form errors */}
              {formError && (
                <div className="flex items-center gap-1.5 text-xs text-red-500 font-semibold bg-red-500/10 p-4 rounded-2xl border border-red-500/20">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Title & Excerpt */}
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#9A98AF] uppercase tracking-wider block">Título da Postagem *</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: O segredo para organizar seu estoque no MEI..."
                    className="w-full bg-[#FAF9FF] border border-primary/10 focus:border-primary text-text-navy text-sm font-semibold rounded-xl px-4 py-3.5 focus:outline-none placeholder:text-gray-400 font-medium"
                  />
                  <span className="text-[9px] text-text-gray italic font-semibold mt-1 block">O slug do post será gerado automaticamente para a URL (ex: `{title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`).</span>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#9A98AF] uppercase tracking-wider block">Resumo/Descrição Rápida (Excerpt) *</label>
                  <textarea 
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Insira um pequeno parágrafo chamativo que aparece na listagem do blog..."
                    rows={2}
                    className="w-full bg-[#FAF9FF] border border-primary/10 focus:border-primary text-text-navy text-sm font-semibold rounded-xl px-4 py-3.5 focus:outline-none placeholder:text-gray-400 font-medium resize-none"
                  />
                </div>
              </div>

              {/* Meta information row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#9A98AF] uppercase tracking-wider block">Categoria *</label>
                  <select 
                    value={selectedCategorySlug}
                    onChange={(e) => setSelectedCategorySlug(e.target.value)}
                    className="w-full bg-[#FAF9FF] border border-primary/10 focus:border-primary text-text-navy text-sm font-semibold rounded-xl px-4 py-3.5 focus:outline-none"
                  >
                    {categories.slice(1).map(cat => (
                      <option key={cat.id} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#9A98AF] uppercase tracking-wider block">Autor *</label>
                  <select 
                    value={selectedAuthorId}
                    onChange={(e) => setSelectedAuthorId(e.target.value)}
                    className="w-full bg-[#FAF9FF] border border-primary/10 focus:border-primary text-text-navy text-sm font-semibold rounded-xl px-4 py-3.5 focus:outline-none"
                  >
                    {Object.keys(authors).map(key => (
                      <option key={key} value={key}>{authors[key].name} ({authors[key].role})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#9A98AF] uppercase tracking-wider block">Destaque na Home?</label>
                  <div className="flex items-center h-[52px]">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      <span className="ml-3 text-xs font-bold text-text-navy uppercase">Marcar Destaque</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Data e Tempo de leitura */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#9A98AF] uppercase tracking-wider block">Data de Publicação *</label>
                  <input 
                    type="date" 
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    className="w-full bg-[#FAF9FF] border border-primary/10 focus:border-primary text-text-navy text-sm font-semibold rounded-xl px-4 py-3.5 focus:outline-none font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#9A98AF] uppercase tracking-wider block">Tempo de Leitura *</label>
                  <input 
                    type="text" 
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="Ex: 5 min de leitura"
                    className="w-full bg-[#FAF9FF] border border-primary/10 focus:border-primary text-text-navy text-sm font-semibold rounded-xl px-4 py-3.5 focus:outline-none font-medium"
                  />
                </div>
              </div>

              {/* Cover Image attachment */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-8 space-y-1">
                  <label className="text-[10px] font-bold text-[#9A98AF] uppercase tracking-wider block">Imagem de Capa (URL ou Upload) *</label>
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      value={coverImage.startsWith("data:image") ? "" : coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="Cole o link de uma imagem ou faça o upload..."
                      className="w-full bg-[#FAF9FF] border border-primary/10 focus:border-primary text-text-navy text-sm font-semibold rounded-xl px-4 py-3.5 focus:outline-none placeholder:text-gray-400 font-medium"
                    />
                    <label className="shrink-0 bg-primary/5 hover:bg-primary/10 border border-primary/10 text-primary text-xs font-bold font-jakarta px-5 py-3.5 rounded-xl cursor-pointer flex items-center gap-1.5 transition-colors shadow-sm">
                      <ImageIcon className="w-4 h-4" />
                      <span>Upload</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange}
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-4 flex justify-center">
                  <div className="w-full aspect-[16/10] bg-[#FAF9FF] border border-dashed border-primary/20 rounded-2xl overflow-hidden flex items-center justify-center text-text-gray/40">
                    {coverImage ? (
                      <img src={coverImage} alt="Pré-visualização da capa" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-3 space-y-1">
                        <ImageIcon className="w-6 h-6 mx-auto" />
                        <span className="text-[9px] font-bold uppercase tracking-wider block">Pré-visualização</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* WYSIWYG Visual Text Content Editor */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#9A98AF] uppercase tracking-wider block">Corpo do Artigo *</label>
                <div className="bg-[#FAF9FF] border border-primary/10 rounded-2xl overflow-hidden shadow-sm">
                  {/* Toolbar */}
                  <div className="bg-white border-b border-primary/5 px-4 py-2.5 flex flex-wrap gap-2 items-center">
                    <button 
                      type="button" 
                      onClick={() => execEditorCommand("formatBlock", "<h2>")}
                      className="p-2 rounded-lg hover:bg-primary/5 text-text-gray hover:text-primary transition-all flex items-center gap-1 font-jakarta font-bold text-[10px] uppercase tracking-wider"
                      title="Título Principal (Subtítulo do post)"
                    >
                      <Heading2 className="w-4 h-4 text-primary" />
                      <span>Título</span>
                    </button>
                    
                    <button 
                      type="button" 
                      onClick={() => execEditorCommand("formatBlock", "<p>")}
                      className="p-2 rounded-lg hover:bg-primary/5 text-text-gray hover:text-primary transition-all flex items-center gap-1 font-jakarta font-bold text-[10px] uppercase tracking-wider"
                      title="Texto Parágrafo Normal"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Texto</span>
                    </button>

                    <div className="h-4 w-[1px] bg-primary/10 mx-1" />

                    <button 
                      type="button" 
                      onClick={() => execEditorCommand("bold")}
                      className="p-2 rounded-lg hover:bg-primary/5 text-text-gray hover:text-primary transition-all flex items-center justify-center"
                      title="Negrito (Ctrl+B)"
                    >
                      <Bold className="w-4 h-4" />
                    </button>

                    <button 
                      type="button" 
                      onClick={() => execEditorCommand("italic")}
                      className="p-2 rounded-lg hover:bg-primary/5 text-text-gray hover:text-primary transition-all flex items-center justify-center"
                      title="Itálico (Ctrl+I)"
                    >
                      <Italic className="w-4 h-4" />
                    </button>

                    <button 
                      type="button" 
                      onClick={() => execEditorCommand("formatBlock", "<blockquote>")}
                      className="p-2 rounded-lg hover:bg-primary/5 text-text-gray hover:text-primary transition-all flex items-center justify-center"
                      title="Citação Destaque"
                    >
                      <Quote className="w-4 h-4 text-accent" />
                    </button>

                    <button 
                      type="button" 
                      onClick={() => execEditorCommand("insertUnorderedList")}
                      className="p-2 rounded-lg hover:bg-primary/5 text-text-gray hover:text-primary transition-all flex items-center justify-center"
                      title="Lista de Bolinhas"
                    >
                      <List className="w-4 h-4" />
                    </button>

                    <div className="h-4 w-[1px] bg-primary/10 mx-1" />

                    <button 
                      type="button" 
                      onClick={() => execEditorCommand("removeFormat")}
                      className="p-1.5 px-3 rounded-lg hover:bg-red-500/5 text-text-gray hover:text-red-500 transition-all font-jakarta font-bold text-[9px] uppercase tracking-wider border border-primary/5 ml-auto"
                      title="Limpar todas as formatações do trecho selecionado"
                    >
                      Limpar
                    </button>
                  </div>

                  <div 
                    ref={editorRef}
                    contentEditable="true"
                    onInput={handleEditorInput}
                    data-placeholder="Escreva seu artigo aqui de forma simples! Selecione qualquer trecho de texto para aplicar Negrito ou use a barra de ferramentas acima para criar Títulos, Listas e Citações."
                    className="w-full bg-white text-text-navy text-sm font-semibold p-6 focus:outline-none min-h-[300px] overflow-y-auto leading-relaxed border-t-0 focus:ring-0 placeholder-gray-400 font-inter focus:bg-white transition-all prose max-w-none editor-wysiwyg"
                    style={{ outline: "none" }}
                  />
                </div>
                <span className="text-[9px] text-[#9A98AF] font-bold italic mt-1 block">💡 Dica: Destaque o texto que deseja formatar com o mouse e clique nos botões acima (como Negrito) para formatar no mesmo instante!</span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-primary/10">
                <button 
                  type="submit" 
                  className="font-jakarta font-bold text-xs text-white bg-primary hover:bg-primary-dark shadow-[0_4px_15px_rgba(94,61,255,0.25)] px-8 py-4 rounded-full transition-all duration-300 uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{activeForm === "create" ? "Criar Postagem" : "Atualizar Postagem"}</span>
                </button>

                <button 
                  type="button"
                  onClick={handlePreviewPost}
                  className="font-jakarta font-bold text-xs text-primary bg-primary/5 hover:bg-primary/10 border border-primary/10 px-8 py-4 rounded-full transition-all duration-300 uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span>Visualizar Rascunho</span>
                </button>
                
                <button 
                  type="button"
                  onClick={() => { resetForm(); setActiveForm("list"); }}
                  className="font-jakarta font-bold text-xs text-text-gray hover:text-text-navy bg-[#FAF9FF] border border-primary/10 px-8 py-4 rounded-full transition-colors uppercase tracking-wider"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
