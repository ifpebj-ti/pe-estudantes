export interface AnamnesisData {
  email: string;
  identification: {
    nome_unidade_plena: string;
    serie_de_escolaridade_atual: string;
    turma: string;
    curso: string;
    idade_iniciou_estudos: string;
    nome_completo: string;
    data_de_nascimento: string;
    endereco: string;
    bairo: string;
    cep: string;
    municipio: string;
  };
  family_data: {
    nome_pai: string;
    profissao_pai: string;
    escolaridade_pai: string;
    idade_pai: string;
    nome_mae: string;
    profissao_mae: string;
    escolaridade_mae: string;
    idade_mae: string;
    outros_filhos: string;
    uniao_pais: {
      casados: boolean;
      separados: boolean;
      separados_como_nova_estrutura_familia: boolean;
    };
    reacao_estudante_situacao: string;
    estudante_reside_com_quem: string;
    pais: {
      biologico: boolean;
      adotivo: boolean;
    };
  };
  family_conditions: {
    moradia: {
      taipa: boolean;
      alvenaria: boolean;
      palafita: boolean;
    };
    convivio_familiar: {
      excelente: boolean;
      bom: boolean;
      problematico: boolean;
      precario: boolean;
    };
    medidas_disciplinares_com_estudante: string;
    quem_usa_medidas_disciplinares: string;
    reacao_estudante_frente_medidas: string;
    qualidade_comunicacao_com_estudante: {
      execelente: boolean;
      boa: boolean;
      ruim: boolean;
      pessima: boolean;
    };
    reacao_contrariado: string;
    condicao_ambiente_familiar_aprendizagem_escolar: string;
  };
  mother_background: {
    gestacao: {
      transfusao_sanguinea_gravidez: string;
      quando_sentiu_movimento_da_crianca: string;
      levou_tombo_durante_gravidez: string;
      doenca_na_gestacao: string;
      condicao_saude_da_mae_na_gravidez: string;
      episodio_marcante_gravidez: string;
    };
    condicoes_nascimento: {
      nasceu_quantos_meses: string;
      nasceu_quantos_quilos: string;
      nasceu_com_qual_comprimento: string;
      desenvolvimento_parto: string;
    };
    primeiras_reacoes: {
      chorou: string;
      ficou_vermelho_demais: string;
      ficou_vermelho_por_quanto_tempo: string;
      precisou_de_oxigenio: string;
      ficou_icterico: string;
      como_era_quando_bebe: string;
      qual_idade_afirmou_cabeca: string;
      qual_idade_sentou_sem_apoio: string;
      qual_idade_engatinhou: string;
      qual_idade_ficou_de_pe: string;
      qual_idade_andou: string;
    };
  };
  verbal_language_three_years: {
    balbuciou: boolean;
    primeiras_expressoes: string;
    trocou_letras: boolean;
    gaguejou: boolean;
  };
  development: {
    saude: {
      sofreu_acidente_ou_fez_cirurgia: string;
      possui_alergia: string;
      possui_bronquite_ou_asma: string;
      possui_problema_visao_audicao: string;
      ja_desmaiou: string;
      quando_desmaiou: string;
      teve_ou_tem_convulsoes: string;
    };
    alimentacao: {
      foi_amamentada: string;
      foi_amementada_ate_quando: string;
      como_e_sua_alimentacao: string;
      foi_forcado_se_alimentar: string;
      recebe_ajuda_na_alimentacao: string;
    };
    sono: {
      dorme_bem: boolean;
      sono: {
        agitado: boolean;
        tranquilo: boolean;
        fala_dormindo: boolean;
        sonambulo: boolean;
      };
      dorme_separado_dos_pais: boolean;
      com_quem_dorme: string;
    };
  };
  school_information: {
    historico_escolar_comum_antecedentes_relevantes: string;
    historico_escolar_especial_antecedentes_relevantes: string;
    deficiencia_apresentada_estudante: string;
    retido_alguma_vez: string;
    gosta_de_ir_escola: string;
    bem_aceito_pelos_amigous: string;
  };
  sexuality: {
    explanacao_sexual: boolean;
    curiosidade_sexual: boolean;
    conversa_com_pais_sobre_sexualidade: boolean;
  };
  student_assessment: {
    estudante_apresenta_outro_tipo_deficiencia: string;
    apresenta_da_df_di_pc_tgd: boolean;
    se_sim_data_e_resultado_diagnostico: string;
    se_não_situacao_quanto_diagnostico_tem_outras_dificuldades: string;
    se_tem_outras_dificuldades: string;
    usa_medicamentos_controlados: boolean;
    usa_quais_medicamentos: string;
    medicamento_interfere_aprendizagem: boolean;
    se_intefere_aprendizagem: string;
    existem_recomendacoes_da_saude: boolean;
    se_possui_recomendacoes_da_saude: string;
  };
  student_development: {
    funcao_cognitiva: {
      percepcao: string;
      atencao: string;
      memoria: string;
      linguagem: string;
      raciocinio_logico: string;
    };
    funcao_motora: {
      desenvolvimento_e_capacidade_motora: string;
    };
    funcao_pressoal_social: {
      area_emocional_afetiva_social: string;
    };
  };
}
