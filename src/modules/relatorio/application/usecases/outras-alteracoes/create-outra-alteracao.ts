import { OutraAlteracaoResponseDTO } from '../../dto/response/OutraAlteracaoResponseDTO.ts';
import { OutraAlteracaoRequestDTO } from '../../dto/shemas/types.js';
import { IRelatorioRepository } from 'src/modules/relatorio/infra/repository/interfaces/IRetalorioRepository.js';
import { Inject, Injectable } from '@nestjs/common';
import { AppError } from 'src/shared/errors/AppError';

@Injectable()
export class CreateOutraAlteracaoUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
  ) {}

  async execute(
    relatorioId: string,
    dto: OutraAlteracaoRequestDTO,
  ): Promise<OutraAlteracaoResponseDTO> {
    const relatorio = await this.relatorioRepository.findById(relatorioId);
    if (!relatorio) throw new AppError('Relatório não encontrado.', 404);

    const novaAlteracao = await this.relatorioRepository.saveOutraAlteracao({
      ...dto,
      relatorio,
    } as any);

    return new OutraAlteracaoResponseDTO(novaAlteracao);
  }
}
