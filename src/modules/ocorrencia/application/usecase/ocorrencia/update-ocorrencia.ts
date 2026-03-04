import { Inject, Injectable } from '@nestjs/common';
import { Ocorrencia } from 'src/modules/ocorrencia/domain/entities/ocorrencia';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { OcorrenciaResponseDTO } from '../../dto/response/OcorrenciaResponseDTO';
import { UpdateOcorrenciaRequestDTO } from '../../dto/schema/UpdateOcorrenciaSchema';
import { AppError } from 'src/shared/errors/AppError';

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

    const ocorrencia = await this.ocorrenciaRepository.findById(id);

    if (!ocorrencia) {
      throw new AppError('Ocorrência não encontrada na base de dados', 404);
    }

    if (dto.m && dto.m !== ocorrencia.m) {
      const mJaEmUso = await this.ocorrenciaRepository.findByM(dto.m);

      if (mJaEmUso) {
        throw new AppError(
          `Não é possível atualizar: O registro (M) ${dto.m} já está vinculado a outra ocorrência.`,
          409,
        );
      }
    }

    const ocorrenciaAtualizada = await this.ocorrenciaRepository.update(
      id,
      dadosParaAtualizar,
    );

    return new OcorrenciaResponseDTO(ocorrenciaAtualizada);
  }
}
