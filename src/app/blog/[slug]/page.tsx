import { MOCK_POSTS } from "@/lib/mockData";
import BlogArticleClient from "./BlogArticleClient";

export async function generateStaticParams() {
  return [
    { slug: "erro-numero-um-mei-misturar-contas" },
    { slug: "guia-precificacao-prestadores-servicos" }
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  return <BlogArticleClient slug={resolvedParams.slug} />;
}
