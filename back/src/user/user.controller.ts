import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UserController {
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
    return 'This action adds a new user';
  }

  @Get()
  async findAll(
    @Query('age') age: number,
    @Query('name') name: string,
  ): Promise<string> {
    return `This action returns all users filtered by age: ${age} and name: ${name}`;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<string> {
    return `This action returns a #${id} user`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} user`;
  }
}
