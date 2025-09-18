import { EquipeOperacao } from 'src/modules/equipe-operacao/domain/entities/equipe-operacao';

export interface IPaginatedResult<T> {
  items: T[];
  total: number;
  pageIndex: number;
  pageSize: number;
}

export interface IEquipeRepository {
  create(data: Partial<EquipeOperacao>): Promise<EquipeOperacao>;
  findById(id: string): Promise<EquipeOperacao | null>;
  findAll(
    page: number,
    limit: number,
    matriculaComandante?: string,
    dataOperacao?: string,
    nomeOperacao?: string,
    opmGuarnicao?: string,
    prefixoVtr?: string,
    areaAtuacao?: string,
    tipoServico?: string,
    localAtividade?: string,
    atividadeRealizada?: string,
  ): Promise<IPaginatedResult<EquipeOperacao>>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<EquipeOperacao>): Promise<EquipeOperacao>;
}
