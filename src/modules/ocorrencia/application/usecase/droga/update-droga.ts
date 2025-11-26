import { Inject, Injectable } from '@nestjs/common';
import { AppError } from 'src/shared/errors/AppError';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { DrogaRequestDTO } from '../../dto/schema/CreateOcorrenciaSchema';
import { DrogaResponseDTO } from '../../dto/response/DrogaResponseDTO';

@Injectable()
export class UpdateDrogaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(
    ocorrenciaId: string,
    drogaId: string,
    data: DrogaRequestDTO,
  ): Promise<DrogaResponseDTO> {
    const result = await this.ocorrenciaRepository.findOcorrenciaWithDroga(
      ocorrenciaId,
      drogaId,
    );

    if (!result) {
      throw new AppError(
        `Droga ${drogaId} não pertence à ocorrência ${ocorrenciaId}`,
      );
    }

    const { droga } = result;

    if (data.tipo !== undefined) droga.tipo = data.tipo;
    if (data.quantidade !== undefined) droga.quantidade = data.quantidade;
    if (data.unidadeMedida !== undefined)
      droga.unidadeMedida = data.unidadeMedida;

    await this.ocorrenciaRepository.saveDroga(droga);

    return new DrogaResponseDTO(droga);
  }
}
