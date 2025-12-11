import { Inject, Injectable } from '@nestjs/common';
import { AppError } from 'src/shared/errors/AppError';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { DinheiroRequestDTO } from '../../dto/schema/CreateOcorrenciaSchema';
import { DinheiroResponseDTO } from '../../dto/response/DinheiroResponseDTO';

@Injectable()
export class UpdateDinheiroUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(
    ocorrenciaId: string,
    dinheiroId: string,
    data: DinheiroRequestDTO,
  ): Promise<DinheiroResponseDTO> {
    const result = await this.ocorrenciaRepository.findOcorrenciaWithDinheiro(
      ocorrenciaId,
      dinheiroId,
    );

    if (!result) {
      throw new AppError(
        `Dinheiro ${dinheiroId} não pertence à ocorrência ${ocorrenciaId}`,
      );
    }

    const { dinheiro } = result;

    if (data.valor !== undefined) dinheiro.valor = data.valor;

    await this.ocorrenciaRepository.saveDinheiro(dinheiro);

    return new DinheiroResponseDTO(dinheiro);
  }
}
