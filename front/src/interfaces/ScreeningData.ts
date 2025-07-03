export interface ScreeningData {
  full_name: string;
  email: string;
  report: string;
  specific_need: {
    deficiencia_fisica: boolean;
    deficiencia_auditiva: boolean;
    baixa_visao: boolean;
    cegueira: boolean;
    surdocegueira: boolean;
    transtornos_globais_de_desenvolvimento: boolean;
    superdotacao: boolean;
    disturbio_de_aprendizagem: boolean;
    outros: string;
  };
  special_service: boolean;
  physical_disability: {
    necessita_de_transcritor: boolean;
    acesso_para_cadeirante: boolean;
    outros: string;
  };
  visual_impairment: {
    necessita_de_braille: boolean;
    material_com_fonte_aumentada: boolean;
    necessita_de_transcritor: boolean;
    outros: string;
  };
  hearing_impairment: {
    necessita_de_interprete_de_lingua_de_sinais: boolean;
    necessita_de_interprete_oralizador: boolean;
    outros: string;
  };
  global_disorder: {
    necessita_de_ledor: boolean;
    necessita_de_transcritor: boolean;
    outros: string;
  };
  other_disabilities: string;
}
