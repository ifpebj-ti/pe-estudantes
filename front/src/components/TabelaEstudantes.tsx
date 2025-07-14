// components/TabelaEstudantes.tsx

"use client";

import { getAllStudents } from "@/api/students";
import { useAuth } from "@/contexts/AuthContext";
import { StudentData } from "@/interfaces/StudentData";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TabelaEstudantes() {
  const [busca, setBusca] = useState("");
  const router = useRouter();
  const [ students, setStudents ] = useState<StudentData[] | null>(null);
  const { loading } = useAuth();

  const filtrados = students?.filter(e =>
    e.full_name.toLowerCase().includes(busca.toLowerCase())
  );

  const handleVerEstudante = (estudante: StudentData) => {
    const nome = estudante.full_name;
    const cpf = estudante.cpf;
    const email = estudante.email;
    const responsavel = estudante.pedagogical_manager;
    const id = estudante.id; 
    
    router.push(`/estudantes/visualizar?id=${id}&nome=${nome}&cpf=${cpf}&email=${email}&responsavel=${responsavel}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (error) {
        console.error("Erro ao buscar estudantes", error);
      }
    }
    fetchData();
  }, []);

  if (loading) return null; //ADICIONAR COMPONENTE DE LOADING

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
          {filtrados?.map((estudante, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-3">{estudante.full_name}</td>
              <td className="p-3">{estudante.cpf}</td>
              <td className="p-3">{estudante.email}</td>
              <td className="p-3">{estudante.pedagogical_manager}</td>
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
        <div>Exibir <span className="font-semibold">{students?.length}</span> de 100 itens</div>
        <div className="flex items-center space-x-2">
          <span>Página</span>
          <select className="border rounded px-2 py-1">
            <option>1</option>
            {/* outras opções aqui */}
          </select>
          <button>{"<"}</button>
          <button>{">"}</button>
        </div>
      </div>
    </div>
  );
}
