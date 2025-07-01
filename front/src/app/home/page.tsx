"use client";

import "@govbr-ds/core/dist/core.min.css";
import AppLayout from "@/components/AppLayout";
import {
  Users,
  ClipboardPlus,
  Stethoscope,
  MessagesSquare,
  BookOpenCheck,
  FileText,
} from 'lucide-react';
import HomeCard from "@/components/HomeCard";


export default function HomePage() {
  
  return (
    <AppLayout
      breadcrumbs={[
          { href: '/home', label: 'Página Inicial' }
        ]}
    >
      <main className="p-6">
        <h1 className="text-3xl font-light mb-6">Página inicial</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <HomeCard label="Pessoas" icon={Users} href="/estudantes" />
          <HomeCard label="Triagem" icon={ClipboardPlus} href="/triagem" />
          <HomeCard label="Anamnese" icon={Stethoscope} href="/anamnese" />
          <HomeCard label="Comentários Multiprofissionais" icon={MessagesSquare} href="/comentarios" />
          <HomeCard label="PEI" icon={BookOpenCheck} href="/pei" />
          <HomeCard label="Relatórios" icon={FileText} href="/relatorio" />
        </div>
    </main>   
    </AppLayout>
  );
}
