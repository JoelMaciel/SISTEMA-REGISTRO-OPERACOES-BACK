import { Ocorrencia } from 'src/modules/ocorrencia/domain/entities/ocorrencia';
import { Operacao } from 'src/modules/operacao/domain/entities/operacao';

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

  // findByIdWithRelations(
  //   id: string,
  //   relations?: string[],
  // ): Promise<Operacao | null>;

  // findAll(
  //   page: number,
  //   limit: number,
  //   nome?: string,
  //   opmDemandante?: string,
  //   dataInicialStart?: Date,
  //   dataInicialEnd?: Date,
  //   dataFinalStart?: Date,
  //   dataFinalEnd?: Date,
  //   postoArea?: string,
  // ): Promise<IPaginatedResult<Operacao>>;

  // update(id: string, data: Partial<Operacao>): Promise<Operacao>;

  // findOperacaoWithPostoArea(
  //   operacaoId: string,
  //   postoAreaId: string,
  // ): Promise<Operacao | null>;

  // delete(id: string): Promise<void>;
}
