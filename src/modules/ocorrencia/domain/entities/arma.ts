import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ocorrencia } from './ocorrencia';

@Entity('armas')
export class Arma {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 80 })
  tipo: string;

  @Column({ length: 25 })
  calibre: string;

  @Column({ length: 80 })
  numeracao: string;

  @Column({ type: 'int' })
  capacidade: number;

  @ManyToOne(() => Ocorrencia, (ocorrencia) => ocorrencia.armas, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ocorrencia_id' })
  ocorrencia: Ocorrencia;
}
