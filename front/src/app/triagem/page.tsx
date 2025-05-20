"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import "@govbr-ds/core/dist/core.min.css";

const BrInput = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrInput), { ssr: false }
);

const BrButton = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrButton), { ssr: false }
);

export default function TriagemPage() {
  const [formData, setFormData] = useState({
    curso: "",
    telefone: "",
    email: "",
    laudo: null,
    necessidades: [],
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-green-800">
        Triagem
      </h1>

      {/* Informações iniciais */}
      <div className="grid md:grid-cols-4 gap-4">
        {/* <BrSelect label="Curso" class="w-full">
          <option value="">Selecione o curso</option>
          <option value="ads">ADS</option>
          <option value="info">Informática</option>
        </BrSelect> */}

        <BrInput label="Telefone do responsável" type="tel" class="w-full" />
        <BrInput label="E-mail" type="email" class="w-full" />
        <BrInput label="Enviar laudo" type="file" class="w-full" />
      </div>

      {/* Necessidade Específica */}
      <div>
        <p className="font-semibold mt-6 mb-2">Necessidade Específica <span className="text-red-500">*</span></p>
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
            <label key={label} className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Casos de deficiência física */}
      <div className="border-t pt-4">
        <h2 className="font-semibold">Casos de Deficiência Física</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-2">
          <div>
            <p>Necessita de transcritor?</p>
            <label><input type="radio" name="transcritor" /> Sim</label>
            <label className="ml-4"><input type="radio" name="transcritor" /> Não</label>
          </div>
          <div>
            <p>Necessita de acesso para cadeirante?</p>
            <label><input type="radio" name="cadeirante" /> Sim</label>
            <label className="ml-4"><input type="radio" name="cadeirante" /> Não</label>
          </div>
          <BrInput label="Outras condições/recursos específicos necessários" class="w-full" />
        </div>
      </div>

      {/* Repetir estrutura similar para as outras seções: Visual, Auditiva, Transtornos, Outros */}

      <div className="flex justify-between mt-8">
        <BrButton type="button" >
          Voltar
        </BrButton>
        <BrButton type="submit" >
          Salvar
        </BrButton>
      </div>
    </div>
  );
}
