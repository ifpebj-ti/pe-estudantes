import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './database/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
