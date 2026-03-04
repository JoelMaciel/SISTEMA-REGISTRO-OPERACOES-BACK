import { MelhoriaIdentificada } from '../../../domain/entities/melhoriaIndentificada';

export class MelhoriaIdentificadaResponseDTO {
  id: string;
  descricao: string;

  constructor(entity: MelhoriaIdentificada) {
    this.id = entity.id;
    this.descricao = entity.descricao;
  }
}
