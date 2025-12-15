import { Inject, Injectable } from '@nestjs/common';
import {
  IFiscalRepository,
  IPaginatedResult,
} from 'src/modules/fiscal/infra/repository/interfaces/IFiscalRepository';
import { Fiscal } from 'src/modules/fiscal/domain/entities/fiscal';
import { FiscalResponseDTO } from '../dto/response/FiscalResponseDTO';

@Injectable()
export class ListarFiscalUseCase {
  constructor(
    @Inject('IFiscalRepository')
    private readonly fiscalRepository: IFiscalRepository,
  ) {}

  async execute(
    page = 1,
    limit = 10,
    nome?: string,
    matricula?: string,
    operacaoId?: string,
  ): Promise<IPaginatedResult<FiscalResponseDTO>> {
    const result = await this.fiscalRepository.findAll(
      page,
      limit,
      nome,
      matricula,
      operacaoId,
    );

    const items = result.items.map(
      (fiscal: Fiscal) => new FiscalResponseDTO(fiscal),
    );

    return {
      items,
      total: result.total,
      pageIndex: result.pageIndex,
      pageSize: result.pageSize,
    };
  }
}
