import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { hash } from 'bcryptjs';
import { LEVELS, PHASES } from 'src/constants';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const encryptedPassword = await hash(createUserDto.password, 10);
    const userCreated = this.prisma.user.create({
      data: {
        ...createUserDto,
        password: encryptedPassword,
        id_level: LEVELS.ALUNO_ESTUDANTE,
        id_current_phase: PHASES.TRIAGEM,
      },
    });

    return userCreated;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { email: email },
      data: { 
        full_name: updateUserDto.full_name,
        id_level: updateUserDto.id_level,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
