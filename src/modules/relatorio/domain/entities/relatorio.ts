import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AspectoPositivo } from './AspectosPositivos';
import { Operacao } from 'src/modules/operacao/domain/entities/operacao';
import { MelhoriaIdentificada } from './MelhoriaIndentificada';
import { Fiscal } from './Fiscal';

@Entity('relatorios')
export class Relatorio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30 })
  data: Date;

  @Column()
  horarioInicial: string;

  @Column()
  horarioFinal: string;

  @Column({ length: 50 })
  local: string;

  @ManyToOne(() => Relatorio, (relatorio) => relatorio.veiculo, {
    eager: false,
  })
  @JoinColumn({ name: 'operacao_id' })
  operacao: Operacao[];

  @ManyToOne(() => Relatorio, (relatorio) => relatorio.veiculo, {
    eager: false,
  })
  @JoinColumn({ name: 'fiscal_id' })
  fiscal: Fiscal;

  @ManyToOne(() => Relatorio, (relatorio) => relatorio.veiculo, {
    eager: false,
  })
  @JoinColumn({ name: 'aspecto_positivo_id' })
  apectosPositivos: AspectoPositivo[];

  @ManyToOne(() => Relatorio, (relatorio) => relatorio.veiculo, {
    eager: false,
  })
  @JoinColumn({ name: 'aspecto_positivo_id' })
  melhoriaIdentificadas: MelhoriaIdentificada[];
}
