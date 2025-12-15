import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusAlteracao } from '../enums/statusAlteracao';
import { Relatorio } from './relatorio';

@Entity('alteracoes-efetivo')
export class AlteracaoEfetivo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30 })
  status: StatusAlteracao;

  @Column({ type: 'text' })
  descricao: string;

  @ManyToOne(() => Relatorio, (relatorio) => relatorio.alteracoesEfetivo, {
    eager: false,
  })
  @JoinColumn({ name: 'relatorio_id' })
  relatorio: Relatorio;
}
