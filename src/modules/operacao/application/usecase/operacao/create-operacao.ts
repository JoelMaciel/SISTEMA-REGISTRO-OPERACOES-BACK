import { Inject, Injectable } from '@nestjs/common';
import { IOperacaoRepository } from 'src/modules/operacao/infra/repository/interfaces/IOperacaoRepository';
import { OperacaoResponseDTO } from '../../dto/response/OperacaoResponseDTO';
import { CreateOperacaoRequestDTO } from '../../dto/schema/CreateOperacaoSchema';
import { Operacao } from 'src/modules/operacao/domain/entities/operacao';
import { PostoArea } from 'src/modules/operacao/domain/entities/posto-area';

@Injectable()
export class CriarOperacaoUseCase {
  constructor(
    @Inject('IOperacaoRepository')
    private readonly operacaoRepository: IOperacaoRepository,
  ) {}

  async execute(dto: CreateOperacaoRequestDTO): Promise<OperacaoResponseDTO> {
    const operacao = this.mapToEntity(dto);
    const novaOperacao = await this.operacaoRepository.create(operacao);
    return new OperacaoResponseDTO(novaOperacao);
  }

  private mapToEntity(dto: CreateOperacaoRequestDTO): Operacao {
    const parseDate = (dateString: string): Date => {
      const [day, month, year] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    };

    const operacao = new Operacao();
    operacao.nome = dto.nome;
    operacao.opmDemandante = dto.opmDemandante;
    operacao.dataInicial = parseDate(dto.dataInicial);
    operacao.dataFinal = parseDate(dto.dataFinal);
    operacao.efetivoPolicial = dto.efetivoPolicial;
    operacao.quantidadePostoArea = dto.quantidadePostoArea;
    operacao.observacoes = dto.observacoes;

    operacao.postoAreas = (dto.postoAreas || []).map((posto) => {
      const novoPosto = new PostoArea();
      novoPosto.nome = posto.nome;
      novoPosto.local = posto.local;
      novoPosto.numero = posto.numero;
      novoPosto.bairro = posto.bairro;
      novoPosto.cidade = posto.cidade;
      novoPosto.quantidade = posto.quantidade;
      return novoPosto;
    });

    return operacao;
  }
}
