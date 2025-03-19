import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ponto } from '../../ponto/entities/ponto.entity'; 

@Entity('pesquisadores') 
export class Pesquisador {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ type: 'varchar', length: 255 })
  nome: string; 

  @Column({ type: 'varchar', length: 100, nullable: true })
  contato: string; 

  @Column({ type: 'varchar', length: 255, nullable: true })
  instituicao: string; 

  @Column({ type: 'varchar', length: 255, nullable: true })
  especialidade: string; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; 

  @OneToMany(() => Ponto, ponto => ponto.pesquisador)
  pontosDescobertos: Ponto[]; 
}

