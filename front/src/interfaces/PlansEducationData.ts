export interface PlansEducationData {
  professor_email: string;
  professor_name: string;
  student_email: string;
  student_name: string;
  academic_semester: {
    primeiro_semestre: boolean;
    segundo_semestre: boolean;
  };
  service_modality: {
    turma_regular: boolean;
    atendimento_pedagogico_domiciliar: boolean;
    atendimento_pedagogico_hospitalar: boolean;
  };
  support_service: {
    agente_educacao_especial_neuropsicopedagoro: boolean;
    interprete: boolean;
    instrutor: boolean;
    voluntario: boolean;
    outro: string;
  };
  skills: {
    atencao_em_sala_de_aula: boolean;
    interesse_ambiente_escolar: boolean;
    concentracao_atividades: boolean;
    memoria_auditiva_visual_sequencial: boolean;
    raciocinio_logico_matematico: boolean;
    sequencia_logica_fatos: boolean;
    interesse_por_objetos: boolean;
    exploracao_adequada_objetos: boolean;
    comparacao_associacao_classificacao: boolean;
    abstracao_conduta_simbolica: boolean;
    discriminacao_visual_auditiva_tatil: boolean;
    organizacao: boolean;
    nocao_autopreservacao_higiene: boolean;
    estrategias_aprendizado: boolean;
    planejamento_acoes: boolean;
    correcoes: boolean;
    julgamento_situacoes: boolean;
    relacionamento_social: boolean;
    autoestima_resistencia_frustracao: boolean;
    cooperacao_humor_agressividade: boolean;
    autoagressao: boolean;
    timidez_iniciativa_respeito: boolean;
    colaboracao_motivacao_isolamento: boolean;
    respeito_regras_rotina: boolean;
    iniciativa_social: boolean;
    comportamento_publico: boolean;
    permanencia_sala: boolean;
    foco_atividades: boolean;
    atencao_solicitacoes: boolean;
    compreensao_linguagem: boolean;
    comunicacao_nao_verbal: boolean;
    fala_inteligivel: boolean;
    adequacao_comunicacao: boolean;
    esforco_comunicacao: boolean;
    correspondencia_pensamento_fala: boolean;
    relato_experiencias: boolean;
    transmissao_recados: boolean;
    controle_salivacao: boolean;
    permanencia_sentado: boolean;
    locomocao: boolean;
    equilibrio_estatico_dinamico: boolean;
    dominancia_manual_esquema_corporal: boolean;
    discriminacao_direita_esquerda: boolean;
    coordenacao_motora_grossa_fina: boolean;
    coordenacao_grafomotora_visomotora: boolean;
    conceitos_basicos: boolean;
    agitacao_psicomotora: boolean;
    adequacao_postural: boolean;
    coordenacao_motora_equilibrio: boolean;
    alimentacao_independente: boolean;
  };
  resource_equipment_used: {
    reduzir_quantidade_material_atividade: boolean;
    provas_orais_escrita_minima: boolean;
    mais_tempo_conclusao_trabalhos: boolean;
    avaliacao_multipla_escolha: boolean;
    orientacoes_diretas_instrucoes_claras: boolean;
    nao_avaliar_caligrafia_ortografia: boolean;
    concentrar_notas_originalidade_ideias: boolean;
    encorajar_pratica_escrita: boolean;
    outro: string;
  };
  resource_equipment_needs: {
    acompanhante_sala_aula: boolean;
    adaptacao_metodologia_professor: boolean;
    compreensao_companheirismo_turma: boolean;
    outro: string;
  };
  curriculum_accessibility: {
    leitura_sem_entonacao: boolean;
    pronuncia_trocas_omissoes: boolean;
    confusao_palavras_parecidas: boolean;
    escrita_incorreta_ordem_letras: boolean;
    tempo_maior_trabalhos_escritos: boolean;
    disfuncao_linguagem_comunicacao: boolean;
    outro: string;
  };
  school_content: string;
  activities_to_be_developed: {
    comunicacao_alternativa: boolean;
    informatica_acessivel: boolean;
    adequacao_material: boolean;
    outro: string;
  };
  objectives: string;
  work_methodology: {
    aulas_praticas: boolean;
    aulas_expositivas_midia: boolean;
    dialogos: boolean;
    visitas_tecnicas: boolean;
    atividades_grupo: boolean;
    atividades_corte_colagem: boolean;
  };
  materials_used: {
    data_show: boolean;
    celular: boolean;
    cartolinas_pinceis: boolean;
    apostilas: boolean;
    artigos: boolean;
    tablet: boolean;
    outro: string;
  };
  evaluation_criteria: {
    participacao_coletiva: boolean;
    observacao_interacoes: boolean;
    atividades_paralelas: boolean;
    participacao_individual: boolean;
    uso_ferramentas_tecnologicas: boolean;
    fotos_videos_relatos: boolean;
    outro: string;
  };
}
