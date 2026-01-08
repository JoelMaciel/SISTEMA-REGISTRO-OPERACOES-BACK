import { Inject, Injectable } from '@nestjs/common';
import { IRelatorioRepository } from '../../infra/repository/interfaces/IRetalorioRepository';
import { AppError } from 'src/shared/errors/AppError';
import { RelatorioResponseDTO } from '../dto/response/RelatorioResponseDTO';
import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
import { IFiscalRepository } from 'src/modules/fiscal/infra/repository/interfaces/IFiscalRepository';
import { Relatorio } from '../../domain/entities/relatorio';
import { UpdateRelatorioRequestDTO } from '../dto/shemas/types';

@Injectable()
export class UpdateDadosGeraisRelatorioUseCase {
  constructor(
    @Inject('IRelatorioRepository')
    private readonly relatorioRepository: IRelatorioRepository,
    @Inject('IOperacaoRepository')
    private readonly operacaoRepository: IOperacaoRepository,
    @Inject('IFiscalRepository')
    private readonly fiscalRepository: IFiscalRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateRelatorioRequestDTO,
  ): Promise<RelatorioResponseDTO> {
    const relatorioExistente = await this.relatorioRepository.findById(id);
    if (!relatorioExistente) {
      throw new AppError('Relatório não encontrado.', 404);
    }

    const dadosParaAtualizar: Partial<Relatorio> = { ...dto } as any;

    if (dto.operacaoId) {
      const operacao = await this.operacaoRepository.findById(dto.operacaoId);
      if (!operacao) {
        throw new AppError(
          `Operação com ID ${dto.operacaoId} não encontrada.`,
          404,
        );
      }
      dadosParaAtualizar.operacao = operacao;
      delete (dadosParaAtualizar as any).operacaoId;
    }

    if (dto.fiscalId) {
      const fiscal = await this.fiscalRepository.findById(dto.fiscalId);
      if (!fiscal) {
        throw new AppError(
          `Fiscal com ID ${dto.fiscalId} não encontrado.`,
          404,
        );
      }
      dadosParaAtualizar.fiscal = fiscal;
      delete (dadosParaAtualizar as any).fiscalId;
    }

    return new RelatorioResponseDTO(
      await this.relatorioRepository.update(id, dadosParaAtualizar),
    );
  }
}
