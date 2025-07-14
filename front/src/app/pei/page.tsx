/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import "@govbr-ds/core/dist/core.min.css";
import AppLayout from "@/components/AppLayout";
import { Suspense, useEffect, useState } from "react";
import { PlansEducationData } from "@/interfaces/PlansEducationData";
import { useAuth } from "@/contexts/AuthContext";

import { decodeToken } from "@/services/auth/decodeToken";
import { getPEIByEmail, postPEI } from "@/api/plans-education";
import { ESTUDANTE } from "@/consts";
import { useRouter, useSearchParams } from "next/navigation";

const BrInput = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrInput), { ssr: false }
);

const BrCheckbox = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrCheckbox), { ssr: false }
);

// Estado inicial para um novo formulário de PEI, correspondendo ao payload
const initialPEIState: PlansEducationData = {
  professor_email: '',
  professor_name: '',
  student_email: '',
  student_name: '',
  academic_semester: { primeiro_semestre: false, segundo_semestre: false },
  service_modality: { turma_regular: false, atendimento_pedagogico_domiciliar: false, atendimento_pedagogico_hospitalar: false },
  support_service: { agente_educacao_especial_neuropsicopedagoro: false, interprete: false, instrutor: false, voluntario: false, outro: '' },
  skills: { atencao_em_sala_de_aula: false, interesse_ambiente_escolar: false, concentracao_atividades: false, memoria_auditiva_visual_sequencial: false, raciocinio_logico_matematico: false, sequencia_logica_fatos: false, interesse_por_objetos: false, exploracao_adequada_objetos: false, comparacao_associacao_classificacao: false, abstracao_conduta_simbolica: false, discriminacao_visual_auditiva_tatil: false, organizacao: false, nocao_autopreservacao_higiene: false, estrategias_aprendizado: false, planejamento_acoes: false, correcoes: false, julgamento_situacoes: false, relacionamento_social: false, autoestima_resistencia_frustracao: false, cooperacao_humor_agressividade: false, autoagressao: false, timidez_iniciativa_respeito: false, colaboracao_motivacao_isolamento: false, respeito_regras_rotina: false, iniciativa_social: false, comportamento_publico: false, permanencia_sala: false, foco_atividades: false, atencao_solicitacoes: false, compreensao_linguagem: false, comunicacao_nao_verbal: false, fala_inteligivel: false, adequacao_comunicacao: false, esforco_comunicacao: false, correspondencia_pensamento_fala: false, relato_experiencias: false, transmissao_recados: false, controle_salivacao: false, permanencia_sentado: false, locomocao: false, equilibrio_estatico_dinamico: false, dominancia_manual_esquema_corporal: false, discriminacao_direita_esquerda: false, coordenacao_motora_grossa_fina: false, coordenacao_grafomotora_visomotora: false, conceitos_basicos: false, agitacao_psicomotora: false, adequacao_postural: false, coordenacao_motora_equilibrio: false, alimentacao_independente: false },
  resource_equipment_used: { reduzir_quantidade_material_atividade: false, provas_orais_escrita_minima: false, mais_tempo_conclusao_trabalhos: false, avaliacao_multipla_escolha: false, orientacoes_diretas_instrucoes_claras: false, nao_avaliar_caligrafia_ortografia: false, concentrar_notas_originalidade_ideias: false, encorajar_pratica_escrita: false, outro: '' },
  resource_equipment_needs: { acompanhante_sala_aula: false, adaptacao_metodologia_professor: false, compreensao_companheirismo_turma: false, outro: '' },
  curriculum_accessibility: { leitura_sem_entonacao: false, pronuncia_trocas_omissoes: false, confusao_palavras_parecidas: false, escrita_incorreta_ordem_letras: false, tempo_maior_trabalhos_escritos: false, disfuncao_linguagem_comunicacao: false, outro: '' },
  school_content: '',
  activities_to_be_developed: { comunicacao_alternativa: false, informatica_acessivel: false, adequacao_material: false, outro: '' },
  objectives: '',
  work_methodology: { aulas_praticas: false, aulas_expositivas_midia: false, dialogos: false, visitas_tecnicas: false, atividades_grupo: false, atividades_corte_colagem: false },
  materials_used: { data_show: false, celular: false, cartolinas_pinceis: false, apostilas: false, artigos: false, tablet: false, outro: '' },
  evaluation_criteria: { participacao_coletiva: false, observacao_interacoes: false, atividades_paralelas: false, participacao_individual: false, uso_ferramentas_tecnologicas: false, fotos_videos_relatos: false, outro: '' },
};

