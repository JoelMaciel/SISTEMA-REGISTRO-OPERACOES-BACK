import { Inject, Injectable } from '@nestjs/common';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { DrogaRequestDTO } from '../../dto/schema/CreateOcorrenciaSchema';
import { AppError } from 'src/shared/errors/AppError';
import { Droga } from 'src/modules/ocorrencia/domain/entities/droga';
import { DrogaResponseDTO } from '../../dto/response/DrogaResponseDTO';

@Injectable()
export class AddDrogaToOcorrenciaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(
    ocorrenciaId: string,
    dto: DrogaRequestDTO,
  ): Promise<DrogaResponseDTO> {
    const ocorrencia = await this.ocorrenciaRepository.findById(ocorrenciaId);

    if (!ocorrencia) {
      throw new AppError(`Ocorrência ${ocorrenciaId} não encontrada.`, 404);
    }

    const droga = new Droga();
    droga.tipo = dto.tipo;
    droga.quantidade = dto.quantidade;
    droga.unidadeMedida = dto.unidadeMedida;

    droga.ocorrencia = ocorrencia;

    const drogaSalva = await this.ocorrenciaRepository.saveDroga(droga);

    return new DrogaResponseDTO(drogaSalva);
  }
}
