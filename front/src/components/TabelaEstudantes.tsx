// components/TabelaEstudantes.tsx

"use client";

import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const estudantes = [
  {
    nome: "João Bosco de Siqueira Filho",
    cpf: "072.923.064-38",
    email: "jbsf3@discente.ifpe.edu.br",
    responsavel: "Francisca de Paula da Silva Araújo",
    endereco: "Rua São Lourenço, 2B, Centro, Belo Jardim",
  },
  {
    nome: "Luiz Carlos Oliveira Maciel",
    cpf: "072.923.064-38",
    email: "jbsf3@discente.ifpe.edu.br",
    responsavel: "Francisca de Paula da Silva Araújo",
    endereco: "Rua São Lourenço, 2B, Centro, Belo Jardim",
  },
  {
    nome: "Guilherme Lyare W. da Silva",
    cpf: "072.923.064-38",
    email: "jbsf3@discente.ifpe.edu.br",
    responsavel: "Francisca de Paula da Silva Araújo",
    endereco: "Rua São Lourenço, 2B, Centro, Belo Jardim",
  },
];

export default function TabelaEstudantes() {
  const [busca, setBusca] = useState("");
  const router = useRouter();

  const filtrados = estudantes.filter(e =>
    e.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleVerEstudante = (estudante: typeof estudantes[0]) => {
    const query = new URLSearchParams(estudante).toString();
    router.push(`/estudantes/visualizar?${query}`);
  };

  return (
    <div className="bg-white rounded shadow-md">
      <div className="p-4 flex justify-end">
        <input
          type="text"
          placeholder="Por quem você busca?"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-80 border rounded px-3 py-2"
        />
      </div>

      <table className="min-w-full table-auto text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3">Nome</th>
            <th className="p-3">CPF</th>
            <th className="p-3">E-mail</th>
            <th className="p-3">Responsável Pedagógico</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((estudante, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-3">{estudante.nome}</td>
              <td className="p-3">{estudante.cpf}</td>
              <td className="p-3">{estudante.email}</td>
              <td className="p-3">{estudante.responsavel}</td>
              <td className="p-3 text-center">
                <Eye
                  className="w-5 h-5 text-gray-600 cursor-pointer"
                  onClick={() => handleVerEstudante(estudante)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-600 border-t">
        <div>Exibir <span className="font-semibold">10</span> de 100 itens</div>
        <div className="flex items-center space-x-2">
          <span>Página</span>
          <select className="border rounded px-2 py-1">
            <option>12</option>
            {/* outras opções aqui */}
          </select>
          <button>{"<"}</button>
          <button>{">"}</button>
        </div>
      </div>
    </div>
  );
}
