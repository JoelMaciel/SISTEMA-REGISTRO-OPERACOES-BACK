import { Veiculo } from 'src/modules/ocorrencia/domain/entities/veiculo';

export class VeiculoResponseDTO {
  id: string;
  marca: string;
  tipo: string;
  placa: string;
  mnodelo: number;
  cor: string;
  situacao: string;

  constructor(entity: Veiculo) {
    this.id = entity.id;
    this.tipo = entity.tipo;
    this.marca = entity.marca;
    this.placa = entity.placa;
    this.marca = entity.modelo;
    this.cor = entity.cor;
    this.situacao = entity.situacao;
  }
}
