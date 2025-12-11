import { Dinheiro } from 'src/modules/ocorrencia/domain/entities/dinheiro';

export class DinheiroResponseDTO {
  id: string;
  valor: string;

  constructor(entity: Dinheiro) {
    this.id = entity.id;
    this.valor = entity.valor;
  }
}
