import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppError } from 'src/shared/errors/AppError';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { Vitima } from 'src/modules/ocorrencia/domain/entities/vitima';

@Injectable()
export class DeleteVitimaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,

    private readonly dataSource: DataSource,
  ) {}

  async execute(ocorrenciaId: string, vitimaId: string): Promise<void> {
    const result = await this.ocorrenciaRepository.findOcorrenciaWithVitima(
      ocorrenciaId,
      vitimaId,
    );

    if (!result) {
      throw new AppError(
        'Ocorrência ou vítima não encontrada ou não vinculada',
        404,
      );
    }

    const { vitima } = result;

    await this.dataSource.manager.remove(Vitima, vitima);

    return;
  }
}
