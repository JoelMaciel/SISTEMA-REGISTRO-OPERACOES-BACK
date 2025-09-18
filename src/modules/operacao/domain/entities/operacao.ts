import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostoArea } from './posto-area';

@Entity('operacao')
export class Operacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 70 })
  nome: string;

  @Column({ name: 'opm_demandante', length: 30 })
  opmDemandante: string;

  @Column({ name: 'data_inicial', type: 'date' })
  dataInicial: Date;

  @Column({ name: 'data_final', type: 'date' })
  dataFinal: Date;

  @Column({ name: 'efetivo_policial', type: 'int' })
  efetivoPolicial: number;

  @Column({ name: 'quantidade_posto_area', type: 'int' })
  quantidadePostoArea: number;

  @Column({ type: 'text' })
  observacoes: string;

  @OneToMany(() => PostoArea, (postoArea) => postoArea.operacao, {
    cascade: true,
  })
  postoAreas: PostoArea[];

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;
}
