import { Suspense } from "react";
import { getAllPosts } from "@/lib/mdx";
import { BlogClient } from "./BlogClient";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getAllPosts();
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
      <Suspense>
        <BlogClient posts={posts} />
      </Suspense>
    </div>
  );
}