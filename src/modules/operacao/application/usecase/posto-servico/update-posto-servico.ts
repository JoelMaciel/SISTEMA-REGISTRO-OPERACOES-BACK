import { Inject, Injectable } from '@nestjs/common';
import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
import { OperacaoResponseDTO } from '../../dto/response/OperacaoResponseDTO';
import { AppError } from 'src/shared/errors/AppError';
import { PostoServicoRequestDTO } from '../../dto/schema/PostoServicoSchema';

@Injectable()
export class UpdatePostoServicoOperacaoUseCase {
  constructor(
    @Inject('IOperacaoRepository')
    private readonly operacaoRepository: IOperacaoRepository,
  ) {}

  async execute(
    operacaoId: string,
    postoId: string,
    dto: PostoServicoRequestDTO,
  ): Promise<OperacaoResponseDTO> {
    const operacao = await this.operacaoRepository.findOperacaoWithPosto(
      operacaoId,
      postoId,
    );

    if (!operacao) {
      throw new AppError(
        `Posto de serviço ${postoId} não está vinculado à operação ${operacaoId}`,
      );
    }

    const posto = operacao.postoServico[0];

    Object.assign(posto, dto);

    const operacaoAtualizada = await this.operacaoRepository.create(operacao);

    return new OperacaoResponseDTO(operacaoAtualizada);
  }
}
