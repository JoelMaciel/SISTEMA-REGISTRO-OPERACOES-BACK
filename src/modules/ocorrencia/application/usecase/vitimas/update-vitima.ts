import { Inject, Injectable } from '@nestjs/common';
import { VitimaRequestDTO } from '../../dto/schema/CreateOcorrenciaSchema';
import { VitimaResponseDTO } from '../../dto/response/VitimaResponseDTO';
import { AppError } from 'src/shared/errors/AppError';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';

@Injectable()
export class UpdateVitimaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(
    ocorrenciaId: string,
    vitimaId: string,
    data: VitimaRequestDTO,
  ): Promise<VitimaResponseDTO> {
    const result = await this.ocorrenciaRepository.findOcorrenciaWithVitima(
      ocorrenciaId,
      vitimaId,
    );

    if (!result) {
      throw new AppError(
        `Vítima ${vitimaId} não pertence à ocorrência ${ocorrenciaId} ou não foi encontrada.`,
        404,
      );
    }

    const { vitima } = result;

    vitima.nome = data.nome;
    vitima.cpf = data.cpf;
    vitima.idade = data.idade;
    vitima.dataNascimento = data.dataNascimento;
    vitima.nomePai = data.nomePai;
    vitima.nomeMae = data.nomeMae;
    vitima.naturalidade = data.naturalidade;
    vitima.nacionalidade = data.nacionalidade;

    if (data.endereco) {
      if (!vitima.endereco) {
        throw new AppError(
          'Endereço da vítima não encontrado para atualização. Contate o suporte.',
          400,
        );
      }

      const enderecoExistente = vitima.endereco;

      if (data.endereco.rua !== undefined)
        enderecoExistente.rua = data.endereco.rua;
      if (data.endereco.numero !== undefined)
        enderecoExistente.numero = data.endereco.numero || null;
      if (data.endereco.bairro !== undefined)
        enderecoExistente.bairro = data.endereco.bairro;
      if (data.endereco.cidade !== undefined)
        enderecoExistente.cidade = data.endereco.cidade;
      if (data.endereco.cep !== undefined)
        enderecoExistente.cep = data.endereco.cep;
      if (data.endereco.uf !== undefined)
        enderecoExistente.uf = data.endereco.uf;
      if (data.endereco.complemento !== undefined)
        enderecoExistente.complemento = data.endereco.complemento || null;

      await this.ocorrenciaRepository.saveEndereco(enderecoExistente);
    }

    const vitimaAtualizada = await this.ocorrenciaRepository.saveVitima(vitima);

    return new VitimaResponseDTO(vitimaAtualizada);
  }
}
