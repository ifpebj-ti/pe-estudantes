"use client";

import { useEffect } from 'react'; // 1. Importar o useEffect
import "@govbr-ds/core/dist/core.min.css";
import AppLayout from "@/components/AppLayout";
import {
  Users,
  ClipboardPlus,
  Stethoscope,
  MessagesSquare,
  BookOpenCheck,
} from 'lucide-react';
import HomeCard from "@/components/HomeCard";
import { useAuth } from "@/contexts/AuthContext";
import { ESTUDANTE } from "@/consts";

export default function HomePage() {
  const { user, loading } = useAuth();

  // 2. Adicionar o useEffect para forçar o recarregamento
  useEffect(() => {
    // Verifica se a página já foi recarregada nesta sessão
    if (sessionStorage.getItem('home_reloaded') !== 'true') {
      // Marca que a página foi recarregada
      sessionStorage.setItem('home_reloaded', 'true');
      // Força o recarregamento da página
      window.location.reload();
    }
  }, []); // O array de dependências vazio [] garante que este efeito rode apenas uma vez após a montagem inicial do componente

  if (loading) {
    // É uma boa prática mostrar um indicador de loading
    return <div>Carregando...</div>;
  }

  return (
    <AppLayout
      breadcrumbs={[
          { href: '/home', label: 'Página Inicial' }
        ]}
    >
      <main className="p-6">
        <h1 className="text-3xl font-light mb-6">Página inicial</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {user?.id_level === ESTUDANTE ? (
            <>
              <HomeCard label="Triagem" icon={ClipboardPlus} href="/triagem" />
              <HomeCard label="Anamnese" icon={Stethoscope} href="/anamnese" />
              <HomeCard label="Comentários Multiprofissionais" icon={MessagesSquare} href="/comentarios" />
              <HomeCard label="PEI" icon={BookOpenCheck} href="/pei" />
            </>
          ) : (
            <>
              <HomeCard label="Pessoas" icon={Users} href="/estudantes" />
            </>
          )}
        </div>
    </main>   
    </AppLayout>
  );
}
