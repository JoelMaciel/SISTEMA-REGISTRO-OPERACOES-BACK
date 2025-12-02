import { Inject, Injectable } from '@nestjs/common';
import { AcusadoRequestDTO } from '../../dto/schema/CreateOcorrenciaSchema';
import { AppError } from 'src/shared/errors/AppError';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { AcusadoResponseDTO } from '../../dto/response/AcusadoResponseDTO';

@Injectable()
export class UpdateAcusadoUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(
    ocorrenciaId: string,
    acusadoId: string,
    data: AcusadoRequestDTO,
  ): Promise<AcusadoResponseDTO> {
    const result = await this.ocorrenciaRepository.findOcorrenciaWithAcusado(
      ocorrenciaId,
      acusadoId,
    );

    if (!result) {
      throw new AppError(
        `Acusado ${acusadoId} não pertence à ocorrência ${ocorrenciaId} ou não foi encontrado.`,
        404,
      );
    }

    const { acusado } = result;

    acusado.nome = data.nome;
    acusado.cpf = data.cpf;
    acusado.idade = data.idade;
    acusado.dataNascimento = data.dataNascimento;
    acusado.nomePai = data.nomePai;
    acusado.nomeMae = data.nomeMae;
    acusado.naturalidade = data.naturalidade;
    acusado.nacionalidade = data.nacionalidade;

    if (data.endereco) {
      if (!acusado.endereco) {
        throw new AppError(
          'Endereço do acusado não encontrado para atualização. Contate o suporte.',
          400,
        );
      }

      const enderecoExistente = acusado.endereco;

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

    const acusadoAtualizado = await this.ocorrenciaRepository.saveAcusado(
      acusado,
    );

    return new AcusadoResponseDTO(acusadoAtualizado);
  }
}
