import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getPostBySlug } from "@/lib/mdx";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors mb-10"
      >
        <ArrowLeft size={14} />
        Back to Blog
      </Link>

      {/* Header */}
      <header className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950 dark:text-neutral-50 leading-tight mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-500">
          {post.date && (
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
          {post.readingTime && (
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readingTime}
            </span>
          )}
          {post.tags?.map((tag) => (
            <span key={tag} className="flex items-center gap-1">
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Content */}
      <article className="prose prose-neutral dark:prose-invert max-w-none prose-code:font-mono">
        <MDXRemote source={post.content} />
      </article>
    </div>
  );
}
