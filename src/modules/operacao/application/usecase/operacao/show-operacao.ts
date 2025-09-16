import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
import { OperacaoResponseDTO } from '../../dto/response/OperacaoResponseDTO';
import { AppError } from 'src/shared/errors/AppError';

@Injectable()
export class FindByIdOperacaoUseCase {
  constructor(
    @Inject('IOperacaoRepository')
    private readonly operacaoRepository: IOperacaoRepository,
  ) {}

  async execute(id: string): Promise<OperacaoResponseDTO> {
    const operacao = await this.operacaoRepository.findById(id);

    if (!operacao) {
      throw new AppError(`Operação com id ${id} não encontrada`);
    }

    return new OperacaoResponseDTO(operacao);
  }
}
