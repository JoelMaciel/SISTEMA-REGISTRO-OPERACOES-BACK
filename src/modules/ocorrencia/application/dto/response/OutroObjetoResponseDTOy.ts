import { OutroObjeto } from 'src/modules/ocorrencia/domain/entities/outroObjeto';

export class OutroObjetoResponseDTO {
  id: string;
  descricao: string;

  constructor(entity: OutroObjeto) {
    this.id = entity.id;
    this.descricao = entity.descricao;
  }
}
