import { Inject, Injectable } from '@nestjs/common';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { OutroObjetoRequestDTO } from '../../dto/schema/CreateOcorrenciaSchema';
import { AppError } from 'src/shared/errors/AppError';
import { OutroObjetoResponseDTO } from '../../dto/response/OutroObjetoResponseDTOy';
import { OutroObjeto } from 'src/modules/ocorrencia/domain/entities/outroObjeto';

@Injectable()
export class AddOutroObjetoUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(
    ocorrenciaId: string,
    dto: OutroObjetoRequestDTO,
  ): Promise<OutroObjetoResponseDTO> {
    const ocorrencia = await this.ocorrenciaRepository.findById(ocorrenciaId);

    if (!ocorrencia) {
      throw new AppError(`Ocorrência ${ocorrenciaId} não encontrada.`, 404);
    }

    const novoObjeto = new OutroObjeto();
    novoObjeto.descricao = dto.descricao;

    novoObjeto.ocorrencia = ocorrencia;

    const objetoSalvo = await this.ocorrenciaRepository.saveOutroObjeto(
      novoObjeto,
    );

    return new OutroObjetoResponseDTO(objetoSalvo);
  }
}
