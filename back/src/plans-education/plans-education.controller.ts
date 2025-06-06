import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { PlansEducationService } from './plans-education.service';
import { CreatePlansEducationDto } from './dto/create-plans-education.dto';
import { Levels } from 'src/auth/decorators/levels.decorator';
import { LEVELS } from 'src/constants';
import { AuthenticatedRequest } from 'src/comments/types/express';

@Controller('plans-education')
export class PlansEducationController {
  constructor(private readonly plansEducationService: PlansEducationService) {}

  // Só o professor pode criar o PEI
  @Levels(
    LEVELS.ADMIN,
    LEVELS.ALUNO_ESTUDANTE,
    LEVELS.PROFISSIONAL_EDUCACAO,
    LEVELS.PROFISSIONAL_SAUDE,
  )
  @Post()
  create(@Body() createPlansEducationDto: CreatePlansEducationDto) {
    return this.plansEducationService.create(createPlansEducationDto);
  }

  @Levels(LEVELS.ALUNO_ESTUDANTE)
  @Get()
  findAll() {
    return this.plansEducationService.findAll();
  }

  @Get(':email')
  findOne(
    @Param('email') email: string,
    @Request() request: AuthenticatedRequest,
  ) {
    return this.plansEducationService.findOne(email, request);
  }
}
