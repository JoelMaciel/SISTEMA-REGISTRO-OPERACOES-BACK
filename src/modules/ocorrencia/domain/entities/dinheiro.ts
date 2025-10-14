import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ocorrencia } from './ocorrencia';

@Entity('dinheiro')
export class Dinheiro {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 15 })
  valor: string;

  @ManyToOne(() => Ocorrencia, (ocorrencia) => ocorrencia.valoresApreendidos, {
    nullable: false,
  })
  @JoinColumn({ name: 'ocorrencia_id' })
  ocorrencia: Ocorrencia;
}
