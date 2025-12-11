import { Inject, Injectable } from '@nestjs/common';
import { OutroObjetoRequestDTO } from '../../dto/schema/UpdateOcorrenciaSchema';
import { AppError } from 'src/shared/errors/AppError';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { OutroObjetoResponseDTO } from '../../dto/response/OutroObjetoResponseDTOy';

@Injectable()
export class UpdateObjetoUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(
    ocorrenciaId: string,
    outroObjetoId: string,
    data: OutroObjetoRequestDTO,
  ): Promise<OutroObjetoResponseDTO> {
    const result =
      await this.ocorrenciaRepository.findOcorrenciaWithOutroObjeto(
        ocorrenciaId,
        outroObjetoId,
      );

    if (!result) {
      throw new AppError(
        `Objeto ${outroObjetoId} não pertence à ocorrência ${ocorrenciaId}`,
        404,
      );
    }

    const { outroObjeto } = result;

    if (data.descricao !== undefined) outroObjeto.descricao = data.descricao;

    await this.ocorrenciaRepository.saveOutroObjeto(outroObjeto);

    return new OutroObjetoResponseDTO(outroObjeto);
  }
}
