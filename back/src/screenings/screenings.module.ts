import { Module } from '@nestjs/common';
import { ScreeningsService } from './screenings.service';
import { ScreeningsController } from './screenings.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ScreeningsController],
  providers: [ScreeningsService, PrismaService],
  exports: [ScreeningsService]
})
export class ScreeningsModule {}
