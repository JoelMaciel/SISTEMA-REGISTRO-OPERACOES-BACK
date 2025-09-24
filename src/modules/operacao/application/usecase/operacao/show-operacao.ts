import { Injectable, Inject } from '@nestjs/common';
import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
import { OperacaoResponseDTO } from '../../dto/response/OperacaoResponseDTO';
import { AppError } from 'src/shared/errors/AppError';
import { UpdateOperacaoRequestDTO } from '../../dto/schema/UpdateOperacaoSchema';

@Injectable()
export class FindByIdOperacaoUseCase {
  constructor(
    @Inject('IOperacaoRepository')
    private readonly operacaoRepository: IOperacaoRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateOperacaoRequestDTO,
  ): Promise<OperacaoResponseDTO> {
    const parseDate = (dateString: string): Date => {
      const [day, month, year] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    };

    // ⚠️ Carregue as relações se precisar delas no DTO!
    const operacaoExistente = await this.operacaoRepository.findById(id, [
      'postoAreas',
    ]);

    if (!operacaoExistente) {
      throw new AppError(`Operação com id ${id} não encontrada`);
    }

    operacaoExistente.nome = dto.nome ?? operacaoExistente.nome;
    operacaoExistente.opmDemandante =
      dto.opmDemandante ?? operacaoExistente.opmDemandante;
    operacaoExistente.dataInicial = dto.dataInicial
      ? parseDate(dto.dataInicial)
      : operacaoExistente.dataInicial;
    operacaoExistente.dataFinal = dto.dataFinal
      ? parseDate(dto.dataFinal)
      : operacaoExistente.dataFinal;
    operacaoExistente.efetivoPolicial =
      dto.efetivoPolicial ?? operacaoExistente.efetivoPolicial;
    operacaoExistente.quantidadePostoArea =
      dto.quantidadePostoArea ?? operacaoExistente.quantidadePostoArea;
    operacaoExistente.observacoes =
      dto.observacoes ?? operacaoExistente.observacoes;

    // Salva
    const operacaoAtualizada = await this.operacaoRepository.update(
      id,
      operacaoExistente,
    );

    // ✅ Retorna DTO preenchido automaticamente
    return new OperacaoResponseDTO(operacaoAtualizada);
  }
}
