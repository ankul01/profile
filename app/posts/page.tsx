import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Posts — Ankul Choudhry",
  description:
    "Reflections on engineering, leadership, architecture, and building systems that last.",
};

const posts = [
  {
    slug: "embedded-insurance",
    title: "Designing an Embedded Insurance Platform",
    date: "2026-02-14",
    summary:
      "A comprehensive architecture blueprint for building a production-grade embedded insurance platform — covering product configuration, issuance pipelines, double-entry ledgering, claims, and regulatory reporting.",
    tags: [
      "system-design",
      "insurance",
      "platform-engineering",
      "architecture",
      "fintech",
    ],
  },
];

export default function PostsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Posts</h1>
      <p className="text-gray-600 mb-8">
        Reflections on engineering, leadership, architecture, and building
        systems that last.
      </p>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-gray-100 pb-8">
            <Link href={`/posts/${post.slug}`} className="group">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-500 mb-3">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-600 mb-3">{post.summary}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
