import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PesquisadorModule } from 'src/pesquisador/pesquisador.module';

@Module({
  imports : [
    PesquisadorModule,
    JwtModule.registerAsync({
    global: true,
    imports: [],
    useFactory: async (configService : ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {expiresIn: +configService.get<number>('JWT_EXPIRATION_TIME')}
    }),
    inject: [ConfigService],
  })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
