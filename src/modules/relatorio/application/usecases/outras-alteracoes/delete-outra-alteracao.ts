import { Inject, Injectable } from '@nestjs/common';
import { IRelatorioRepository } from 'src/modules/relatorio/infra/repository/interfaces/IRetalorioRepository';
import { AppError } from 'src/shared/errors/AppError';

@Injectable()
export class DeleteOutraAlteracaoUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
  ) {}

  async execute(relatorioId: string, alteracaoId: string): Promise<void> {
    const alteracao = await this.relatorioRepository.findOutraAlteracaoById(
      alteracaoId,
      relatorioId,
    );
    if (!alteracao)
      throw new AppError('Alteração não encontrada para este relatório.', 404);

    await this.relatorioRepository.deleteOutraAlteracao(alteracaoId);
  }
}
