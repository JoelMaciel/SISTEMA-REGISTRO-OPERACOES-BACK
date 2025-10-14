import { Operacao } from 'src/modules/operacao/domain/entities/operacao';

export class OperacaoResponseDTO {
  id: string;
  nome: string;
  opmDemandante: string;
  dataInicial: Date;
  dataFinal: Date;
  efetivoPolicial: number;
  quantidadePostoArea: number;
  observacoes: string;
  postoAreas: {
    id: string;
    nome: string;
    local: string;
    number?: string;
    bairro?: string;
    cidade: string;
    quantidade: number;
  }[];

  constructor(operacao: Operacao) {
    this.id = operacao.id;
    this.nome = operacao.nome;
    this.opmDemandante = operacao.opmDemandante;
    this.dataInicial = operacao.dataInicial;
    this.dataFinal = operacao.dataFinal;
    this.efetivoPolicial = operacao.efetivoPolicial;
    this.quantidadePostoArea = operacao.quantidadePostoArea;
    this.observacoes = operacao.observacoes || '';

    this.postoAreas = operacao.postoAreas
      ? operacao.postoAreas.map((posto) => ({
          id: posto.id,
          nome: posto.nome,
          local: posto.local,
          number: posto.numero,
          bairro: posto.bairro,
          cidade: posto.cidade,
          quantidade: posto.quantidade,
        }))
      : [];
  }
}
