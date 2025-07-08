import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/database/prisma.service';
import { LevelsService } from 'src/levels/levels.service';

describe('LevelsService', () => {
  let service: LevelsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LevelsService,
        {
          provide: PrismaService,
          useValue: {
            level: {
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

    service = module.get<LevelsService>(LevelsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a level', async () => {
      const createLevelDto = { name: 'Test Level' };
      const createdLevel = {
        id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        ...createLevelDto,
      };

      jest.spyOn(prisma.level, 'create').mockResolvedValue(createdLevel);

      const result = await service.create(createLevelDto);

      expect(prisma.level.create).toHaveBeenCalledWith({
        data: createLevelDto,
      });
      expect(result).toEqual(createdLevel);
    });
  });

  describe('findAll', () => {
    it('should return an array of levels', async () => {
      const levelsList = [
        {
          id: 1,
          name: 'Level 1',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        },
        {
          id: 2,
          name: 'Level 2',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        },
      ];
      jest.spyOn(prisma.level, 'findMany').mockResolvedValue(levelsList);

      const result = await service.findAll();

      expect(prisma.level.findMany).toHaveBeenCalled();
      expect(result).toEqual(levelsList);
    });
  });

  describe('findOne', () => {
    it('should return a single level by ID', async () => {
      const id = 1;
      const level = {
        id: 1,
        name: 'Test Level',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };
      jest.spyOn(prisma.level, 'findUnique').mockResolvedValue(level);

      const result = await service.findOne(id);

      expect(prisma.level.findUnique).toHaveBeenCalledWith({
        where: { id: id },
      });
      expect(result).toEqual(level);
    });
  });

  describe('update', () => {
    it('should update a level', async () => {
      const id = 1;
      const updateLevelDto = { name: 'Updated Level' };
      const updatedLevel = {
        id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        ...updateLevelDto,
      };

      jest.spyOn(prisma.level, 'update').mockResolvedValue(updatedLevel);

      const result = await service.update(id, updateLevelDto);

      expect(prisma.level.update).toHaveBeenCalledWith({
        where: { id: id },
        data: { name: updateLevelDto.name },
      });
      expect(result).toEqual(updatedLevel);
    });
  });

  describe('remove', () => {
    it('should remove a level', async () => {
      const id = 1;
      const removedLevel = {
        id: 1,
        name: 'Removed Level',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };

      jest.spyOn(prisma.level, 'delete').mockResolvedValue(removedLevel);

      const result = await service.remove(id);

      expect(prisma.level.delete).toHaveBeenCalledWith({
        where: { id: id },
      });
      expect(result).toEqual(removedLevel);
    });
  });
});
