import { EquipeOperacao } from 'src/modules/equipe-operacao/domain/entities/equipe-operacao';

export interface IEquipeRepository {
  create(data: Partial<EquipeOperacao>): Promise<EquipeOperacao>;
  findById(id: string): Promise<EquipeOperacao | null>;
  findAllPaginatedAndFiltered(
    page: number,
    size: number,
    filtros?: Partial<{
      email: string;
      dataOperacao: string;
      nomeOperacao: string;
      opmGuarnicao: string;
      prefixoVtr: string;
      areaAtuacao: string;
      tipoServico: string;
    }>,
  ): Promise<[EquipeOperacao[], number]>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<EquipeOperacao>): Promise<EquipeOperacao>;
}
