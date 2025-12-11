import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppError } from 'src/shared/errors/AppError';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { OutroObjeto } from 'src/modules/ocorrencia/domain/entities/outroObjeto';

@Injectable()
export class DeleteOutroObjetoUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,

    private readonly dataSource: DataSource,
  ) {}

  async execute(ocorrenciaId: string, outroObjetoId: string): Promise<void> {
    const result =
      await this.ocorrenciaRepository.findOcorrenciaWithOutroObjeto(
        ocorrenciaId,
        outroObjetoId,
      );

    if (!result) {
      throw new AppError(
        'Ocorrência ou Objeto não encontrado ou não vinculada',
        404,
      );
    }

    const { outroObjeto } = result;

    await this.dataSource.manager.remove(OutroObjeto, outroObjeto);

    return;
  }
}
