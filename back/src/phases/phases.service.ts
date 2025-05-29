import { Injectable } from '@nestjs/common';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PhasesService {
  constructor(private prisma: PrismaService) {}

  create(createPhaseDto: CreatePhaseDto) {
    const phaseCreated = this.prisma.currentPhases.create({
      data: createPhaseDto,
    });

    return phaseCreated;
  }

  findAll() {
    return this.prisma.currentPhases.findMany();
  }

  findOne(id: number) {
    return this.prisma.currentPhases.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updatePhaseDto: UpdatePhaseDto) {
    return this.prisma.currentPhases.update({
      where: { id: id },
      data: { name: updatePhaseDto.name },
    });
  }

  remove(id: number) {
    return this.prisma.currentPhases.delete({
      where: {
        id: id,
      },
    });
  }
}
