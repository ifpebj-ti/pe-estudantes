"use client";

import dynamic from "next/dynamic";
import "@govbr-ds/core/dist/core.min.css";
import AppLayout from "@/components/AppLayout";
import { useEffect, useState } from "react";
import { decodeToken } from "@/services/auth/decodeToken";
import { useAuth } from "@/contexts/AuthContext";
import { ESTUDANTE } from "@/consts";
import { ScreeningData } from "@/interfaces/ScreeningData";
import { getScreeningByEmail } from "@/api/screenings";
import { useRouter } from "next/navigation";

const BrInput = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrInput), { ssr: false }
);
const BrCheckbox = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrCheckbox), { ssr: false }
);

export default function TriagemPage() {
  const [screening, setScreening] = useState<ScreeningData | null>(null);
  const [isStudent, setIsStudent] = useState(true);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = decodeToken();
        if (token) {
          const data = await getScreeningByEmail(token.email);
          setScreening(data);
          if (token.id_level !== ESTUDANTE) {
            setIsStudent(false);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar triagem", error);
      }
    }

    fetchData();
  }, []);

  if (loading) return null;

  return (
    <AppLayout
      breadcrumbs={[
        { href: "/home", label: "Página Inicial" },
        { href: "#", label: user?.name || "Estudante" },
        { href: "/triagem", label: "Triagem" },
      ]}
    >
      <div className="p-6 space-y-8 w-full">
        <h1 className="text-2xl font-bold text-green-800">Triagem</h1>

        {/* Informações iniciais */}
        <div className="grid md:grid-cols-4 gap-4">
          <BrInput
            label="Nome completo"
            class="w-full"
            value={screening?.full_name || ""}
            disabled={isStudent}
          />
          <BrInput
            label="E-mail"
            class="w-full"
            value={screening?.email || ""}
            disabled={isStudent}
          />
          <BrInput
            label="Relatório médico"
            class="w-full"
            value={screening?.report || ""}
            disabled={isStudent}
          />
        </div>

        {/* Necessidade Específica */}
        <section className="border-t pt-4">
          <h2>Necessidade Específica</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <BrCheckbox name="specific_need_deficiencia_fisica" label="Deficiência Física" checked={screening?.specific_need.deficiencia_fisica || false} disabled={isStudent} />
            <BrCheckbox name="specific_need_deficiencia_auditiva" label="Deficiência Auditiva/Surdez" checked={screening?.specific_need.deficiencia_auditiva || false} disabled={isStudent} />
            <BrCheckbox name="specific_need_baixa_visao" label="Baixa Visão" checked={screening?.specific_need.baixa_visao || false} disabled={isStudent} />
            <BrCheckbox name="specific_need_surdocegueira" label="Surdocegueira" checked={screening?.specific_need.surdocegueira || false} disabled={isStudent} />
            <BrCheckbox name="specific_need_cegueira" label="Cegueira" checked={screening?.specific_need.cegueira || false} disabled={isStudent} />
            <BrCheckbox name="specific_need_superdotacao" label="Altas habilidades/superdotação" checked={screening?.specific_need.superdotacao || false} disabled={isStudent} />
            <BrCheckbox name="specific_need_transtornos" label="Transtornos globais do desenvolvimento" checked={screening?.specific_need.transtornos_globais_de_desenvolvimento || false} disabled={isStudent} />
            <BrCheckbox name="specific_need_disturbio" label="Distúrbios de aprendizagem" checked={screening?.specific_need.disturbio_de_aprendizagem || false} disabled={isStudent} />
            <BrInput
              label="Outro"
              class="w-full"
              value={screening?.specific_need.outros || ""}
              disabled={isStudent}
            />
          </div>
        </section>

        {/* Deficiência Física */}
        <section className="border-t pt-4">
          <h2>Deficiência Física</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <BrCheckbox name="physical_necessita_transcritor" label="Necessita de transcritor" checked={screening?.physical_disability.necessita_de_transcritor || false} disabled={isStudent} />
            <BrCheckbox name="physical_acesso_cadeirante" label="Necessita de acesso para cadeirante" checked={screening?.physical_disability.acesso_para_cadeirante || false} disabled={isStudent} />
            <BrInput
              label="Outro"
              class="w-full"
              value={screening?.physical_disability.outros || ""}
              disabled={isStudent}
            />
          </div>
        </section>

        {/* Deficiência Visual */}
        <section className="border-t pt-4">
          <h2>Deficiência Visual</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <BrCheckbox name="visual_braille" label="Necessita de material didático em Braille" checked={screening?.visual_impairment.necessita_de_braille || false} disabled={isStudent} />
            <BrCheckbox name="visual_texto_ampliado" label="Material com fonte aumentada" checked={screening?.visual_impairment.material_com_fonte_aumentada || false} disabled={isStudent} />
            <BrCheckbox name="visual_transcritor" label="Necessita de transcritor" checked={screening?.visual_impairment.necessita_de_transcritor || false} disabled={isStudent} />
            <BrInput
              label="Outro"
              class="w-full"
              value={screening?.visual_impairment.outros || ""}
              disabled={isStudent}
            />
          </div>
        </section>

        {/* Deficiência Auditiva */}
        <section className="border-t pt-4">
          <h2>Deficiência Auditiva</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <BrCheckbox name="hearing_libras" label="Necessita de intérprete de língua de sinais" checked={screening?.hearing_impairment.necessita_de_interprete_de_lingua_de_sinais || false} disabled={isStudent} />
            <BrCheckbox name="hearing_oralizador" label="Necessita de intérprete oralizador" checked={screening?.hearing_impairment.necessita_de_interprete_oralizador || false} disabled={isStudent} />
            <BrInput
              label="Outro"
              class="w-full"
              value={screening?.hearing_impairment.outros || ""}
              disabled={isStudent}
            />
          </div>
        </section>

        {/* Transtornos Globais */}
        <section className="border-t pt-4">
          <h2>Transtornos Globais / Altas Habilidades</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <BrCheckbox name="global_ledor" label="Necessita de ledor" checked={screening?.global_disorder.necessita_de_ledor || false} disabled={isStudent} />
            <BrCheckbox name="global_transcritor" label="Necessita de transcritor" checked={screening?.global_disorder.necessita_de_transcritor || false} disabled={isStudent} />
            <BrInput
              label="Outro"
              class="w-full"
              value={screening?.global_disorder.outros || ""}
              disabled={isStudent}
            />
          </div>
        </section>

        {/* Outros Casos */}
        <section className="border-t pt-4">
          <h2>Outros casos de deficiência</h2>
          <BrInput
            label="Descrição"
            class="w-full"
            value={screening?.other_disabilities || ""}
            disabled={isStudent}
          />
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
