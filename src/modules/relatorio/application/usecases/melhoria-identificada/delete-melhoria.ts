import { Inject, Injectable } from '@nestjs/common';
import { IRelatorioRepository } from 'src/modules/relatorio/infra/repository/interfaces/IRetalorioRepository';
import { AppError } from 'src/shared/errors/AppError';

@Injectable()
export class DeleteMelhoriaIdentificadaUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
  ) {}

  async execute(relatorioId: string, melhoriaId: string): Promise<void> {
    const melhoria = await this.relatorioRepository.findMelhoriaById(
      melhoriaId,
      relatorioId,
    );
    if (!melhoria)
      throw new AppError(
        'Melhoria identificada não encontrada para este relatório.',
        404,
      );

    await this.relatorioRepository.deleteMelhoria(melhoriaId);
  }
}
