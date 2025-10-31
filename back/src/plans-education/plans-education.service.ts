import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlansEducationDto } from './dto/create-plans-education.dto';
import { PrismaService } from 'src/database/prisma.service';
import { AuthenticatedRequest } from 'src/comments/types/express';
import { LEVELS } from 'src/constants';

@Injectable()
export class PlansEducationService {
  constructor(private prisma: PrismaService) {}

  create(createPlansEducationDto: CreatePlansEducationDto) {
    return this.prisma.plansEducation.create({
      data: createPlansEducationDto,
    });
  }

  findAll() {
    return this.prisma.plansEducation.findMany();
  }

  async findOne(email: string, request: AuthenticatedRequest) {
    const isStudent = request.user.id_level == LEVELS.ALUNO_ESTUDANTE;
    const isViewingOtherProfile = request.user.email !== email;

    if (isStudent && isViewingOtherProfile) {
      throw new ForbiddenException(
        'Você não tem permissão para visualizar este PEI',
      );
    }

    const planEducation = await this.prisma.plansEducation.findUnique({
      where: { student_email: email },
    });

    if (!planEducation) throw new NotFoundException('PEI não encontrado');

    return planEducation;
  }

  async update(email: string, data: Partial<CreatePlansEducationDto>) {
    const existing = await this.prisma.plansEducation.findUnique({
      where: { student_email: email },
    });

    if (!existing) {
      throw new NotFoundException('PEI não encontrado');
    }

    return this.prisma.plansEducation.update({
      where: { student_email: email },
      data,
    });
  }

  async remove(email: string) {
    const existing = await this.prisma.plansEducation.findUnique({
      where: { student_email: email },
    });

    if (!existing) {
      throw new NotFoundException('PEI não encontrado');
    }

    await this.prisma.plansEducation.delete({
      where: { student_email: email },
    });

    return { message: `PEI do aluno ${email} removido com sucesso` };
  }
}
