import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AnamnesisService } from './anamnesis.service';
import { CreateAnamnesisDto } from './dto/create-anamnesis.dto';

@Controller('anamnesis')
export class AnamnesisController {
  constructor(private readonly anamnesisService: AnamnesisService) {}

  @Post()
  create(@Body() createAnamnesisDto: CreateAnamnesisDto) {
    return this.anamnesisService.create(createAnamnesisDto);
  }

  @Get()
  findAll() {
    return this.anamnesisService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.anamnesisService.findOne(email);
  }
}
