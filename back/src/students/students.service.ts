import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    const DEFAULT_LEVEL_ID = 2; // ID do nível Aluno/Estudante

    return this.prisma.user.findMany({
      where: {
        id_level: DEFAULT_LEVEL_ID,
      },
    });
  }
}
