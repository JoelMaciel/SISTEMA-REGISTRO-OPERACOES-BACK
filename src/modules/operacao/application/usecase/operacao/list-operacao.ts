import { Inject, Injectable } from '@nestjs/common';
import {
  IOperacaoRepository,
  IPaginatedResult,
} from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
import { OperacaoResponseDTO } from '../../dto/response/OperacaoResponseDTO';
import { parseDate } from 'src/shared/utils/dateUtils';

@Injectable()
export class ListOperacaoUseCase {
  constructor(
    @Inject('IOperacaoRepository')
    private readonly operacaoRepository: IOperacaoRepository,
  ) {}

  async execute(
    page = 1,
    limit = 10,
    nome?: string,
    opmDemandante?: string,
    dataInicialStart?: string,
    dataInicialEnd?: string,
    dataFinalStart?: string,
    dataFinalEnd?: string,
    postoServico?: string,
  ): Promise<IPaginatedResult<OperacaoResponseDTO>> {
    const result = await this.operacaoRepository.findAll(
      page,
      limit,
      nome,
      opmDemandante,
      parseDate(dataInicialStart),
      parseDate(dataInicialEnd),
      parseDate(dataFinalStart),
      parseDate(dataFinalEnd),
      postoServico,
    );

    return {
      ...result,
      items: result.items.map((operacao) => new OperacaoResponseDTO(operacao)),
    };
  }
}
