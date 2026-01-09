import { AppError } from 'src/shared/errors/AppError';
import { OutraAlteracaoResponseDTO } from '../../dto/response/OutraAlteracaoResponseDTO.ts';
import { OutraAlteracaoRequestDTO } from '../../dto/shemas/types.js';
import { IRelatorioRepository } from 'src/modules/relatorio/infra/repository/interfaces/IRetalorioRepository.js';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateOutraAlteracaoUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
  ) {}

  async execute(
    relatorioId: string,
    alteracaoId: string,
    dto: OutraAlteracaoRequestDTO,
  ): Promise<OutraAlteracaoResponseDTO> {
    const alteracao = await this.relatorioRepository.findOutraAlteracaoById(
      alteracaoId,
      relatorioId,
    );
    if (!alteracao)
      throw new AppError('Alteração não encontrada para este relatório.', 404);

    alteracao.descricao = dto.descricao;
    const atualizada = await this.relatorioRepository.saveOutraAlteracao(
      alteracao,
    );

    return new OutraAlteracaoResponseDTO(atualizada);
  }
}
