import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Ocorrencia } from './ocorrencia';

@Entity('outros_objetos')
export class OutroObjeto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  descricao: string;

  @ManyToOne(() => Ocorrencia, (ocorrencia) => ocorrencia.outrosObjetos)
  @JoinColumn({ name: 'ocorrencia_id' })
  ocorrencia: Ocorrencia;
}
