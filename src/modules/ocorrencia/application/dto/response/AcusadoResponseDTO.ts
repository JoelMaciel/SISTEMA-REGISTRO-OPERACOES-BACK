import { Acusado } from 'src/modules/ocorrencia/domain/entities/acusado';

export class AcusadoResponseDTO {
  id: string;
  nome: string;
  cpf: string;
  idade: number;
  dataNascimento: Date;
  nomeMae?: string;
  nomePai?: string;
  naturalidade: string;
  nacionalidade: string;
  endereco: {
    id?: string;
    rua: string;
    numero?: string;
    bairro: string;
    cidade: string;
    cep: string;
    uf: string;
    complemento?: string;
  } | null;

  constructor(entity: Acusado) {
    this.id = entity.id;
    this.nome = entity.nome;
    this.cpf = entity.cpf;
    this.idade = entity.idade;

    this.dataNascimento = entity.dataNascimento
      ? new Date(entity.dataNascimento)
      : null;

    this.nomeMae = entity.nomeMae;
    this.nomePai = entity.nomePai;
    this.naturalidade = entity.naturalidade;
    this.nacionalidade = entity.nacionalidade;

    this.endereco = entity.endereco
      ? {
          id: (entity.endereco as any).id,
          rua: entity.endereco.rua,
          numero: entity.endereco.numero,
          bairro: entity.endereco.bairro,
          cidade: entity.endereco.cidade,
          cep: entity.endereco.cep,
          uf: entity.endereco.uf,
          complemento: entity.endereco.complemento,
        }
      : null;
  }
}
