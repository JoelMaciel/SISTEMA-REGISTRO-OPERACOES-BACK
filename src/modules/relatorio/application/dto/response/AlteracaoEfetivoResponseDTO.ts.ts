import { StatusAlteracao } from 'src/modules/relatorio/domain/enums/statusAlteracao';
import { AlteracaoEfetivo } from '../../../domain/entities/alteracaoEfetivo';

export class AlteracaoEfetivoResponseDTO {
  id: string;
  status: StatusAlteracao;
  descricao: string;

  constructor(entity: AlteracaoEfetivo) {
    this.id = entity.id;
    this.status = entity.status;
    this.descricao = entity.descricao;
  }
}
