import { AppError } from 'src/shared/errors/AppError';
import { AspectoPositivoResponseDTO } from '../../dto/response/AspectoPositivoResponseDTO';
import { AspectoPositivoRequestDTO } from '../../dto/shemas/types';
import { IRelatorioRepository } from 'src/modules/relatorio/infra/repository/interfaces/IRetalorioRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdateAspectoPositivoUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
  ) {}

  async execute(
    relatorioId: string,
    aspectoId: string,
    dto: AspectoPositivoRequestDTO,
  ): Promise<AspectoPositivoResponseDTO> {
    const aspecto = await this.relatorioRepository.findAspectoById(
      aspectoId,
      relatorioId,
    );
    if (!aspecto)
      throw new AppError(
        'Aspecto positivo não encontrado para este relatório.',
        404,
      );

    aspecto.descricao = dto.descricao;
    const atualizado = await this.relatorioRepository.saveAspectoPositivo(
      aspecto,
    );

    return new AspectoPositivoResponseDTO(atualizado);
  }
}
