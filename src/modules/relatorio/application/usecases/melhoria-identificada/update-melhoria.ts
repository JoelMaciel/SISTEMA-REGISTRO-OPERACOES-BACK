import { AppError } from 'src/shared/errors/AppError';
import { MelhoriaIdentificadaResponseDTO } from '../../dto/response/MelhoriaIdentificadaResponseDTO';
import { MelhoriaIdentificadaRequestDTO } from '../../dto/shemas/types';
import { IRelatorioRepository } from 'src/modules/relatorio/infra/repository/interfaces/IRetalorioRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateMelhoriaIdentificadaUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
  ) {}

  async execute(
    relatorioId: string,
    melhoriaId: string,
    dto: MelhoriaIdentificadaRequestDTO,
  ): Promise<MelhoriaIdentificadaResponseDTO> {
    const melhoria = await this.relatorioRepository.findMelhoriaById(
      melhoriaId,
      relatorioId,
    );
    if (!melhoria)
      throw new AppError(
        'Melhoria identificada não encontrada para este relatório.',
        404,
      );

    melhoria.descricao = dto.descricao;
    const atualizada = await this.relatorioRepository.saveMelhoriaIdentificada(
      melhoria,
    );

    return new MelhoriaIdentificadaResponseDTO(atualizada);
  }
}
