import { Module } from '@nestjs/common';
import { AnamnesisService } from './anamnesis.service';
import { AnamnesisController } from './anamnesis.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [AnamnesisController],
  providers: [AnamnesisService, PrismaService],
})
export class AnamnesisModule {}
