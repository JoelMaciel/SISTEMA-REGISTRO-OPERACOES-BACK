import { Operacao } from 'src/modules/operacao/domain/entities/operacao';
import { AreaAtuacaoDTO } from './AreaAtuacaoDTO';
import { PostoServicoDTO } from './PostoServicoDTO';
import { formatDate } from 'src/shared/utils/dateUtils';

export class OperacaoResponseDTO {
  id: string;
  nome: string;
  opmDemandante: string;
  dataInicial: string;
  dataFinal: string;
  efetivoPolicial: number;
  quantidadePostoArea: number;
  postoServico: PostoServicoDTO[];
  areaAtuacao: AreaAtuacaoDTO[];
  observacoes: string;

  constructor(entity: Operacao) {
    this.id = entity.id;
    this.nome = entity.nome;
    this.opmDemandante = entity.opmDemandante;
    this.dataInicial = formatDate(entity.dataInicial);
    this.dataFinal = formatDate(entity.dataFinal);
    this.efetivoPolicial = entity.efetivoPolicial;
    this.quantidadePostoArea = entity.quantidadePostoArea;

    this.postoServico = (entity.postoServico || []).map(
      (postoServico) => new PostoServicoDTO(postoServico),
    );
    this.areaAtuacao = (entity.areaAtuacao || []).map(
      (areaAtuacao) => new AreaAtuacaoDTO(areaAtuacao),
    );
    this.observacoes = entity.observacoes;
  }
}
