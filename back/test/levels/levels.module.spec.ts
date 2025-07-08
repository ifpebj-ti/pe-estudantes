import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from 'src/database/prisma.service';
import { LevelsController } from 'src/levels/levels.controller';
import { LevelsModule } from 'src/levels/levels.module';
import { LevelsService } from 'src/levels/levels.service';

describe('LevelsModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [LevelsModule],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have LevelsController defined', () => {
    const controller = module.get<LevelsController>(LevelsController);
    expect(controller).toBeDefined();
  });

  it('should have LevelsService defined', () => {
    const service = module.get<LevelsService>(LevelsService);
    expect(service).toBeDefined();
  });
});
