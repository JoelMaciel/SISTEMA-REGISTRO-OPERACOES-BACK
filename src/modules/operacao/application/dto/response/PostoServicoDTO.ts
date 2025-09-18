import { PostoServico } from 'src/modules/operacao/domain/entities/posto-area';

export class PostoServicoDTO {
  id: string;
  nome: string;
  local: string;
  quantidade: number;

  constructor(entity: PostoServico) {
    this.id = entity.id;
    this.nome = entity.nome;
    this.local = entity.local;
    this.quantidade = entity.quantidade;
  }
}
