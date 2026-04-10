import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { Calendar, Clock, Tag } from "lucide-react";

export const metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
      <div className="mb-12">
        <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
          Writing
        </span>
        <h1 className="font-display text-3xl font-bold text-neutral-950 dark:text-neutral-50 mt-2">
          Blog
        </h1>
      </div>

      {posts.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">No posts yet. Check back soon.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 hover:border-l-4 hover:border-l-neutral-950 dark:hover:border-l-neutral-50 transition-all duration-200"
            >
              <h2 className="font-display font-semibold text-lg text-neutral-950 dark:text-neutral-50 group-hover:underline underline-offset-4 mb-2">
                {post.title}
              </h2>
              {post.summary && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                  {post.summary}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-500">
                {post.date && (
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
