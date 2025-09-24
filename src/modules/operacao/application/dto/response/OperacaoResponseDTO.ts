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
    cidade: string;
    quantidade: number;
  }[];
}
