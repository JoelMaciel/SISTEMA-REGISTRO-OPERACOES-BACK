import { Arma } from 'src/modules/ocorrencia/domain/entities/arma';

export class ArmaResponseDTO {
  id: string;
  tipo: string;
  calibre: string;
  capacidade: number;
  numeracao: string;

  constructor(entity: Arma) {
    this.id = entity.id;
    this.tipo = entity.tipo;
    this.calibre = entity.calibre;
    this.capacidade = entity.capacidade;
    this.numeracao = entity.numeracao;
  }
}
