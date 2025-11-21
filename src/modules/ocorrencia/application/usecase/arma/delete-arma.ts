import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppError } from 'src/shared/errors/AppError';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { Arma } from 'src/modules/ocorrencia/domain/entities/arma';

@Injectable()
export class DeleteArmaFromOcorrenciaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,

    private readonly dataSource: DataSource,
  ) {}

  async execute(ocorrenciaId: string, armaId: string): Promise<void> {
    const result = await this.ocorrenciaRepository.findOcorrenciaWithArma(
      ocorrenciaId,
      armaId,
    );

    if (!result) {
      throw new AppError(
        'Ocorrência ou arma não encontrada ou não vinculada',
        404,
      );
    }

    const { arma } = result;

    await this.dataSource.manager.remove(Arma, arma);

    return;
  }
}
