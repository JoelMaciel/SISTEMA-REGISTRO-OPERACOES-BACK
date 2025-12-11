import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppError } from 'src/shared/errors/AppError';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { Acusado } from 'src/modules/ocorrencia/domain/entities/acusado';

@Injectable()
export class DeleteAcusadoUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,

    private readonly dataSource: DataSource,
  ) {}

  async execute(ocorrenciaId: string, acusadoId: string): Promise<void> {
    const result = await this.ocorrenciaRepository.findOcorrenciaWithAcusado(
      ocorrenciaId,
      acusadoId,
    );

    if (!result) {
      throw new AppError(
        'Ocorrência ou acusado não encontrado ou não vinculada',
        404,
      );
    }

    const { acusado } = result;

    await this.dataSource.manager.remove(Acusado, acusado);

    return;
  }
}
