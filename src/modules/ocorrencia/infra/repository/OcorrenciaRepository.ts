import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IOcorrenciaRepository,
  IPaginatedResult,
} from './interfaces/IOcorrenciaRepository';
import { Operacao } from 'src/modules/operacao/domain/entities/operacao';
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

  async findById(
    id: string,
    relations: string[] = [],
  ): Promise<Ocorrencia | null> {
    return this.ocorrenciaRepository.findOne({
      where: { id },
      relations,
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
      .leftJoinAndSelect('ocorrencia.vitimas', 'vitima')
      .leftJoinAndSelect('ocorrencia.acusados', 'acusado')
      .leftJoinAndSelect('ocorrencia.armas', 'arma')
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
      query.andWhere('vitima.nome ILIKE :nomeVitima', {
        nomeVitima: `%${nomeVitima}%`,
      });
    }

    if (nomeAcusado) {
      query.andWhere('acusado.nome ILIKE :nomeAcusado', {
        nomeAcusado: `%${nomeAcusado}%`,
      });
    }

    if (tipoArma) {
      query.andWhere('arma.tipo ILIKE :tipoArma', {
        tipoArma: `%${tipoArma}%`,
      });
    }

    if (calibreArma) {
      query.andWhere('arma.calibre ILIKE :calibreArma', {
        calibreArma: `%${calibreArma}%`,
      });
    }

    if (numeracaoArma) {
      query.andWhere('arma.numeracao ILIKE :numeracaoArma', {
        numeracaoArma: `%${numeracaoArma}%`,
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

  // async delete(id: string): Promise<void> {
  //   await this.operacaoRepository.delete(id);
  // }

  // async removePostoAreaFromOperacao(
  //   operacaoId: string,
  //   postoAreaId: string,
  // ): Promise<void> {
  //   const operacao = await this.operacaoRepository.findOne({
  //     where: { id: operacaoId },
  //     relations: ['postoAreas'],
  //   });

  //   if (!operacao) {
  //     throw new Error('Operação não encontrada');
  //   }

  //   const postoIndex = operacao.postoAreas.findIndex(
  //     (p) => p.id === postoAreaId,
  //   );
  //   if (postoIndex === -1) {
  //     throw new Error('Posto/Área não encontrado na operação');
  //   }

  //   operacao.postoAreas.splice(postoIndex, 1);

  //   await this.operacaoRepository.save(operacao);
  // }

  // async findByIdWithRelations(
  //   id: string,
  //   relations: string[] = ['postoAreas'],
  // ): Promise<Operacao | null> {
  //   return this.operacaoRepository.findOne({
  //     where: { id },
  //     relations,
  //   });
  // }

  // async removePostoArea(postoArea: PostoArea): Promise<void> {
  //   await this.operacaoRepository.manager.remove(postoArea);
  // }
}
