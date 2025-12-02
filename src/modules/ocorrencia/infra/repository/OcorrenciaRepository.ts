import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IOcorrenciaRepository,
  IPaginatedResult,
} from './interfaces/IOcorrenciaRepository';
import { Ocorrencia } from '../../domain/entities/ocorrencia';
import { Arma } from '../../domain/entities/arma';
import { Droga } from '../../domain/entities/droga';
import { Veiculo } from '../../domain/entities/veiculo';
import { Municao } from '../../domain/entities/municao';
import { Dinheiro } from '../../domain/entities/dinheiro';

@Injectable()
export class OcorrenciaRepository implements IOcorrenciaRepository {
  constructor(
    @InjectRepository(Ocorrencia)
    private readonly ocorrenciaRepository: Repository<Ocorrencia>,
    @InjectRepository(Arma)
    private readonly armaRepository: Repository<Arma>,
    @InjectRepository(Droga)
    private readonly drogaRepository: Repository<Droga>,
    @InjectRepository(Veiculo)
    private readonly veiculoRepository: Repository<Veiculo>,
    @InjectRepository(Municao)
    private readonly municaoRepository: Repository<Municao>,
    @InjectRepository(Dinheiro)
    private readonly dinheiroRepository: Repository<Dinheiro>,
  ) {}

  async create(data: Partial<Ocorrencia>): Promise<Ocorrencia> {
    return this.ocorrenciaRepository.save(data);
  }

  async saveArma(arma: Arma): Promise<Arma> {
    return this.armaRepository.save(arma);
  }

  async saveDroga(droga: Droga): Promise<Droga> {
    return this.drogaRepository.save(droga);
  }

  async saveVeiculo(veiculo: Veiculo): Promise<Veiculo> {
    return this.veiculoRepository.save(veiculo);
  }

  async saveMunicao(municao: Municao): Promise<Municao> {
    return this.municaoRepository.save(municao);
  }

  async saveDinheiro(dinheiro: Dinheiro): Promise<Dinheiro> {
    dinheiro;
    return this.dinheiroRepository.save(dinheiro);
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
        'endereco.cep',
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

  async update(id: string, data: Partial<Ocorrencia>): Promise<Ocorrencia> {
    const ocorrencia = await this.ocorrenciaRepository.findOneOrFail({
      where: { id },
      relations: ['endereco'],
    });

    ocorrencia.m = data.m ?? ocorrencia.m;
    ocorrencia.data = data.data ?? ocorrencia.data;
    ocorrencia.horario = data.horario ?? ocorrencia.horario;
    ocorrencia.tipo = data.tipo ?? ocorrencia.tipo;
    ocorrencia.resumo = data.resumo ?? ocorrencia.resumo;

    if (data.endereco) {
      Object.assign(ocorrencia.endereco, data.endereco);
    }

    return this.ocorrenciaRepository.save(ocorrencia);
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

  async findOcorrenciaWithArma(
    ocorrenciaId: string,
    armaId: string,
  ): Promise<{ ocorrencia: Ocorrencia; arma: Arma } | null> {
    const ocorrencia = await this.ocorrenciaRepository.findOne({
      where: { id: ocorrenciaId },
      relations: ['armas'],
    });

    if (!ocorrencia) return null;

    const arma = ocorrencia.armas.find((a) => a.id === armaId);
    if (!arma) return null;

    return { ocorrencia, arma };
  }

  async findOcorrenciaWithDinheiro(
    ocorrenciaId: string,
    dinheiroId: string,
  ): Promise<{ ocorrencia: Ocorrencia; dinheiro: Dinheiro } | null> {
    const ocorrencia = await this.ocorrenciaRepository.findOne({
      where: { id: ocorrenciaId },
      relations: ['valoresApreendidos'],
    });

    if (!ocorrencia) return null;

    const dinheiro = ocorrencia.valoresApreendidos.find(
      (valores) => valores.id === dinheiroId,
    );
    if (!dinheiro) return null;

    return { ocorrencia, dinheiro };
  }

  async findOcorrenciaWithMunicao(
    ocorrenciaId: string,
    municaoId: string,
  ): Promise<{ ocorrencia: Ocorrencia; municao: Municao } | null> {
    const ocorrencia = await this.ocorrenciaRepository.findOne({
      where: { id: ocorrenciaId },
      relations: ['municoes'],
    });

    if (!ocorrencia) return null;

    const municao = ocorrencia.municoes.find((m) => m.id === municaoId);
    if (!municao) return null;

    return { ocorrencia, municao };
  }

  async findOcorrenciaWithVeiculo(
    ocorrenciaId: string,
    veiculoId: string,
  ): Promise<{ ocorrencia: Ocorrencia; veiculo: Veiculo } | null> {
    const ocorrencia = await this.ocorrenciaRepository.findOne({
      where: { id: ocorrenciaId },
      relations: ['veiculos'],
    });

    if (!ocorrencia) return null;

    const veiculo = ocorrencia.veiculos.find((v) => v.id === veiculoId);
    if (!veiculo) return null;

    return { ocorrencia, veiculo };
  }

  async findOcorrenciaWithDroga(
    ocorrenciaId: string,
    drogaId: string,
  ): Promise<{ ocorrencia: Ocorrencia; droga: Droga } | null> {
    const ocorrencia = await this.ocorrenciaRepository.findOne({
      where: { id: ocorrenciaId },
      relations: ['drogas'],
    });

    if (!ocorrencia) return null;

    const droga = ocorrencia.drogas.find((droga) => droga.id === drogaId);
    if (!droga) return null;

    return { ocorrencia, droga };
  }

  async delete(id: string): Promise<void> {
    await this.ocorrenciaRepository.delete(id);
  }
}
