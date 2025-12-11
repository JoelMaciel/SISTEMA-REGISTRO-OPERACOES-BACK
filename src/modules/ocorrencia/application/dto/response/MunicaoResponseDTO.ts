import { Municao } from 'src/modules/ocorrencia/domain/entities/municao';

export class MunicaoResponseDTO {
  id: string;
  calibre: string;
  quantidade: string;

  constructor(entity: Municao) {
    this.id = entity.id;
    this.calibre = entity.calibre;
    this.quantidade = entity.quantidade;
  }
}
