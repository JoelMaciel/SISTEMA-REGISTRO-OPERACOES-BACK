import { EquipeOperacao } from 'src/modules/equipe-operacao/domain/entities/equipe-operacao';
import { AreaAtuacao } from 'src/modules/equipe-operacao/domain/enums/area-atuacao.enum';
import { AtividadeRealizada } from 'src/modules/equipe-operacao/domain/enums/atividade-realizada.enum';
import { LocalAtividade } from 'src/modules/equipe-operacao/domain/enums/local-atividade.enum';
import { PostoComandante } from 'src/modules/equipe-operacao/domain/enums/posto-comandante.enum';
import { TipoServico } from 'src/modules/equipe-operacao/domain/enums/tipo-servico.enum';

export class EquipeResponseDTO {
  id: string;
  jaRespondeu: boolean;
  email: string;
  contatoEquipe: string;
  dataOperacao: string;
  horarioInicial: string;
  horarioFinal: string;
  nomeOperacao: string;
  postoComandante: PostoComandante;
  nomeGuerraComandante: string;
  matriculaComandante: string;
  opmGuarnicao: string;
  prefixoVtr: string;
  efetivoPolicial: number;
  atividadeRealizada: AtividadeRealizada;
  localAtividade: LocalAtividade;
  areaAtuacao: AreaAtuacao;
  tipoServico: TipoServico;
  numeroHt: string;

  constructor(entity: EquipeOperacao) {
    this.id = entity.id;
    this.jaRespondeu = entity.jaRespondeu;
    this.email = entity.email;
    this.contatoEquipe = entity.contatoEquipe;
    this.dataOperacao = entity.dataOperacao.toISOString().split('T')[0];
    this.horarioInicial = entity.horarioInicial;
    this.horarioFinal = entity.horarioFinal;
    this.nomeOperacao = entity.nomeOperacao;
    this.postoComandante = entity.postoComandante;
    this.nomeGuerraComandante = entity.nomeGuerraComandante;
    this.matriculaComandante = entity.matriculaComandante;
    this.opmGuarnicao = entity.opmGuarnicao;
    this.prefixoVtr = entity.prefixoVtr;
    this.efetivoPolicial = entity.efetivoPolicial;
    this.localAtividade = entity.localAtividade as LocalAtividade;
    this.areaAtuacao = entity.areaAtuacao;
    this.tipoServico = entity.tipo_servico;
    this.numeroHt = entity.numeroHt;
  }
}
