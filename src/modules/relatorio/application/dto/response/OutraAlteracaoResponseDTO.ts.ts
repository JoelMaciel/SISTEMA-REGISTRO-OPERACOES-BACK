import { OutraAlteracao } from '../../../domain/entities/outraAlteracao';

export class OutraAlteracaoResponseDTO {
  id: string;
  descricao: string;

  constructor(entity: OutraAlteracao) {
    this.id = entity.id;
    this.descricao = entity.descricao;
  }
}
