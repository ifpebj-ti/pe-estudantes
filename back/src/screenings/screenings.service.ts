import { Injectable } from '@nestjs/common';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ScreeningsService {
  constructor(private prisma: PrismaService) {}
  
  create(createScreeningDto: CreateScreeningDto) {
    const screeningCreated = this.prisma.screening.create({
       data: createScreeningDto 
      });

      return screeningCreated;
  }

  findAll() {
    return this.prisma.screening.findMany();
  }

  findOne(email: string) {
    return this.prisma.screening.findUnique({
      where: {
        email: email,
      },
    });
  }
}
