// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import {
//   IEquipeRepository,
//   IPaginatedResult,
// } from './interfaces/IEquipeRepository';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Equipe } from '../../domain/entities/Fiscal';

// @Injectable()
// export class EquipeRepository implements IEquipeRepository {
//   constructor(
//     @InjectRepository(Equipe)
//     private readonly equipeRepository: Repository<Equipe>,
//   ) {}

//   async create(data: Partial<Equipe>): Promise<Equipe> {
//     const equipe = this.equipeRepository.create(data);
//     return this.equipeRepository.save(equipe);
//   }

//   async findById(id: string): Promise<Equipe | null> {
//     return this.equipeRepository.findOne({ where: { id } });
//   }

//   public async findAll(
//     page = 1,
//     limit = 10,
//     matriculaComandante?: string,
//     dataOperacao?: string,
//     nomeOperacao?: string,
//     opmGuarnicao?: string,
//     prefixoVtr?: string,
//     logradouro?: string,
//   ): Promise<IPaginatedResult<Equipe>> {
//     const skip = (page - 1) * limit;
//     const query = this.equipeRepository
//       .createQueryBuilder('equipe')
//       .skip(skip)
//       .take(limit)
//       .orderBy('equipe.dataOperacao', 'DESC');

//     const filters = [
//       {
//         key: 'matriculaComandante',
//         field: 'equipe.matriculaComandante',
//         like: true,
//       },
//       { key: 'opmGuarnicao', field: 'equipe.opmGuarnicao', like: true },
//       { key: 'prefixoVtr', field: 'equipe.prefixoVtr', like: true },
//       { key: 'logradouro', field: 'equipe.logradouro', like: true },
//       { key: 'nomeOperacao', field: 'equipe.nomeOperacao', like: true },
//       { key: 'dataOperacao', field: 'equipe.dataOperacao', like: false },
//     ];

//     const params = {
//       matriculaComandante,
//       dataOperacao,
//       nomeOperacao,
//       opmGuarnicao,
//       prefixoVtr,
//       logradouro,
//     };

//     for (const { key, field, like } of filters) {
//       const value = params[key as keyof typeof params];
//       if (value !== undefined && value !== null && value.trim() !== '') {
//         if (like) {
//           query.andWhere(`${field} ILIKE :${key}`, { [key]: `%${value}%` });
//         } else {
//           query.andWhere(`${field} = :${key}`, { [key]: value });
//         }
//       }
//     }

//     const [items, total] = await query.getManyAndCount();

//     return {
//       items,
//       total,
//       pageIndex: page,
//       pageSize: limit,
//     };
//   }

//   async update(id: string, data: Partial<Equipe>): Promise<Equipe> {
//     const equipe = await this.equipeRepository.findOneOrFail({ where: { id } });

//     const equipeAtualizada = this.equipeRepository.merge(equipe, data);

//     return this.equipeRepository.save(equipeAtualizada);
//   }

//   async delete(id: string): Promise<void> {
//     await this.equipeRepository.delete(id);
//   }
// }
