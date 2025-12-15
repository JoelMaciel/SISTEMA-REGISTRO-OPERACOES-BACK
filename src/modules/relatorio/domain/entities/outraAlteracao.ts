import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Relatorio } from './relatorio';

@Entity('outras-alteracoes')
export class OutraAlteracao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  descricao: string;

  @ManyToOne(() => Relatorio, (relatorio) => relatorio.outrasAlteracoes, {
    eager: false,
  })
  @JoinColumn({ name: 'relatorio_id' })
  relatorio: Relatorio;
}
