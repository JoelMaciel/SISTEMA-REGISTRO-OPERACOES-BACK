import { Inject, Injectable } from '@nestjs/common';
import { IRelatorioRepository } from 'src/modules/relatorio/infra/repository/interfaces/IRetalorioRepository';
import { AspectoPositivoRequestDTO } from '../../dto/shemas/types';
import { AspectoPositivoResponseDTO } from '../../dto/response/AspectoPositivoResponseDTO';
import { AppError } from 'src/shared/errors/AppError';

@Injectable()
export class CreateAspectoPositivoUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
  ) {}

  async execute(
    relatorioId: string,
    dto: AspectoPositivoRequestDTO,
  ): Promise<AspectoPositivoResponseDTO> {
    const relatorio = await this.relatorioRepository.findById(relatorioId);
    if (!relatorio) throw new AppError('Relatório não encontrado.', 404);

    const novoAspecto = await this.relatorioRepository.saveAspectoPositivo({
      ...dto,
      relatorio,
    } as any);

    return new AspectoPositivoResponseDTO(novoAspecto);
  }
}
