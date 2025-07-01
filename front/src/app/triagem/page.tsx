"use client";

import dynamic from "next/dynamic";
import "@govbr-ds/core/dist/core.min.css";
import AppLayout from "@/components/AppLayout";

const BrInput = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrInput), { ssr: false }
);

const BrButton = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrButton), { ssr: false }
);

const BrCheckbox = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrCheckbox), { ssr: false }
);

export default function TriagemPage() {
  // const [formData, setFormData] = useState({
  //   curso: "",
  //   telefone: "",
  //   email: "",
  //   laudo: null,
  //   necessidades: [],
  // });

  return (
    <AppLayout
      breadcrumbs={[
          { href: '/home', label: 'Página Inicial' },
          { href: '/joao-bosco', label: 'João Bosco de Siqueira Filho' },
          { href: '/triagem', label: 'Triagem' },
        ]}
    >
      <div className="p-6 space-y-8 w-full">
        <h1 className="text-2xl font-bold text-green-800">
          Triagem
        </h1>
        {/* Informações iniciais */}
        <div className="grid md:grid-cols-4 gap-4">
      
           <div className="flex flex-col space-y-1">
            <label htmlFor="course" className="text-sm font-medium text-black">
              Curso
            </label>
            <select
              id="course"
              name="course"
              className="border border-gray-400 rounded px-3 py-2 text-sm italic text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue=""
            >
              <option value="" disabled>
                Selecione o curso
              </option>
              <option value="enfermagem">Enfermagem</option>
              <option value="engenharia">Eng. de Software</option>
              <option value="agropecuaria">Agropecuária</option>
            </select>
          </div>
          <BrInput label="Telefone do responsável" type="tel" class="w-full" />
          <BrInput label="E-mail" type="email" class="w-full" />
          <div className="flex flex-col space-y-2">
            <label htmlFor="file" className="text-sm font-medium text-black">
              Enviar laudo
            </label>
            <label
              htmlFor="file"
              className="flex items-center justify-center gap-2 border-2 border-dashed border-blue-500 text-blue-600 text-sm px-4 py-2 rounded cursor-pointer hover:bg-blue-50 transition"
            >
              <span className="text-sm italic text-blue-600">Selecione o(s) laudo(s)</span>
              <input
                id="file"
                type="file"
                className="hidden"
                multiple
              />
            </label>
          </div>
        </div>
        {/* Necessidade Específica */}
        <div className="border-t pt-4">
          <h2>Necessidade Específica <span className="text-red-500">*</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              "Deficiência Física",
              "Deficiência Auditiva/Surdez",
              "Baixa Visão",
              "Surdocegueira",
              "Cegueira",
              "Altas habilidades/superdotação",
              "Transtornos globais do desenvolvimento",
              "Distúrbios de aprendizagem",
              "Outro"
            ].map((label) => (
              <BrCheckbox name={label} key={label} label={label}  />
            ))}
          </div>
        </div>
        {/* Casos de deficiência física */}
        <div className="border-t pt-4">
          <h2 className="font-semibold">Casos de Deficiência Física</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-2">
            <div>
              <p>Necessita de transcritor?</p>
              <div className="flex items-center gap-2">
                <BrCheckbox name="transcritor" key="sim" label="Sim" />
                <BrCheckbox name="transcritor" key="nao" label="Não" />
              </div>
            </div>
            <div>
              <p>Necessita de acesso para cadeirante?</p>
              <div className="flex items-center gap-2">
                <BrCheckbox name="cadeirante" key="sim" label="Sim" />
                <BrCheckbox name="cadeirante" key="nao" label="Não" />
              </div>
            </div>
            <BrInput
              label="Outras condições/recursos específicos necessários"
              placeholder="Digite"
              class="w-full"
            />
          </div>
        </div>
        {/* Casos de Deficiência Visual */}
        <div className="border-t pt-4">
          <h2 className="font-semibold">Casos de Deficiência Visual</h2>
          <div className="grid md:grid-cols-4 gap-4 mt-4">
            {/* Material em Braille */}
            <div>
              <p className="text-sm font-medium mb-1">Necessita de material didático em Braille?</p>
              <div className="flex items-center gap-2">
                <BrCheckbox name="braille" key="sim" label="Sim" />
                <BrCheckbox name="braille" key="nao" label="Não" />
              </div>
            </div>
            {/* Texto ampliado */}
            <div>
              <p className="text-sm font-medium mb-1">Necessita de material didático com texto ampliado?</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                <BrCheckbox name="ampliado" key="sim" label="Sim" />
                <BrCheckbox name="ampliado" key="nao" label="Não" />
              </div>
                <input
                  type="text"
                  placeholder="Digite o tamanho da fonte"
                  className="border text-sm italic px-2 py-1 rounded"
                />
              </div>
            </div>
            {/* Ledor/transcritor */}
            <div>
              <p className="text-sm font-medium mb-1">Necessita de ledor/transcritor?</p>
              <div className="flex items-center gap-2">
                <BrCheckbox name="ledor" key="sim" label="Sim" />
                <BrCheckbox name="ledor" key="nao" label="Não" />
              </div>
            </div>
            {/* Outras condições */}
            <div className="col-span-4">
              <p className="text-sm font-medium mb-1">Outras condições/recursos específicos necessários:</p>
              <BrInput
                type="text"
                placeholder="Digite"
                className="w-1/4"
              />
            </div>
          </div>
        </div>
        {/* Casos de Deficiência Auditiva */}
        <div className="border-t pt-4">
          <h2 className="font-semibold">Casos de Deficiência Auditiva</h2>
          <div className="grid md:grid-cols-4 gap-4 mt-4">
            <div>
              <p className="text-sm font-medium mb-1">Necessita de Tradutor Intérprete de Língua de Sinais</p>
              <div className="flex items-center gap-2">
                <BrCheckbox name="tradutor" key="sim" label="Sim" />
                <BrCheckbox name="tradutor" key="nao" label="Não" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Necessita de Intérprete repetidor/oralizador?</p>
              <div className="flex items-center gap-2">
                <BrCheckbox name="repetidor" key="sim" label="Sim" />
                <BrCheckbox name="repetidor" key="nao" label="Não" />
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium mb-1">Outras condições/recursos específicos necessários:</p>
              <BrInput
                type="text"
                placeholder="Digite"
                className="w-full"
              />
            </div>
          </div>
        </div>
        {/* Casos de Transtornos Globais / Altas Habilidades */}
        <div className="border-t pt-4">
          <h2 className="font-semibold">
            Casos de Transtornos Globais do Desenvolvimento/AltasHabilidades/Superdotação/Distúrbios de Aprendizagem
          </h2>
          <div className="grid md:grid-cols-4 gap-4 mt-4">
            <div>
              <p className="text-sm font-medium mb-1">Necessita de ledor?</p>
              <div className="flex items-center gap-2">
                <BrCheckbox name="ledor" key="sim" label="Sim" />
                <BrCheckbox name="ledor" key="nao" label="Não" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Necessita de transcritor?</p>
              <div className="flex items-center gap-2">
                <BrCheckbox name="transcritor-globais" key="sim" label="Sim" />
                <BrCheckbox name="transcritor-globais" key="nao" label="Não" />
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium mb-1">Outras condições/recursos específicos necessários:</p>
              <BrInput
                type="text"
                placeholder="Digite o telefone do responsável"
                className="w-full"
              />
            </div>
          </div>
        </div>
        {/* Outros casos de deficiência */}
        <div className="border-t pt-4">
          <h2 className="font-semibold">Outros casos de deficiência</h2>
          <div className="mt-2">
            <p className="text-sm font-medium mb-1">Tipo de recurso específico</p>
            <BrInput
              type="text"
              placeholder="Digite o tipo de recurso específico"
              className="w-2/6"
            />
          </div>
        </div>
        {/* Repetir estrutura similar para as outras seções: Visual, Auditiva, Transtornos, Outros */}
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
