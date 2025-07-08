import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma.service';
import { PlansEducationController } from 'src/plans-education/plans-education.controller';
import { PlansEducationModule } from 'src/plans-education/plans-education.module';
import { PlansEducationService } from 'src/plans-education/plans-education.service';

describe('PlansEducationModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [PlansEducationModule],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have PlansEducationController defined', () => {
    const controller = module.get<PlansEducationController>(
      PlansEducationController,
    );
    expect(controller).toBeDefined();
  });

  it('should have PlansEducationService defined', () => {
    const service = module.get<PlansEducationService>(PlansEducationService);
    expect(service).toBeDefined();
  });
});
