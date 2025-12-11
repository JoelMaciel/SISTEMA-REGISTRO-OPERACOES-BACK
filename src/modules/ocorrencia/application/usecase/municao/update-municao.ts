import { Inject, Injectable } from '@nestjs/common';
import { AppError } from 'src/shared/errors/AppError';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { MunicaoRequestDTO } from '../../dto/schema/CreateOcorrenciaSchema';
import { MunicaoResponseDTO } from '../../dto/response/MunicaoResponseDTO';

@Injectable()
export class UpdateMunicaoUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(
    ocorrenciaId: string,
    municaoId: string,
    data: MunicaoRequestDTO,
  ): Promise<MunicaoResponseDTO> {
    const result = await this.ocorrenciaRepository.findOcorrenciaWithMunicao(
      ocorrenciaId,
      municaoId,
    );

    if (!result) {
      throw new AppError(
        `Munição ${municaoId} não pertence à ocorrência ${ocorrenciaId}`,
      );
    }

    const { municao } = result;

    if (data.calibre !== undefined) municao.calibre = data.calibre;
    if (data.quantidade !== undefined) municao.quantidade = data.quantidade;

    await this.ocorrenciaRepository.saveMunicao(municao);

    return new MunicaoResponseDTO(municao);
  }
}
