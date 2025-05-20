import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { LEVELS } from 'src/constants';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      where: {
        id_level: LEVELS.ALUNO_ESTUDANTE,
      },
    });
  }
}
