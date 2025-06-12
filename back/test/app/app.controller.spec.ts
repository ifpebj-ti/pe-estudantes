import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../src/app.controller';
import { AppService } from '../../src/app.service';

// Mock para o AppService
const mockAppService = {
  getHello: jest.fn().mockReturnValue({ message: 'Hello World!' }),
};

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHello', () => {
    it('should return the hello message from service', () => {
      const result = controller.getHello();

      expect(service.getHello).toHaveBeenCalled();

      expect(result).toEqual({ message: 'Hello World!' });
    });

    it('should be decorated with @Public', () => {
      const metadata = Reflect.getMetadata('isPublic', controller.getHello);
      expect(metadata).toBeTruthy();
    });

    it('should be decorated with @Get', () => {
      const metadata = Reflect.getMetadata('path', controller.getHello);
      expect(metadata).toBe('/');
    });
  });
});