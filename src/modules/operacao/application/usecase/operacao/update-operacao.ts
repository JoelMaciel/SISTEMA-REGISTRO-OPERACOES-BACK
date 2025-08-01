import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
import { CreateOperacaoRequestDTO } from '../../dto/schema/CreateOperacaoSchema';
import { OperacaoResponseDTO } from '../../dto/response/OperacaoResponseDTO';
import { parseDate } from 'src/shared/utils/dateUtils';

@Injectable()
export class UpdateOperacaoUseCase {
  constructor(
    @Inject('IOperacaoRepository')
    private readonly operacaoRepository: IOperacaoRepository,
  ) {}

  async execute(
    id: string,
    dto: CreateOperacaoRequestDTO,
  ): Promise<OperacaoResponseDTO> {
    const operacaoExistente = await this.operacaoRepository.findById(id);

    if (!operacaoExistente) {
      throw new NotFoundException(`Operação com id ${id} não encontrada`);
    }

    const operacaoAtualizada = await this.operacaoRepository.update(id, {
      nome: dto.nome,
      opmDemandante: dto.opmDemandante,
      dataInicial: parseDate(dto.dataInicial),
      dataFinal: parseDate(dto.dataFinal),
      efetivoPolicial: dto.efetivoPolicial,
      quantidadePostoArea: dto.quantidadePostoArea,
      observacoes: dto.observacoes,
      postoServico: dto.postoServico,
      areaAtuacao: dto.areaAtuacao,
    });

    return new OperacaoResponseDTO(operacaoAtualizada);
  }
}
