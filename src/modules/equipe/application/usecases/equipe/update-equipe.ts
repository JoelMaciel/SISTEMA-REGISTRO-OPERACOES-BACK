// import { Inject, Injectable } from '@nestjs/common';
// import { IEquipeRepository } from '../../../infra/repository/interfaces/IEquipeRepository';
// import { EquipeOperacao } from '../../../domain/entities/equipe';

// import { AppError } from 'src/shared/errors/AppError';
// import { CreateEquipeRequestDTO } from '../../dto/shemas/CreateEquipeSchema';
// import { EquipeResponseDTO } from '../../dto/response/EquipeResponseDTO';

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
//     const existingEquipe = await this.equipeRepository.findById(id);
//     if (!existingEquipe) {
//       throw new AppError('Equipe não encontrada na base de dados', 404);
//     }

//     const updatedData: Partial<EquipeOperacao> = {
//       ...existingEquipe,
//       ...dto,
//       atividadeRealizada: dto.atividadeRealizada,
//       localAtividade: dto.localAtividade,
//       areaAtuacao: dto.areaAtuacao,
//       tipoServico: dto.tipoServico,
//       postoComandante: dto.postoComandante,
//     };

//     const updatedEquipe = await this.equipeRepository.update(id, updatedData);
//     return new EquipeResponseDTO(updatedEquipe);
//   }
// }
