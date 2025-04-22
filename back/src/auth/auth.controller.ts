import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './constants/constants';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiBody({
    type: AuthDto,
    description: 'Objeto para obter o token.',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() auth: AuthDto): Promise<any> {
    return await this.authService.signIn(auth.email, auth.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBody({
    description:
      'Para obter o perfil do usuário, basta passar o token na requisição.',
  })
  getProfile(@Request() req) {
    return req.user;
  }
}
