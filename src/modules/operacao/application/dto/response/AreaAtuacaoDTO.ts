import { AreaAtuacao } from 'src/modules/operacao/domain/entities/area-atuacao';

export class AreaAtuacaoDTO {
  id: string;
  nome: string;
  local: string;
  quantidade: number;

  constructor(entity: AreaAtuacao) {
    this.id = entity.id;
    this.nome = entity.nome;
    this.local = entity.local;
    this.quantidade = entity.quantidade;
  }
}
