import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthDto {
    @ApiProperty({
        description: "Email do usuário",
        example: "exemplo@hotmail.com"
      })
    @IsNotEmpty({ message: "O campo email não deve estar vazio." })
    @IsString({ message: "O campo email deve ser uma string." })
    email: string;

    @ApiProperty({
    description: "Senha do usuário com no mínimo 6 caracteres.",
    example: "senhaSegura123",
    minLength: 6
    })
    @IsNotEmpty({ message: "O campo password não deve estar vazio." })
    @IsString({ message: "O campo password deve ser uma string" })
    @MinLength(6, { message: "A senha deve ter no minímo 6 caracteres" })
    password: string;
}