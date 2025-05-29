import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Levels } from 'src/auth/decorators/levels.decorator';
import { LEVELS } from 'src/constants';
import { ApiBody } from '@nestjs/swagger';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Levels(LEVELS.ALUNO_ESTUDANTE)
  @ApiBody({
    type: CreateCommentDto,
    description: 'Objeto para criação de um novo comentário.',
  })
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto, @Request() request) {
    const idUser = request.user.sub;

    return this.commentsService.create(createCommentDto, idUser);
  }

  @Get(':id_user')
  findAllByIdUser(@Param('id_user') id_user: string, @Request() request) {
    return this.commentsService.findAllByIdUser(+id_user, request);
  }
}
