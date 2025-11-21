import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IOcorrenciaRepository,
  IPaginatedResult,
} from './interfaces/IOcorrenciaRepository';
import { Ocorrencia } from '../../domain/entities/ocorrencia';

@Injectable()
export class OcorrenciaRepository implements IOcorrenciaRepository {
  constructor(
    @InjectRepository(Ocorrencia)
    private readonly ocorrenciaRepository: Repository<Ocorrencia>,
  ) {}

  async create(data: Partial<Ocorrencia>): Promise<Ocorrencia> {
    const operacao = this.ocorrenciaRepository.create(data);
    return this.ocorrenciaRepository.save(operacao);
  }

  async save(ocorrencia: Ocorrencia): Promise<Ocorrencia> {
    return this.ocorrenciaRepository.save(ocorrencia);
  }

  async findById(id: string): Promise<Ocorrencia | null> {
    return await this.ocorrenciaRepository.findOne({
      where: { id },
      relations: [
        'vitimas',
        'drogas',
        'municoes',
        'veiculos',
        'armas',
        'acusados',
        'outrosObjetos',
        'valoresApreendidos',
        'endereco',
      ],
    });
  }

  async update(id: string, data: Partial<Ocorrencia>): Promise<Ocorrencia> {
    const ocorrencia = await this.ocorrenciaRepository.findOneOrFail({
      where: { id },
      relations: [
        'endereco',
        'vitimas',
        'acusados',
        'armas',
        'municoes',
        'drogas',
        'veiculos',
        'outrosObjetos',
        'valoresApreendidos',
      ],
    });

    const ocorrenciaAtualizada = this.ocorrenciaRepository.merge(
      ocorrencia,
      data,
    );

    return this.ocorrenciaRepository.save(ocorrenciaAtualizada);
  }

  async findAll(
    page = 1,
    limit = 10,
    m?: string,
    tipo?: string,
    dataInicio?: Date,
    dataFim?: Date,
    nomeVitima?: string,
    nomeAcusado?: string,
    tipoArma?: string,
    calibreArma?: string,
    numeracaoArma?: string,
  ): Promise<IPaginatedResult<Ocorrencia>> {
    const skip = (page - 1) * limit;

    const query = this.ocorrenciaRepository
      .createQueryBuilder('ocorrencia')
      .leftJoinAndSelect('ocorrencia.endereco', 'endereco')
      .select([
        'ocorrencia.id',
        'ocorrencia.m',
        'ocorrencia.data',
        'ocorrencia.tipo',
        'ocorrencia.horario',
        'ocorrencia.resumo',
        'endereco.rua',
        'endereco.bairro',
        'endereco.cidade',
        'endereco.uf',
      ])
      .skip(skip)
      .take(limit)
      .orderBy('ocorrencia.data', 'DESC');

    if (m) {
      query.andWhere('ocorrencia.m ILIKE :m', { m: `%${m}%` });
    }

    if (tipo) {
      query.andWhere('ocorrencia.tipo ILIKE :tipo', { tipo: `%${tipo}%` });
    }

    if (dataInicio && dataFim) {
      query.andWhere('ocorrencia.data BETWEEN :dataInicio AND :dataFim', {
        dataInicio,
        dataFim,
      });
    } else if (dataInicio) {
      query.andWhere('ocorrencia.data >= :dataInicio', { dataInicio });
    } else if (dataFim) {
      query.andWhere('ocorrencia.data <= :dataFim', { dataFim });
    }

    if (nomeVitima) {
      query.andWhere(
        (qb) => {
          const subQuery = qb
            .subQuery()
            .select('1')
            .from('vitimas', 'v')
            .where('v.ocorrencia_id = ocorrencia.id')
            .andWhere('v.nome ILIKE :nomeVitima')
            .getQuery();
          return 'EXISTS ' + subQuery;
        },
        { nomeVitima: `%${nomeVitima}%` },
      );
    }

    if (nomeAcusado) {
      query.andWhere(
        (qb) => {
          const subQuery = qb
            .subQuery()
            .select('1')
            .from('acusados', 'a')
            .where('a.ocorrencia_id = ocorrencia.id')
            .andWhere('a.nome ILIKE :nomeAcusado')
            .getQuery();
          return 'EXISTS ' + subQuery;
        },
        { nomeAcusado: `%${nomeAcusado}%` },
      );
    }

    if (tipoArma || calibreArma || numeracaoArma) {
      query.andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from('armas', 'ar')
          .where('ar.ocorrencia_id = ocorrencia.id');

        if (tipoArma)
          subQuery.andWhere('ar.tipo ILIKE :tipoArma', {
            tipoArma: `%${tipoArma}%`,
          });
        if (calibreArma)
          subQuery.andWhere('ar.calibre ILIKE :calibreArma', {
            calibreArma: `%${calibreArma}%`,
          });
        if (numeracaoArma)
          subQuery.andWhere('ar.numeracao ILIKE :numeracaoArma', {
            numeracaoArma: `%${numeracaoArma}%`,
          });

        return 'EXISTS ' + subQuery.getQuery();
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

  async findByMOcorrencia(m: string): Promise<Ocorrencia | null> {
    if (!m) return null;

    const mNormalized = m.trim();

    const ocorrencia = await this.ocorrenciaRepository.findOne({
      where: { m: ILike(`%${mNormalized}%`) },
      relations: [
        'endereco',
        'vitimas',
        'acusados',
        'armas',
        'municoes',
        'drogas',
        'veiculos',
        'outrosObjetos',
        'valoresApreendidos',
      ],
      order: { createdAt: 'DESC' },
    });

    return ocorrencia ?? null;
  }

  async delete(id: string): Promise<void> {
    await this.ocorrenciaRepository.delete(id);
  }
}
