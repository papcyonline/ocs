import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { QuoteButton } from "@/components/QuoteButton";
import { AnimatedArrow } from "@/components/icons";
import { getPost, getPostSlugs, getAllPosts } from "@/lib/blog";
import {
  articleSchema,
  faqPageSchema,
  breadcrumbSchema,
} from "@/lib/schema";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: `${post.meta.title} | ${site.shortName}`,
      description: post.meta.description,
      url: `/blog/${slug}`,
      publishedTime: post.meta.date,
      images: ["/opengraph-image"],
    },
  };
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            slug,
            title: post.meta.title,
            description: post.meta.description,
            date: post.meta.date,
            author: post.meta.author,
          }),
          ...(post.faqs.length ? [faqPageSchema(post.faqs)] : []),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.meta.title, path: `/blog/${slug}` },
          ]),
        ]}
      />
      <Header />
      <main className="bg-white">
        <article className="mx-auto max-w-3xl px-5 pt-32 pb-20 sm:px-6 md:pt-40 md:pb-28">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-oranje-600"
          >
            <ArrowLeft weight="bold" className="h-4 w-4" />
            All posts
          </Link>

          <div className="mt-8 flex items-center gap-3 text-sm text-neutral-500">
            <span>{formatDate(post.meta.date)}</span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <span>{post.meta.readingMinutes} min read</span>
            {post.meta.tags[0] && (
              <>
                <span className="h-1 w-1 rounded-full bg-neutral-300" />
                <span className="uppercase tracking-[0.18em] text-oranje-600">
                  {post.meta.tags[0]}
                </span>
              </>
            )}
          </div>

          <h1 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight text-black sm:text-5xl">
            {post.meta.title}
          </h1>

          <div className="mt-10 h-px w-full bg-neutral-200" />

          <div
            className="prose-blog mt-10"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* CTA */}
          <div className="mt-14 rounded-3xl bg-neutral-900 p-8 md:p-10">
            <p className="font-display text-2xl text-white md:text-3xl">
              Rather hand it off?
            </p>
            <p className="mt-3 max-w-md text-base text-white/70">
              Insured, bonded crews across greater Louisville. Free quote, no
              commitment.
            </p>
            <QuoteButton className="group mt-6 inline-flex items-center gap-2 rounded-full bg-oranje-500 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-oranje-600">
              Get Free Quote
              <AnimatedArrow className="h-5 w-5" />
            </QuoteButton>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mx-auto max-w-3xl px-5 pb-20 sm:px-6 md:pb-28">
            <div className="h-px w-full bg-neutral-200" />
            <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
              Keep reading
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl bg-neutral-50 p-6 transition-colors hover:bg-oranje-50"
                >
                  <h3 className="font-display text-lg text-black md:text-xl">
                    {p.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-oranje-700">
                    Read
                    <AnimatedArrow className="h-5 w-5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
