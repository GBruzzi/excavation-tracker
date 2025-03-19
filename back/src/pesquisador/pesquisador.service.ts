import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pesquisador } from './entities/pesquisador.entity';
import { CreatePesquisadorDto } from './dto/create-pesquisador.dto';
import { UpdatePesquisadorDto } from './dto/update-pesquisador.dto';

@Injectable()
export class PesquisadorService {
  constructor(
    @InjectRepository(Pesquisador)
    private readonly pesquisadorRepository: Repository<Pesquisador>,
  ) {}

  async create(createPesquisadorDto: CreatePesquisadorDto): Promise<Pesquisador> {
    const novoPesquisador = this.pesquisadorRepository.create(createPesquisadorDto);
    return await this.pesquisadorRepository.save(novoPesquisador);
  }

  async findAll(): Promise<Pesquisador[]> {
    return await this.pesquisadorRepository.find();
  }

  async findOne(id: number): Promise<Pesquisador> {
    return await this.pesquisadorRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePesquisadorDto: UpdatePesquisadorDto): Promise<Pesquisador> {
    await this.pesquisadorRepository.update(id, updatePesquisadorDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.pesquisadorRepository.delete(id);
  }

  async findByContato(contato: string) {
    return this.pesquisadorRepository.findOne({ where: { contato } });
  }
  
  
}
