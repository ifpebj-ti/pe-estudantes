"use client";

import dynamic from "next/dynamic";
import "@govbr-ds/core/dist/core.min.css";
import AppLayout from "@/components/AppLayout";
import { useEffect, useState } from "react";
import { PlansEducationData } from "@/interfaces/PlansEducationData";
import { useAuth } from "@/contexts/AuthContext";
import { decodeToken } from "@/services/auth/decodeToken";
import { getPEIByEmail } from "@/api/plans-education";
import { ESTUDANTE } from "@/consts";
import { useRouter } from "next/navigation";

const BrInput = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrInput), { ssr: false }
);

const BrCheckbox = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrCheckbox), { ssr: false }
);

export default function PEIPage() {
  const [ pei, setPei ] = useState<PlansEducationData | null>(null);
  const [ isStudent, setStudent ] = useState<boolean>(true);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = decodeToken();

        if (token) {
          const data = await getPEIByEmail(token.email);
          setPei(data);

          if (token.id_level !== ESTUDANTE) {
            setStudent(false);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar PEI", error);
      }
    }

    fetchData();
  }, []);

  if (loading) return null; //ADICIONAR COMPONENTE DE LOADING

  return (
    <AppLayout
      breadcrumbs={[
        { href: '/home', label: 'Página Inicial' },
        { href: '#', label: user?.name || 'Estudante' },
        { href: '/pei', label: 'PEI' },
      ]}
    >
      <div className="p-6 space-y-8 w-full">
        <h1 className="text-3xl font-bold text-gray-800">PEI - Plano de Ensino Individualizado</h1>

        {/* Seleções iniciais */}
        {user?.id_level !== ESTUDANTE && (
          <section className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-black">Estudante que acompanha</label>
              <select className="border border-gray-400 rounded px-3 py-2 text-sm italic text-gray-700" defaultValue="">
                <option value="" disabled>Selecione o estudante</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-black">Semestre letivo</label>
              <select className="border border-gray-400 rounded px-3 py-2 text-sm italic text-gray-700" defaultValue="">
                <option value="" disabled>Selecione o semestre</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-black">Modalidade de atendimento</label>
              <select className="border border-gray-400 rounded px-3 py-2 text-sm italic text-gray-700" defaultValue="">
                <option value="" disabled>Selecione a modalidade</option>
              </select>
            </div>
          </section>
        )}
        {/* Serviço de Apoio */}
        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Serviço de Apoio</h2>
          <div className="flex flex-wrap gap-4">
            <BrCheckbox
              label="Agente de Apoio à Educação Especial - Profissional Neuropsicopedagogo"
              name="Neuropsicopedagogo"
              checked={pei?.support_service.agente_educacao_especial_neuropsicopedagoro || false}
              disabled={isStudent}
            />
            <BrCheckbox
              label="Intérprete"
              name="Interprete"
              checked={pei?.support_service.interprete || false}
              disabled={isStudent}
            />
            <BrCheckbox
              label="Instrutor"
              name="Instrutor"
              checked={pei?.support_service.instrutor || false}
              disabled={isStudent}
            />
            <BrCheckbox
              label="Voluntário"
              name="Voluntário"
              checked={pei?.support_service.voluntario || false}
              disabled={isStudent}
            />
          </div>
        </section>

        {/* Habilidades e Potencialidades */}
        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Habilidades e Potencialidades</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {Object.entries(pei?.skills || {}).map(([key, value]) => (
              <BrCheckbox
                key={key}
                label={key.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                name={key}
                checked={typeof value === "boolean" ? value : false}
                disabled={isStudent}
              />
            ))}
          </div>
        </section>


        {/* Tipo de recurso já utilizado */}
        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Tipo de recurso e/ou equipamento já utilizado pelo aluno</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {Object.entries(pei?.resource_equipment_used || {}).map(([key, value]) =>
              key !== "outro" && (
                <BrCheckbox
                  key={key}
                  label={key.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  name={key}
                  checked={typeof value === "boolean" ? value : false}
                  disabled={isStudent}
                />
              )
            )}
          </div>
        </section>


        {/* Tipo de recurso que precisa ser providenciado */}
        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Tipo de recurso e/ou equipamento que precisa ser providenciado para o aluno</h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(pei?.resource_equipment_needs || {}).map(([key, value]) =>
              key !== "outro" && (
                <BrCheckbox
                  key={key}
                  label={key.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  name={key}
                  checked={typeof value === "boolean" ? value : false}
                  disabled={isStudent}
                />
              )
            )}
          </div>
        </section>


        {/* Botões */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full" onClick={() => router.push('/')}>
            Voltar
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full" disabled={isStudent}>
            Salvar
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