export default function PEIPageWrapper() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <PEIPage />
    </Suspense>
  );
}

function PEIPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const nome = searchParams.get("nome");

  const [pei, setPei] = useState<PlansEducationData | null>(null);
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<PlansEducationData>(initialPEIState);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const token = decodeToken();
        if (!token) {
          router.push('/login');
          return;
        }
        const userIsStudent = token.id_level === ESTUDANTE;
        const targetEmail = userIsStudent ? token.email : email;
        if (targetEmail) {
          const data = await getPEIByEmail(targetEmail);
          setPei(data);
        }
      } catch (error) {
        console.error("PEI não encontrado, iniciando modo de criação.", error);
        setPei(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [email, router]);

  const handleInputChange = (name: string, value: string) => {
    const keys = name.split('.');
    setFormData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData));
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleCheckboxClick = (name: string) => {
    const keys = name.split('.');
    setFormData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData));
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      const finalKey = keys[keys.length - 1];
      current[finalKey] = !current[finalKey];
      return newData;
    });
  };

  const handleSubmit = async () => {
    if (!email || !user) {
      alert("Dados do estudante ou professor não encontrados para criar o PEI.");
      return;
    }
    try {
      const peiParaEnviar: PlansEducationData = {
        ...formData,
        student_email: email,
        student_name: nome || 'Nome não encontrado',
        professor_email: user.email,
        professor_name: user.name,
      };
      await postPEI(peiParaEnviar);
      alert("PEI criado com sucesso!");
      router.push(`/home`);
    } catch (error) {
      console.error("Erro ao criar PEI:", error);
      alert("Falha ao criar o PEI. Verifique o console para mais detalhes.");
    }
  };

  if (loading || isLoading) {
    return <h1>Carregando...</h1>;
  }

  // Se o PEI NÃO EXISTE, renderiza o formulário de CRIAÇÃO
  if (pei === null) {
    return (
      <AppLayout
        breadcrumbs={[
          { href: '/home', label: 'Página Inicial' },
          { href: '#', label: nome || 'Estudante' },
          { href: '/pei', label: 'Criar PEI' },
        ]}
      >
        <div className="p-6 space-y-8 w-full">
          <h1 className="text-3xl font-bold text-gray-800">PEI - Criar Plano de Ensino Individualizado</h1>

          {/* Campos adicionados para completar o payload */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-2">Conteúdo Escolar</h2>
            <BrInput label="Descreva o conteúdo escolar" value={formData.school_content} onInput={(e: any) => handleInputChange('school_content', e.target.value)} />
          </section>

          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-2">Objetivos</h2>
            <BrInput label="Descreva os objetivos" value={formData.objectives} onInput={(e: any) => handleInputChange('objectives', e.target.value)} />
          </section>

          {/* Seções com campos mistos (boolean e string) */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-2">Serviço de Apoio</h2>
            <div className="flex flex-wrap gap-4">
              {Object.keys(formData.support_service).map((key) =>
                key !== 'outro' ? (
                  <BrCheckbox name=""
                    key={key}
                    label={key.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    checked={formData.support_service[key as keyof Omit<typeof formData.support_service, 'outro'>]}
                    onClick={() => handleCheckboxClick(`support_service.${key}`)}
                  />
                ) : null
              )}
              <BrInput label="Outro" value={formData.support_service.outro} onInput={(e: any) => handleInputChange('support_service.outro', e.target.value)} />
            </div>
          </section>

          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-2">Habilidades e Potencialidades</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {Object.keys(formData.skills).map((key) => (
                <BrCheckbox name=""
                  key={key}
                  label={key.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  checked={formData.skills[key as keyof typeof formData.skills]}
                  onClick={() => handleCheckboxClick(`skills.${key}`)}
                />
              ))}
            </div>
          </section>

          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-2">Recursos/Equipamentos já utilizados</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {Object.keys(formData.resource_equipment_used).map((key) =>
                key !== 'outro' ? (
                  <BrCheckbox name=""
                    key={key}
                    label={key.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    checked={formData.resource_equipment_used[key as keyof Omit<typeof formData.resource_equipment_used, 'outro'>]}
                    onClick={() => handleCheckboxClick(`resource_equipment_used.${key}`)}
                  />
                ) : null
              )}
              <BrInput label="Outro" value={formData.resource_equipment_used.outro} onInput={(e: any) => handleInputChange('resource_equipment_used.outro', e.target.value)} />
            </div>
          </section>

          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-2">Recursos/Equipamentos a providenciar</h2>
            <div className="flex flex-wrap gap-4">
              {Object.keys(formData.resource_equipment_needs).map((key) =>
                key !== 'outro' ? (
                  <BrCheckbox name=""
                    key={key}
                    label={key.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    checked={formData.resource_equipment_needs[key as keyof Omit<typeof formData.resource_equipment_needs, 'outro'>]}
                    onClick={() => handleCheckboxClick(`resource_equipment_needs.${key}`)}
                  />
                ) : null
              )}
              <BrInput label="Outro" value={formData.resource_equipment_needs.outro} onInput={(e: any) => handleInputChange('resource_equipment_needs.outro', e.target.value)} />
            </div>
          </section>
          
          {/* Adicione as outras seções que faltam aqui, seguindo o mesmo padrão */}

          <div className="flex justify-center gap-4 mt-8">
            <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full" onClick={() => router.push('/')}>
              Cancelar
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full" onClick={handleSubmit}>
              Salvar PEI
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Se o PEI EXISTE, renderiza o formulário de VISUALIZAÇÃO (sem alterações)
  return (
    <AppLayout
      breadcrumbs={[
        { href: '/home', label: 'Página Inicial' },
        { href: '#', label: nome || 'Estudante' },
        { href: '/pei', label: 'PEI' },
      ]}
    >
      <div className="p-6 space-y-8 w-full">
        <h1 className="text-3xl font-bold text-gray-800">PEI - Plano de Ensino Individualizado</h1>
        
        {/* Adicione aqui a visualização dos campos que faltavam se desejar */}
        <section className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-2">Conteúdo Escolar</h2>
            <BrInput label="Descrição" value={pei.school_content} disabled />
        </section>
        <section className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-2">Objetivos</h2>
            <BrInput label="Descrição" value={pei.objectives} disabled />
        </section>

        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Serviço de Apoio</h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(pei.support_service).map(([key, value]) =>
              key !== 'outro' ? (
                <BrCheckbox name="" key={key} label={key.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} checked={!!value} disabled />
              ) : (
                <BrInput key={key} label="Outro" value={String(value)} disabled />
              )
            )}
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Habilidades e Potencialidades</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {Object.entries(pei.skills).map(([key, value]) => (
              <BrCheckbox name="" key={key} label={key.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} checked={value} disabled />
            ))}
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Recursos/Equipamentos já utilizados</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {Object.entries(pei.resource_equipment_used).map(([key, value]) =>
              key !== "outro" ? (
                <BrCheckbox name="" key={key} label={key.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} checked={!!value} disabled />
              ) : (
                <BrInput key={key} label="Outro" value={String(value)} disabled />
              )
            )}
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Recursos/Equipamentos a providenciar</h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(pei.resource_equipment_needs).map(([key, value]) =>
              key !== "outro" ? (
                <BrCheckbox name="" key={key} label={key.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} checked={!!value} disabled />
              ) : (
                <BrInput key={key} label="Outro" value={String(value)} disabled />
              )
            )}
          </div>
        </section>

        <div className="flex justify-center gap-4 mt-8">
          <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full" onClick={() => router.push('/')}>
            Voltar
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
