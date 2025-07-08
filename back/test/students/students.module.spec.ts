import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma.service';
import { StudentsController } from 'src/students/students.controller';
import { StudentsModule } from 'src/students/students.module';
import { StudentsService } from 'src/students/students.service';

describe('StudentsModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [StudentsModule],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have StudentsController defined', () => {
    const controller = module.get<StudentsController>(StudentsController);
    expect(controller).toBeDefined();
  });

  it('should have StudentsService defined', () => {
    const service = module.get<StudentsService>(StudentsService);
    expect(service).toBeDefined();
  });
});
