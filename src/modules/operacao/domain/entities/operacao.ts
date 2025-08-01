import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostoServico } from './posto-servico';
import { AreaAtuacao } from './area-atuacao';

@Entity('operacao')
export class Operacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 70, nullable: false })
  nome: string;

  @Column({ name: 'opm_demandante', length: 30, nullable: false })
  opmDemandante: string;

  @Column({ name: 'data_inicial', type: 'date', nullable: false })
  dataInicial: Date;

  @Column({ name: 'data_final', type: 'date', nullable: false })
  dataFinal: Date;

  @Column({ name: 'efetivo_policial', type: 'int', nullable: false })
  efetivoPolicial: number;

  @Column({ name: 'quantidade_posto_area', type: 'int', nullable: false })
  quantidadePostoArea: number;

  @Column({ name: 'observacoes', type: 'text', nullable: false })
  observacoes: string;

  @ManyToMany(() => PostoServico, { cascade: true })
  @JoinTable({
    name: 'operacao_posto_servico',
    joinColumn: { name: 'operacao_id' },
    inverseJoinColumn: { name: 'posto_servico_id' },
  })
  postoServico: PostoServico[];

  @ManyToMany(() => AreaAtuacao, { cascade: true })
  @JoinTable({
    name: 'operacao_area_atuacao',
    joinColumn: { name: 'operacao_id' },
    inverseJoinColumn: { name: 'area_atuacao_id' },
  })
  areaAtuacao: AreaAtuacao[];

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;
}
