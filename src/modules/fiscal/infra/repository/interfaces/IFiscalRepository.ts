import { Fiscal } from 'src/modules/fiscal/domain/entities/fiscal';

export interface IPaginatedResult<T> {
  items: T[];
  total: number;
  pageIndex: number;
  pageSize: number;
}

export interface IFiscalRepository {
  create(data: Partial<Fiscal>): Promise<Fiscal>;
  findById(id: string): Promise<Fiscal | null>;
  findByMatricula(matricula: string): Promise<Fiscal | null>;
  findAll(
    page: number,
    limit: number,
    nome?: string,
    matricula?: string,
  ): Promise<IPaginatedResult<Fiscal>>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<Fiscal>): Promise<Fiscal>;
}
