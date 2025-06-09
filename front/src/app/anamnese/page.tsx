"use client";

import dynamic from "next/dynamic";
import "@govbr-ds/core/dist/core.min.css";
import AppLayout from "@/components/AppLayout";

const BrInput = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrInput), { ssr: false }
);

const BrCheckbox = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrCheckbox), { ssr: false }
);

export default function AnamnesePage() {
  return (
    <AppLayout
      breadcrumbs={[
        { href: '/', label: 'Página Inicial' },
        { href: '/joao-bosco', label: 'João Bosco de Siqueira Filho' },
        { href: '/anamnese', label: 'Anamnese' },
      ]}
    >
      <div className="p-6 space-y-8 w-full">
        <h1 className="text-3xl font-bold text-gray-800">Anamnese</h1>

        {/* Identificação */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Identificação</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <BrInput label="Nome completo" class="w-full" />
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-black">Data de nascimento</label>
              <input type="date" className="border rounded px-3 py-2 text-sm" />
            </div>
            <BrInput label="Endereço" class="w-full" />
            <BrInput label="CEP" class="w-full" />

            <div className="md:col-span-1">
              <label className="text-sm font-medium text-black">Curso</label>
              <select
                className="border border-gray-400 rounded px-3 py-2 text-sm italic text-gray-700"
                defaultValue=""
              >
                <option value="" disabled>Selecione o curso</option>
                <option value="enfermagem">Enfermagem</option>
                <option value="engenharia">Eng. de Software</option>
                <option value="agropecuaria">Agropecuária</option>
              </select>
            </div>
            <BrInput label="Série de escolaridade" class="w-full" />
            <BrInput label="Turma" class="w-full" />
          </div>
        </section>

        {/* Dados Familiares */}
        <section className="border-t">
          <h2 className="text-xl font-semibold mb-4">Dados familiares</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <BrInput label="Nome do pai" class="w-full" />
            <BrInput label="Profissão" class="w-full" />
            <BrInput label="Escolaridade" class="w-full" />
            <BrInput label="Idade" class="w-full" />

            <BrInput label="Nome da mãe" class="w-full" />
            <BrInput label="Profissão" class="w-full" />
            <BrInput label="Escolaridade" class="w-full" />
            <BrInput label="Idade" class="w-full" />
          </div>

          <div className="mt-4 space-y-2">
            <label className="text-sm font-medium text-black">Pais</label>
            <div className="flex flex-wrap gap-4">
              <BrCheckbox label="Casados" name="estado-pais" />
              <BrCheckbox label="Separados" name="estado-pais" />
              <BrCheckbox label="Separados como uma nova estrutura familiar" name="estado-pais" />
            </div>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <BrInput label="Em caso de separação, o estudante vive com quem?" class="w-full" />
            <BrInput label="Reação do estudante à situação" class="w-full" />
          </div>
        </section>

        {/* Condições familiares do estudante */}
        {/* max-h-[80px] overflow-y-hidden */}
        <section className="border-t "> 
          <h2 className="text-xl font-semibold mb-4">Condições familiares do estudante</h2>
             <div className="grid md:grid-cols-3 gap-4">
                <div>
                <p className="text-sm font-medium mb-2">Condições de moradia</p>
                <div className="flex space-x-3">
                    <BrCheckbox label="Taipa" name="Taipa" />
                    <BrCheckbox label="Alvenaria" name="Alvenaria" />
                    <BrCheckbox label="Palafita" name="Palafita" />
                </div>
                </div>

                <div>
                <p className="text-sm font-medium mb-2">Convívio familiar</p>
                <div className="flex space-x-3 ">
                    <BrCheckbox label="Excelente" name="Excelente" />
                    <BrCheckbox label="Bom" name="Bom" />
                    <BrCheckbox label="Problemático" name="Problemático" />
                    <BrCheckbox label="Precário" name="Precário" />
                </div>
                </div>

                <div>
                <p className="text-sm font-medium mb-2">Qualidade de comunicação</p>
                <div className="flex space-x-3">
                    <BrCheckbox label="Excelente" name="Excelente" />
                    <BrCheckbox label="Boa" name="Boa" />
                    <BrCheckbox label="Ruim" name="Ruim" />
                    <BrCheckbox label="Péssima" name="Péssima" />
                </div>
                </div>
            </div>
          {/* Relatos */}
            <div className="grid md:grid-cols-2 gap-4 mt-6">
                <BrInput label="Que medidas disciplinares normalmente são usadas com o estudante" class="w-full" />
                <BrInput label="Quem as usa" class="w-full" />
                <BrInput label="Quais as reações do estudante frente a essas medidas" class="w-full" />
                <BrInput label="Como reage quando contrariado" class="w-full" />
            </div>

            {/* Condições do ambiente familiar */}
            <div className="mt-6">
                <p className="text-sm font-medium mb-2">Condições do ambiente familiar para a aprendizagem escolar</p>
                <div className="flex flex-wrap gap-4">
                <BrCheckbox label="Excelente" name="Excelente" />
                <BrCheckbox label="Bom" name="Bom" />
                <BrCheckbox label="Problemático" name="Problemático" />
                <BrCheckbox label="Precário" name="Precário" />
                </div>
            </div>
        </section>
        <div className="flex justify-center gap-4 mt-8">
            <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full">
                Voltar
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full">
                Salvar
            </button>
        </div>
      </div>
    </AppLayout>
  );
}
