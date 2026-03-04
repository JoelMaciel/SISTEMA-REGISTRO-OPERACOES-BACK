import { Inject, Injectable } from '@nestjs/common';
import { AppError } from 'src/shared/errors/AppError';
import { IRelatorioRepository } from '../../infra/repository/interfaces/IRetalorioRepository';

@Injectable()
export class DeleteRelatorioUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const relatorio = await this.relatorioRepository.findById(id);

    if (!relatorio) {
      throw new AppError('Relatório não encontrado.', 404);
    }
    await this.relatorioRepository.delete(id);
  }
}
