import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PostoComandante } from '../enums/posto-comandante.enum';
import { AtividadeRealizada } from '../enums/atividade-realizada.enum';
import { LocalAtividade } from '../enums/local-atividade.enum';
import { AreaAtuacao } from '../enums/area-atuacao.enum';
import { TipoServico } from '../enums/tipo-servico.enum';

@Entity('equipe_operacao')
export class EquipeOperacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'ja_respondeu', nullable: false })
  jaRespondeu: boolean;

  @Column({ name: 'email', length: 60, nullable: false })
  email: string;

  @Column({ name: 'contato_equipe', length: 12, nullable: false })
  contatoEquipe: string;

  @Column({ name: 'data_operacao', type: 'date', nullable: false })
  dataOperacao: Date;

  @Column({ name: 'horario_inicial', nullable: false })
  horarioInicial: string;

  @Column({ name: 'horario_final', nullable: false })
  horarioFinal: string;

  @Column({ name: 'nome_operacao', nullable: false })
  nomeOperacao: string;

  @Column({
    name: 'posto_comandante',
    type: 'enum',
    enum: PostoComandante,
    nullable: false,
  })
  postoComandante: PostoComandante;

  @Column({ name: 'nome_guerra_comandante', length: 60, nullable: false })
  nomeGuerraComandante: string;

  @Column({ name: 'matricula_comandante', length: 12, nullable: false })
  matriculaComandante: string;

  @Column({ name: 'opm_guarnicao', length: 30, nullable: false })
  opmGuarnicao: string;

  @Column({ name: 'prefixo_vtr', length: 10, nullable: false })
  prefixoVtr: string;

  @Column({ name: 'efetivo_policial', type: 'int', nullable: false })
  efetivoPolicial: number;

  @Column({
    name: 'atividade_realizada',
    type: 'enum',
    enum: AtividadeRealizada,
    nullable: false,
  })
  atividadeRealizada: string;

  @Column({
    name: 'local_atividade',
    type: 'enum',
    enum: LocalAtividade,
    nullable: false,
  })
  localAtividade: LocalAtividade;

  @Column({
    name: 'area_atuacao',
    type: 'enum',
    enum: AreaAtuacao,
    nullable: false,
  })
  areaAtuacao: AreaAtuacao;

  @Column({
    name: 'tipo_servico',
    type: 'enum',
    enum: TipoServico,
    nullable: false,
  })
  tipo_servico: TipoServico;

  @Column({ name: 'numero_ht', length: 30, nullable: false })
  numeroHt: string;
}
