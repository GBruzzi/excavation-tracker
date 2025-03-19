import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PesquisadorService } from '../pesquisador/pesquisador.service';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly pesquisadorService: PesquisadorService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(nome: string, contato: string): Promise<AuthResponseDto> {
    const foundPesquisador = await this.pesquisadorService.findByContato(contato);
  
    if (!foundPesquisador || foundPesquisador.nome !== nome) {
      throw new UnauthorizedException('Nome ou contato inválidos.');
    }
  
    const payload = { sub: foundPesquisador.id, contato: foundPesquisador.contato };
    const token = this.jwtService.sign(payload);
  
    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
  
}
