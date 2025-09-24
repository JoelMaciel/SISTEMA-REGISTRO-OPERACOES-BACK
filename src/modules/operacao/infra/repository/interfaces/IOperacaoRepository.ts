import { Operacao } from 'src/modules/operacao/domain/entities/operacao';

export interface IPaginatedResult<T> {
  items: T[];
  total: number;
  pageIndex: number;
  pageSize: number;
}

export interface IOperacaoRepository {
  create(data: Partial<Operacao>): Promise<Operacao>;
  findById(id: string, relations?: string[]): Promise<Operacao | null>;

  findAll(
    page: number,
    limit: number,
    nome?: string,
    opmDemandante?: string,
    dataInicialStart?: Date,
    dataInicialEnd?: Date,
    dataFinalStart?: Date,
    dataFinalEnd?: Date,
    postoArea?: string,
  ): Promise<IPaginatedResult<Operacao>>;

  update(id: string, data: Partial<Operacao>): Promise<Operacao>;

  findOperacaoWithPosto(
    operacaoId: string,
    postoId: string,
  ): Promise<Operacao | null>;

  findOperacaoWithAreaAtuacao(
    operacaoId: string,
    areaAtuacaoId: string,
  ): Promise<Operacao | null>;

  delete(id: string): Promise<void>;
}
