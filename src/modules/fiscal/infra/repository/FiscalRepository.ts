import { Injectable } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Fiscal } from '../../domain/entities/fiscal';
import {
  IFiscalRepository,
  IPaginatedResult,
} from './interfaces/IFiscalRepository';

@Injectable()
export class FiscalRepository implements IFiscalRepository {
  constructor(
    @InjectRepository(Fiscal)
    private readonly fiscalRepository: Repository<Fiscal>,
  ) {}

  async create(data: Partial<Fiscal>): Promise<Fiscal> {
    const fiscal = this.fiscalRepository.create(data);
    return this.fiscalRepository.save(fiscal);
  }

  async findById(id: string): Promise<Fiscal | null> {
    return this.fiscalRepository.findOne({ where: { id } });
  }

  async findByMatricula(matricula: string): Promise<Fiscal | null> {
    return this.fiscalRepository.findOne({
      where: { matricula: ILike(matricula) },
    });
  }

  async findAll(
    page = 1,
    limit = 10,
    nome?: string,
    matricula?: string,
    operacaoId?: string,
  ): Promise<IPaginatedResult<Fiscal>> {
    const skip = (page - 1) * limit;

    const query = this.fiscalRepository
      .createQueryBuilder('fiscal')
      .skip(skip)
      .take(limit)
      .orderBy('fiscal.nome', 'ASC');

    if (nome) {
      query.andWhere('fiscal.nome ILIKE :nome', { nome: `%${nome}%` });
    }

    if (matricula) {
      query.andWhere('fiscal.matricula ILIKE :matricula', {
        matricula: `%${matricula}%`,
      });
    }

    if (operacaoId) {
      query
        .innerJoin('fiscal.relatorios', 'relatorio')
        .andWhere('relatorio.operacao_id = :operacaoId', { operacaoId })
        .distinct(true);
    }

    const [items, total] = await query.getManyAndCount();

    return {
      items,
      total,
      pageIndex: page,
      pageSize: limit,
    };
  }
  async update(id: string, data: Partial<Fiscal>): Promise<Fiscal> {
    const fiscal = await this.fiscalRepository.findOneOrFail({ where: { id } });
    const fiscalAtualizado = this.fiscalRepository.merge(fiscal, data);
    return this.fiscalRepository.save(fiscalAtualizado);
  }

  async delete(id: string): Promise<void> {
    await this.fiscalRepository.delete(id);
  }
}
