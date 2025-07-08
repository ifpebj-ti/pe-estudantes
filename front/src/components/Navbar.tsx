'use client';

import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="bg-emerald-700 text-white w-full shadow flex flex-col py-3">
      <div className="px-4">
        <div className="w-44 h-16 -ml-2">
          <img src="/logo.svg" alt="logo"/>
        </div>
        <div className="text-lg font-semibold text-white">
          <Menu className="inline-block mr-2" />
            Prontuário Eletrônico para Estudantes com Necessidades Educacionais Específicas
        </div>
      </div>
    </div>
  );
}
