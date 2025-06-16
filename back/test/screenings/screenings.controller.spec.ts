import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningsController } from 'src/screenings/screenings.controller';
import { CreateScreeningDto } from 'src/screenings/dto/create-screening.dto';
import { ScreeningsService } from 'src/screenings/screenings.service';

describe('ScreeningsController', () => {
  let controller: ScreeningsController;
  let service: ScreeningsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScreeningsController],
      providers: [
        {
          provide: ScreeningsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ScreeningsController>(ScreeningsController);
    service = module.get<ScreeningsService>(ScreeningsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a screening', async () => {
      const createScreeningDto: CreateScreeningDto = {
        full_name: "João Silva",
        email: "joao@example.com",
        report: "Link do Relatório Médico",
        specific_need: {
            "deficiencia_fisica": true,
            "deficiencia_auditiva": true,
            "baixa_visao": true,
            "cegueira": true,
            "surdocegueira": true,
            "transtornos_globais_de_desenvolvimento": true,
            "superdotacao": true,
            "disturbio_de_aprendizagem": true,
            "outros": "Algum outro tipo"
        },
        special_service: true,
        physical_disability: {
            "necessita_de_transcritor": true,
            "acesso_para_cadeirante": true,
            "outros": "Algum outro tipo"
        },
        visual_impairment: {
            "necessita_de_braille": true,
            "material_com_fonte_aumentada": true,
            "necessita_de_transcritor": true,
            "outros": "Algum outro tipo"
        },
        hearing_impairment: {
            "necessita_de_interprete_de_lingua_de_sinais": true,
            "necessita_de_interprete_oralizador": true,
            "outros": "Algum outro tipo"
        },
        global_disorder: {
            "necessita_de_ledor": true,
            "necessita_de_transcritor": true,
            "outros": "Algum outro tipo"
        },
        other_disabilities: "Descrição de outras deficiências não listadas"
      };
      const result = { id: 1 ,created_at: new Date(), updated_at: new Date(), deleted_at: null, ...createScreeningDto };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createScreeningDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createScreeningDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of screenings', async () => {
      const result = [
        {
            id: 1,
            full_name: "João Silva",
            email: "joao@example.com",
            report: "Link do Relatório Médico",
            specific_need: {
                "deficiencia_fisica": true,
                "deficiencia_auditiva": true,
                "baixa_visao": true,
                "cegueira": true,
                "surdocegueira": true,
                "transtornos_globais_de_desenvolvimento": true,
                "superdotacao": true,
                "disturbio_de_aprendizagem": true,
                "outros": "Algum outro tipo"
            },
            special_service: true,
            physical_disability: {
                "necessita_de_transcritor": true,
                "acesso_para_cadeirante": true,
                "outros": "Algum outro tipo"
            },
            visual_impairment: {
                "necessita_de_braille": true,
                "material_com_fonte_aumentada": true,
                "necessita_de_transcritor": true,
                "outros": "Algum outro tipo"
            },
            hearing_impairment: {
                "necessita_de_interprete_de_lingua_de_sinais": true,
                "necessita_de_interprete_oralizador": true,
                "outros": "Algum outro tipo"
            },
            global_disorder: {
                "necessita_de_ledor": true,
                "necessita_de_transcritor": true,
                "outros": "Algum outro tipo"
            },
            other_disabilities: "Descrição de outras deficiências não listadas",
            created_at: new Date(), 
            updated_at: new Date(), 
            deleted_at: null,
        },
        {
            id: 2,
            full_name: "João Silva",
            email: "joao@example.com",
            report: "Link do Relatório Médico",
            specific_need: {
                "deficiencia_fisica": true,
                "deficiencia_auditiva": true,
                "baixa_visao": true,
                "cegueira": true,
                "surdocegueira": true,
                "transtornos_globais_de_desenvolvimento": true,
                "superdotacao": true,
                "disturbio_de_aprendizagem": true,
                "outros": "Algum outro tipo"
            },
            special_service: true,
            physical_disability: {
                "necessita_de_transcritor": true,
                "acesso_para_cadeirante": true,
                "outros": "Algum outro tipo"
            },
            visual_impairment: {
                "necessita_de_braille": true,
                "material_com_fonte_aumentada": true,
                "necessita_de_transcritor": true,
                "outros": "Algum outro tipo"
            },
            hearing_impairment: {
                "necessita_de_interprete_de_lingua_de_sinais": true,
                "necessita_de_interprete_oralizador": true,
                "outros": "Algum outro tipo"
            },
            global_disorder: {
                "necessita_de_ledor": true,
                "necessita_de_transcritor": true,
                "outros": "Algum outro tipo"
            },
            other_disabilities: "Descrição de outras deficiências não listadas",
            created_at: new Date(), 
            updated_at: new Date(), 
            deleted_at: null,
        }
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single screening by email', async () => {
      const email = 'test@example.com';
      const result = {
            id: 1,
            full_name: "João Silva",
            email: "joao@example.com",
            report: "Link do Relatório Médico",
            specific_need: {
                "deficiencia_fisica": true,
                "deficiencia_auditiva": true,
                "baixa_visao": true,
                "cegueira": true,
                "surdocegueira": true,
                "transtornos_globais_de_desenvolvimento": true,
                "superdotacao": true,
                "disturbio_de_aprendizagem": true,
                "outros": "Algum outro tipo"
            },
            special_service: true,
            physical_disability: {
                "necessita_de_transcritor": true,
                "acesso_para_cadeirante": true,
                "outros": "Algum outro tipo"
            },
            visual_impairment: {
                "necessita_de_braille": true,
                "material_com_fonte_aumentada": true,
                "necessita_de_transcritor": true,
                "outros": "Algum outro tipo"
            },
            hearing_impairment: {
                "necessita_de_interprete_de_lingua_de_sinais": true,
                "necessita_de_interprete_oralizador": true,
                "outros": "Algum outro tipo"
            },
            global_disorder: {
                "necessita_de_ledor": true,
                "necessita_de_transcritor": true,
                "outros": "Algum outro tipo"
            },
            other_disabilities: "Descrição de outras deficiências não listadas",
            created_at: new Date(), 
            updated_at: new Date(), 
            deleted_at: null,
        };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(email)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(email);
    });
  });
});


