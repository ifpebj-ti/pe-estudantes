import { Injectable } from '@nestjs/common';
import { CreateAnamnesisDto } from './dto/create-anamnesis.dto';
import { PrismaService } from 'src/database/prisma.service';
import { PHASES } from 'src/constants';

@Injectable()
export class AnamnesisService {
  constructor(private prisma: PrismaService) {}

  async create(createAnamnesisDto: CreateAnamnesisDto) {
    const anamnesisCreated = await this.prisma.anamnesis.create({
      data: createAnamnesisDto,
    });

    // Atualiza fase do User para Anamnese
    await this.prisma.user.update({
      where: { email: createAnamnesisDto.email },
      data: { id_current_phase: PHASES.ANAMNESE },
    });

    return anamnesisCreated;
  }

  findAll() {
    return this.prisma.anamnesis.findMany();
  }

  findOne(email: string) {
    return this.prisma.anamnesis.findUnique({
      where: {
        email: email,
      },
    });
  }
}
