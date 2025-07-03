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

export default function PEIPage() {
  return (
    <AppLayout
      breadcrumbs={[
        { href: '/home', label: 'Página Inicial' },
        { href: '/joao-bosco', label: 'João Bosco de Siqueira Filho' },
        { href: '/pei', label: 'PEI' },
      ]}
    >
      <div className="p-6 space-y-8 w-full">
        <h1 className="text-3xl font-bold text-gray-800">PEI - Plano de Ensino Individualizado</h1>

        {/* Seleções iniciais */}
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

        {/* Serviço de Apoio */}
        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Serviço de Apoio</h2>
          <div className="flex flex-wrap gap-4">
            <BrCheckbox label="Agente de Apoio à Educação Especial - Profissional Neuropsicopedagogo" name="Neuropsicopedagogo" />
            <BrCheckbox label="Intérprete" name="Interprete" />
            <BrCheckbox label="Instrutor" name="Instrutor" />
            <BrCheckbox label="Voluntário" name="Voluntário" />
          </div>
        </section>

        {/* Habilidades e Potencialidades */}
        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Habilidades e Potencialidades</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              "Atenção em sala de aula", "Manter interesse no ambiente escolar", "Possuir concentração nas atividades propostas",
              "Possuir memória auditiva-visual-sequencial", "Possuir raciocínio lógico-matemático", "Realizar sequência lógica dos fatos",
              "Possuir interesse por objetos", "Elaborar a exploração adequada dos objetos", "Realizar a comparação – Associação – Classificação",
              "Realizar abstração (conduta simbólica)", "Possuir discriminação visual-auditiva-tátil", "Possuir organização",
              "Apresentar noções de autopreservação (higiene)", "Utilizar estratégias para adquirir, organizar e utilizar o conhecimento",
              "Planejar as próprias ações", "Executar correções", "Julgar adequadamente as situações", "Relacionar-se socialmente",
              "Possuir autoestima – Resistência e frustração", "Possuir cooperação – Humor – Agressividade", "Apresentar autoagressão",
              "Apresentar timidez – Iniciativa – Respeito", "Apresentar colaboração – Motivação – Isolamento", "Respeitar regras e rotina",
              "Apresentar iniciativa social", "Manter comportamento adequado em público", "Conseguir permanecer em sala (tempo)",
              "Ter foco nas atividades", "Atender quando solicitado", "Compreender o que é falado",
              "Apropriar-se das diferentes formas de comunicação: olhar, gestos, expressões faciais, movimentos de cabeça, sons guturais, LIBRAS",
              "Falar palavras inteligíveis", "Adequar-se às situações de comunicação", "Realizar muito esforço para comunicar-se",
              "Apresentar correspondência entre pensamento/fala"
            ].map((item, idx) => (
              <BrCheckbox key={idx} label={item} name={item}/>
            ))}
          </div>
        </section>

        {/* Tipo de recurso já utilizado */}
        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Tipo de recurso e/ou equipamento já utilizado pelo aluno</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Reduzir a quantidade de material e atividade", "Fazer provas orais ou com escrita mínima",
              "Oferecer mais tempo para conclusão de trabalhos e avaliações que solicitem a leitura",
              "Avaliar por questões de múltipla escolha em vez de questões discursivas",
              "Dar ao aluno orientações mais diretas e instruções claras durante a aula",
              "Evite dar nota para caligrafia ou ortografia", "Encoraje à prática da escrita",
              "Concentre as notas das avaliações na originalidade e nas riquezas das ideias"
            ].map((item, idx) => (
              <BrCheckbox key={idx} label={item} name={item}/>
            ))}
          </div>
        </section>

        {/* Tipo de recurso que precisa ser providenciado */}
        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Tipo de recurso e/ou equipamento que precisa ser providenciado para o aluno</h2>
          <div className="flex flex-wrap gap-4">
            <BrCheckbox label="Necessita de acompanhante em sala de aula" name="acompanhante" />
            <BrCheckbox label="Necessita de adaptação na metodologia do professor" name="metodologia" />
            <BrCheckbox label="Necessita de compreensão e companheirismo por parte da turma" name="companheirismo"/>
          </div>
        </section>

        {/* Botões */}
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
