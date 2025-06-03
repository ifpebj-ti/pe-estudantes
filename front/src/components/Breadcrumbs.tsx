'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';

export default function Breadcrumbs({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  return (
    <nav className="bg-white flex items-center gap-1 text-sm px-4 py-2">
      <Link href="/" className="text-emerald-700  flex items-center gap-1">
        <Home className="w-4 h-4" />
      </Link>

      {items.map(({ href, label }, idx) => (
        <div key={href} className="flex items-center gap-1">
          <span className="text-gray-400">›</span>
          {idx === items.length - 1 ? (
            <span>{label}</span>
          ) : (
            <Link href={href} className="">
              {label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
