import { Equipe } from 'src/modules/equipe/domain/entities/equipe';

export class EquipeResponseDTO {
  id: string;
  email: string;
  contatoEquipe: string;
  dataOperacao: string;
  horarioInicial: string;
  horarioFinal: string;
  nomeOperacao: string;
  postoComandante: string;
  nomeGuerraComandante: string;
  matriculaComandante: string;
  opmGuarnicao: string;
  prefixoVtr: string;
  efetivoPolicial: number;
  logradouro: string;
  tipoServico: string;
  numeroHt: string;

  constructor(entity: Equipe) {
    this.id = entity.id;
    this.email = entity.email;
    this.contatoEquipe = entity.contatoEquipe;
    let dataOperacao: Date | null = null;
    if (entity.dataOperacao) {
      if (entity.dataOperacao instanceof Date) {
        dataOperacao = entity.dataOperacao;
      } else if (typeof entity.dataOperacao === 'string') {
        dataOperacao = new Date(entity.dataOperacao);
        if (isNaN(dataOperacao.getTime())) {
          dataOperacao = null;
        }
      }
    }

    this.dataOperacao = dataOperacao
      ? dataOperacao.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
      : '';

    this.horarioInicial = entity.horarioInicial;
    this.horarioFinal = entity.horarioFinal;
    this.nomeOperacao = entity.nomeOperacao;
    this.postoComandante = entity.postoComandante;
    this.nomeGuerraComandante = entity.nomeGuerraComandante;
    this.matriculaComandante = entity.matriculaComandante;
    this.opmGuarnicao = entity.opmGuarnicao;
    this.prefixoVtr = entity.prefixoVtr;
    this.efetivoPolicial = entity.efetivoPolicial;
    this.logradouro = entity.logradouro;
    this.tipoServico = entity.tipoServico;
    this.numeroHt = entity.numeroHt;
  }
}
