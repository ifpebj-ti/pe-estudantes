import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comentário que deseja fazer para o estudante.',
    example: 'Estudante "tal" teve um surto está manhã',
  })
  @IsNotEmpty({ message: 'O campo comment não deve estar vazio.' })
  @IsString({ message: 'O campo comment deve ser uma string.' })
  comment: string;

  @ApiProperty({
    description: 'Id do usuário que vai receber o comentário.',
    example: '2',
  })
  @IsNotEmpty({ message: 'O campo id_user não deve estar vazio.' })
  @IsNumber({ allowNaN: false })
  id_user: number;
}
