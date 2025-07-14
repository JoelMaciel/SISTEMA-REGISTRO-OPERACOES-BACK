import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IEquipeRepository } from './interfaces/IEquipeRepository';
import { EquipeOperacao } from '../../domain/entities/equipe-operacao';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EquipeRepository implements IEquipeRepository {
  constructor(
    @InjectRepository(EquipeOperacao)
    private readonly equipeRepo: Repository<EquipeOperacao>,
  ) {}

  async create(data: Partial<EquipeOperacao>): Promise<EquipeOperacao> {
    const equipe = this.equipeRepo.create(data);
    return this.equipeRepo.save(equipe);
  }

  async findById(id: string): Promise<EquipeOperacao | null> {
    return this.equipeRepo.findOne({ where: { id } });
  }

  async findAll(): Promise<EquipeOperacao[]> {
    return this.equipeRepo.find();
  }

  async update(
    id: string,
    data: Partial<EquipeOperacao>,
  ): Promise<EquipeOperacao> {
    const equipe = await this.equipeRepo.findOneOrFail({ where: { id } });

    const equipeAtualizada = this.equipeRepo.merge(equipe, data);

    return this.equipeRepo.save(equipeAtualizada);
  }

  async delete(id: string): Promise<void> {
    await this.equipeRepo.delete(id);
  }
}
