import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [LevelsController],
  providers: [LevelsService, PrismaService],
  exports: [LevelsService],
})
export class LevelsModule {}
