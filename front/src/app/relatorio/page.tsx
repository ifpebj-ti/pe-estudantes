"use client";

import dynamic from "next/dynamic";
import "@govbr-ds/core/dist/core.min.css";
import AppLayout from "@/components/AppLayout";

const BrCheckbox = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrCheckbox),
  { ssr: false }
);

export default function RelatorioPage() {
  return (
    <AppLayout
      breadcrumbs={[
        { href: "/", label: "Página Inicial" },
        { href: "/joao-bosco", label: "João Bosco de Siqueira Filho" },
        { href: "/pei", label: "PEI" },
      ]}
    >
      <div className="p-6 space-y-8 w-full">
        <h1 className="text-3xl font-bold text-gray-800">
          Relatório Educacional Individualizado e Multiprofissional
        </h1>

        {/* Estudante */}
        <section>
          <label className="text-sm font-medium text-black">Estudante</label>
          <br />
          <select className="border border-gray-400 rounded px-3 py-2 text-sm italic text-gray-700">
            <option value="" disabled selected>
              Selecione o estudante
            </option>
            <option value="1">Nome do Estudante</option>
          </select>
        </section>

        {/* Rotina Escolar */}
        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Rotina Escolar</h2>

          <div className="flex space-y-8 flex-wrap">
            <div className="flex flex-col gap-4">
              <div className="font-bold">Entrada em sala de aula</div>
              <div className="flex flex-row gap-4 min-w-[25vw]">
                  <BrCheckbox name="hour" label="19:00 horas" />
                  <BrCheckbox name="hour" label="Atrasos frequentes" />
                  <BrCheckbox name="hour" label="07:30" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="font-bold">Transporte utilizado</div>
              <div className="flex flex-row gap-4 min-w-[50vw]">
                  <BrCheckbox name="transporte" label="Carro próprio" />
                  <BrCheckbox name="transporte" label="Ônibus coletivo institucional" />
                  <BrCheckbox name="transporte" label="Transporte institucional específico (Van)" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="font-bold">Intervalo e Refeição</div>
              <div className="flex flex-wrap gap-4 max-w-[50vw]">
                  <BrCheckbox name="refeicao" label="Sempre acompanha os colegas ao refeitório" />
                  <BrCheckbox name="refeicao" label="Algumas vezes acompanha os colegas ao refeitório" />
                  <BrCheckbox name="refeicao" label="Prefere ficar em sala de aula" />
                  <BrCheckbox name="refeicao" label="Quando orientado, estimulado e acompanhado realiza as refeições" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="font-bold">Dependência</div>
              <div className="flex flex-row gap-4 min-w-[50vw]">
                  <BrCheckbox name="dependencia" label="É independente" />
                  <BrCheckbox name="dependencia" label="É parcialmente dependente" />
                  <BrCheckbox name="dependencia" label="É dependente" />
              </div>
            </div>
          </div>
        </section>

        {/* Relacionamento */}
        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">
            Relacionamento do estudante com o corpo docente e discente
          </h2>

          <div className="flex space-y-8 flex-wrap">
            <div className="flex flex-col gap-4">
              <div className="font-bold">Comportamento em sala</div>
              <div className="flex flex-wrap gap-4 max-w-[80vw]">
                  <BrCheckbox name="comportamento" label="A maioria das vezes quieto (a)" />
                  <BrCheckbox name="comportamento" label="Sempre quieto (a)" />
                  <BrCheckbox name="comportamento" label="Sempre está agitado (a)" />
                  <BrCheckbox name="comportamento" label="Mantem-se calmo (a) a aula toda" />
                  <BrCheckbox name="comportamento" label="As vezes agitado (a) durante a aula" />
                  <BrCheckbox name="comportamento" label="Assina a chamada" />
                  <BrCheckbox name="comportamento" label="Responde à chamada" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="font-bold">Socialização e participação efetiva</div>
              <div className="flex flex-wrap gap-4 max-w-[50vw]">
                  <BrCheckbox name="partcipacao" label="Raramente socializa-se com os colegas" />
                  <BrCheckbox name="partcipacao" label="Socializa bem com os colegas" />
                  <BrCheckbox name="partcipacao" label="Quando solicitado pelo professor sempre cumpre as demandas" />
                  <BrCheckbox name="partcipacao" label="Quando solicitado pelo professor às vezes cumpre as demandas" />
                  <BrCheckbox name="partcipacao" label="Fala em público raramente" />
                  <BrCheckbox name="partcipacao" label="Não fala em público" />
                  <BrCheckbox name="partcipacao" label="Fala em público frequentemente" />
                  <BrCheckbox name="partcipacao" label="Participa de atividades práticas" />
                  <BrCheckbox name="partcipacao" label="Demonstra interesse por algum conteúdo" />
                  <BrCheckbox name="partcipacao" label="Quando em equipe, trabalha bem" />
                  <BrCheckbox name="partcipacao" label="Atividade individual desenvolve melhor este estudante" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="font-bold">Comunicação</div>
              <div className="flex flex-wrap gap-4">
                  <BrCheckbox name="comunicacao" label="Não se comunica" />
                  <BrCheckbox name="comunicacao" label="Comunica-se pouco" />
                  <BrCheckbox name="comunicacao" label="Raramente comunica-se" />
                  <BrCheckbox name="comunicacao" label="Comunica-se quando estimulado (a)" />
                  <BrCheckbox name="comunicacao" label="Bastante comunicativo (a)" />
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-center gap-4 mt-20">
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
