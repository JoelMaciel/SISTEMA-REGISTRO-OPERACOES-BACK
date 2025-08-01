import { Operacao } from 'src/modules/operacao/domain/entities/operacao';

export interface IPaginatedResult<T> {
  items: T[];
  total: number;
  pageIndex: number;
  pageSize: number;
}

export interface IOperacaoRepository {
  create(data: Partial<Operacao>): Promise<Operacao>;
  findById(id: string): Promise<Operacao | null>;
  findAll(
    page: number,
    limit: number,
    nome?: string,
    opmDemandante?: string,
    dataInicial?: string,
    postoServico?: string,
    areaAtuacao?: string,
  ): Promise<IPaginatedResult<Operacao>>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<Operacao>): Promise<Operacao>;
}
