import { Inject, Injectable } from '@nestjs/common';
import { IRelatorioRepository } from '../../infra/repository/interfaces/IRetalorioRepository';
import { RelatorioResponseDTO } from '../dto/response/RelatorioResponseDTO';
import { IPaginatedResult } from 'src/modules/equipe/infra/repository/interfaces/IEquipeRepository';

@Injectable()
export class ListarRelatoriosUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
  ) {}

  async execute(
    page = 1,
    limit = 10,
    dataInicial?: Date,
    dataFinal?: Date,
    local?: string,
    operacaoId?: string,
    fiscalId?: string,
  ): Promise<IPaginatedResult<RelatorioResponseDTO>> {
    const result = await this.relatorioRepository.findAll(
      page,
      limit,
      dataInicial,
      dataFinal,
      local,
      operacaoId,
      fiscalId,
    );

    const items = result.items.map(
      (relatorio) => new RelatorioResponseDTO(relatorio, []),
    );

    return {
      items,
      total: result.total,
      pageIndex: result.pageIndex,
      pageSize: result.pageSize,
    };
  }
}
