import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Operacao } from './operacao';
import { Exclude } from 'class-transformer';

@Entity('postos_areas')
export class PostoArea {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  nome: string;

  @Column({ length: 120 })
  local: string;

  @Column({ length: 30, nullable: true })
  numero?: string;

  @Column({ length: 120, nullable: true })
  bairro?: string;

  @Column({ length: 120 })
  cidade: string;

  @Column({ type: 'int' })
  quantidade: number;

  @ManyToOne(() => Operacao, (operacao) => operacao.postoAreas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'operacao_id' })
  operacao: Operacao;
}
