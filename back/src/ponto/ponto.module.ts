import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PontoService } from './ponto.service';
import { PontoController } from './ponto.controller';
import { Ponto } from './entities/ponto.entity';
import { Pesquisador } from '../pesquisador/entities/pesquisador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ponto, Pesquisador])], 
  controllers: [PontoController],
  providers: [PontoService],
})
export class PontoModule {}
