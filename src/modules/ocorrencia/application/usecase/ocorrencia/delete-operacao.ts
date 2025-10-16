import { Inject, Injectable } from '@nestjs/common';
import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
import { AppError } from 'src/shared/errors/AppError';

@Injectable()
export class DeleteOperacaoUseCase {
  constructor(
    @Inject('IOperacaoRepository')
    private readonly operacaoRepository: IOperacaoRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const operacao = await this.operacaoRepository.findById(id);

    if (!operacao) {
      throw new AppError(`Operação com ID ${id} não encontrada`, 404);
    }

    await this.operacaoRepository.delete(id);
  }
}
