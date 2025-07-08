"use client";

import dynamic from "next/dynamic";
import "@govbr-ds/core/dist/core.min.css";
import AppLayout from "@/components/AppLayout";
import { useEffect, useState } from "react";
import { getAnamneseByEmail } from "@/api/anamnesis";
import { AnamnesisData } from "@/interfaces/AnamnesisData";
import { decodeToken } from "@/services/auth/decodeToken";
import { useAuth } from "@/contexts/AuthContext";
import { ESTUDANTE } from "@/consts";

const BrInput = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrInput), { ssr: false }
);
const BrCheckbox = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrCheckbox), { ssr: false }
);

export default function AnamnesePage() {
  const [ anamnesis, setAnamnesis ] = useState<AnamnesisData | null>(null);
  const [ isStudent, setStudent ] = useState<boolean>(true);
  const { user, loading } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = decodeToken();

        if (token) {
          const data = await getAnamneseByEmail(token.email);
          setAnamnesis(data);

          if (token.id_level !== ESTUDANTE) {
            setStudent(false);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar anamnese", error);
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
        { href: '/anamnese', label: 'Anamnese' },
      ]}
    >
      <div className="p-6 space-y-8 w-full">
        <h1 className="text-3xl font-bold text-gray-800">Anamnese</h1>

        {/* Identificação */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Identificação</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <BrInput label="Nome completo" class="w-full" value={anamnesis?.identification.nome_completo || ''} disabled={isStudent}/>
            <BrInput label="Data de Nascimento" class="w-full" value={anamnesis?.identification.data_de_nascimento || ''} disabled={isStudent}/>
            <BrInput label="Endereço" class="w-full" value={anamnesis?.identification.endereco || ''} disabled={isStudent}/>
            <BrInput label="CEP" class="w-full" value={anamnesis?.identification.cep || ''} disabled={isStudent}/>
            <BrInput label="Curso" class="w-full" value={anamnesis?.identification.curso || ''} disabled={isStudent}/>
            <BrInput label="Série de escolaridade" class="w-full" value={anamnesis?.identification.serie_de_escolaridade_atual || ''} disabled={isStudent}/>
            <BrInput label="Turma" class="w-full" value={anamnesis?.identification.turma || ''} disabled={isStudent}/>
          </div>
        </section>

        {/* Dados Familiares */}
        <section className="border-t">
          <h2 className="text-xl font-semibold mb-4">Dados familiares</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <BrInput label="Nome do pai" class="w-full" value={anamnesis?.family_data.nome_pai || ''} disabled={isStudent}/>
            <BrInput label="Profissão" class="w-full" value={anamnesis?.family_data.profissao_pai || ''} disabled={isStudent}/>
            <BrInput label="Escolaridade" class="w-full" value={anamnesis?.family_data.escolaridade_pai || ''} disabled={isStudent}/>
            <BrInput label="Idade" class="w-full" value={anamnesis?.family_data.idade_pai || ''} disabled={isStudent}/>

            <BrInput label="Nome da mãe" class="w-full" value={anamnesis?.family_data.nome_mae || ''} disabled={isStudent}/>
            <BrInput label="Profissão" class="w-full" value={anamnesis?.family_data.profissao_mae || ''} disabled={isStudent}/>
            <BrInput label="Escolaridade" class="w-full" value={anamnesis?.family_data.escolaridade_mae || ''} disabled={isStudent}/>
            <BrInput label="Idade" class="w-full" value={anamnesis?.family_data.idade_mae || ''} disabled={isStudent}/>
          </div>

          <div className="mt-4 space-y-2">
            <label className="text-sm font-medium text-black">Pais</label>
            <div className="flex flex-wrap gap-4">
              <BrCheckbox label="Casados" name="estado-pais" checked={anamnesis?.family_data.uniao_pais.casados || false} disabled={isStudent} />
              <BrCheckbox label="Separados" name="estado-pais" checked={anamnesis?.family_data.uniao_pais.separados || false} disabled={isStudent} />
              <BrCheckbox label="Separados como uma nova estrutura familiar" name="estado-pais" checked={anamnesis?.family_data.uniao_pais.separados_como_nova_estrutura_familia || false} disabled={isStudent} />
            </div>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <BrInput label="Em caso de separação, o estudante vive com quem?" class="w-full" value={anamnesis?.family_data.estudante_reside_com_quem || ''} disabled={isStudent}/>
            <BrInput label="Reação do estudante à situação" class="w-full" value={anamnesis?.family_data.reacao_estudante_situacao || ''} disabled={isStudent}/>
          </div>
        </section>

        {/* Condições familiares do estudante */}
        <section className="border-t">
          <h2 className="text-xl font-semibold mb-4">Condições familiares do estudante</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Condições de moradia</p>
              <div className="flex space-x-3">
                <BrCheckbox label="Taipa" name="Taipa" checked={anamnesis?.family_conditions.moradia.taipa || false} disabled={isStudent} />
                <BrCheckbox label="Alvenaria" name="Alvenaria" checked={anamnesis?.family_conditions.moradia.alvenaria || false} disabled={isStudent} />
                <BrCheckbox label="Palafita" name="Palafita" checked={anamnesis?.family_conditions.moradia.palafita || false} disabled={isStudent} />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Convívio familiar</p>
              <div className="flex space-x-3">
                <BrCheckbox label="Excelente" name="Excelente" checked={anamnesis?.family_conditions.convivio_familiar.excelente || false} disabled={isStudent} />
                <BrCheckbox label="Bom" name="Bom" checked={anamnesis?.family_conditions.convivio_familiar.bom || false} disabled={isStudent} />
                <BrCheckbox label="Problemático" name="Problemático" checked={anamnesis?.family_conditions.convivio_familiar.problematico || false} disabled={isStudent} />
                <BrCheckbox label="Precário" name="Precário" checked={anamnesis?.family_conditions.convivio_familiar.precario || false} disabled={isStudent} />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Qualidade de comunicação</p>
              <div className="flex space-x-3">
                <BrCheckbox label="Excelente" name="Excelente" checked={anamnesis?.family_conditions.qualidade_comunicacao_com_estudante.execelente || false} disabled={isStudent} />
                <BrCheckbox label="Boa" name="Boa" checked={anamnesis?.family_conditions.qualidade_comunicacao_com_estudante.boa || false} disabled={isStudent} />
                <BrCheckbox label="Ruim" name="Ruim" checked={anamnesis?.family_conditions.qualidade_comunicacao_com_estudante.ruim || false} disabled={isStudent} />
                <BrCheckbox label="Péssima" name="Péssima" checked={anamnesis?.family_conditions.qualidade_comunicacao_com_estudante.pessima || false} disabled={isStudent} />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <BrInput label="Que medidas disciplinares normalmente são usadas com o estudante" class="w-full" value={anamnesis?.family_conditions.medidas_disciplinares_com_estudante || ''} disabled={isStudent}/>
            <BrInput label="Quem as usa" class="w-full" value={anamnesis?.family_conditions.quem_usa_medidas_disciplinares || ''} disabled={isStudent}/>
            <BrInput label="Quais as reações do estudante frente a essas medidas" class="w-full" value={anamnesis?.family_conditions.reacao_estudante_frente_medidas || ''} disabled={isStudent}/>
            <BrInput label="Como reage quando contrariado" class="w-full" value={anamnesis?.family_conditions.reacao_contrariado || ''} disabled={isStudent}/>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium mb-2">Condições do ambiente familiar para a aprendizagem escolar</p>
            <BrInput
              label="Condição"
              class="w-full"
              value={anamnesis?.family_conditions.condicao_ambiente_familiar_aprendizagem_escolar || ''}
disabled={isStudent}            />
          </div>
        </section>

        {/* Botões */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full">
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
