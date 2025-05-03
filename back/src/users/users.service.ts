import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const DEFAULT_LEVEL_ID = 2; // ID do nível Aluno/Estudante

    const encryptedPassword = await hash(createUserDto.password, 10);
    const userCreated = this.prisma.user.create({
      data: {
        ...createUserDto,
        password: encryptedPassword,
        id_level: DEFAULT_LEVEL_ID,
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: id },
      data: { full_name: updateUserDto.full_name },
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
