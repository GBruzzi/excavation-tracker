import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body('nome') nome: string,
    @Body('contato') contato: string,
  ): Promise<AuthResponseDto> {
    return this.authService.signIn(nome, contato);
  }
}
