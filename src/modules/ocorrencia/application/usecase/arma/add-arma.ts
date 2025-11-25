import { Inject, Injectable } from '@nestjs/common';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { Arma } from 'src/modules/ocorrencia/domain/entities/arma';
import { ArmaRequestDTO } from '../../dto/schema/CreateOcorrenciaSchema';
import { ArmaResponseDTO } from '../../dto/response/ArmaResponseDTO';
import { AppError } from 'src/shared/errors/AppError';

@Injectable()
export class AddArmaToOcorrenciaUseCase {
  constructor(
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(
    ocorrenciaId: string,
    dto: ArmaRequestDTO,
  ): Promise<ArmaResponseDTO> {
    const ocorrencia = await this.ocorrenciaRepository.findById(ocorrenciaId);

    if (!ocorrencia) {
      throw new AppError(`Ocorrência ${ocorrenciaId} não encontrada.`, 404);
    }

    const novaArma = new Arma();
    novaArma.tipo = dto.tipo;
    novaArma.calibre = dto.calibre;
    novaArma.numeracao = dto.numeracao;
    novaArma.capacidade = dto.capacidade;

    novaArma.ocorrencia = ocorrencia;

    const armaSalva = await this.ocorrenciaRepository.saveArma(novaArma);

    return new ArmaResponseDTO(armaSalva);
  }
}
