import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Operacao } from './operacao';
import { Equipe } from 'src/modules/equipe/domain/entities/equipe';

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

  @OneToMany(() => Equipe, (equipe) => equipe.postoArea, { cascade: true })
  equipes: Equipe[];

  @ManyToOne(() => Operacao, (operacao) => operacao.postoAreas, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'operacao_id' })
  operacao: Operacao;
}
