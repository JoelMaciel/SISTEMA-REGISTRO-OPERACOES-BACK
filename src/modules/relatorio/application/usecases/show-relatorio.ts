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
    if (!relatorio) throw new AppError('Relatório não encontrado.', 404);

    const ocorrencias =
      await this.ocorrenciaRepository.findOcorrenciasByOperacaoLocalAndPeriod(
        relatorio.operacao.id,
        relatorio.local,
        relatorio.dataInicial,
        relatorio.dataFinal,
      );

    if (relatorio.operacao && relatorio.operacao.postoAreas) {
      const localNormalizado = relatorio.local.trim().toUpperCase();

      relatorio.operacao.postoAreas = relatorio.operacao.postoAreas.filter(
        (pa) => {
          const localPosto = pa.local.trim().toUpperCase();
          return localPosto === localNormalizado;
        },
      );
    }

    return new RelatorioResponseDTO(relatorio, ocorrencias);
  }
}
