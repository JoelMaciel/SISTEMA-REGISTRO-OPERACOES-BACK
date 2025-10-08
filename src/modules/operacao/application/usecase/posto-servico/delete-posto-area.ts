import { Inject, Injectable } from '@nestjs/common';
import { PostoArea } from 'src/modules/operacao/domain/entities/posto-area';
import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
import { AppError } from 'src/shared/errors/AppError';
import { DataSource } from 'typeorm';

@Injectable()
export class RemovePostoAreaOperacaoUseCase {
  constructor(
    @Inject('IOperacaoRepository')
    private readonly operacaoRepository: IOperacaoRepository,
    private readonly dataSource: DataSource,
  ) {}

  async execute(operacaoId: string, postoAreaId: string): Promise<void> {
    const operacao = await this.operacaoRepository.findByIdWithRelations(
      operacaoId,
    );

    if (!operacao) {
      throw new AppError('Operação não encontrada', 404);
    }

    const postoParaRemover = operacao.postoAreas.find(
      (p) => p.id === postoAreaId,
    );

    if (!postoParaRemover) {
      throw new AppError('Posto/Área não vinculado à operação', 404);
    }

    await this.dataSource.manager.remove(PostoArea, postoParaRemover);

    operacao.postoAreas = operacao.postoAreas.filter(
      (p) => p.id !== postoAreaId,
    );

    await this.operacaoRepository.save(operacao);
  }
}
