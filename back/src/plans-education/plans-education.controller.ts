import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Request,
} from '@nestjs/common';
import { PlansEducationService } from './plans-education.service';
import { CreatePlansEducationDto } from './dto/create-plans-education.dto';
import { Levels } from 'src/auth/decorators/levels.decorator';
import { LEVELS } from 'src/constants';
import { AuthenticatedRequest } from 'src/comments/types/express';

@Controller('plans-education')
export class PlansEducationController {
  constructor(private readonly plansEducationService: PlansEducationService) {}

  @Levels(LEVELS.ALUNO_ESTUDANTE)
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

  @Patch(':email')
  update(
    @Param('email') email: string,
    @Body() data: Partial<CreatePlansEducationDto>,
  ) {
    return this.plansEducationService.update(email, data);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.plansEducationService.remove(email);
  }
}
