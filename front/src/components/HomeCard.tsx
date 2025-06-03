// components/HomeCard.tsx
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

type HomeCardProps = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export default function HomeCard({ label, icon: Icon, href }: HomeCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white shadow-md rounded-md flex flex-col items-center justify-center p-6 hover:shadow-lg transition text-emerald-700">
        <Icon size={32} className="mb-2" />
        <span className="text-center font-medium">{label}</span>
      </div>
    </Link>
  );
}
