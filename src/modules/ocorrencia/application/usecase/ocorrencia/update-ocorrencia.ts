import { Inject, Injectable } from '@nestjs/common';
import { Ocorrencia } from 'src/modules/ocorrencia/domain/entities/ocorrencia';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { OcorrenciaResponseDTO } from '../../dto/response/OcorrenciaResponseDTO';
import { UpdateOcorrenciaRequestDTO } from '../../dto/schema/UpdateOcorrenciaSchema';

@Injectable()
export class UpdateOcorrenciaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateOcorrenciaRequestDTO,
  ): Promise<OcorrenciaResponseDTO> {
    const dadosParaAtualizar = dto as Partial<Ocorrencia>;

    const ocorrenciaAtualizada = await this.ocorrenciaRepository.update(
      id,
      dadosParaAtualizar,
    );

    return new OcorrenciaResponseDTO(ocorrenciaAtualizada);
  }
}
