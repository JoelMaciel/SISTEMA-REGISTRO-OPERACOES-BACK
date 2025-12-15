// src/modules/relatorio/infra/repository/RelatorioRepository.ts

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Relatorio } from '../../domain/entities/relatorio';
import { AspectoPositivo } from '../../domain/entities/aspectosPositivos';
import { MelhoriaIdentificada } from '../../domain/entities/melhoriaIndentificada';
import { AlteracaoEfetivo } from '../../domain/entities/alteracaoEfetivo';
import { OutraAlteracao } from '../../domain/entities/outraAlteracao';
import { IRelatorioRepository } from './interfaces/IRetalorioRepository';

@Injectable()
export class RelatorioRepository implements IRelatorioRepository {
  constructor(
    @InjectRepository(Relatorio)
    private readonly relatorioRepository: Repository<Relatorio>,
    @InjectRepository(AspectoPositivo)
    private readonly aspectoRepository: Repository<AspectoPositivo>,
    @InjectRepository(MelhoriaIdentificada)
    private readonly melhoriaRepository: Repository<MelhoriaIdentificada>,
    @InjectRepository(AlteracaoEfetivo)
    private readonly alteracaoEfetivoRepository: Repository<AlteracaoEfetivo>,
    @InjectRepository(OutraAlteracao)
    private readonly outraAlteracaoRepository: Repository<OutraAlteracao>,
  ) {}

  async create(data: Partial<Relatorio>): Promise<Relatorio> {
    return this.relatorioRepository.save(data);
  }

  async findById(id: string): Promise<Relatorio | null> {
    return await this.relatorioRepository.findOne({
      where: { id },
      relations: [
        'operacao',
        'fiscal',
        'aspectosPositivos',
        'melhoriasIdentificadas',
        'alteracoesEfetivo',
        'outrasAlteracoes',
      ],
    });
  }

  // Implementação dos métodos de salvamento individual (se o TypeORM precisar ou para uso externo)
  async saveAspectoPositivo(
    aspecto: AspectoPositivo,
  ): Promise<AspectoPositivo> {
    return this.aspectoRepository.save(aspecto);
  }

  async saveMelhoriaIdentificada(
    melhoria: MelhoriaIdentificada,
  ): Promise<MelhoriaIdentificada> {
    return this.melhoriaRepository.save(melhoria);
  }

  async saveAlteracaoEfetivo(
    alteracao: AlteracaoEfetivo,
  ): Promise<AlteracaoEfetivo> {
    return this.alteracaoEfetivoRepository.save(alteracao);
  }

  async saveOutraAlteracao(alteracao: OutraAlteracao): Promise<OutraAlteracao> {
    return this.outraAlteracaoRepository.save(alteracao);
  }
}
