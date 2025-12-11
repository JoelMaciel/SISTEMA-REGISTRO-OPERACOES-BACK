import { Inject, Injectable } from '@nestjs/common';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { AppError } from 'src/shared/errors/AppError';

@Injectable()
export class DeleteOcorrenciaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const ocorrencia = await this.ocorrenciaRepository.findById(id);

    if (!ocorrencia) {
      throw new AppError(`Ocorrencia com ID ${id} não encontrada`, 404);
    }

    await this.ocorrenciaRepository.delete(id);
  }
}
