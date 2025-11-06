import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Operacao } from '../../domain/entities/operacao';
import {
  IOperacaoRepository,
  IPaginatedResult,
} from './interfaces/IOperacaoRepository';
import { PostoArea } from '../../domain/entities/posto-area';

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

  async save(operacao: Operacao): Promise<Operacao> {
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
      .leftJoinAndSelect('operacao.postoAreas', 'postoAreas')

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
      relations: ['postoAreas'],
    });

    const operacaoAtualizada = this.operacaoRepository.merge(operacao, data);

    return this.operacaoRepository.save(operacaoAtualizada);
  }

  async findOperacaoWithPostoArea(
    operacaoId: string,
    postoAreaId: string,
  ): Promise<{ operacao: Operacao; postoArea: PostoArea } | null> {
    const operacao = await this.operacaoRepository.findOne({
      where: { id: operacaoId },
      relations: ['postoAreas'],
    });

    if (!operacao) return null;

    const postoArea = operacao.postoAreas.find((p) => p.id === postoAreaId);

    if (!postoArea) return null;

    return { operacao, postoArea };
  }

  async findOperacaoComPostoAreas(
    operacaoId: string,
  ): Promise<Operacao | null> {
    return this.operacaoRepository.findOne({
      where: { id: operacaoId },
      relations: ['postoAreas'],
    });
  }

  async delete(id: string): Promise<void> {
    await this.operacaoRepository.delete(id);
  }

  async removePostoAreaFromOperacao(
    operacaoId: string,
    postoAreaId: string,
  ): Promise<void> {
    const operacao = await this.operacaoRepository.findOne({
      where: { id: operacaoId },
      relations: ['postoAreas'],
    });

    if (!operacao) {
      throw new Error('Operação não encontrada');
    }

    const postoIndex = operacao.postoAreas.findIndex(
      (p) => p.id === postoAreaId,
    );
    if (postoIndex === -1) {
      throw new Error('Posto/Área não encontrado na operação');
    }

    operacao.postoAreas.splice(postoIndex, 1);

    await this.operacaoRepository.save(operacao);
  }

  async findByIdWithRelations(
    id: string,
    relations: string[] = ['postoAreas'],
  ): Promise<Operacao | null> {
    return this.operacaoRepository.findOne({
      where: { id },
      relations,
    });
  }

  async removePostoArea(postoArea: PostoArea): Promise<void> {
    await this.operacaoRepository.manager.remove(postoArea);
  }
}
