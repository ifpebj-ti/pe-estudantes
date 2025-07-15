/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import "@govbr-ds/core/dist/core.min.css";
import AppLayout from "@/components/AppLayout";
import { Suspense, useEffect, useState } from "react";
import { getAnamneseByEmail, postAnamneses } from "@/api/anamnesis"; 
import { AnamnesisData } from "@/interfaces/AnamnesisData";
import { decodeToken } from "@/services/auth/decodeToken";
import { useAuth } from "@/contexts/AuthContext";
import { ESTUDANTE } from "@/consts";
import { useRouter, useSearchParams } from "next/navigation";

const BrInput = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrInput), { ssr: false }
);
const BrCheckbox = dynamic(() =>
  import("@govbr-ds-testing/webcomponents-react").then((mod) => mod.BrCheckbox), { ssr: false }
);

const initialAnamnesisState: AnamnesisData = {
  email: '',
  identification: { nome_unidade_plena: '', serie_de_escolaridade_atual: '', turma: '', curso: '', idade_iniciou_estudos: '', nome_completo: '', data_de_nascimento: '', endereco: '', bairo: '', cep: '', municipio: '' },
  family_data: { nome_pai: '', profissao_pai: '', escolaridade_pai: '', idade_pai: '', nome_mae: '', profissao_mae: '', escolaridade_mae: '', idade_mae: '', outros_filhos: '', uniao_pais: { casados: false, separados: false, separados_como_nova_estrutura_familia: false }, reacao_estudante_situacao: '', estudante_reside_com_quem: '', pais: { biologico: false, adotivo: false } },
  family_conditions: { moradia: { taipa: false, alvenaria: false, palafita: false }, convivio_familiar: { excelente: false, bom: false, problematico: false, precario: false }, medidas_disciplinares_com_estudante: '', quem_usa_medidas_disciplinares: '', reacao_estudante_frente_medidas: '', qualidade_comunicacao_com_estudante: { execelente: false, boa: false, ruim: false, pessima: false }, reacao_contrariado: '', condicao_ambiente_familiar_aprendizagem_escolar: '' },
  mother_background: { gestacao: { transfusao_sanguinea_gravidez: '', quando_sentiu_movimento_da_crianca: '', levou_tombo_durante_gravidez: '', doenca_na_gestacao: '', condicao_saude_da_mae_na_gravidez: '', episodio_marcante_gravidez: '' }, condicoes_nascimento: { nasceu_quantos_meses: '', nasceu_quantos_quilos: '', nasceu_com_qual_comprimento: '', desenvolvimento_parto: '' }, primeiras_reacoes: { chorou: '', ficou_vermelho_demais: '', ficou_vermelho_por_quanto_tempo: '', precisou_de_oxigenio: '', ficou_icterico: '', como_era_quando_bebe: '', qual_idade_afirmou_cabeca: '', qual_idade_sentou_sem_apoio: '', qual_idade_engatinhou: '', qual_idade_ficou_de_pe: '', qual_idade_andou: '' } },
  verbal_language_three_years: { balbuciou: false, primeiras_expressoes: '', trocou_letras: false, gaguejou: false },
  development: { saude: { sofreu_acidente_ou_fez_cirurgia: '', possui_alergia: '', possui_bronquite_ou_asma: '', possui_problema_visao_audicao: '', ja_desmaiou: '', quando_desmaiou: '', teve_ou_tem_convulsoes: '' }, alimentacao: { foi_amamentada: '', foi_amementada_ate_quando: '', como_e_sua_alimentacao: '', foi_forcado_se_alimentar: '', recebe_ajuda_na_alimentacao: '' }, sono: { dorme_bem: false, sono: { agitado: false, tranquilo: false, fala_dormindo: false, sonambulo: false }, dorme_separado_dos_pais: false, com_quem_dorme: '' } },
  school_information: { historico_escolar_comum_antecedentes_relevantes: '', historico_escolar_especial_antecedentes_relevantes: '', deficiencia_apresentada_estudante: '', retido_alguma_vez: '', gosta_de_ir_escola: '', bem_aceito_pelos_amigous: '' },
  sexuality: { explanacao_sexual: false, curiosidade_sexual: false, conversa_com_pais_sobre_sexualidade: false },
  student_assessment: { estudante_apresenta_outro_tipo_deficiencia: '', apresenta_da_df_di_pc_tgd: false, se_sim_data_e_resultado_diagnostico: '', se_não_situacao_quanto_diagnostico_tem_outras_dificuldades: '', se_tem_outras_dificuldades: '', usa_medicamentos_controlados: false, usa_quais_medicamentos: '', medicamento_interfere_aprendizagem: false, se_intefere_aprendizagem: '', existem_recomendacoes_da_saude: false, se_possui_recomendacoes_da_saude: '' },
  student_development: { funcao_cognitiva: { percepcao: '', atencao: '', memoria: '', linguagem: '', raciocinio_logico: '' }, funcao_motora: { desenvolvimento_e_capacidade_motora: '' }, funcao_pressoal_social: { area_emocional_afetiva_social: '' } }
};

