import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string) {
    return this.prisma.$queryRaw<any[]>`
      SELECT a.*, p.*, s.*
      FROM "Anamnesis" a
      LEFT JOIN "PlansEducation" p ON p."student_email" = a.email
      LEFT JOIN "Screening" s ON s."email" = a.email
      WHERE a.email = ${email}
    `;
  }
}
