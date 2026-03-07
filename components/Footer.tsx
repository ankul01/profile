import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-sm text-gray-600">
            <Link href="https://ankul.co.in" className="hover:text-gray-900">
              Home
            </Link>
            <Link
              href="https://engineering.ankul.co.in"
              className="hover:text-gray-900"
            >
              Engineering with Intent
            </Link>
            <Link
              href="https://portfolio.ankul.co.in"
              className="hover:text-gray-900"
            >
              Portfolio
            </Link>
          </div>

          <div className="flex gap-6 text-sm text-gray-600">
            <Link
              href="https://www.linkedin.com/in/ankul-choudhry"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/ankul01"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900"
            >
              GitHub
            </Link>
            <Link
              href="mailto:ankulnitt@gmail.com"
              className="hover:text-gray-900"
            >
              Email
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Ankul Choudhry. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
