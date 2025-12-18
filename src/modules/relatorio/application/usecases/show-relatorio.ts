import { Inject, Injectable } from '@nestjs/common';
import { IRelatorioRepository } from '../../infra/repository/interfaces/IRetalorioRepository';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';
import { RelatorioResponseDTO } from '../dto/response/RelatorioResponseDTO';
import { AppError } from 'src/shared/errors/AppError';

@Injectable()
export class ShowRelatoriodUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(id: string): Promise<RelatorioResponseDTO> {
    const relatorio = await this.relatorioRepository.findById(id);

    if (!relatorio) {
      throw new AppError('Relatório não encontrado.', 404);
    }

    const ocorrencias =
      await this.ocorrenciaRepository.findOcorrenciasByOperacaoAndPeriod(
        relatorio.operacao.id,
        relatorio.dataInicial,
        relatorio.dataFinal,
      );

    return new RelatorioResponseDTO(relatorio, ocorrencias);
  }
}
