import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pesquisador } from './entities/pesquisador.entity';
import { PesquisadorService } from './pesquisador.service';
import { PesquisadorController } from './pesquisador.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pesquisador])],
  controllers: [PesquisadorController],
  providers: [PesquisadorService],
  exports: [PesquisadorModule, PesquisadorService]
})
export class PesquisadorModule {}
