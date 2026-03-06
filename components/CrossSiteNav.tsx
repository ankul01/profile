import Link from "next/link";

export default function CrossSiteNav() {
  return (
    <nav className="bg-gray-50 border-b border-gray-200 text-sm">
      <div className="max-w-4xl mx-auto px-4 py-2 flex gap-6 items-center">
        <Link
          href="https://ankul.co.in"
          className="text-gray-900 font-medium hover:text-gray-700"
        >
          Home
        </Link>
        <Link
          href="https://ankul.co.in/engineering-with-intent/"
          className="text-gray-600 hover:text-gray-900"
        >
          Engineering with Intent
        </Link>
        <Link
          href="https://portfolio.ankul.co.in"
          className="text-gray-600 hover:text-gray-900"
        >
          Portfolio
        </Link>
      </div>
    </nav>
  );
}
