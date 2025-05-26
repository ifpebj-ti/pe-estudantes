import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsObject,
} from 'class-validator';

export class CreateAnamnesisDto {
    @ApiProperty({
        description: 'Email',
        example: 'joao@example.com',
    })
    @IsNotEmpty({ message: 'O campo email não deve estar vazio.' })
    @IsString({ message: 'O campo email deve ser uma string.' })
    email: string;

    @ApiProperty({
        description: 'Identificação em formato JSON',
        example: {
            nome_unidade_plena: 'Nome',
            serie_de_escolaridade_atual: 'Escolaridade',
            turma: 'Turma',
            curso: 'Curso',
            idade_iniciou_estudos: '13 anos',
            nome_completo: 'Nome completo',
            data_de_nascimento: 'DD/MM/YYYY',
            endereco: 'Rua...',
            bairo: 'Bairro',
            cep: 'Cep',
            municipio: 'Municipio'
        },
    })
    @IsNotEmpty({ message: 'O campo Identification não deve estar vazio.' })
    @IsObject({ message: 'O campo Identification deve ser um objeto JSON.' })
    identification: object;

    @ApiProperty({
        description: 'Dados familiares em formato JSON',
        example: {
            nome_pai: 'Nome',
            profissao_pai: 'Profissão',
            escolaridade_pai: 'Grau de escolaridade',
            idade_pai: '40 anos',
            nome_mae: 'Nome',
            profissao_mae: 'Profissão',
            escolaridade_mae: 'Grau de escolaridade',
            idade_mae: '40 anos',
            outros_filhos: 'Sim ....',
            uniao_pais: {
                casados: true,
                separados: false,
                separados_como_nova_estrutura_familia: false,
            },
            reacao_estudante_situacao: 'Reação',
            estudante_reside_com_quem: 'Pai',
            pais: {
                biologico: true,
                adotivo: false,
            },
        },
    })
    @IsNotEmpty({ message: 'O campo family_data não deve estar vazio.' })
    @IsObject({ message: 'O campo family_data deve ser um objeto JSON.' })
    family_data: object;

    @ApiProperty({
        description: 'Condições familiares em formato JSON',
        example: {
            moradia: {
                taipa: true,
                alvenaria: false,
                palafita: false,
            },
            convivio_familiar: {
                excelente: true,
                bom: false,
                problematico: false,
                precario: false,
            },
            medidas_disciplinares_com_estudante: 'Medidas',
            quem_usa_medidas_disciplinares: 'Nome',
            reacao_estudante_frente_medidas: 'Reação',
            qualidade_comunicacao_com_estudante: {
                execelente: true,
                boa: false,
                ruim: false,
                pessima: false,
            },
            reacao_contrariado: 'Reação',
            condicao_ambiente_familiar_aprendizagem_escolar: 'Condição',
        },
    })
    @IsNotEmpty({ message: 'O campo family_coditions não deve estar vazio.' })
    @IsObject({ message: 'O campo family_coditions deve ser um objeto JSON.' })
    family_conditions: object;

    @ApiProperty({
        description: 'Condições familiares em formato JSON',
        example: {
            gestacao: {
                transfusao_sanguinea_gravidez: 'Sim...',
                quando_sentiu_movimento_da_crianca: '5 meses...',
                levou_tombo_durante_gravidez: 'Sim...',
                doenca_na_gestacao: 'Sim...',
                condicao_saude_da_mae_na_gravidez: 'Bem...',
                episodio_marcante_gravidez: 'Sim...',
            },
            condicoes_nascimento: {
                nasceu_quantos_meses: '2 meses',
                nasceu_quantos_quilos: '3 quilos',
                nasceu_com_qual_comprimento: '20 cm',
                desenvolvimento_parto: 'Bem...',
            },
            primeiras_reacoes: {
                chorou: 'Sim...',
                ficou_vermelho_demais: 'Sim...',
                ficou_vermelho_por_quanto_tempo: 'Não ficou vermelho',
                precisou_de_oxigenio: 'Sim...',
                ficou_icterico: 'Não...',
                como_era_quando_bebe: 'Lindo...',
                qual_idade_afirmou_cabeca: '2 anos',
                qual_idade_sentou_sem_apoio: '4 anos',
                qual_idade_engatinhou: '3 anos',
                qual_idade_ficou_de_pe: '4 anos',
                qual_idade_andou: '5 anos',
            },
        },
    })
    @IsNotEmpty({ message: 'O campo mother_background não deve estar vazio.' })
    @IsObject({ message: 'O campo mother_background deve ser um objeto JSON.' })
    mother_background: object;
    
