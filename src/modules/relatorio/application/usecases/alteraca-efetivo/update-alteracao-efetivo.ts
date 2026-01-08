import { Inject, Injectable } from '@nestjs/common';
import { IRelatorioRepository } from 'src/modules/relatorio/infra/repository/interfaces/IRetalorioRepository';
import { AlteracaoEfetivo } from 'src/modules/relatorio/domain/entities/alteracaoEfetivo';
import { AppError } from 'src/shared/errors/AppError';
import { UpdateAlteracaoRequestDTO } from '../../dto/shemas/types';

@Injectable()
export class UpdateAlteracaoEfetivoUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
  ) {}

  async execute(
    relatorioId: string,
    alteracaoId: string,
    dto: UpdateAlteracaoRequestDTO,
  ): Promise<AlteracaoEfetivo> {
    const alteracao = await this.relatorioRepository.findAlteracaoEfetivoById(
      alteracaoId,
      relatorioId,
    );

    if (!alteracao) {
      throw new AppError('Alteração não encontrada para este relatório.', 404);
    }

    Object.assign(alteracao, dto);

    return await this.relatorioRepository.saveAlteracaoEfetivo(alteracao);
  }
}
