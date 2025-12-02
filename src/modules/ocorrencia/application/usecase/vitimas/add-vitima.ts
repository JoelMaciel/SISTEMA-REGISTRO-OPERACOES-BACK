import { Inject, Injectable } from '@nestjs/common';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { VitimaRequestDTO } from '../../dto/schema/CreateOcorrenciaSchema';
import { AppError } from 'src/shared/errors/AppError';
import { VitimaResponseDTO } from '../../dto/response/VitimaResponseDTO';
import { Vitima } from 'src/modules/ocorrencia/domain/entities/vitima';
import { Endereco } from 'src/modules/ocorrencia/domain/entities/Endereco';

@Injectable()
export class AddVitimaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(
    ocorrenciaId: string,
    dto: VitimaRequestDTO,
  ): Promise<VitimaResponseDTO> {
    const ocorrencia = await this.ocorrenciaRepository.findById(ocorrenciaId);

    if (!ocorrencia) {
      throw new AppError(`Ocorrência ${ocorrenciaId} não encontrada.`, 404);
    }

    const novoEndereco = new Endereco();
    novoEndereco.rua = dto.endereco.rua;
    novoEndereco.numero = dto.endereco.numero || null;
    novoEndereco.bairro = dto.endereco.bairro;
    novoEndereco.cidade = dto.endereco.cidade;
    novoEndereco.cep = dto.endereco.cep;
    novoEndereco.uf = dto.endereco.uf;
    novoEndereco.complemento = dto.endereco.complemento || null;

    const enderecoSalvo = await this.ocorrenciaRepository.saveEndereco(
      novoEndereco,
    );

    const novaVitima = new Vitima();

    novaVitima.nome = dto.nome;
    novaVitima.cpf = dto.cpf;
    novaVitima.idade = dto.idade;
    novaVitima.dataNascimento = dto.dataNascimento;
    novaVitima.nomePai = dto.nomePai;
    novaVitima.nomeMae = dto.nomeMae;
    novaVitima.naturalidade = dto.naturalidade;
    novaVitima.nacionalidade = dto.nacionalidade;

    novaVitima.endereco = enderecoSalvo;

    novaVitima.ocorrencia = ocorrencia;

    const vitimaSalva = await this.ocorrenciaRepository.saveVitima(novaVitima);

    return new VitimaResponseDTO(vitimaSalva);
  }
}
