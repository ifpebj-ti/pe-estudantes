import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePlansEducationDto } from './dto/create-plans-education.dto';
import { PrismaService } from 'src/database/prisma.service';
import { AuthenticatedRequest } from 'src/comments/types/express';
import { LEVELS } from 'src/constants';

@Injectable()
export class PlansEducationService {
  constructor(private prisma: PrismaService) {}

  create(createPlansEducationDto: CreatePlansEducationDto) {
    const plansEducationCreated = this.prisma.plansEducation.create({
      data: createPlansEducationDto
    });

    return plansEducationCreated;
  }

  findAll() {
    return this.prisma.plansEducation.findMany();
  }

  findOne(email: string, request: AuthenticatedRequest) {
    const isStudent = request.user.id_level == LEVELS.ALUNO_ESTUDANTE;
    const isViewingOtherProfile = request.user.email !== email;

    if (isStudent && isViewingOtherProfile) {
      throw new ForbiddenException(
        'Você não tem permissão para visualizar este PEI',
      );
    }

    const planEducation = this.prisma.plansEducation.findUnique({
      where: {
        student_email: email,
      }
    });
    return planEducation;
  }
}
