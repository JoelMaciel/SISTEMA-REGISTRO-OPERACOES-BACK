import { Inject, Injectable } from '@nestjs/common';
import { IRelatorioRepository } from 'src/modules/relatorio/infra/repository/interfaces/IRetalorioRepository';
import { AlteracaoEfetivoRequestDTO } from '../../dto/shemas/types';
import { AlteracaoEfetivoResponseDTO } from '../../dto/response/AlteracaoEfetivoResponseDTO.ts';
import { AppError } from 'src/shared/errors/AppError';

@Injectable()
export class CreateAlteracaoEfetivoUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
  ) {}

  async execute(
    relatorioId: string,
    dto: AlteracaoEfetivoRequestDTO,
  ): Promise<AlteracaoEfetivoResponseDTO> {
    const relatorio = await this.relatorioRepository.findById(relatorioId);

    if (!relatorio) {
      throw new AppError('Relatório não encontrado.', 404);
    }

    const novaAlteracaoData = {
      ...dto,
      relatorio: relatorio,
    };

    const alteracaoSalva = await this.relatorioRepository.saveAlteracaoEfetivo(
      novaAlteracaoData as any,
    );

    return new AlteracaoEfetivoResponseDTO(alteracaoSalva);
  }
}
