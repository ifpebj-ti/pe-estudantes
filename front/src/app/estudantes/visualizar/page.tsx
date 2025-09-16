// app/estudantes/visualizar/page.tsx

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";
import { Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";

function Card({ label, url }: { label: string, url: string }) {
  const router = useRouter();

  return (
    <div className="relative bg-white rounded shadow p-6 flex flex-col items-center justify-center text-center hover:shadow-md" onClick={() => router.push(url)}>
      <span className="text-green-900 font-medium text-sm leading-tight">{label}</span>
    </div>
  );
}

export default function VisualizarPageWrapper() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <VisualizarEstudante />
    </Suspense>
  );
}

function VisualizarEstudante() {
  const searchParams = useSearchParams();
  const nome = searchParams.get("nome");
  const cpf = searchParams.get("cpf");
  const email = searchParams.get("email");
  const responsavel = searchParams.get("responsavel");
  const id = searchParams.get("id");
  const nivelAcesso = searchParams.get("nivelAcesso")

  const { user, loading } = useAuth();
  
  function getLevelName(id_level: string | null) {
    switch(id_level) {
      case '1':
        return "Admin";
      case '2':
        return "Estudante/Família";
      case '3':
        return "Profissional da Educação";
      case '4':
        return "Profissional da Saúde";
      case '5':
        return "Professor";
      default:
        return "Nível desconhecido";
    }
  }

  const telaConfiguracao = (
    <>
      <Card label="Configuracao" url={`/configuracao?id=${id}&nome=${nome}&cpf=${cpf}&email=${email}&responsavel=${responsavel}&nivelAcesso=${nivelAcesso}`} />
    </>
  )

  return (
    <AppLayout
      breadcrumbs={[
        { href: "/home", label: "Página inicial" },
        { href: "/estudantes", label: nome || "Estudante" },
      ]}
    >
      <div className="p-6">
        <div className="overflow-auto rounded shadow">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Nome</th>
                <th className="p-3 text-left">CPF</th>
                <th className="p-3 text-left">E-mail</th>
                <th className="p-3 text-left">Responsável Pedagógico</th>
                <th className="p-3 text-left">Nível de Acesso</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">{nome}</td>
                <td className="p-3">{cpf}</td>
                <td className="p-3">{email}</td>
                <td className="p-3">{responsavel === "null" ? "Responsável não atribuído" : responsavel }</td>
                <td className="p-3">{getLevelName(nivelAcesso)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <Card label="Triagem" url={`/triagem?email=${email}&nome=${nome}`} />
          <Card label="Anamnese" url={`/anamnese?email=${email}&nome=${nome}`} />
          <Card label="Comentários Multiprofissionais" url={`/comentarios?id=${id}&nome=${nome}`}/>
          <Card label="PEI" url={`/pei?email=${email}&nome=${nome}`} />
          <Card label="Exportar Relatório" url={`/relatorio?email=${email}&nome=${nome}`} />
          {!loading && user?.id_level === 1 ? telaConfiguracao : null}
        </div>
      </div>
    </AppLayout>
  );
}
