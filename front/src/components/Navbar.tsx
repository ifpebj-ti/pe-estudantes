'use client';

import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="bg-emerald-700 text-white w-full shadow flex flex-col py-3">
      <div className="flex items-center gap-4 h-14 px-4">
        {/* LOGO fictícia */}
        <div className="bg-gray-200 text-black px-6 py-2 font-semibold text-sm rounded">
          LOGO
        </div>
      </div>

      <div className="text-lg font-semibold text-white px-4">
        <Menu className="inline-block mr-2" />
          Prontuário Eletrônico para Estudantes com Necessidades Educacionais Específicas
      </div>
    </div>
  );
}
