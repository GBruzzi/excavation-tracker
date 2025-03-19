import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pesquisador } from '../../pesquisador/entities/pesquisador.entity'; 

@Entity('pontos') 
export class Ponto {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ type: 'varchar', length: 255 })
  tipoPonto: string; 

  @Column({ type: 'float' })
  latitude: number; 

  @Column({ type: 'float' })
  longitude: number;

  @Column({ type: 'float', nullable: true })
  altitude: number; 

  @Column({ type: 'varchar', length: 500, nullable: true })
  descricao: string; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataDescoberta: Date; 

  @ManyToOne(() => Pesquisador, pesquisador => pesquisador.pontosDescobertos, { nullable: true })
  @JoinColumn({ name: 'pesquisador_id' })
  pesquisador: Pesquisador; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; 
}
