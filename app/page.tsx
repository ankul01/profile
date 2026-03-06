import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Ankul Choudhry
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Engineering Leader · Builder · Writer
        </p>

        <p className="text-gray-700 leading-relaxed max-w-2xl">
          14+ years building scalable platforms in fintech and insurance.
          Leading engineering teams that ship reliable, compliant systems at
          scale.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-12">
        <Link
          href="https://ankul01.github.io/leadership-learning/"
          className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all group"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
            Engineering with Intent
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Architecture decisions and operating practices that hold up in
            production. System design, technical leadership, and engineering
            execution.
          </p>
          <span className="text-blue-600 font-medium text-sm">Read →</span>
        </Link>

        <Link
          href="https://portfolio.ankul.co.in"
          className="block p-6 border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-sm transition-all group"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600">
            Portfolio
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Experience, projects, and case studies from 14+ years of building
            platforms across e-commerce, fintech, and insurance.
          </p>
          <span className="text-green-600 font-medium text-sm">View →</span>
        </Link>
      </section>

      <section className="mb-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Latest Posts
        </h2>
        <ul className="space-y-3">
          <li>
            <Link
              href="/posts/embedded-insurance"
              className="text-blue-600 hover:underline"
            >
              Designing an Embedded Insurance Platform
            </Link>
            <span className="text-gray-500 text-sm ml-2">— Feb 2026</span>
          </li>
        </ul>
        <Link
          href="/posts"
          className="inline-block mt-4 text-sm text-gray-600 hover:text-gray-900"
        >
          View all posts →
        </Link>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Connect</h2>
        <div className="flex gap-6 text-sm">
          <Link
            href="https://www.linkedin.com/in/ankul-choudhry"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            LinkedIn
          </Link>
          <Link
            href="https://github.com/ankul01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            GitHub
          </Link>
          <Link
            href="mailto:ankulnitt@gmail.com"
            className="text-gray-600 hover:text-gray-900"
          >
            ankulnitt@gmail.com
          </Link>
        </div>
      </section>
    </div>
  );
}
