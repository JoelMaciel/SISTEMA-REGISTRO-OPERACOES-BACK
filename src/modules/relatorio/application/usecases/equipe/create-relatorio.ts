import { Inject, Injectable } from '@nestjs/common';
import { AppError } from 'src/shared/errors/AppError';
import { IRelatorioRepository } from 'src/modules/relatorio/infra/repository/interfaces/IRetalorioRepository';
import { CreateRelatorioRequestDTO } from '../../dto/shemas/CreateRelatorioSchema';
import { RelatorioResponseDTO } from '../../dto/response/RelatorioResponseDTO';
import { Relatorio } from 'src/modules/relatorio/domain/entities/relatorio';
import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
import { IFiscalRepository } from 'src/modules/fiscal/infra/repository/interfaces/IFiscalRepository';
import { IEquipeRepository } from 'src/modules/equipe/infra/repository/interfaces/IEquipeRepository';
import { IOcorrenciaRepository } from 'src/modules/ocorrencia/infra/repository/interfaces/IOcorrenciaRepository';

@Injectable()
export class CreateRelatorioUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
    @Inject('IOperacaoRepository')
    private readonly operacaoRepository: IOperacaoRepository,
    @Inject('IFiscalRepository')
    private readonly fiscalRepository: IFiscalRepository,
    @Inject('IEquipeRepository')
    private readonly equipeRepository: IEquipeRepository,
    @Inject('IOcorrenciaRepository')
    private readonly ocorrenciaRepository: IOcorrenciaRepository,
  ) {}

  async execute(dto: CreateRelatorioRequestDTO): Promise<RelatorioResponseDTO> {
    const [operacao, fiscal] = await Promise.all([
      this.operacaoRepository.findById(dto.operacaoId),
      this.fiscalRepository.findById(dto.fiscalId),
    ]);

    if (!operacao) {
      throw new AppError(
        `Operação com ID ${dto.operacaoId} não encontrada.`,
        404,
      );
    }
    if (!fiscal) {
      throw new AppError(`Fiscal com ID ${dto.fiscalId} não encontrado.`, 404);
    }

    const summary = await this.equipeRepository.getSummaryByOperacaoAndPeriod(
      dto.operacaoId,
      dto.dataInicial,
      dto.dataFinal,
    );

    const efetivoCalculado = summary.totalEfetivo;
    const postosCalculados = summary.totalPostosDistintos;

    const ocorrencias =
      await this.ocorrenciaRepository.findOcorrenciasByOperacaoAndPeriod(
        dto.operacaoId,
        dto.dataInicial,
        dto.dataFinal,
      );

    const novoRelatorioData: Partial<Relatorio> = {
      dataInicial: dto.dataInicial,
      dataFinal: dto.dataFinal,
      horarioInicial: dto.horarioInicial,
      horarioFinal: dto.horarioFinal,
      local: dto.local,

      totalPosto: postosCalculados,
      efetivoTotal: efetivoCalculado,

      operacao: operacao,
      fiscal: fiscal,

      aspectosPositivos: dto.aspectosPositivos as any,
      melhoriasIdentificadas: dto.melhoriasIdentificadas as any,
      alteracoesEfetivo: dto.alteracoesEfetivo as any,
      outrasAlteracoes: dto.outrasAlteracoes as any,
    };

    const novoRelatorio = await this.relatorioRepository.create(
      novoRelatorioData,
    );

    return new RelatorioResponseDTO(novoRelatorio, ocorrencias);
  }
}
