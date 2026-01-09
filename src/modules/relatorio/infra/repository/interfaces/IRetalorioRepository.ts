import { AlteracaoEfetivo } from 'src/modules/relatorio/domain/entities/alteracaoEfetivo';
import { AspectoPositivo } from 'src/modules/relatorio/domain/entities/aspectosPositivos';
import { MelhoriaIdentificada } from 'src/modules/relatorio/domain/entities/melhoriaIndentificada';
import { OutraAlteracao } from 'src/modules/relatorio/domain/entities/outraAlteracao';
import { Relatorio } from 'src/modules/relatorio/domain/entities/relatorio';

export interface IPaginatedResult<T> {
  items: T[];
  total: number;
  pageIndex: number;
  pageSize: number;
}

export interface IRelatorioRepository {
  create(data: Partial<Relatorio>): Promise<Relatorio>;
  findById(id: string): Promise<Relatorio | null>;
  findAll(
    page: number,
    limit: number,
    dataInicial?: Date,
    dataFinal?: Date,
    local?: string,
    nomeOperacao?: string,
    matriculaFiscal?: string,
  ): Promise<IPaginatedResult<Relatorio>>;

  delete(id: string): Promise<void>;
  update(id: string, data: Partial<Relatorio>): Promise<Relatorio>;
  saveAspectoPositivo(aspecto: AspectoPositivo): Promise<AspectoPositivo>;
  saveMelhoriaIdentificada(
    melhoria: MelhoriaIdentificada,
  ): Promise<MelhoriaIdentificada>;
  saveAlteracaoEfetivo(alteracao: AlteracaoEfetivo): Promise<AlteracaoEfetivo>;
  saveOutraAlteracao(alteracao: OutraAlteracao): Promise<OutraAlteracao>;

  findAlteracaoEfetivoById(
    id: string,
    relatorioId: string,
  ): Promise<AlteracaoEfetivo | null>;

  deleteAlteracaoEfetivo(id: string): Promise<void>;

  findAspectoById(
    id: string,
    relatorioId: string,
  ): Promise<AspectoPositivo | null>;

  deleteAspecto(id: string): Promise<void>;

  findMelhoriaById(
    id: string,
    relatorioId: string,
  ): Promise<MelhoriaIdentificada | null>;

  deleteMelhoria(id: string): Promise<void>;

  findOutraAlteracaoById(
    id: string,
    relatorioId: string,
  ): Promise<OutraAlteracao | null>;

  deleteOutraAlteracao(id: string): Promise<void>;
}
