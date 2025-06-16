import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma.service';
import { AnamnesisModule } from 'src/anamnesis/anamnesis.module';
import { AnamnesisService } from 'src/anamnesis/anamnesis.service';
import { AnamnesisController } from 'src/anamnesis/anamnesis.controller';

describe('AnamnesisModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AnamnesisModule],
    })
    .overrideProvider(PrismaService)
    .useValue({})
    .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have AnamnesisController defined', () => {
    const controller = module.get<AnamnesisController>(AnamnesisController);
    expect(controller).toBeDefined();
  });

  it('should have AnamnesisService defined', () => {
    const service = module.get<AnamnesisService>(AnamnesisService);
    expect(service).toBeDefined();
  });
});


