import { AspectoPositivo } from '../../../domain/entities/aspectosPositivos';

export class AspectoPositivoResponseDTO {
  id: string;
  descricao: string;

  constructor(entity: AspectoPositivo) {
    this.id = entity.id;
    this.descricao = entity.descricao;
  }
}
