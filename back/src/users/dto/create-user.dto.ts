import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Luizin',
  })
  @IsNotEmpty({ message: 'O campo full_name não deve estar vazio.' })
  @IsString({ message: 'O campo full_name deve ser uma string.' })
  full_name: string;

  @ApiProperty({
    description: 'CPF',
    example: '12345678910',
    minLength: 11,
    maxLength: 11,
  })
  @IsNotEmpty({ message: 'O campo CPF não deve estar vazio.' })
  @IsString({ message: 'O campo CPF deve ser uma string.' })
  @MaxLength(11, { message: 'O campo CPF deve ter no máximo 11 caracteres.' })
  @MinLength(11, { message: 'O campo CPF deve ter no mínimo 11 caracteres.' })
  cpf: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'luizin@hotmail.com',
  })
  @IsNotEmpty({ message: 'O campo email não deve estar vazio.' })
  @IsString({ message: 'O campo email deve ser uma string.' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário com no mínimo 6 caracteres.',
    example: 'senhaSegura123',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'O campo password não deve estar vazio.' })
  @IsString({ message: 'O campo password deve ser uma string' })
  @MinLength(6, { message: 'A senha deve ter no minímo 6 caracteres' })
  password: string;

  @ApiProperty({
    description: 'Filiação do usuário',
    example: 'Filiação',
    required: false,
  })
  @IsOptional({ message: 'O campo affliation é opcional.' })
  @IsString({ message: 'O campo affliation deve ser uma string.' })
  affliation?: string;

  @ApiProperty({
    description: 'Responsável pedagógico',
    example: 'Luizin',
    required: false,
  })
  @IsOptional({ message: 'O campo pedagogical_manager é opcional.' })
  @IsString({ message: 'O campo pedagogical_manager deve ser uma string.' })
  pedagogical_manager?: string;

  @ApiProperty({
    description:
      'O campo é setado automaticamente na criação do usuário como 2(Aluno/Família), não envie esse campo.',
    default: 2,
    readOnly: true,
    required: false,
  })
  readonly id_level: number;

  @ApiProperty({
    description:
      'O campo é setado automaticamente na criação do usuário como 1(Triagem), não envie esse campo.',
    default: 1,
    readOnly: true,
    required: false,
  })
  readonly id_current_phase: number;
}
