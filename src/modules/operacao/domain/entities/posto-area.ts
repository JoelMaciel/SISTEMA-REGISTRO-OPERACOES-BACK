import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Operacao } from './operacao';

@Entity('posto_area')
export class PostoArea {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  nome: string;

  @Column({ length: 120 })
  local: string;

  @Column({ length: 30, nullable: true })
  numero?: string;

  @Column({ length: 120 })
  bairro: string;

  @Column({ length: 120 })
  cidade: string;

  @Column({ type: 'int' })
  quantidade: number;

  @ManyToOne(() => Operacao, (operacao) => operacao.postoAreas, {
    onDelete: 'CASCADE',
  })
  operacao: Operacao;
}
