import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class LevelsService {
  constructor(private prisma: PrismaService) {}

  async create(createLevelDto: CreateLevelDto) {
    const levelCreated = this.prisma.level.create({
      data: createLevelDto,
    });

    return levelCreated;
  }

  async findAll() {
    return this.prisma.level.findMany();
  }

  async findOne(id: number) {
    return this.prisma.level.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateLevelDto: UpdateLevelDto) {
    return this.prisma.level.update({
      where: { id: id },
      data: { name: updateLevelDto.name },
    });
  }

  async remove(id: number) {
    return this.prisma.level.delete({
      where: {
        id: id,
      },
    });
  }
}
