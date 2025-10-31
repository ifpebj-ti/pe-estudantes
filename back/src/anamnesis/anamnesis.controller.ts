import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AnamnesisService } from './anamnesis.service';
import { CreateAnamnesisDto } from './dto/create-anamnesis.dto';
import { Levels } from 'src/auth/decorators/levels.decorator';
import { LEVELS } from 'src/constants';

@Controller('anamnesis')
export class AnamnesisController {
  constructor(private readonly anamnesisService: AnamnesisService) {}

  @Levels(LEVELS.ALUNO_ESTUDANTE)
  @Post()
  create(@Body() createAnamnesisDto: CreateAnamnesisDto) {
    return this.anamnesisService.create(createAnamnesisDto);
  }

  @Levels(LEVELS.ALUNO_ESTUDANTE)
  @Get()
  findAll() {
    return this.anamnesisService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.anamnesisService.findOne(email);
  }

  @Levels(LEVELS.ALUNO_ESTUDANTE)
  @Patch(':email')
  update(
    @Param('email') email: string,
    @Body() updateAnamnesisDto: Partial<CreateAnamnesisDto>,
  ) {
    return this.anamnesisService.update(email, updateAnamnesisDto);
  }

  @Levels(LEVELS.ALUNO_ESTUDANTE)
  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.anamnesisService.remove(email);
  }
}
