import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma.service';
import { PhasesService } from 'src/phases/phases.service';

describe('PhasesService', () => {
  let service: PhasesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhasesService,
        {
          provide: PrismaService,
          useValue: {
            currentPhases: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PhasesService>(PhasesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a phase', async () => {
      const createPhaseDto = { name: 'Test Phase' };
      const createdPhase = { id: 1, created_at: new Date(), 
            updated_at: new Date(), 
            deleted_at: null, ...createPhaseDto };

      jest.spyOn(prisma.currentPhases, 'create').mockResolvedValue(createdPhase);

      const result = await service.create(createPhaseDto);

      expect(prisma.currentPhases.create).toHaveBeenCalledWith({
        data: createPhaseDto,
      });
      expect(result).toEqual(createdPhase);
    });
  });

  describe('findAll', () => {
    it('should return an array of phases', async () => {
      const phasesList = [{ id: 1, name: 'Phase 1', created_at: new Date(), 
            updated_at: new Date(), 
            deleted_at: null }, { id: 2, name: 'Phase 2', created_at: new Date(), 
            updated_at: new Date(), 
            deleted_at: null }];
      jest.spyOn(prisma.currentPhases, 'findMany').mockResolvedValue(phasesList);

      const result = await service.findAll();

      expect(prisma.currentPhases.findMany).toHaveBeenCalled();
      expect(result).toEqual(phasesList);
    });
  });

  describe('findOne', () => {
    it('should return a single phase by ID', async () => {
      const id = 1;
      const phase = { id: 1, name: 'Test Phase', created_at: new Date(), 
            updated_at: new Date(), 
            deleted_at: null };
      jest.spyOn(prisma.currentPhases, 'findUnique').mockResolvedValue(phase);

      const result = await service.findOne(id);

      expect(prisma.currentPhases.findUnique).toHaveBeenCalledWith({
        where: { id: id },
      });
      expect(result).toEqual(phase);
    });
  });

  describe('update', () => {
    it('should update a phase', async () => {
      const id = 1;
      const updatePhaseDto = { name: 'Updated Phase' };
      const updatedPhase = { id: 1, created_at: new Date(), 
            updated_at: new Date(), 
            deleted_at: null, ...updatePhaseDto };

      jest.spyOn(prisma.currentPhases, 'update').mockResolvedValue(updatedPhase);

      const result = await service.update(id, updatePhaseDto);

      expect(prisma.currentPhases.update).toHaveBeenCalledWith({
        where: { id: id },
        data: { name: updatePhaseDto.name },
      });
      expect(result).toEqual(updatedPhase);
    });
  });

  describe('remove', () => {
    it('should remove a phase', async () => {
      const id = 1;
      const removedPhase = { id: 1, name: 'Removed Phase', created_at: new Date(), 
            updated_at: new Date(), 
            deleted_at: null };

      jest.spyOn(prisma.currentPhases, 'delete').mockResolvedValue(removedPhase);

      const result = await service.remove(id);

      expect(prisma.currentPhases.delete).toHaveBeenCalledWith({
        where: { id: id },
      });
      expect(result).toEqual(removedPhase);
    });
  });
});


