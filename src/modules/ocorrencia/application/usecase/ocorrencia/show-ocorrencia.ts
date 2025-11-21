import { Injectable, Inject } from '@nestjs/common';
import { Ocorrencia } from 'src/modules/ocorrencia/domain/entities/ocorrencia';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { AppError } from 'src/shared/errors/AppError';
import { OcorrenciaResponseDTO } from '../../dto/response/OcorrenciaResponseDTO';

@Injectable()
export class ShowOcorrenciaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(id: string): Promise<OcorrenciaResponseDTO> {
    const ocorrencia = await this.ocorrenciaRepository.findById(id);
    if (!ocorrencia) {
      throw new AppError(`Ocorrência com ID ${id} não encontrada.`, 404);
    }
    return new OcorrenciaResponseDTO(ocorrencia);
  }
}
