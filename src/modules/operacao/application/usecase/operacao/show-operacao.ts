import { Injectable, Inject } from '@nestjs/common';
import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
import { OperacaoResponseDTO } from '../../dto/response/OperacaoResponseDTO';
import { AppError } from 'src/shared/errors/AppError';

@Injectable()
export class ShowOperacaoUseCase {
  constructor(
    @Inject('IOperacaoRepository')
    private readonly operacaoRepository: IOperacaoRepository,
  ) {}

  async execute(id: string): Promise<OperacaoResponseDTO> {
    const operacaoExistente = await this.operacaoRepository.findById(id, [
      'postoAreas',
    ]);

    if (!operacaoExistente) {
      throw new AppError(`Operação com id ${id} não encontrada`, 404);
    }

    return new OperacaoResponseDTO(operacaoExistente);
  }
}
