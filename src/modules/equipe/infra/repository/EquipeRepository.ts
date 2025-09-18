import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  IEquipeRepository,
  IPaginatedResult,
} from './interfaces/IEquipeRepository';
import { EquipeOperacao } from '../../domain/entities/equipe';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EquipeRepository implements IEquipeRepository {
  constructor(
    @InjectRepository(EquipeOperacao)
    private readonly equipeRepository: Repository<EquipeOperacao>,
  ) {}

  async create(data: Partial<EquipeOperacao>): Promise<EquipeOperacao> {
    const equipe = this.equipeRepository.create(data);
    return this.equipeRepository.save(equipe);
  }

  async findById(id: string): Promise<EquipeOperacao | null> {
    return this.equipeRepository.findOne({ where: { id } });
  }

  public async findAll(
    page = 1,
    limit = 10,
    matriculaComandante?: string,
    dataOperacao?: string,
    nomeOperacao?: string,
    opmGuarnicao?: string,
    prefixoVtr?: string,
    areaAtuacao?: string,
    tipoServico?: string,
    localAtividade?: string,
    atividadeRealizada?: string,
  ): Promise<IPaginatedResult<EquipeOperacao>> {
    const skip = (page - 1) * limit;
    const query = this.equipeRepository
      .createQueryBuilder('equipe')
      .skip(skip)
      .take(limit)
      .orderBy('equipe.dataOperacao', 'DESC');

    const conditions: Record<string, { field: string; like: boolean }> = {
      matriculaComandante: { field: 'equipe.matriculaComandante', like: true },
      dataOperacao: { field: 'equipe.dataOperacao', like: false },
      nomeOperacao: { field: 'equipe.nomeOperacao', like: true },
      opmGuarnicao: { field: 'equipe.opmGuarnicao', like: true },
      prefixoVtr: { field: 'CAST(equipe.prefixoVtr AS TEXT)', like: true },
      areaAtuacao: { field: 'CAST(equipe.areaAtuacao AS TEXT)', like: true },
      tipo_servico: { field: 'CAST(equipe.tipo_servico AS TEXT)', like: true },
      localAtividade: {
        field: 'CAST(equipe.localAtividade AS TEXT)',
        like: true,
      },
      atividadeRealizada: {
        field: 'CAST(equipe.atividadeRealizada AS TEXT)',
        like: true,
      },
    };

    Object.entries(conditions).forEach(([key, { field, like }]) => {
      const value = {
        matriculaComandante,
        dataOperacao,
        nomeOperacao,
        opmGuarnicao,
        prefixoVtr,
        areaAtuacao,
        tipoServico,
        localAtividade,
        atividadeRealizada,
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

  async update(
    id: string,
    data: Partial<EquipeOperacao>,
  ): Promise<EquipeOperacao> {
    const equipe = await this.equipeRepository.findOneOrFail({ where: { id } });

    const equipeAtualizada = this.equipeRepository.merge(equipe, data);

    return this.equipeRepository.save(equipeAtualizada);
  }

  async delete(id: string): Promise<void> {
    await this.equipeRepository.delete(id);
  }
}
