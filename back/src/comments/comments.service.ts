import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/database/prisma.service';
import { LEVELS } from 'src/constants';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto, idAuthor: number) {
    const commentCreated = await this.prisma.comments.create({
      data: {
        ...createCommentDto,
        id_author: idAuthor,
      },
    });

    return commentCreated;
  }

  async findAllByIdUser(idUser: number, request) {
    const isStudent = request.user.id_level === LEVELS.ALUNO_ESTUDANTE;
    const isViewingOtherProfile = request.user.sub !== idUser;

    if (isStudent && isViewingOtherProfile) {
      throw new ForbiddenException(
        'Você não tem permissão para visualizar estes comentários',
      );
    }

    const allComments = await this.prisma.comments.findMany({
      where: {
        id_user: idUser,
      },
    });
    return allComments;
  }
}
