// import { Inject, Injectable } from '@nestjs/common';
// import { IEquipeRepository } from '../../../infra/repository/interfaces/IEquipeRepository';
// import { Equipe } from '../../../domain/entities/Fiscal';
// import { AppError } from 'src/shared/errors/AppError';
// import { EquipeResponseDTO } from '../../dto/response/EquipeResponseDTO';
// import { CreateEquipeRequestDTO } from '../../dto/shemas/CreateEquipeSchema';

// @Injectable()
// export class UpdateEquipeUseCase {
//   constructor(
//     @Inject('IEquipeRepository')
//     private readonly equipeRepository: IEquipeRepository,
//   ) {}

//   async execute(
//     id: string,
//     dto: CreateEquipeRequestDTO,
//   ): Promise<EquipeResponseDTO> {
//     // 1️⃣ Verifica se a equipe existe
//     const existingEquipe = await this.equipeRepository.findById(id);
//     if (!existingEquipe) {
//       throw new AppError('Equipe não encontrada na base de dados', 404);
//     }

//     const updatedData: Partial<Equipe> = {
//       email: dto.email,
//       contatoEquipe: dto.contatoEquipe,
//       dataOperacao: dto.dataOperacao,
//       horarioInicial: dto.horarioInicial,
//       horarioFinal: dto.horarioFinal,
//       nomeOperacao: dto.nomeOperacao,
//       postoComandante: dto.postoComandante,
//       nomeGuerraComandante: dto.nomeGuerraComandante,
//       matriculaComandante: dto.matriculaComandante,
//       opmGuarnicao: dto.opmGuarnicao,
//       prefixoVtr: dto.prefixoVtr,
//       efetivoPolicial: dto.efetivoPolicial,
//       tipoServico: dto.tipoServico,
//       numeroHt: dto.numeroHt,
//     };

//     const updatedEquipe = await this.equipeRepository.update(id, updatedData);
//     return new EquipeResponseDTO(updatedEquipe);
//   }
// }
