import { Inject, Injectable } from '@nestjs/common';
import { IRelatorioRepository } from 'src/modules/relatorio/infra/repository/interfaces/IRetalorioRepository';
import { AppError } from 'src/shared/errors/AppError';

@Injectable()
export class DeleteAspectoPositivoUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
  ) {}

  async execute(relatorioId: string, aspectoId: string): Promise<void> {
    const aspecto = await this.relatorioRepository.findAspectoById(
      aspectoId,
      relatorioId,
    );
    if (!aspecto)
      throw new AppError(
        'Aspecto positivo não encontrado para este relatório.',
        404,
      );

    await this.relatorioRepository.deleteAspecto(aspectoId);
  }
}
