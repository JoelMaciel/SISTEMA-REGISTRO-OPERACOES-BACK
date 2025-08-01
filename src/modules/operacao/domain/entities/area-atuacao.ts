import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Operacao } from './operacao';

@Entity('area_atuacao')
export class AreaAtuacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: '120', nullable: false })
  nome: string;

  @Column({ name: 'local', length: '120', nullable: false })
  local: string;

  @Column({ name: 'quantidade', type: 'int' })
  quantidade: number;

  @ManyToMany(() => Operacao, (operacao) => operacao.areaAtuacao)
  operacoes: Operacao[];
}
