import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { AnimatedArrow } from "@/components/icons";
import { getAllPosts } from "@/lib/blog";
import { breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cleaning Tips & Guides",
  description:
    "Practical cleaning guides, checklists, and advice from Ottri Cleaning Services — house cleaning, move-outs, post-construction, and more across greater Louisville, KY.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}

export default function BlogIndex() {
  const posts = getAllPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Ottri Cleaning Services — Cleaning Tips & Guides",
    url: absoluteUrl("/blog"),
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: absoluteUrl(`/blog/${p.slug}`),
      datePublished: p.date,
      description: p.description,
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          blogSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      <Header />
      <main className="bg-white">
        <div className="mx-auto max-w-5xl px-5 pt-32 pb-20 sm:px-6 md:pt-40 md:pb-28">
          <PageHeader eyebrow="Blog" title="Cleaning tips & guides." />
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-neutral-700 md:mt-10 md:text-lg">
            Practical advice from our crews — checklists, room-by-room guides,
            and answers to the questions we hear most.
          </p>

          <div className="mt-12 md:mt-16">
            <div className="h-px w-full bg-neutral-200" />
            <ul className="divide-y divide-neutral-200">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid gap-3 py-8 md:grid-cols-12 md:gap-8 md:py-10"
                  >
                    <div className="md:col-span-3">
                      <p className="text-sm text-neutral-500">
                        {formatDate(post.date)}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-oranje-600">
                        {post.tags[0] ?? "Guide"}
                      </p>
                    </div>
                    <div className="md:col-span-9">
                      <h2 className="font-display text-2xl tracking-tight text-black transition-colors group-hover:text-oranje-600 md:text-3xl">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-neutral-600">
                        {post.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-oranje-700">
                        Read more
                        <AnimatedArrow className="h-5 w-5" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