    @ApiProperty({
        description: 'Linguagem verbal durante os primeiros trÊs anos de idade em formato JSON',
        example: {
            balbuciou: true,
            primeiras_expressoes: 'Primeiras expressoes',
            trocou_letras: false,
            gaguejou: false,
        },
    })
    @IsNotEmpty({ message: 'O campo verbal_language_three_years não deve estar vazio.' })
    @IsObject({ message: 'O campo verbal_language_three_years deve ser um objeto JSON.' })
    verbal_language_three_years: object;

    @ApiProperty({
        description: 'Desenvolvimento em formato JSON',
        example: {
            saude: {
                sofreu_acidente_ou_fez_cirurgia: 'Sim...',
                possui_alergia: 'Não',
                possui_bronquite_ou_asma: 'Sim, bronquite...',
                possui_problema_visao_audicao: 'Não...',
                ja_desmaiou: 'Não',
                quando_desmaiou: 'Não desmaiou',
                teve_ou_tem_convulsoes: 'Sim...'
            },
            alimentacao: {
                foi_amamentada: 'Sim...',
                foi_amementada_ate_quando: '2 anos...',
                como_e_sua_alimentacao: 'Balanceada...',
                foi_forcado_se_alimentar: 'Não',
                recebe_ajuda_na_alimentacao: 'Não',
            },
            sono: {
                dorme_bem: true,
                sono: {
                    agitado: true,
                    tranquilo: false,
                    fala_dormindo: true,
                    sonambulo: false,
                },
                dorme_separado_dos_pais: true,
                com_quem_dorme: 'Ninguém',
            },
        },
    })
    @IsNotEmpty({ message: 'O campo development não deve estar vazio.' })
    @IsObject({ message: 'O campo development deve ser um objeto JSON.' })
    development: object;

    @ApiProperty({
        description: 'Infamações escolares em formato JSON',
        example: {
            historico_escolar_comum_antecedentes_relevantes: 'Antecedentes...',
            historico_escolar_especial_antecedentes_relevantes: 'Antecedentes...',
            deficiencia_apresentada_estudante: 'Deficiência...',
            retido_alguma_vez: 'Não...',
            gosta_de_ir_escola: 'Não...',
            bem_aceito_pelos_amigous: 'Sim...',
        },
    })

    @IsNotEmpty({ message: 'O campo school_information não deve estar vazio.' })
    @IsObject({ message: 'O campo school_information deve ser um objeto JSON.' })
    school_information: object;

    @ApiProperty({
        description: 'Sexualidade em formato JSON',
        example: {
            explanacao_sexual: true,
            curiosidade_sexual: true,
            conversa_com_pais_sobre_sexualidade: true,
        },
    })
    @IsNotEmpty({ message: 'O campo school_information não deve estar vazio.' })
    @IsObject({ message: 'O campo school_information deve ser um objeto JSON.' })
    sexuality: object;

    @ApiProperty({
        description: 'Avaliação do estudante em formato JSON',
        example: {
            estudante_apresenta_outro_tipo_deficiencia: 'Sim...',
            apresenta_da_df_di_pc_tgd: true,
            se_sim_data_e_resultado_diagnostico: 'Dia 23, possui DA(Deficiência Auditiva)...',
            se_não_situacao_quanto_diagnostico_tem_outras_dificuldades: 'Tranquilo...',
            se_tem_outras_dificuldades: 'Dificuldade de conversar...',
            usa_medicamentos_controlados: true,
            usa_quais_medicamentos: 'Dipirona...',
            medicamento_interfere_aprendizagem: true,
            se_intefere_aprendizagem: 'Fica com sono...',
            existem_recomendacoes_da_saude: true,
            se_possui_recomendacoes_da_saude: 'Não tomar rémedio para estudar...',
        },
    })
    @IsNotEmpty({ message: 'O campo student_assessment não deve estar vazio.' })
    @IsObject({ message: 'O campo student_assessment deve ser um objeto JSON.' })
    student_assessment: object;

    @ApiProperty({
        description: 'Desenvolvimento do estudante em formato JSON',
        example: {
            funcao_cognitiva: {
                percepcao: 'Tem dificuldade...',
                atencao: 'Tranquilo',
                memoria: 'Tranquilo',
                linguagem: 'Dificuldade de se expressar',
                raciocinio_logico: 'Não tem dificuldade',
            },
            funcao_motora: {
                desenvolvimento_e_capacidade_motora: 'Dificuldade de correr',
            },
            funcao_pressoal_social: {
                area_emocional_afetiva_social: 'Tranquilo...'
            }
        },
    })
    @IsNotEmpty({ message: 'O campo student_development não deve estar vazio.' })
    @IsObject({ message: 'O campo student_development deve ser um objeto JSON.' })
    student_development: object;
}
