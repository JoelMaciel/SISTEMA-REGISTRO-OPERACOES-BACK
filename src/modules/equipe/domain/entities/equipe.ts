import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostoComandante } from '../enums/posto-comandante.enum';
import { TipoServico } from '../enums/tipo-servico.enum';
import { PostoArea } from 'src/modules/operacao/domain/entities/posto-area';

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

  @Column({ name: 'posto_comandante', type: 'enum', enum: PostoComandante })
  postoComandante: PostoComandante;

  @Column({ name: 'nome_guerra_comandante', length: 60 })
  nomeGuerraComandante: string;

  @Column({ name: 'matricula_comandante', length: 12 })
  matriculaComandante: string;

  @Column({ name: 'opm_guarnicao', length: 30 })
  opmGuarnicao: string;

  @Column({ name: 'prefixo_vtr', length: 20 })
  prefixoVtr: string;

  @Column({ name: 'efetivo_policial', type: 'int' })
  efetivoPolicial: number;

  @Column({ length: 200, nullable: false })
  logradouro: string;

  @Column({ name: 'tipo_servico', type: 'enum', enum: TipoServico })
  tipoServico: TipoServico;

  @Column({ name: 'numero_ht', length: 30 })
  numeroHt: string;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamp' })
  atualizadoEm: Date;

  @Column({ name: 'posto_area_id' })
  postoAreaId: string;

  @ManyToOne(() => PostoArea, (postoArea) => postoArea.equipes, {
    eager: false,
  })
  @JoinColumn({ name: 'posto_area_id' })
  postoArea: PostoArea;
}
