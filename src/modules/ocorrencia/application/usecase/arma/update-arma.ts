import { Inject, Injectable } from '@nestjs/common';
import { ArmaRequestDTO } from '../../dto/schema/UpdateOcorrenciaSchema';
import { AppError } from 'src/shared/errors/AppError';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { ArmaResponseDTO } from '../../dto/response/ArmaResponseDTO';

@Injectable()
export class UpdateArmaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(
    ocorrenciaId: string,
    armaId: string,
    data: ArmaRequestDTO,
  ): Promise<ArmaResponseDTO> {
    const result = await this.ocorrenciaRepository.findOcorrenciaWithArma(
      ocorrenciaId,
      armaId,
    );

    if (!result) {
      throw new AppError(
        `Arma ${armaId} não pertence à ocorrência ${ocorrenciaId}`,
      );
    }

    const { ocorrencia, arma } = result;

    if (data.tipo !== undefined) arma.tipo = data.tipo;
    if (data.calibre !== undefined) arma.calibre = data.calibre;
    if (data.capacidade !== undefined) arma.capacidade = data.capacidade;
    if (data.numeracao !== undefined) arma.numeracao = data.numeracao;

    await this.ocorrenciaRepository.save(ocorrencia);

    return new ArmaResponseDTO(arma);
  }
}
