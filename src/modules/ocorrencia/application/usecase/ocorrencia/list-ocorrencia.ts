import { Inject, Injectable } from '@nestjs/common';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { OcorrenciaResponseDTO } from '../../dto/response/OcorrenciaResponseDTO';

@Injectable()
export class ListOcorrenciasUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(params: {
    page?: number;
    limit?: number;
    m?: string;
    tipo?: string;
    dataInicio?: Date;
    dataFim?: Date;
    nomeVitima?: string;
    nomeAcusado?: string;
    tipoArma?: string;
    calibreArma?: string;
    numeracaoArma?: string;
  }): Promise<{
    items: OcorrenciaResponseDTO[];
    total: number;
    pageIndex: number;
    pageSize: number;
  }> {
    const {
      page = 1,
      limit = 10,
      m,
      tipo,
      dataInicio,
      dataFim,
      nomeVitima,
      nomeAcusado,
      tipoArma,
      calibreArma,
      numeracaoArma,
    } = params;

    const result = await this.ocorrenciaRepository.findAll(
      page,
      limit,
      m,
      tipo,
      dataInicio,
      dataFim,
      nomeVitima,
      nomeAcusado,
      tipoArma,
      calibreArma,
      numeracaoArma,
    );

    const items = result.items.map(
      (ocorrencia) => new OcorrenciaResponseDTO(ocorrencia),
    );

    return {
      items,
      total: result.total,
      pageIndex: result.pageIndex,
      pageSize: result.pageSize,
    };
  }
}
