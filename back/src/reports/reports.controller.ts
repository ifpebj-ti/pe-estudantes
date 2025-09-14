import { Controller, Get, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Levels } from 'src/auth/decorators/levels.decorator';
import { LEVELS } from 'src/constants';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Levels(LEVELS.ALUNO_ESTUDANTE)
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.reportsService.findOne(email);
  }
}
