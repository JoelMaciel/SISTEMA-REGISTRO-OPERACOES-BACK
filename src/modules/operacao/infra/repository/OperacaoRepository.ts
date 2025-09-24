import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Operacao } from '../../domain/entities/operacao';
import {
  IOperacaoRepository,
  IPaginatedResult,
} from './interfaces/IOperacaoRepository';

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

  async findById(
    id: string,
    relations: string[] = [],
  ): Promise<Operacao | null> {
    return this.operacaoRepository.findOne({
      where: { id },
      relations,
    });
  }

  public async findAll(
    page = 1,
    limit = 10,
    nome?: string,
    opmDemandante?: string,
    dataInicialStart?: Date,
    dataInicialEnd?: Date,
    dataFinalStart?: Date,
    dataFinalEnd?: Date,
    postoArea?: string,
  ): Promise<IPaginatedResult<Operacao>> {
    const skip = (page - 1) * limit;

    const query = this.operacaoRepository
      .createQueryBuilder('operacao')
      .leftJoinAndSelect('operacao.postoServico', 'postoServico')
      .leftJoinAndSelect('operacao.areaAtuacao', 'areaAtuacao')
      .skip(skip)
      .take(limit)
      .orderBy('operacao.dataInicial', 'DESC');

    if (nome) {
      query.andWhere('operacao.nome ILIKE :nome', { nome: `%${nome}%` });
    }

    if (opmDemandante) {
      query.andWhere('operacao.opmDemandante ILIKE :opmDemandante', {
        opmDemandante: `%${opmDemandante}%`,
      });
    }

    if (dataInicialStart && dataInicialEnd) {
      query.andWhere(
        'operacao.dataInicial BETWEEN :dataInicialStart AND :dataInicialEnd',
        {
          dataInicialStart,
          dataInicialEnd,
        },
      );
    } else if (dataInicialStart) {
      query.andWhere('operacao.dataInicial >= :dataInicialStart', {
        dataInicialStart,
      });
    } else if (dataInicialEnd) {
      query.andWhere('operacao.dataInicial <= :dataInicialEnd', {
        dataInicialEnd,
      });
    }

    if (dataFinalStart && dataFinalEnd) {
      query.andWhere(
        'operacao.dataFinal BETWEEN :dataFinalStart AND :dataFinalEnd',
        {
          dataFinalStart,
          dataFinalEnd,
        },
      );
    } else if (dataFinalStart) {
      query.andWhere('operacao.dataFinal >= :dataFinalStart', {
        dataFinalStart,
      });
    } else if (dataFinalEnd) {
      query.andWhere('operacao.dataFinal <= :dataFinalEnd', {
        dataFinalEnd,
      });
    }

    if (postoArea) {
      query.andWhere('postoServico.nome ILIKE :postoServico', {
        postoServico: `%${postoArea}%`,
      });
    }

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
      relations: ['postoArea'],
    });

    const operacaoAtualizada = this.operacaoRepository.merge(operacao, data);

    return this.operacaoRepository.save(operacaoAtualizada);
  }

  async findOperacaoWithPosto(
    operacaoId: string,
    postoId: string,
  ): Promise<Operacao | null> {
    return this.operacaoRepository
      .createQueryBuilder('operacao')
      .leftJoinAndSelect('operacao.postoServico', 'posto')
      .where('operacao.id = :operacaoId', { operacaoId })
      .andWhere('posto.id = :postoId', { postoId })
      .getOne();
  }

  async findOperacaoWithAreaAtuacao(
    operacaoId: string,
    areaAtuacaoId: string,
  ): Promise<Operacao | null> {
    return this.operacaoRepository
      .createQueryBuilder('operacao')
      .leftJoinAndSelect('operacao.areaAtuacao', 'areaAtuacao')
      .where('operacao.id = :operacaoId', { operacaoId })
      .andWhere('areaAtuacao.id = :areaAtuacaoId', { areaAtuacaoId })
      .getOne();
  }

  async delete(id: string): Promise<void> {
    await this.operacaoRepository.delete(id);
  }
}
