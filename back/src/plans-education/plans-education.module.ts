import { Module } from '@nestjs/common';
import { PlansEducationService } from './plans-education.service';
import { PlansEducationController } from './plans-education.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [PlansEducationController],
  providers: [PlansEducationService, PrismaService],
  exports: [PlansEducationService]
})
export class PlansEducationModule {}
