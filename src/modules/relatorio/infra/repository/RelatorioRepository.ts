import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Relatorio } from '../../domain/entities/relatorio';
import { AspectoPositivo } from '../../domain/entities/aspectosPositivos';
import { MelhoriaIdentificada } from '../../domain/entities/melhoriaIndentificada';
import { AlteracaoEfetivo } from '../../domain/entities/alteracaoEfetivo';
import { OutraAlteracao } from '../../domain/entities/outraAlteracao';
import {
  IPaginatedResult,
  IRelatorioRepository,
} from './interfaces/IRetalorioRepository';

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

  async findAll(
    page = 1,
    limit = 10,
    dataInicial?: Date,
    dataFinal?: Date,
    local?: string,
    operacaoId?: string,
    fiscalId?: string,
  ): Promise<IPaginatedResult<Relatorio>> {
    const skip = (page - 1) * limit;

    const query = this.relatorioRepository
      .createQueryBuilder('relatorio')
      .leftJoinAndSelect('relatorio.operacao', 'operacao')
      .leftJoinAndSelect('relatorio.fiscal', 'fiscal')
      .skip(skip)
      .take(limit)
      .orderBy('relatorio.dataInicial', 'DESC');

    if (dataInicial && dataFinal) {
      query.andWhere(
        'relatorio.dataInicial BETWEEN :dataInicial AND :dataFinal',
        {
          dataInicial,
          dataFinal,
        },
      );
    }

    if (local) {
      query.andWhere('relatorio.local ILIKE :local', { local: `%${local}%` });
    }

    if (operacaoId) {
      query.andWhere('operacao.id = :operacaoId', { operacaoId });
    }

    if (fiscalId) {
      query.andWhere('fiscal.id = :fiscalId', { fiscalId });
    }

    const [items, total] = await query.getManyAndCount();

    return {
      items,
      total,
      pageIndex: page,
      pageSize: limit,
    };
  }

  async update(id: string, data: Partial<Relatorio>): Promise<Relatorio> {
    const relatorioExistente = await this.relatorioRepository.findOneBy({ id });

    if (!relatorioExistente) {
      throw new Error('Relatório não encontrado para atualização.');
    }

    const relatorioMesclado = this.relatorioRepository.merge(
      relatorioExistente,
      data,
    );

    return this.relatorioRepository.save(relatorioMesclado);
  }

  async delete(id: string): Promise<void> {
    const result = await this.relatorioRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Relatório não encontrado para exclusão.');
    }
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
