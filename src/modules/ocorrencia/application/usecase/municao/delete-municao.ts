import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppError } from 'src/shared/errors/AppError';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { Municao } from 'src/modules/ocorrencia/domain/entities/municao';

@Injectable()
export class DeleteMunicaoFromOcorrenciaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,

    private readonly dataSource: DataSource,
  ) {}

  async execute(ocorrenciaId: string, municaoId: string): Promise<void> {
    const result = await this.ocorrenciaRepository.findOcorrenciaWithMunicao(
      ocorrenciaId,
      municaoId,
    );

    if (!result) {
      throw new AppError(
        'Ocorrência ou munição não encontrada ou não vinculada',
        404,
      );
    }

    const { municao } = result;

    await this.dataSource.manager.remove(Municao, municao);

    return;
  }
}