export default function AnamnesePageWrapper() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <AnamnesePage />
    </Suspense>
  );
}

function AnamnesePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const nome = searchParams.get("nome");

  const { user, loading } = useAuth();
  const router = useRouter();

  const [anamnesis, setAnamnesis] = useState<AnamnesisData | null>(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [userIsStudent, setUserIsStudent] = useState(true);

  const [formData, setFormData] = useState<AnamnesisData>(initialAnamnesisState);
  
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const token = decodeToken();
        if (!token) {
          router.push('/login'); 
          return;
        }

        const isStudent = token.id_level === ESTUDANTE;
        setUserIsStudent(isStudent);

        const targetEmail = userIsStudent ? token.email : email;

        if (targetEmail) {
          const data = await getAnamneseByEmail(targetEmail);
          setAnamnesis(data);
        }
      } catch (error) {
        console.error("Anamnese não encontrada, iniciando modo de criação.", error);
        setAnamnesis(null); 
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
      // Criar uma cópia profunda para segurança
      const newData = JSON.parse(JSON.stringify(prevData));
      
      let currentSection = newData;
      // Navega até o penúltimo nível do objeto
      for (let i = 0; i < keys.length - 1; i++) {
        currentSection = currentSection[keys[i]];
      }
      
      const finalKey = keys[keys.length - 1];
      const currentValue = currentSection[finalKey];
      
      // Inverte o valor booleano atual
      currentSection[finalKey] = !currentValue;
      
      return newData;
    });
  };

  const handleSubmit = async () => {
    if (!email) {
      alert("Email do estudante não encontrado para criar a anamnese.");
      return;
    }
    try {
      const anamneseParaEnviar = { ...formData, email };
      await postAnamneses(anamneseParaEnviar);
      alert("Anamnese criada com sucesso!");
      router.push(`/home`); 
    } catch (error) {
      console.error("Erro ao criar anamnese:", error);
      alert("Falha ao criar a anamnese. Verifique o console para mais detalhes.");
    }
  };

  if (isLoading || loading) {
      return <h1>Carregando...</h1>; //ADICIONAR COMPONENTE DE LOADING
  }

  if (anamnesis === null  && !userIsStudent) {
    return (
        <AppLayout
          breadcrumbs={[
            { href: '/home', label: 'Página Inicial' },
            { href: '#', label: nome || 'Estudante' },
            { href: '/anamnese', label: 'Criar Anamnese' },
          ]}
        >
          <div className="p-6 space-y-8 w-full">
            <h1 className="text-3xl font-bold text-gray-800">Criar Nova Anamnese</h1>

            {/* Identificação */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Identificação</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <BrInput label="Nome completo" value={formData.identification.nome_completo} onInput={(e: any) => handleInputChange('identification.nome_completo', e.target.value)} />
                <BrInput label="Data de Nascimento" value={formData.identification.data_de_nascimento} onInput={(e: any) => handleInputChange('identification.data_de_nascimento', e.target.value)} />
                <BrInput label="Endereço" value={formData.identification.endereco} onInput={(e: any) => handleInputChange('identification.endereco', e.target.value)} />
                <BrInput label="CEP" value={formData.identification.cep} onInput={(e: any) => handleInputChange('identification.cep', e.target.value)} />
                <BrInput label="Curso" value={formData.identification.curso} onInput={(e: any) => handleInputChange('identification.curso', e.target.value)} />
                <BrInput label="Série de escolaridade" value={formData.identification.serie_de_escolaridade_atual} onInput={(e: any) => handleInputChange('identification.serie_de_escolaridade_atual', e.target.value)} />
                <BrInput label="Turma" value={formData.identification.turma} onInput={(e: any) => handleInputChange('identification.turma', e.target.value)} />
              </div>
            </section>

            {/* Dados Familiares */}
            <section className="border-t pt-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Dados familiares</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <BrInput label="Nome do pai" value={formData.family_data.nome_pai} onInput={(e: any) => handleInputChange('family_data.nome_pai', e.target.value)} />
                <BrInput label="Profissão" value={formData.family_data.profissao_pai} onInput={(e: any) => handleInputChange('family_data.profissao_pai', e.target.value)} />
                <BrInput label="Escolaridade" value={formData.family_data.escolaridade_pai} onInput={(e: any) => handleInputChange('family_data.escolaridade_pai', e.target.value)} />
                <BrInput label="Idade" value={formData.family_data.idade_pai} onInput={(e: any) => handleInputChange('family_data.idade_pai', e.target.value)} />
                <BrInput label="Nome da mãe" value={formData.family_data.nome_mae} onInput={(e: any) => handleInputChange('family_data.nome_mae', e.target.value)} />
                <BrInput label="Profissão" value={formData.family_data.profissao_mae} onInput={(e: any) => handleInputChange('family_data.profissao_mae', e.target.value)} />
                <BrInput label="Escolaridade" value={formData.family_data.escolaridade_mae} onInput={(e: any) => handleInputChange('family_data.escolaridade_mae', e.target.value)} />
                <BrInput label="Idade" value={formData.family_data.idade_mae} onInput={(e: any) => handleInputChange('family_data.idade_mae', e.target.value)} />
              </div>
              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium text-black">União dos Pais</label>
                <div className="flex flex-wrap gap-4">
                  {/* CORREÇÃO FINAL: onClick chama o manipulador que inverte o estado */}
                  <BrCheckbox name="" label="Casados" checked={formData.family_data.uniao_pais.casados} onClick={() => handleCheckboxClick('family_data.uniao_pais.casados')} />
                  <BrCheckbox name="" label="Separados" checked={formData.family_data.uniao_pais.separados} onClick={() => handleCheckboxClick('family_data.uniao_pais.separados')} />
                  <BrCheckbox name="" label="Separados como uma nova estrutura familiar" checked={formData.family_data.uniao_pais.separados_como_nova_estrutura_familia} onClick={() => handleCheckboxClick('family_data.uniao_pais.separados_como_nova_estrutura_familia')} />
                </div>
              </div>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <BrInput label="Em caso de separação, o estudante vive com quem?" value={formData.family_data.estudante_reside_com_quem} onInput={(e: any) => handleInputChange('family_data.estudante_reside_com_quem', e.target.value)} />
                <BrInput label="Reação do estudante à situação" value={formData.family_data.reacao_estudante_situacao} onInput={(e: any) => handleInputChange('family_data.reacao_estudante_situacao', e.target.value)} />
              </div>
            </section>

            {/* Condições familiares do estudante */}
            <section className="border-t pt-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Condições familiares do estudante</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Condições de moradia</p>
                  <div className="flex space-x-3">
                    <BrCheckbox name="" label="Taipa" checked={formData.family_conditions.moradia.taipa} onClick={() => handleCheckboxClick('family_conditions.moradia.taipa')} />
                    <BrCheckbox name="" label="Alvenaria" checked={formData.family_conditions.moradia.alvenaria} onClick={() => handleCheckboxClick('family_conditions.moradia.alvenaria')} />
                    <BrCheckbox name="" label="Palafita" checked={formData.family_conditions.moradia.palafita} onClick={() => handleCheckboxClick('family_conditions.moradia.palafita')} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Convívio familiar</p>
                  <div className="flex space-x-3">
                    <BrCheckbox name="" label="Excelente" checked={formData.family_conditions.convivio_familiar.excelente} onClick={() => handleCheckboxClick('family_conditions.convivio_familiar.excelente')} />
                    <BrCheckbox name="" label="Bom" checked={formData.family_conditions.convivio_familiar.bom} onClick={() => handleCheckboxClick('family_conditions.convivio_familiar.bom')} />
                    <BrCheckbox name="" label="Problemático" checked={formData.family_conditions.convivio_familiar.problematico} onClick={() => handleCheckboxClick('family_conditions.convivio_familiar.problematico')} />
                    <BrCheckbox name="" label="Precário" checked={formData.family_conditions.convivio_familiar.precario} onClick={() => handleCheckboxClick('family_conditions.convivio_familiar.precario')} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Qualidade de comunicação</p>
                  <div className="flex space-x-3">
                    <BrCheckbox name="" label="Excelente" checked={formData.family_conditions.qualidade_comunicacao_com_estudante.execelente} onClick={() => handleCheckboxClick('family_conditions.qualidade_comunicacao_com_estudante.execelente')} />
                    <BrCheckbox name="" label="Boa" checked={formData.family_conditions.qualidade_comunicacao_com_estudante.boa} onClick={() => handleCheckboxClick('family_conditions.qualidade_comunicacao_com_estudante.boa')} />
                    <BrCheckbox name="" label="Ruim" checked={formData.family_conditions.qualidade_comunicacao_com_estudante.ruim} onClick={() => handleCheckboxClick('family_conditions.qualidade_comunicacao_com_estudante.ruim')} />
                    <BrCheckbox name="" label="Péssima" checked={formData.family_conditions.qualidade_comunicacao_com_estudante.pessima} onClick={() => handleCheckboxClick('family_conditions.qualidade_comunicacao_com_estudante.pessima')} />
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <BrInput label="Que medidas disciplinares normalmente são usadas com o estudante" value={formData.family_conditions.medidas_disciplinares_com_estudante} onInput={(e: any) => handleInputChange('family_conditions.medidas_disciplinares_com_estudante', e.target.value)} />
                <BrInput label="Quem as usa" value={formData.family_conditions.quem_usa_medidas_disciplinares} onInput={(e: any) => handleInputChange('family_conditions.quem_usa_medidas_disciplinares', e.target.value)} />
                <BrInput label="Quais as reações do estudante frente a essas medidas" value={formData.family_conditions.reacao_estudante_frente_medidas} onInput={(e: any) => handleInputChange('family_conditions.reacao_estudante_frente_medidas', e.target.value)} />
                <BrInput label="Como reage quando contrariado" value={formData.family_conditions.reacao_contrariado} onInput={(e: any) => handleInputChange('family_conditions.reacao_contrariado', e.target.value)} />
              </div>
              <div className="mt-6">
                <p className="text-sm font-medium mb-2">Condições do ambiente familiar para a aprendizagem escolar</p>
                <BrInput label="Condição" value={formData.family_conditions.condicao_ambiente_familiar_aprendizagem_escolar} onInput={(e: any) => handleInputChange('family_conditions.condicao_ambiente_familiar_aprendizagem_escolar', e.target.value)} />
              </div>
            </section>

            {/* Botões */}
            <div className="flex justify-center gap-4 mt-8">
              <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full" onClick={() => router.push('/home')}>
                Cancelar
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full" onClick={handleSubmit}>
                Criar Anamnese
              </button>
            </div>
          </div>
        </AppLayout>
      );
  }

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
            <BrInput label="Nome completo" class="w-full" value={anamnesis?.identification.nome_completo || ''} disabled/>
            <BrInput label="Data de Nascimento" class="w-full" value={anamnesis?.identification.data_de_nascimento || ''} disabled/>
            <BrInput label="Endereço" class="w-full" value={anamnesis?.identification.endereco || ''} disabled/>
            <BrInput label="CEP" class="w-full" value={anamnesis?.identification.cep || ''} disabled/>
            <BrInput label="Curso" class="w-full" value={anamnesis?.identification.curso || ''} disabled/>
            <BrInput label="Série de escolaridade" class="w-full" value={anamnesis?.identification.serie_de_escolaridade_atual || ''} disabled/>
            <BrInput label="Turma" class="w-full" value={anamnesis?.identification.turma || ''} disabled/>
          </div>
        </section>

        {/* Dados Familiares */}
        <section className="border-t">
          <h2 className="text-xl font-semibold mb-4">Dados familiares</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <BrInput label="Nome do pai" class="w-full" value={anamnesis?.family_data.nome_pai || ''} disabled/>
            <BrInput label="Profissão" class="w-full" value={anamnesis?.family_data.profissao_pai || ''} disabled/>
            <BrInput label="Escolaridade" class="w-full" value={anamnesis?.family_data.escolaridade_pai || ''} disabled/>
            <BrInput label="Idade" class="w-full" value={anamnesis?.family_data.idade_pai || ''} disabled/>

            <BrInput label="Nome da mãe" class="w-full" value={anamnesis?.family_data.nome_mae || ''} disabled/>
            <BrInput label="Profissão" class="w-full" value={anamnesis?.family_data.profissao_mae || ''} disabled/>
            <BrInput label="Escolaridade" class="w-full" value={anamnesis?.family_data.escolaridade_mae || ''} disabled/>
            <BrInput label="Idade" class="w-full" value={anamnesis?.family_data.idade_mae || ''} disabled/>
          </div>

          <div className="mt-4 space-y-2">
            <label className="text-sm font-medium text-black">Pais</label>
            <div className="flex flex-wrap gap-4">
              <BrCheckbox label="Casados" name="estado-pais" checked={anamnesis?.family_data.uniao_pais.casados || false} disabled />
              <BrCheckbox label="Separados" name="estado-pais" checked={anamnesis?.family_data.uniao_pais.separados || false} disabled />
              <BrCheckbox label="Separados como uma nova estrutura familiar" name="estado-pais" checked={anamnesis?.family_data.uniao_pais.separados_como_nova_estrutura_familia || false} disabled />
            </div>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <BrInput label="Em caso de separação, o estudante vive com quem?" class="w-full" value={anamnesis?.family_data.estudante_reside_com_quem || ''} disabled/>
            <BrInput label="Reação do estudante à situação" class="w-full" value={anamnesis?.family_data.reacao_estudante_situacao || ''} disabled/>
          </div>
        </section>

        {/* Condições familiares do estudante */}
        <section className="border-t">
          <h2 className="text-xl font-semibold mb-4">Condições familiares do estudante</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Condições de moradia</p>
              <div className="flex space-x-3">
                <BrCheckbox label="Taipa" name="Taipa" checked={anamnesis?.family_conditions.moradia.taipa || false} disabled />
                <BrCheckbox label="Alvenaria" name="Alvenaria" checked={anamnesis?.family_conditions.moradia.alvenaria || false} disabled />
                <BrCheckbox label="Palafita" name="Palafita" checked={anamnesis?.family_conditions.moradia.palafita || false} disabled />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Convívio familiar</p>
              <div className="flex space-x-3">
                <BrCheckbox label="Excelente" name="Excelente" checked={anamnesis?.family_conditions.convivio_familiar.excelente || false} disabled />
                <BrCheckbox label="Bom" name="Bom" checked={anamnesis?.family_conditions.convivio_familiar.bom || false} disabled />
                <BrCheckbox label="Problemático" name="Problemático" checked={anamnesis?.family_conditions.convivio_familiar.problematico || false} disabled />
                <BrCheckbox label="Precário" name="Precário" checked={anamnesis?.family_conditions.convivio_familiar.precario || false} disabled />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Qualidade de comunicação</p>
              <div className="flex space-x-3">
                <BrCheckbox label="Excelente" name="Excelente" checked={anamnesis?.family_conditions.qualidade_comunicacao_com_estudante.execelente || false} disabled />
                <BrCheckbox label="Boa" name="Boa" checked={anamnesis?.family_conditions.qualidade_comunicacao_com_estudante.boa || false} disabled />
                <BrCheckbox label="Ruim" name="Ruim" checked={anamnesis?.family_conditions.qualidade_comunicacao_com_estudante.ruim || false} disabled />
                <BrCheckbox label="Péssima" name="Péssima" checked={anamnesis?.family_conditions.qualidade_comunicacao_com_estudante.pessima || false} disabled />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <BrInput label="Que medidas disciplinares normalmente são usadas com o estudante" class="w-full" value={anamnesis?.family_conditions.medidas_disciplinares_com_estudante || ''} disabled/>
            <BrInput label="Quem as usa" class="w-full" value={anamnesis?.family_conditions.quem_usa_medidas_disciplinares || ''} disabled/>
            <BrInput label="Quais as reações do estudante frente a essas medidas" class="w-full" value={anamnesis?.family_conditions.reacao_estudante_frente_medidas || ''} disabled/>
            <BrInput label="Como reage quando contrariado" class="w-full" value={anamnesis?.family_conditions.reacao_contrariado || ''} disabled/>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium mb-2">Condições do ambiente familiar para a aprendizagem escolar</p>
            <BrInput
              label="Condição"
              class="w-full"
              value={anamnesis?.family_conditions.condicao_ambiente_familiar_aprendizagem_escolar || ''}
              disabled            
            />
          </div>
        </section>

        {/* Botões */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full" onClick={() => router.push('/')}>
            Voltar
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
