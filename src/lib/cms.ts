import { BlogPost, Category, MOCK_CATEGORIES, MOCK_POSTS } from "./mockData";

/**
 * WeSix CMS Facade Service
 * 
 * This service implements clean, asynchronous data fetching to simulate a headless CMS.
 * By decoupling data retrieval here, you can easily transition from local static data 
 * to headless engines like Sanity.io, Contentful, or Strapi with minimal edits.
 * 
 * Example migration to Sanity CMS:
 * 
 * import { createClient } from '@sanity/client';
 * const client = createClient({ projectId: 'your_id', dataset: 'production', useCdn: true });
 * 
 * export async function getFeaturedPost(): Promise<BlogPost> {
 *   return await client.fetch(`*[_type == "post" && featured == true][0] { ..., category->, author-> }`);
 * }
 */

// Helper to simulate network latency for authentic premium experience
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getAllPosts(): Promise<BlogPost[]> {
  await delay(150); // Simulate API latency
  // Sort posts by publication date descending
  return [...MOCK_POSTS].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getFeaturedPost(): Promise<BlogPost | undefined> {
  await delay(100);
  return MOCK_POSTS.find((post) => post.featured);
}

export async function getRecentPosts(limit = 3, excludeId?: string): Promise<BlogPost[]> {
  await delay(120);
  let posts = [...MOCK_POSTS];
  if (excludeId) {
    posts = posts.filter((post) => post.id !== excludeId);
  }
  return posts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  await delay(150);
  if (categorySlug === "all") {
    return getAllPosts();
  }
  return MOCK_POSTS.filter((post) => post.category.slug.toLowerCase() === categorySlug.toLowerCase())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  await delay(200);
  return MOCK_POSTS.find((post) => post.slug === slug);
}

export async function getCategories(): Promise<Category[]> {
  await delay(50);
  return MOCK_CATEGORIES;
}

export async function getRelatedPosts(categorySlug: string, excludeId: string, limit = 2): Promise<BlogPost[]> {
  await delay(100);
  return MOCK_POSTS.filter((post) => post.category.slug === categorySlug && post.id !== excludeId)
    .slice(0, limit);
}
