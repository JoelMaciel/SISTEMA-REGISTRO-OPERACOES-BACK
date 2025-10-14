import { PostoArea } from 'src/modules/operacao/domain/entities/posto-area';

export class PostoAreaResponseDTO {
  id: string;
  nome: string;
  local: string;
  numero?: string;
  bairro?: string;
  cidade: string;
  quantidade: number;

  constructor(posto: PostoArea) {
    this.id = posto.id;
    this.nome = posto.nome;
    this.local = posto.local;
    this.numero = posto.numero;
    this.bairro = posto.bairro;
    this.cidade = posto.cidade;
    this.quantidade = posto.quantidade;
  }
}
