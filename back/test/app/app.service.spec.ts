import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../../src/app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHello', () => {
    it('should return an object with ping pong', () => {
      const result = service.getHello();
      
      expect(result).toBeDefined();
      expect(result).toEqual({ ping: 'pong' });
      expect(typeof result).toBe('object');
    });

    it('should have ping property with value pong', () => {
      const result = service.getHello();
      
      expect(result).toHaveProperty('ping');
      expect(result.ping).toBe('pong');
    });
  });
});