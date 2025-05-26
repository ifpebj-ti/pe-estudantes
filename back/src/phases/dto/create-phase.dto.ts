import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhaseDto {
  @ApiProperty({
    description: 'Nome da fase atual.',
    example: 'Triagem',
  })
  @IsNotEmpty({ message: 'O campo name não deve estar vazio.' })
  @IsString({ message: 'O campo name deve ser uma string.' })
  name: string;
}
