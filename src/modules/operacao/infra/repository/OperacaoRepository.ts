import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IPaginatedResult } from '../../../equipe-operacao/infra/repository/interfaces/IEquipeRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Operacao } from '../../domain/entities/operacao';
import { IOperacaoRepository } from './interfaces/IOperacaoRepository';

@Injectable()
export class OperacaoRepository implements IOperacaoRepository {
  constructor(
    @InjectRepository(Operacao)
    private readonly operacaoRepository: Repository<Operacao>,
  ) {}

  async create(data: Partial<Operacao>): Promise<Operacao> {
    const operacao = this.operacaoRepository.create(data);
    return this.operacaoRepository.save(operacao);
  }

  async findById(id: string): Promise<Operacao | null> {
    return this.operacaoRepository.findOne({ where: { id } });
  }

  public async findAll(
    page = 1,
    limit = 10,
    nome?: string,
    opmDemandante?: string,
    dataInicial?: string,
    dataFinal?: string,
    postoServico?: string,
    areaAtuacao?: string,
  ): Promise<IPaginatedResult<Operacao>> {
    const skip = (page - 1) * limit;
    const query = this.operacaoRepository
      .createQueryBuilder('operacao')
      .leftJoinAndSelect('operacao.postoServico', 'postoServico')
      .leftJoinAndSelect('operacao.areaAtuacao', 'areaAtuacao')
      .skip(skip)
      .take(limit)
      .orderBy('operacao.dataInicial', 'DESC');

    const conditions: Record<string, { field: string; like: boolean }> = {
      nome: { field: 'operacao.nome', like: true },
      opmDemandante: { field: 'operacao.opmDemandante', like: false },
      dataInicial: { field: 'operacao.dataInicial', like: true },
      dataFinal: { field: 'operacao.dataFinal', like: true },
      postoServico: { field: 'postoServico.nome', like: true },
      areaAtuacao: { field: 'areaAtuacao.nome', like: true },
    };

    Object.entries(conditions).forEach(([key, { field, like }]) => {
      const value = {
        nome,
        opmDemandante,
        dataInicial,
        dataFinal,
        postoServico,
        areaAtuacao,
      }[key];

      if (value !== undefined && value !== null && value.trim() !== '') {
        const param = {};
        param[key] = `%${value}%`;

        if (like) {
          query.andWhere(`${field} ILIKE :${key}`, param);
        } else {
          query.andWhere(`${field} = :${key}`, param);
        }
      }
    });

    const [items, total] = await query.getManyAndCount();

    return {
      items,
      total,
      pageIndex: page,
      pageSize: limit,
    };
  }

  async update(id: string, data: Partial<Operacao>): Promise<Operacao> {
    const operacao = await this.operacaoRepository.findOneOrFail({
      where: { id },
    });

    const operacaoAtualizada = this.operacaoRepository.merge(operacao, data);

    return this.operacaoRepository.save(operacaoAtualizada);
  }

  async delete(id: string): Promise<void> {
    await this.operacaoRepository.delete(id);
  }
}
