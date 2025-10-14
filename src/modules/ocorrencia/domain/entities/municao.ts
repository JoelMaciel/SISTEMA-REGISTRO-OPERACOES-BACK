import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ocorrencia } from './ocorrencia';

@Entity('municoes')
export class Municao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 25 })
  quantidade: string;

  @Column()
  calibre: string;

  @ManyToOne(() => Ocorrencia, (ocorrencia) => ocorrencia.municoes)
  @JoinColumn({ name: 'ocorrencia_id' })
  ocorrencia: Ocorrencia;
}
