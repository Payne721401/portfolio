import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { Calendar, Clock, Tag } from "lucide-react";

export const metadata = { title: "Blog" };

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const allPosts = getAllPosts();
  const categories = Array.from(
    new Set(allPosts.map((p) => p.category).filter((c): c is string => !!c))
  );
  const posts = category
    ? allPosts.filter((p) => p.category === category)
    : allPosts;

  return (
    <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
      <div className="mb-8">
        <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
          Writing
        </span>
        <h1 className="font-display text-3xl font-bold text-neutral-950 dark:text-neutral-50 mt-2">
          Blog
        </h1>
      </div>

      {categories.length > 0 && (
        <CategoryFilter categories={categories} active={category} />
      )}

      <PostList posts={posts} />
    </div>
  );
}

function CategoryFilter({ categories, active }: { categories: string[]; active?: string }) {
  const base = "px-3 py-1 rounded-full text-xs font-medium border transition-colors";
  const activeStyle = "bg-neutral-950 text-neutral-50 border-neutral-950 dark:bg-neutral-50 dark:text-neutral-950 dark:border-neutral-50";
  const inactiveStyle = "border-neutral-300 text-neutral-600 hover:border-neutral-950 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-50";

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Link href="/blog" className={`${base} ${!active ? activeStyle : inactiveStyle}`}>
        全部
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/blog?category=${encodeURIComponent(cat)}`}
          className={`${base} ${active === cat ? activeStyle : inactiveStyle}`}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}

async function PostList({ posts }: { posts: ReturnType<typeof getAllPosts> }) {
  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">No posts yet. Check back soon.</p>
      ) : (
        posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 hover:border-l-4 hover:border-l-neutral-950 dark:hover:border-l-neutral-50 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h2 className="font-display font-semibold text-lg text-neutral-950 dark:text-neutral-50 group-hover:underline underline-offset-4">
                {post.title}
              </h2>
              {post.category && (
                <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                  {post.category}
                </span>
              )}
            </div>
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
        ))
      )}
    </div>
  );
}
