import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PesquisadorModule } from './pesquisador/pesquisador.module';
import { PontoModule } from './ponto/ponto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pesquisador } from './pesquisador/entities/pesquisador.entity'; 
import { Ponto } from './ponto/entities/ponto.entity'; 
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Pesquisador, Ponto],
        synchronize: true,
      }),
    }),
    PesquisadorModule, 
    PontoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
