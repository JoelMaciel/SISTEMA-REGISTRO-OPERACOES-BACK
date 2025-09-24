import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
import { OperacaoResponseDTO } from '../../dto/response/OperacaoResponseDTO';
import { UpdateOperacaoRequestDTO } from '../../dto/schema/UpdateOperacaoSchema';
import { AppError } from 'src/shared/errors/AppError';

@Injectable()
export class UpdateOperacaoUseCase {
  constructor(
    @Inject('IOperacaoRepository')
    private readonly operacaoRepository: IOperacaoRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateOperacaoRequestDTO,
  ): Promise<OperacaoResponseDTO> {
    const operacaoExistente = await this.operacaoRepository.findById(id);
    const parseDate = (dateString: string): Date => {
      const [day, month, year] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    };

    if (!operacaoExistente) {
      throw new AppError(`Operação não encontrada`);
    }

    const operacaoAtualizada = await this.operacaoRepository.update(id, {
      nome: dto.nome,
      opmDemandante: dto.opmDemandante,
      dataInicial: parseDate(dto.dataInicial),
      dataFinal: parseDate(dto.dataFinal),
      efetivoPolicial: dto.efetivoPolicial,
      quantidadePostoArea: dto.quantidadePostoArea,
      observacoes: dto.observacoes,
    });

    return new OperacaoResponseDTO(operacaoAtualizada);
  }
}
