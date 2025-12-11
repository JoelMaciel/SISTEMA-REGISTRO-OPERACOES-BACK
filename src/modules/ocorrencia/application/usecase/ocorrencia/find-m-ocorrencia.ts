import { Inject, Injectable } from '@nestjs/common';
import { OcorrenciaResponseDTO } from '../../dto/response/OcorrenciaResponseDTO';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { AppError } from 'src/shared/errors/AppError';
@Injectable()
export class FindOcorrenciaByMUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(m: string): Promise<OcorrenciaResponseDTO> {
    if (!m || !m.trim()) {
      throw new AppError('M da ocorrência inválido');
    }

    const ocorrencia = await this.ocorrenciaRepository.findByMOcorrencia(m);
    if (!ocorrencia) {
      throw new AppError(`Ocorrência não encontrada para M=${m}`, 404);
    }

    return new OcorrenciaResponseDTO(ocorrencia);
  }
}
