import { Inject, Injectable } from '@nestjs/common';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { DinheiroRequestDTO } from '../../dto/schema/CreateOcorrenciaSchema';

import { AppError } from 'src/shared/errors/AppError';
import { DinheiroResponseDTO } from '../../dto/response/DinheiroResponseDTO';
import { Dinheiro } from 'src/modules/ocorrencia/domain/entities/dinheiro';

@Injectable()
export class AddDinheiroOcorrenciaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(
    ocorrenciaId: string,
    dto: DinheiroRequestDTO,
  ): Promise<DinheiroResponseDTO> {
    const ocorrencia = await this.ocorrenciaRepository.findById(ocorrenciaId);

    if (!ocorrencia) {
      throw new AppError(`Ocorrência ${ocorrenciaId} não encontrada.`, 404);
    }

    const novoDinheiro = new Dinheiro();
    novoDinheiro.valor = dto.valor;

    novoDinheiro.ocorrencia = ocorrencia;

    const dinheiroSalvo = await this.ocorrenciaRepository.saveDinheiro(
      novoDinheiro,
    );

    return new DinheiroResponseDTO(dinheiroSalvo);
  }
}
