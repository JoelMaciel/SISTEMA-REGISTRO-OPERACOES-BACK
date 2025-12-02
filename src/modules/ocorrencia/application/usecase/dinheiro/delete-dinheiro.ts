import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppError } from 'src/shared/errors/AppError';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { Dinheiro } from 'src/modules/ocorrencia/domain/entities/dinheiro';

@Injectable()
export class DeleteDinheiroOcorrenciaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,

    private readonly dataSource: DataSource,
  ) {}

  async execute(ocorrenciaId: string, dinheiroId: string): Promise<void> {
    const result = await this.ocorrenciaRepository.findOcorrenciaWithDinheiro(
      ocorrenciaId,
      dinheiroId,
    );

    if (!result) {
      throw new AppError(
        'Ocorrência ou dinheiro não encontrada ou não vinculada',
        404,
      );
    }

    const { dinheiro } = result;

    await this.dataSource.manager.remove(Dinheiro, dinheiro);

    return;
  }
}
