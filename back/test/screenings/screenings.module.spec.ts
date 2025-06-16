import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma.service';
import { ScreeningsController } from 'src/screenings/screenings.controller';
import { ScreeningsModule } from 'src/screenings/screenings.module';
import { ScreeningsService } from 'src/screenings/screenings.service';

describe('ScreeningsModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ScreeningsModule],
    })
    .overrideProvider(PrismaService)
    .useValue({})
    .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have ScreeningsController defined', () => {
    const controller = module.get<ScreeningsController>(ScreeningsController);
    expect(controller).toBeDefined();
  });

  it('should have ScreeningsService defined', () => {
    const service = module.get<ScreeningsService>(ScreeningsService);
    expect(service).toBeDefined();
  });
});


