import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePontoDto } from './dto/create-ponto.dto';
import { UpdatePontoDto } from './dto/update-ponto.dto';
import { Ponto } from './entities/ponto.entity';
import { Pesquisador } from '../pesquisador/entities/pesquisador.entity';

@Injectable()
export class PontoService {
  constructor(
    @InjectRepository(Ponto)
    private readonly pontoRepository: Repository<Ponto>,

    @InjectRepository(Pesquisador)
    private readonly pesquisadorRepository: Repository<Pesquisador>,
  ) {}

  async create(createPontoDto: CreatePontoDto): Promise<Ponto> {
    // Verifica se o pesquisador existe
    const pesquisador = await this.pesquisadorRepository.findOne({
      where: { id: createPontoDto.pesquisadorId },
    });

    if (!pesquisador) {
      throw new NotFoundException('Pesquisador não encontrado');
    }

    // Cria um novo ponto e associa ao pesquisador
    const novoPonto = this.pontoRepository.create({
      ...createPontoDto,
      pesquisador,
    });

    return this.pontoRepository.save(novoPonto);
  }

  async findAll(): Promise<Ponto[]> {
    return this.pontoRepository.find({ relations: ['pesquisador'] });
  }

  async findOne(id: number): Promise<Ponto> {
    const ponto = await this.pontoRepository.findOne({
      where: { id },
      relations: ['pesquisador'],
    });

    if (!ponto) {
      throw new NotFoundException(`Ponto com ID ${id} não encontrado`);
    }

    return ponto;
  }

  async update(id: number, updatePontoDto: UpdatePontoDto): Promise<Ponto> {
    const ponto = await this.findOne(id);

    if (updatePontoDto.pesquisadorId) {
      const pesquisador = await this.pesquisadorRepository.findOne({
        where: { id: updatePontoDto.pesquisadorId },
      });

      if (!pesquisador) {
        throw new NotFoundException('Pesquisador não encontrado');
      }

      ponto.pesquisador = pesquisador;
    }

    Object.assign(ponto, updatePontoDto);
    return this.pontoRepository.save(ponto);
  }

  async remove(id: number): Promise<void> {
    const ponto = await this.findOne(id);
    await this.pontoRepository.remove(ponto);
  }
}
