import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Operacao } from './operacao';

@Entity('posto_servico')
export class PostoServico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: '120', nullable: false })
  nome: string;

  @Column({ name: 'local', length: '120', nullable: false })
  local: string;

  @Column({ name: 'quantidade', type: 'int' })
  quantidade: number;

  @ManyToMany(() => Operacao, (operacao) => operacao.postoServico)
  operacoes: Operacao[];
}
