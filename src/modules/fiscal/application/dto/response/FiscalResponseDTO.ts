import { Fiscal } from '../../../domain/entities/fiscal';

export class FiscalResponseDTO {
  id: string;
  postoGraduacao: string;
  nome: string;
  matricula: string;
  opm: string;

  constructor(entity: Fiscal) {
    this.id = entity.id;
    this.postoGraduacao = entity.postoGraduação;
    this.nome = entity.nome;
    this.matricula = entity.matricula;
    this.opm = entity.opm;
  }
}
