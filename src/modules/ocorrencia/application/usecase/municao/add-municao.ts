import { Inject, Injectable } from '@nestjs/common';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { AppError } from 'src/shared/errors/AppError';
import { MunicaoResponseDTO } from '../../dto/response/MunicaoResponseDTO';
import { MunicaoRequestDTO } from '../../dto/schema/CreateOcorrenciaSchema';
import { Municao } from 'src/modules/ocorrencia/domain/entities/municao';

@Injectable()
export class AddMunicaoToOcorrenciaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(
    ocorrenciaId: string,
    dto: MunicaoRequestDTO,
  ): Promise<MunicaoResponseDTO> {
    const ocorrencia = await this.ocorrenciaRepository.findById(ocorrenciaId);

    if (!ocorrencia) {
      throw new AppError(`Ocorrência ${ocorrenciaId} não encontrada.`, 404);
    }

    const novaMunicao = new Municao();
    novaMunicao.calibre = dto.calibre;
    novaMunicao.quantidade = dto.quantidade;

    novaMunicao.ocorrencia = ocorrencia;

    const municaoSalva = await this.ocorrenciaRepository.saveMunicao(
      novaMunicao,
    );

    return new MunicaoResponseDTO(municaoSalva);
  }
}
