import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [UsersModule],
  providers: [PrismaService],
})
export class AppModule {}
