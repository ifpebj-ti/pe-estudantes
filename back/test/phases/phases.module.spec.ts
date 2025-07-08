import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma.service';
import { PhasesController } from 'src/phases/phases.controller';
import { PhasesModule } from 'src/phases/phases.module';
import { PhasesService } from 'src/phases/phases.service';

describe('PhasesModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [PhasesModule],
    })
      .overrideProvider(PrismaService) // Mock PrismaService for module testing
      .useValue({})
      .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have PhasesController defined', () => {
    const controller = module.get<PhasesController>(PhasesController);
    expect(controller).toBeDefined();
  });

  it('should have PhasesService defined', () => {
    const service = module.get<PhasesService>(PhasesService);
    expect(service).toBeDefined();
  });
});
