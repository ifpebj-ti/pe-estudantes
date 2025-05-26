import { PartialType } from '@nestjs/swagger';
import { CreatePhaseDto } from './create-phase.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePhaseDto extends PartialType(CreatePhaseDto) {
  @ApiProperty({
    description: 'Nome do nível de acesso.',
    example: 'Administrador',
  })
  @IsNotEmpty({ message: 'O campo name não deve estar vazio.' })
  @IsString({ message: 'O campo name deve ser uma string.' })
  name: string;
}
