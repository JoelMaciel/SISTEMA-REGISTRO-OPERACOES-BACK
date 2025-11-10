import { Ocorrencia } from 'src/modules/ocorrencia/domain/entities/ocorrencia';

export interface IPaginatedResult<T> {
  items: T[];
  total: number;
  pageIndex: number;
  pageSize: number;
}

export interface IOcorrenciaRepository {
  create(data: Partial<Ocorrencia>): Promise<Ocorrencia>;
  save(ocorrencia: Ocorrencia): Promise<Ocorrencia>;
  findById(id: string, relations?: string[]): Promise<Ocorrencia | null>;

  findAll(
    page: number,
    limit: number,
    m?: string,
    tipo?: string,
    dataInicio?: Date,
    dataFim?: Date,
    nomeVitima?: string,
    nomeAcusado?: string,
    tipoArma?: string,
    calibreArma?: string,
    numeracaoArma?: string,
  ): Promise<IPaginatedResult<Ocorrencia>>;

  update(id: string, data: Partial<Ocorrencia>): Promise<Ocorrencia>;
  delete(id: string): Promise<void>;

  // findByIdWithRelations(
  //   id: string,
  //   relations?: string[],
  // ): Promise<Operacao | null>;

  // findOperacaoWithPostoArea(
  //   operacaoId: string,
  //   postoAreaId: string,
  // ): Promise<Operacao | null>;
}
