/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import "@govbr-ds/core/dist/core.min.css";
import AppLayout from "@/components/AppLayout";
import { Suspense, useEffect, useState } from "react";
import { getAnamneseByEmail, patchAnamnesis } from "@/api/anamnesis"; 
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

        const target = isStudent ? token.email : email;

        if (target) {
            const data = await getAnamneseByEmail(target);
            setAnamnesis(data);
            setFormData(data); 
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

  const handleEdit = async () => {
    if (!email) {
        alert("Email do estudante não encontrado para editar anamnese.");
        return;
    }

    try {
        const dadosAtualizados = { ...formData };
        await patchAnamnesis(dadosAtualizados, email);
        alert("Anamnese atualizada com sucesso!");
        router.push("/home");
    } catch (error) {
        console.error("Erro ao atualizar Anamnese: ", error);
        alert("Falha ao atualizar Anamnese. Verifique o console para mais detalhes.");
    }
    };


  if (isLoading || loading) {
      return <h1>Carregando...</h1>; //ADICIONAR COMPONENTE DE LOADING
  }

   if (anamnesis === null) {
    return (
      <AppLayout
          breadcrumbs={[
            { href: '/home', label: 'Página Inicial' },
            { href: '#', label: nome || 'Estudante' },
            { href: '/anamnese', label: 'Criar Anamnese' },
          ]}
        >
          <div className="p-6 text-center">
                <h2 className="text-xl font-bold text-green-700">O estudante ainda não possui uma Anamnese cadastrada</h2>
        </div>
        </AppLayout>
    )
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
          <h1 className="text-3xl font-bold text-gray-800">Editar Anamnese</h1>

           {/* Identificação */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Identificação</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <BrInput label="Nome da unidade plena" value={formData.identification.nome_unidade_plena} onInput={(e: any) => handleInputChange('identification.nome_unidade_plena', e.target.value)} />
                <BrInput label="Nome completo" value={formData.identification.nome_completo} onInput={(e: any) => handleInputChange('identification.nome_completo', e.target.value)} />
                <BrInput label="Data de Nascimento" value={formData.identification.data_de_nascimento} onInput={(e: any) => handleInputChange('identification.data_de_nascimento', e.target.value)} />
                <BrInput label="Endereço" value={formData.identification.endereco} onInput={(e: any) => handleInputChange('identification.endereco', e.target.value)} />
                <BrInput label="Bairro" value={formData.identification.bairo} onInput={(e: any) => handleInputChange('identification.bairo', e.target.value)} />
                <BrInput label="CEP" value={formData.identification.cep} onInput={(e: any) => handleInputChange('identification.cep', e.target.value)} />
                <BrInput label="Município" value={formData.identification.municipio} onInput={(e: any) => handleInputChange('identification.municipio', e.target.value)} />
                <BrInput label="Curso" value={formData.identification.curso} onInput={(e: any) => handleInputChange('identification.curso', e.target.value)} />
                <BrInput label="Série de escolaridade atual" value={formData.identification.serie_de_escolaridade_atual} onInput={(e: any) => handleInputChange('identification.serie_de_escolaridade_atual', e.target.value)} />
                <BrInput label="Turma" value={formData.identification.turma} onInput={(e: any) => handleInputChange('identification.turma', e.target.value)} />
                <BrInput label="Idade que iniciou os estudos" value={formData.identification.idade_iniciou_estudos} onInput={(e: any) => handleInputChange('identification.idade_iniciou_estudos', e.target.value)} />
              </div>
            </section>

            {/* Dados Familiares */}
            <section className="border-t pt-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Dados familiares</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <BrInput label="Nome do pai" value={formData.family_data.nome_pai} onInput={(e: any) => handleInputChange('family_data.nome_pai', e.target.value)} />
                <BrInput label="Profissão do pai" value={formData.family_data.profissao_pai} onInput={(e: any) => handleInputChange('family_data.profissao_pai', e.target.value)} />
                <BrInput label="Escolaridade do pai" value={formData.family_data.escolaridade_pai} onInput={(e: any) => handleInputChange('family_data.escolaridade_pai', e.target.value)} />
                <BrInput label="Idade do pai" value={formData.family_data.idade_pai} onInput={(e: any) => handleInputChange('family_data.idade_pai', e.target.value)} />
                <BrInput label="Nome da mãe" value={formData.family_data.nome_mae} onInput={(e: any) => handleInputChange('family_data.nome_mae', e.target.value)} />
                <BrInput label="Profissão da mãe" value={formData.family_data.profissao_mae} onInput={(e: any) => handleInputChange('family_data.profissao_mae', e.target.value)} />
                <BrInput label="Escolaridade da mãe" value={formData.family_data.escolaridade_mae} onInput={(e: any) => handleInputChange('family_data.escolaridade_mae', e.target.value)} />
                <BrInput label="Idade da mãe" value={formData.family_data.idade_mae} onInput={(e: any) => handleInputChange('family_data.idade_mae', e.target.value)} />
                <BrInput label="Outros filhos" value={formData.family_data.outros_filhos} onInput={(e: any) => handleInputChange('family_data.outros_filhos', e.target.value)} />
              </div>
              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium text-black">União dos Pais</label>
                <div className="flex flex-wrap gap-4">
                  <BrCheckbox name="" label="Casados" checked={formData.family_data.uniao_pais.casados} onClick={() => handleCheckboxClick('family_data.uniao_pais.casados')} />
                  <BrCheckbox name="" label="Separados" checked={formData.family_data.uniao_pais.separados} onClick={() => handleCheckboxClick('family_data.uniao_pais.separados')} />
                  <BrCheckbox name="" label="Separados como uma nova estrutura familiar" checked={formData.family_data.uniao_pais.separados_como_nova_estrutura_familia} onClick={() => handleCheckboxClick('family_data.uniao_pais.separados_como_nova_estrutura_familia')} />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium text-black">Pais</label>
                <div className="flex flex-wrap gap-4">
                  <BrCheckbox name="" label="Biológico" checked={formData.family_data.pais.biologico} onClick={() => handleCheckboxClick('family_data.pais.biologico')} />
                  <BrCheckbox name="" label="Adotivo" checked={formData.family_data.pais.adotivo} onClick={() => handleCheckboxClick('family_data.pais.adotivo')} />
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

            {/* Histórico da Mãe */}
            <section className="border-t pt-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Histórico da Mãe</h2>
              
              {/* Gestação */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Gestação</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <BrInput label="Transfusão sanguínea na gravidez" value={formData.mother_background.gestacao.transfusao_sanguinea_gravidez} onInput={(e: any) => handleInputChange('mother_background.gestacao.transfusao_sanguinea_gravidez', e.target.value)} />
                  <BrInput label="Quando sentiu movimento da criança" value={formData.mother_background.gestacao.quando_sentiu_movimento_da_crianca} onInput={(e: any) => handleInputChange('mother_background.gestacao.quando_sentiu_movimento_da_crianca', e.target.value)} />
                  <BrInput label="Levou tombo durante a gravidez" value={formData.mother_background.gestacao.levou_tombo_durante_gravidez} onInput={(e: any) => handleInputChange('mother_background.gestacao.levou_tombo_durante_gravidez', e.target.value)} />
                  <BrInput label="Doença na gestação" value={formData.mother_background.gestacao.doenca_na_gestacao} onInput={(e: any) => handleInputChange('mother_background.gestacao.doenca_na_gestacao', e.target.value)} />
                  <BrInput label="Condição de saúde da mãe na gravidez" value={formData.mother_background.gestacao.condicao_saude_da_mae_na_gravidez} onInput={(e: any) => handleInputChange('mother_background.gestacao.condicao_saude_da_mae_na_gravidez', e.target.value)} />
                  <BrInput label="Episódio marcante na gravidez" value={formData.mother_background.gestacao.episodio_marcante_gravidez} onInput={(e: any) => handleInputChange('mother_background.gestacao.episodio_marcante_gravidez', e.target.value)} />
                </div>
              </div>

              {/* Condições de Nascimento */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Condições de Nascimento</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <BrInput label="Nasceu com quantos meses" value={formData.mother_background.condicoes_nascimento.nasceu_quantos_meses} onInput={(e: any) => handleInputChange('mother_background.condicoes_nascimento.nasceu_quantos_meses', e.target.value)} />
                  <BrInput label="Nasceu com quantos quilos" value={formData.mother_background.condicoes_nascimento.nasceu_quantos_quilos} onInput={(e: any) => handleInputChange('mother_background.condicoes_nascimento.nasceu_quantos_quilos', e.target.value)} />
                  <BrInput label="Nasceu com qual comprimento" value={formData.mother_background.condicoes_nascimento.nasceu_com_qual_comprimento} onInput={(e: any) => handleInputChange('mother_background.condicoes_nascimento.nasceu_com_qual_comprimento', e.target.value)} />
                  <BrInput label="Desenvolvimento do parto" value={formData.mother_background.condicoes_nascimento.desenvolvimento_parto} onInput={(e: any) => handleInputChange('mother_background.condicoes_nascimento.desenvolvimento_parto', e.target.value)} />
                </div>
              </div>

              {/* Primeiras Reações */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Primeiras Reações</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <BrInput label="Chorou" value={formData.mother_background.primeiras_reacoes.chorou} onInput={(e: any) => handleInputChange('mother_background.primeiras_reacoes.chorou', e.target.value)} />
                  <BrInput label="Ficou vermelho demais" value={formData.mother_background.primeiras_reacoes.ficou_vermelho_demais} onInput={(e: any) => handleInputChange('mother_background.primeiras_reacoes.ficou_vermelho_demais', e.target.value)} />
                  <BrInput label="Ficou vermelho por quanto tempo" value={formData.mother_background.primeiras_reacoes.ficou_vermelho_por_quanto_tempo} onInput={(e: any) => handleInputChange('mother_background.primeiras_reacoes.ficou_vermelho_por_quanto_tempo', e.target.value)} />
                  <BrInput label="Precisou de oxigênio" value={formData.mother_background.primeiras_reacoes.precisou_de_oxigenio} onInput={(e: any) => handleInputChange('mother_background.primeiras_reacoes.precisou_de_oxigenio', e.target.value)} />
                  <BrInput label="Ficou ictérico" value={formData.mother_background.primeiras_reacoes.ficou_icterico} onInput={(e: any) => handleInputChange('mother_background.primeiras_reacoes.ficou_icterico', e.target.value)} />
                  <BrInput label="Como era quando bebê" value={formData.mother_background.primeiras_reacoes.como_era_quando_bebe} onInput={(e: any) => handleInputChange('mother_background.primeiras_reacoes.como_era_quando_bebe', e.target.value)} />
                  <BrInput label="Qual idade afirmou a cabeça" value={formData.mother_background.primeiras_reacoes.qual_idade_afirmou_cabeca} onInput={(e: any) => handleInputChange('mother_background.primeiras_reacoes.qual_idade_afirmou_cabeca', e.target.value)} />
                  <BrInput label="Qual idade sentou sem apoio" value={formData.mother_background.primeiras_reacoes.qual_idade_sentou_sem_apoio} onInput={(e: any) => handleInputChange('mother_background.primeiras_reacoes.qual_idade_sentou_sem_apoio', e.target.value)} />
                  <BrInput label="Qual idade engatinhou" value={formData.mother_background.primeiras_reacoes.qual_idade_engatinhou} onInput={(e: any) => handleInputChange('mother_background.primeiras_reacoes.qual_idade_engatinhou', e.target.value)} />
                  <BrInput label="Qual idade ficou de pé" value={formData.mother_background.primeiras_reacoes.qual_idade_ficou_de_pe} onInput={(e: any) => handleInputChange('mother_background.primeiras_reacoes.qual_idade_ficou_de_pe', e.target.value)} />
                  <BrInput label="Qual idade andou" value={formData.mother_background.primeiras_reacoes.qual_idade_andou} onInput={(e: any) => handleInputChange('mother_background.primeiras_reacoes.qual_idade_andou', e.target.value)} />
                </div>
              </div>
            </section>

            {/* Linguagem Verbal (3 anos) */}
            <section className="border-t pt-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Linguagem Verbal (3 anos)</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <BrCheckbox name="" label="Balbuciou" checked={formData.verbal_language_three_years.balbuciou} onClick={() => handleCheckboxClick('verbal_language_three_years.balbuciou')} />
                  <BrCheckbox name="" label="Trocou letras" checked={formData.verbal_language_three_years.trocou_letras} onClick={() => handleCheckboxClick('verbal_language_three_years.trocou_letras')} />
                  <BrCheckbox name="" label="Gaguejou" checked={formData.verbal_language_three_years.gaguejou} onClick={() => handleCheckboxClick('verbal_language_three_years.gaguejou')} />
                </div>
                <BrInput label="Primeiras expressões" value={formData.verbal_language_three_years.primeiras_expressoes} onInput={(e: any) => handleInputChange('verbal_language_three_years.primeiras_expressoes', e.target.value)} />
              </div>
            </section>

            {/* Desenvolvimento */}
            <section className="border-t pt-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Desenvolvimento</h2>
              
              {/* Saúde */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Saúde</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <BrInput label="Sofreu acidente ou fez cirurgia" value={formData.development.saude.sofreu_acidente_ou_fez_cirurgia} onInput={(e: any) => handleInputChange('development.saude.sofreu_acidente_ou_fez_cirurgia', e.target.value)} />
                  <BrInput label="Possui alergia" value={formData.development.saude.possui_alergia} onInput={(e: any) => handleInputChange('development.saude.possui_alergia', e.target.value)} />
                  <BrInput label="Possui bronquite ou asma" value={formData.development.saude.possui_bronquite_ou_asma} onInput={(e: any) => handleInputChange('development.saude.possui_bronquite_ou_asma', e.target.value)} />
                  <BrInput label="Possui problema de visão ou audição" value={formData.development.saude.possui_problema_visao_audicao} onInput={(e: any) => handleInputChange('development.saude.possui_problema_visao_audicao', e.target.value)} />
                  <BrInput label="Já desmaiou" value={formData.development.saude.ja_desmaiou} onInput={(e: any) => handleInputChange('development.saude.ja_desmaiou', e.target.value)} />
                  <BrInput label="Quando desmaiou" value={formData.development.saude.quando_desmaiou} onInput={(e: any) => handleInputChange('development.saude.quando_desmaiou', e.target.value)} />
                  <BrInput label="Teve ou tem convulsões" value={formData.development.saude.teve_ou_tem_convulsoes} onInput={(e: any) => handleInputChange('development.saude.teve_ou_tem_convulsoes', e.target.value)} />
                </div>
              </div>

              {/* Alimentação */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Alimentação</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <BrInput label="Foi amamentada" value={formData.development.alimentacao.foi_amamentada} onInput={(e: any) => handleInputChange('development.alimentacao.foi_amamentada', e.target.value)} />
                  <BrInput label="Foi amamentada até quando" value={formData.development.alimentacao.foi_amementada_ate_quando} onInput={(e: any) => handleInputChange('development.alimentacao.foi_amementada_ate_quando', e.target.value)} />
                  <BrInput label="Como é sua alimentação" value={formData.development.alimentacao.como_e_sua_alimentacao} onInput={(e: any) => handleInputChange('development.alimentacao.como_e_sua_alimentacao', e.target.value)} />
                  <BrInput label="Foi forçado a se alimentar" value={formData.development.alimentacao.foi_forcado_se_alimentar} onInput={(e: any) => handleInputChange('development.alimentacao.foi_forcado_se_alimentar', e.target.value)} />
                  <BrInput label="Recebe ajuda na alimentação" value={formData.development.alimentacao.recebe_ajuda_na_alimentacao} onInput={(e: any) => handleInputChange('development.alimentacao.recebe_ajuda_na_alimentacao', e.target.value)} />
                </div>
              </div>

              {/* Sono */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Sono</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <BrCheckbox name="" label="Dorme bem" checked={formData.development.sono.dorme_bem} onClick={() => handleCheckboxClick('development.sono.dorme_bem')} />
                    <BrCheckbox name="" label="Dorme separado dos pais" checked={formData.development.sono.dorme_separado_dos_pais} onClick={() => handleCheckboxClick('development.sono.dorme_separado_dos_pais')} />
                  </div>
                  <BrInput label="Com quem dorme" value={formData.development.sono.com_quem_dorme} onInput={(e: any) => handleInputChange('development.sono.com_quem_dorme', e.target.value)} />
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Tipo de sono</p>
                  <div className="flex flex-wrap gap-4">
                    <BrCheckbox name="" label="Agitado" checked={formData.development.sono.sono.agitado} onClick={() => handleCheckboxClick('development.sono.sono.agitado')} />
                    <BrCheckbox name="" label="Tranquilo" checked={formData.development.sono.sono.tranquilo} onClick={() => handleCheckboxClick('development.sono.sono.tranquilo')} />
                    <BrCheckbox name="" label="Fala dormindo" checked={formData.development.sono.sono.fala_dormindo} onClick={() => handleCheckboxClick('development.sono.sono.fala_dormindo')} />
                    <BrCheckbox name="" label="Sonâmbulo" checked={formData.development.sono.sono.sonambulo} onClick={() => handleCheckboxClick('development.sono.sono.sonambulo')} />
                  </div>
                </div>
              </div>
            </section>

            {/* Informações Escolares */}
            <section className="border-t pt-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Informações Escolares</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <BrInput label="Histórico escolar comum - antecedentes relevantes" value={formData.school_information.historico_escolar_comum_antecedentes_relevantes} onInput={(e: any) => handleInputChange('school_information.historico_escolar_comum_antecedentes_relevantes', e.target.value)} />
                <BrInput label="Histórico escolar especial - antecedentes relevantes" value={formData.school_information.historico_escolar_especial_antecedentes_relevantes} onInput={(e: any) => handleInputChange('school_information.historico_escolar_especial_antecedentes_relevantes', e.target.value)} />
                <BrInput label="Deficiência apresentada pelo estudante" value={formData.school_information.deficiencia_apresentada_estudante} onInput={(e: any) => handleInputChange('school_information.deficiencia_apresentada_estudante', e.target.value)} />
                <BrInput label="Foi retido alguma vez" value={formData.school_information.retido_alguma_vez} onInput={(e: any) => handleInputChange('school_information.retido_alguma_vez', e.target.value)} />
                <BrInput label="Gosta de ir à escola" value={formData.school_information.gosta_de_ir_escola} onInput={(e: any) => handleInputChange('school_information.gosta_de_ir_escola', e.target.value)} />
                <BrInput label="É bem aceito pelos amigos" value={formData.school_information.bem_aceito_pelos_amigous} onInput={(e: any) => handleInputChange('school_information.bem_aceito_pelos_amigous', e.target.value)} />
              </div>
            </section>

            {/* Sexualidade */}
            <section className="border-t pt-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Sexualidade</h2>
              <div className="flex flex-wrap gap-4">
                <BrCheckbox name="" label="Explanação sexual" checked={formData.sexuality.explanacao_sexual} onClick={() => handleCheckboxClick('sexuality.explanacao_sexual')} />
                <BrCheckbox name="" label="Curiosidade sexual" checked={formData.sexuality.curiosidade_sexual} onClick={() => handleCheckboxClick('sexuality.curiosidade_sexual')} />
                <BrCheckbox name="" label="Conversa com pais sobre sexualidade" checked={formData.sexuality.conversa_com_pais_sobre_sexualidade} onClick={() => handleCheckboxClick('sexuality.conversa_com_pais_sobre_sexualidade')} />
              </div>
            </section>

            {/* Avaliação do Estudante */}
            <section className="border-t pt-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Avaliação do Estudante</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <BrInput label="Estudante apresenta outro tipo de deficiência" value={formData.student_assessment.estudante_apresenta_outro_tipo_deficiencia} onInput={(e: any) => handleInputChange('student_assessment.estudante_apresenta_outro_tipo_deficiencia', e.target.value)} />
                <div className="space-y-2">
                  <BrCheckbox name="" label="Apresenta DA/DF/DI/PC/TGD" checked={formData.student_assessment.apresenta_da_df_di_pc_tgd} onClick={() => handleCheckboxClick('student_assessment.apresenta_da_df_di_pc_tgd')} />
                </div>
                <BrInput label="Se sim, data e resultado do diagnóstico" value={formData.student_assessment.se_sim_data_e_resultado_diagnostico} onInput={(e: any) => handleInputChange('student_assessment.se_sim_data_e_resultado_diagnostico', e.target.value)} />
                <BrInput label="Se não, situação quanto ao diagnóstico - tem outras dificuldades" value={formData.student_assessment.se_não_situacao_quanto_diagnostico_tem_outras_dificuldades} onInput={(e: any) => handleInputChange('student_assessment.se_não_situacao_quanto_diagnostico_tem_outras_dificuldades', e.target.value)} />
                <BrInput label="Se tem outras dificuldades" value={formData.student_assessment.se_tem_outras_dificuldades} onInput={(e: any) => handleInputChange('student_assessment.se_tem_outras_dificuldades', e.target.value)} />
                <div className="space-y-2">
                  <BrCheckbox name="" label="Usa medicamentos controlados" checked={formData.student_assessment.usa_medicamentos_controlados} onClick={() => handleCheckboxClick('student_assessment.usa_medicamentos_controlados')} />
                </div>
                <BrInput label="Usa quais medicamentos" value={formData.student_assessment.usa_quais_medicamentos} onInput={(e: any) => handleInputChange('student_assessment.usa_quais_medicamentos', e.target.value)} />
                <div className="space-y-2">
                  <BrCheckbox name="" label="Medicamento interfere na aprendizagem" checked={formData.student_assessment.medicamento_interfere_aprendizagem} onClick={() => handleCheckboxClick('student_assessment.medicamento_interfere_aprendizagem')} />
                </div>
                <BrInput label="Se interfere na aprendizagem" value={formData.student_assessment.se_intefere_aprendizagem} onInput={(e: any) => handleInputChange('student_assessment.se_intefere_aprendizagem', e.target.value)} />
                <div className="space-y-2">
                  <BrCheckbox name="" label="Existem recomendações da saúde" checked={formData.student_assessment.existem_recomendacoes_da_saude} onClick={() => handleCheckboxClick('student_assessment.existem_recomendacoes_da_saude')} />
                </div>
                <BrInput label="Se possui recomendações da saúde" value={formData.student_assessment.se_possui_recomendacoes_da_saude} onInput={(e: any) => handleInputChange('student_assessment.se_possui_recomendacoes_da_saude', e.target.value)} />
              </div>
            </section>

            {/* Desenvolvimento do Estudante */}
            <section className="border-t pt-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Desenvolvimento do Estudante</h2>
              
              {/* Função Cognitiva */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Função Cognitiva</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <BrInput label="Percepção" value={formData.student_development.funcao_cognitiva.percepcao} onInput={(e: any) => handleInputChange('student_development.funcao_cognitiva.percepcao', e.target.value)} />
                  <BrInput label="Atenção" value={formData.student_development.funcao_cognitiva.atencao} onInput={(e: any) => handleInputChange('student_development.funcao_cognitiva.atencao', e.target.value)} />
                  <BrInput label="Memória" value={formData.student_development.funcao_cognitiva.memoria} onInput={(e: any) => handleInputChange('student_development.funcao_cognitiva.memoria', e.target.value)} />
                  <BrInput label="Linguagem" value={formData.student_development.funcao_cognitiva.linguagem} onInput={(e: any) => handleInputChange('student_development.funcao_cognitiva.linguagem', e.target.value)} />
                  <BrInput label="Raciocínio lógico" value={formData.student_development.funcao_cognitiva.raciocinio_logico} onInput={(e: any) => handleInputChange('student_development.funcao_cognitiva.raciocinio_logico', e.target.value)} />
                </div>
              </div>

              {/* Função Motora */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Função Motora</h3>
                <BrInput label="Desenvolvimento e capacidade motora" value={formData.student_development.funcao_motora.desenvolvimento_e_capacidade_motora} onInput={(e: any) => handleInputChange('student_development.funcao_motora.desenvolvimento_e_capacidade_motora', e.target.value)} />
              </div>

              {/* Função Pessoal Social */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Função Pessoal Social</h3>
                <BrInput label="Área emocional, afetiva e social" value={formData.student_development.funcao_pressoal_social.area_emocional_afetiva_social} onInput={(e: any) => handleInputChange('student_development.funcao_pressoal_social.area_emocional_afetiva_social', e.target.value)} />
              </div>
            </section>

          {/* Botões */}
          <div className="flex justify-center gap-4 mt-8">
            <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full" onClick={() => router.push('/')}>
              Voltar
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full" onClick={handleEdit}>
              Salvar Alterações
            </button>
          </div>
        </div>
      </AppLayout>
    );
}
