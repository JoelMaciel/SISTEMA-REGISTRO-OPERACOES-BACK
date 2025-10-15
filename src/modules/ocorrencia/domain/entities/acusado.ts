import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Endereco } from './Endereco';
import { Ocorrencia } from './ocorrencia';

@Entity('acusados')
export class Acusado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ type: 'int' })
  idade: number;

  @Column({ length: 14 })
  cpf: string;

  @Column({ name: 'data_nascimento', length: 10 })
  dataNascimento: string;

  @Column({ name: 'nome_mae', length: 100 })
  nomeMae: string;

  @Column({ name: 'nome_pai', length: 100 })
  nomePai: string;

  @Column({ length: 50 })
  naturalidade: string;

  @Column({ length: 50 })
  nacionalidade: string;

  @ManyToOne(() => Ocorrencia, (ocorrencia) => ocorrencia.acusados)
  @JoinColumn({ name: 'ocorrencia_id' })
  ocorrencia: Ocorrencia;

  @OneToOne(() => Endereco, { cascade: true, eager: true })
  @JoinColumn({ name: 'endereco_id' })
  endereco: Endereco;
}
