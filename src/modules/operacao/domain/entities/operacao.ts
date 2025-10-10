import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostoArea } from './posto-area';

@Entity('operacoes')
export class Operacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ name: 'opm_demandante' })
  opmDemandante: string;

  @Column({ name: 'data_inicial', type: 'date' })
  dataInicial: Date;

  @Column({ name: 'data_final', type: 'date' })
  dataFinal: Date;

  @Column({ name: 'efetivo_policial', type: 'int' })
  efetivoPolicial: number;

  @Column({ name: 'quantidade_posto_area', type: 'int' })
  quantidadePostoArea: number;

  @Column({ name: 'observacoes', type: 'text', nullable: true })
  observacoes?: string;

  @OneToMany(() => PostoArea, (postoArea) => postoArea.operacao, {
    cascade: ['insert', 'update'],
    eager: false,
  })
  postoAreas: PostoArea[];

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamp' })
  updatedAt: Date;
}
