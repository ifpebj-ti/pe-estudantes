import { Injectable } from '@nestjs/common';
import { CreateAnamnesisDto } from './dto/create-anamnesis.dto';
import { PrismaService } from 'src/database/prisma.service';
import { PHASES } from 'src/constants';


@Injectable()
export class AnamnesisService {
  constructor(private prisma: PrismaService) {}
  
  create(createAnamnesisDto: CreateAnamnesisDto) {
    const anamnesisCreated = this.prisma.anamnesis.create({
      data: createAnamnesisDto
    })

    // Atualiza fase do User para Anamnese
    this.prisma.user.update({
      where: { email: createAnamnesisDto.email },
      data: { id_current_phase:  PHASES.ANAMNESE }
    })

    return anamnesisCreated;
  }

  findAll() {
    return this.prisma.anamnesis.findMany();
  }

  findOne(email: string) {
    return this.prisma.anamnesis.findUnique({
      where: {
        email: email,
      }
    });
  }
}
