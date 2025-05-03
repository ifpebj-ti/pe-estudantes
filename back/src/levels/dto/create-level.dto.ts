import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLevelDto {
  @ApiProperty({
    description: 'Nome do nível de acesso.',
    example: 'Administrador',
  })
  @IsNotEmpty({ message: 'O campo name não deve estar vazio.' })
  @IsString({ message: 'O campo name deve ser uma string.' })
  name: string;
}
