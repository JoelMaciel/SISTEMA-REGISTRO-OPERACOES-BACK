import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ocorrencia } from './ocorrencia';
import { UnidadeMedida } from '../enums/UnidadeMedida';

@Entity('drogas')
export class Droga {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  tipo: string;

  @Column({ length: 25 })
  quantidade: string;

  @Column({ name: 'unidade_medida', type: 'enum', enum: UnidadeMedida })
  unidadeMedida: UnidadeMedida;

  @ManyToOne(() => Ocorrencia, (ocorrencia) => ocorrencia.drogas)
  @JoinColumn({ name: 'ocorrencia_id' })
  ocorrencia: Ocorrencia;
}
