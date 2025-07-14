// app/estudantes/visualizar/page.tsx

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";

function Card({ label, url }: { label: string, url: string }) {
  const router = useRouter();

  return (
    <div className="relative bg-white rounded shadow p-6 flex flex-col items-center justify-center text-center hover:shadow-md" onClick={() => router.push(url)}>
      <span className="text-green-900 font-medium text-sm leading-tight">{label}</span>
    </div>
  );
}

export default function VisualizarEstudante() {
  const searchParams = useSearchParams();
  const nome = searchParams.get("nome");
  const cpf = searchParams.get("cpf");
  const email = searchParams.get("email");
  const responsavel = searchParams.get("responsavel");
  const id = searchParams.get("id");

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
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">{nome}</td>
                <td className="p-3">{cpf}</td>
                <td className="p-3">{email}</td>
                <td className="p-3">{responsavel === "null" ? "Responsável não atribuído" : responsavel }</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <Card label="Triagem" url={`/triagem?email=${email}&nome=${nome}`} />
          <Card label="Anamnese" url={`/anamnese?email=${email}&nome=${nome}`} />
          <Card label="Comentários Multiprofissionais" url={`/comentarios?id=${id}&nome=${nome}`}/>
          <Card label="PEI" url={`/pei?email=${email}&nome=${nome}`} />
        </div>
      </div>
    </AppLayout>
  );
}