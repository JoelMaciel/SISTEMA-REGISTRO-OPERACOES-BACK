import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostoComandante } from '../enums/posto-comandante.enum';
import { AtividadeRealizada } from '../enums/atividade-realizada.enum';
import { LocalAtividade } from '../enums/local-atividade.enum';
import { AreaAtuacao } from '../enums/area-atuacao.enum';
import { TipoServico } from '../enums/tipo-servico.enum';
import { EquipePostoArea } from 'src/modules/operacao/domain/entities/equipe-posto-area.entity';

@Entity('equipe')
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

  @Column({ type: 'enum', enum: AtividadeRealizada })
  atividadeRealizada: AtividadeRealizada;

  @Column({ type: 'enum', enum: LocalAtividade })
  localAtividade: LocalAtividade;

  @Column({ type: 'enum', enum: AreaAtuacao })
  areaAtuacao: AreaAtuacao;

  @Column({ type: 'enum', enum: TipoServico })
  tipoServico: TipoServico;

  @Column({ length: 30 })
  numeroHt: string;

  @OneToMany(() => EquipePostoArea, (p) => p.equipe, { cascade: true })
  equipePostoArea: EquipePostoArea;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;
}
