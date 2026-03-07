import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Link href="/" className="text-xl font-semibold text-gray-900">
          Ankul Choudhry
        </Link>
      </div>
    </header>
  );
}
