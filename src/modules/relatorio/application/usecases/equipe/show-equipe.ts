import { Inject, Injectable } from '@nestjs/common';
import { IEquipeRepository } from '../../../infra/repository/interfaces/IEquipeRepository';
import { EquipeResponseDTO } from '../../dto/response/EquipeResponseDTO';
import { AppError } from 'src/shared/errors/AppError';

@Injectable()
export class ShowEquipeUseCase {
  constructor(
    @Inject('IEquipeRepository')
    private readonly equipeRepository: IEquipeRepository,
  ) {}

  async execute(id: string): Promise<EquipeResponseDTO> {
    const equipe = await this.equipeRepository.findById(id);
    if (!equipe) {
      throw new AppError('Equipe não encontrada na base de dados', 404);
    }
    return new EquipeResponseDTO(equipe);
  }
}
