import { Inject, Injectable } from '@nestjs/common';
import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
import { AppError } from 'src/shared/errors/AppError';
import { PostoAreaResponseDTO } from '../../dto/response/PostoAreaResponseDTO';
import { PostoAreaRequestDTO } from '../../dto/schema/PostoAreaSchema';

@Injectable()
export class UpdatePostoAreaOperacaoUseCase {
  constructor(
    @Inject('IOperacaoRepository')
    private readonly operacaoRepository: IOperacaoRepository,
  ) {}

  async execute(
    operacaoId: string,
    postoAreaId: string,
    dto: PostoAreaRequestDTO,
  ): Promise<PostoAreaResponseDTO> {
    const operacao = await this.operacaoRepository.findOperacaoComPostoAreas(
      operacaoId,
    );

    if (!operacao) {
      throw new AppError(`Operação ${operacaoId} não encontrada`);
    }

    const posto = operacao.postoAreas.find((p) => p.id === postoAreaId);
    if (!posto) {
      throw new AppError(`Posto de área ${postoAreaId} não encontrado`);
    }

    Object.assign(posto, dto);

    const operacaoAtualizada = await this.operacaoRepository.save(operacao);
    const postoAtualizado = operacaoAtualizada.postoAreas.find(
      (p) => p.id === postoAreaId,
    )!;

    return new PostoAreaResponseDTO(postoAtualizado);
  }
}
