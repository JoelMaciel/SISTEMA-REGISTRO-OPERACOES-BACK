import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppError } from 'src/shared/errors/AppError';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { Droga } from 'src/modules/ocorrencia/domain/entities/droga';

@Injectable()
export class DeleteDrogaFromOcorrenciaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,

    private readonly dataSource: DataSource,
  ) {}

  async execute(ocorrenciaId: string, drogaId: string): Promise<void> {
    const result = await this.ocorrenciaRepository.findOcorrenciaWithDroga(
      ocorrenciaId,
      drogaId,
    );

    if (!result) {
      throw new AppError(
        'Ocorrência ou droga não encontrada ou não vinculada',
        404,
      );
    }

    const { droga } = result;

    await this.dataSource.manager.remove(Droga, droga);

    return;
  }
}
