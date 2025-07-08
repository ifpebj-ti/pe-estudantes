import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from 'src/students/students.controller';
import { StudentsService } from 'src/students/students.service';

describe('PlansEducationController', () => {
  let controller: StudentsController;
  let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        {
          provide: StudentsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const result = [
        {
          id: 1,
          full_name: 'Luizin',
          cpf: '12345678910',
          email: 'luizin@hotmail.com',
          password: 'senhaSegura123',
          affliation: 'Filiação',
          pedagogical_manager: 'Luizin',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
          id_level: 2,
          id_current_phase: 1,
        },
        {
          id: 2,
          full_name: 'Luizin',
          cpf: '12345678910',
          email: 'luizin@hotmail.com',
          password: 'senhaSegura123',
          affliation: 'Filiação',
          pedagogical_manager: 'Luizin',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
          id_level: 2,
          id_current_phase: 1,
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
