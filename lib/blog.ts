import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  author: string;
  tags: string[];
  excerpt: string;
  readingMinutes: number;
};

export type Post = {
  meta: PostMeta;
  html: string;
  faqs: { question: string; answer: string }[];
};

function readFile(slug: string) {
  const full = path.join(BLOG_DIR, `${slug}.md`);
  const raw = fs.readFileSync(full, "utf8");
  return matter(raw);
}

function toMeta(slug: string, data: Record<string, unknown>, content: string): PostMeta {
  const words = content.trim().split(/\s+/).length;
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    author: String(data.author ?? "Ottri Cleaning Services"),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    excerpt: String(data.excerpt ?? data.description ?? ""),
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const { data, content } = readFile(slug);
      return toMeta(slug, data, content);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!getPostSlugs().includes(slug)) return null;
  const { data, content } = readFile(slug);
  const html = await marked.parse(content);
  const faqs = Array.isArray(data.faqs)
    ? (data.faqs as { question: string; answer: string }[])
    : [];
  return { meta: toMeta(slug, data, content), html, faqs };
}
