import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IEquipeRepository } from './interfaces/IEquipeRepository';
import { EquipeOperacao } from '../../domain/entities/equipe-operacao';
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

  async findAllPaginatedAndFiltered(
    page: number,
    size: number,
    filtros?: Partial<{
      email: string;
      dataOperacao: string;
      nomeOperacao: string;
      opmGuarnicao: string;
      prefixoVtr: string;
      areaAtuacao: string;
      tipoServico: string;
    }>,
  ): Promise<[EquipeOperacao[], number]> {
    const skip = (page - 1) * size;

    const query = this.equipeRepository
      .createQueryBuilder('equipe')
      .skip(skip)
      .take(size);

    if (filtros?.email) {
      query.andWhere('equipe.email ILIKE :email', {
        email: `%${filtros.email}%`,
      });
    }

    if (filtros?.dataOperacao) {
      query.andWhere('equipe.dataOperacao = :dataOperacao', {
        dataOperacao: filtros.dataOperacao,
      });
    }

    if (filtros?.nomeOperacao) {
      query.andWhere('equipe.nomeOperacao ILIKE :nomeOperacao', {
        nomeOperacao: `%${filtros.nomeOperacao}%`,
      });
    }

    if (filtros?.opmGuarnicao) {
      query.andWhere('equipe.opmGuarnicao ILIKE :opmGuarnicao', {
        opmGuarnicao: `%${filtros.opmGuarnicao}%`,
      });
    }

    if (filtros?.prefixoVtr) {
      query.andWhere('equipe.prefixoVtr ILIKE :prefixoVtr', {
        prefixoVtr: `%${filtros.prefixoVtr}%`,
      });
    }

    if (filtros?.areaAtuacao) {
      query.andWhere('equipe.areaAtuacao = :areaAtuacao', {
        areaAtuacao: filtros.areaAtuacao,
      });
    }

    if (filtros?.tipoServico) {
      query.andWhere('equipe.tipo_servico = :tipoServico', {
        tipoServico: filtros.tipoServico,
      });
    }

    return query.getManyAndCount();
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
