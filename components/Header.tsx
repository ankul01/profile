"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Posts", href: "/posts" },
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-gray-900">
          Ankul Choudhry
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
