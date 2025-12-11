import { Droga } from 'src/modules/ocorrencia/domain/entities/droga';

export class DrogaResponseDTO {
  id: string;
  tipo: string;
  quantidade: string;
  unidadeMedida: string;

  constructor(entity: Droga) {
    this.id = entity.id;
    this.tipo = entity.tipo;
    this.quantidade = entity.quantidade;
    this.unidadeMedida = entity.unidadeMedida;
  }
}
