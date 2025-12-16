import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AspectoPositivo } from './aspectosPositivos';
import { Operacao } from 'src/modules/operacao/domain/entities/operacao';
import { MelhoriaIdentificada } from './melhoriaIndentificada';
import { Fiscal } from '../../../fiscal/domain/entities/fiscal';
import { AlteracaoEfetivo } from './alteracaoEfetivo';
import { OutraAlteracao } from './outraAlteracao';

@Entity('relatorios')
export class Relatorio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'data_inicial' })
  dataInicial: Date;

  @Column({ name: 'data_final' })
  dataFinal: Date;

  @Column({ name: 'horario_inicial' })
  horarioInicial: string;

  @Column({ name: 'horario_final' })
  horarioFinal: string;

  @Column({ length: 100 })
  local: string;

  @Column({ name: 'total_posto' })
  totalPosto: number;

  @Column({ name: 'efetivo_total' })
  efetivoTotal: number;

  @ManyToOne(() => Operacao, (operacao) => operacao.relatorios, {
    eager: false,
  })
  @JoinColumn({ name: 'operacao_id' })
  operacao: Operacao;

  @ManyToOne(() => Fiscal, (fiscal) => fiscal.relatorios, {
    eager: false,
  })
  @JoinColumn({ name: 'fiscal_id' })
  fiscal: Fiscal;

  @OneToMany(() => AspectoPositivo, (aspecto) => aspecto.relatorio, {
    eager: true,
    cascade: true,
  })
  aspectosPositivos: AspectoPositivo[];

  @OneToMany(() => MelhoriaIdentificada, (melhoria) => melhoria.relatorio, {
    eager: true,
    cascade: true,
  })
  melhoriasIdentificadas: MelhoriaIdentificada[];

  @OneToMany(() => AlteracaoEfetivo, (alteracao) => alteracao.relatorio, {
    eager: true,
    cascade: true,
  })
  alteracoesEfetivo: AlteracaoEfetivo[];

  @OneToMany(() => OutraAlteracao, (alteracaoes) => alteracaoes.relatorio, {
    eager: true,
    cascade: true,
  })
  outrasAlteracoes: OutraAlteracao[];
}
