export interface Author {
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

// ---------------- MOCK DATA ATUALIZADO (Cópia exata para MEI/Negócios) ----------------

export const MOCK_AUTHORS: Record<string, Author> = {
  wellington: {
    id: "wellington",
    name: "Wellington",
    role: "Fundador do WeSix",
    avatarUrl: "/avatars/wellington.jpg",
    bio: "Empreendedor desde 2006. Wellington viveu os desafios de fluxo de caixa e gestão na própria pele e criou o WeSix para apoiar empreendedores e MEIs do Brasil.",
  },
  sofia: {
    id: "sofia",
    name: "Sofia Mendes",
    role: "Especialista em Finanças para Autônomos",
    avatarUrl: "/avatars/sofia.jpg",
    bio: "Sofia ajuda pequenos negócios a calcularem margens reais, precificarem serviços e estruturarem fluxos saudáveis.",
  },
};

export const MOCK_CATEGORIES: Category[] = [
  { id: "all", name: "Todos os Temas", slug: "all" },
  { id: "strategy", name: "Separação de Contas", slug: "strategy" },
  { id: "cashflow", name: "Precificação e Lucro", slug: "cashflow" },
  { id: "lifestyle", name: "Tranquilidade Empreendedora", slug: "lifestyle" },
  { id: "product", name: "Funcionalidades MEI", slug: "product" },
];

export const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "O erro número um do MEI: Misturar conta física e jurídica",
    slug: "erro-numero-um-mei-misturar-contas",
    excerpt: "Saiba por que misturar seu saldo do negócio com o do mercado destrói seu lucro e como a WeSix resolve isso de forma simples.",
    coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200",
    publishedAt: "2026-05-20",
    readTime: "5 min de leitura",
    category: MOCK_CATEGORIES[1], // Separação de Contas
    author: MOCK_AUTHORS.wellington,
    featured: true,
    tags: ["MEI", "Saldos Bancários", "Organização"],
    content: `
      <p class="lead">Você trabalha, vende, entrega… Mas quando vai olhar o caixa, parece que o dinheiro sumiu. O problema quase sempre está na falta de separação entre o seu bolso e a sua empresa.</p>
      
      <h2>Por que a separação é vital?</h2>
      <p>Quando você paga o almoço com a conta do negócio e a conta de luz da empresa com o dinheiro pessoal, você perde a noção de lucro real. Você acaba achando que tem dinheiro disponível quando na verdade é capital de giro ou imposto acumulado.</p>
      
      <blockquote>
        "O WeSix foi feito para pequenos empreendedores e MEIs. Com um painel simples e sem planilhas, ele divide suas finanças e mostra seu lucro real por venda."
      </blockquote>

      <h2>O Método WeSix em 3 etapas</h2>
      <p>Nosso sistema organiza seu negócio sem precisar ser especialista:</p>
      <ul>
        <li><strong>Registre tudo:</strong> Lance Pix, cartão, dinheiro ou maquininha em segundos.</li>
        <li><strong>Filtre o fluxo:</strong> O WeSix separa o que é pessoal e o que é da sua empresa.</li>
        <li><strong>Analise seu lucro:</strong> Descubra a margem exata e pare de decidir no achismo.</li>
      </ul>
    `,
  },
  {
    id: "2",
    title: "Guia definitivo de precificação para prestadores de serviços",
    slug: "guia-precificacao-prestadores-servicos",
    excerpt: "Calcular o preço do seu serviço vai muito além de chutar um valor. Veja como a WeSix calcula margens reais por serviço ou pedido.",
    coverImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
    publishedAt: "2026-05-24",
    readTime: "4 min de leitura",
    category: MOCK_CATEGORIES[2], // Precificação e Lucro
    author: MOCK_AUTHORS.sofia,
    featured: false,
    tags: ["Precificação", "Serviços", "Margem"],
    content: `
      <p>Muitos prestadores de serviço e autônomos cobram baseados puramente no preço do concorrente, gerando prejuízos silenciosos.</p>

      <h2>O cálculo da margem real</h2>
      <p>Precificar exige analisar seus custos fixos, variáveis, impostos e tempo investido. O WeSix facilita isso por meio do recurso de <strong>Precificação Completa</strong>.</p>

      <h2>Como o WeSix ajuda a precificar</h2>
      <ol>
        <li><strong>Calculadora integrada:</strong> Insira seus custos diretos e indiretos e o app sugere o preço ideal de venda.</li>
        <li><strong>Visão de lucro real:</strong> Veja a margem de contribuição exata por atendimento realizado.</li>
        <li><strong>Pedidos e agendamentos:</strong> Projete o faturamento do seu dia antes mesmo de começar a trabalhar.</li>
      </ol>
    `,
  },
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
    answer: "Sim. O app foi criado exatamente para a rotina do MEI. Ele organiza vendas, despesas, cobranças, pedidos, agenda e dá visão real do seu dinheiro, mesmo para quem não entende de finanças.",
  },
  {
    question: "Ele mostra o lucro real?",
    answer: "Sim. Ao registrar suas receitas e despesas operacionais da empresa, o WeSix desconta os custos e impostos automaticamente e aponta seu lucro líquido e margem real por período.",
  },
  {
    question: "Como funciona a precificação?",
    answer: "O app conta com uma calculadora onde você insere os insumos, despesas e margem desejada. Ele sugere o preço ideal de venda de seus produtos ou serviços e calcula o lucro projetado.",
  },
  {
    question: "O app calcula margem?",
    answer: "Sim! Ele calcula automaticamente a margem de contribuição e a margem de lucro líquido de cada venda e do balanço mensal, simplificando as decisões de descontos ou reajustes.",
  },
  {
    question: "O WeSix funciona para salão de beleza?",
    answer: "Perfeitamente. Ele permite controlar os horários da agenda, cadastrar as taxas de comissão de profissionais parceiros, precificar tratamentos e ratear recebíveis de forma simples.",
  },
  {
    question: "Serve para técnicos e oficinas?",
    answer: "Com certeza. Ideal para gerenciar ordens de serviço pendentes, contas a receber de clientes e registrar saídas de estoque de peças integradas.",
  },
  {
    question: "Funciona para comércio?",
    answer: "Sim, excelente para pequenos comércios e lojas virtuais. Você acompanha custos de aquisição de mercadorias, saídas de caixa e fluxo de vendas em maquininhas ou Pix na mesma tela.",
  },
  {
    question: "Posso cadastrar pedidos e agenda?",
    answer: "Sim! A nossa agenda integrada permite priorizar tarefas por cores, cadastrar pedidos recorrentes de clientes e saber quanto você vai faturar no dia antes mesmo de abrir a porta do negócio.",
  },
  {
    question: "Preciso saber de finanças para usar?",
    answer: "Nenhum conhecimento prévio é necessário. Desenvolvemos o WeSix com linguagem comum, relatórios simples e sem planilhas. Você gerencia seu negócio como se estivesse batendo um papo.",
  },
  {
    question: "Tem teste grátis?",
    answer: "Sim, você experimenta todas as funções de negócios gratuitamente por 7 dias. Não pedimos dados de cartão de crédito para iniciar o teste, garantindo risco zero.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Totalmente livre. Você pode cancelar sua assinatura com apenas um clique nas configurações do aplicativo. Sem carências, sem multas e sem burocracia.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Mariana",
    age: 29,
    role: "Dona de Salão de beleza",
    quote: "Eu achava que sobrava mais. Depois do WeSix, finalmente separei o dinheiro do salão e parei de depender da sorte.",
  },
  {
    name: "João",
    age: 38,
    role: "Dono de Hamburgueria",
    quote: "Eu não sabia se a hamburgueria dava lucro de verdade. O WeSix me mostrou na hora. Agora tomo decisões sem medo e consigo ver quando o lucro sobe ou cai.",
  },
  {
    name: "Carlos",
    age: 32,
    role: "MEI Prestador de Serviços",
    quote: "O WeSix colocou ordem na minha rotina. Agora controlo meus atendimentos, meu estoque e minhas finanças — tudo no mesmo app.",
  },
];
