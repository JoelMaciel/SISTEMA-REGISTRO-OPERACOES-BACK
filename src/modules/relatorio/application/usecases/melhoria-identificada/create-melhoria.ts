import { Inject, Injectable } from '@nestjs/common';
import { MelhoriaIdentificadaRequestDTO } from '../../dto/shemas/types';
import { MelhoriaIdentificadaResponseDTO } from '../../dto/response/MelhoriaIdentificadaResponseDTO';
import { AppError } from 'src/shared/errors/AppError';
import { IRelatorioRepository } from 'src/modules/relatorio/infra/repository/interfaces/IRetalorioRepository';

@Injectable()
export class CreateMelhoriaIdentificadaUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
  ) {}

  async execute(
    relatorioId: string,
    dto: MelhoriaIdentificadaRequestDTO,
  ): Promise<MelhoriaIdentificadaResponseDTO> {
    const relatorio = await this.relatorioRepository.findById(relatorioId);
    if (!relatorio) throw new AppError('Relatório não encontrado.', 404);

    const novaMelhoria =
      await this.relatorioRepository.saveMelhoriaIdentificada({
        ...dto,
        relatorio,
      } as any);

    return new MelhoriaIdentificadaResponseDTO(novaMelhoria);
  }
}
