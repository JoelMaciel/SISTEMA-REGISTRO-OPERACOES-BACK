import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostoComandante } from '../enums/posto-comandante.enum';
import { TipoServico } from '../enums/tipo-servico.enum';

@Entity('equipes')
export class Equipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60 })
  email: string;

  @Column({ name: 'contato_equipe', length: 12 })
  contatoEquipe: string;

  @Column({ name: 'data_operacao', type: 'date' })
  dataOperacao: Date;

  @Column({ name: 'horario_inicial' })
  horarioInicial: string;

  @Column({ name: 'horario_final' })
  horarioFinal: string;

  @Column({ name: 'nome_operacao' })
  nomeOperacao: string;

  @Column({ type: 'enum', enum: PostoComandante })
  postoComandante: PostoComandante;

  @Column({ length: 60 })
  nomeGuerraComandante: string;

  @Column({ length: 12 })
  matriculaComandante: string;

  @Column({ length: 30 })
  opmGuarnicao: string;

  @Column({ length: 20 })
  prefixoVtr: string;

  @Column({ type: 'int' })
  efetivoPolicial: number;

  @Column({ length: 200, nullable: false })
  logradouro: string;

  @Column({ type: 'enum', enum: TipoServico })
  tipoServico: TipoServico;

  @Column({ length: 30 })
  numeroHt: string;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamp' })
  atualizadoEm: Date;
}
