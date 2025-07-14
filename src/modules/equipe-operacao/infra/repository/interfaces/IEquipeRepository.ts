import { EquipeOperacao } from 'src/modules/equipe-operacao/domain/entities/equipe-operacao';

export interface IEquipeRepository {
  create(data: Partial<EquipeOperacao>): Promise<EquipeOperacao>;
  findById(id: string): Promise<EquipeOperacao | null>;
  findAll(): Promise<EquipeOperacao[]>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<EquipeOperacao>): Promise<EquipeOperacao>;
}
