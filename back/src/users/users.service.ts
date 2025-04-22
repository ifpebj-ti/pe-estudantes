import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const encryptedPassword = await hash(createUserDto.password, 10);
    const userCreated = this.prisma.user.create({ data: {...createUserDto, password: encryptedPassword} });

    return userCreated;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: id },
      data: { name: updateUserDto.name }
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id,
      }
    });
  }
}
