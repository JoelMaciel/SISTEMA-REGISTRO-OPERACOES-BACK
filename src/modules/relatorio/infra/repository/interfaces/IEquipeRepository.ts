import { Equipe } from 'src/modules/equipe/domain/entities/equipe';

export interface IPaginatedResult<T> {
  items: T[];
  total: number;
  pageIndex: number;
  pageSize: number;
}

export interface IEquipeRepository {
  create(data: Partial<Equipe>): Promise<Equipe>;
  findById(id: string): Promise<Equipe | null>;
  findAll(
    page: number,
    limit: number,
    matriculaComandante?: string,
    dataOperacao?: string,
    nomeOperacao?: string,
    opmGuarnicao?: string,
    prefixoVtr?: string,
    logradouro?: string,
  ): Promise<IPaginatedResult<Equipe>>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<Equipe>): Promise<Equipe>;
}
